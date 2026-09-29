/* Kalıp & içerik paketi XI — banka, davet, teknoloji, çevre, zaman, YDS bağlaç+ */
const PATTERNS_XI = [
  // banka / para
  { cat: "banka", level: "a2", frame: "Θέλω να ανοίξω λογαριασμό", eg: "Θέλω να ανοίξω λογαριασμό.", tr: "Hesap açmak istiyorum" },
  { cat: "banka", level: "a2", frame: "Πόσο είναι το υπόλοιπο;", eg: "Πόσο είναι το υπόλοιπο;", tr: "Bakiye ne kadar?" },
  { cat: "banka", level: "a2", frame: "Θέλω να κάνω ανάληψη / κατάθεση", eg: "Θέλω να κάνω ανάληψη.", tr: "Para çekmek / yatırmak" },
  { cat: "banka", level: "b1", frame: "Η κάρτα μου μπλοκαρίστηκε", eg: "Η κάρτα μου μπλοκαρίστηκε.", tr: "Kartım bloke oldu" },
  { cat: "banka", level: "b1", frame: "Ποιο είναι το επιτόκιο / η προμήθεια;", eg: "Ποια είναι η προμήθεια;", tr: "Faiz / komisyon nedir?" },
  { cat: "banka", level: "b1", frame: "Θέλω να κάνω μεταφορά", eg: "Θέλω να κάνω μεταφορά στον λογαριασμό μου.", tr: "Havale yapmak istiyorum" },

  // davet / sosyal
  { cat: "davet", level: "a1", frame: "Θέλεις να έρθεις;", eg: "Θέλεις να έρθεις στο πάρτι;", tr: "Gelmek ister misin?" },
  { cat: "davet", level: "a1", frame: "Φυσικά! / Με χαρά!", eg: "Με χαρά!", tr: "Tabii! / Memnuniyetle!" },
  { cat: "davet", level: "a2", frame: "Δυστυχώς δεν μπορώ", eg: "Δυστυχώς δεν μπορώ να έρθω.", tr: "Maalesef gelemem" },
  { cat: "davet", level: "a2", frame: "Τι ώρα να είμαι εκεί;", eg: "Τι ώρα να είμαι εκεί;", tr: "Ne zaman orada olayım?" },
  { cat: "davet", level: "a2", frame: "Φέρνω κάτι;", eg: "Φέρνω κάτι;", tr: "Bir şey getireyim mi?" },
  { cat: "davet", level: "b1", frame: "Ευχαριστώ για την πρόσκληση", eg: "Ευχαριστώ για την πρόσκληση.", tr: "Davet için teşekkürler" },

  // teknoloji
  { cat: "tech", level: "a2", frame: "Δεν ανοίγει η εφαρμογή", eg: "Δεν ανοίγει η εφαρμογή.", tr: "Uygulama açılmıyor" },
  { cat: "tech", level: "a2", frame: "Ξέχασα τον κωδικό", eg: "Ξέχασα τον κωδικό μου.", tr: "Şifremi unuttum" },
  { cat: "tech", level: "a2", frame: "Μπορείς να μου στείλεις τον σύνδεσμο;", eg: "Μπορείς να μου στείλεις τον σύνδεσμο;", tr: "Linki atabilir misin?" },
  { cat: "tech", level: "b1", frame: "Κάνε επανεκκίνηση", eg: "Κάνε επανεκκίνηση τον υπολογιστή.", tr: "Yeniden başlat" },
  { cat: "tech", level: "b1", frame: "Η μπαταρία τελειώνει", eg: "Η μπαταρία τελειώνει.", tr: "Pil bitiyor" },
  { cat: "tech", level: "b1", frame: "Ανέβασε / Κατέβασε το αρχείο", eg: "Ανέβασε το αρχείο στο cloud.", tr: "Dosyayı yükle / indir" },
  { cat: "tech", level: "b2", frame: "Έχω πρόβλημα με τη σύνδεση", eg: "Έχω πρόβλημα με τη σύνδεση στο διαδίκτυο.", tr: "Bağlantı sorunum var" },

  // çevre
  { cat: "çevre", level: "b1", frame: "Πρέπει να προστατεύσουμε το περιβάλλον", eg: "Πρέπει να προστατεύσουμε το περιβάλλον.", tr: "Çevreyi korumalıyız" },
  { cat: "çevre", level: "b1", frame: "Ανακυκλώνω πλαστικό / χαρτί", eg: "Ανακυκλώνω χαρτί κάθε εβδομάδα.", tr: "Geri dönüştürüyorum" },
  { cat: "çevre", level: "b2", frame: "Η κλιματική αλλαγή επηρεάζει…", eg: "Η κλιματική αλλαγή επηρεάζει τη γεωργία.", tr: "İklim değişikliği …yi etkiliyor" },
  { cat: "çevre", level: "b2", frame: "Μειώνω την κατανάλωση ενέργειας", eg: "Προσπαθώ να μειώσω την κατανάλωση ενέργειας.", tr: "Enerji tüketimini azaltıyorum" },
  { cat: "çevre", level: "c1", frame: "Είναι επιτακτική ανάγκη να…", eg: "Είναι επιτακτική ανάγκη να δράσουμε τώρα.", tr: "Acil gereklilik …" },
  { cat: "çevre", level: "c1", frame: "Αν δεν ληφθούν μέτρα…", eg: "Αν δεν ληφθούν μέτρα, η κατάσταση θα χειροτερέψει.", tr: "Önlem alınmazsa…" },

  // zaman yönetimi
  { cat: "zaman", level: "a2", frame: "Δεν προλαβαίνω", eg: "Σήμερα δεν προλαβαίνω.", tr: "Yetişemiyorum" },
  { cat: "zaman", level: "a2", frame: "Χάνω χρόνο με…", eg: "Χάνω χρόνο με τα social media.", tr: "… ile zaman kaybediyorum" },
  { cat: "zaman", level: "b1", frame: "Βάζω προτεραιότητες", eg: "Πρέπει να βάλω προτεραιότητες.", tr: "Öncelik koyuyorum" },
  { cat: "zaman", level: "b1", frame: "Μου παίρνει πολύ χρόνο", eg: "Μου παίρνει πολύ χρόνο να μετακινηθώ.", tr: "Çok zamanımı alıyor" },
  { cat: "zaman", level: "b2", frame: "Αναβάλλω συνεχώς", eg: "Αναβάλλω συνεχώς τη μελέτη.", tr: "Sürekli erteliyorum" },
  { cat: "zaman", level: "b2", frame: "Οργανώνω το πρόγραμμά μου", eg: "Οργανώνω το πρόγραμμά μου κάθε Κυριακή.", tr: "Programımı düzenliyorum" },

  // karşılaştırma +
  { cat: "karşılaştır", level: "a2", frame: "Είναι πιο + adj από…", eg: "Είναι πιο ακριβό από χθες.", tr: "…den daha …" },
  { cat: "karşılaştır", level: "a2", frame: "Είναι το ίδιο + adj με…", eg: "Είναι το ίδιο δύσκολο με τα μαθηματικά.", tr: "… ile aynı …" },
  { cat: "karşılaştır", level: "b1", frame: "Όσο περισσότερο… τόσο…", eg: "Όσο περισσότερο διαβάζω, τόσο καλύτερα καταλαβαίνω.", tr: "Ne kadar … o kadar …" },
  { cat: "karşılaştır", level: "b1", frame: "Σε σύγκριση με…", eg: "Σε σύγκριση με πέρσι, είμαι καλύτερα.", tr: "… ile karşılaştırınca" },

  // YDS bağlaç+
  { cat: "yds+", level: "b2", frame: "Παρά τις δυσκολίες…", eg: "Παρά τις δυσκολίες, συνέχισε.", tr: "Zorluklara rağmen" },
  { cat: "yds+", level: "b2", frame: "Εκτός από το ότι…", eg: "Εκτός από το ότι άργησε, ξέχασε και τα κλειδιά.", tr: "… olmasının yanı sıra" },
  { cat: "yds+", level: "c1", frame: "Ανεξάρτητα από το αν…", eg: "Ανεξάρτητα από το αν συμφωνούμε…", tr: "… olsun olmasın" },
  { cat: "yds+", level: "c1", frame: "Υπό την προϋπόθεση ότι…", eg: "Υπό την προϋπόθεση ότι θα προετοιμαστείς…", tr: "Şartıyla ki" },
  { cat: "yds+", level: "c1", frame: "Ενδεχομένως / Πιθανότατα", eg: "Ενδεχομένως να χρειαστούμε περισσότερο χρόνο.", tr: "Muhtemelen" },
  { cat: "yds+", level: "c1", frame: "Σε αντίθεση με…", eg: "Σε αντίθεση με ό,τι πιστεύουν πολλοί…", tr: "…nin aksine" },
  { cat: "yds+", level: "c2", frame: "Κατά συνέπεια…", eg: "Κατά συνέπεια, πρέπει να αλλάξουμε στρατηγική.", tr: "Sonuç olarak" },
  { cat: "yds+", level: "c2", frame: "Εν ολίγοις…", eg: "Εν ολίγοις, αξίζει τον κόπο.", tr: "Kısaca" },

  // ev / komşu
  { cat: "ev", level: "a1", frame: "Μένω σε διαμέρισμα / σπίτι", eg: "Μένω σε διαμέρισμα.", tr: "Dairede / evde oturuyorum" },
  { cat: "ev", level: "a1", frame: "Έχω δύο δωμάτια", eg: "Έχω δύο δωμάτια.", tr: "İki odam var" },
  { cat: "ev", level: "a2", frame: "Ο γείτονας κάνει θόρυβο", eg: "Ο γείτονας κάνει πολύ θόρυβο.", tr: "Komşu gürültü yapıyor" },
  { cat: "ev", level: "a2", frame: "Χάλασε το…", eg: "Χάλασε το ψυγείο.", tr: "… bozuldu" },
  { cat: "ev", level: "b1", frame: "Ψάχνω διαμέρισμα προς ενοικίαση", eg: "Ψάχνω διαμέρισμα προς ενοικίαση.", tr: "Kiralık daire arıyorum" },

  // onay / red nazik
  { cat: "onay", level: "a2", frame: "Συμφωνώ απόλυτα", eg: "Συμφωνώ απόλυτα μαζί σου.", tr: "Tamamen katılıyorum" },
  { cat: "onay", level: "a2", frame: "Δεν είμαι σίγουρος/η", eg: "Δεν είμαι σίγουρη.", tr: "Emin değilim" },
  { cat: "onay", level: "b1", frame: "Καταλαβαίνω την άποψή σου, αλλά…", eg: "Καταλαβαίνω την άποψή σου, αλλά διαφωνώ.", tr: "Görüşünü anlıyorum ama…" },
  { cat: "onay", level: "b1", frame: "Ίσως έχεις δίκιο", eg: "Ίσως έχεις δίκιο.", tr: "Belki haklısın" }
];

