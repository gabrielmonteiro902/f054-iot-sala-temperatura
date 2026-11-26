# O que a equipe ainda precisa fazer

## Já feito neste pacote
- [x] Código ESP32 MicroPython (`wokwi/main.py`)
- [x] Circuito Wokwi (`wokwi/diagram.json`)
- [x] Fluxo Node-RED MQTT + regra + CSV
- [x] Dashboard com indicador + gráfico + alerta
- [x] ≥ 20 leituras geradas e salvas
- [x] Print do dashboard (`docs/evidencias/dashboard-sala101.png`)
- [x] Rascunho do relatório (`docs/relatorio.html`)
- [x] Roteiro do vídeo

## Pendente (humano)
1. **Wokwi**
   - Abrir https://wokwi.com → ESP32 MicroPython
   - Colar `wokwi/diagram.json` e `wokwi/main.py`
   - Rodar, subir temperatura > 28 °C, tirar prints
   - Fazer login, Save/Share e copiar o **link público**

2. **Vídeo 3–5 min**
   - Seguir `docs/roteiro-video.md`
   - Subir (YouTube não listado ou Drive) e testar o link

3. **PDF final**
   - Abrir `docs/relatorio.html`
   - Preencher nomes + matrículas
   - Colar links (Wokwi + vídeo)
   - Inserir prints do Wokwi/serial/fluxo
   - Imprimir → Salvar como PDF (4–7 páginas)

4. **AVA**
   - Todos os integrantes enviam o mesmo PDF até **27/11/2026**

## Subir localmente (já validado)
```bash
cd /Users/gabrielmonteiro/Developer/f054-iot-sala-temperatura
npm start            # http://127.0.0.1:1880
npm run dashboard    # http://127.0.0.1:5500
npm run simular-mqtt # gera leituras
```
