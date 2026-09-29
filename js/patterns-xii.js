/* Kalıp & içerik paketi XII — eczane, posta, sinema, mutfak, iş görüşmesi, paraphrase */
const PATTERNS_XII = [
  // eczane
  { cat: "eczane", level: "a1", frame: "Πονάει το… / Έχω…", eg: "Πονάει το κεφάλι μου.", tr: "… ağrıyor / …ım var" },
  { cat: "eczane", level: "a1", frame: "Θέλω κάτι για…", eg: "Θέλω κάτι για τον πονόλαιμο.", tr: "… için bir şey istiyorum" },
  { cat: "eczane", level: "a2", frame: "Χωρίς συνταγή / Με συνταγή", eg: "Γίνεται χωρίς συνταγή;", tr: "Reçetesiz / reçeteli" },
  { cat: "eczane", level: "a2", frame: "Πώς το παίρνω;", eg: "Πώς το παίρνω; Πόσες φορές την ημέρα;", tr: "Nasıl alacağım?" },
  { cat: "eczane", level: "a2", frame: "Έχει παρενέργειες;", eg: "Έχει παρενέργειες;", tr: "Yan etkisi var mı?" },

  // posta / kargo
  { cat: "posta", level: "a1", frame: "Θέλω να στείλω ένα γράμμα / δέμα", eg: "Θέλω να στείλω ένα δέμα.", tr: "Mektup / paket göndermek istiyorum" },
  { cat: "posta", level: "a2", frame: "Πόσο κάνει για την Τουρκία;", eg: "Πόσο κάνει για την Τουρκία;", tr: "Türkiye’ye ne kadar?" },
  { cat: "posta", level: "a2", frame: "Με συστημένο / express", eg: "Θέλω συστημένο, παρακαλώ.", tr: "Taahhütlü / express" },
  { cat: "posta", level: "a2", frame: "Πότε θα φτάσει;", eg: "Πότε περίπου θα φτάσει;", tr: "Ne zaman varır?" },
  { cat: "posta", level: "b1", frame: "Θέλω να παραλάβω ένα δέμα", eg: "Θέλω να παραλάβω ένα δέμα.", tr: "Paket almak istiyorum" },

  // sinema / kültür
  { cat: "kültür", level: "a2", frame: "Θα πάμε σινεμά / θέατρο;", eg: "Θα πάμε σινεμά απόψε;", tr: "Sinemaya / tiyatroya gidelim mi?" },
  { cat: "kültür", level: "a2", frame: "Τι είδους ταινία είναι;", eg: "Τι είδους ταινία είναι;", tr: "Ne tür film?" },
  { cat: "kültür", level: "a2", frame: "Μου άρεσε / Δεν μου άρεσε", eg: "Μου άρεσε πολύ!", tr: "Beğendim / beğenmedim" },
  { cat: "kültür", level: "b1", frame: "Η πλοκή είναι…", eg: "Η πλοκή είναι ενδιαφέρουσα αλλά αργή.", tr: "Konu …" },
  { cat: "kültür", level: "b1", frame: "Αξίζει να το δεις", eg: "Αξίζει να το δεις.", tr: "İzlemeye değer" },
  { cat: "kültür", level: "b2", frame: "Θίγει θέματα όπως…", eg: "Θίγει θέματα όπως η μοναξιά.", tr: "… gibi konuları işliyor" },

  // mutfak
  { cat: "mutfak", level: "a2", frame: "Βάζω / Κόβω / Ανακατεύω", eg: "Κόβω τα κρεμμύδια και τα ανακατεύω.", tr: "Koyuyorum / kesiyorum / karıştırıyorum" },
  { cat: "mutfak", level: "a2", frame: "Προσθέτω αλάτι / λάδι", eg: "Προσθέτω λίγο αλάτι.", tr: "Tuz / yağ ekliyorum" },
  { cat: "mutfak", level: "a2", frame: "Ψήνεται για … λεπτά", eg: "Ψήνεται για είκοσι λεπτά.", tr: "… dakika pişiyor" },
  { cat: "mutfak", level: "b1", frame: "Η συνταγή θέλει…", eg: "Η συνταγή θέλει δύο αυγά.", tr: "Tarif … ister" },
  { cat: "mutfak", level: "b1", frame: "Μυρίζει υπέροχα / Κάηκε", eg: "Ωχ, κάηκε λίγο.", tr: "Harika kokuyor / yandı" },

  // iş görüşmesi
  { cat: "görüşme", level: "b1", frame: "Κάνω αίτηση για τη θέση…", eg: "Κάνω αίτηση για τη θέση του βοηθού.", tr: "… pozisyonuna başvuruyorum" },
  { cat: "görüşme", level: "b1", frame: "Έχω εμπειρία σε…", eg: "Έχω εμπειρία στην εξυπηρέτηση πελατών.", tr: "… deneyimim var" },
  { cat: "görüşme", level: "b2", frame: "Τα δυνατά μου σημεία είναι…", eg: "Τα δυνατά μου σημεία είναι η οργάνωση και η ομαδική δουλειά.", tr: "Güçlü yanlarım…" },
  { cat: "görüşme", level: "b2", frame: "Αναζητώ μια θέση με…", eg: "Αναζητώ μια θέση με προοπτικές εξέλιξης.", tr: "… olan bir pozisyon arıyorum" },
  { cat: "görüşme", level: "b2", frame: "Θα ήθελα να ρωτήσω για…", eg: "Θα ήθελα να ρωτήσω για το ωράριο.", tr: "… hakkında sormak isterim" },
  { cat: "görüşme", level: "c1", frame: "Σε προηγούμενο ρόλο ήμουν υπεύθυνος/η για…", eg: "Σε προηγούμενο ρόλο ήμουν υπεύθυνη για το έργο.", tr: "Önceki rolümde …den sorumluydum" },

  // özür / teşekkür derin
  { cat: "nezaket", level: "a2", frame: "Ζητάω συγνώμη για…", eg: "Ζητάω συγνώμη για την καθυστέρηση.", tr: "… için özür dilerim" },
  { cat: "nezaket", level: "a2", frame: "Σε ευχαριστώ πολύ για…", eg: "Σε ευχαριστώ πολύ για τη βοήθεια.", tr: "… için çok teşekkürler" },
  { cat: "nezaket", level: "b1", frame: "Δεν ήταν πρόθεσή μου να…", eg: "Δεν ήταν πρόθεσή μου να σε στενοχωρήσω.", tr: "Amacım … değildi" },
  { cat: "nezaket", level: "b1", frame: "Το εκτιμώ πραγματικά", eg: "Το εκτιμώ πραγματικά.", tr: "Gerçekten takdir ediyorum" },
  { cat: "nezaket", level: "b2", frame: "Είμαι υπόχρεος/η", eg: "Σας είμαι υπόχρεη.", tr: "Minnettarım" },

  // paraphrase / akademik
  { cat: "paraphrase", level: "b2", frame: "Με άλλα λόγια…", eg: "Με άλλα λόγια, πρέπει να αλλάξουμε σχέδιο.", tr: "Başka bir deyişle" },
  { cat: "paraphrase", level: "b2", frame: "Αυτό σημαίνει ότι…", eg: "Αυτό σημαίνει ότι χρειάζεται χρόνος.", tr: "Bu demektir ki" },
  { cat: "paraphrase", level: "c1", frame: "Πιο συγκεκριμένα…", eg: "Πιο συγκεκριμένα, τα ποσοστά έπεσαν.", tr: "Daha somut olarak" },
  { cat: "paraphrase", level: "c1", frame: "Για να το θέσω διαφορετικά…", eg: "Για να το θέσω διαφορετικά…", tr: "Farklı ifade edersem" },
  { cat: "paraphrase", level: "c1", frame: "Το κείμενο υποστηρίζει ότι…", eg: "Το κείμενο υποστηρίζει ότι η συνήθεια μετράει.", tr: "Metin şunu savunuyor" },
  { cat: "paraphrase", level: "c2", frame: "Σε τελική ανάλυση…", eg: "Σε τελική ανάλυση, η προσπάθεια αξίζει.", tr: "Son tahlilde" }
];

