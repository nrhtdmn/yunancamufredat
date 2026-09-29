const TRAINERS = {
  alphabet: [
    { ch: "Α α", name: "alfa", sound: "a" },
    { ch: "Β β", name: "vita", sound: "v" },
    { ch: "Γ γ", name: "gama", sound: "g/y" },
    { ch: "Δ δ", name: "delta", sound: "ð" },
    { ch: "Ε ε", name: "epsilon", sound: "e" },
    { ch: "Ζ ζ", name: "zita", sound: "z" },
    { ch: "Η η", name: "ita", sound: "i" },
    { ch: "Θ θ", name: "thita", sound: "th" },
    { ch: "Ι ι", name: "yota", sound: "i" },
    { ch: "Κ κ", name: "kapa", sound: "k" },
    { ch: "Λ λ", name: "lamda", sound: "l" },
    { ch: "Μ μ", name: "mi", sound: "m" },
    { ch: "Ν ν", name: "ni", sound: "n" },
    { ch: "Ξ ξ", name: "ksi", sound: "ks" },
    { ch: "Ο ο", name: "omikron", sound: "o" },
    { ch: "Π π", name: "pi", sound: "p" },
    { ch: "Ρ ρ", name: "ro", sound: "r" },
    { ch: "Σ σ/ς", name: "sigma", sound: "s" },
    { ch: "Τ τ", name: "taf", sound: "t" },
    { ch: "Υ υ", name: "ipsilon", sound: "i" },
    { ch: "Φ φ", name: "fi", sound: "f" },
    { ch: "Χ χ", name: "hi", sound: "h/ch" },
    { ch: "Ψ ψ", name: "psi", sound: "ps" },
    { ch: "Ω ω", name: "omega", sound: "o" }
  ],

  verbs: [
    {
      id: "eimai",
      infinitive: "είμαι",
      gloss: "olmak",
      forms: [
        { p: "εγώ", f: "είμαι" },
        { p: "εσύ", f: "είσαι" },
        { p: "αυτός/ή/ό", f: "είναι" },
        { p: "εμείς", f: "είμαστε" },
        { p: "εσείς", f: "είστε" },
        { p: "αυτοί/ές/ά", f: "είναι" }
      ]
    },
    {
      id: "echo",
      infinitive: "έχω",
      gloss: "sahip olmak",
      forms: [
        { p: "εγώ", f: "έχω" },
        { p: "εσύ", f: "έχεις" },
        { p: "αυτός/ή/ό", f: "έχει" },
        { p: "εμείς", f: "έχουμε" },
        { p: "εσείς", f: "έχετε" },
        { p: "αυτοί/ές/ά", f: "έχουν" }
      ]
    },
    {
      id: "grafo",
      infinitive: "γράφω",
      gloss: "yazmak",
      forms: [
        { p: "εγώ", f: "γράφω" },
        { p: "εσύ", f: "γράφεις" },
        { p: "αυτός/ή/ό", f: "γράφει" },
        { p: "εμείς", f: "γράφουμε" },
        { p: "εσείς", f: "γράφετε" },
        { p: "αυτοί/ές/ά", f: "γράφουν" }
      ]
    },
    {
      id: "thelo",
      infinitive: "θέλω",
      gloss: "istemek",
      forms: [
        { p: "εγώ", f: "θέλω" },
        { p: "εσύ", f: "θέλεις" },
        { p: "αυτός/ή/ό", f: "θέλει" },
        { p: "εμείς", f: "θέλουμε" },
        { p: "εσείς", f: "θέλετε" },
        { p: "αυτοί/ές/ά", f: "θέλουν" }
      ]
    },
    {
      id: "pao",
      infinitive: "πάω",
      gloss: "gitmek",
      forms: [
        { p: "εγώ", f: "πάω" },
        { p: "εσύ", f: "πας" },
        { p: "αυτός/ή/ό", f: "πάει" },
        { p: "εμείς", f: "πάμε" },
        { p: "εσείς", f: "πάτε" },
        { p: "αυτοί/ές/ά", f: "παν" }
      ]
    },
    {
      id: "kano",
      infinitive: "κάνω",
      gloss: "yapmak",
      forms: [
        { p: "εγώ", f: "κάνω" },
        { p: "εσύ", f: "κάνεις" },
        { p: "αυτός/ή/ό", f: "κάνει" },
        { p: "εμείς", f: "κάνουμε" },
        { p: "εσείς", f: "κάνετε" },
        { p: "αυτοί/ές/ά", f: "κάνουν" }
      ]
    }
  ],

  extraVocab: {
    a0: [
      { el: "μητέρα", tr: "anne", tip: "η μητέρα" },
      { el: "πατέρας", tr: "baba", tip: "ο πατέρας" },
      { el: "σπίτι", tr: "ev", tip: "το σπίτι" },
      { el: "σχολείο", tr: "okul", tip: "το σχολείο" },
      { el: "καφές", tr: "kahve", tip: "ο καφές" },
      { el: "γάλα", tr: "süt", tip: "το γάλα" },
      { el: "ένα", tr: "bir", tip: "1" },
      { el: "δύο", tr: "iki", tip: "2" }
    ],
    a1: [
      { el: "αγοράζω", tr: "satın almak", tip: "" },
      { el: "δουλεύω", tr: "çalışmak", tip: "" },
      { el: "μαθαίνω", tr: "öğrenmek", tip: "" },
      { el: "καταλαβαίνω", tr: "anlamak", tip: "" },
      { el: "ξέρω", tr: "bilmek", tip: "" },
      { el: "αρέσει", tr: "hoşuna gitmek", tip: "μου αρέσει" },
      { el: "χρήματα", tr: "para", tip: "τα χρήματα" },
      { el: "λεωφορείο", tr: "otobüs", tip: "" }
    ],
    a2: [
      { el: "άρχισα", tr: "başladım", tip: "aorist ← αρχίζω" },
      { el: "τελείωσα", tr: "bitirdim", tip: "aorist" },
      { el: "συνάντησα", tr: "karşılaştım / buluştum", tip: "" },
      { el: "χρειάζομαι", tr: "ihtiyacım var", tip: "" },
      { el: "προσπαθώ", tr: "çabalamak", tip: "" },
      { el: "ξαφνικά", tr: "aniden", tip: "" }
    ],
    b1: [
      { el: "επιτρέπω", tr: "izin vermek", tip: "" },
      { el: "απαγορεύω", tr: "yasaklamak", tip: "" },
      { el: "συνιστώ", tr: "tavsiye etmek", tip: "" },
      { el: "αποφεύγω", tr: "kaçınmak", tip: "" },
      { el: "σημαντικός", tr: "önemli", tip: "" },
      { el: "δύσκολος", tr: "zor", tip: "" }
    ],
    yds: [
      { el: "υποθέτω", tr: "varsaymak", tip: "" },
      { el: "τεκμηριώνω", tr: "belgelemek / kanıtlamak", tip: "" },
      { el: "αντικρούω", tr: "çürütmek", tip: "" },
      { el: "συγκλίνω", tr: "yakınsamak", tip: "" },
      { el: "κατά προσέγγιση", tr: "yaklaşık olarak", tip: "kalıp" },
      { el: "εν κατακλείδι", tr: "sonuç olarak", tip: "kalıp" }
    ]
  }
};

/* Desteleri zenginleştir */
(function mergeVocab() {
  if (typeof CONTENT === "undefined") return;
  Object.keys(TRAINERS.extraVocab).forEach((deck) => {
    CONTENT.decks[deck] = (CONTENT.decks[deck] || []).concat(TRAINERS.extraVocab[deck]);
  });
})();
