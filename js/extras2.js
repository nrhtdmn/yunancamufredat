/* İkinci içerik paketi */
const EXTRAS2 = {
  scramble: [
    { words: ["Θέλω", "έναν", "καφέ"], answer: "Θέλω έναν καφέ", tr: "Bir kahve istiyorum" },
    { words: ["Δεν", "καταλαβαίνω", "καλά"], answer: "Δεν καταλαβαίνω καλά", tr: "İyi anlamıyorum" },
    { words: ["Πού", "είναι", "το", "σπίτι"], answer: "Πού είναι το σπίτι", tr: "Ev nerede?" },
    { words: ["Χθες", "διάβασα", "ένα", "βιβλίο"], answer: "Χθες διάβασα ένα βιβλίο", tr: "Dün bir kitap okudum" },
    { words: ["Θα", "πάω", "αύριο", "στην", "Αθήνα"], answer: "Θα πάω αύριο στην Αθήνα", tr: "Yarın Atina'ya gideceğim" },
    { words: ["Πρέπει", "να", "διαβάσω", "περισσότερο"], answer: "Πρέπει να διαβάσω περισσότερο", tr: "Daha fazla okumalıyım" },
    { words: ["Ο", "άνθρωπος", "που", "μιλάει", "είναι", "γιατρός"], answer: "Ο άνθρωπος που μιλάει είναι γιατρός", tr: "Konuşan adam doktor" },
    { words: ["Αν", "είχα", "χρόνο", "θα", "ερχόμουν"], answer: "Αν είχα χρόνο θα ερχόμουν", tr: "Zamanım olsaydı gelirdim" }
  ],

  reflexive: [
    { tr: "uyanmak", el: "ξυπνάω", tip: "" },
    { tr: "yıkanmak", el: "πλένομαι", tip: "orta çatı" },
    { tr: "giyinmek", el: "ντύνομαι", tip: "" },
    { tr: "hazırlanmak", el: "ετοιμάζομαι", tip: "" },
    { tr: "hatırlamak", el: "θυμάμαι", tip: "" },
    { tr: "düşünmek", el: "σκέφτομαι", tip: "" },
    { tr: "korkmak", el: "φοβάμαι", tip: "" },
    { tr: "üzülmek", el: "λυπάμαι", tip: "" },
    { tr: "utanmak", el: "ντρέπομαι", tip: "" },
    { tr: "oturmak / yerleşmek", el: "κάθομαι", tip: "" }
  ],

  polite: [
    { tr: "Affedersiniz", el: "Με συγχωρείτε", tip: "" },
    { tr: "Rica etsem…", el: "Μήπως θα μπορούσατε…", tip: "çok nazik" },
    { tr: "İsterdim…", el: "Θα ήθελα…", tip: "" },
    { tr: "Zahmet olmazsa", el: "Αν δεν σας πειράζει", tip: "" },
    { tr: "Çok teşekkürler", el: "Ευχαριστώ πάρα πολύ", tip: "" },
    { tr: "Özür dilerim", el: "Ζητώ συγγνώμη", tip: "" },
    { tr: "Buyurun (alabilirsiniz)", el: "Ορίστε", tip: "" },
    { tr: "Kolay gelsin", el: "Να'στε καλά", tip: "bağlama göre" }
  ],

  adjectives: [
    { tr: "güzel ev (nötr)", el: "ωραίο σπίτι", tip: "sıfat cinsiyet uyumu" },
    { tr: "güzel kadın", el: "ωραία γυναίκα", tip: "" },
    { tr: "güzel adam", el: "ωραίος άντρας", tip: "" },
    { tr: "büyük şehir (dişil)", el: "μεγάλη πόλη", tip: "" },
    { tr: "küçük çocuk (nötr)", el: "μικρό παιδί", tip: "" },
    { tr: "iyi fikir", el: "καλή ιδέα", tip: "" },
    { tr: "zor sınav", el: "δύσκολη εξέταση", tip: "" },
    { tr: "yeni araba", el: "καινούργιο αυτοκίνητο", tip: "" }
  ],

  bigNumbers: [
    { n: 100, el: "εκατό" },
    { n: 200, el: "διακόσια" },
    { n: 300, el: "τριακόσια" },
    { n: 400, el: "τετρακόσια" },
    { n: 500, el: "πεντακόσια" },
    { n: 1000, el: "χίλια" },
    { n: 2000, el: "δύο χιλιάδες" },
    { n: 2024, el: "δύο χιλιάδες είκοσι τέσσερα" },
    { n: 150, el: "εκατόν πενήντα" },
    { n: 999, el: "εννιακόσια ενενήντα εννέα" }
  ],

  vocab: {
    work: [
      { el: "γραφείο", tr: "ofis", tip: "" },
      { el: "συνάδελφος", tr: "iş arkadaşı", tip: "" },
      { el: "σύσκεψη", tr: "toplantı", tip: "" },
      { el: "προθεσμία", tr: "son tarih", tip: "" },
      { el: "μισθός", tr: "maaş", tip: "" },
      { el: "άδεια", tr: "izin / tatil", tip: "" },
      { el: "υπεύθυνος", tr: "sorumlu", tip: "" },
      { el: "έργο", tr: "proje", tip: "" }
    ],
    home: [
      { el: "κουζίνα", tr: "mutfak", tip: "" },
      { el: "μπάνιο", tr: "banyo", tip: "" },
      { el: "υπνοδωμάτιο", tr: "yatak odası", tip: "" },
      { el: "σαλόνι", tr: "salon", tip: "" },
      { el: "παράθυρο", tr: "pencere", tip: "" },
      { el: "κλειδί", tr: "anahtar", tip: "" },
      { el: "ένοικος", tr: "kiracı", tip: "" },
      { el: "ενοίκιο", tr: "kira", tip: "" }
    ]
  },

  cloze: [
    { id: "c2a", text: "___ συγχωρείτε, πού είναι η τουαλέτα;", options: ["Με", "Σε", "Το", "Τον"], a: 0, why: "Με συγχωρείτε = affedersiniz." },
    { id: "c2b", text: "Θα ___ να κλείσω ένα ραντεβού.", options: ["ήθελα", "θέλωσα", "ήθελες", "θελήσω"], a: 0, why: "Θα ήθελα = isterdim." },
    { id: "c2c", text: "Ξυπνάω στις επτά και μετά ___.", options: ["πλένομαι", "πλένω με", "πλύθηκα τώρα", "θα πλένω πάντα"], a: 0, why: "πλένομαι = yıkanmak." },
    { id: "c2d", text: "Η προθεσμία είναι ___ Παρασκευή.", options: ["την", "το", "τον", "της"], a: 0, why: "την Παρασκευή." },
    { id: "c2e", text: "Δεν μπορώ να έρθω ___ είμαι άρρωστος.", options: ["επειδή", "αν και", "ώστε", "πριν"], a: 0, why: "επειδή = çünkü." },
    { id: "c2f", text: "Το διαμέρισμα έχει μεγάλο ___.", options: ["σαλόνι", "μισθό", "συνάδελφο", "ραντεβού"], a: 0, why: "σαλόνι = salon." }
  ],

  examBank: [
    { q: "«παρόλο που» anlamı?", options: ["çünkü", "rağmen", "önce", "belki"], a: 1, kind: "vocab" },
    { q: "Χθες ___ τον Νίκο. (görmek)", options: ["είδα", "βλέπω", "θα δω", "έβλεπα πάντα"], a: 0, kind: "grammar" },
    { q: "Ana fikir sorusunda ilk adım?", options: ["Seçenekleri ezberle", "Paragrafı özetle", "Sadece son cümle", "Zamanı boşa harca"], a: 1, kind: "strategy" },
    { q: "να γράφω neyi vurgular?", options: ["Bir kez yazmak", "Sürekli/alışkanlık yazmak", "Emir", "Geçmiş"], a: 1, kind: "grammar" },
    { q: "«συνεπώς» en yakın?", options: ["ama", "dolayısıyla", "belki", "asla"], a: 1, kind: "vocab" },
    { q: "έχω γράψει zamanı?", options: ["Aorist", "Imperfect", "Perfect", "Gelecek"], a: 2, kind: "grammar" },
    { q: "Cloze’da önce neye bak?", options: ["Rastgele seç", "Dilbilgisi ipucu", "Sadece uzunluk", "İlk şık"], a: 1, kind: "strategy" },
    { q: "ο / η / το ne?", options: ["Fiil", "Madde", "Edat", "Zamir"], a: 1, kind: "grammar" },
    { q: "«εντούτοις»?", options: ["yine de", "çünkü", "önce", "içinde"], a: 0, kind: "vocab" },
    { q: "Αν είχα χρήματα, ___ .", options: ["θα ταξίδευα", "ταξιδεύω", "ταξίδεψα χθες", "να ταξιδέψω μόνο"], a: 0, kind: "grammar" },
    { q: "Tuzağın tipik hali?", options: ["Metinde aynı kelime farklı bağlam", "Hiç kelime yok", "Sadece matematik", "Resim sorusu"], a: 0, kind: "strategy" },
    { q: "Θα ήθελα tonu?", options: ["Kaba emir", "Nazik istek", "Geçmiş zorunlu", "Soru değil"], a: 1, kind: "vocab" },
    { q: "μη + fiil?", options: ["Olumlu emir", "Olumsuz istek/emir", "Gelecek", "Madde"], a: 1, kind: "grammar" },
    { q: "που göreli kullanımda?", options: ["ve", "ki / -en/-an", "ama", "veya"], a: 1, kind: "grammar" },
    { q: "YDS’de süre yönetimi?", options: ["Her soruya eşit boşa", "Zor soruyu işaretle geç", "Sadece ilk 10", "Süre yok say"], a: 1, kind: "strategy" },
    { q: "λαμβάνω υπόψη?", options: ["unutmak", "dikkate almak", "yemek", "koşmak"], a: 1, kind: "vocab" },
    { q: "Παρατατικός tipik anlam?", options: ["Tek olay", "Süre/alışkanlık", "Emir", "Pasif zorunlu"], a: 1, kind: "grammar" },
    { q: "σε αντίθεση με?", options: ["aynı", "aksine", "içinde", "sonra"], a: 1, kind: "vocab" },
    { q: "Deneme sonrası ne yap?", options: ["Sil ve unut", "Otopsi / hata analizi", "Sadece skor bak", "Uyu hemen"], a: 1, kind: "strategy" },
    { q: "φιλότιμο?", options: ["para", "onur / gönüllü fedakârlık", "spor", "yemek"], a: 1, kind: "vocab" }
  ]
};

(function applyExtras2() {
  if (typeof CONTENT !== "undefined" && EXTRAS2.vocab) {
    Object.keys(EXTRAS2.vocab).forEach((deck) => {
      CONTENT.decks[deck] = EXTRAS2.vocab[deck];
    });
  }
  if (typeof DRILLS !== "undefined" && EXTRAS2.cloze) {
    DRILLS.cloze = DRILLS.cloze.concat(EXTRAS2.cloze);
  }
})();
