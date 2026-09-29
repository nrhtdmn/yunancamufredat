/* Dokuzuncu paket — gelecek zarflar, alışkanlık, alışveriş diyalog, duygu cümleleri */
const EXTRAS9 = {
  futureTime: [
    { tr: "yarın", el: "αύριο", tip: "" },
    { tr: "öbür gün", el: "μεθαύριο", tip: "" },
    { tr: "gelecek hafta", el: "την επόμενη εβδομάδα", tip: "" },
    { tr: "gelecek ay", el: "τον επόμενο μήνα", tip: "" },
    { tr: "gelecek yıl", el: "του χρόνου / την επόμενη χρονιά", tip: "" },
    { tr: "birazdan", el: "σε λίγο", tip: "" },
    { tr: "bu akşam", el: "απόψε", tip: "" },
    { tr: "haftaya", el: "σε μια εβδομάδα", tip: "" }
  ],

  habits: [
    { tr: "her sabah kahve içerim", el: "Κάθε πρωί πίνω καφέ", tip: "" },
    { tr: "genelde yürürüm", el: "Συνήθως περπατάω", tip: "" },
    { tr: "sık sık okurum", el: "Διαβάζω συχνά", tip: "" },
    { tr: "nadiren TV izlerim", el: "Σπάνια βλέπω τηλεόραση", tip: "" },
    { tr: "asla sigara içmem", el: "Δεν καπνίζω ποτέ", tip: "" },
    { tr: "haftada üç kez spor yaparım", el: "Κάνω γυμναστική τρεις φορές την εβδομάδα", tip: "" },
    { tr: "akşamları erken yatarım", el: "Το βράδυ κοιμάμαι νωρίς", tip: "" },
    { tr: "Pazar günleri dinlenirim", el: "Τις Κυριακές ξεκουράζομαι", tip: "" }
  ],

  shopTalk: [
    { tr: "Bunu deneyebilir miyim?", el: "Μπορώ να το δοκιμάσω;", tip: "" },
    { tr: "Başka renk var mı?", el: "Έχετε άλλο χρώμα;", tip: "" },
    { tr: "İndirimde mi?", el: "Είναι σε έκπτωση;", tip: "" },
    { tr: "Fiş alabilir miyim?", el: "Μπορώ να έχω την απόδειξη;", tip: "" },
    { tr: "Kartla ödeyebilir miyim?", el: "Μπορώ να πληρώσω με κάρτα;", tip: "" },
    { tr: "Çok büyük / küçük", el: "Είναι πολύ μεγάλο / μικρό", tip: "" },
    { tr: "Bunu alıyorum", el: "Θα το πάρω", tip: "" },
    { tr: "Sadece bakıyorum", el: "Απλά κοιτάζω", tip: "" }
  ],

  emotionSent: [
    { tr: "Çok mutluyum", el: "Είμαι πολύ χαρούμενος/η", tip: "" },
    { tr: "Endişeleniyorum", el: "Ανησυχώ", tip: "" },
    { tr: "Sinirlendim", el: "Θύμωσα", tip: "" },
    { tr: "Şaşırdım", el: "Ξαφνιάστηκα", tip: "" },
    { tr: "Utandım", el: "Ντράπηκα", tip: "" },
    { tr: "Gurur duyuyorum", el: "Νιώθω περήφανος/η", tip: "" },
    { tr: "Sıkıldım", el: "Βαριέμαι", tip: "" },
    { tr: "Rahatladım", el: "Νιώθω ανακουφισμένος/η", tip: "" }
  ],

  prepositionPlus: [
    { tr: "masanın üstünde", el: "πάνω στο τραπέζι", tip: "" },
    { tr: "sandalyenin altında", el: "κάτω από την καρέκλα", tip: "" },
    { tr: "evin önünde", el: "μπροστά από το σπίτι", tip: "" },
    { tr: "arkasında", el: "πίσω από…", tip: "" },
    { tr: "içinde", el: "μέσα σε…", tip: "" },
    { tr: "dışında", el: "έξω από…", tip: "" },
    { tr: "arasında", el: "ανάμεσα σε…", tip: "" },
    { tr: "etrafında", el: "γύρω από…", tip: "" }
  ],

  phrasesExtra: [
    { el: "Αύριο θα φύγω νωρίς.", tr: "Yarın erken gideceğim." },
    { el: "Σε λίγο έρχομαι.", tr: "Birazdan geliyorum." },
    { el: "Μπορώ να το δοκιμάσω;", tr: "Bunu deneyebilir miyim?" },
    { el: "Απλά κοιτάζω, ευχαριστώ.", tr: "Sadece bakıyorum, teşekkürler." },
    { el: "Κάθε πρωί πίνω καφέ.", tr: "Her sabah kahve içerim." },
    { el: "Νιώθω πολύ χαρούμενος σήμερα.", tr: "Bugün çok mutluyum." },
    { el: "Το βιβλίο είναι πάνω στο τραπέζι.", tr: "Kitap masanın üstünde." },
    { el: "Του χρόνου θα μάθω καλύτερα ελληνικά.", tr: "Gelecek yıl Yunancayı daha iyi öğreneceğim." }
  ],

  scrambleExtra: [
    { words: ["Αύριο", "θα", "πάω", "στην", "δουλειά"], answer: "Αύριο θα πάω στην δουλειά", tr: "Yarın işe gideceğim" },
    { words: ["Μπορώ", "να", "πληρώσω", "με", "κάρτα"], answer: "Μπορώ να πληρώσω με κάρτα", tr: "Kartla ödeyebilir miyim?" },
    { words: ["Κάθε", "πρωί", "πίνω", "καφέ"], answer: "Κάθε πρωί πίνω καφέ", tr: "Her sabah kahve içerim" },
    { words: ["Είμαι", "πολύ", "χαρούμενος", "σήμερα"], answer: "Είμαι πολύ χαρούμενος σήμερα", tr: "Bugün çok mutluyum" },
    { words: ["Το", "κλειδί", "είναι", "πάνω", "στο", "τραπέζι"], answer: "Το κλειδί είναι πάνω στο τραπέζι", tr: "Anahtar masanın üstünde" },
    { words: ["Σε", "λίγο", "θα", "είμαι", "εκεί"], answer: "Σε λίγο θα είμαι εκεί", tr: "Birazdan orada olacağım" }
  ],

  dictationExtra: [
    "Αύριο θα σε πάρω τηλέφωνο.",
    "Μπορώ να το δοκιμάσω;",
    "Συνήθως περπατάω στη δουλειά.",
    "Νιώθω ανακουφισμένος τώρα.",
    "Το πορτοφόλι είναι μέσα στην τσάντα.",
    "Την επόμενη εβδομάδα έχω εξετάσεις.",
    "Θα το πάρω, παρακαλώ.",
    "Απόψε θα μείνω σπίτι."
  ],

  tipsExtra: [
    "Gelecek zarflar θα ile: αύριο, απόψε, του χρόνου, σε λίγο.",
    "Alışkanlık = şimdiki zaman + συχνά/συνήθως/κάθε…",
    "Mağazada: Μπορώ να το δοκιμάσω; Απλά κοιτάζω.",
    "Duygu: Είμαι… / Νιώθω… / Θύμωσα (aorist tek olay).",
    "Yer edatları: πάνω σε, κάτω από, μπροστά από, πίσω από.",
    "μεθαύριο = öbür gün (yarından sonraki gün).",
    "Έκπτωση = indirim; απόδειξη = fiş.",
    "ποτέ olumsuzda Δεν ile: Δεν… ποτέ."
  ],

  vocab: {
    bathroom: [
      { el: "σαμπουάν", tr: "şampuan", tip: "" },
      { el: "σαπούνι", tr: "sabun", tip: "" },
      { el: "πετσέτα", tr: "havlu", tip: "" },
      { el: "οδοντόβουρτσα", tr: "diş fırçası", tip: "" },
      { el: "οδοντόκρεμα", tr: "diş macunu", tip: "" },
      { el: "καθρέφτης", tr: "ayna", tip: "" },
      { el: "ντουζ", tr: "duş", tip: "" },
      { el: "χαρτί υγείας", tr: "tuvalet kağıdı", tip: "" }
    ],
    street: [
      { el: "φανάρι", tr: "trafik ışığı", tip: "" },
      { el: "διάβαση", tr: "yaya geçidi", tip: "" },
      { el: "πεζοδρόμιο", tr: "kaldırım", tip: "" },
      { el: "φωτεινός σηματοδότης", tr: "ışık sinyali", tip: "" },
      { el: "πάρκινγκ", tr: "otopark", tip: "" },
      { el: "ποδήλατο", tr: "bisiklet", tip: "" },
      { el: "μηχανάκι", tr: "motosiklet", tip: "" },
      { el: "μποτιλιάρισμα", tr: "trafik sıkışıklığı", tip: "" }
    ],
    celebration: [
      { el: "γενέθλια", tr: "doğum günü", tip: "" },
      { el: "επέτειος", tr: "yıldönümü", tip: "" },
      { el: "πρόσκληση", tr: "davetiye", tip: "" },
      { el: "δώρο", tr: "hediye", tip: "" },
      { el: "τούρτα", tr: "pasta", tip: "" },
      { el: "μπαλόνι", tr: "balon", tip: "" },
      { el: "γιορτή", tr: "bayram / kutlama", tip: "" },
      { el: "ευχές", tr: "dileler", tip: "" }
    ]
  },

  cloze: [
    { id: "c9a", text: "___ θα φύγω νωρίς.", options: ["Αύριο", "Πέρσι", "Έλα", "Πυρετό"], a: 0, why: "αύριο = yarın." },
    { id: "c9b", text: "___ πρωί πίνω καφέ.", options: ["Κάθε", "Μεθαύριο μόνο", "Δώσε", "Έκπτωση"], a: 0, why: "Κάθε πρωί." },
    { id: "c9c", text: "Μπορώ να το ___;", options: ["δοκιμάσω", "πέρσι", "πυρετό", "μπαλόνι"], a: 0, why: "δοκιμάσω = denemek." },
    { id: "c9d", text: "Είμαι πολύ ___ σήμερα.", options: ["χαρούμενος", "φανάρι", "σαπούνι", "πάρκινγκ"], a: 0, why: "χαρούμενος." },
    { id: "c9e", text: "Το βιβλίο είναι ___ στο τραπέζι.", options: ["πάνω", "πέρσι", "αύριο", "ποτέ"], a: 0, why: "πάνω σε." },
    { id: "c9f", text: "___ κοιτάζω, ευχαριστώ.", options: ["Απλά", "Κάθε", "Μεθαύριο", "Τούρτα"], a: 0, why: "Απλά κοιτάζω." },
    { id: "c9g", text: "Σε ___ έρχομαι.", options: ["λίγο", "πέρσι", "κεφάλι", "δώρο"], a: 0, why: "σε λίγο." },
    { id: "c9h", text: "Δεν καπνίζω ___.", options: ["ποτέ", "αύριο μόνο", "πάνω", "γενέθλια"], a: 0, why: "Δεν… ποτέ." }
  ],

  reading: [
    {
      id: "r9a",
      title: "Σχέδια",
      text: "Αύριο η Μαρία θα πάει για ψώνια. Θέλει να δοκιμάσει ένα φόρεμα και αν της αρέσει θα το πάρει. Σε λίγο θα φύγει από το σπίτι.",
      q: "Τι θα κάνει αύριο η Μαρία;",
      options: ["Θα πάει για ψώνια", "Θα μείνει στο νοσοκομείο", "Θα πουλήσει το σπίτι", "Θα σβήσει τα φανάρια"],
      a: 0
    },
    {
      id: "r9b",
      title: "Συνήθειες",
      text: "Ο Κώστας κάθε πρωί πίνει καφέ και περπατάει στη δουλειά. Σπάνια παίρνει ταξί. Τις Κυριακές ξεκουράζεται και βλέπει τους φίλους του.",
      q: "Πώς πάει συνήθως στη δουλειά;",
      options: ["Με τα πόδια", "Πάντα με ταξί", "Ποτέ δεν πάει", "Μόνο με αεροπλάνο"],
      a: 0
    }
  ],

  examExtra: [
    { q: "αύριο?", options: ["dün", "yarın", "asla", "üstünde"], a: 1, kind: "vocab" },
    { q: "μεθαύριο?", options: ["öbür gün", "geçen yıl", "gel!", "fiş"], a: 0, kind: "vocab" },
    { q: "Απλά κοιτάζω", options: ["Satın alıyorum", "Sadece bakıyorum", "Deniyorum zorunlu", "Yağmur"], a: 1, kind: "vocab" },
    { q: "Κάθε πρωί + fiil zamanı?", options: ["Aorist zorunlu", "Şimdiki (alışkanlık)", "Sadece gelecek", "Emir"], a: 1, kind: "grammar" },
    { q: "πάνω στο τραπέζι?", options: ["altında", "üstünde", "yarın", "ateş"], a: 1, kind: "vocab" },
    { q: "σε λίγο?", options: ["geçen yıl", "birazdan", "asla", "pasta"], a: 1, kind: "vocab" },
    { q: "Νιώθω περήφανος", options: ["Utandım", "Gurur duyuyorum", "Trafik", "Şampuan"], a: 1, kind: "vocab" },
    { q: "Δεν… ποτέ", options: ["Her zaman olumlu", "Asla (olumsuz)", "Sadece gelecek", "Edat"], a: 1, kind: "grammar" }
  ],

  badgesExtra: [
    { id: "future8", title: "Yarıncı", desc: "8 gelecek zarf", check: (s) => ((s.trainerStats || {}).futuretime || 0) >= 8 },
    { id: "habit8", title: "Alışkanlık", desc: "8 rutin turu", check: (s) => ((s.trainerStats || {}).habits || 0) >= 8 },
    { id: "shop8", title: "Müşteri", desc: "8 alışveriş diyalog", check: (s) => ((s.trainerStats || {}).shoptalk || 0) >= 8 },
    { id: "prepplus8", title: "Konum", desc: "8 yer edatı", check: (s) => ((s.trainerStats || {}).prepplus || 0) >= 8 },
    { id: "lessons60", title: "60 ders", desc: "60 görev", check: (s) => Object.keys(s.completed || {}).length >= 60 }
  ],

  units: {
    a1: [{
      id: "a1-u9", title: "Alışkanlıklarım", focus: "κάθε, συνήθως, συχνά",
      tasks: [
        { id: "a1-u9-t1", title: "Rutin cümleleri", detail: "8 alışkanlık cümlesi yaz/söyle.", minutes: 20, type: "speak" },
        { id: "a1-u9-t2", title: "Sıklık + şimdiki zaman", detail: "ποτέ/σπάνια/συχνά ayrımı.", minutes: 20, type: "practice" },
        { id: "a1-u9-t3", title: "Tipik günüm", detail: "Sabah–akşam 12 cümle.", minutes: 25, type: "write" }
      ]
    }],
    a2: [{
      id: "a2-u8", title: "Mağaza Diyaloğu", focus: "δοκιμάζω, έκπτωση, κάρτα",
      tasks: [
        { id: "a2-u8-t1", title: "Deneme & beden", detail: "Μπορώ να το δοκιμάσω; μέγεθος/χρώμα.", minutes: 20, type: "study" },
        { id: "a2-u8-t2", title: "Ödeme kalıpları", detail: "κάρτα, απόδειξη, έκπτωση.", minutes: 20, type: "practice" },
        { id: "a2-u8-t3", title: "Rol: müşteri–satıcı", detail: "2 dk kaydet.", minutes: 20, type: "speak" }
      ]
    }],
    b1: [{
      id: "b1-u7", title: "Plan & Duygu", focus: "αύριο/του χρόνου + νιώθω",
      tasks: [
        { id: "b1-u7-t1", title: "Gelecek zaman zarfları", detail: "αύριο… του χρόνου. 10 plan.", minutes: 20, type: "study" },
        { id: "b1-u7-t2", title: "Duygu cümleleri", detail: "Είμαι / Νιώθω / aorist duygular.", minutes: 20, type: "practice" },
        { id: "b1-u7-t3", title: "Yer edatları turu", detail: "πάνω/κάτω/μπροστά… 12 cümle.", minutes: 20, type: "practice" }
      ]
    }]
  },

  newLessons: {
    "a1-u9-t1": {
      goal: "Alışkanlıklarını şimdiki zamanda anlatmak.",
      theory: ["Κάθε πρωί… Συνήθως… Συχνά… Şimdiki zaman kullan."],
      examples: [
        { el: "Κάθε πρωί πίνω καφέ.", tr: "Her sabah kahve içerim." },
        { el: "Συνήθως περπατάω.", tr: "Genelde yürürüm." },
        { el: "Τις Κυριακές ξεκουράζομαι.", tr: "Pazarları dinlenirim." }
      ],
      steps: ["Alışkanlık antrenmanı.", "8 cümle söyle.", "Kaydet."],
      practice: ["Sıklık antrenmanı ile birleştir."],
      check: ["Hepsi şimdiki zamanda mı?"],
      train: "habits"
    },
    "a1-u9-t2": {
      goal: "Sıklık skalasını doğru kullanmak.",
      theory: ["πάντα → συχνά → μερικές φορές → σπάνια → ποτέ (+ Δεν)."],
      examples: [
        { el: "Σπάνια βλέπω τηλεόραση.", tr: "Nadiren TV izlerim." },
        { el: "Δεν καπνίζω ποτέ.", tr: "Asla sigara içmem." }
      ],
      steps: ["Sıklık + alışkanlık antrenmanı.", "5 çift cümle."],
      practice: ["Kendine 5 soru sor, cevapla."],
      check: ["ποτέ ile Δεν unutulmadı mı?"],
      train: "frequency"
    },
    "a1-u9-t3": {
      goal: "Tipik bir günü 12 cümlede yazmak.",
      theory: ["Sabah–öğlen–akşam sırası. Alışkanlık zarfları serpiştir."],
      examples: [{ el: "Το βράδυ κοιμάμαι νωρίς.", tr: "Akşamları erken yatarım." }],
      steps: ["12 cümle yaz.", "Sesli oku.", "3 sıklık zarfı say."],
      practice: ["En zayıf cümleyi düzelt."],
      check: ["12+ cümle var mı?"],
      train: "write"
    },
    "a2-u8-t1": {
      goal: "Mağazada deneme ve beden/renk sormak.",
      theory: ["Μπορώ να το δοκιμάσω; Έχετε άλλο χρώμα/μέγεθος;"],
      examples: [
        { el: "Μπορώ να το δοκιμάσω;", tr: "Deneyebilir miyim?" },
        { el: "Έχετε μεγαλύτερο μέγεθος;", tr: "Daha büyük beden var mı?" },
        { el: "Είναι πολύ μικρό.", tr: "Çok küçük." }
      ],
      steps: ["Alışveriş diyalog antrenmanı.", "8 cümle."],
      practice: ["Renkler destesi."],
      check: ["Nazik soru formu var mı?"],
      train: "shoptalk"
    },
    "a2-u8-t2": {
      goal: "Ödeme ve fiş/indirim kalıpları.",
      theory: ["πληρώνω με κάρτα, απόδειξη, έκπτωση, Θα το πάρω."],
      examples: [
        { el: "Μπορώ να πληρώσω με κάρτα;", tr: "Kartla ödeyebilir miyim?" },
        { el: "Είναι σε έκπτωση;", tr: "İndirimde mi?" },
        { el: "Μπορώ να έχω την απόδειξη;", tr: "Fiş alabilir miyim?" }
      ],
      steps: ["Alışveriş antrenmanı.", "Ödeme mini diyaloğu yaz."],
      practice: ["Scramble 1 tur."],
      check: ["3 ödeme kalıbı ezber mi?"],
      train: "shoptalk"
    },
    "a2-u8-t3": {
      goal: "Müşteri–satıcı rolü (2 dk).",
      theory: ["Selam → istek → deneme → karar → ödeme."],
      examples: [{ el: "Απλά κοιτάζω.", tr: "Sadece bakıyorum." }, { el: "Θα το πάρω.", tr: "Bunu alıyorum." }],
      steps: ["2 dk kaydet.", "Her iki rolü de oyna."],
      practice: ["Yanlışları not et."],
      check: ["Akış tamam mı?"],
      train: "shoptalk"
    },
    "b1-u7-t1": {
      goal: "Gelecek planlarını zarflarla kurmak.",
      theory: ["αύριο, απόψε, μεθαύριο, του χρόνου + θα."],
      examples: [
        { el: "Αύριο θα φύγω νωρίς.", tr: "Yarın erken gideceğim." },
        { el: "Σε λίγο έρχομαι.", tr: "Birazdan geliyorum." },
        { el: "Του χρόνου θα ταξιδέψω.", tr: "Gelecek yıl seyahat edeceğim." }
      ],
      steps: ["Gelecek zarf antrenmanı.", "10 plan cümlesi.", "θα antrenmanı."],
      practice: ["Haftalık takvimini söyle."],
      check: ["θα unutulmadı mı?"],
      train: "futuretime"
    },
    "b1-u7-t2": {
      goal: "Duygu durumunu doğru zamanla anlatmak.",
      theory: ["Είμαι/Νιώθω (şimdi) · Θύμωσα/Ξαφνιάστηκα (tek olay aorist)."],
      examples: [
        { el: "Είμαι χαρούμενος.", tr: "Mutluyum." },
        { el: "Θύμωσα χθες.", tr: "Dün sinirlendim." },
        { el: "Νιώθω ανακουφισμένος.", tr: "Rahatladım / rahat hissediyorum." }
      ],
      steps: ["Duygu cümle antrenmanı.", "6 şimdi + 4 geçmiş."],
      practice: ["Duygu destesi."],
      check: ["Zaman seçimi doğru mu?"],
      train: "emotionsent"
    },
    "b1-u7-t3": {
      goal: "Yer edatlarıyla konum tarif etmek.",
      theory: ["πάνω σε, κάτω από, μπροστά από, πίσω από, μέσα σε, έξω από."],
      examples: [
        { el: "πάνω στο τραπέζι", tr: "masanın üstünde" },
        { el: "κάτω από την καρέκλα", tr: "sandalyenin altında" },
        { el: "μπροστά από το σπίτι", tr: "evin önünde" }
      ],
      steps: ["Yer edatı antrenmanı.", "12 cümle / oda tarifi."],
      practice: ["Yön antrenmanı ile birleştir."],
      check: ["Edat+madde kaynaşması doğru mu?"],
      train: "prepplus"
    }
  }
};

