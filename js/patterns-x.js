/* Kalıp & içerik paketi X — spor, havaalanı, randevu, şikayet, C2 üslup */
const PATTERNS_X = [
  // spor
  { cat: "spor", level: "a2", frame: "Κάνω γυμναστική / τρέξιμο", eg: "Κάνω γυμναστική τρεις φορές την εβδομάδα.", tr: "Spor / koşu yaparım" },
  { cat: "spor", level: "a2", frame: "Παίζω + spor", eg: "Παίζω ποδόσφαιρο.", tr: "… oynarım" },
  { cat: "spor", level: "b1", frame: "Κέρδισε / Έχασε η ομάδα", eg: "Η ομάδα μας κέρδισε χθες.", tr: "Takım kazandı/kaybetti" },
  { cat: "spor", level: "b1", frame: "Είμαι σε φόρμα / εκτός φόρμας", eg: "Δεν είμαι σε φόρμα τελευταία.", tr: "Formdayım / formda değilim" },

  // havaalanı / otel
  { cat: "otel", level: "a2", frame: "Έχω κράτηση για + gece", eg: "Έχω κράτηση για δύο βράδια.", tr: "… gecelik rezervasyonum var" },
  { cat: "otel", level: "a2", frame: "Το δωμάτιο είναι στον … όροφο", eg: "Το δωμάτιο είναι στον τρίτο όροφο.", tr: "Oda … katta" },
  { cat: "otel", level: "a2", frame: "Τι ώρα είναι το πρωινό / check-out;", eg: "Τι ώρα είναι το check-out;", tr: "Kahvaltı / çıkış saati?" },
  { cat: "otel", level: "b1", frame: "Μπορώ να έχω επιπλέον πετσέτες;", eg: "Μπορώ να έχω επιπλέον πετσέτες;", tr: "Ekstra havlu alabilir miyim?" },
  { cat: "otel", level: "b1", frame: "Υπάρχει Wi-Fi / ανελκυστήρας;", eg: "Υπάρχει Wi-Fi στο δωμάτιο;", tr: "Wi-Fi / asansör var mı?" },

  // randevu / sağlık +
  { cat: "randevu", level: "a2", frame: "Θέλω να κλείσω ραντεβού", eg: "Θέλω να κλείσω ραντεβού.", tr: "Randevu almak istiyorum" },
  { cat: "randevu", level: "a2", frame: "Είστε διαθέσιμος/η στις…;", eg: "Είστε διαθέσιμη στις πέντε;", tr: "…da müsait misiniz?" },
  { cat: "randevu", level: "b1", frame: "Αναγκάζομαι να ακυρώσω", eg: "Αναγκάζομαι να ακυρώσω το ραντεβού.", tr: "İptal etmek zorundayım" },
  { cat: "randevu", level: "b1", frame: "Μπορούμε να το μεταθέσουμε;", eg: "Μπορούμε να το μεταθέσουμε για αύριο;", tr: "Erteleyebilir miyiz?" },

  // şikayet / problem
  { cat: "şikayet", level: "a2", frame: "Έχω ένα πρόβλημα με…", eg: "Έχω ένα πρόβλημα με το δωμάτιο.", tr: "… ile sorunum var" },
  { cat: "şikayet", level: "b1", frame: "Δεν λειτουργεί το…", eg: "Δεν λειτουργεί το κλιματιστικό.", tr: "… çalışmıyor" },
  { cat: "şikayet", level: "b1", frame: "Θα μπορούσατε να το φτιάξετε;", eg: "Θα μπορούσατε να το φτιάξετε;", tr: "Düzeltebilir misiniz?" },
  { cat: "şikayet", level: "b2", frame: "Δεν είμαι ικανοποιημένος/η με…", eg: "Δεν είμαι ικανοποιημένος με την εξυπηρέτηση.", tr: "…den memnun değilim" },
  { cat: "şikayet", level: "b2", frame: "Ζητάω αντικατάσταση / επιστροφή", eg: "Ζητάω επιστροφή χρημάτων.", tr: "Değişim / iade istiyorum" },

  // yol tarifi +
  { cat: "yol", level: "a2", frame: "Είναι πέντε λεπτά με τα πόδια", eg: "Είναι πέντε λεπτά με τα πόδια.", tr: "Yürüyerek 5 dk" },
  { cat: "yol", level: "a2", frame: "Πέρασε το φανάρι και…", eg: "Πέρασε το φανάρι και στρίψε αριστερά.", tr: "Işığı geç ve …" },
  { cat: "yol", level: "b1", frame: "Θα το βρεις εύκολα", eg: "Θα το βρεις εύκολα.", tr: "Kolay bulursun" },
  { cat: "yol", level: "b1", frame: "Αν χαθείς, πάρε με τηλέφωνο", eg: "Αν χαθείς, πάρε με τηλέφωνο.", tr: "Kaybolursan ara" },

  // duygu / ilişki
  { cat: "ilişki", level: "b1", frame: "Τα πάμε καλά", eg: "Τα πάμε καλά με τους συναδέλφους.", tr: "İyi anlaşıyoruz" },
  { cat: "ilişki", level: "b1", frame: "Τα βρήκαμε", eg: "Επιτέλους τα βρήκαμε.", tr: "Anlaştık" },
  { cat: "ilişki", level: "b1", frame: "Μάλωσα με…", eg: "Μάλωσα με τον φίλο μου.", tr: "… ile kavga ettim" },
  { cat: "ilişki", level: "b2", frame: "Κρατάω επαφή με…", eg: "Κρατάω επαφή με τους συμμαθητές μου.", tr: "… ile irtibatı sürdürüyorum" },

  // C2 üslup
  { cat: "c2", level: "c2", frame: "Είναι αξιοσημείωτο ότι…", eg: "Είναι αξιοσημείωτο ότι αυξήθηκαν τα ποσοστά.", tr: "Dikkate değer ki" },
  { cat: "c2", level: "c2", frame: "Χωρίς να θέλω να υπερβάλω…", eg: "Χωρίς να θέλω να υπερβάλω, ήταν εξαιρετικό.", tr: "Abartmak istemeden…" },
  { cat: "c2", level: "c2", frame: "Το ζήτημα έγκειται στο ότι…", eg: "Το ζήτημα έγκειται στο ότι λείπει χρόνος.", tr: "Mesele şudur ki" },
  { cat: "c2", level: "c2", frame: "Με κάθε επιφύλαξη…", eg: "Με κάθε επιφύλαξη, θα έλεγα ότι…", tr: "Her türlü çekinceyle…" },
  { cat: "c2", level: "c2", frame: "Ας μην ξεχνάμε ότι…", eg: "Ας μην ξεχνάμε ότι η συνήθεια μετράει.", tr: "Unutmayalım ki" },
  { cat: "c2", level: "c2", frame: "Η ουσία είναι ότι…", eg: "Η ουσία είναι ότι πρέπει να συνεχίσουμε.", tr: "Öz dilersen…" },

  // alışveriş +
  { cat: "alışveriş+", level: "a2", frame: "Ψάχνω κάτι για…", eg: "Ψάχνω κάτι για δώρο.", tr: "… için bir şey arıyorum" },
  { cat: "alışveriş+", level: "a2", frame: "Μου πάει / Δεν μου πάει", eg: "Μου πάει αυτό το χρώμα;", tr: "Yakışıyor mu?" },
  { cat: "alışveriş+", level: "b1", frame: "Έχετε αυτό σε άλλο μέγεθος;", eg: "Έχετε αυτό σε μικρότερο μέγεθος;", tr: "Bunu başka bedende var mı?" },
  { cat: "alışveriş+", level: "b1", frame: "Κάνει έκπτωση αν…;", eg: "Κάνει έκπτωση αν πάρω δύο;", tr: "… ise indirim var mı?" },

  // duyuru / haber dili
  { cat: "haber", level: "b2", frame: "Ανακοινώθηκε ότι…", eg: "Ανακοινώθηκε ότι θα γίνουν έργα.", tr: "Duyuruldu ki" },
  { cat: "haber", level: "b2", frame: "Σύμφωνα με πληροφορίες…", eg: "Σύμφωνα με πληροφορίες…", tr: "Bilgilere göre" },
  { cat: "haber", level: "c1", frame: "Η συζήτηση επικεντρώνεται σε…", eg: "Η συζήτηση επικεντρώνεται στην παιδεία.", tr: "Tartışma …ye odaklanıyor" },
  { cat: "haber", level: "c1", frame: "Προκαλεί ανησυχία το γεγονός ότι…", eg: "Προκαλεί ανησυχία το γεγονός ότι…", tr: "… endişe yaratıyor" },

  // motivasyon / çalışma
  { cat: "motivasyon", level: "a2", frame: "Μην τα παρατάς", eg: "Μην τα παρατάς!", tr: "Pes etme" },
  { cat: "motivasyon", level: "b1", frame: "Βήμα βήμα", eg: "Πήγαινε βήμα βήμα.", tr: "Adım adım" },
  { cat: "motivasyon", level: "b1", frame: "Καλύτερα αργά παρά ποτέ", eg: "Καλύτερα αργά παρά ποτέ.", tr: "Geç olsun güç olmasın" },
  { cat: "motivasyon", level: "b2", frame: "Η συνέπεια μετράει περισσότερο από…", eg: "Η συνέπεια μετράει περισσότερο από την τελειότητα.", tr: "Süreklilik …den önemlidir" }
];

