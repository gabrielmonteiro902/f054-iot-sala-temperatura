/**
 * Publica leituras MQTT para alimentar o Node-RED sem o Wokwi.
 * Uso: npm run simular-mqtt
 */
const mqtt = require("mqtt");

const BROKER = "mqtt://broker.hivemq.com:1883";
const TOPIC = "unifor/sala101/temperatura";
const LIMITE = 28.0;
const TOTAL = Number(process.env.TOTAL || 25);
const INTERVALO_MS = Number(process.env.INTERVALO_MS || 1500);

const client = mqtt.connect(BROKER, {
  clientId: "unifor-sala101-simulador-" + Math.random().toString(16).slice(2, 8),
});

let n = 0;

client.on("connect", () => {
  console.log("Conectado ao broker. Publicando", TOTAL, "leituras...");
  const timer = setInterval(() => {
    n += 1;
    // Sobe a temperatura gradualmente para cruzar o limite
    const temperatura = Number((25.5 + n * 0.25).toFixed(1));
    const umidade = Number((55 + Math.sin(n / 3) * 4).toFixed(1));
    const ventilador = temperatura > LIMITE ? "ligado" : "desligado";
    const payload = {
      sala: "101",
      temperatura,
      umidade,
      limite: LIMITE,
      ventilador,
      unidade: "C",
      ts: Math.floor(Date.now() / 1000),
    };
    client.publish(TOPIC, JSON.stringify(payload));
    console.log(`#${n}`, payload);

    if (n >= TOTAL) {
      clearInterval(timer);
      client.end(false, () => {
        console.log("Simulação concluída.");
        process.exit(0);
      });
    }
  }, INTERVALO_MS);
});

client.on("error", (err) => {
  console.error("Erro MQTT:", err.message);
  process.exit(1);
});
