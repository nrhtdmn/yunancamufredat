/* Beşinci içerik paketi — çoğul, false friend, που, restoran, YDS kelime */
const EXTRAS5 = {
  plurals: [
    { sg: "το βιβλίο", pl: "τα βιβλία", tr: "kitap" },
    { sg: "ο άντρας", pl: "οι άντρες", tr: "adam" },
    { sg: "η γυναίκα", pl: "οι γυναίκες", tr: "kadın" },
    { sg: "το παιδί", pl: "τα παιδιά", tr: "çocuk" },
    { sg: "η πόλη", pl: "οι πόλεις", tr: "şehir" },
    { sg: "ο φίλος", pl: "οι φίλοι", tr: "arkadaş" },
    { sg: "η μέρα", pl: "οι μέρες", tr: "gün" },
    { sg: "το σπίτι", pl: "τα σπίτια", tr: "ev" },
    { sg: "ο δάσκαλος", pl: "οι δάσκαλοι", tr: "öğretmen" },
    { sg: "η λέξη", pl: "οι λέξεις", tr: "kelime" },
    { sg: "το πρόβλημα", pl: "τα προβλήματα", tr: "sorun" },
    { sg: "η χώρα", pl: "οι χώρες", tr: "ülke" }
  ],

  falseFriends: [
    { el: "λίγο", tr: "az / biraz", trap: "illegal değil", tip: "false friend" },
    { el: "πόρτα", tr: "kapı", trap: "porte = kapı (FR); limonata değil", tip: "" },
    { el: "μαχαίρι", tr: "bıçak", trap: "makarna değil", tip: "" },
    { el: "κάτι", tr: "bir şey", trap: "" },
    { el: "πάντα", tr: "her zaman", trap: "pantolon değil", tip: "" },
    { el: "νήσος / νησί", tr: "ada", trap: "" },
    { el: "ράφι", tr: "raf", trap: "" },
    { el: "κανένας", tr: "hiç kimse / hiçbiri", trap: "" },
    { el: "άρα", tr: "öyleyse / demek ki", trap: "araba değil", tip: "" },
    { el: "σήμερα", tr: "bugün", trap: "" }
  ],

  relative: [
    { tr: "Konuşan adam doktor.", el: "Ο άνθρωπος που μιλάει είναι γιατρός.", tip: "που = ki / -en" },
    { tr: "Okuduğum kitap zor.", el: "Το βιβλίο που διαβάζω είναι δύσκολο.", tip: "" },
    { tr: "Gördüğüm kadın öğretmen.", el: "Η γυναίκα που είδα είναι δασκάλα.", tip: "" },
    { tr: "Yaşadığım şehir büyük.", el: "Η πόλη που μένω είναι μεγάλη.", tip: "" },
    { tr: "İstediğim şey bu.", el: "Αυτό που θέλω είναι αυτό.", tip: "" },
    { tr: "Geldiğin gün yağmur yağdı.", el: "Την ημέρα που ήρθες έβρεχε.", tip: "" },
    { tr: "Çalıştığım ofis yakın.", el: "Το γραφείο που δουλεύω είναι κοντά.", tip: "" },
    { tr: "Tanıdığım kişi yardımcı oldu.", el: "Το άτομο που ξέρω βοήθησε.", tip: "" }
  ],

  restaurant: [
    { tr: "Menüyü alabilir miyim?", el: "Τον κατάλογο, παρακαλώ;", tip: "" },
    { tr: "Hesap lütfen", el: "Τον λογαριασμό, παρακαλώ", tip: "" },
    { tr: "Su isterim", el: "Θα ήθελα νερό", tip: "" },
    { tr: "Acısız / az acılı", el: "Όχι πικάντικο", tip: "" },
    { tr: "Öneri var mı?", el: "Τι προτείνετε;", tip: "" },
    { tr: "Vejetaryen seçenek?", el: "Έχετε χορτοφαγικό;", tip: "" },
    { tr: "Afiyet olsun (servis)", el: "Καλή όρεξη", tip: "" },
    { tr: "Çok lezzetliydi", el: "Ήταν πολύ νόστιμο", tip: "" },
    { tr: "Paket yapar mısınız?", el: "Για πακέτο, παρακαλώ;", tip: "" },
    { tr: "Rezervasyonum var", el: "Έχω κράτηση", tip: "" }
  ],

  cases: [
    { tr: "kitabı görüyorum (nesne)", el: "βλέπω το βιβλίο", tip: "aitiatiki" },
    { tr: "Maria'ya veriyorum", el: "δίνω στη Μαρία", tip: "edat + isim" },
    { tr: "çocuğun kitabı", el: "το βιβλίο του παιδιού", tip: "genitif" },
    { tr: "arkadaşlarla", el: "με τους φίλους", tip: "" },
    { tr: "okula gidiyorum", el: "πηγαίνω στο σχολείο", tip: "σε + το → στο" },
    { tr: "Atina'dan geliyorum", el: "έρχομαι από την Αθήνα", tip: "" },
    { tr: "ev için", el: "για το σπίτι", tip: "" },
    { tr: "sorunsuz", el: "χωρίς πρόβλημα", tip: "" }
  ],

  ydsVocab: [
    { el: "υπόθεση", tr: "varsayım / dava", tip: "YDS" },
    { el: "συμπέρασμα", tr: "sonuç", tip: "" },
    { el: "επιχείρημα", tr: "argüman", tip: "" },
    { el: "ένδειξη", tr: "gösterge / belirti", tip: "" },
    { el: "περιορισμός", tr: "kısıtlama", tip: "" },
    { el: "επίδραση", tr: "etki", tip: "" },
    { el: "ανάπτυξη", tr: "gelişme / büyüme", tip: "" },
    { el: "περιβάλλον", tr: "çevre / ortam", tip: "" },
    { el: "έρευνα", tr: "araştırma", tip: "" },
    { el: "στοιχεία", tr: "veriler / unsurlar", tip: "" },
    { el: "αξιολόγηση", tr: "değerlendirme", tip: "" },
    { el: "προοπτική", tr: "perspektif / beklenti", tip: "" }
  ],

  phrasesExtra: [
    { el: "Πώς πάει η δουλειά;", tr: "İşler nasıl?" },
    { el: "Άστο για αργότερα.", tr: "Sonraya bırak." },
    { el: "Έχει νόημα.", tr: "Mantıklı." },
    { el: "Δεν το περίμενα.", tr: "Bunu beklemiyordum." },
    { el: "Στο περίπου.", tr: "Yaklaşık / aşağı yukarı." },
    { el: "Καλύτερα αργά παρά ποτέ.", tr: "Hiç yoktan iyidir (geç olsun güç olmasın)." },
    { el: "Τι ώρα βολεύει;", tr: "Saat kaç uygun?" },
    { el: "Άλλη φορά.", tr: "Başka sefer." }
  ],

  scrambleExtra: [
    { words: ["Τον", "λογαριασμό", "παρακαλώ"], answer: "Τον λογαριασμό παρακαλώ", tr: "Hesap lütfen" },
    { words: ["Το", "βιβλίο", "που", "διαβάζω", "είναι", "δύσκολο"], answer: "Το βιβλίο που διαβάζω είναι δύσκολο", tr: "Okuduğum kitap zor" },
    { words: ["Οι", "γυναίκες", "είναι", "εδώ"], answer: "Οι γυναίκες είναι εδώ", tr: "Kadınlar burada" },
    { words: ["Έχω", "κράτηση", "για", "δύο"], answer: "Έχω κράτηση για δύο", tr: "İki kişilik rezervasyonum var" },
    { words: ["Πηγαίνω", "στο", "σχολείο", "κάθε", "μέρα"], answer: "Πηγαίνω στο σχολείο κάθε μέρα", tr: "Her gün okula giderim" },
    { words: ["Η", "έρευνα", "δείχνει", "αποτελέσματα"], answer: "Η έρευνα δείχνει αποτελέσματα", tr: "Araştırma sonuçlar gösteriyor" }
  ],

  dictationExtra: [
    "Τον κατάλογο, παρακαλώ;",
    "Το βιβλίο που διαβάζω είναι δύσκολο.",
    "Οι φίλοι μου μένουν στην Αθήνα.",
    "Έχω κράτηση για δύο άτομα.",
    "Η έρευνα δείχνει σημαντικά στοιχεία.",
    "Δίνω το βιβλίο στη Μαρία.",
    "Χωρίς πρόβλημα, ευχαριστώ.",
    "Τι προτείνετε από τον κατάλογο;"
  ],

  tipsExtra: [
    "Çoğul: το βιβλίο → τα βιβλία; η γυναίκα → οι γυναίκες.",
    "που göreli zamir: Ο άνθρωπος που… = …olan kişi.",
    "False friend: λίγο = az (illegal değil); πόρτα = kapı.",
    "σε + το = στο; σε + την = στην — edat kaynaşması ezberle.",
    "Restoranda: Τον λογαριασμό · Τον κατάλογο · Τι προτείνετε;",
    "YDS kelimesini cümlede gör: η έρευνα δείχνει…",
    "Tekil/çoğul madde: ο/η/το → οι/οι/τα.",
    "Hata günlüğüne false friend yaz; aynı tuzak tekrar etmesin."
  ],

  vocab: {
    nature: [
      { el: "θάλασσα", tr: "deniz", tip: "η θάλασσα" },
      { el: "βουνό", tr: "dağ", tip: "το βουνό" },
      { el: "ποτάμι", tr: "nehir", tip: "" },
      { el: "δάσος", tr: "orman", tip: "" },
      { el: "νησί", tr: "ada", tip: "" },
      { el: "παραλία", tr: "plaj", tip: "" },
      { el: "ήλιος", tr: "güneş", tip: "" },
      { el: "φεγγάρι", tr: "ay (gök)", tip: "" }
    ],
    sports: [
      { el: "ποδόσφαιρο", tr: "futbol", tip: "" },
      { el: "κολύμπι", tr: "yüzme", tip: "" },
      { el: "τρέξιμο", tr: "koşu", tip: "" },
      { el: "γυμναστήριο", tr: "spor salonu", tip: "" },
      { el: "ομάδα", tr: "takım", tip: "" },
      { el: "αγώνας", tr: "maç / yarış", tip: "" },
      { el: "νίκη", tr: "zafer", tip: "" },
      { el: "προπόνηση", tr: "antrenman", tip: "" }
    ],
    money: [
      { el: "χρήματα", tr: "para", tip: "τα χρήματα" },
      { el: "τράπεζα", tr: "banka", tip: "" },
      { el: "κάρτα", tr: "kart", tip: "" },
      { el: "μετρητά", tr: "nakit", tip: "" },
      { el: "λογαριασμός", tr: "hesap", tip: "" },
      { el: "φόρος", tr: "vergi", tip: "" },
      { el: "δάνειο", tr: "kredi / borç", tip: "" },
      { el: "έξοδα", tr: "giderler", tip: "" }
    ]
  },

  cloze: [
    { id: "c5a", text: "___ βιβλία είναι πάνω στο τραπέζι.", options: ["Τα", "Το", "Η", "Οι"], a: 0, why: "βιβλία nötr çoğul → τα." },
    { id: "c5b", text: "Ο άνθρωπος ___ μιλάει είναι γιατρός.", options: ["που", "και", "αν", "για"], a: 0, why: "που göreli." },
    { id: "c5c", text: "Τον ___, παρακαλώ.", options: ["λογαριασμό", "έρευνα", "βουνό", "νίκη"], a: 0, why: "hesap." },
    { id: "c5d", text: "Το αντίθετο του «πολύ» değil ama «λίγο» = ___.", options: ["az / biraz", "illegal", "kapı", "futbol"], a: 0, why: "false friend uyarısı." },
    { id: "c5e", text: "Πηγαίνω ___ σχολείο.", options: ["στο", "σε το", "στης", "από το μόνο"], a: 0, why: "σε+το→στο." },
    { id: "c5f", text: "Η ___ δείχνει αποτελέσματα.", options: ["έρευνα", "παραλία", "κάρτα", "ομάδα"], a: 0, why: "έρευνα = araştırma." },
    { id: "c5g", text: "Οι ___ είναι εδώ.", options: ["γυναίκες", "γυναίκα", "το γυναίκα", "τα γυναίκα"], a: 0, why: "çoğul dişil." },
    { id: "c5h", text: "Έχετε ___ πιάτο;", options: ["χορτοφαγικό", "βουνό", "δάνειο", "φεγγάρι"], a: 0, why: "vejetaryen." }
  ],

  reading: [
    {
      id: "r5a",
      title: "Στο εστιατόριο",
      text: "Η Ελένη ζήτησε τον κατάλογο και μετά ένα χορτοφαγικό πιάτο. Στο τέλος είπε «Τον λογαριασμό, παρακαλώ». Το φαγητό ήταν νόστιμο και πλήρωσε με κάρτα.",
      q: "Πώς πλήρωσε η Ελένη;",
      options: ["Με μετρητά", "Με κάρτα", "Δεν πλήρωσε", "Με δάνειο"],
      a: 1
    },
    {
      id: "r5b",
      title: "Η έρευνα",
      text: "Η νέα έρευνα για το περιβάλλον δείχνει σημαντικά στοιχεία. Σύμφωνα με τα συμπεράσματα, η επίδραση της ρύπανσης είναι μεγάλη. Οι επιστήμονες ζητούν περιορισμούς.",
      q: "Τι ζητούν οι επιστήμονες;",
      options: ["Περιορισμούς", "Μόνο διακοπές", "Νέα κάρτα", "Ποδόσφαιρο"],
      a: 0
    },
    {
      id: "r5c",
      title: "Οι φίλοι",
      text: "Οι φίλοι που γνώρισα στην Αθήνα μένουν κοντά στη θάλασσα. Τα Σαββατοκύριακα πηγαίνουμε στην παραλία ή στο βουνό. Χωρίς αυτούς η πόλη θα ήταν βαρετή.",
      q: "Πού μένουν οι φίλοι;",
      options: ["Κοντά στη θάλασσα", "Μόνο στο βουνό", "Σε άλλη χώρα", "Στο γυμναστήριο"],
      a: 0
    }
  ],

  examExtra: [
    { q: "που göreli işlevi?", options: ["ve", "ki / -en/-an", "ama", "asla"], a: 1, kind: "grammar" },
    { q: "τα βιβλία maddesi?", options: ["tekil dişil", "nötr çoğul", "eril tekil", "edat"], a: 1, kind: "grammar" },
    { q: "λίγο anlamı?", options: ["illegal", "az / biraz", "kapı", "ada"], a: 1, kind: "vocab" },
    { q: "στο kaynaşması?", options: ["σε + το", "από + η", "για + οι", "με + τα zorunlu"], a: 0, kind: "grammar" },
    { q: "έρευνα?", options: ["plaj", "araştırma", "futbol", "vergi"], a: 1, kind: "vocab" },
    { q: "Τον λογαριασμό ne zaman?", options: ["Menü isterken", "Hesap isterken", "Selamlaşırken", "Yüzmede"], a: 1, kind: "vocab" },
    { q: "οι γυναίκες?", options: ["tekil", "çoğul dişil", "nötr", "fiil"], a: 1, kind: "grammar" },
    { q: "συμπέρασμα?", options: ["giriş", "sonuç", "soru", "spor"], a: 1, kind: "vocab" },
    { q: "False friend stratejisi?", options: ["Benzer Türkçeye güven", "Yunanca anlamı doğrula", "Atla", "Sadece ses"], a: 1, kind: "strategy" },
    { q: "χωρίς πρόβλημα?", options: ["sorunla", "sorunsuz", "kapıda", "asla"], a: 1, kind: "vocab" }
  ],

  adjectivesExtra: [
    { tr: "temiz oda (dişil)", el: "καθαρή κάμαρα", tip: "" },
    { tr: "kirli cam (nötr)", el: "βρώμικο τζάμι", tip: "" },
    { tr: "pahalı otel (nötr)", el: "ακριβό ξενοδοχείο", tip: "" },
    { tr: "ucuz bilet (nötr)", el: "φτηνό εισιτήριο", tip: "" },
    { tr: "sessiz gece", el: "ήσυχη νύχτα", tip: "" },
    { tr: "gürültülü sokak", el: "θορυβώδης δρόμος", tip: "" }
  ],

  badgesExtra: [
    { id: "plural10", title: "Çoğulcu", desc: "10 çoğul turu", check: (s) => ((s.trainerStats || {}).plural || 0) >= 10 },
    { id: "relative8", title: "που ustası", desc: "8 göreli tur", check: (s) => ((s.trainerStats || {}).relative || 0) >= 8 },
    { id: "restaurant5", title: "Garson", desc: "5 restoran turu", check: (s) => ((s.trainerStats || {}).restaurant || 0) >= 5 },
    { id: "exam3", title: "Denemeci", desc: "3 mini sınav", check: (s) => ((s.trainerStats || {}).exam || 0) >= 3 },
    { id: "cards200", title: "Kart arşivi", desc: "200 kart tekrarı", check: (s) => (s.cardsReviewed || 0) >= 200 }
  ]
};

