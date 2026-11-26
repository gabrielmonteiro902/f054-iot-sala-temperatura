# Projeto Wokwi — como montar em 2 minutos

1. Abra https://wokwi.com
2. **New project** → **ESP32** → escolha **MicroPython**
3. No editor:
   - substitua todo o `diagram.json` pelo arquivo desta pasta
   - substitua todo o `main.py` pelo arquivo desta pasta
4. Clique em **Start simulation**
5. No DHT22 (painel à direita / ícone do sensor), aumente a temperatura para **> 28 °C**
6. Confira o Serial e o LED (ventilador)
7. **Share** → copie o link público e cole no relatório

## Pinos

| Componente | Pino ESP32 |
|---|---|
| DHT22 (DATA) | GPIO 15 |
| LED / ventilador | GPIO 2 |

## Wi-Fi no Wokwi

O código já usa `Wokwi-GUEST` (sem senha), padrão do simulador.