const T12 = {
  eczane: [
    "Eczane Yunancası hayatta kalma dilidir: semptom söyle, ürün iste, kullanım sor.",
    "Çekirdek: Πονάει το… / Έχω πονόλαιμο / πυρετό. Θέλω κάτι για… Γίνεται χωρίς συνταγή;",
    "Kullanım: Πώς το παίρνω; Πόσες φορές την ημέρα; Πριν ή μετά το φαγητό; Έχει παρενέργειες;",
    "Naziklik: Παρακαλώ, Ευχαριστώ. Emir gibi konuşma.",
    "Türkçe ‘başım ağrıyor’ → Πονάει το κεφάλι μου (με πονάει kalıbı da geçerli).",
    "Sık hata: Sadece ürün adı söyleyip semptomu atlamak; dozaj sormamak.",
    "Rol: eczacı–müşteri 1–2 dk. Semptom + soru + teşekkür.",
    "Hedef: 6 eczane kalıbını otomatik kullanmak."
  ],
  posta: [
    "Posta/kargo: gönderme ve alma. Θέλω να στείλω ένα γράμμα/δέμα. Θέλω να παραλάβω…",
    "Fiyat/süre: Πόσο κάνει για…; Πότε θα φτάσει; Με συστημένο / express.",
    "Adres ve takip numarası kelimelerini tanı: διεύθυνση, αριθμός αποστολής.",
    "Türkçe ‘taahhütlü’ ≈ συστημένο; ‘paket’ ≈ δέμα.",
    "Sık hata: Πόσο κάνει’yi unutup sadece ‘Türkiye’ demek.",
    "Mini diyalog yaz: gönder + fiyat sor + süre sor.",
    "Hedef: Gönderi ve teslim alma kalıpları."
  ],
  kultur: [
    "Kültür sohbeti: davet (Θα πάμε σινεμά;), tür (Τι είδους…;), değerlendirme (Μου άρεσε / Δεν μου άρεσε).",
    "B1+: Η πλοκή… Αξίζει να το δεις. B2: Θίγει θέματα όπως…",
    "Görüşü gerekçelendir: γιατί η ιστορία… / οι ηθοποιοί…",
    "Sık hata: Sadece ‘güzel’ deyip kalmak. Bir neden ekle.",
    "2 dk film/dizi yorumu kaydet.",
    "Hedef: 5 kültür kalıbı + 1 gerekçeli görüş."
  ],
  mutfak: [
    "Tarif dili emir/şimdiki zaman karışımıdır: Κόβω, Βάζω, Ανακατεύω, Προσθέτω, Ψήνεται για…",
    "Η συνταγή θέλει… malzeme listesini cümleye çevir.",
    "Sonuç: Μυρίζει υπέροχα / Κάηκε — değerlendirme kalıpları.",
    "Sıralama: Πρώτα… Μετά… Στο τέλος…",
    "Kısa tarif yaz (8–10 cümle) ve sesli oku.",
    "Hedef: Anlaşılır mini tarif."
  ],
  gorusme: [
    "İş görüşmesi: başvuru, deneyim, güçlü yan, soru sorma.",
    "Κάνω αίτηση για τη θέση… Έχω εμπειρία σε… Τα δυνατά μου σημεία είναι…",
    "Nazik soru: Θα ήθελα να ρωτήσω για το ωράριο / τον μισθό / την ομάδα.",
    "C1: Σε προηγούμενο ρόλο ήμουν υπεύθυνος/η για…",
    "Türkçe CV dilini kelime kelime çevirme; kalıp iskeleti kullan.",
    "Sık hata: Tek kelimelik cevaplar. Her cevaba örnek bağla.",
    "3 dk mock interview kaydet.",
    "Hedef: 6 görüşme kalıbı + örnekli cevap."
  ],
  nezaket: [
    "Derin nezaket: özür gerekçeli, teşekkür somut. Ζητάω συγνώμη για… Σε ευχαριστώ για…",
    "Niyet: Δεν ήταν πρόθεσή μου να… Takdir: Το εκτιμώ πραγματικά. Resmi: Είμαι υπόχρεος/η.",
    "Samimi vs resmi zamir (σε/σας) seç.",
    "Sık hata: Boş ‘özür’ — neden ekle.",
    "4 özür + 4 teşekkür senaryosu yaz.",
    "Hedef: Gerekçeli nezaket."
  ],
  paraphrase: [
    "Paraphrase YDS/özet omurgasıdır: Με άλλα λόγια… Αυτό σημαίνει ότι… Πιο συγκεκριμένα… Για να το θέσω διαφορετικά…",
    "Metin özeti: Το κείμενο υποστηρίζει ότι… Sonuç: Σε τελική ανάλυση…",
    "Aynı fikri 3 biçimde yeniden yaz — kopyalama değil dönüştürme.",
    "Sık hata: Eş anlamlı bulamayıp cümleyi aynen tekrarlamak.",
    "1 kısa paragrafı 3 kez paraphrase et.",
    "Hedef: 5 paraphrase kalıbı aktif."
  ]
};

