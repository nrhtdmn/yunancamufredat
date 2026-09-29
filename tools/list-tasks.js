const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const curriculum = fs.readFileSync(path.join(root, "js/curriculum.js"), "utf8");
// eval-ish: extract task ids from curriculum and extras by regex
const files = [
  "js/curriculum.js",
  "js/extras.js",
  "js/extras2.js",
  "js/extras3.js",
  "js/extras4.js",
  "js/extras5.js",
  "js/extras6.js",
  "js/extras7.js",
  "js/extras8.js",
  "js/extras9.js",
  "js/patterns.js",
  "js/patterns-extra.js",
  "js/patterns-x.js",
  "js/patterns-xi.js"
];
const tasks = [];
for (const f of files) {
  const s = fs.readFileSync(path.join(root, f), "utf8");
  const re = /id:\s*"(a0|a1|a2|b1|b2|c1|c2)-u\d+-t\d+"/g;
  let m;
  while ((m = re.exec(s))) {
    const id = m[0].match(/"(.*?)"/)[1];
    // try get title nearby
    const slice = s.slice(m.index, m.index + 200);
    const title = (slice.match(/title:\s*"([^"]+)"/) || [])[1] || "";
    const detail = (slice.match(/detail:\s*"([^"]+)"/) || [])[1] || "";
    tasks.push({ id, title, detail, file: f });
  }
}
const uniq = new Map();
tasks.forEach((t) => {
  if (!uniq.has(t.id)) uniq.set(t.id, t);
});
const all = [...uniq.values()].sort((a, b) => a.id.localeCompare(b.id));
console.log("total", all.length);
const by = {};
all.forEach((t) => {
  const k = t.id.split("-")[0];
  by[k] = (by[k] || 0) + 1;
});
console.log(by);
fs.writeFileSync(path.join(root, "tools/_tasks.json"), JSON.stringify(all, null, 2));
console.log("wrote tools/_tasks.json");
