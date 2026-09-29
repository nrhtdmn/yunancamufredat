/* Dördüncü içerik paketi — eşanlamlı, soru, bağlaç, duygu, hız */
const EXTRAS4 = {
  synonyms: [
    { a: "όμορφος", b: "ωραίος", tr: "güzel" },
    { a: "δουλειά", b: "εργασία", tr: "iş" },
    { a: "αυτοκίνητο", b: "αμάξι", tr: "araba" },
    { a: "σπίτι", b: "κατοικία", tr: "ev" },
    { a: "παιδί", b: "μωρό", tr: "çocuk (bağlama göre)" },
    { a: "γρήγορα", b: "γρήγορα / ταχύτατα", tr: "hızlıca — yakın: ταχύτατα" },
    { a: "αλλά", b: "όμως", tr: "ama" },
    { a: "επειδή", b: "διότι", tr: "çünkü" },
    { a: "πολύ", b: "πάρα πολύ", tr: "çok / çok fazla" },
    { a: "βοηθάω", b: "βοηθώ", tr: "yardım etmek" },
    { a: "αρχίζω", b: "ξεκινάω", tr: "başlamak" },
    { a: "τελειώνω", b: "ολοκληρώνω", tr: "bitirmek" }
  ],

  questions: [
    { tr: "Ne?", el: "Τι;", tip: "" },
    { tr: "Kim?", el: "Ποιος / Ποια;", tip: "cinsiyete göre" },
    { tr: "Nerede?", el: "Πού;", tip: "" },
    { tr: "Ne zaman?", el: "Πότε;", tip: "" },
    { tr: "Neden?", el: "Γιατί;", tip: "" },
    { tr: "Nasıl?", el: "Πώς;", tip: "" },
    { tr: "Ne kadar? (miktar)", el: "Πόσο;", tip: "" },
    { tr: "Kaç?", el: "Πόσοι / Πόσες / Πόσα;", tip: "" },
    { tr: "Hangisi?", el: "Ποιος / Ποια / Ποιο;", tip: "seçim" },
    { tr: "Kimin?", el: "Τίνος;", tip: "" }
  ],

  connectors: [
    { tr: "ama / fakat", el: "αλλά", tip: "karşıtlık" },
    { tr: "ancak / yine de", el: "ωστόσο", tip: "yazılı üslup" },
    { tr: "çünkü", el: "επειδή", tip: "" },
    { tr: "bu yüzden", el: "γι' αυτό", tip: "" },
    { tr: "dolayısıyla", el: "συνεπώς", tip: "YDS" },
    { tr: "örneğin", el: "για παράδειγμα", tip: "" },
    { tr: "ayrıca", el: "επίσης", tip: "" },
    { tr: "rağmen", el: "παρόλο που", tip: "" },
    { tr: "eğer", el: "αν", tip: "" },
    { tr: "önce", el: "πριν", tip: "" },
    { tr: "sonra", el: "μετά", tip: "" },
    { tr: "yani", el: "δηλαδή", tip: "" },
    { tr: "aksine", el: "αντίθετα", tip: "" },
    { tr: "özetle", el: "συμπερασματικά", tip: "" }
  ],

  frequency: [
    { tr: "her zaman", el: "πάντα", tip: "" },
    { tr: "sık sık", el: "συχνά", tip: "" },
    { tr: "genellikle", el: "συνήθως", tip: "" },
    { tr: "bazen", el: "μερικές φορές", tip: "" },
    { tr: "nadiren", el: "σπάνια", tip: "" },
    { tr: "asla", el: "ποτέ", tip: "olumsuz cümlede" },
    { tr: "her gün", el: "κάθε μέρα", tip: "" },
    { tr: "haftada bir", el: "μια φορά την εβδομάδα", tip: "" }
  ],

  emotions: [
    { tr: "mutlu", el: "χαρούμενος / χαρούμενη", tip: "" },
    { tr: "üzgün", el: "λυπημένος", tip: "" },
    { tr: "yorgun", el: "κουρασμένος", tip: "" },
    { tr: "kızgın", el: "θυμωμένος", tip: "" },
    { tr: "endişeli", el: "αγχωμένος", tip: "" },
    { tr: "şaşkın", el: "έκπληκτος", tip: "" },
    { tr: "korkmuş", el: "φοβισμένος", tip: "" },
    { tr: "gururlu", el: "περήφανος", tip: "" },
    { tr: "sıkılmış", el: "βαριεστημένος", tip: "" },
    { tr: "heyecanlı", el: "ενθουσιασμένος", tip: "" }
  ],

  body: [
    { tr: "baş", el: "κεφάλι", tip: "το κεφάλι" },
    { tr: "göz", el: "μάτι", tip: "το μάτι" },
    { tr: "kulak", el: "αυτί", tip: "" },
    { tr: "burun", el: "μύτη", tip: "η μύτη" },
    { tr: "ağız", el: "στόμα", tip: "" },
    { tr: "el", el: "χέρι", tip: "το χέρι" },
    { tr: "ayak", el: "πόδι", tip: "" },
    { tr: "sırt", el: "πλάτη", tip: "" },
    { tr: "kalp", el: "καρδιά", tip: "" },
    { tr: "mide", el: "στομάχι", tip: "" }
  ],

  phrases: [
    { el: "Καλημέρα, τι κάνεις;", tr: "Günaydın, nasılsın?" },
    { el: "Δεν πειράζει.", tr: "Sorun değil." },
    { el: "Ένα λεπτό, παρακαλώ.", tr: "Bir dakika, lütfen." },
    { el: "Μιλάτε αγγλικά;", tr: "İngilizce konuşuyor musunuz?" },
    { el: "Πόσο κάνει;", tr: "Kaç para?" },
    { el: "Χάρηκα που σε γνώρισα.", tr: "Tanıştığıma memnun oldum." },
    { el: "Τα λέμε αύριο.", tr: "Yarın görüşürüz." },
    { el: "Να 'σαι καλά.", tr: "İyi ol / sağ ol." },
    { el: "Συγγνώμη, αργώ.", tr: "Özür dilerim, gecikiyorum." },
    { el: "Έχεις δίκιο.", tr: "Haklısın." },
    { el: "Δεν έχω ιδέα.", tr: "Hiçbir fikrim yok." },
    { el: "Άσε με ήσυχο.", tr: "Beni rahat bırak." },
    { el: "Πάμε για καφέ;", tr: "Kahveye gidelim mi?" },
    { el: "Καλό Σαββατοκύριακο!", tr: "İyi hafta sonu!" }
  ],

  scrambleExtra: [
    { words: ["Πόσο", "κάνει", "αυτό"], answer: "Πόσο κάνει αυτό", tr: "Bu kaç para?" },
    { words: ["Συχνά", "πηγαίνω", "στο", "γυμναστήριο"], answer: "Συχνά πηγαίνω στο γυμναστήριο", tr: "Sık sık spor salonuna giderim" },
    { words: ["Είμαι", "κουρασμένος", "σήμερα"], answer: "Είμαι κουρασμένος σήμερα", tr: "Bugün yorgunum" },
    { words: ["Γιατί", "δεν", "ήρθες", "χθες"], answer: "Γιατί δεν ήρθες χθες", tr: "Dün neden gelmedin?" },
    { words: ["Παρόλο", "που", "βρέχει", "θα", "βγω"], answer: "Παρόλο που βρέχει θα βγω", tr: "Yağmur yağmasına rağmen çıkacağım" },
    { words: ["Συνεπώς", "πρέπει", "να", "διαβάσουμε"], answer: "Συνεπώς πρέπει να διαβάσουμε", tr: "Dolayısıyla okumalıyız" }
  ],

  tipsExtra: [
    "Soru sözcüklerini cümlede ezberle: Πού μένεις; Πότε φεύγεις;",
    "Bağlaçlar YDS’de skor getirir: ωστόσο, συνεπώς, παρόλο που.",
    "Eşanlamlı çiftler cloze ve okumada tuzak oluşturur — bağlam oku.",
    "Duygu sıfatlarında cinsiyet uyumu: κουρασμένος / κουρασμένη.",
    "πάντα / συχνά / ποτέ — olumsuz cümlede ποτέ ile Δεν birlikte gelir.",
    "Günün kalıbını yüksek sesle 3 kez tekrarla, sonra yaz.",
    "Hızlı 10’da doğruluk > hız; yanlışları Yanlış tekrarına at.",
    "Vücut kelimelerini ağrı cümlesiyle bağla: Πονάει το κεφάλι μου."
  ],

  vocab: {
    city: [
      { el: "πόλη", tr: "şehir", tip: "η πόλη" },
      { el: "δωμάτιο", tr: "oda", tip: "" },
      { el: "πλατεία", tr: "meydan", tip: "" },
      { el: "δρόμος", tr: "cadde / yol", tip: "" },
      { el: "γέφυρα", tr: "köprü", tip: "" },
      { el: "πάρκο", tr: "park", tip: "" },
      { el: "μουσείο", tr: "müze", tip: "" },
      { el: "σταθμός", tr: "istasyon", tip: "" },
      { el: "ελευθερία", tr: "özgürlük", tip: "sokak adı da olabilir" },
      { el: "δημαρχείο", tr: "belediye", tip: "" }
    ],
    school: [
      { el: "σχολείο", tr: "okul", tip: "" },
      { el: "μάθημα", tr: "ders", tip: "" },
      { el: "δάσκαλος", tr: "öğretmen", tip: "" },
      { el: "μαθητής", tr: "öğrenci", tip: "" },
      { el: "εργασία", tr: "ödev / iş", tip: "" },
      { el: "διάλειμμα", tr: "teneffüs", tip: "" },
      { el: "βιβλιοθήκη", tr: "kütüphane", tip: "" },
      { el: "βαθμός", tr: "not", tip: "" }
    ],
    tech: [
      { el: "υπολογιστής", tr: "bilgisayar", tip: "" },
      { el: "κινητό", tr: "cep telefonu", tip: "" },
      { el: "διαδίκτυο", tr: "internet", tip: "" },
      { el: "κωδικός", tr: "şifre / kod", tip: "" },
      { el: "αρχείο", tr: "dosya", tip: "" },
      { el: "εκτύπωση", tr: "yazdırma", tip: "" },
      { el: "οθόνη", tr: "ekran", tip: "" },
      { el: "εφαρμογή", tr: "uygulama", tip: "" }
    ]
  },

  cloze: [
    { id: "c4a", text: "___ μένεις; Στην Αθήνα.", options: ["Πού", "Πότε", "Γιατί", "Πώς"], a: 0, why: "Πού = nerede." },
    { id: "c4b", text: "Διαβάζω ___ κάθε μέρα.", options: ["πάντα", "ποτέ όχι", "δεξιά", "κεφάλι"], a: 0, why: "πάντα = her zaman (veya κάθε μέρα ile uyumlu sıklık)." },
    { id: "c4c", text: "Βρέχει, ___ θα πάρω ομπρέλα.", options: ["γι' αυτό", "παρόλο", "τίνος", "μάτι"], a: 0, why: "γι' αυτό = bu yüzden." },
    { id: "c4d", text: "Είμαι πολύ ___ σήμερα.", options: ["κουρασμένος", "δρόμος", "αρχείο", "πλατεία"], a: 0, why: "κουρασμένος = yorgun." },
    { id: "c4e", text: "Πονάει το ___ μου.", options: ["κεφάλι", "δημαρχείο", "κωδικός", "διάλειμμα"], a: 0, why: "κεφάλι = baş." },
    { id: "c4f", text: "___ που αργείς, σε περιμένω.", options: ["Παρόλο", "Συνεπώς μόνο", "Τίνος", "Πόσες"], a: 0, why: "Παρόλο που = rağmen." },
    { id: "c4g", text: "Το ___ του «αλλά» είναι «όμως».", options: ["συνώνυμο", "αντίθετο μόνο", "κεφάλι", "πόδι"], a: 0, why: "αλλά ≈ όμως." },
    { id: "c4h", text: "___ φεύγεις; Αύριο το πρωί.", options: ["Πότε", "Πού μόνο", "Χέρι", "Οθόνη"], a: 0, why: "Πότε = ne zaman." }
  ],

  reading: [
    {
      id: "r4a",
      title: "Ρουτίνα",
      text: "Ο Νίκος ξυπνάει κάθε μέρα στις επτά. Συνήθως πίνει καφέ και μετά πηγαίνει στη δουλειά με το λεωφορείο. Σπάνια παίρνει ταξί, επειδή είναι ακριβό.",
      q: "Γιατί σπάνια παίρνει ταξί;",
      options: ["Επειδή είναι ακριβό", "Επειδή δεν έχει λεωφορείο", "Επειδή ξυπνάει αργά", "Επειδή δεν πίνει καφέ"],
      a: 0
    },
    {
      id: "r4b",
      title: "Στο μουσείο",
      text: "Η Άννα πήγε στο μουσείο με τους φίλους της. Παρόλο που ήταν κουρασμένη, ενθουσιάστηκε με την έκθεση. Συμπερασματικά, θέλει να ξαναπάει σύντομα.",
      q: "Τι θέλει να κάνει σύντομα;",
      options: ["Να κοιμηθεί μόνο", "Να ξαναπάει στο μουσείο", "Να αγοράσει ταξί", "Να αλλάξει δουλειά"],
      a: 1
    },
    {
      id: "r4c",
      title: "Τεχνολογία",
      text: "Χωρίς διαδίκτυο είναι δύσκολο να δουλέψεις από το σπίτι. Πολλοί χρησιμοποιούν εφαρμογές στο κινητό για να οργανώσουν τα αρχεία τους. Ωστόσο, ο κωδικός πρέπει να είναι δυνατός.",
      q: "Τι τονίζει το κείμενο για τον κωδικό;",
      options: ["Να είναι δυνατός", "Να είναι σύντομος", "Να λείπει", "Να είναι μόνο αριθμοί χωρίς λόγο"],
      a: 0
    }
  ],

  examExtra: [
    { q: "«ωστόσο» en yakın?", options: ["çünkü", "yine de", "içinde", "asla"], a: 1, kind: "vocab" },
    { q: "Πού dilbilgisel işlevi?", options: ["Zaman", "Yer", "Miktar", "Sahip"], a: 1, kind: "grammar" },
    { q: "ποτέ tipik kullanımı?", options: ["Her zaman olumlu", "Asla (olumsuz bağlam)", "Sadece gelecek", "Madde"], a: 1, kind: "grammar" },
    { q: "αλλά ≈ ?", options: ["όμως", "επειδή", "πάντα", "κεφάλι"], a: 0, kind: "vocab" },
    { q: "συμπερασματικά?", options: ["başlangıçta", "özetle / sonuç olarak", "belki", "sola"], a: 1, kind: "vocab" },
    { q: "YDS bağlaç sorusunda ilk bak?", options: ["Sadece uzunluk", "İlişki türü (karşıt/neden)", "İlk şık", "Resim"], a: 1, kind: "strategy" },
    { q: "κουρασμένη cinsiyeti?", options: ["Eril", "Dişil", "Nötr zorunlu", "Fiil"], a: 1, kind: "grammar" },
    { q: "γι' αυτό?", options: ["rağmen", "bu yüzden", "kim", "kulak"], a: 1, kind: "vocab" },
    { q: "Πόσες ile uyum?", options: ["Dişil çoğul", "Sadece nötr", "Sadece eril tekil", "Zamir değil"], a: 0, kind: "grammar" },
    { q: "Okuma sorusunda tuzak?", options: ["Metindeki kelimeyi farklı anlamda şıkta kullanmak", "Hiç metin yok", "Sadece matematik", "Boş sayfa"], a: 0, kind: "strategy" }
  ],

  badgesExtra: [
    { id: "flash5_5", title: "Hızlı ateş", desc: "5× Hızlı 5 bitir", check: (s) => ((s.trainerStats || {}).flash5 || 0) >= 5 },
    { id: "opposite10", title: "Zıt avcısı", desc: "10 zıt turu", check: (s) => ((s.trainerStats || {}).opposite || 0) >= 10 },
    { id: "connector10", title: "Bağlaççı", desc: "10 bağlaç turu", check: (s) => ((s.trainerStats || {}).connector || 0) >= 10 },
    { id: "speed10_3", title: "Sprint", desc: "3× Hızlı 10", check: (s) => ((s.trainerStats || {}).speed10 || 0) >= 3 },
    { id: "streak14", title: "İki hafta", desc: "14 gün seri", check: (s) => (s.streak || 0) >= 14 },
    { id: "cards100", title: "Kart efsanesi", desc: "100 kart tekrarı", check: (s) => (s.cardsReviewed || 0) >= 100 }
  ]
};

