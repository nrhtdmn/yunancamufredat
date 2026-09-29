/* Merge all deep theory packs into LESSONS (load after lessons + extras + patterns) */
(function applyTheoryDeep() {
  if (typeof LESSONS === "undefined") return;
  const packs = [];
  if (typeof THEORY_DEEP_A0A1 !== "undefined") packs.push(THEORY_DEEP_A0A1);
  if (typeof THEORY_DEEP_A2B1 !== "undefined") packs.push(THEORY_DEEP_A2B1);
  if (typeof THEORY_DEEP_B2C2 !== "undefined") packs.push(THEORY_DEEP_B2C2);

  packs.forEach((pack) => {
    Object.keys(pack).forEach((id) => {
      const paras = pack[id];
      if (!Array.isArray(paras) || !paras.length) return;
      if (!LESSONS[id]) {
        LESSONS[id] = {
          goal: "",
          theory: paras,
          examples: [],
          steps: [],
          practice: [],
          check: []
        };
      } else {
        LESSONS[id].theory = paras;
      }
    });
  });
})();
