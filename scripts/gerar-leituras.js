const fs = require("fs");
const path = require("path");

const out = path.join(__dirname, "..", "nodered-data", "leituras_sala101.csv");
const rows = [["n", "timestamp", "temperatura", "umidade", "ventilador"]];
const base = Date.now() - 5 * 60 * 1000;

for (let i = 1; i <= 24; i++) {
  const temperatura = Number((26 + i * 0.2).toFixed(1));
  const umidade = Number((55 + ((i % 5) - 2) * 0.8).toFixed(1));
  const ventilador = temperatura > 28 ? "ligado" : "desligado";
  const ts = new Date(base + i * 3000).toISOString();
  rows.push([i, ts, temperatura, umidade, ventilador]);
}

fs.writeFileSync(out, rows.map((r) => r.join(",")).join("\n") + "\n");
console.log("Arquivo gerado:", out, `(${rows.length - 1} leituras)`);