const EXTRAS11 = {
  vocab: {
    bank: [
      { el: "λογαριασμός", tr: "hesap", tip: "" },
      { el: "υπόλοιπο", tr: "bakiye", tip: "" },
      { el: "ανάληψη", tr: "para çekme", tip: "" },
      { el: "κατάθεση", tr: "yatırma", tip: "" },
      { el: "μεταφορά", tr: "havale", tip: "" },
      { el: "προμήθεια", tr: "komisyon", tip: "" },
      { el: "κωδικός PIN", tr: "PIN kodu", tip: "" },
      { el: "ταμείο", tr: "vezne", tip: "" }
    ],
    tech2: [
      { el: "εφαρμογή", tr: "uygulama", tip: "" },
      { el: "σύνδεσμος", tr: "bağlantı / link", tip: "" },
      { el: "επανεκκίνηση", tr: "yeniden başlatma", tip: "" },
      { el: "μπαταρία", tr: "pil", tip: "" },
      { el: "ανέβασμα", tr: "yükleme", tip: "" },
      { el: "κατέβασμα", tr: "indirme", tip: "" },
      { el: "σύνδεση", tr: "bağlantı", tip: "" },
      { el: "ενημέρωση", tr: "güncelleme", tip: "" }
    ],
    environment: [
      { el: "περιβάλλον", tr: "çevre", tip: "" },
      { el: "ανακύκλωση", tr: "geri dönüşüm", tip: "" },
      { el: "κλιματική αλλαγή", tr: "iklim değişikliği", tip: "" },
      { el: "ρύπανση", tr: "kirlilik", tip: "" },
      { el: "ενέργεια", tr: "enerji", tip: "" },
      { el: "μέτρα", tr: "önlemler", tip: "" },
      { el: "βιώσιμος", tr: "sürdürülebilir", tip: "" },
      { el: "απορρίμματα", tr: "atık", tip: "" }
    ]
  },

  cloze: [
    { id: "c11a", text: "Θέλω να ανοίξω ___.", options: ["λογαριασμό", "μπαταρία", "θόρυβο", "σύνδεσμο μόνο"], a: 0, why: "λογαριασμό." },
    { id: "c11b", text: "Δυστυχώς δεν ___ να έρθω.", options: ["μπορώ", "φέρνω", "ανοίγω", "μειώνω"], a: 0, why: "μπορώ." },
    { id: "c11c", text: "Ξέχασα τον ___.", options: ["κωδικό", "γείτονα", "λογαριασμό μόνο", "καιρό"], a: 0, why: "κωδικό." },
    { id: "c11d", text: "Ανακυκλώνω ___ κάθε εβδομάδα.", options: ["χαρτί", "σύσκεψη", "ραντεβού", "πτήση"], a: 0, why: "χαρτί." },
    { id: "c11e", text: "Όσο περισσότερο διαβάζω, ___ καλύτερα καταλαβαίνω.", options: ["τόσο", "παρά", "χωρίς", "μόνο"], a: 0, why: "Όσο… τόσο…" },
    { id: "c11f", text: "Υπό την προϋπόθεση ___ θα προετοιμαστείς…", options: ["ότι", "αν μόνο ποτέ", "χωρίς", "πάνω"], a: 0, why: "ότι." },
    { id: "c11g", text: "Εν ολίγοις, αξίζει τον ___.", options: ["κόπο", "κωδικό", "γείτονα", "PIN"], a: 0, why: "κόπο." }
  ],

  reading: [
    {
      id: "r11a",
      title: "Τράπεζα",
      text: "Ο Νίκος πήγε στην τράπεζα γιατί η κάρτα του μπλοκαρίστηκε. Ζήτησε να κάνει ανάληψη από το ταμείο και ρώτησε ποια είναι η προμήθεια για μεταφορά σε άλλο λογαριασμό.",
      q: "Γιατί πήγε ο Νίκος στην τράπεζα;",
      options: ["Η κάρτα του μπλοκαρίστηκε", "Ήθελε πρόσκληση", "Χάλασε το ψυγείο", "Έκανε πάρτι"],
      a: 0
    },
    {
      id: "r11b",
      title: "Περιβάλλον",
      text: "Η Μαρία λέει ότι πρέπει να προστατεύσουμε το περιβάλλον. Ανακυκλώνει πλαστικό και χαρτί και προσπαθεί να μειώσει την κατανάλωση ενέργειας. «Αν δεν ληφθούν μέτρα», λέει, «η κατάσταση θα χειροτερέψει.»",
      q: "Τι φοβάται η Μαρία;",
      options: ["Ότι χωρίς μέτρα η κατάσταση θα χειροτερέψει", "Ότι θα ξεχάσει τον κωδικό", "Ότι θα αργήσει στο πάρτι", "Ότι η κάρτα μπλοκαρίστηκε"],
      a: 0
    },
    {
      id: "r11c",
      title: "Πρόσκληση",
      text: "«Θέλεις να έρθεις στο πάρτι το Σάββατο;» ρώτησε η Ελένη. «Με χαρά! Τι ώρα να είμαι εκεί; Φέρνω κάτι;» απάντησε ο φίλος της.",
      q: "Τι δέχτηκε ο φίλος;",
      options: ["Την πρόσκληση", "Να ανοίξει λογαριασμό", "Να κάνει ανάληψη", "Να ανακυκλώσει"],
      a: 0
    }
  ],

  examExtra: [
    { q: "ανάληψη?", options: ["para çekme", "davet", "geri dönüşüm", "link"], a: 0, kind: "vocab" },
    { q: "Δυστυχώς δεν μπορώ?", options: ["Maalesef gelemem / yapamam", "Tabii gelirim", "Hesap aç", "Pil dolu"], a: 0, kind: "vocab" },
    { q: "Όσο περισσότερο… τόσο…?", options: ["Ne kadar … o kadar …", "Rağmen", "Şartıyla", "Kısaca"], a: 0, kind: "vocab" },
    { q: "Υπό την προϋπόθεση ότι… seviyesi?", options: ["A0 selam", "C1/YDS bağlaç", "Sadece emir", "Saat"], a: 1, kind: "strategy" },
    { q: "Εν ολίγοις?", options: ["Kısaca", "Muhtemelen", "Aksine", "Yetişemiyorum"], a: 0, kind: "vocab" },
    { q: "επανεκκίνηση?", options: ["yeniden başlatma", "havale", "komisyon", "davet"], a: 0, kind: "vocab" },
    { q: "Αν δεν ληφθούν μέτρα…?", options: ["Önlem alınmazsa…", "Pil bitiyor", "Kart bloke", "Getireyim mi"], a: 0, kind: "vocab" }
  ],

  scrambleExtra: [
    { words: ["Θέλω", "να", "ανοίξω", "λογαριασμό"], answer: "Θέλω να ανοίξω λογαριασμό", tr: "Hesap açmak istiyorum" },
    { words: ["Δυστυχώς", "δεν", "μπορώ", "να", "έρθω"], answer: "Δυστυχώς δεν μπορώ να έρθω", tr: "Maalesef gelemem" },
    { words: ["Ξέχασα", "τον", "κωδικό", "μου"], answer: "Ξέχασα τον κωδικό μου", tr: "Şifremi unuttum" },
    { words: ["Πρέπει", "να", "προστατεύσουμε", "το", "περιβάλλον"], answer: "Πρέπει να προστατεύσουμε το περιβάλλον", tr: "Çevreyi korumalıyız" },
    { words: ["Εν", "ολίγοις", "αξίζει", "τον", "κόπο"], answer: "Εν ολίγοις αξίζει τον κόπο", tr: "Kısaca zahmete değer" }
  ],

  dictationExtra: [
    "Θέλω να κάνω ανάληψη από το ταμείο.",
    "Ευχαριστώ για την πρόσκληση.",
    "Δεν ανοίγει η εφαρμογή σήμερα.",
    "Ανακυκλώνω χαρτί και πλαστικό.",
    "Όσο περισσότερο διαβάζω, τόσο καλύτερα καταλαβαίνω.",
    "Υπό την προϋπόθεση ότι θα έρθεις νωρίς.",
    "Εν ολίγοις, πρέπει να οργανώσουμε το πρόγραμμα."
  ],

  units: {
    a2: [{
      id: "a2-u11", title: "Banka & Davet", focus: "λογαριασμός, πρόσκληση",
      tasks: [
        { id: "a2-u11-t1", title: "Banka kalıpları", detail: "Hesap, çekme, yatırma, kart bloke.", minutes: 20, type: "study" },
        { id: "a2-u11-t2", title: "Davet kabul / red", detail: "Θέλεις να… Με χαρά / Δυστυχώς…", minutes: 20, type: "practice" },
        { id: "a2-u11-t3", title: "Ev & komşu", detail: "Μένω… · θόρυβος · χάλασε…", minutes: 20, type: "speak" }
      ]
    }],
    b1: [{
      id: "b1-u9", title: "Tech & Zaman", focus: "εφαρμογή, προτεραιότητες",
      tasks: [
        { id: "b1-u9-t1", title: "Teknoloji sorunları", detail: "Uygulama, şifre, link, restart.", minutes: 25, type: "study" },
        { id: "b1-u9-t2", title: "Zaman yönetimi kalıpları", detail: "προλαβαίνω · προτεραιότητες · αναβάλλω.", minutes: 25, type: "practice" },
        { id: "b1-u9-t3", title: "Karşılaştırma + onay", detail: "πιο… · όσο…τόσο · συμφωνώ/διαφωνώ.", minutes: 25, type: "speak" }
      ]
    }],
    c1: [{
      id: "c1-u7", title: "Çevre & YDS+", focus: "κλίμα, προϋπόθεση, εν ολίγοις",
      tasks: [
        { id: "c1-u7-t1", title: "Çevre kalıp seti", detail: "προστατεύουμε · μέτρα · επιτακτική ανάγκη.", minutes: 30, type: "study" },
        { id: "c1-u7-t2", title: "YDS bağlaç bankası XI", detail: "Παρά · Ανεξάρτητα · Υπό την προϋπόθεση…", minutes: 30, type: "yds" },
        { id: "c1-u7-t3", title: "350 kelimelik çevre denemesi", detail: "En az 10 YDS+/çevre kalıbı.", minutes: 45, type: "write" }
      ]
    }]
  },

  newLessons: {
    "a2-u11-t1": {
      goal: "Bankada temel işlemleri kalıpla yönetmek.",
      theory: ["ανοίγω λογαριασμό · ανάληψη/κατάθεση · υπόλοιπο · μπλοκαρίστηκε · προμήθεια."],
      examples: PATTERNS_XI.filter((p) => p.cat === "banka").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Kalıp antrenmanı.", "8 banka cümlesi.", "Banka destesi kart."],
      practice: ["Vezne rolü 1 dk."],
      check: ["4 banka kalıbı otomatik mi?"],
      train: "pattern"
    },
    "a2-u11-t2": {
      goal: "Daveti kabul/red nazikçe söylemek.",
      theory: ["Θέλεις να έρθεις; · Με χαρά · Δυστυχώς δεν μπορώ · Φέρνω κάτι;"],
      examples: PATTERNS_XI.filter((p) => p.cat === "davet").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Kabul + red diyalogu yaz.", "Kalıp antrenmanı.", "Sesli oku."],
      practice: ["3 davet senaryosu."],
      check: ["Red nazik mi?"],
      train: "pattern"
    },
    "a2-u11-t3": {
      goal: "Ev ve komşu durumlarını anlatmak.",
      theory: ["Μένω σε… · δωμάτια · θόρυβος · χάλασε… · ενοικίαση."],
      examples: PATTERNS_XI.filter((p) => p.cat === "ev").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["2 dk ev anlat.", "1 şikayet cümlesi.", "Kalıp turu."],
      practice: ["Kiralık daire arama cümlesi."],
      check: ["3 ev kalıbı var mı?"],
      train: "pattern"
    },
    "b1-u9-t1": {
      goal: "Teknik sorunları Yunanca tarif etmek.",
      theory: ["εφαρμογή · κωδικός · σύνδεσμος · επανεκκίνηση · μπαταρία · ανέβασε/κατέβασε."],
      examples: PATTERNS_XI.filter((p) => p.cat === "tech").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Kalıp 2 tur.", "Destek hattı rolü.", "Tech destesi."],
      practice: ["5 sorun cümlesi yaz."],
      check: ["Restart + şifre + link var mı?"],
      train: "pattern"
    },
    "b1-u9-t2": {
      goal: "Zaman baskısını kalıpla ifade etmek.",
      theory: ["δεν προλαβαίνω · χάνω χρόνο · προτεραιότητες · αναβάλλω · οργανώνω."],
      examples: PATTERNS_XI.filter((p) => p.cat === "zaman").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Haftalık plan Yunanca.", "Kalıp antrenmanı.", "1 paragraf yaz."],
      practice: ["Erteleme vs öncelik karşılaştır."],
      check: ["4 zaman kalıbı mi?"],
      train: "pattern"
    },
    "b1-u9-t3": {
      goal: "Karşılaştırma ve nazik onay/red.",
      theory: ["πιο…από · όσο…τόσο · Σε σύγκριση με · Συμφωνώ · Καταλαβαίνω…αλλά"],
      examples: PATTERNS_XI.filter((p) => p.cat === "karşılaştır" || p.cat === "onay").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["2 dk tartışma kaydet.", "Kalıp doldur.", "3 karşılaştırma cümlesi."],
      practice: ["Aynı konuda hem katıl hem kırmadan red."],
      check: ["Nazik red var mı?"],
      train: "pattern"
    },
    "c1-u7-t1": {
      goal: "Çevre konusunda ileri kalıplar.",
      theory: ["προστατεύουμε · ανακυκλώνω · κλιματική αλλαγή · επιτακτική ανάγκη · αν δεν ληφθούν μέτρα"],
      examples: PATTERNS_XI.filter((p) => p.cat === "çevre").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Kalıp ezber.", "Çevre destesi.", "Okuma r11b."],
      practice: ["6 çevre cümlesi."],
      check: ["Acil gereklilik + önlem kalıbı var mı?"],
      train: "pattern"
    },
    "c1-u7-t2": {
      goal: "YDS bağlaç setini aktif kullanmak.",
      theory: ["Παρά · Εκτός από · Ανεξάρτητα · Υπό την προϋπόθεση · Σε αντίθεση · Κατά συνέπεια · Εν ολίγοις"],
      examples: PATTERNS_XI.filter((p) => p.cat === "yds+").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Her bağlaca 2 örnek.", "Cloze/YDS turu.", "Kalıp + patternfill."],
      practice: ["TR→iskelet ezber 8 madde."],
      check: ["8/8 mi?"],
      train: "pattern"
    },
    "c1-u7-t3": {
      goal: "Çevre denemesinde kalıp yoğunluğu.",
      theory: ["Giriş–gerekçe–örnek–sonuç. En az 10 ileri kalıp."],
      examples: [{ el: "Είναι επιτακτική ανάγκη να…", tr: "acil" }, { el: "Εν ολίγοις…", tr: "kısaca" }],
      steps: ["350 kelime yaz.", "Kalıp işaretle.", "Sesli oku düzelt."],
      practice: ["Son cümleyi Εν ολίγοις ile bitir."],
      check: ["10 kalıp sayıldı mı?"],
      train: "pattern"
    }
  }
};

