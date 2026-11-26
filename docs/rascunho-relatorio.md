# Rascunho do relatório PDF (4–7 páginas)

> Preencher nomes/matrículas e colar prints + links antes de exportar para PDF.

---

## 1. Capa
- Disciplina: F054 — Fundamentos de Internet das Coisas (IoT)
- Título: Monitoramento de temperatura em sala de aula com ESP32, MQTT e Node-RED
- Integrantes: Nome completo — Matrícula (listar todos)
- Universidade de Fortaleza — 2026.2
- Prazo: 27/11/2026

## 2. Problema, público e solução
Salas de aula podem atingir temperaturas elevadas, prejudicando o conforto e o rendimento dos estudantes. Sem monitoramento contínuo, a equipe demora a perceber a necessidade de ventilação ou climatização.

**Público:** alunos e equipe de manutenção/coordenação.

**Solução:** protótipo IoT simulado que coleta temperatura/umidade com DHT22 em um ESP32, transmite os dados via MQTT, exibe em um dashboard Node-RED e aciona automaticamente um ventilador simulado (LED) quando a temperatura ultrapassa 28 °C.

## 3. Arquitetura IoT
(Inserir figura do diagrama — ver `docs/arquitetura.md`)

Componentes: sensor DHT22, controlador ESP32, broker MQTT, Node-RED (visualização/armazenamento), atuador LED, usuário via dashboard.

**Riscos de segurança/privacidade:** uso de broker público sem TLS (apenas protótipo); em produção seriam necessários autenticação, criptografia e rede restrita. Não há coleta de dados pessoais.

## 4. Comunicação MQTT e funcionamento do protótipo
- Broker: `broker.hivemq.com:1883`
- Tópicos: `unifor/sala101/temperatura`, `unifor/sala101/comando`, `unifor/sala101/status`
- Payload em JSON (temperatura, umidade, estado do ventilador, limite)

O ESP32 lê o DHT22 a cada 3 segundos, publica a telemetria e aplica a regra local: se temperatura > 28 °C, liga o LED. O Node-RED consome as mensagens, atualiza o dashboard e também publica comando de automação.

## 5. Capturas de tela
- [ ] Circuito no Wokwi
- [ ] Serial Monitor com publicações MQTT
- [ ] Dashboard (gauge + gráfico)
- [ ] Contador ≥ 20 leituras
- [ ] Alerta de automação / LED ligado
- [ ] (Opcional) Teste MQTTX

## 6. Resultados, dificuldades e benefícios
**Resultados:** protótipo funcional com coleta, transmissão MQTT, visualização e ação automática; histórico com pelo menos 20 leituras.

**Dificuldades:** sincronizar Wokwi com o broker; ajustar limite de temperatura; instalar dashboard do Node-RED.

**Benefícios:** apoio à decisão de ventilação/climatização, melhora do conforto térmico e possibilidade de expansão para outras salas.

## 7. Links
- Projeto Wokwi: _(colar link)_
- Vídeo de demonstração (3–5 min): _(colar link)_
- Repositório (se houver): _(colar link)_

## Referências
- Documentação Wokwi — https://docs.wokwi.com/
- MQTT — https://mqtt.org/
- Node-RED — https://nodered.org/
- HiveMQ Public Broker — https://www.hivemq.com/public-mqtt-broker/