(function applyExtras5() {
  if (typeof CONTENT !== "undefined" && EXTRAS5.vocab) {
    Object.keys(EXTRAS5.vocab).forEach((deck) => {
      CONTENT.decks[deck] = EXTRAS5.vocab[deck];
    });
    if (EXTRAS5.ydsVocab) {
      CONTENT.decks.yds = (CONTENT.decks.yds || []).concat(EXTRAS5.ydsVocab);
    }
  }
  if (typeof TRAINERS !== "undefined") {
    if (EXTRAS5.tipsExtra) TRAINERS.tips = TRAINERS.tips.concat(EXTRAS5.tipsExtra);
    if (EXTRAS5.badgesExtra) TRAINERS.badges = TRAINERS.badges.concat(EXTRAS5.badgesExtra);
  }
  if (typeof EXTRAS2 !== "undefined") {
    if (EXTRAS5.scrambleExtra) EXTRAS2.scramble = EXTRAS2.scramble.concat(EXTRAS5.scrambleExtra);
    if (EXTRAS5.examExtra) EXTRAS2.examBank = EXTRAS2.examBank.concat(EXTRAS5.examExtra);
    if (EXTRAS5.adjectivesExtra) EXTRAS2.adjectives = EXTRAS2.adjectives.concat(EXTRAS5.adjectivesExtra);
  }
  if (typeof EXTRAS4 !== "undefined" && EXTRAS5.phrasesExtra) {
    EXTRAS4.phrases = EXTRAS4.phrases.concat(EXTRAS5.phrasesExtra);
  }
  if (typeof TRAINERS !== "undefined" && EXTRAS5.dictationExtra) {
    TRAINERS.dictation = TRAINERS.dictation.concat(EXTRAS5.dictationExtra);
  }
  if (typeof DRILLS !== "undefined") {
    if (EXTRAS5.cloze) DRILLS.cloze = DRILLS.cloze.concat(EXTRAS5.cloze);
    if (EXTRAS5.reading) DRILLS.reading = DRILLS.reading.concat(EXTRAS5.reading);
  }
})();
