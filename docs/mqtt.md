# Comunicação MQTT

## Broker
- Host: `broker.hivemq.com`
- Porta: `1883` (sem TLS — adequado para protótipo/simulação)

## Tópicos

| Tópico | Direção | Descrição |
|---|---|---|
| `unifor/sala101/temperatura` | ESP32 → Node-RED | Telemetria (leituras) |
| `unifor/sala101/comando` | Node-RED → ESP32 | Comando do ventilador |
| `unifor/sala101/status` | ESP32 → Node-RED | Status online do dispositivo |

## Formato JSON (telemetria)

```json
{
  "sala": "101",
  "temperatura": 29.5,
  "umidade": 58.0,
  "limite": 28.0,
  "ventilador": "ligado",
  "unidade": "C",
  "ts": 1731440000
}
```

## Formato JSON (comando)

```json
{
  "ventilador": "on",
  "motivo": "temperatura_alta",
  "temperatura": 29.5,
  "limite": 28.0
}
```

## Teste rápido (sem ESP32)

Com [MQTTX](https://mqttx.app/) ou HiveMQ Web Client:

1. Conectar em `broker.hivemq.com:1883`
2. Subscribe: `unifor/sala101/#`
3. Publish em `unifor/sala101/temperatura` com o JSON de exemplo
4. Conferir no Node-RED / dashboard
