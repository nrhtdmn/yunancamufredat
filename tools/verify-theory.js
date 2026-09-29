const fs = require("fs");
const path = require("path");
const tasks = require("./_tasks.json");

function extractKeys(file) {
  const s = fs.readFileSync(path.join(__dirname, "..", "js", file), "utf8");
  return [...s.matchAll(/^\s+"([a-z0-9-]+)": \[/gm)].map((m) => m[1]);
}

const a = extractKeys("theory-deep-a0a1.js");
const b = extractKeys("theory-deep-a2b1.js");
const c = extractKeys("theory-deep-b2c2.js");
const all = new Set([...a, ...b, ...c]);
const need = tasks.map((t) => t.id);
const miss = need.filter((id) => !all.has(id));
const extra = [...all].filter((id) => !need.includes(id));
console.log(JSON.stringify({ a0a1: a.length, a2b1: b.length, b2c2: c.length, total: all.size, need: need.length, miss, extra }, null, 2));
