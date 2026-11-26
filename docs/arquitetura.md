# Arquitetura IoT — Monitoramento de Temperatura (Sala 101)

## Problema
Salas de aula aquecem ao longo do dia e não há monitoramento contínuo da temperatura. Isso prejudica o conforto e a concentração dos alunos.

## Público beneficiado
Estudantes e equipe de manutenção/coordenação do campus.

## Solução
Sistema IoT simulado que:
1. Lê temperatura e umidade (DHT22)
2. Envia os dados via MQTT (JSON)
3. Exibe as informações em um dashboard (Node-RED)
4. Aciona automaticamente um ventilador simulado (LED) quando a temperatura passa de 28 °C

## Diagrama simplificado

```text
[DHT22] ---> [ESP32] ---> [MQTT Broker] ---> [Node-RED Dashboard]
                 |                                  |
                 +----> [LED / Ventilador] <--------+
                        (atuador local)         (comando remoto)
```

### Componentes
| Camada | Componente | Função |
|---|---|---|
| Sensor | DHT22 | Coleta temperatura e umidade |
| Controlador | ESP32 | Lê sensor, aplica regra, publica MQTT |
| Comunicação | MQTT (HiveMQ público) | Transporte das mensagens |
| Nuvem/serviço | Node-RED | Recebe, armazena e visualiza dados |
| Atuador | LED (ventilador simulado) | Ação automática |
| Usuário | Dashboard web | Monitoramento |

## Segurança e privacidade
- Broker público (apenas para protótipo acadêmico; em produção usaria broker privado + TLS + autenticação).
- Não são coletados dados pessoais de alunos.
- Tópicos com namespace próprio (`unifor/sala101/...`) para reduzir colisão.
- Em produção: VPN/rede restrita, credenciais MQTT e criptografia.