const EXTRAS10 = {
  vocab: {
    airport: [
      { el: "έλεγχος διαβατηρίων", tr: "pasaport kontrolü", tip: "" },
      { el: "πύλη", tr: "gate", tip: "" },
      { el: "χειραποσκευή", tr: "el bagajı", tip: "" },
      { el: "αναχώρηση", tr: "kalkış", tip: "" },
      { el: "άφιξη", tr: "varış", tip: "" },
      { el: "καθυστέρηση", tr: "gecikme", tip: "" },
      { el: "επιβίβαση", tr: "boarding", tip: "" },
      { el: "θέση στο παράθυρο", tr: "cam kenarı koltuk", tip: "" }
    ],
    emotions3: [
      { el: "ανασφαλής", tr: "güvensiz", tip: "" },
      { el: "ενθουσιώδης", tr: "hevesli", tip: "" },
      { el: "αμήχανος", tr: "garip / mahcup", tip: "" },
      { el: "ευτυχισμένος", tr: "mutlu", tip: "" },
      { el: "αποφασισμένος", tr: "kararlı", tip: "" },
      { el: "κουρασμένος αλλά ικανοποιημένος", tr: "yorgun ama tatmin", tip: "" },
      { el: "αγχωμένος", tr: "stresli", tip: "" },
      { el: "ήρεμος", tr: "sakin", tip: "" }
    ],
    verbsHigh: [
      { el: "καταφέρνω", tr: "başarmak", tip: "" },
      { el: "αποφεύγω", tr: "kaçınmak", tip: "" },
      { el: "προτείνω", tr: "önermek", tip: "" },
      { el: "υποστηρίζω", tr: "desteklemek", tip: "" },
      { el: "αμφιβάλλω", tr: "şüphe etmek", tip: "" },
      { el: "υποθέτω", tr: "varsaymak", tip: "" },
      { el: "επιμένω", tr: "ısrar etmek", tip: "" },
      { el: "αρνούμαι", tr: "reddetmek", tip: "" }
    ]
  },

  cloze: [
    { id: "c10a", text: "Θέλω να κλείσω ___.", options: ["ραντεβού", "πύλη μόνο", "ποδόσφαιρο", "έκθεση μόνο"], a: 0, why: "ραντεβού." },
    { id: "c10b", text: "Δεν ___ το κλιματιστικό.", options: ["λειτουργεί", "τρέχει ποδόσφαιρο", "κλείνει ραντεβού", "κερδίζει"], a: 0, why: "λειτουργεί = çalışıyor." },
    { id: "c10c", text: "Έχω κράτηση για δύο ___.", options: ["βράδια", "πύλες", "ομάδες", "ιούς"], a: 0, why: "βράδια = gece." },
    { id: "c10d", text: "___ τα παρατάς!", options: ["Μην", "Θα", "Έχω", "Κάνει"], a: 0, why: "Μην τα παρατάς." },
    { id: "c10e", text: "Ανακοινώθηκε ___ θα γίνουν έργα.", options: ["ότι", "αν μόνο", "χωρίς", "πάνω"], a: 0, why: "ότι." },
    { id: "c10f", text: "Είναι αξιοσημείωτο ___ …", options: ["ότι", "ποδόσφαιρο", "πετσέτες", "φόρμα"], a: 0, why: "ότι." }
  ],

  reading: [
    {
      id: "r10a",
      title: "Ξενοδοχείο",
      text: "Η Ελένη έχει κράτηση για δύο βράδια. Το δωμάτιο είναι στον τέταρτο όροφο αλλά ο ανελκυστήρας δεν λειτουργεί. Ζήτησε επιπλέον πετσέτες και ρώτησε τι ώρα είναι το πρωινό.",
      q: "Ποιο είναι το πρόβλημα;",
      options: ["Ο ανελκυστήρας δεν λειτουργεί", "Δεν έχει κράτηση", "Έχασε η ομάδα", "Δεν πεινάει"],
      a: 0
    },
    {
      id: "r10b",
      title: "Κίνητρο",
      text: "Ο προπονητής είπε στους παίκτες: «Μην τα παρατάτε. Πηγαίνετε βήμα βήμα. Η συνέπεια μετράει περισσότερο από την τελειότητα.»",
      q: "Τι τονίζει ο προπονητής;",
      options: ["Τη συνέπεια", "Μόνο τη νίκη χωρίς προσπάθεια", "Να ακυρώσουν το ραντεβού", "Να αλλάξουν ξενοδοχείο"],
      a: 0
    }
  ],

  examExtra: [
    { q: "κλείνω ραντεβού?", options: ["randevu almak", "gol atmak", "ışık açmak", "iade"], a: 0, kind: "vocab" },
    { q: "Δεν λειτουργεί?", options: ["Çalışmıyor", "Kazandı", "Rezervasyon", "Formda"], a: 0, kind: "vocab" },
    { q: "Μην τα παρατάς?", options: ["Pes etme", "Ertele", "Öde", "Uç"], a: 0, kind: "vocab" },
    { q: "Είναι αξιοσημείωτο ότι… seviyesi?", options: ["A0 selam", "C2/akademik üslup", "Sadece emir", "Saat"], a: 1, kind: "strategy" },
    { q: "επιστροφή χρημάτων?", options: ["para iadesi", "boarding", "antrenman", "kavga"], a: 0, kind: "vocab" },
    { q: "Βήμα βήμα?", options: ["adım adım", "hemen asla", "en iyi", "gate"], a: 0, kind: "vocab" }
  ],

  scrambleExtra: [
    { words: ["Θέλω", "να", "κλείσω", "ραντεβού"], answer: "Θέλω να κλείσω ραντεβού", tr: "Randevu almak istiyorum" },
    { words: ["Δεν", "λειτουργεί", "το", "κλιματιστικό"], answer: "Δεν λειτουργεί το κλιματιστικό", tr: "Klima çalışmıyor" },
    { words: ["Μην", "τα", "παρατάς"], answer: "Μην τα παρατάς", tr: "Pes etme" },
    { words: ["Έχω", "κράτηση", "για", "δύο", "βράδια"], answer: "Έχω κράτηση για δύο βράδια", tr: "İki gecelik rezervasyonum var" }
  ],

  dictationExtra: [
    "Θέλω να κλείσω ραντεβού για αύριο.",
    "Δεν λειτουργεί το ανελκυστήρα.",
    "Μην τα παρατάς, πήγαινε βήμα βήμα.",
    "Έχω κράτηση στο όνομα Μαρία.",
    "Ζητάω επιστροφή χρημάτων.",
    "Είναι αξιοσημείωτο ότι βελτιώθηκες."
  ],

  units: {
    a2: [{
      id: "a2-u10", title: "Otel & Randevu", focus: "κράτηση, ραντεβού, πρόβλημα",
      tasks: [
        { id: "a2-u10-t1", title: "Otel kalıpları", detail: "Rezervasyon, kat, check-out, Wi-Fi.", minutes: 20, type: "study" },
        { id: "a2-u10-t2", title: "Randevu al / ertele", detail: "Κλείνω / ακυρώνω / μεταθέτω.", minutes: 20, type: "practice" },
        { id: "a2-u10-t3", title: "Şikayet rolü", detail: "Δεν λειτουργεί… 2 dk kaydet.", minutes: 20, type: "speak" }
      ]
    }],
    b2: [{
      id: "b2-u8", title: "Haber & Üslup", focus: "ανακοινώθηκε, αξιοσημείωτο",
      tasks: [
        { id: "b2-u8-t1", title: "Haber dili kalıpları", detail: "Ανακοινώθηκε ότι… Σύμφωνα με…", minutes: 25, type: "study" },
        { id: "b2-u8-t2", title: "C2 üslup denemesi", detail: "5 ileri kalıpla kısa paragraf.", minutes: 30, type: "write" },
        { id: "b2-u8-t3", title: "Kalıp + okuma", detail: "Okuma setinde kalıp avı.", minutes: 25, type: "read" }
      ]
    }],
    c2: [{
      id: "c2-u4", title: "C2 Kalıp Cila", focus: "έγκειται, επιφύλαξη, ουσία",
      tasks: [
        { id: "c2-u4-t1", title: "C2 iskelet bankası", detail: "6 C2 kalıbını ezber + örnek.", minutes: 30, type: "study" },
        { id: "c2-u4-t2", title: "Üslup yükseltme", detail: "Eski B2 yazını C2 kalıplarla yeniden yaz.", minutes: 40, type: "write" },
        { id: "c2-u4-t3", title: "Sözlü nüans", detail: "3 dk: çekince + vurgu kalıpları.", minutes: 25, type: "speak" }
      ]
    }]
  },

  newLessons: {
    "a2-u10-t1": {
      goal: "Otelde temel işleri kalıpla çözmek.",
      theory: ["Έχω κράτηση… · όροφος · πρωινό/check-out · Wi-Fi · πετσέτες."],
      examples: PATTERNS_X.filter((p) => p.cat === "otel").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Kalıp antrenmanı.", "8 otel cümlesi.", "Otel destesi varsa kart."],
      practice: ["Resepsiyon rolü 1 dk."],
      check: ["4 otel kalıbı otomatik mi?"],
      train: "pattern"
    },
    "a2-u10-t2": {
      goal: "Randevu almak, iptal, ertelemek.",
      theory: ["κλείνω ραντεβού · ακυρώνω · μεταθέτω · Είστε διαθέσιμος;"],
      examples: PATTERNS_X.filter((p) => p.cat === "randevu").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Kalıp antrenmanı.", "Mini diyalog yaz.", "Telefon antrenmanı."],
      practice: ["3 senaryo: al / iptal / ertele."],
      check: ["Üç işlem de var mı?"],
      train: "pattern"
    },
    "a2-u10-t3": {
      goal: "Nazik şikayet kalıpları.",
      theory: ["Έχω πρόβλημα με… Δεν λειτουργεί… Θα μπορούσατε…"],
      examples: PATTERNS_X.filter((p) => p.cat === "şikayet").slice(0, 4).map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["2 dk şikayet rolü.", "Nazik üslup koru.", "Kalıp antrenmanı."],
      practice: ["Aynı şikayeti daha resmi yaz."],
      check: ["Kaba emir kullandın mı?"],
      train: "pattern"
    },
    "b2-u8-t1": {
      goal: "Haber/duyuru kalıplarını tanımak.",
      theory: ["Ανακοινώθηκε ότι… Σύμφωνα με πληροφορίες… επικεντρώνεται…"],
      examples: PATTERNS_X.filter((p) => p.cat === "haber").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Kalıp 2 tur.", "1 sahte haber paragrafı yaz.", "Okuma seti."],
      practice: ["3 kalıbı ezbere."],
      check: ["Haber üslubu hissediliyor mu?"],
      train: "pattern"
    },
    "b2-u8-t2": {
      goal: "C2’ye yaklaşan kısa üslup denemesi.",
      theory: ["Αξιοσημείωτο / έγκειται / ουσία — abartmadan kullan."],
      examples: PATTERNS_X.filter((p) => p.cat === "c2").slice(0, 4).map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["150–200 kelime.", "En az 5 ileri kalıp.", "Sesli oku."],
      practice: ["Bir cümleyi sadeleştir, birini yükselt."],
      check: ["Zorlama üslup olmadı mı?"],
      train: "pattern"
    },
    "b2-u8-t3": {
      goal: "Okumada kalıp avı.",
      theory: ["Metinde iskeleti gör, şık tuzağına düşme."],
      examples: [{ el: "Σύμφωνα με το κείμενο…", tr: "metne göre" }],
      steps: ["1–2 okuma.", "5 kalıp listele.", "Kalıp antrenmanı."],
      practice: ["Listeyi deftere."],
      check: ["5 kalıp çıktı mı?"],
      train: "pattern"
    },
    "c2-u4-t1": {
      goal: "C2 kalıp iskeletlerini ezberlemek.",
      theory: ["έγκειται · επιφύλαξη · ουσία · υπερβάλω · αξιοσημείωτο"],
      examples: PATTERNS_X.filter((p) => p.cat === "c2").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["6 kalıp × 2 örnek.", "Kalıp + kalıp doldur.", "Sesli."],
      practice: ["TR→iskelet ezber."],
      check: ["6/6 mi?"],
      train: "pattern"
    },
    "c2-u4-t2": {
      goal: "Eski yazıyı C2 kalıplarıyla cilalamak.",
      theory: ["Anlamı koru, yoğunluğu artır, tekrarı kır."],
      examples: [{ el: "Η ουσία είναι ότι…", tr: "öz" }, { el: "Με κάθε επιφύλαξη…", tr: "çekince" }],
      steps: ["Eski paragraf seç.", "Yeniden yaz.", "Önce/sonra karşılaştır."],
      practice: ["2 C2 kalıbı daha ekle."],
      check: ["Üslup gerçekten yükseldi mi?"],
      train: "pattern"
    },
    "c2-u4-t3": {
      goal: "Sözlüde nüans kalıpları.",
      theory: ["Çekince + vurgu dengesi. Abartma."],
      examples: [{ el: "Χωρίς να θέλω να υπερβάλω…", tr: "abartmadan" }, { el: "Ας μην ξεχνάμε ότι…", tr: "unutmayalım" }],
      steps: ["3 dk kaydet.", "En az 4 C2/haber kalıbı.", "Dinle düzelt."],
      practice: ["Kalıp antrenmanı."],
      check: ["Doğal duruyor mu?"],
      train: "pattern"
    }
  }
};

