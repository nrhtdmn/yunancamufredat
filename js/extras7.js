/* Yedinci paket — yasaklar, ölçü, hava konuşması, ofis, yazma kalıpları */
const EXTRAS7 = {
  weatherTalk: [
    { tr: "Hava güzel", el: "Κάνει καλό καιρό", tip: "" },
    { tr: "Yağmur yağıyor", el: "Βρέχει", tip: "" },
    { tr: "Kar yağıyor", el: "Χιονίζει", tip: "" },
    { tr: "Rüzgarlı", el: "Φυσάει / Έχει αέρα", tip: "" },
    { tr: "Sıcak", el: "Κάνει ζέστη", tip: "" },
    { tr: "Soğuk", el: "Κάνει κρύο", tip: "" },
    { tr: "Bulutlu", el: "Είναι συννεφιά", tip: "" },
    { tr: "Güneşli", el: "Έχει ήλιο", tip: "" },
    { tr: "Yarın nasıl hava?", el: "Τι καιρό θα κάνει αύριο;", tip: "" },
    { tr: "Şemsiye al", el: "Πάρε ομπρέλα", tip: "" }
  ],

  measures: [
    { tr: "kilo", el: "κιλό", tip: "" },
    { tr: "gram", el: "γραμμάριο", tip: "" },
    { tr: "litre", el: "λίτρο", tip: "" },
    { tr: "metre", el: "μέτρο", tip: "" },
    { tr: "kilometre", el: "χιλιόμετρο", tip: "" },
    { tr: "biraz", el: "λίγο", tip: "" },
    { tr: "çok / epey", el: "πολύ / αρκετά", tip: "" },
    { tr: "yarım", el: "μισό", tip: "" },
    { tr: "bir dilim", el: "μια φέτα", tip: "" },
    { tr: "bir şişe", el: "ένα μπουκάλι", tip: "" }
  ],

  office: [
    { tr: "Toplantı var", el: "Έχουμε σύσκεψη", tip: "" },
    { tr: "E-posta gönder", el: "Στείλε ένα email / μήνυμα", tip: "" },
    { tr: "Son tarih Cuma", el: "Η προθεσμία είναι την Παρασκευή", tip: "" },
    { tr: "Dosyayı aç", el: "Άνοιξε το αρχείο", tip: "" },
    { tr: "Yazdırmaya gönder", el: "Στείλε το για εκτύπωση", tip: "" },
    { tr: "Müsait misin?", el: "Είσαι διαθέσιμος/η;", tip: "" },
    { tr: "Erteleyelim", el: "Ας το αναβάλουμε", tip: "" },
    { tr: "Onaylıyorum", el: "Το εγκρίνω / Συμφωνώ", tip: "" },
    { tr: "Sunum hazır", el: "Η παρουσίαση είναι έτοιμη", tip: "" },
    { tr: "Ara verelim", el: "Ας κάνουμε ένα διάλειμμα", tip: "" }
  ],

  writingFrames: [
    { tr: "Giriş: konuyu aç", el: "Το θέμα που θα εξετάσω είναι…", tip: "yazma" },
    { tr: "Gerekçe ekle", el: "Αυτό συμβαίνει επειδή…", tip: "" },
    { tr: "Örnek ver", el: "Για παράδειγμα, …", tip: "" },
    { tr: "Karşı görüş", el: "Από την άλλη, κάποιοι υποστηρίζουν ότι…", tip: "" },
    { tr: "Sonuç", el: "Συμπερασματικά, …", tip: "" },
    { tr: "Kişisel görüş", el: "Κατά τη γνώμη μου, …", tip: "" },
    { tr: "Vurgu", el: "Είναι σημαντικό να τονίσουμε ότι…", tip: "" },
    { tr: "Özet geçiş", el: "Με άλλα λόγια, …", tip: "" }
  ],

  quantityQ: [
    { tr: "Ne kadar sürer?", el: "Πόσο διαρκεί;", tip: "" },
    { tr: "Ne kadar uzak?", el: "Πόσο μακριά είναι;", tip: "" },
    { tr: "Kaç kişi?", el: "Πόσα άτομα;", tip: "" },
    { tr: "Ne kadar tutar?", el: "Πόσο κάνει / κοστίζει;", tip: "" },
    { tr: "Ne sıklıkla?", el: "Κάθε πόσο;", tip: "" },
    { tr: "Ne kadar kaldı?", el: "Πόσο ακόμα;", tip: "" },
    { tr: "Kaç dilim?", el: "Πόσες φέτες;", tip: "" },
    { tr: "Biraz daha?", el: "Λίγο ακόμα;", tip: "" }
  ],

  phrasesExtra: [
    { el: "Κάνει αφόρητη ζέστη σήμερα.", tr: "Bugün dayanılmaz sıcak." },
    { el: "Πάρε ομπρέλα, θα βρέξει.", tr: "Şemsiye al, yağmur yağacak." },
    { el: "Η προθεσμία είναι αύριο.", tr: "Son tarih yarın." },
    { el: "Ας κάνουμε ένα διάλειμμα.", tr: "Bir ara verelim." },
    { el: "Πόσο διαρκεί το μάθημα;", tr: "Ders ne kadar sürer?" },
    { el: "Θέλω μισό κιλό τυρί.", tr: "Yarım kilo peynir istiyorum." },
    { el: "Κατά τη γνώμη μου έχει δίκιο.", tr: "Bana göre haklı." },
    { el: "Με άλλα λόγια, πρέπει να διαβάσουμε περισσότερο.", tr: "Başka bir deyişle, daha çok okumalıyız." }
  ],

  scrambleExtra: [
    { words: ["Κάνει", "πολύ", "ζέστη", "σήμερα"], answer: "Κάνει πολύ ζέστη σήμερα", tr: "Bugün çok sıcak" },
    { words: ["Η", "προθεσμία", "είναι", "την", "Παρασκευή"], answer: "Η προθεσμία είναι την Παρασκευή", tr: "Son tarih Cuma" },
    { words: ["Πάρε", "ομπρέλα", "παρακαλώ"], answer: "Πάρε ομπρέλα παρακαλώ", tr: "Şemsiye al lütfen" },
    { words: ["Θέλω", "ένα", "κιλό", "μήλα"], answer: "Θέλω ένα κιλό μήλα", tr: "Bir kilo elma istiyorum" },
    { words: ["Ας", "το", "αναβάλουμε", "για", "αύριο"], answer: "Ας το αναβάλουμε για αύριο", tr: "Yarına erteleyelim" },
    { words: ["Κατά", "τη", "γνώμη", "μου", "έχει", "δίκιο"], answer: "Κατά τη γνώμη μου έχει δίκιο", tr: "Bana göre haklı" }
  ],

  dictationExtra: [
    "Κάνει κρύο και φυσάει.",
    "Θέλω μισό κιλό ψωμί.",
    "Η σύσκεψη ξεκινά στις δέκα.",
    "Πόσο διαρκεί η πτήση;",
    "Ας κάνουμε ένα διάλειμμα τώρα.",
    "Συμπερασματικά συμφωνώ μαζί σου.",
    "Πάρε ομπρέλα γιατί θα βρέξει.",
    "Η παρουσίαση είναι έτοιμη."
  ],

  tipsExtra: [
    "Hava: Κάνει ζέστη/κρύο · Βρέχει · Φυσάει — «είναι» ile karıştırma.",
    "Alışverişte ölçü: ένα κιλό, μισό κιλό, μια φέτα, ένα μπουκάλι.",
    "Ofiste: προθεσμία, σύσκεψη, αρχείο, διάλειμμα.",
    "Yazma iskeleti: giriş → gerekçe → örnek → karşı → sonuç.",
    "Πόσο… soruları: διαρκεί / μακριά / κάνει / άτομα.",
    "Με άλλα λόγια = yani / başka deyişle — paragraf geçişi.",
    "Ας + fiil: teklif (Ας φύγουμε).",
    "Hata günlüğüne hava ve ölçü kalıplarını ayrı tut."
  ],

  vocab: {
    kitchen: [
      { el: "μαχαίρι", tr: "bıçak", tip: "" },
      { el: "πιρούνι", tr: "çatal", tip: "" },
      { el: "κουτάλι", tr: "kaşık", tip: "" },
      { el: "πιάτο", tr: "tabak", tip: "" },
      { el: "ποτήρι", tr: "bardak", tip: "" },
      { el: "τηγάνι", tr: "tava", tip: "" },
      { el: "φούρνος", tr: "fırın", tip: "" },
      { el: "ψυγείο", tr: "buzdolabı", tip: "" }
    ],
    travel2: [
      { el: "διαβατήριο", tr: "pasaport", tip: "" },
      { el: "θεώρηση / βίζα", tr: "vize", tip: "" },
      { el: "πτήση", tr: "uçuş", tip: "" },
      { el: "αναχώρηση", tr: "kalkış", tip: "" },
      { el: "άφιξη", tr: "varış", tip: "" },
      { el: "πύλη", tr: "gate / kapı", tip: "" },
      { el: "αποσκευές", tr: "bagaj", tip: "" },
      { el: "ασφάλεια", tr: "güvenlik / sigorta", tip: "bağlam" }
    ],
    feelings2: [
      { el: "ανυπόμονος", tr: "sabırsız", tip: "" },
      { el: "ανακουφισμένος", tr: "rahatlamış", tip: "" },
      { el: "απογοητευμένος", tr: "hayal kırıklığına uğramış", tip: "" },
      { el: "ευγνώμων", tr: "minnettar", tip: "" },
      { el: "μοναχικός", tr: "yalnız", tip: "" },
      { el: "περήφανος", tr: "gururlu", tip: "" },
      { el: "ζαλισμένος", tr: "sersem / başı dönen", tip: "" },
      { el: "ήρεμος", tr: "sakin", tip: "" }
    ]
  },

  cloze: [
    { id: "c7a", text: "___ ζέστη σήμερα.", options: ["Κάνει", "Είναι μόνο λάθος", "Πάει", "Τρώει"], a: 0, why: "Κάνει ζέστη." },
    { id: "c7b", text: "Θέλω ___ κιλό τυρί.", options: ["μισό", "σύσκεψη", "πτήση", "ήρεμο"], a: 0, why: "μισό κιλό." },
    { id: "c7c", text: "Η ___ είναι την Παρασκευή.", options: ["προθεσμία", "ομπρέλα", "πιρούνι", "πύλη μόνο"], a: 0, why: "προθεσμία = son tarih." },
    { id: "c7d", text: "___ κάνουμε ένα διάλειμμα;", options: ["Ας", "Μην μόνο", "Έχω το", "Κιλό"], a: 0, why: "Ας = teklif." },
    { id: "c7e", text: "Πόσο ___ το μάθημα;", options: ["διαρκεί", "βρέχει", "φυσάει", "ζέστη"], a: 0, why: "διαρκεί = sürer." },
    { id: "c7f", text: "___ τη γνώμη μου…", options: ["Κατά", "Κάνει", "Πάρε", "Μισό"], a: 0, why: "Κατά τη γνώμη μου." },
    { id: "c7g", text: "Πάρε ___, θα βρέξει.", options: ["ομπρέλα", "προθεσμία", "σύσκεψη", "πιρούνι"], a: 0, why: "ομπρέλα." },
    { id: "c7h", text: "Με άλλα ___, πρέπει να διαβάσουμε.", options: ["λόγια", "κιλά", "ποτήρια", "τηγάνια"], a: 0, why: "Με άλλα λόγια." }
  ],

  reading: [
    {
      id: "r7a",
      title: "Καιρός",
      text: "Σήμερα κάνει κρύο και φυσάει. Η πρόγνωση λέει ότι αύριο θα βρέξει, γι' αυτό πάρε ομπρέλα. Το Σαββατοκύριακο ίσως έχει ήλιο.",
      q: "Γιατί πρέπει να πάρεις ομπρέλα;",
      options: ["Γιατί αύριο θα βρέξει", "Γιατί κάνει ζέστη", "Γιατί έχει σύσκεψη", "Γιατί θέλεις τυρί"],
      a: 0
    },
    {
      id: "r7b",
      title: "Στο γραφείο",
      text: "Η προθεσμία είναι την Παρασκευή και η παρουσίαση δεν είναι ακόμα έτοιμη. Ο Νίκος προτείνει να κάνουν ένα διάλειμμα και μετά να στείλουν το αρχείο για εκτύπωση.",
      q: "Τι προτείνει ο Νίκος;",
      options: ["Διάλειμμα και μετά εκτύπωση", "Να φύγουν διακοπές", "Να αγοράσουν ομπρέλα", "Να κλείσουν την τράπεζα"],
      a: 0
    },
    {
      id: "r7c",
      title: "Γνώμη",
      text: "Κατά τη γνώμη μου, πρέπει να διαβάζουμε λίγο κάθε μέρα. Από την άλλη, πολλοί λένε ότι δεν έχουν χρόνο. Συμπερασματικά, καλύτερο είναι ένα μικρό αλλά σταθερό πρόγραμμα.",
      q: "Ποιο είναι το συμπέρασμα;",
      options: ["Μικρό σταθερό πρόγραμμα", "Καθόλου διάβασμα", "Μόνο Σαββατοκύριακο", "Να σταματήσουν τα ελληνικά"],
      a: 0
    }
  ],

  examExtra: [
    { q: "Κάνει ζέστη doğru mu?", options: ["Evet, hava kalıbı", "Hayır, sadece Είναι ζέστη zorunlu", "Fiil değil", "Çoğul"], a: 0, kind: "grammar" },
    { q: "προθεσμία?", options: ["şemsiye", "son tarih", "çatal", "uçuş"], a: 1, kind: "vocab" },
    { q: "Ας φύγουμε?", options: ["Yasak", "Teklif/öneri", "Geçmiş zorunlu", "Madde"], a: 1, kind: "grammar" },
    { q: "Με άλλα λόγια?", options: ["aksine", "yani / başka deyişle", "asla", "kilo"], a: 1, kind: "vocab" },
    { q: "μισό κιλό?", options: ["iki kilo", "yarım kilo", "litre", "metre"], a: 1, kind: "vocab" },
    { q: "Πόσο διαρκεί;", options: ["Ne kadar sürer?", "Nerede?", "Kim?", "Neden yağmur?"], a: 0, kind: "vocab" },
    { q: "σύσκεψη?", options: ["toplantı", "bagaj", "tava", "gate"], a: 0, kind: "vocab" },
    { q: "Yazıda Συμπερασματικά nerede?", options: ["Sadece giriş", "Sonuç paragrafı", "Başlık zorunlu", "Asla"], a: 1, kind: "strategy" }
  ],

  badgesExtra: [
    { id: "weather10", title: "Meteorolog", desc: "10 hava turu", check: (s) => ((s.trainerStats || {}).weather || 0) >= 10 },
    { id: "office8", title: "Ofis", desc: "8 ofis turu", check: (s) => ((s.trainerStats || {}).office || 0) >= 8 },
    { id: "writeframe8", title: "Yazı iskeleti", desc: "8 yazma kalıbı", check: (s) => ((s.trainerStats || {}).writeframe || 0) >= 8 },
    { id: "lessons20", title: "20 ders", desc: "20 müfredat görevi", check: (s) => Object.keys(s.completed || {}).length >= 20 },
    { id: "streak30", title: "1 ay seri", desc: "30 gün seri", check: (s) => (s.streak || 0) >= 30 }
  ],

  units: {
    a1: [{
      id: "a1-u7", title: "Hava & Ölçü", focus: "καιρός, κιλό, πόσο…",
      tasks: [
        { id: "a1-u7-t1", title: "Hava durumu konuşması", detail: "Κάνει ζέστη/κρύο, βρέχει, φυσάει. 10 kalıp.", minutes: 20, type: "speak" },
        { id: "a1-u7-t2", title: "Alışveriş ölçüleri", detail: "κιλό, λίτρο, φέτα, μπουκάλι. Sipariş cümleleri.", minutes: 20, type: "practice" },
        { id: "a1-u7-t3", title: "Πόσο… soruları", detail: "διαρκεί, μακριά, κάνει, άτομα. Mini diyalog.", minutes: 20, type: "practice" }
      ]
    }],
    a2: [{
      id: "a2-u6", title: "Ofis Yunancası", focus: "προθεσμία, σύσκεψη, email",
      tasks: [
        { id: "a2-u6-t1", title: "Ofis kalıpları", detail: "Toplantı, son tarih, dosya, ara. 10 cümle.", minutes: 25, type: "vocab" },
        { id: "a2-u6-t2", title: "İş e-postası", detail: "120 kelimelik kısa resmi mail (rica + tarih).", minutes: 30, type: "write" },
        { id: "a2-u6-t3", title: "Toplantı rolü", detail: "Ας… / συμφωνώ / αναβάλουμε — 2 dk kaydet.", minutes: 20, type: "speak" }
      ]
    }],
    b2: [{
      id: "b2-u6", title: "Yazma İskeleti", focus: "giriş–gerekçe–örnek–sonuç",
      tasks: [
        { id: "b2-u6-t1", title: "Kalıp iskeleti ezberi", detail: "8 yazma çerçevesini cümleyle ezberle.", minutes: 25, type: "study" },
        { id: "b2-u6-t2", title: "250 kelimelik deneme", detail: "İskeleti kullanarak bir konuda yaz.", minutes: 45, type: "write" },
        { id: "b2-u6-t3", title: "Kendi yazını düzenle", detail: "Bağlaç çeşitliliği ve tekrar kırpma.", minutes: 25, type: "review" }
      ]
    }]
  },

  newLessons: {
    "a1-u7-t1": { goal: "Hava durumunu sorup anlatabilmek.", theory: ["Κάνει ζέστη / Κάνει κρύο. Βρέχει, χιονίζει, φυσάει.", "Τι καιρό κάνει σήμερα;"], examples: [{ el: "Κάνει καλό καιρό.", tr: "Hava güzel." }, { el: "Βρέχει.", tr: "Yağmur yağıyor." }, { el: "Πάρε ομπρέλα.", tr: "Şemsiye al." }, { el: "Τι καιρό θα κάνει αύριο;", tr: "Yarın nasıl hava?" }], steps: ["Hava antrenmanı 2 tur.", "Bugün/yarın için 6 cümle.", "Kaydet."], practice: ["1 dk hava raporu."], check: ["Κάνει ζέστη doğru mu?"], train: "weather" },
    "a1-u7-t2": { goal: "Ölçü ile sipariş vermek.", theory: ["ένα κιλό, μισό κιλό, ένα λίτρο, μια φέτα, ένα μπουκάλι."], examples: [{ el: "Θέλω ένα κιλό μήλα.", tr: "Bir kilo elma." }, { el: "Μισό κιλό τυρί, παρακαλώ.", tr: "Yarım kilo peynir." }, { el: "Ένα μπουκάλι νερό.", tr: "Bir şişe su." }], steps: ["Ölçü antrenmanı.", "10 sipariş cümlesi."], practice: ["Alışveriş kartları."], check: ["μισό / ένα net mi?"], train: "measure" },
    "a1-u7-t3": { goal: "Πόσο… soru ailesi.", theory: ["Πόσο διαρκεί; Πόσο μακριά; Πόσο κάνει; Πόσα άτομα;"], examples: [{ el: "Πόσο διαρκεί το μάθημα;", tr: "Ders ne kadar sürer?" }, { el: "Πόσο μακριά είναι;", tr: "Ne kadar uzak?" }, { el: "Πόσα άτομα;", tr: "Kaç kişi?" }], steps: ["Miktar soru antrenmanı.", "8 satır diyalog."], practice: ["Her tipe 1 cevap."], check: ["6 soru ezbere mi?"], train: "howmuch" },
    "a2-u6-t1": { goal: "Ofis kalıpları.", theory: ["προθεσμία, σύσκεψη, αρχείο, διάλειμμα, αναβάλλω."], examples: [{ el: "Έχουμε σύσκεψη στις δέκα.", tr: "Saat 10’da toplantı." }, { el: "Η προθεσμία είναι την Παρασκευή.", tr: "Son tarih Cuma." }, { el: "Ας κάνουμε ένα διάλειμμα.", tr: "Ara verelim." }], steps: ["Ofis antrenmanı.", "10 cümle."], practice: ["1 dk monolog."], check: ["5 kalıp otomatik mi?"], train: "office" },
    "a2-u6-t2": { goal: "Kısa iş e-postası (~120 kelime).", theory: ["Αγαπητέ/ή… · Θα ήθελα… · Με εκτίμηση."], examples: [{ el: "Θα ήθελα να σας ενημερώσω ότι…", tr: "Bilgilendirmek isterim…" }, { el: "Παρακαλώ επιβεβαιώστε μέχρι την Πέμπτη.", tr: "Perşembe’ye kadar onaylayın." }], steps: ["120 kelime mail yaz.", "Nazik üslup kontrol."], practice: ["Daha resmi versiyon."], check: ["Tarih+rica+kapanış?"], train: "polite" },
    "a2-u6-t3": { goal: "Toplantı rolü: teklif/onay/erteleme.", theory: ["Ας… Συμφωνώ. Ας το αναβάλουμε."], examples: [{ el: "Ας ξεκινήσουμε.", tr: "Başlayalım." }, { el: "Συμφωνώ.", tr: "Katılıyorum." }, { el: "Ας το αναβάλουμε για αύριο.", tr: "Yarına erteleyelim." }], steps: ["Ofis antrenmanı.", "2 dk rol kaydı."], practice: ["3 teklif + 2 onay."], check: ["Kaba emir yok mu?"], train: "office" },
    "b2-u6-t1": { goal: "Yazma iskeleti ezberi.", theory: ["Giriş → gerekçe → örnek → karşı → sonuç."], examples: [{ el: "Το θέμα που θα εξετάσω είναι…", tr: "Konu…" }, { el: "Για παράδειγμα…", tr: "Örneğin…" }, { el: "Από την άλλη…", tr: "Öte yandan…" }, { el: "Συμπερασματικά…", tr: "Sonuç olarak…" }], steps: ["Yazma kalıbı antrenmanı.", "8 kalıp ezber."], practice: ["1 dk sesli iskelet."], check: ["8/8 var mı?"], train: "writeframe" },
    "b2-u6-t2": { goal: "250 kelimelik deneme (iskeletli).", theory: ["Her paragraf bir işlev; ≥8 kalıp."], examples: [{ el: "Είναι σημαντικό να τονίσουμε ότι…", tr: "Vurgulamak önemli…" }], steps: ["250 kelime yaz.", "Kalıpları say."], practice: ["Giriş-sonuç sesli oku."], check: ["Yapı + sayı tamam mı?"], train: "write" },
    "b2-u6-t3": { goal: "Kendi yazını düzenle.", theory: ["Tekrar kırp; bağlaç çeşitlendir."], examples: [], steps: ["5 tekrar kırp.", "3 bağlaç yükselt.", "Hata günlüğü 2 not."], practice: ["Önce/sonra karşılaştır."], check: ["Daha akıcı mı?"] }
  },

  lessonPatches: {
    "a0-u1-t1": {
      practiceExtra: [
        "Karışık: Β=?, Η=?, Ρ=?, Χ=? seslerini Türkçe not et.",
        "10 harfi komşuna/kendine soru-cevap yap."
      ],
      examplesExtra: [
        { el: "Αθήνα", tr: "Atina — Α ile başlar" },
        { el: "Έλληνες", tr: "Yunanlar — Ε/Η farkına bak" }
      ]
    },
    "a1-u3-t1": {
      theoryExtra: [
        "Olumsuz: Δεν γράφω. Soru: Γράφεις; / Τι γράφεις;",
        "Nesne ekle: Γράφω ένα μήνυμα στον φίλο μου."
      ],
      examplesExtra: [
        { el: "Δεν καταλαβαίνω ακόμα.", tr: "Henüz anlamıyorum." },
        { el: "Μαθαίνω ελληνικά κάθε μέρα.", tr: "Her gün Yunanca öğreniyorum." }
      ]
    },
    "a2-u1-t1": {
      theoryExtra: [
        "Soru: Τι έκανες χθες; Cevap aorist ister.",
        "Zaman ifadeleri: χθες, πριν δύο μέρες, το 2020…"
      ],
      examplesExtra: [
        { el: "Πριν μια εβδομάδα τελείωσα το βιβλίο.", tr: "Bir hafta önce kitabı bitirdim." }
      ]
    },
    "b1-u1-t2": {
      theoryExtra: [
        "İstek fiillerinden sonra sık να gelir: θέλω, μπορώ, πρέπει, προτιμώ, ελπίζω…",
        "Για να + subjunctive = amaç."
      ]
    },
    "b2-u3-t1": {
      practiceExtra: [
        "Her paragrafta konu cümlesini underline et.",
        "Şıkları okumadan kendi cümlenle özetle."
      ]
    },
    "c1-u3-t1": {
      theoryExtra: [
        "Cloze’da boşluk bağlaçsa önce ilişki türü (karşıt/neden/ekleme).",
        "Kolokasyon: κάνω + isim kalıplarını hatırla."
      ]
    }
  }
};

