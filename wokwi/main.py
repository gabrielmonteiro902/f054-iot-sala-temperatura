"""
F054 - Fundamentos de IoT
Projeto: Monitoramento de temperatura em sala de aula

ESP32 (Wokwi) + DHT22 + LED (atuador = ventilador simulado)
- Publica leituras via MQTT (JSON)
- Liga o ventilador se temperatura > LIMITE_TEMP
"""

import network
import time
import json
import dht
from machine import Pin
from umqtt.simple import MQTTClient

# ====== CONFIGURAÇÃO ======
WIFI_SSID = "Wokwi-GUEST"
WIFI_PASS = ""

MQTT_BROKER = "broker.hivemq.com"
MQTT_PORT = 1883
MQTT_CLIENT_ID = "unifor-sala101-esp32"

# Tópicos (iguais aos do Node-RED)
TOPIC_TELEMETRIA = b"unifor/sala101/temperatura"
TOPIC_COMANDO = b"unifor/sala101/comando"
TOPIC_STATUS = b"unifor/sala101/status"

# Hardware
PIN_DHT = 15
PIN_LED = 2

# Automação local
LIMITE_TEMP = 28.0  # °C — acima disso liga o ventilador
INTERVALO_LEITURA_S = 3

# ====== HARDWARE ======
sensor = dht.DHT22(Pin(PIN_DHT))
ventilador = Pin(PIN_LED, Pin.OUT)
ventilador.off()


def conectar_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    while not wlan.isconnected():
        print("Conectando ao Wi-Fi...")
        try:
            wlan.connect(WIFI_SSID, WIFI_PASS)
        except OSError as e:
            print("Erro no Wi-Fi:", e)
        tentativas = 0
        while not wlan.isconnected() and tentativas < 60:
            time.sleep(0.5)
            tentativas += 1
        if not wlan.isconnected():
            # reinicia a interface antes de tentar outra vez
            print("Sem Wi-Fi, tentando de novo...")
            wlan.active(False)
            time.sleep(1)
            wlan.active(True)
    print("Wi-Fi:", wlan.ifconfig())
    return wlan


def aplicar_comando(msg):
    """Recebe comando remoto do Node-RED (opcional)."""
    try:
        dados = json.loads(msg)
        acao = str(dados.get("ventilador", "")).lower()
        if acao in ("on", "ligar", "1", "true"):
            ventilador.on()
            print("Comando remoto: VENTILADOR ON")
        elif acao in ("off", "desligar", "0", "false"):
            ventilador.off()
            print("Comando remoto: VENTILADOR OFF")
    except Exception as e:
        print("Erro ao processar comando:", e)


def on_mqtt_message(topic, msg):
    print("MQTT recebido:", topic, msg)
    if topic == TOPIC_COMANDO:
        aplicar_comando(msg)


def conectar_mqtt():
    client = MQTTClient(MQTT_CLIENT_ID, MQTT_BROKER, port=MQTT_PORT)
    client.set_callback(on_mqtt_message)
    client.connect()
    client.subscribe(TOPIC_COMANDO)
    client.publish(TOPIC_STATUS, b'{"device":"esp32","status":"online"}')
    print("MQTT conectado em", MQTT_BROKER)
    return client


def ler_sensor():
    sensor.measure()
    return sensor.temperature(), sensor.humidity()


def regra_automacao(temp):
    """Regra: temperatura acima do limite => liga ventilador."""
    if temp > LIMITE_TEMP:
        ventilador.on()
        return "ligado"
    ventilador.off()
    return "desligado"


def publicar_leitura(client, temp, umid, estado_ventilador):
    payload = {
        "sala": "101",
        "temperatura": round(temp, 1),
        "umidade": round(umid, 1),
        "limite": LIMITE_TEMP,
        "ventilador": estado_ventilador,
        "unidade": "C",
        "ts": time.time(),
    }
    mensagem = json.dumps(payload)
    client.publish(TOPIC_TELEMETRIA, mensagem.encode())
    print("Publicado:", mensagem)


def main():
    conectar_wifi()
    client = None

    while client is None:
        try:
            conectar_wifi()
            client = conectar_mqtt()
        except Exception as e:
            print("Falha MQTT, tentando de novo:", e)
            time.sleep(2)

    contador = 0
    while True:
        try:
            client.check_msg()
            temp, umid = ler_sensor()
            estado = regra_automacao(temp)
            publicar_leitura(client, temp, umid, estado)
            contador += 1
            print("Leitura #{}".format(contador))
        except OSError as e:
            print("Erro de leitura/sensor:", e)
        except Exception as e:
            print("Erro geral:", e)
            try:
                client.disconnect()
            except Exception:
                pass
            time.sleep(2)
            try:
                client = conectar_mqtt()
            except Exception as e2:
                print("Reconexão MQTT falhou:", e2)

        time.sleep(INTERVALO_LEITURA_S)


if __name__ == "__main__":
    main()
