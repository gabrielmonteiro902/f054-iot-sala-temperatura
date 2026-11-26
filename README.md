# F054 — Monitoramento de Temperatura em Sala de Aula (IoT)

Pacote técnico completo e **já validado** para a atividade parcial de Fundamentos de IoT.

## O que já está pronto

| Item | Status |
|---|---|
| Circuito + firmware Wokwi (ESP32 + DHT22 + LED) | Pronto em `wokwi/` |
| Fluxo Node-RED (MQTT + regra + CSV) | Pronto em `nodered/flow.json` |
| Dashboard (indicador + gráfico + alerta) | Pronto em `dashboard/` |
| ≥ 20 leituras CSV | Geradas em `nodered-data/leituras_sala101.csv` |
| Evidência de dashboard | `docs/evidencias/dashboard-sala101.png` |
| Rascunho do PDF | `docs/relatorio.html` + `docs/rascunho-relatorio.md` |
| Roteiro do vídeo | `docs/roteiro-video.md` |

## Como subir tudo (3 terminais)

```bash
cd /Users/gabrielmonteiro/Developer/f054-iot-sala-temperatura

# Terminal 1 — Node-RED (fluxo MQTT + CSV)
npm start
# http://127.0.0.1:1880

# Terminal 2 — Dashboard visual
npm run dashboard
# http://127.0.0.1:5500

# Terminal 3 — gerar leituras (se quiser)
npm run simular-mqtt
```

## Wokwi (protótipo com sensor + atuador)

1. https://wokwi.com → New project → **ESP32 + MicroPython**
2. Cole `wokwi/diagram.json` e `wokwi/main.py`
3. Start simulation
4. No DHT22, suba a temperatura para **> 28 °C**
5. LED (ventilador) liga e o Serial publica MQTT
6. Salve o link público do projeto

Detalhes: `wokwi/README.md`

## Arquitetura

```text
DHT22 → ESP32 (Wokwi) → MQTT (HiveMQ) → Node-RED (regra + CSV)
                              ↓
                     Dashboard HTML (gauge + gráfico)
                              ↓
                     comando MQTT → LED/ventilador
```

## Tópicos MQTT

- `unifor/sala101/temperatura` — telemetria JSON
- `unifor/sala101/comando` — comando do ventilador
- `unifor/sala101/status` — online

## Regra de automação

`se temperatura > 28 °C → liga ventilador`

## Entrega (o que falta na equipe)

1. Montar o projeto no Wokwi e copiar o **link público**
2. Tirar prints do circuito/serial (além do dashboard já salvo)
3. Gravar vídeo **3–5 min** (`docs/roteiro-video.md`)
4. Abrir `docs/relatorio.html` no navegador → preencher nomes/matrículas/links → **Print → Salvar PDF**
5. Todos enviam o PDF no AVA até **27/11/2026**

## Scripts

| Comando | Função |
|---|---|
| `npm start` | Sobe Node-RED |
| `npm run dashboard` | Sobe dashboard + bridge MQTT |
| `npm run simular-mqtt` | Publica 25 leituras no broker |
| `npm run gerar-leituras` | Regenera CSV de exemplo |
