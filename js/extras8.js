/* Sekizinci paket — karşılaştırma üstünlük, emir olumlu, aile konuşması, sağlık diyalog */
const EXTRAS8 = {
  superlative: [
    { tr: "en büyük", el: "ο μεγαλύτερος / η μεγαλύτερη / το μεγαλύτερο", tip: "üstünlük" },
    { tr: "en iyi", el: "ο καλύτερος", tip: "" },
    { tr: "en kötü", el: "ο χειρότερος", tip: "" },
    { tr: "en ucuz", el: "ο φθηνότερος", tip: "" },
    { tr: "en pahalı", el: "ο ακριβότερος", tip: "" },
    { tr: "en kolay", el: "ο ευκολότερος", tip: "" },
    { tr: "en zor", el: "ο δυσκολότερος", tip: "" },
    { tr: "en yakın", el: "ο πιο κοντινός / ο πλησιέστερος", tip: "" },
    { tr: "en güzel", el: "ο ομορφότερος / ο πιο όμορφος", tip: "" },
    { tr: "en hızlı", el: "ο πιο γρήγορος", tip: "πιο + sıfat da yaygın" }
  ],

  posImperative: [
    { tr: "Gel!", el: "Έλα!", tip: "tekil" },
    { tr: "Gelin!", el: "Ελάτε!", tip: "çoğul/resmi" },
    { tr: "Bak!", el: "Κοίτα!", tip: "" },
    { tr: "Dinle!", el: "Άκου!", tip: "" },
    { tr: "Yaz!", el: "Γράψε!", tip: "aorist emir" },
    { tr: "Oku!", el: "Διάβασε!", tip: "" },
    { tr: "Söyle!", el: "Πες!", tip: "" },
    { tr: "Ver!", el: "Δώσε!", tip: "" },
    { tr: "Bekle!", el: "Περίμενε!", tip: "" },
    { tr: "Başla!", el: "Άρχισε! / Ξεκίνα!", tip: "" }
  ],

  familyTalk: [
    { tr: "Bu benim annem", el: "Αυτή είναι η μητέρα μου", tip: "" },
    { tr: "Evli misin?", el: "Είσαι παντρεμένος/η;", tip: "" },
    { tr: "Çocuğum var", el: "Έχω παιδί / παιδιά", tip: "" },
    { tr: "Kardeşimle yaşıyorum", el: "Μένω με τον αδερφό μου", tip: "" },
    { tr: "Ailem Türkiye'de", el: "Η οικογένειά μου είναι στην Τουρκία", tip: "" },
    { tr: "Eşim çalışıyor", el: "Ο άντρας μου / Η γυναίκα μου δουλεύει", tip: "" },
    { tr: "Kaç kardeşin var?", el: "Πόσα αδέρφια έχεις;", tip: "" },
    { tr: "Büyükannemi seviyorum", el: "Αγαπάω τη γιαγιά μου", tip: "" }
  ],

  healthTalk: [
    { tr: "Başım ağrıyor", el: "Με πονάει το κεφάλι", tip: "" },
    { tr: "Hastayım", el: "Είμαι άρρωστος/η", tip: "" },
    { tr: "Ateşim var", el: "Έχω πυρετό", tip: "" },
    { tr: "Doktora gitmeliyim", el: "Πρέπει να πάω στο γιατρό", tip: "" },
    { tr: "İlaç alıyorum", el: "Παίρνω φάρμακα", tip: "" },
    { tr: "İyiyim şimdi", el: "Είμαι καλά τώρα", tip: "" },
    { tr: "Dinlenmem lazım", el: "Πρέπει να ξεκουραστώ", tip: "" },
    { tr: "Randevum var", el: "Έχω ραντεβού", tip: "" },
    { tr: "Boğazım ağrıyor", el: "Με πονάει ο λαιμός", tip: "" },
    { tr: "Alerjim var", el: "Έχω αλλεργία", tip: "" }
  ],

  pastTime: [
    { tr: "dün", el: "χθες", tip: "" },
    { tr: "önceki gün", el: "προχθές", tip: "" },
    { tr: "geçen hafta", el: "την περασμένη εβδομάδα", tip: "" },
    { tr: "geçen ay", el: "τον περασμένο μήνα", tip: "" },
    { tr: "geçen yıl", el: "πέρσι / πέρυσι", tip: "" },
    { tr: "iki gün önce", el: "πριν από δύο μέρες", tip: "" },
    { tr: "az önce", el: "μόλις τώρα / πριν λίγο", tip: "" },
    { tr: "o zaman", el: "τότε", tip: "" }
  ],

  phrasesExtra: [
    { el: "Αυτή είναι η πιο όμορφη πόλη.", tr: "Bu en güzel şehir." },
    { el: "Έλα εδώ μια στιγμή.", tr: "Bir dakika buraya gel." },
    { el: "Με πονάει το κεφάλι από το πρωί.", tr: "Sabahtan beri başım ağrıyor." },
    { el: "Πέρσι πήγα στην Ελλάδα.", tr: "Geçen yıl Yunanistan’a gittim." },
    { el: "Πόσα αδέρφια έχεις;", tr: "Kaç kardeşin var?" },
    { el: "Πρέπει να ξεκουραστείς.", tr: "Dinlenmelisin." },
    { el: "Δώσε μου το βιβλίο, παρακαλώ.", tr: "Kitabı ver lütfen." },
    { el: "Την περασμένη εβδομάδα δούλεψα πολύ.", tr: "Geçen hafta çok çalıştım." }
  ],

  scrambleExtra: [
    { words: ["Με", "πονάει", "το", "κεφάλι"], answer: "Με πονάει το κεφάλι", tr: "Başım ağrıyor" },
    { words: ["Έλα", "εδώ", "παρακαλώ"], answer: "Έλα εδώ παρακαλώ", tr: "Buraya gel lütfen" },
    { words: ["Πέρσι", "πήγα", "στην", "Αθήνα"], answer: "Πέρσι πήγα στην Αθήνα", tr: "Geçen yıl Atina’ya gittim" },
    { words: ["Αυτή", "είναι", "η", "μητέρα", "μου"], answer: "Αυτή είναι η μητέρα μου", tr: "Bu benim annem" },
    { words: ["Είναι", "ο", "καλύτερος", "φίλος", "μου"], answer: "Είναι ο καλύτερος φίλος μου", tr: "En iyi arkadaşım" },
    { words: ["Πρέπει", "να", "πάω", "στο", "γιατρό"], answer: "Πρέπει να πάω στο γιατρό", tr: "Doktora gitmeliyim" }
  ],

  dictationExtra: [
    "Με πονάει ο λαιμός.",
    "Έλα να φάμε μαζί.",
    "Πέρσι έμαθα πολλά ελληνικά.",
    "Αυτή είναι η αδερφή μου.",
    "Είναι η πιο δύσκολη άσκηση.",
    "Πρέπει να ξεκουραστώ σήμερα.",
    "Την περασμένη εβδομάδα είδα τον Νίκο.",
    "Δώσε μου ένα λεπτό."
  ],

  tipsExtra: [
    "Üstünlük: ο καλύτερος veya ο πιο καλός — ikisi de duyulur.",
    "Olumlu emir: Έλα / Ελάτε; aorist gövde sık (Γράψε).",
    "Ağrı: Με πονάει + vücut bölümü (το κεφάλι, ο λαιμός).",
    "Geçmiş zaman zarfları aorist ile: χθες, πέρσι, την περασμένη εβδομάδα.",
    "Ailede madde + iyelik: η μητέρα μου.",
    "παντρεμένος/η cinsiyet uyumu unutma.",
    "Μην (olumsuz) ile Έλα (olumlu) emri karıştırma.",
    "πριν από + süre: πριν από δύο μέρες."
  ],

  vocab: {
    school2: [
      { el: "σημείωση", tr: "not", tip: "" },
      { el: "εργασία", tr: "ödev / çalışma", tip: "" },
      { el: "εξέταση", tr: "sınav", tip: "" },
      { el: "βαθμός", tr: "not / puan", tip: "" },
      { el: "καθηγητής", tr: "profesör / öğretmen", tip: "" },
      { el: "αίθουσα", tr: "derslik", tip: "" },
      { el: "διάλεξη", tr: "ders / konferans", tip: "" },
      { el: "υποτροφία", tr: "burs", tip: "" }
    ],
    bank: [
      { el: "λογαριασμός", tr: "hesap", tip: "" },
      { el: "κατάθεση", tr: "yatırma", tip: "" },
      { el: "ανάληψη", tr: "çekme", tip: "" },
      { el: "τόκος", tr: "faiz", tip: "" },
      { el: "κάρτα ανάληψης", tr: "bankamatik kartı", tip: "" },
      { el: "ΑΤΜ", tr: "ATM", tip: "" },
      { el: "μεταφορά", tr: "havale / transfer", tip: "" },
      { el: "υπόλοιπο", tr: "bakiye", tip: "" }
    ],
    internet: [
      { el: "σύνδεση", tr: "bağlantı", tip: "" },
      { el: "κωδικός πρόσβασης", tr: "şifre", tip: "" },
      { el: "λήψη", tr: "indirme", tip: "" },
      { el: "ανέβασμα", tr: "yükleme", tip: "" },
      { el: "σύνδεσμος", tr: "bağlantı / link", tip: "" },
      { el: "λογαριασμός χρήστη", tr: "kullanıcı hesabı", tip: "" },
      { el: "ιός", tr: "virüs", tip: "" },
      { el: "ενημέρωση", tr: "güncelleme", tip: "" }
    ]
  },

  cloze: [
    { id: "c8a", text: "Είναι ο ___ φίλος μου.", options: ["καλύτερος", "καλό", "καλά", "καλώς"], a: 0, why: "καλύτερος = en iyi." },
    { id: "c8b", text: "___, σε παρακαλώ!", options: ["Έλα", "Ήρθα μόνο", "Πέρσι", "Πυρετό"], a: 0, why: "Έλα = gel." },
    { id: "c8c", text: "Με πονάει το ___.", options: ["κεφάλι", "γιαγιά", "ΑΤΜ", "υποτροφία"], a: 0, why: "κεφάλι." },
    { id: "c8d", text: "___ πήγα στην Αθήνα.", options: ["Πέρσι", "Έλα", "Δώσε", "Πυρετό"], a: 0, why: "πέρσι = geçen yıl." },
    { id: "c8e", text: "Αυτή είναι η ___ μου.", options: ["μητέρα", "πυρετός", "λήψη", "τόκος"], a: 0, why: "μητέρα." },
    { id: "c8f", text: "Πρέπει να πάω στο ___.", options: ["γιατρό", "καλύτερο μόνο", "ιό", "βαθμό"], a: 0, why: "γιατρό." },
    { id: "c8g", text: "___ μου το βιβλίο!", options: ["Δώσε", "Πέρσι", "Άρρωστος", "Σύνδεση"], a: 0, why: "Δώσε = ver." },
    { id: "c8h", text: "Έχω ___· πρέπει να ξεκουραστώ.", options: ["πυρετό", "γιαγιά", "σύνδεσμο", "διάλεξη μόνο"], a: 0, why: "πυρετό = ateş." }
  ],

  reading: [
    {
      id: "r8a",
      title: "Οικογένεια",
      text: "Η Άννα μένει με την αδερφή της στην Αθήνα. Η μητέρα τους είναι στην Τουρκία. Πέρσι όλη η οικογένεια πήγε διακοπές μαζί και ήταν η καλύτερη εβδομάδα της χρονιάς.",
      q: "Τι ήταν η καλύτερη εβδομάδα;",
      options: ["Οι διακοπές πέρσι", "Μόνο η δουλειά", "Το ΑΤΜ", "Η εξέταση"],
      a: 0
    },
    {
      id: "r8b",
      title: "Υγεία",
      text: "Ο Νίκος έχει πυρετό και τον πονάει ο λαιμός. Ο γιατρός του είπε να ξεκουραστεί και να πάρει φάρμακα. «Έλα ξανά αν δεν είσαι καλά σε δύο μέρες», είπε.",
      q: "Τι είπε ο γιατρός;",
      options: ["Να ξεκουραστεί και να πάρει φάρμακα", "Να τρέξει μαραθώνιο", "Να πάει στην τράπεζα", "Να διαγράψει τον λογαριασμό"],
      a: 0
    }
  ],

  examExtra: [
    { q: "ο καλύτερος?", options: ["daha iyi", "en iyi", "kötü", "emir"], a: 1, kind: "grammar" },
    { q: "Έλα!", options: ["Gitme", "Gel!", "Dün", "Ateş"], a: 1, kind: "grammar" },
    { q: "Με πονάει το κεφάλι", options: ["Başım ağrıyor", "Annem geliyor", "En iyi kitap", "ATM"], a: 0, kind: "vocab" },
    { q: "πέρσι?", options: ["yarın", "geçen yıl", "gel!", "ver"], a: 1, kind: "vocab" },
    { q: "Δώσε!", options: ["Al!", "Ver!", "Oku geçmiş", "Çoğul madde"], a: 1, kind: "grammar" },
    { q: "πυρετός?", options: ["ateş", "kardeş", "burs", "link"], a: 0, kind: "vocab" },
    { q: "την περασμένη εβδομάδα zamanı?", options: ["gelecek", "geçmiş", "emir", "sıfat değil"], a: 1, kind: "grammar" },
    { q: "ο πιο γρήγορος ≈ ?", options: ["yavaş", "en hızlı", "asla", "doktor"], a: 1, kind: "vocab" }
  ],

  badgesExtra: [
    { id: "super8", title: "En…", desc: "8 üstünlük turu", check: (s) => ((s.trainerStats || {}).superlative || 0) >= 8 },
    { id: "imp8", title: "Emirci", desc: "8 olumlu emir", check: (s) => ((s.trainerStats || {}).posimp || 0) >= 8 },
    { id: "health8", title: "Sağlık", desc: "8 sağlık turu", check: (s) => ((s.trainerStats || {}).healthtalk || 0) >= 8 },
    { id: "family8", title: "Aile sohbeti", desc: "8 aile turu", check: (s) => ((s.trainerStats || {}).familytalk || 0) >= 8 },
    { id: "lessons40", title: "40 ders", desc: "40 görev tamam", check: (s) => Object.keys(s.completed || {}).length >= 40 }
  ],

  units: {
    a1: [{
      id: "a1-u8", title: "Aile Sohbeti", focus: "οικογένεια, παντρεμένος",
      tasks: [
        { id: "a1-u8-t1", title: "Aile tanıtımı", detail: "Anne/baba/kardeş cümleleri + iyelik.", minutes: 20, type: "speak" },
        { id: "a1-u8-t2", title: "Medeni durum soruları", detail: "Είσαι παντρεμένος; Έχεις παιδιά;", minutes: 15, type: "practice" },
        { id: "a1-u8-t3", title: "Aile destesi", detail: "Aile kartlarını bitir + 10 cümle.", minutes: 20, type: "vocab" }
      ]
    }],
    a2: [{
      id: "a2-u7", title: "Sağlık Diyalogu", focus: "πόνος, γιατρός, φάρμακα",
      tasks: [
        { id: "a2-u7-t1", title: "Şikayet kalıpları", detail: "Με πονάει… Έχω πυρετό.", minutes: 20, type: "study" },
        { id: "a2-u7-t2", title: "Doktor diyaloğu", detail: "Semptom + tavsiye rolü, kaydet.", minutes: 25, type: "speak" },
        { id: "a2-u7-t3", title: "Geçmiş hastalık anlatısı", detail: "πέρσι / χθες ile kısa paragraf.", minutes: 25, type: "write" }
      ]
    }],
    b1: [{
      id: "b1-u6", title: "Üstünlük & Emir", focus: "καλύτερος, Έλα, Γράψε",
      tasks: [
        { id: "b1-u6-t1", title: "Üstünlük biçimleri", detail: "ο πιο… / -τερος. 12 cümle.", minutes: 25, type: "study" },
        { id: "b1-u6-t2", title: "Olumlu emirler", detail: "Έλα, Δώσε, Διάβασε… tablo + pratik.", minutes: 20, type: "practice" },
        { id: "b1-u6-t3", title: "Karşılaştırma konuşması", detail: "Şehir/yemek/dil: en… daha… 2 dk.", minutes: 20, type: "speak" }
      ]
    }]
  },

  newLessons: {
    "a1-u8-t1": {
      goal: "Aileni madde + iyelik ile tanıtmak.",
      theory: ["η μητέρα μου, ο πατέρας μου, ο αδερφός μου…", "Αυτή είναι… / Αυτός είναι…"],
      examples: [
        { el: "Αυτή είναι η μητέρα μου.", tr: "Bu benim annem." },
        { el: "Μένω με τον αδερφό μου.", tr: "Kardeşimle yaşıyorum." },
        { el: "Η οικογένειά μου είναι στην Τουρκία.", tr: "Ailem Türkiye’de." }
      ],
      steps: ["Aile sohbeti antrenmanı.", "8 cümle yaz + söyle.", "Aile destesi."],
      practice: ["1 dk aile tanıtımı kaydet."],
      check: ["İyelik μου doğru yerde mi?"],
      train: "familytalk"
    },
    "a1-u8-t2": {
      goal: "Medeni durum ve çocuk sorularını sormak/cevaplamak.",
      theory: ["Είσαι παντρεμένος/η; Έχεις παιδιά; Είμαι ανύπαντρος/η."],
      examples: [
        { el: "Είσαι παντρεμένη;", tr: "Evli misin? (K)" },
        { el: "Έχω δύο παιδιά.", tr: "İki çocuğum var." },
        { el: "Δεν είμαι παντρεμένος.", tr: "Evli değilim." }
      ],
      steps: ["Mini diyalog 6 satır.", "Aile sohbeti antrenmanı."],
      practice: ["Cinsiyet uyumunu kontrol et."],
      check: ["παντρεμένος/η doğru mu?"],
      train: "familytalk"
    },
    "a1-u8-t3": {
      goal: "Aile kelimelerini aktifleştirmek.",
      theory: ["Kartlar: Aile destesi. Her kelimeye 1 cümle."],
      examples: [{ el: "γιαγιά", tr: "büyükanne" }, { el: "παππούς", tr: "dede" }],
      steps: ["Aile destesi turu.", "10 cümle.", "Eşleştir."],
      practice: ["TR→EL 10 kelime."],
      check: ["10 kelime aktif mi?"],
      train: "match"
    },
    "a2-u7-t1": {
      goal: "Sağlık şikayet kalıpları.",
      theory: ["Με πονάει + organ. Έχω πυρετό / αλλεργία / βήχα."],
      examples: [
        { el: "Με πονάει το κεφάλι.", tr: "Başım ağrıyor." },
        { el: "Με πονάει ο λαιμός.", tr: "Boğazım ağrıyor." },
        { el: "Έχω πυρετό.", tr: "Ateşim var." }
      ],
      steps: ["Sağlık antrenmanı.", "8 şikayet cümlesi."],
      practice: ["Vücut antrenmanı ile birleştir."],
      check: ["Με πονάει kalıbı oturdu mu?"],
      train: "healthtalk"
    },
    "a2-u7-t2": {
      goal: "Kısa doktor diyaloğu.",
      theory: ["Şikayet → soru → tavsiye: Πρέπει να ξεκουραστείς / Πάρε φάρμακα."],
      examples: [
        { el: "Τι έχετε;", tr: "Ne şikayetiniz var?" },
        { el: "Πρέπει να πάτε στο γιατρό.", tr: "Doktora gitmelisiniz." },
        { el: "Έχω ραντεβού αύριο.", tr: "Yarın randevum var." }
      ],
      steps: ["Rol kaydı 2 dk.", "Sağlık + nazik üslup."],
      practice: ["Hasta ve doktor rollerini değiştir."],
      check: ["Diyalogda 3 kalıp var mı?"],
      train: "healthtalk"
    },
    "a2-u7-t3": {
      goal: "Geçmişte bir hastalık/rahatsızlık anlatmak.",
      theory: ["χθες / πέρσι / την περασμένη εβδομάδα + aorist."],
      examples: [
        { el: "Πέρσι αρρώστησα και έμεινα σπίτι.", tr: "Geçen yıl hastalandım ve evde kaldım." },
        { el: "Χθες πήγα στο γιατρό.", tr: "Dün doktora gittim." }
      ],
      steps: ["Geçmiş zaman zarfı antrenmanı.", "120 kelime paragraf.", "Aorist kontrol."],
      practice: ["3 zaman zarfı kullan."],
      check: ["Geçmiş zaman tutarlı mı?"],
      train: "pasttime"
    },
    "b1-u6-t1": {
      goal: "Üstünlük (en…) biçimleri.",
      theory: ["ο καλύτερος veya ο πιο καλός. Cinsiyet/sayı uyumu."],
      examples: [
        { el: "Είναι ο καλύτερος μαθητής.", tr: "En iyi öğrenci." },
        { el: "Αυτή είναι η πιο όμορφη πόλη.", tr: "En güzel şehir." },
        { el: "Το δυσκολότερο μάθημα.", tr: "En zor ders." }
      ],
      steps: ["Üstünlük antrenmanı.", "12 cümle.", "Karşılaştırma ile fark."],
      practice: ["5 sıfatı üstünlük yap."],
      check: ["Madde+sıfat uyumu doğru mu?"],
      train: "superlative"
    },
    "b1-u6-t2": {
      goal: "Olumlu emirler.",
      theory: ["Έλα/Ελάτε, Γράψε, Δώσε, Πες, Διάβασε. Olumsuz ayrı: Μην…"],
      examples: [
        { el: "Έλα εδώ!", tr: "Gel buraya!" },
        { el: "Δώσε μου το μολύβι.", tr: "Kalemi ver." },
        { el: "Διάβασε το κείμενο.", tr: "Metni oku." }
      ],
      steps: ["Olumlu emir antrenmanı.", "Tablo ezber.", "Μην ile karşılaştır."],
      practice: ["10 emir cümlesi."],
      check: ["Tekil/çoğul Έλα/Ελάτε?"],
      train: "posimp"
    },
    "b1-u6-t3": {
      goal: "Karşılaştırma + üstünlük konuşması (2 dk).",
      theory: ["πιο… από… ve ο πιο… bir arada."],
      examples: [
        { el: "Η Αθήνα είναι πιο μεγάλη από…", tr: "Atina daha büyük…" },
        { el: "Το καλύτερο φαγητό είναι…", tr: "En iyi yemek…" }
      ],
      steps: ["2 dk kaydet: şehir veya yemek.", "Karşılaştır + üstünlük antrenmanı."],
      practice: ["3 karşılaştırma + 3 üstünlük."],
      check: ["İkisi de geçti mi konuşmada?"],
      train: "compare"
    }
  }
};