(function applyExtras7() {
  if (typeof CONTENT !== "undefined" && EXTRAS7.vocab) {
    Object.keys(EXTRAS7.vocab).forEach((deck) => {
      CONTENT.decks[deck] = EXTRAS7.vocab[deck];
    });
  }
  if (typeof TRAINERS !== "undefined") {
    if (EXTRAS7.tipsExtra) TRAINERS.tips = TRAINERS.tips.concat(EXTRAS7.tipsExtra);
    if (EXTRAS7.badgesExtra) TRAINERS.badges = TRAINERS.badges.concat(EXTRAS7.badgesExtra);
    if (EXTRAS7.dictationExtra) TRAINERS.dictation = TRAINERS.dictation.concat(EXTRAS7.dictationExtra);
  }
  if (typeof EXTRAS2 !== "undefined") {
    if (EXTRAS7.scrambleExtra) EXTRAS2.scramble = EXTRAS2.scramble.concat(EXTRAS7.scrambleExtra);
    if (EXTRAS7.examExtra) EXTRAS2.examBank = EXTRAS2.examBank.concat(EXTRAS7.examExtra);
  }
  if (typeof EXTRAS4 !== "undefined" && EXTRAS7.phrasesExtra) {
    EXTRAS4.phrases = EXTRAS4.phrases.concat(EXTRAS7.phrasesExtra);
  }
  if (typeof DRILLS !== "undefined") {
    if (EXTRAS7.cloze) DRILLS.cloze = DRILLS.cloze.concat(EXTRAS7.cloze);
    if (EXTRAS7.reading) DRILLS.reading = DRILLS.reading.concat(EXTRAS7.reading);
  }
  if (typeof LESSONS !== "undefined" && EXTRAS7.lessonPatches) {
    Object.keys(EXTRAS7.lessonPatches).forEach((id) => {
      const L = LESSONS[id];
      const P = EXTRAS7.lessonPatches[id];
      if (!L) return;
      if (P.theoryExtra) L.theory = (L.theory || []).concat(P.theoryExtra);
      if (P.examplesExtra) L.examples = (L.examples || []).concat(P.examplesExtra);
      if (P.practiceExtra) L.practice = (L.practice || []).concat(P.practiceExtra);
      if (P.stepsExtra) L.steps = (L.steps || []).concat(P.stepsExtra);
    });
  }
  if (typeof LESSONS !== "undefined" && EXTRAS7.newLessons) {
    Object.keys(EXTRAS7.newLessons).forEach((id) => {
      LESSONS[id] = EXTRAS7.newLessons[id];
    });
  }
  if (typeof CURRICULUM !== "undefined" && EXTRAS7.units) {
    Object.keys(EXTRAS7.units).forEach((levelId) => {
      const level = CURRICULUM.levels.find((l) => l.id === levelId);
      if (!level) return;
      EXTRAS7.units[levelId].forEach((u) => {
        if (!level.units.some((x) => x.id === u.id)) level.units.push(u);
      });
    });
  }
})();
