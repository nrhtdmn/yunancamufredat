/* Altıncı içerik paketi — emir olumsuz, çift zamir, zaman zarfı, ulaşım, meslek */
const EXTRAS6 = {
  negImperative: [
    { tr: "Koşma!", el: "Μην τρέχεις!", tip: "μη(ν) + present" },
    { tr: "Dokunma!", el: "Μην αγγίζεις!", tip: "" },
    { tr: "Unutma!", el: "Μην ξεχνάς! / Μην ξεχάσεις!", tip: "süreklilik / bir kez" },
    { tr: "Geç kalma!", el: "Μην αργείς!", tip: "" },
    { tr: "Endişelenme!", el: "Μην ανησυχείς!", tip: "" },
    { tr: "Bağırma!", el: "Μην φωνάζεις!", tip: "" },
    { tr: "Yalan söyleme!", el: "Μην λες ψέματα!", tip: "" },
    { tr: "Gitme (şimdi)!", el: "Μην φύγεις!", tip: "aorist stem" }
  ],

  doublePronoun: [
    { tr: "Bana onu ver", el: "Δώσ' το μου", tip: "emirde zamir sonda" },
    { tr: "Sana onu söylüyorum", el: "Σου το λέω", tip: "dolaylı + doğrudan" },
    { tr: "Bana onu göster", el: "Δείξε μού το", tip: "" },
    { tr: "Onu bana getirdi", el: "Μου το έφερε", tip: "" },
    { tr: "Sana onu yazacağım", el: "Θα σου το γράψω", tip: "" },
    { tr: "Bize onu anlat", el: "Πες μας το", tip: "" },
    { tr: "Onu ona verdim", el: "Του το έδωσα / Της το έδωσα", tip: "cinsiyet" },
    { tr: "Bana onu gönder", el: "Στείλε μού το", tip: "" }
  ],

  timeAdverbs: [
    { tr: "şimdi", el: "τώρα", tip: "" },
    { tr: "hemen", el: "αμέσως", tip: "" },
    { tr: "az önce", el: "μόλις τώρα / πριν λίγο", tip: "" },
    { tr: "yakında", el: "σύντομα", tip: "" },
    { tr: "çoktan", el: "ήδη / από καιρό", tip: "" },
    { tr: "hâlâ", el: "ακόμα / ακόμη", tip: "" },
    { tr: "artık (olumsuz)", el: "πια / πλέον", tip: "Δεν… πια" },
    { tr: "birden", el: "ξαφνικά", tip: "" },
    { tr: "erken", el: "νωρίς", tip: "" },
    { tr: "geç", el: "αργά", tip: "" }
  ],

  transport: [
    { tr: "otobüs", el: "λεωφορείο", tip: "το λεωφορείο" },
    { tr: "metro", el: "μετρό", tip: "" },
    { tr: "taksi", el: "ταξί", tip: "" },
    { tr: "tren", el: "τρένο", tip: "" },
    { tr: "feribot", el: "καράβι / φέρι", tip: "" },
    { tr: "durak", el: "στάση", tip: "" },
    { tr: "bilet", el: "εισιτήριο", tip: "" },
    { tr: "aktarma", el: "μετεπιβίβαση", tip: "" },
    { tr: "trafik", el: "κίνηση", tip: "" },
    { tr: "yaya", el: "με τα πόδια", tip: "yürüyerek" }
  ],

  jobs: [
    { tr: "doktor", el: "γιατρός", tip: "" },
    { tr: "mühendis", el: "μηχανικός", tip: "" },
    { tr: "avukat", el: "δικηγόρος", tip: "" },
    { tr: "aşçı", el: "μάγειρας", tip: "" },
    { tr: "garson", el: "σερβιτόρος", tip: "" },
    { tr: "polis", el: "αστυνομικός", tip: "" },
    { tr: "hemşire", el: "νοσοκόμα / νοσηλευτής", tip: "" },
    { tr: "öğrenci", el: "φοιτητής / μαθήτρια", tip: "üniversite / okul" },
    { tr: "satıcı", el: "πωλητής", tip: "" },
    { tr: "şoför", el: "οδηγός", tip: "meslek; uygulama adı değil" }
  ],

  phone: [
    { tr: "Alo?", el: "Έλα;", tip: "telefonda" },
    { tr: "… ile görüşebilir miyim?", el: "Μπορώ να μιλήσω με τον/την…;", tip: "" },
    { tr: "Yanlış numara", el: "Λάθος αριθμός", tip: "" },
    { tr: "Sinyal yok", el: "Δεν έχει σήμα", tip: "" },
    { tr: "Mesaj at", el: "Στείλε μήνυμα", tip: "" },
    { tr: "Seni sonra ararım", el: "Θα σε πάρω αργότερα", tip: "" },
    { tr: "Açık mı hat?", el: "Είσαι στον αέρα; / Μ' ακούς;", tip: "" },
    { tr: "Şarjım bitiyor", el: "Η μπαταρία τελειώνει", tip: "" }
  ],

  phrasesExtra: [
    { el: "Μην ανησυχείς, όλα καλά.", tr: "Endişelenme, her şey yolunda." },
    { el: "Σου το λέω σοβαρά.", tr: "Sana ciddi söylüyorum." },
    { el: "Θα σε πάρω αμέσως.", tr: "Seni hemen ararım." },
    { el: "Πάμε με τα πόδια;", tr: "Yürüyerek gidelim mi?" },
    { el: "Δεν προλαβαίνω πια.", tr: "Artık yetişemiyorum." },
    { el: "Μόλις έφτασα.", tr: "Az önce vardım." },
    { el: "Είσαι μηχανικός;", tr: "Mühendis misin?" },
    { el: "Η στάση είναι μετά τη γωνία.", tr: "Durak köşeden sonra." }
  ],

  scrambleExtra: [
    { words: ["Μην", "ανησυχείς", "τόσο", "πολύ"], answer: "Μην ανησυχείς τόσο πολύ", tr: "O kadar endişelenme" },
    { words: ["Σου", "το", "λέω", "τώρα"], answer: "Σου το λέω τώρα", tr: "Sana onu şimdi söylüyorum" },
    { words: ["Πάμε", "με", "το", "μετρό"], answer: "Πάμε με το μετρό", tr: "Metroyla gidelim" },
    { words: ["Θα", "σε", "πάρω", "αργότερα"], answer: "Θα σε πάρω αργότερα", tr: "Seni sonra ararım" },
    { words: ["Είναι", "γιατρός", "στο", "νοσοκομείο"], answer: "Είναι γιατρός στο νοσοκομείο", tr: "Hastanede doktor" },
    { words: ["Μόλις", "έφτασα", "στη", "στάση"], answer: "Μόλις έφτασα στη στάση", tr: "Az önce durağa vardım" }
  ],

  dictationExtra: [
    "Μην ξεχάσεις τα κλειδιά.",
    "Σου το λέω για το καλό σου.",
    "Θα σε πάρω αμέσως.",
    "Πάμε με το λεωφορείο ή με τα πόδια;",
    "Είναι μηχανικός στην εταιρεία.",
    "Δεν έχει σήμα εδώ.",
    "Μόλις έφτασα στο σπίτι.",
    "Μην αργείς αύριο το πρωί."
  ],

  tipsExtra: [
    "Olumsuz emir: Μην + present (alışkanlık) veya aorist stem (bir kez).",
    "Çift zamir: Σου το λέω — önce dolaylı (σου), sonra doğrudan (το).",
    "Emirde zamir sonda: Δώσ' το μου.",
    "πια / πλέον: Δεν… πια = artık … değil.",
    "Με τα πόδια = yürüyerek; στάση = durak.",
    "Telefonda: Έλα; · Θα σε πάρω · Στείλε μήνυμα.",
    "οδηγός = şoför / rehber — uygulama adıyla karıştırma.",
    "μόλις = az önce / …ince."
  ],

  vocab: {
    clothes: [
      { el: "πουκάμισο", tr: "gömlek", tip: "" },
      { el: "παντελόνι", tr: "pantolon", tip: "" },
      { el: "φόρεμα", tr: "elbise", tip: "" },
      { el: "παπούτσια", tr: "ayakkabı", tip: "τα παπούτσια" },
      { el: "καπέλο", tr: "şapka", tip: "" },
      { el: "μπουφάν", tr: "mont / ceket", tip: "" },
      { el: "κάλτσες", tr: "çorap", tip: "" },
      { el: "ζώνη", tr: "kemer", tip: "" }
    ],
    hotel: [
      { el: "ρεσεψιόν", tr: "resepsiyon", tip: "" },
      { el: "κλειδί", tr: "anahtar", tip: "" },
      { el: "όροφος", tr: "kat", tip: "" },
      { el: "ανελκυστήρας", tr: "asansör", tip: "" },
      { el: "πρωινό", tr: "kahvaltı", tip: "" },
      { el: "κράτηση", tr: "rezervasyon", tip: "" },
      { el: "δωμάτιο", tr: "oda", tip: "" },
      { el: "check-out / αναχώρηση", tr: "çıkış", tip: "" }
    ],
    animals: [
      { el: "σκύλος", tr: "köpek", tip: "" },
      { el: "γάτα", tr: "kedi", tip: "" },
      { el: "πουλί", tr: "kuş", tip: "" },
      { el: "άλογο", tr: "at", tip: "" },
      { el: "ψάρι", tr: "balık", tip: "" },
      { el: "αγελάδα", tr: "inek", tip: "" },
      { el: "πρόβατο", tr: "koyun", tip: "" },
      { el: "μέλισσα", tr: "arı", tip: "" }
    ]
  },

  cloze: [
    { id: "c6a", text: "___ ανησυχείς!", options: ["Μην", "Να", "Θα", "Ας"], a: 0, why: "Olumsuz emir Μην." },
    { id: "c6b", text: "___ το λέω καθαρά.", options: ["Σου", "Με", "Το μόνο", "Σε το"], a: 0, why: "Σου το = sana onu." },
    { id: "c6c", text: "Πάμε ___ πόδια.", options: ["με τα", "στο", "από το", "για την"], a: 0, why: "με τα πόδια." },
    { id: "c6d", text: "Θα σε ___ αργότερα.", options: ["πάρω", "τρέξω", "φοράω", "ψάρι"], a: 0, why: "παίρνω τηλέφωνο." },
    { id: "c6e", text: "Δεν έρχομαι ___ .", options: ["πια", "σκύλος", "καπέλο", "όροφος"], a: 0, why: "πια = artık değil." },
    { id: "c6f", text: "Η ___ του λεωφορείου είναι εκεί.", options: ["στάση", "γάτα", "ζώνη", "μέλισσα"], a: 0, why: "στάση = durak." },
    { id: "c6g", text: "Είναι ___ στο νοσοκομείο.", options: ["γιατρός", "παντελόνι", "πρωινό", "άλογο"], a: 0, why: "meslek." },
    { id: "c6h", text: "___ έφτασα.", options: ["Μόλις", "Μην", "Σου το μόνο", "Με τα"], a: 0, why: "μόλις = az önce." }
  ],

  reading: [
    {
      id: "r6a",
      title: "Τηλέφωνο",
      text: "Ο Νίκος δεν έχει σήμα στο μετρό. Θα πάρει την Άννα αργότερα. Της στέλνει μήνυμα: «Μόλις βγω, θα σε πάρω αμέσως.»",
      q: "Τι θα κάνει ο Νίκος αργότερα;",
      options: ["Θα την πάρει τηλέφωνο", "Θα αγοράσει σκύλο", "Θα μείνει στο μετρό για πάντα", "Θα φορέσει καπέλο"],
      a: 0
    },
    {
      id: "r6b",
      title: "Δουλειά",
      text: "Η Μαρία είναι μηχανικός σε μια εταιρεία. Πάει στη δουλειά με το λεωφορείο. Μην αργείς, της λέει ο προϊστάμενος κάθε πρωί — αλλά εκείνη φτάνει πάντα νωρίς.",
      q: "Πώς πάει στη δουλειά;",
      options: ["Με λεωφορείο", "Με άλογο", "Ποτέ δεν πάει", "Μόνο με ταξί κάθε μέρα χωρίς λόγο"],
      a: 0
    }
  ],

  examExtra: [
    { q: "Μην + fiil?", options: ["Olumlu emir", "Olumsuz emir/istek", "Sadece gelecek", "Madde"], a: 1, kind: "grammar" },
    { q: "Σου το λέω sırası?", options: ["Doğrudan + dolaylı", "Dolaylı + doğrudan", "Sadece özne", "Edat yok"], a: 1, kind: "grammar" },
    { q: "με τα πόδια?", options: ["arabayla", "yürüyerek", "uçakla", "asla"], a: 1, kind: "vocab" },
    { q: "πια olumsuzda?", options: ["henüz", "artık … değil", "her zaman", "kapı"], a: 1, kind: "vocab" },
    { q: "στάση?", options: ["durak", "şapka", "arı", "kat"], a: 0, kind: "vocab" },
    { q: "Θα σε πάρω?", options: ["Seni alıp götüreceğim (bağlam: aramak)", "Sadece yürümek", "Yemek", "Madde"], a: 0, kind: "vocab" },
    { q: "μόλις?", options: ["asla", "az önce / …ince", "belki", "çoğul"], a: 1, kind: "vocab" },
    { q: "Emirde zamir?", options: ["Her zaman başta", "Sıklıkla sonda (Δώσ' το μου)", "Yok", "Sadece yazıda"], a: 1, kind: "grammar" }
  ],

  badgesExtra: [
    { id: "negimp8", title: "Μην ustası", desc: "8 olumsuz emir", check: (s) => ((s.trainerStats || {}).negimp || 0) >= 8 },
    { id: "dblpron8", title: "Çift zamir", desc: "8 çift zamir turu", check: (s) => ((s.trainerStats || {}).dblpron || 0) >= 8 },
    { id: "transport8", title: "Yolcu", desc: "8 ulaşım turu", check: (s) => ((s.trainerStats || {}).transport || 0) >= 8 },
    { id: "jobs8", title: "Meslekler", desc: "8 meslek turu", check: (s) => ((s.trainerStats || {}).jobs || 0) >= 8 },
    { id: "streak21", title: "3 hafta", desc: "21 gün seri", check: (s) => (s.streak || 0) >= 21 }
  ]
};