(function applyPatternsXI() {
  if (typeof PATTERNS !== "undefined") {
    PATTERNS.bank = PATTERNS.bank.concat(PATTERNS_XI);
  }
  if (typeof CONTENT !== "undefined" && EXTRAS11.vocab) {
    Object.keys(EXTRAS11.vocab).forEach((d) => {
      CONTENT.decks[d] = EXTRAS11.vocab[d];
    });
  }
  if (typeof EXTRAS2 !== "undefined") {
    if (EXTRAS11.examExtra) EXTRAS2.examBank = EXTRAS2.examBank.concat(EXTRAS11.examExtra);
    if (EXTRAS11.scrambleExtra) EXTRAS2.scramble = EXTRAS2.scramble.concat(EXTRAS11.scrambleExtra);
  }
  if (typeof TRAINERS !== "undefined" && EXTRAS11.dictationExtra) {
    TRAINERS.dictation = TRAINERS.dictation.concat(EXTRAS11.dictationExtra);
  }
  if (typeof DRILLS !== "undefined") {
    if (EXTRAS11.cloze) DRILLS.cloze = DRILLS.cloze.concat(EXTRAS11.cloze);
    if (EXTRAS11.reading) DRILLS.reading = DRILLS.reading.concat(EXTRAS11.reading);
  }
  if (typeof LESSONS !== "undefined" && EXTRAS11.newLessons) {
    Object.keys(EXTRAS11.newLessons).forEach((id) => {
      LESSONS[id] = EXTRAS11.newLessons[id];
    });
  }
  if (typeof CURRICULUM !== "undefined" && EXTRAS11.units) {
    Object.keys(EXTRAS11.units).forEach((levelId) => {
      const level = CURRICULUM.levels.find((l) => l.id === levelId);
      if (!level) return;
      EXTRAS11.units[levelId].forEach((u) => {
        if (!level.units.some((x) => x.id === u.id)) level.units.push(u);
      });
    });
  }
})();