const EXTRAS12 = {
  vocab: {
    pharmacy: [
      { el: "φαρμακείο", tr: "eczane", tip: "" },
      { el: "συνταγή", tr: "reçete", tip: "" },
      { el: "πονόλαιμος", tr: "boğaz ağrısı", tip: "" },
      { el: "παρακεταμόλη", tr: "parasetamol", tip: "" },
      { el: "παρενέργεια", tr: "yan etki", tip: "" },
      { el: "δοσολογία", tr: "dozaj", tip: "" },
      { el: "επίδεσμος", tr: "bandaj", tip: "" },
      { el: "βιταμίνη", tr: "vitamin", tip: "" }
    ],
    post: [
      { el: "ταχυδρομείο", tr: "posta", tip: "" },
      { el: "δέμα", tr: "paket", tip: "" },
      { el: "γράμμα", tr: "mektup", tip: "" },
      { el: "συστημένο", tr: "taahhütlü", tip: "" },
      { el: "γραμματόσημο", tr: "pul", tip: "" },
      { el: "διεύθυνση", tr: "adres", tip: "" },
      { el: "παραλαβή", tr: "teslim alma", tip: "" },
      { el: "αποστολή", tr: "gönderi", tip: "" }
    ],
    cinema: [
      { el: "ταινία", tr: "film", tip: "" },
      { el: "πλοκή", tr: "konu / olay örgüsü", tip: "" },
      { el: "ηθοποιός", tr: "oyuncu", tip: "" },
      { el: "σκηνοθέτης", tr: "yönetmen", tip: "" },
      { el: "είσοδος", tr: "bilet / giriş", tip: "" },
      { el: "υπότιτλοι", tr: "altyazı", tip: "" },
      { el: "θρίλερ", tr: "gerilim", tip: "" },
      { el: "κωμωδία", tr: "komedi", tip: "" }
    ]
  },

  cloze: [
    { id: "c12a", text: "Θέλω κάτι ___ τον πονόλαιμο.", options: ["για", "χωρίς μόνο", "πάνω", "μετά μόνο"], a: 0, why: "για." },
    { id: "c12b", text: "Γίνεται ___ συνταγή;", options: ["χωρίς", "ποδόσφαιρο", "ταινία", "δέμα"], a: 0, why: "χωρίς συνταγή." },
    { id: "c12c", text: "Θέλω να στείλω ένα ___.", options: ["δέμα", "πονόλαιμο", "ηθοποιό", "μισθό"], a: 0, why: "δέμα." },
    { id: "c12d", text: "Μου ___ πολύ η ταινία.", options: ["άρεσε", "έκαψε", "μπλοκαρίστηκε", "έστειλε"], a: 0, why: "άρεσε." },
    { id: "c12e", text: "Έχω εμπειρία ___ την εξυπηρέτηση.", options: ["στην", "χωρίς", "πάνω από ποτέ", "μόνο"], a: 0, why: "στην." },
    { id: "c12f", text: "Με άλλα ___, πρέπει να αλλάξουμε σχέδιο.", options: ["λόγια", "δέματα", "παρενέργειες", "εισιτήρια"], a: 0, why: "λόγια." }
  ],

  reading: [
    {
      id: "r12a",
      title: "Φαρμακείο",
      text: "Η Μαρία μπήκε στο φαρμακείο και είπε: «Πονάει ο λαιμός μου. Θέλω κάτι για τον πονόλαιμο. Γίνεται χωρίς συνταγή;» Ο φαρμακοποιός ρώτησε πόσες φορές την ημέρα μπορεί να το πάρει και αν έχει παρενέργειες.",
      q: "Τι θέλει η Μαρία;",
      options: ["Κάτι για τον πονόλαιμο", "Να στείλει δέμα", "Εισιτήριο σινεμά", "Νέα δουλειά"],
      a: 0
    },
    {
      id: "r12b",
      title: "Συνέντευξη",
      text: "Ο Νίκος έκανε αίτηση για τη θέση του βοηθού. Στην συνέντευξη είπε ότι έχει εμπειρία στην εξυπηρέτηση πελατών και ότι τα δυνατά του σημεία είναι η οργάνωση. Στο τέλος ρώτησε για το ωράριο.",
      q: "Τι ρώτησε στο τέλος;",
      options: ["Για το ωράριο", "Για τον πονόλαιμο", "Για την πλοκή", "Για το δέμα"],
      a: 0
    }
  ],

  examExtra: [
    { q: "συνταγή?", options: ["reçete", "film konusu", "paket", "güçlü yan"], a: 0, kind: "vocab" },
    { q: "δέμα?", options: ["paket", "yan etki", "altyazı", "mülakat"], a: 0, kind: "vocab" },
    { q: "Μου άρεσε?", options: ["Beğendim", "Yandı", "Gönderdim", "Başvurdum"], a: 0, kind: "vocab" },
    { q: "Με άλλα λόγια…?", options: ["Başka bir deyişle", "Reçetesiz", "Taahhütlü", "Yan etki"], a: 0, kind: "vocab" },
    { q: "Έχω εμπειρία σε…?", options: ["… deneyimim var", "Film izledim", "Paket aldım", "Yemek yandı"], a: 0, kind: "vocab" },
    { q: "παρενέργεια?", options: ["yan etki", "yönetmen", "pul", "tez"], a: 0, kind: "vocab" }
  ],

  scrambleExtra: [
    { words: ["Θέλω", "κάτι", "για", "τον", "πονόλαιμο"], answer: "Θέλω κάτι για τον πονόλαιμο", tr: "Boğaz ağrısı için bir şey istiyorum" },
    { words: ["Θέλω", "να", "στείλω", "ένα", "δέμα"], answer: "Θέλω να στείλω ένα δέμα", tr: "Paket göndermek istiyorum" },
    { words: ["Μου", "άρεσε", "πολύ", "η", "ταινία"], answer: "Μου άρεσε πολύ η ταινία", tr: "Filmi çok beğendim" },
    { words: ["Έχω", "εμπειρία", "στην", "εξυπηρέτηση"], answer: "Έχω εμπειρία στην εξυπηρέτηση", tr: "Müşteri hizmetinde deneyimim var" },
    { words: ["Με", "άλλα", "λόγια", "πρέπει", "να", "αλλάξουμε"], answer: "Με άλλα λόγια πρέπει να αλλάξουμε", tr: "Başka bir deyişle değiştirmeliyiz" }
  ],

  dictationExtra: [
    "Θέλω κάτι για τον πονόλαιμο, παρακαλώ.",
    "Γίνεται χωρίς συνταγή;",
    "Θέλω να στείλω ένα συστημένο δέμα.",
    "Μου άρεσε πολύ η ταινία.",
    "Έχω εμπειρία στην ομαδική δουλειά.",
    "Με άλλα λόγια, πρέπει να προσπαθήσουμε περισσότερο."
  ],

  units: {
    a1: [{
      id: "a1-u10", title: "Eczane & Posta", focus: "φαρμακείο, δέμα",
      tasks: [
        { id: "a1-u10-t1", title: "Eczane kalıpları", detail: "Semptom, ürün, reçete, dozaj.", minutes: 20, type: "study" },
        { id: "a1-u10-t2", title: "Posta / kargo", detail: "Gönder, fiyat sor, süre sor.", minutes: 20, type: "practice" },
        { id: "a1-u10-t3", title: "Nezaket derin", detail: "Gerekçeli özür ve teşekkür.", minutes: 15, type: "speak" }
      ]
    }],
    a2: [{
      id: "a2-u12", title: "Kültür & Mutfak", focus: "ταινία, συνταγή",
      tasks: [
        { id: "a2-u12-t1", title: "Sinema / kültür sohbeti", detail: "Tür, beğeni, gerekçe.", minutes: 20, type: "speak" },
        { id: "a2-u12-t2", title: "Mini tarif yaz", detail: "8–10 cümlelik tarif.", minutes: 25, type: "write" },
        { id: "a2-u12-t3", title: "Kalıp + kelime", detail: "Sinema/posta desteleri + pattern.", minutes: 20, type: "practice" }
      ]
    }],
    b2: [{
      id: "b2-u9", title: "Görüşme & Paraphrase", focus: "αίτηση, με άλλα λόγια",
      tasks: [
        { id: "b2-u9-t1", title: "İş görüşmesi kalıpları", detail: "Başvuru, deneyim, güçlü yan, soru.", minutes: 30, type: "study" },
        { id: "b2-u9-t2", title: "Mock interview", detail: "3 dk kaydet.", minutes: 25, type: "speak" },
        { id: "b2-u9-t3", title: "Paraphrase seti", detail: "Aynı fikri 3 biçimde yaz.", minutes: 30, type: "write" }
      ]
    }]
  },

  newLessons: {
    "a1-u10-t1": {
      goal: "Eczanede semptom söyleyip doğru soruları sormak.",
      theory: T12.eczane,
      examples: PATTERNS_XII.filter((p) => p.cat === "eczane").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Kalıp antrenmanı.", "Eczane destesi.", "1 dk rol kaydı."],
      practice: ["3 semptom × ürün isteği yaz."],
      check: ["Dozaj sorusu sordun mu?"],
      train: "pattern"
    },
    "a1-u10-t2": {
      goal: "Posta/kargoda gönderi ve fiyat/süre sormak.",
      theory: T12.posta,
      examples: PATTERNS_XII.filter((p) => p.cat === "posta").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Gönderi diyaloğu yaz.", "Posta destesi.", "Kalıp turu."],
      practice: ["Türkiye’ye paket senaryosu."],
      check: ["Fiyat + süre soruldu mu?"],
      train: "pattern"
    },
    "a1-u10-t3": {
      goal: "Gerekçeli özür ve somut teşekkür.",
      theory: T12.nezaket,
      examples: PATTERNS_XII.filter((p) => p.cat === "nezaket").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["4 özür + 4 teşekkür.", "Sesli oku.", "Kalıp antrenmanı."],
      practice: ["Resmi ve samimi birer versiyon."],
      check: ["Gerekçe var mı?"],
      train: "pattern"
    },
    "a2-u12-t1": {
      goal: "Film/dizi hakkında gerekçeli konuşmak.",
      theory: T12.kultur,
      examples: PATTERNS_XII.filter((p) => p.cat === "kültür").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["2 dk yorum kaydet.", "Sinema destesi.", "Kalıp turu."],
      practice: ["Beğeni + beğenmeme gerekçesi."],
      check: ["En az 1 neden var mı?"],
      train: "pattern"
    },
    "a2-u12-t2": {
      goal: "Kısa yemek tarifini Yunanca yazmak.",
      theory: T12.mutfak,
      examples: PATTERNS_XII.filter((p) => p.cat === "mutfak").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Malzeme listesi.", "8–10 adım yaz.", "Sesli oku."],
      practice: ["Πρώτα / Μετά / Στο τέλος ekle."],
      check: ["Sıra net mi?"],
      train: "pattern"
    },
    "a2-u12-t3": {
      goal: "Kültür + posta kelime ve kalıplarını pekiştirmek.",
      theory: ["Kelime destesi + kalıp antrenmanı birlikte tutulunca üretim hızlanır.", "Önce kart, sonra 5 üretim cümlesi.", "Zor kartları ayrı tekrara al."],
      examples: [
        { el: "Αξίζει να το δεις.", tr: "İzlemeye değer" },
        { el: "Πότε θα φτάσει το δέμα;", tr: "Paket ne zaman varır?" }
      ],
      steps: ["Sinema + posta desteleri.", "Pattern 2 tur.", "5 cümle yaz."],
      practice: ["TR→YN 8 kalıp."],
      check: ["8/8 mi?"],
      train: "pattern"
    },
    "b2-u9-t1": {
      goal: "İş görüşmesi kalıp iskeletlerini kurmak.",
      theory: T12.gorusme,
      examples: PATTERNS_XII.filter((p) => p.cat === "görüşme").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["6 kalıp ezber.", "Her birine örnek ekle.", "Kalıp antrenmanı."],
      practice: ["Kendi CV’nden 5 cümle."],
      check: ["Deneyim + güçlü yan var mı?"],
      train: "pattern"
    },
    "b2-u9-t2": {
      goal: "Mock interview ile kalıpları sözlüye taşımak.",
      theory: ["3 dk: tanıtım, deneyim, güçlü yan, bir soru sor.", "Tek kelimelik cevap yok; örnek ver.", "Kaydet, dolgu azalt."],
      examples: [
        { el: "Τα δυνατά μου σημεία είναι…", tr: "güçlü yanlarım" },
        { el: "Θα ήθελα να ρωτήσω για…", tr: "sormak isterim" }
      ],
      steps: ["Soruları yaz.", "3 dk kaydet.", "Dinle düzelt."],
      practice: ["İkinci take daha akıcı."],
      check: ["4 bölüm tamam mı?"],
      train: "pattern"
    },
    "b2-u9-t3": {
      goal: "Paraphrase kalıplarıyla aynı fikri yeniden yazmak.",
      theory: T12.paraphrase,
      examples: PATTERNS_XII.filter((p) => p.cat === "paraphrase").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["1 paragraf seç.", "3 paraphrase yaz.", "Kalıp işaretle."],
      practice: ["YDS cloze turunda kalıp avı."],
      check: ["3 biçim gerçekten farklı mı?"],
      train: "pattern"
    }
  }
};

