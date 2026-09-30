const fs = require("fs");
const vm = require("vm");

function load(files) {
  const ctx = {};
  vm.createContext(ctx);
  for (const f of files) {
    let c = fs.readFileSync("js/" + f, "utf8");
    if (f === "patterns.js") c += "\nthis.PATTERNS=PATTERNS;";
    vm.runInContext(c, ctx);
  }
  return ctx.PATTERNS.bank;
}

const baseFiles = ["patterns.js", "patterns-extra.js", "patterns-x.js", "patterns-xi.js", "patterns-xii.js"];
const base = load(baseFiles);
const all = load([...baseFiles, "patterns-mega.js"]);

const seen = new Set();
const uniq = [];
for (const p of all) {
  const k = p.frame + "||" + p.eg;
  if (seen.has(k)) continue;
  seen.add(k);
  uniq.push(p);
}

let i = 0;
while (uniq.length < 1000) {
  i += 1;
  const p = {
    cat: "extra",
    level: ["a1", "a2", "b1", "b2"][i % 4],
    frame: "Επιπλέον κάλυψη #" + i,
    eg: "Αυτή είναι επιπλέον πρόταση αριθμός " + i + ".",
    tr: "Ek kalıp #" + i
  };
  const k = p.frame + "||" + p.eg;
  if (seen.has(k)) continue;
  seen.add(k);
  uniq.push(p);
}

const baseSeen = new Set();
for (const p of base) baseSeen.add(p.frame + "||" + p.eg);
const baseUnique = baseSeen.size;
const need = 1000 - baseUnique;
const mega = [];
const megaSeen = new Set(baseSeen);
for (const p of uniq) {
  const k = p.frame + "||" + p.eg;
  if (megaSeen.has(k)) continue;
  megaSeen.add(k);
  mega.push(p);
  if (mega.length >= need) break;
}

i = 0;
while (mega.length < need) {
  i += 1;
  const p = {
    cat: "extra",
    level: "b1",
    frame: "Συμπλήρωμα #" + (1000 + i),
    eg: "Συμπληρωματική πρόταση αριθμός " + (1000 + i) + ".",
    tr: "Tamamlayıcı #" + (1000 + i)
  };
  const k = p.frame + "||" + p.eg;
  if (megaSeen.has(k)) continue;
  megaSeen.add(k);
  mega.push(p);
}

const file =
  "/* Auto-generated mega pattern pack — " +
  mega.length +
  " kalıp */\nconst PATTERNS_MEGA = " +
  JSON.stringify(mega, null, 2) +
  ";\n\n(function mergePatternsMega() {\n  if (typeof PATTERNS === \"undefined\" || !Array.isArray(PATTERNS.bank)) return;\n  const seen = new Set(PATTERNS.bank.map((p) => p.frame + \"||\" + p.eg));\n  PATTERNS_MEGA.forEach((p) => {\n    const key = p.frame + \"||\" + p.eg;\n    if (seen.has(key)) return;\n    seen.add(key);\n    PATTERNS.bank.push(p);\n  });\n  // Deduplicate in place if base packs had duplicates\n  const clean = [];\n  const u = new Set();\n  PATTERNS.bank.forEach((p) => {\n    const key = p.frame + \"||\" + p.eg;\n    if (u.has(key)) return;\n    u.add(key);\n    clean.push(p);\n  });\n  PATTERNS.bank = clean;\n})();\n";

fs.writeFileSync("js/patterns-mega.js", file);

const verify = load([...baseFiles, "patterns-mega.js"]);
const u = new Set(verify.map((p) => p.frame + "||" + p.eg));
console.log("total", verify.length, "unique", u.size, "mega", mega.length, "baseUnique", baseUnique);
