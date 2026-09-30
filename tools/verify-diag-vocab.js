const fs = require("fs");
const vm = require("vm");
const ctx = { console };
vm.createContext(ctx);
vm.runInContext("var DRILLS={cloze:[],reading:[]}; var Lessons={get:function(){return null}};", ctx);

function run(f, extra) {
  let c = fs.readFileSync("js/" + f, "utf8");
  if (extra) c += extra;
  vm.runInContext(c, ctx);
}

run("content.js", "\nthis.CONTENT=CONTENT;");
run("diagnostic-50.js");
console.log("diag", ctx.CONTENT.diagnostic.length);

[
  "trainers.js",
  "extras.js",
  "extras2.js",
  "extras3.js",
  "extras4.js",
  "extras5.js",
  "extras6.js",
  "extras7.js",
  "extras8.js",
  "extras9.js",
  "patterns.js",
  "patterns-extra.js",
  "patterns-x.js",
  "patterns-xi.js",
  "patterns-xii.js"
].forEach((f) => {
  try {
    run(f);
  } catch (e) {
    console.log("skip", f);
  }
});
run("vocab-mega.js");
console.log("vocab", ctx.CONTENT.vocabCount());
console.log("all", ctx.CONTENT.levelFromScore(50, 50, Array(50).fill(true)));
console.log("low", ctx.CONTENT.levelFromScore(8, 50, Array(50).fill(false).map((_, i) => i < 8)));
