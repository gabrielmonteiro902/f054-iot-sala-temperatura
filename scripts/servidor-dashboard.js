/**
 * Serve o dashboard e espelha o MQTT via Server-Sent Events (SSE).
 * Assim a UI funciona mesmo se o browser bloquear WSS externo.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const mqtt = require("mqtt");

const PORT = Number(process.env.PORT || 5500);
const ROOT = path.join(__dirname, "..", "dashboard");
const TOPIC = "unifor/sala101/temperatura";
const TOPIC_CMD = "unifor/sala101/comando";

const clients = new Set();
const historico = [];
let ultima = null;
let contador = 0;

const mqttClient = mqtt.connect("mqtt://broker.hivemq.com:1883", {
  clientId: "unifor-sala101-bridge-" + Math.random().toString(16).slice(2, 8),
});

mqttClient.on("connect", () => {
  console.log("Bridge MQTT conectado");
  mqttClient.subscribe(TOPIC);
});

mqttClient.on("message", (_topic, buf) => {
  try {
    const dados = JSON.parse(buf.toString());
    contador += 1;
    ultima = { ...dados, n: contador, hora: new Date().toLocaleTimeString() };
    historico.unshift(ultima);
    if (historico.length > 40) historico.pop();

    const alto = Number(dados.temperatura) > (dados.limite || 28);
    mqttClient.publish(
      TOPIC_CMD,
      JSON.stringify({
        ventilador: alto ? "on" : "off",
        motivo: alto ? "temperatura_alta" : "temperatura_ok",
        temperatura: dados.temperatura,
        limite: dados.limite || 28,
      })
    );

    const payload = `data: ${JSON.stringify(ultima)}\n\n`;
    for (const res of clients) res.write(payload);
  } catch (err) {
    console.error("Falha ao processar MQTT:", err.message);
  }
});

function contentType(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".js")) return "application/javascript";
  if (file.endsWith(".css")) return "text/css";
  return "text/plain";
}

const server = http.createServer((req, res) => {
  if (req.url === "/events") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });
    res.write("\n");
    clients.add(res);
    if (ultima) res.write(`data: ${JSON.stringify(ultima)}\n\n`);
    req.on("close", () => clients.delete(res));
    return;
  }

  if (req.url === "/api/status") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ contador, ultima, totalHistorico: historico.length }));
    return;
  }

  if (req.url === "/api/simular" && req.method === "POST") {
    const n = contador + 1;
    const temperatura = Number((25.5 + n * 0.3).toFixed(1));
    const payload = {
      sala: "101",
      temperatura,
      umidade: Number((55 + (n % 5)).toFixed(1)),
      limite: 28,
      ventilador: temperatura > 28 ? "ligado" : "desligado",
      unidade: "C",
      ts: Math.floor(Date.now() / 1000),
    };
    mqttClient.publish(TOPIC, JSON.stringify(payload));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, payload }));
    return;
  }

  let filePath = path.join(ROOT, req.url === "/" ? "index.html" : req.url);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType(filePath) });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Dashboard: http://127.0.0.1:${PORT}`);
});
