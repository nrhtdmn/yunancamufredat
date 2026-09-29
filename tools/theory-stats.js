const fs = require("fs");
const path = require("path");

function stats(file) {
  const s = fs.readFileSync(path.join(__dirname, "..", "js", file), "utf8");
  const re = /^\s+"([a-z0-9-]+)": \[/gm;
  const ids = [];
  let m;
  while ((m = re.exec(s))) ids.push({ id: m[1], index: m.index });
  const lens = [];
  for (let i = 0; i < ids.length; i++) {
    const start = ids[i].index;
    const end = i + 1 < ids.length ? ids[i + 1].index : s.length;
    const block = s.slice(start, end);
    const paras = [...block.matchAll(/"((?:\\.|[^"\\])*)"/g)]
      .map((x) => x[1])
      .filter((p) => p !== ids[i].id);
    const chars = paras.reduce((a, p) => a + p.length, 0);
    lens.push({ id: ids[i].id, n: paras.length, c: chars });
  }
  lens.sort((a, b) => a.c - b.c);
  const avg = (k) => Math.round(lens.reduce((a, x) => a + x[k], 0) / lens.length);
  console.log(
    file,
    "n=" + lens.length,
    "avgParas=" + avg("n"),
    "avgChars=" + avg("c"),
    "min=" + JSON.stringify(lens[0]),
    "max=" + JSON.stringify(lens[lens.length - 1])
  );
}

stats("theory-deep-a0a1.js");
stats("theory-deep-a2b1.js");
stats("theory-deep-b2c2.js");