(function applyPatternsXII() {
  if (typeof PATTERNS !== "undefined") {
    PATTERNS.bank = PATTERNS.bank.concat(PATTERNS_XII);
  }
  if (typeof CONTENT !== "undefined" && EXTRAS12.vocab) {
    Object.keys(EXTRAS12.vocab).forEach((d) => {
      CONTENT.decks[d] = EXTRAS12.vocab[d];
    });
  }
  if (typeof EXTRAS2 !== "undefined") {
    if (EXTRAS12.examExtra) EXTRAS2.examBank = EXTRAS2.examBank.concat(EXTRAS12.examExtra);
    if (EXTRAS12.scrambleExtra) EXTRAS2.scramble = EXTRAS2.scramble.concat(EXTRAS12.scrambleExtra);
  }
  if (typeof TRAINERS !== "undefined" && EXTRAS12.dictationExtra) {
    TRAINERS.dictation = TRAINERS.dictation.concat(EXTRAS12.dictationExtra);
  }
  if (typeof DRILLS !== "undefined") {
    if (EXTRAS12.cloze) DRILLS.cloze = DRILLS.cloze.concat(EXTRAS12.cloze);
    if (EXTRAS12.reading) DRILLS.reading = DRILLS.reading.concat(EXTRAS12.reading);
  }
  if (typeof LESSONS !== "undefined" && EXTRAS12.newLessons) {
    Object.keys(EXTRAS12.newLessons).forEach((id) => {
      LESSONS[id] = EXTRAS12.newLessons[id];
    });
  }
  if (typeof CURRICULUM !== "undefined" && EXTRAS12.units) {
    Object.keys(EXTRAS12.units).forEach((levelId) => {
      const level = CURRICULUM.levels.find((l) => l.id === levelId);
      if (!level) return;
      EXTRAS12.units[levelId].forEach((u) => {
        if (!level.units.some((x) => x.id === u.id)) level.units.push(u);
      });
    });
  }
})();
