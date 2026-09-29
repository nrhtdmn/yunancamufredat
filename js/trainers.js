const TRAINERS = {
  alphabet: [
    { ch: "Α α", name: "alfa", sound: "a" },
    { ch: "Β β", name: "vita", sound: "v" },
    { ch: "Γ γ", name: "gama", sound: "g/y" },
    { ch: "Δ δ", name: "delta", sound: "ð" },
    { ch: "Ε ε", name: "epsilon", sound: "e" },
    { ch: "Ζ ζ", name: "zita", sound: "z" },
    { ch: "Η η", name: "ita", sound: "i" },
    { ch: "Θ θ", name: "thita", sound: "th" },
    { ch: "Ι ι", name: "yota", sound: "i" },
    { ch: "Κ κ", name: "kapa", sound: "k" },
    { ch: "Λ λ", name: "lamda", sound: "l" },
    { ch: "Μ μ", name: "mi", sound: "m" },
    { ch: "Ν ν", name: "ni", sound: "n" },
    { ch: "Ξ ξ", name: "ksi", sound: "ks" },
    { ch: "Ο ο", name: "omikron", sound: "o" },
    { ch: "Π π", name: "pi", sound: "p" },
    { ch: "Ρ ρ", name: "ro", sound: "r" },
    { ch: "Σ σ/ς", name: "sigma", sound: "s" },
    { ch: "Τ τ", name: "taf", sound: "t" },
    { ch: "Υ υ", name: "ipsilon", sound: "i" },
    { ch: "Φ φ", name: "fi", sound: "f" },
    { ch: "Χ χ", name: "hi", sound: "h/ch" },
    { ch: "Ψ ψ", name: "psi", sound: "ps" },
    { ch: "Ω ω", name: "omega", sound: "o" }
  ],

  verbs: [
    {
      id: "eimai",
      infinitive: "είμαι",
      gloss: "olmak",
      forms: [
        { p: "εγώ", f: "είμαι" },
        { p: "εσύ", f: "είσαι" },
        { p: "αυτός/ή/ό", f: "είναι" },
        { p: "εμείς", f: "είμαστε" },
        { p: "εσείς", f: "είστε" },
        { p: "αυτοί/ές/ά", f: "είναι" }
      ]
    },
    {
      id: "echo",
      infinitive: "έχω",
      gloss: "sahip olmak",
      forms: [
        { p: "εγώ", f: "έχω" },
        { p: "εσύ", f: "έχεις" },
        { p: "αυτός/ή/ό", f: "έχει" },
        { p: "εμείς", f: "έχουμε" },
        { p: "εσείς", f: "έχετε" },
        { p: "αυτοί/ές/ά", f: "έχουν" }
      ]
    },
    {
      id: "grafo",
      infinitive: "γράφω",
      gloss: "yazmak",
      forms: [
        { p: "εγώ", f: "γράφω" },
        { p: "εσύ", f: "γράφεις" },
        { p: "αυτός/ή/ό", f: "γράφει" },
        { p: "εμείς", f: "γράφουμε" },
        { p: "εσείς", f: "γράφετε" },
        { p: "αυτοί/ές/ά", f: "γράφουν" }
      ]
    },
    {
      id: "thelo",
      infinitive: "θέλω",
      gloss: "istemek",
      forms: [
        { p: "εγώ", f: "θέλω" },
        { p: "εσύ", f: "θέλεις" },
        { p: "αυτός/ή/ό", f: "θέλει" },
        { p: "εμείς", f: "θέλουμε" },
        { p: "εσείς", f: "θέλετε" },
        { p: "αυτοί/ές/ά", f: "θέλουν" }
      ]
    },
    {
      id: "pao",
      infinitive: "πάω",
      gloss: "gitmek",
      forms: [
        { p: "εγώ", f: "πάω" },
        { p: "εσύ", f: "πας" },
        { p: "αυτός/ή/ό", f: "πάει" },
        { p: "εμείς", f: "πάμε" },
        { p: "εσείς", f: "πάτε" },
        { p: "αυτοί/ές/ά", f: "παν" }
      ]
    },
    {
      id: "kano",
      infinitive: "κάνω",
      gloss: "yapmak",
      forms: [
        { p: "εγώ", f: "κάνω" },
        { p: "εσύ", f: "κάνεις" },
        { p: "αυτός/ή/ό", f: "κάνει" },
        { p: "εμείς", f: "κάνουμε" },
        { p: "εσείς", f: "κάνετε" },
        { p: "αυτοί/ές/ά", f: "κάνουν" }
      ]
    },
    {
      id: "milo",
      infinitive: "μιλάω",
      gloss: "konuşmak",
      forms: [
        { p: "εγώ", f: "μιλάω" },
        { p: "εσύ", f: "μιλάς" },
        { p: "αυτός/ή/ό", f: "μιλάει" },
        { p: "εμείς", f: "μιλάμε" },
        { p: "εσείς", f: "μιλάτε" },
        { p: "αυτοί/ές/ά", f: "μιλάνε" }
      ]
    },
    {
      id: "troo",
      infinitive: "τρώω",
      gloss: "yemek",
      forms: [
        { p: "εγώ", f: "τρώω" },
        { p: "εσύ", f: "τρως" },
        { p: "αυτός/ή/ό", f: "τρώει" },
        { p: "εμείς", f: "τρώμε" },
        { p: "εσείς", f: "τρώτε" },
        { p: "αυτοί/ές/ά", f: "τρώνε" }
      ]
    }
  ],

  gender: [
    { noun: "άντρας", art: "ο", tr: "adam" },
    { noun: "γυναίκα", art: "η", tr: "kadın" },
    { noun: "παιδί", art: "το", tr: "çocuk" },
    { noun: "σπίτι", art: "το", tr: "ev" },
    { noun: "πόλη", art: "η", tr: "şehir" },
    { noun: "καφές", art: "ο", tr: "kahve" },
    { noun: "νερό", art: "το", tr: "su" },
    { noun: "ημέρα", art: "η", tr: "gün" },
    { noun: "χρόνος", art: "ο", tr: "zaman/yıl" },
    { noun: "βιβλίο", art: "το", tr: "kitap" },
    { noun: "δουλειά", art: "η", tr: "iş" },
    { noun: "φίλος", art: "ο", tr: "arkadaş" },
    { noun: "θάλασσα", art: "η", tr: "deniz" },
    { noun: "αυτοκίνητο", art: "το", tr: "araba" },
    { noun: "δρόμος", art: "ο", tr: "yol" },
    { noun: "πρόβλημα", art: "το", tr: "sorun" }
  ],

  aspect: [
    { tr: "Dün bir kitap okudum (tek olay).", aorist: "διάβασα", imperfect: "διάβαζα", answer: "aorist" },
    { tr: "Çocukken çok kitap okurdum (alışkanlık).", aorist: "διάβασα", imperfect: "διάβαζα", answer: "imperfect" },
    { tr: "Dün sinemaya gittim.", aorist: "πήγα", imperfect: "πήγαινα", answer: "aorist" },
    { tr: "Her gün okula giderdim.", aorist: "πήγα", imperfect: "πήγαινα", answer: "imperfect" },
    { tr: "Birden kapı çaldı / bir şey oldu (anı).", aorist: "έγινε", imperfect: "γινόταν", answer: "aorist" },
    { tr: "O sırada yağmur yağıyordu (arka plan).", aorist: "έβρεξε", imperfect: "έβρεχε", answer: "imperfect" },
    { tr: "Kahveyi içtim (bitirdim).", aorist: "ήπια", imperfect: "έπινα", answer: "aorist" },
    { tr: "O yıllarda çok kahve içerdim.", aorist: "ήπια", imperfect: "έπινα", answer: "imperfect" }
  ],

  numbers: [
    { n: 1, el: "ένα" },
    { n: 2, el: "δύο" },
    { n: 3, el: "τρία" },
    { n: 4, el: "τέσσερα" },
    { n: 5, el: "πέντε" },
    { n: 6, el: "έξι" },
    { n: 7, el: "επτά" },
    { n: 8, el: "οκτώ" },
    { n: 9, el: "εννέα" },
    { n: 10, el: "δέκα" },
    { n: 11, el: "έντεκα" },
    { n: 12, el: "δώδεκα" },
    { n: 15, el: "δεκαπέντε" },
    { n: 20, el: "είκοσι" },
    { n: 30, el: "τριάντα" },
    { n: 40, el: "σαράντα" },
    { n: 50, el: "πενήντα" },
    { n: 100, el: "εκατό" }
  ],

  dictation: [
    "Καλημέρα",
    "Ευχαριστώ πολύ",
    "Με λένε Νίκο",
    "Θέλω έναν καφέ",
    "Πού είναι το σπίτι",
    "Σήμερα μαθαίνω ελληνικά",
    "Χθες διάβασα ένα βιβλίο",
    "Θα πάω αύριο",
    "Δεν καταλαβαίνω",
    "Μιλάω λίγα ελληνικά"
  ],

  time: [
    { tr: "Saat 1", el: "μία" },
    { tr: "Saat 2", el: "δύο" },
    { tr: "Saat 3", el: "τρεις" },
    { tr: "Saat 4", el: "τέσσερις" },
    { tr: "Saat 5", el: "πέντε" },
    { tr: "Saat 6", el: "έξι" },
    { tr: "Saat 7", el: "επτά" },
    { tr: "Saat 8", el: "οκτώ" },
    { tr: "Saat 9", el: "εννέα" },
    { tr: "Saat 10", el: "δέκα" },
    { tr: "Saat 11", el: "έντεκα" },
    { tr: "Saat 12", el: "δώδεκα" },
    { tr: "Yarım (buçuk)", el: "και μισή" },
    { tr: "Çeyrek geçiyor", el: "και τέταρτο" },
    { tr: "Çeyrek var", el: "παρά τέταρτο" }
  ],

  aorist: [
    { base: "πάω", tr: "gitmek", aor: "πήγα" },
    { base: "έρχομαι", tr: "gelmek", aor: "ήρθα" },
    { base: "βλέπω", tr: "görmek", aor: "είδα" },
    { base: "λέω", tr: "söylemek", aor: "είπα" },
    { base: "τρώω", tr: "yemek", aor: "έφαγα" },
    { base: "πίνω", tr: "içmek", aor: "ήπια" },
    { base: "παίρνω", tr: "almak", aor: "πήρα" },
    { base: "δίνω", tr: "vermek", aor: "έδωσα" },
    { base: "βρίσκω", tr: "bulmak", aor: "βρήκα" },
    { base: "μένω", tr: "kalmak", aor: "έμεινα" },
    { base: "φεύγω", tr: "ayrılmak", aor: "έφυγα" },
    { base: "γίνομαι", tr: "olmak/hâle gelmek", aor: "έγινα" }
  ],

  translate: [
    { tr: "Su istiyorum", el: "Θέλω νερό" },
    { tr: "Nasılsın?", el: "Τι κάνεις" },
    { tr: "Anlamıyorum", el: "Δεν καταλαβαίνω" },
    { tr: "Yarın gideceğim", el: "Θα πάω αύριο" },
    { tr: "Adım Nurhat", el: "Με λένε Νουρχάτ" },
    { tr: "Teşekkür ederim", el: "Ευχαριστώ" },
    { tr: "Neredesin?", el: "Πού είσαι" },
    { tr: "Kitap okudum", el: "Διάβασα ένα βιβλίο" },
    { tr: "Kahve içer misin?", el: "Θέλεις καφέ" },
    { tr: "Yunanca öğreniyorum", el: "Μαθαίνω ελληνικά" }
  ],

  prep: [
    { tr: "Atina'da yaşıyorum", gap: "___ στην Αθήνα", options: ["Μένω", "Πάω", "Τρώω", "Βλέπω"], a: 0, tip: "μένω + σε" },
    { tr: "Masadan / masanın üstünden", gap: "Το βιβλίο είναι ___ το τραπέζι", options: ["πάνω στο", "κάτω από", "δίπλα σε", "μέσα σε"], a: 0, tip: "πάνω σε = üzerinde" },
    { tr: "Arkadaşımla", gap: "Πάω ___ τον φίλο μου", options: ["με", "από", "σε", "για"], a: 0, tip: "με = ile" },
    { tr: "İşim için", gap: "Διαβάζω ___ τις εξετάσεις", options: ["για", "με", "από", "χωρίς"], a: 0, tip: "για = için" },
    { tr: "Okuldan geliyorum", gap: "Έρχομαι ___ το σχολείο", options: ["από", "σε", "με", "για"], a: 0, tip: "από = -den/-dan" },
    { tr: "Evde", gap: "Είμαι ___ σπίτι", options: ["στο", "στον", "στην", "στα"], a: 0, tip: "στο σπίτι" },
    { tr: "Yanında", gap: "Κάθομαι ___ σου", options: ["δίπλα", "πάνω", "κάτω", "μέσα"], a: 0, tip: "δίπλα σε" },
    { tr: "Olmadan", gap: "Δεν μπορώ ___ εσένα", options: ["χωρίς", "με", "για", "προς"], a: 0, tip: "χωρίς = olmadan" }
  ],

  conditional: [
    { tr: "Yağmur yağarsa gelmem.", el: "Αν βρέχει, δεν θα έρθω", tip: "Tip 1 gerçek" },
    { tr: "Zamanım olsaydı gelirdim.", el: "Αν είχα χρόνο, θα ερχόμουν", tip: "Tip 2 hayali" },
    { tr: "İstersen yardım ederim.", el: "Αν θέλεις, θα βοηθήσω", tip: "Tip 1" },
    { tr: "Param olsaydı seyahat ederdim.", el: "Αν είχα χρήματα, θα ταξίδευα", tip: "Tip 2" },
    { tr: "Erken kalkarsan yetişirsin.", el: "Αν σηκωθείς νωρίς, θα προλάβεις", tip: "Tip 1" },
    { tr: "Bilsem söylerdim.", el: "Αν ήξερα, θα το έλεγα", tip: "Tip 2" }
  ],

  writing: [
    { id: "w1", title: "Günlük", prompt: "Bugünü 80–120 kelime Yunanca anlat (şimdiki + geçmiş karışık).", minutes: 12, checklist: ["En az 8 cümle", "1 aorist", "1 bağlaç (και/αλλά/γιατί)"] },
    { id: "w2", title: "E-posta", prompt: "Arkadaşa Yunanca kısa e-posta: buluşma teklif et.", minutes: 10, checklist: ["Selam + kapanış", "Θα ήθελα / Μπορούμε", "Yer + saat"] },
    { id: "w3", title: "Görüş", prompt: "«Sosyal medya faydalı mı?» sorusuna 150 kelime yanıt yaz.", minutes: 15, checklist: ["Giriş cümlesi", "2 gerekçe", "Sonuç"] },
    { id: "w4", title: "Hikâye", prompt: "Dün başından geçen kısa bir olayı aorist ile anlat.", minutes: 12, checklist: ["5+ aorist", "Kim/nerede/ne oldu", "Sonuç"] },
    { id: "w5", title: "YDS üslup", prompt: "Eğitim üzerine 180 kelimelik nötr-akademik paragraf yaz.", minutes: 18, checklist: ["εντούτοις/ωστόσο", "1 örnek", "Net sonuç cümlesi"] }
  ],

  imperative: [
    { tr: "Yaz! (sen)", el: "Γράψε!", tip: "aorist emir" },
    { tr: "Yazın! (siz)", el: "Γράψτε!", tip: "" },
    { tr: "Gel!", el: "Έλα!", tip: "düzensiz" },
    { tr: "Gelin!", el: "Ελάτε!", tip: "" },
    { tr: "Git!", el: "Πήγαινε!", tip: "" },
    { tr: "Dinle!", el: "Άκου!", tip: "" },
    { tr: "Bak!", el: "Κοίτα!", tip: "" },
    { tr: "Söyle!", el: "Πες!", tip: "düzensiz" },
    { tr: "Verme! (olumsuz sen)", el: "Μην δώσεις!", tip: "μη + subjunctive" },
    { tr: "Konuşma!", el: "Μην μιλάς!", tip: "" }
  ],

  perfect: [
    { tr: "Yazdım / yazmış durumdayım (perfect)", el: "έχω γράψει", tip: "έχω + aparemphato" },
    { tr: "Gelmiş (perfect)", el: "έχει έρθει", tip: "" },
    { tr: "Bitirmişiz", el: "έχουμε τελειώσει", tip: "" },
    { tr: "Görmüşsün", el: "έχεις δει", tip: "" },
    { tr: "Söylemişler", el: "έχουν πει", tip: "" },
    { tr: "Yemiş (perfect)", el: "έχει φάει", tip: "" },
    { tr: "Almışım", el: "έχω πάρει", tip: "" },
    { tr: "Vermişsin", el: "έχεις δώσει", tip: "" }
  ],

  months: [
    { tr: "Ocak", el: "Ιανουάριος" },
    { tr: "Şubat", el: "Φεβρουάριος" },
    { tr: "Mart", el: "Μάρτιος" },
    { tr: "Nisan", el: "Απρίλιος" },
    { tr: "Mayıs", el: "Μάιος" },
    { tr: "Haziran", el: "Ιούνιος" },
    { tr: "Temmuz", el: "Ιούλιος" },
    { tr: "Ağustos", el: "Αύγουστος" },
    { tr: "Eylül", el: "Σεπτέμβριος" },
    { tr: "Ekim", el: "Οκτώβριος" },
    { tr: "Kasım", el: "Νοέμβριος" },
    { tr: "Aralık", el: "Δεκέμβριος" },
    { tr: "ilkbahar", el: "άνοιξη" },
    { tr: "yaz", el: "καλοκαίρι" },
    { tr: "sonbahar", el: "φθινόπωρο" },
    { tr: "kış", el: "χειμώνας" }
  ],

  genitive: [
    { tr: "evin kapısı", el: "η πόρτα του σπιτιού", tip: "genitif sahiplik" },
    { tr: "çocuğun kitabı", el: "το βιβλίο του παιδιού", tip: "" },
    { tr: "Maria'nın arabası", el: "το αυτοκίνητο της Μαρίας", tip: "" },
    { tr: "öğretmenin evi", el: "το σπίτι του δασκάλου", tip: "" },
    { tr: "ülkenin başkenti", el: "η πρωτεύουσα της χώρας", tip: "" },
    { tr: "sorunun çözümü", el: "η λύση του προβλήματος", tip: "" },
    { tr: "günün sonu", el: "το τέλος της ημέρας", tip: "" },
    { tr: "sınavın sonucu", el: "το αποτέλεσμα της εξέτασης", tip: "" }
  ],

  badges: [
    { id: "first_task", title: "İlk adım", desc: "İlk görevi tamamla", check: (s) => Object.keys(s.completed || {}).length >= 1 },
    { id: "streak3", title: "3 gün seri", desc: "3 gün üst üste aktif ol", check: (s) => (s.streak || 0) >= 3 },
    { id: "streak7", title: "Haftalık ateş", desc: "7 gün seri", check: (s) => (s.streak || 0) >= 7 },
    { id: "cards50", title: "Kart ustası", desc: "50 kart tekrarı", check: (s) => (s.cardsReviewed || 0) >= 50 },
    { id: "cloze10", title: "Cloze avcısı", desc: "10 cloze çöz", check: (s) => ((s.drillStats || {}).clozeTotal || 0) >= 10 },
    { id: "a1_half", title: "A1 yarı", desc: "A1 seviyesinde %50+", check: (s) => {
      if (typeof CURRICULUM === "undefined") return false;
      const level = CURRICULUM.levels.find((l) => l.id === "a1");
      if (!level) return false;
      let t = 0, d = 0;
      level.units.forEach((u) => u.tasks.forEach((task) => { t++; if (s.completed[task.id]) d++; }));
      return t && d / t >= 0.5;
    }},
    { id: "trainer20", title: "Antrenör", desc: "20 antrenman turu", check: (s) => Object.values(s.trainerStats || {}).reduce((a, b) => a + b, 0) >= 20 },
    { id: "challenge", title: "Günlük savaşçı", desc: "Bir challenge bitir", check: (s) => (s.challengesWon || 0) >= 1 },
    { id: "write3", title: "Yazar", desc: "3 yazma promptu bitir", check: (s) => Object.keys(s.writeDone || {}).length >= 3 },
    { id: "prep15", title: "Edat ustası", desc: "15 edat turu", check: (s) => ((s.trainerStats || {}).prep || 0) >= 15 }
  ],

  themeDecks: {
    food: [
      { el: "φαγητό", tr: "yemek", tip: "το φαγητό" },
      { el: "εστιατόριο", tr: "restoran", tip: "" },
      { el: "λογαριασμός", tr: "hesap", tip: "τον λογαριασμό" },
      { el: "πικάντικο", tr: "acı", tip: "" },
      { el: "χορτοφαγικό", tr: "vejetaryen", tip: "" },
      { el: "επιδόρπιο", tr: "tatlı", tip: "" },
      { el: "κρασί", tr: "şarap", tip: "το κρασί" },
      { el: "τυρί", tr: "peynir", tip: "το τυρί" }
    ],
    travel: [
      { el: "αεροδρόμιο", tr: "havaalanı", tip: "" },
      { el: "εισιτήριο", tr: "bilet", tip: "" },
      { el: "βαλίτσα", tr: "bavul", tip: "" },
      { el: "ξενοδοχείο", tr: "otel", tip: "" },
      { el: "χάρτης", tr: "harita", tip: "" },
      { el: "σύνορο", tr: "sınır", tip: "" },
      { el: "καθυστέρηση", tr: "gecikme", tip: "" },
      { el: "κράτηση", tr: "rezervasyon", tip: "" }
    ],
    exam: [
      { el: "εξέταση", tr: "sınav", tip: "" },
      { el: "βαθμολογία", tr: "not / puan", tip: "" },
      { el: "εκφώνηση", tr: "soru kökü / yönerge", tip: "" },
      { el: "κενό", tr: "boşluk", tip: "cloza" },
      { el: "επιλογή", tr: "seçenek", tip: "" },
      { el: "χρονόμετρο", tr: "kronometre", tip: "" },
      { el: "επανάληψη", tr: "tekrar", tip: "" },
      { el: "στρατηγική", tr: "strateji", tip: "" }
    ],
    friends: [
      { el: "λίγο", tr: "az / biraz (NOT: illegal değil)", tip: "false friend uyarı" },
      { el: "μαγαζί", tr: "dükkân", tip: "magaza benzeri" },
      { el: "κάρτα", tr: "kart", tip: "" },
      { el: "σάλτσα", tr: "sos", tip: "" },
      { el: "τσάντα", tr: "çanta", tip: "" },
      { el: "πόρτα", tr: "kapı", tip: "porte değil kapı" },
      { el: "κάτι", tr: "bir şey", tip: "" },
      { el: "τίποτα", tr: "hiçbir şey", tip: "" },
      { el: "απλά", tr: "sadece / basitçe", tip: "" },
      { el: "τέλος", tr: "son", tip: "telos" }
    ],
    weather: [
      { el: "βροχή", tr: "yağmur", tip: "η βροχή" },
      { el: "ήλιος", tr: "güneş", tip: "" },
      { el: "σύννεφο", tr: "bulut", tip: "" },
      { el: "άνεμος", tr: "rüzgâr", tip: "" },
      { el: "χιόνι", tr: "kar", tip: "" },
      { el: "ζέστη", tr: "sıcaklık / sıcak", tip: "" },
      { el: "κρύο", tr: "soğuk", tip: "" },
      { el: "καταιγίδα", tr: "fırtına", tip: "" }
    ],
    health: [
      { el: "πονοκέφαλος", tr: "baş ağrısı", tip: "" },
      { el: "πυρετός", tr: "ateş", tip: "" },
      { el: "βήχας", tr: "öksürük", tip: "" },
      { el: "γιατρός", tr: "doktor", tip: "" },
      { el: "φάρμακο", tr: "ilaç", tip: "" },
      { el: "νοσοκομείο", tr: "hastane", tip: "" },
      { el: "υγεία", tr: "sağlık", tip: "" },
      { el: "πόνος", tr: "ağrı", tip: "" }
    ]
  },

  compare: [
    { tr: "daha büyük", el: "πιο μεγάλος", tip: "πιο + sıfat" },
    { tr: "en büyük", el: "ο πιο μεγάλος", tip: "ο/η/το πιο…" },
    { tr: "daha iyi", el: "καλύτερος", tip: "düzensiz" },
    { tr: "daha kötü", el: "χειρότερος", tip: "düzensiz" },
    { tr: "daha çok", el: "περισσότερος", tip: "" },
    { tr: "daha az", el: "λιγότερος", tip: "" },
    { tr: "kadar … (eşitlik)", el: "τόσο … όσο", tip: "τόσο ψηλός όσο" },
    { tr: "daha hızlı", el: "πιο γρήγορος", tip: "" }
  ],

  subjunctive: [
    { tr: "Bir kez yazmak istiyorum", options: ["να γράψω", "να γράφω"], a: 0, tip: "aorist subjunctive = bir kez / tamamlanmış" },
    { tr: "Sürekli yazmak istiyorum", options: ["να γράφω", "να γράψω"], a: 0, tip: "present subjunctive = süre/alışkanlık" },
    { tr: "Yarın gelmeni istiyorum (bir kez)", options: ["να έρθεις", "να έρχεσαι"], a: 0, tip: "να έρθεις" },
    { tr: "Daha sık gelmeni istiyorum", options: ["να έρχεσαι", "να έρθεις"], a: 0, tip: "να έρχεσαι" },
    { tr: "Kitabı bitirmelisin", options: ["να τελειώσεις", "να τελειώνεις"], a: 0, tip: "bir kez bitir" },
    { tr: "Her gün spor yapmalısın", options: ["να κάνεις", "να κάνεις μία φορά μόνο"], a: 0, tip: "alışkanlık → present" }
  ],

  collocations: [
    { tr: "karar vermek", el: "παίρνω απόφαση", tip: "" },
    { tr: "dikkat etmek", el: "δίνω προσοχή", tip: "" },
    { tr: "söz vermek", el: "δίνω υπόσχεση", tip: "" },
    { tr: "fotoğraf çekmek", el: "βγάζω φωτογραφία", tip: "" },
    { tr: "duş almak", el: "κάνω μπάνιο", tip: "" },
    { tr: "hata yapmak", el: "κάνω λάθος", tip: "" },
    { tr: "soru sormak", el: "κάνω ερώτηση", tip: "" },
    { tr: "seyahat etmek", el: "κάνω ταξίδι", tip: "" },
    { tr: "telefonda konuşmak", el: "μιλάω στο τηλέφωνο", tip: "" },
    { tr: "dikkate almak", el: "λαμβάνω υπόψη", tip: "YDS" }
  ],

  extraVocab: {
    a0: [
      { el: "μητέρα", tr: "anne", tip: "η μητέρα" },
      { el: "πατέρας", tr: "baba", tip: "ο πατέρας" },
      { el: "σπίτι", tr: "ev", tip: "το σπίτι" },
      { el: "σχολείο", tr: "okul", tip: "το σχολείο" },
      { el: "καφές", tr: "kahve", tip: "ο καφές" },
      { el: "γάλα", tr: "süt", tip: "το γάλα" },
      { el: "ένα", tr: "bir", tip: "1" },
      { el: "δύο", tr: "iki", tip: "2" }
    ],
    a1: [
      { el: "αγοράζω", tr: "satın almak", tip: "" },
      { el: "δουλεύω", tr: "çalışmak", tip: "" },
      { el: "μαθαίνω", tr: "öğrenmek", tip: "" },
      { el: "καταλαβαίνω", tr: "anlamak", tip: "" },
      { el: "ξέρω", tr: "bilmek", tip: "" },
      { el: "αρέσει", tr: "hoşuna gitmek", tip: "μου αρέσει" },
      { el: "χρήματα", tr: "para", tip: "τα χρήματα" },
      { el: "λεωφορείο", tr: "otobüs", tip: "" }
    ],
    a2: [
      { el: "άρχισα", tr: "başladım", tip: "aorist ← αρχίζω" },
      { el: "τελείωσα", tr: "bitirdim", tip: "aorist" },
      { el: "συνάντησα", tr: "karşılaştım / buluştum", tip: "" },
      { el: "χρειάζομαι", tr: "ihtiyacım var", tip: "" },
      { el: "προσπαθώ", tr: "çabalamak", tip: "" },
      { el: "ξαφνικά", tr: "aniden", tip: "" }
    ],
    b1: [
      { el: "επιτρέπω", tr: "izin vermek", tip: "" },
      { el: "απαγορεύω", tr: "yasaklamak", tip: "" },
      { el: "συνιστώ", tr: "tavsiye etmek", tip: "" },
      { el: "αποφεύγω", tr: "kaçınmak", tip: "" },
      { el: "σημαντικός", tr: "önemli", tip: "" },
      { el: "δύσκολος", tr: "zor", tip: "" }
    ],
    yds: [
      { el: "υποθέτω", tr: "varsaymak", tip: "" },
      { el: "τεκμηριώνω", tr: "belgelemek / kanıtlamak", tip: "" },
      { el: "αντικρούω", tr: "çürütmek", tip: "" },
      { el: "συγκλίνω", tr: "yakınsamak", tip: "" },
      { el: "κατά προσέγγιση", tr: "yaklaşık olarak", tip: "kalıp" },
      { el: "εν κατακλείδι", tr: "sonuç olarak", tip: "kalıp" }
    ]
  }
};

/* Desteleri zenginleştir */
(function mergeVocab() {
  if (typeof CONTENT === "undefined") return;
  Object.keys(TRAINERS.extraVocab).forEach((deck) => {
    CONTENT.decks[deck] = (CONTENT.decks[deck] || []).concat(TRAINERS.extraVocab[deck]);
  });
  Object.keys(TRAINERS.themeDecks || {}).forEach((deck) => {
    CONTENT.decks[deck] = TRAINERS.themeDecks[deck];
  });
})();
