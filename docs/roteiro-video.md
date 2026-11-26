# Roteiro do vídeo (3 a 5 minutos)

## Estrutura sugerida

### 0:00–0:30 — Abertura
- Apresentar a equipe e o título do projeto
- Problema: temperatura alta em sala de aula
- Solução: IoT com sensor, MQTT, dashboard e automação

### 0:30–1:20 — Arquitetura
- Mostrar o diagrama (sensor → ESP32 → MQTT → Node-RED → usuário/atuador)
- Citar os tópicos MQTT e o JSON

### 1:20–2:40 — Protótipo no Wokwi
- Abrir o projeto no Wokwi
- Mostrar ESP32 + DHT22 + LED
- Rodar a simulação
- Mostrar o Serial com as publicações MQTT
- Aumentar a temperatura do DHT22 acima de 28 °C
- Mostrar o LED (ventilador) ligando

### 2:40–4:00 — Dashboard Node-RED
- Abrir `http://127.0.0.1:1880/ui`
- Mostrar o indicador (gauge) e o gráfico
- Mostrar o contador de leituras (≥ 20)
- Mostrar a mensagem de automação / alerta
- (Opcional) Abrir o arquivo `leituras_sala101.csv`

### 4:00–4:40 — Resultados e limitações
- O que funcionou
- Limitações: simulação, broker público, sem TLS
- Benefício para a comunidade: conforto térmico e apoio à manutenção

### 4:40–5:00 — Encerramento
- Link do Wokwi e conclusão

## Dicas
- Grave a tela (QuickTime / OBS)
- Fale pausado; não precisa mostrar código longo
- Suba no YouTube (não listado) ou Google Drive com acesso liberado
- Cole o link no PDF
