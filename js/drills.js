const DRILLS = {
  cloze: [
    {
      id: "cl1",
      text: "Θέλω ___ μάθω ελληνικά.",
      options: ["να", "θα", "και", "αν"],
      a: 0,
      why: "να + fiil = istek/amaç (υποτακτική)."
    },
    {
      id: "cl2",
      text: "Χθες ___ ένα βιβλίο.",
      options: ["διαβάζω", "διάβασα", "θα διαβάσω", "διαβάζεις"],
      a: 1,
      why: "Χθες → aorist (tamamlanmış olay)."
    },
    {
      id: "cl3",
      text: "___ είμαι κουρασμένος, θα έρθω.",
      options: ["Αν και", "Γιατί", "Πού", "Πότε"],
      a: 0,
      why: "Αν και = rağmen."
    },
    {
      id: "cl4",
      text: "Πρέπει ___ διαβάσεις πριν την εξέταση.",
      options: ["να", "θα", "ότι", "ως"],
      a: 0,
      why: "πρέπει να + fiil."
    },
    {
      id: "cl5",
      text: "Αν είχα χρόνο, ___ περισσότερο.",
      options: ["ταξιδεύω", "θα ταξίδευα", "ταξίδεψα", "να ταξιδέψω"],
      a: 1,
      why: "Karşıolgusal: αν + imperfect → θα + imperfect."
    },
    {
      id: "cl6",
      text: "Το πρόβλημα ___ στην έλλειψη χρόνου.",
      options: ["συνίσταται", "τρώει", "πηγαίνει", "γελάει"],
      a: 0,
      why: "συνίσταται σε = …den oluşur / kaynaklanır (akademik)."
    },
    {
      id: "cl7",
      text: "___ αφορά την εκπαίδευση, χρειάζονται μεταρρυθμίσεις.",
      options: ["Όσον", "Πού", "Πότε", "Μήπως"],
      a: 0,
      why: "Όσον αφορά = ile ilgili olarak."
    },
    {
      id: "cl8",
      text: "Η έρευνα ___ ότι η άσκηση βοηθά τη μνήμη.",
      options: ["δείχνει", "τρέχει", "ζητά", "κλείνει"],
      a: 0,
      why: "δείχνει ότι… akademik kalıp."
    }
    {
      id: "cl9",
      text: "Δεν ___ χρόνο σήμερα.",
      options: ["έχω", "είμαι", "πάω", "λέω"],
      a: 0,
      why: "έχω χρόνο = vaktim var."
    },
    {
      id: "cl10",
      text: "Η απόφαση ___ το μέλλον της εταιρείας.",
      options: ["επηρεάζει", "τρώει", "κοιμάται", "τραγουδά"],
      a: 0,
      why: "επηρεάζω = etkilemek (akademik/resmi)."
    },
    {
      id: "cl11",
      text: "___ τα δεδομένα υπόψη, το αποτέλεσμα είναι θετικό.",
      options: ["Λαμβάνοντας", "Τρώγοντας", "Τρέχοντας", "Κλείνοντας"],
      a: 0,
      why: "λαμβάνω υπόψη = dikkate almak."
    },
    {
      id: "cl12",
      text: "Σε αντίθεση ___ την κοινή πεποίθηση, η πρόοδος είναι αργή.",
      options: ["με", "σε", "από", "για"],
      a: 0,
      why: "σε αντίθεση με = …nın aksine."
    }
  ],

  reading: [
    {
      id: "rd1",
      passage:
        "Η εκμάθηση μιας ξένης γλώσσας απαιτεί συνέπεια. Δεν αρκεί να μελετά κανείς μόνο πριν από τις εξετάσεις· η καθημερινή επαφή με τη γλώσσα —ανάγνωση, ακρόαση και παραγωγή— οδηγεί σε σταθερή πρόοδο.",
      q: "Paragrafın ana fikri nedir?",
      options: [
        "Sadece sınav öncesi çalışmak yeter",
        "Tutarlı günlük temas ilerlemeyi sağlar",
        "Yabancı dil öğrenmek imkânsızdır",
        "Sadece dinlemek yeterlidir"
      ],
      a: 1
    },
    {
      id: "rd2",
      passage:
        "Παρόλο που πολλοί πιστεύουν ότι το ταλέντο είναι το κλειδί, οι μελέτες δείχνουν ότι η μεθοδική εξάσκηση και η διαχείριση λαθών παίζουν καθοριστικό ρόλο. Το λάθος, όταν αναλύεται, γίνεται εργαλείο μάθησης.",
      q: "Yazara göre hata ne işe yarar?",
      options: [
        "Başarısızlık kanıtıdır",
        "Analiz edilirse öğrenme aracı olur",
        "Görmezden gelinmelidir",
        "Sadece yetenekli kişilerde olur"
      ],
      a: 1
    },
    {
      id: "rd3",
      passage:
        "Στην εποχή της πληροφορίας, η κριτική ανάγνωση είναι απαραίτητη. Ο αναγνώστης δεν πρέπει απλώς να δέχεται τα δεδομένα, αλλά να αξιολογεί την αξιοπιστία των πηγών και τη συνοχή των επιχειρημάτων.",
      q: "Eleştirel okuma neyi gerektirir?",
      options: [
        "Her şeyi ezberlemeyi",
        "Kaynak güvenilirliğini ve argüman tutarlılığını değerlendirmeyi",
        "Sadece başlık okumayı",
        "Yorum yazmamayı"
      ],
      a: 1
    },
    {
      id: "rd4",
      passage:
        "Η τεχνολογία μπορεί να επιταχύνει τη μελέτη, ωστόσο χωρίς σαφή στόχο και πρόγραμμα μετατρέπεται σε περισπασμό. Τα εργαλεία υπηρετούν τη μέθοδο· δεν την αντικαθιστούν.",
      q: "Teknoloji hakkında yazar ne diyor?",
      options: [
        "Teknoloji tek başına yeter",
        "Amaç ve yöntem olmadan dikkat dağıtır",
        "Kitaplar gereksizdir",
        "Program gereksizdir"
      ],
      a: 1
    },
    {
      id: "rd5",
      passage:
        "Για τις εξετάσεις τύπου YDS, η ταχύτητα χωρίς κατανόηση οδηγεί σε λάθη. Ο υποψήφιος οφείλει να εντοπίζει την κεντρική ιδέα πριν εξετάσει τις επιλογές, ώστε να αποφεύγει παγίδες που βασίζονται σε λέξεις-κλειδιά εκτός πλαισίου.",
      q: "YDS tarzı sınavda önerilen sıra?",
      options: [
        "Önce seçenekler, sonra metin",
        "Önce ana fikir, sonra seçenekler",
        "Sadece kelime ezberi",
        "Zamanı hiç kullanmama"
      ],
      a: 1
    }
  ],

  speak: [
    { id: "sp1", prompt: "Kendini 60 saniyede tanıt: ad, nerelisin, neden Yunanca öğreniyorsun.", seconds: 60, level: "a1" },
    { id: "sp2", prompt: "Dün ne yaptığını aorist kullanarak anlat (90 sn).", seconds: 90, level: "a2" },
    { id: "sp3", prompt: "Bir arkadaşa 5 tavsiye ver: πρέπει να… / καλό είναι να…", seconds: 90, level: "b1" },
    { id: "sp4", prompt: "Bir toplumsal konuda görüşünü savun, sonra karşı argümanı da söyle.", seconds: 120, level: "b2" },
    { id: "sp5", prompt: "Alanından bir konuyu 3 dakikada açıkla (mümkün olduğunca akademik üslup).", seconds: 180, level: "c1" }
  ]
};
