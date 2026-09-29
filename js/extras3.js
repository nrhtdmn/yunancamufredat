/* Üçüncü içerik paketi — zıtlar, düzeltme, sıra, yön, desteler */
const EXTRAS3 = {
  opposites: [
    { a: "μεγάλος", b: "μικρός", tr: "büyük ↔ küçük" },
    { a: "καλός", b: "κακός", tr: "iyi ↔ kötü" },
    { a: "γρήγορος", b: "αργός", tr: "hızlı ↔ yavaş" },
    { a: "ζεστός", b: "κρύος", tr: "sıcak ↔ soğuk" },
    { a: "πλούσιος", b: "φτωχός", tr: "zengin ↔ fakir" },
    { a: "νέος", b: "παλιός", tr: "yeni / genç ↔ eski" },
    { a: "ψηλός", b: "κοντός", tr: "uzun ↔ kısa (boy)" },
    { a: "εύκολος", b: "δύσκολος", tr: "kolay ↔ zor" },
    { a: "φτηνός", b: "ακριβός", tr: "ucuz ↔ pahalı" },
    { a: "ανοιχτός", b: "κλειστός", tr: "açık ↔ kapalı" },
    { a: "πρώτος", b: "τελευταίος", tr: "ilk ↔ son" },
    { a: "πριν", b: "μετά", tr: "önce ↔ sonra" }
  ],

  fixError: [
    {
      bad: "Εγώ θέλω να πηγαίνω τώρα.",
      good: "Εγώ θέλω να πάω τώρα.",
      why: "να + aorist stem (πάω) tek eylem için."
    },
    {
      bad: "Το γυναίκα είναι εδώ.",
      good: "Η γυναίκα είναι εδώ.",
      why: "γυναίκα dişil → η."
    },
    {
      bad: "Χθες βλέπω τον Νίκο.",
      good: "Χθες είδα τον Νίκο.",
      why: "Χθες → aorist (είδα)."
    },
    {
      bad: "Πηγαίνω στο σχολείο με το λεωφορείο κάθε μέρα χθες.",
      good: "Πήγαινα στο σχολείο με το λεωφορείο κάθε μέρα.",
      why: "Alışkanlık geçmişi → παρατατικός."
    },
    {
      bad: "Είναι το βιβλίο της Μαρία.",
      good: "Είναι το βιβλίο της Μαρίας.",
      why: "Sahiplik → genitif Μαρίας."
    },
    {
      bad: "Θα ήθελα ένα καφέ, παρακαλώ σε.",
      good: "Θα ήθελα έναν καφέ, παρακαλώ.",
      why: "καφές eril → έναν; παρακαλώ yeter."
    },
    {
      bad: "Δεν καταλαβαίνω τίποτα όχι.",
      good: "Δεν καταλαβαίνω τίποτα.",
      why: "Δεν + τίποτα; çift olumsuz ekleme."
    },
    {
      bad: "Αν είχα χρόνο, έρχομαι.",
      good: "Αν είχα χρόνο, θα ερχόμουν.",
      why: "Gerçek dışı koşul → θα + παρατατικός."
    }
  ],

  ordinals: [
    { n: "1.", el: "πρώτος / πρώτη / πρώτο", tr: "birinci" },
    { n: "2.", el: "δεύτερος", tr: "ikinci" },
    { n: "3.", el: "τρίτος", tr: "üçüncü" },
    { n: "4.", el: "τέταρτος", tr: "dördüncü" },
    { n: "5.", el: "πέμπτος", tr: "beşinci" },
    { n: "6.", el: "έκτος", tr: "altıncı" },
    { n: "7.", el: "έβδομος", tr: "yedinci" },
    { n: "8.", el: "όγδοος", tr: "sekizinci" },
    { n: "9.", el: "ένατος", tr: "dokuzuncu" },
    { n: "10.", el: "δέκατος", tr: "onuncu" },
    { n: "20.", el: "εικοστός", tr: "yirminci" },
    { n: "100.", el: "εκατοστός", tr: "yüzüncü" }
  ],

  directions: [
    { tr: "sağa dön", el: "στρίψε δεξιά", tip: "" },
    { tr: "sola dön", el: "στρίψε αριστερά", tip: "" },
    { tr: "düz git", el: "πήγαινε ευθεία", tip: "" },
    { tr: "yakın", el: "κοντά", tip: "" },
    { tr: "uzak", el: "μακριά", tip: "" },
    { tr: "köşede", el: "στη γωνία", tip: "" },
    { tr: "karşısında", el: "απέναντι", tip: "" },
    { tr: "yanında", el: "δίπλα", tip: "" },
    { tr: "içinde", el: "μέσα", tip: "" },
    { tr: "dışarıda", el: "έξω", tip: "" },
    { tr: "yukarı", el: "πάνω", tip: "" },
    { tr: "aşağı", el: "κάτω", tip: "" }
  ],

  dictationExtra: [
    "Πού είναι η στάση του λεωφορείου;",
    "Θα ήθελα έναν καφέ χωρίς ζάχαρη.",
    "Χθες πήγα στην αγορά.",
    "Πρέπει να διαβάσω περισσότερο.",
    "Στρίψε δεξιά στο φανάρι.",
    "Το πρώτο μάθημα είναι δύσκολο.",
    "Δεν καταλαβαίνω καλά ακόμα.",
    "Αν είχα χρόνο θα ερχόμουν."
  ],

  vocab: {
    family: [
      { el: "μητέρα", tr: "anne", tip: "η μητέρα" },
      { el: "πατέρας", tr: "baba", tip: "ο πατέρας" },
      { el: "αδερφός", tr: "erkek kardeş", tip: "" },
      { el: "αδερφή", tr: "kız kardeş", tip: "" },
      { el: "γιος", tr: "oğul", tip: "ο γιος" },
      { el: "κόρη", tr: "kız", tip: "η κόρη" },
      { el: "παππούς", tr: "dede", tip: "" },
      { el: "γιαγιά", tr: "büyükanne", tip: "" },
      { el: "θείος", tr: "amca / dayı", tip: "" },
      { el: "θεία", tr: "hala / teyze", tip: "" }
    ],
    colors: [
      { el: "κόκκινο", tr: "kırmızı", tip: "" },
      { el: "μπλε", tr: "mavi", tip: "" },
      { el: "πράσινο", tr: "yeşil", tip: "" },
      { el: "κίτρινο", tr: "sarı", tip: "" },
      { el: "μαύρο", tr: "siyah", tip: "" },
      { el: "άσπρο", tr: "beyaz", tip: "" },
      { el: "γκρι", tr: "gri", tip: "" },
      { el: "καφέ", tr: "kahverengi", tip: "" },
      { el: "πορτοκαλί", tr: "turuncu", tip: "" },
      { el: "ροζ", tr: "pembe", tip: "" }
    ],
    shopping: [
      { el: "τιμή", tr: "fiyat", tip: "η τιμή" },
      { el: "έκπτωση", tr: "indirim", tip: "" },
      { el: "ταμείο", tr: "kasa", tip: "" },
      { el: "μέγεθος", tr: "beden / boyut", tip: "" },
      { el: "δοκιμαστήριο", tr: "deneme kabini", tip: "" },
      { el: "απόδειξη", tr: "fiş / makbuz", tip: "" },
      { el: "τσάντα", tr: "poşet / çanta", tip: "" },
      { el: "προσφορά", tr: "teklif / kampanya", tip: "" }
    ]
  },

  cloze: [
    { id: "c3a", text: "Στρίψε ___ στο φανάρι.", options: ["δεξιά", "καλό", "πρώτο", "ζεστό"], a: 0, why: "δεξιά = sağa." },
    { id: "c3b", text: "Ο ___ μου είναι γιατρός.", options: ["πατέρας", "κόκκινο", "ταμείο", "έκπτωση"], a: 0, why: "πατέρας = baba." },
    { id: "c3c", text: "Το αντίθετο του μεγάλου είναι ___.", options: ["μικρός", "ακριβός", "πρώτος", "νέος"], a: 0, why: "μεγάλος ↔ μικρός." },
    { id: "c3d", text: "Είναι η ___ φορά που έρχομαι.", options: ["πρώτη", "δεξιά", "κοντά", "άσπρη"], a: 0, why: "πρώτη = birinci (dişil)." },
    { id: "c3e", text: "Το μαγαζί είναι ___ από εδώ.", options: ["κοντά", "πρώτος", "κακός", "μαύρο"], a: 0, why: "κοντά = yakın." },
    { id: "c3f", text: "Θέλω την ___ στο ταμείο.", options: ["απόδειξη", "γιαγιά", "αδερφή", "γωνία"], a: 0, why: "απόδειξη = fiş." }
  ],

  reading: [
    {
      id: "r3a",
      title: "Οικογένεια",
      text: "Η Μαρία μένει με την οικογένειά της στην Αθήνα. Ο πατέρας της είναι δάσκαλος και η μητέρα της εργάζεται σε νοσοκομείο. Έχει έναν αδερφό και μια αδερφή.",
      q: "Η μητέρα της Μαρίας πού εργάζεται;",
      options: ["Σε σχολείο", "Σε νοσοκομείο", "Σε αεροδρόμιο", "Σε μαγαζί"],
      a: 1
    },
    {
      id: "r3b",
      title: "Οδηγίες",
      text: "Για να φτάσεις στην πλατεία, πήγαινε ευθεία μέχρι το φανάρι και μετά στρίψε αριστερά. Το καφέ είναι δίπλα στην τράπεζα, απέναντι από το ξενοδοχείο.",
      q: "Το καφέ πού είναι;",
      options: ["Μακριά από την τράπεζα", "Δίπλα στην τράπεζα", "Μέσα στο ξενοδοχείο", "Πάνω στο φανάρι"],
      a: 1
    }
  ]
};

(function applyExtras3() {
  if (typeof CONTENT !== "undefined" && EXTRAS3.vocab) {
    Object.keys(EXTRAS3.vocab).forEach((deck) => {
      CONTENT.decks[deck] = EXTRAS3.vocab[deck];
    });
  }
  if (typeof TRAINERS !== "undefined" && EXTRAS3.dictationExtra) {
    TRAINERS.dictation = TRAINERS.dictation.concat(EXTRAS3.dictationExtra);
  }
  if (typeof DRILLS !== "undefined") {
    if (EXTRAS3.cloze) DRILLS.cloze = DRILLS.cloze.concat(EXTRAS3.cloze);
    if (EXTRAS3.reading) DRILLS.reading = DRILLS.reading.concat(EXTRAS3.reading);
  }
})();