(function applyExtras8() {
  if (typeof CONTENT !== "undefined" && EXTRAS8.vocab) {
    Object.keys(EXTRAS8.vocab).forEach((deck) => {
      CONTENT.decks[deck] = EXTRAS8.vocab[deck];
    });
  }
  if (typeof TRAINERS !== "undefined") {
    if (EXTRAS8.tipsExtra) TRAINERS.tips = TRAINERS.tips.concat(EXTRAS8.tipsExtra);
    if (EXTRAS8.badgesExtra) TRAINERS.badges = TRAINERS.badges.concat(EXTRAS8.badgesExtra);
    if (EXTRAS8.dictationExtra) TRAINERS.dictation = TRAINERS.dictation.concat(EXTRAS8.dictationExtra);
  }
  if (typeof EXTRAS2 !== "undefined") {
    if (EXTRAS8.scrambleExtra) EXTRAS2.scramble = EXTRAS2.scramble.concat(EXTRAS8.scrambleExtra);
    if (EXTRAS8.examExtra) EXTRAS2.examBank = EXTRAS2.examBank.concat(EXTRAS8.examExtra);
  }
  if (typeof EXTRAS4 !== "undefined" && EXTRAS8.phrasesExtra) {
    EXTRAS4.phrases = EXTRAS4.phrases.concat(EXTRAS8.phrasesExtra);
  }
  if (typeof DRILLS !== "undefined") {
    if (EXTRAS8.cloze) DRILLS.cloze = DRILLS.cloze.concat(EXTRAS8.cloze);
    if (EXTRAS8.reading) DRILLS.reading = DRILLS.reading.concat(EXTRAS8.reading);
  }
  if (typeof LESSONS !== "undefined" && EXTRAS8.newLessons) {
    Object.keys(EXTRAS8.newLessons).forEach((id) => {
      LESSONS[id] = EXTRAS8.newLessons[id];
    });
  }
  if (typeof CURRICULUM !== "undefined" && EXTRAS8.units) {
    Object.keys(EXTRAS8.units).forEach((levelId) => {
      const level = CURRICULUM.levels.find((l) => l.id === levelId);
      if (!level) return;
      EXTRAS8.units[levelId].forEach((u) => {
        if (!level.units.some((x) => x.id === u.id)) level.units.push(u);
      });
    });
  }
})();