(function applyPatternsX() {
  if (typeof PATTERNS !== "undefined") {
    PATTERNS.bank = PATTERNS.bank.concat(PATTERNS_X);
  }
  if (typeof CONTENT !== "undefined" && EXTRAS10.vocab) {
    Object.keys(EXTRAS10.vocab).forEach((d) => {
      CONTENT.decks[d] = EXTRAS10.vocab[d];
    });
  }
  if (typeof EXTRAS2 !== "undefined") {
    if (EXTRAS10.examExtra) EXTRAS2.examBank = EXTRAS2.examBank.concat(EXTRAS10.examExtra);
    if (EXTRAS10.scrambleExtra) EXTRAS2.scramble = EXTRAS2.scramble.concat(EXTRAS10.scrambleExtra);
  }
  if (typeof TRAINERS !== "undefined" && EXTRAS10.dictationExtra) {
    TRAINERS.dictation = TRAINERS.dictation.concat(EXTRAS10.dictationExtra);
  }
  if (typeof DRILLS !== "undefined") {
    if (EXTRAS10.cloze) DRILLS.cloze = DRILLS.cloze.concat(EXTRAS10.cloze);
    if (EXTRAS10.reading) DRILLS.reading = DRILLS.reading.concat(EXTRAS10.reading);
  }
  if (typeof LESSONS !== "undefined" && EXTRAS10.newLessons) {
    Object.keys(EXTRAS10.newLessons).forEach((id) => {
      LESSONS[id] = EXTRAS10.newLessons[id];
    });
  }
  if (typeof CURRICULUM !== "undefined" && EXTRAS10.units) {
    Object.keys(EXTRAS10.units).forEach((levelId) => {
      const level = CURRICULUM.levels.find((l) => l.id === levelId);
      if (!level) return;
      EXTRAS10.units[levelId].forEach((u) => {
        if (!level.units.some((x) => x.id === u.id)) level.units.push(u);
      });
    });
  }
})();