(function applyExtras6() {
  if (typeof CONTENT !== "undefined" && EXTRAS6.vocab) {
    Object.keys(EXTRAS6.vocab).forEach((deck) => {
      CONTENT.decks[deck] = EXTRAS6.vocab[deck];
    });
  }
  if (typeof TRAINERS !== "undefined") {
    if (EXTRAS6.tipsExtra) TRAINERS.tips = TRAINERS.tips.concat(EXTRAS6.tipsExtra);
    if (EXTRAS6.badgesExtra) TRAINERS.badges = TRAINERS.badges.concat(EXTRAS6.badgesExtra);
    if (EXTRAS6.dictationExtra) TRAINERS.dictation = TRAINERS.dictation.concat(EXTRAS6.dictationExtra);
  }
  if (typeof EXTRAS2 !== "undefined") {
    if (EXTRAS6.scrambleExtra) EXTRAS2.scramble = EXTRAS2.scramble.concat(EXTRAS6.scrambleExtra);
    if (EXTRAS6.examExtra) EXTRAS2.examBank = EXTRAS2.examBank.concat(EXTRAS6.examExtra);
  }
  if (typeof EXTRAS4 !== "undefined" && EXTRAS6.phrasesExtra) {
    EXTRAS4.phrases = EXTRAS4.phrases.concat(EXTRAS6.phrasesExtra);
  }
  if (typeof DRILLS !== "undefined") {
    if (EXTRAS6.cloze) DRILLS.cloze = DRILLS.cloze.concat(EXTRAS6.cloze);
    if (EXTRAS6.reading) DRILLS.reading = DRILLS.reading.concat(EXTRAS6.reading);
  }
})();