(function applyExtras4() {
  if (typeof CONTENT !== "undefined" && EXTRAS4.vocab) {
    Object.keys(EXTRAS4.vocab).forEach((deck) => {
      CONTENT.decks[deck] = EXTRAS4.vocab[deck];
    });
  }
  if (typeof TRAINERS !== "undefined") {
    if (EXTRAS4.tipsExtra) TRAINERS.tips = TRAINERS.tips.concat(EXTRAS4.tipsExtra);
    if (EXTRAS4.badgesExtra) TRAINERS.badges = TRAINERS.badges.concat(EXTRAS4.badgesExtra);
  }
  if (typeof EXTRAS2 !== "undefined") {
    if (EXTRAS4.scrambleExtra) EXTRAS2.scramble = EXTRAS2.scramble.concat(EXTRAS4.scrambleExtra);
    if (EXTRAS4.examExtra) EXTRAS2.examBank = EXTRAS2.examBank.concat(EXTRAS4.examExtra);
  }
  if (typeof DRILLS !== "undefined") {
    if (EXTRAS4.cloze) DRILLS.cloze = DRILLS.cloze.concat(EXTRAS4.cloze);
    if (EXTRAS4.reading) DRILLS.reading = DRILLS.reading.concat(EXTRAS4.reading);
  }
})();