(function applyExtras9() {
  if (typeof CONTENT !== "undefined" && EXTRAS9.vocab) {
    Object.keys(EXTRAS9.vocab).forEach((deck) => {
      CONTENT.decks[deck] = EXTRAS9.vocab[deck];
    });
  }
  if (typeof TRAINERS !== "undefined") {
    if (EXTRAS9.tipsExtra) TRAINERS.tips = TRAINERS.tips.concat(EXTRAS9.tipsExtra);
    if (EXTRAS9.badgesExtra) TRAINERS.badges = TRAINERS.badges.concat(EXTRAS9.badgesExtra);
    if (EXTRAS9.dictationExtra) TRAINERS.dictation = TRAINERS.dictation.concat(EXTRAS9.dictationExtra);
  }
  if (typeof EXTRAS2 !== "undefined") {
    if (EXTRAS9.scrambleExtra) EXTRAS2.scramble = EXTRAS2.scramble.concat(EXTRAS9.scrambleExtra);
    if (EXTRAS9.examExtra) EXTRAS2.examBank = EXTRAS2.examBank.concat(EXTRAS9.examExtra);
  }
  if (typeof EXTRAS4 !== "undefined" && EXTRAS9.phrasesExtra) {
    EXTRAS4.phrases = EXTRAS4.phrases.concat(EXTRAS9.phrasesExtra);
  }
  if (typeof DRILLS !== "undefined") {
    if (EXTRAS9.cloze) DRILLS.cloze = DRILLS.cloze.concat(EXTRAS9.cloze);
    if (EXTRAS9.reading) DRILLS.reading = DRILLS.reading.concat(EXTRAS9.reading);
  }
  if (typeof LESSONS !== "undefined" && EXTRAS9.newLessons) {
    Object.keys(EXTRAS9.newLessons).forEach((id) => {
      LESSONS[id] = EXTRAS9.newLessons[id];
    });
  }
  if (typeof CURRICULUM !== "undefined" && EXTRAS9.units) {
    Object.keys(EXTRAS9.units).forEach((levelId) => {
      const level = CURRICULUM.levels.find((l) => l.id === levelId);
      if (!level) return;
      EXTRAS9.units[levelId].forEach((u) => {
        if (!level.units.some((x) => x.id === u.id)) level.units.push(u);
      });
    });
  }
})();
