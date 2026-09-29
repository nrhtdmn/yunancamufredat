/* Ek kalıp paketi — telefon, seyahat, duygu, iş, yemek, YDS, C1 */
const PATTERNS_EXTRA = [
  // telefon
  { cat: "telefon", level: "a2", frame: "Έλα;", eg: "Έλα;", tr: "Alo?" },
  { cat: "telefon", level: "a2", frame: "Μπορώ να μιλήσω με + …;", eg: "Μπορώ να μιλήσω με τον Νίκο;", tr: "… ile görüşebilir miyim?" },
  { cat: "telefon", level: "a2", frame: "Θα σε πάρω αργότερα", eg: "Θα σε πάρω αργότερα.", tr: "Seni sonra ararım" },
  { cat: "telefon", level: "a2", frame: "Στείλε μου μήνυμα", eg: "Στείλε μου μήνυμα.", tr: "Mesaj at" },
  { cat: "telefon", level: "b1", frame: "Δεν έχει σήμα", eg: "Εδώ δεν έχει σήμα.", tr: "Sinyal yok" },
  { cat: "telefon", level: "b1", frame: "Λάθος αριθμός", eg: "Νομίζω είναι λάθος αριθμός.", tr: "Yanlış numara" },

  // seyahat
  { cat: "seyahat", level: "a2", frame: "Θέλω ένα εισιτήριο για + …", eg: "Θέλω ένα εισιτήριο για την Αθήνα.", tr: "… için bilet istiyorum" },
  { cat: "seyahat", level: "a2", frame: "Πότε φεύγει / φτάνει…;", eg: "Πότε φεύγει το τρένο;", tr: "Ne zaman kalkıyor/varıyor?" },
  { cat: "seyahat", level: "a2", frame: "Έχω κράτηση στο όνομα…", eg: "Έχω κράτηση στο όνομα Μαρία.", tr: "… adına rezervasyonum var" },
  { cat: "seyahat", level: "b1", frame: "Πού είναι η πύλη / η έξοδος;", eg: "Πού είναι η πύλη Β12;", tr: "Gate / çıkış nerede?" },
  { cat: "seyahat", level: "b1", frame: "Η πτήση έχει καθυστέρηση", eg: "Η πτήση έχει καθυστέρηση.", tr: "Uçuş gecikti" },
  { cat: "seyahat", level: "b1", frame: "Πόσο διαρκεί το ταξίδι;", eg: "Πόσο διαρκεί το ταξίδι;", tr: "Yolculuk ne kadar sürer?" },

  // yemek / mutfak
  { cat: "yemek", level: "a1", frame: "Πεινάω / Διψάω", eg: "Πεινάω πολύ.", tr: "Acıktım / Susadım" },
  { cat: "yemek", level: "a1", frame: "Θα φάμε έξω;", eg: "Θα φάμε έξω;", tr: "Dışarıda yiyelim mi?" },
  { cat: "yemek", level: "a2", frame: "Είναι πικάντικο / γλυκό / αλμυρό", eg: "Είναι πολύ πικάντικο.", tr: "Acı / tatlı / tuzlu" },
  { cat: "yemek", level: "a2", frame: "Τι προτείνετε;", eg: "Τι προτείνετε από τον κατάλογο;", tr: "Ne önerirsiniz?" },
  { cat: "yemek", level: "a2", frame: "Χωρίς + malzeme", eg: "Χωρίς ζάχαρη, παρακαλώ.", tr: "…sız" },
  { cat: "yemek", level: "b1", frame: "Μυρίζει υπέροχα", eg: "Μυρίζει υπέροχα!", tr: "Harika kokuyor" },

  // iş / kariyer
  { cat: "iş", level: "a2", frame: "Δουλεύω ως + meslek", eg: "Δουλεύω ως μηχανικός.", tr: "… olarak çalışıyorum" },
  { cat: "iş", level: "b1", frame: "Έχω σύσκεψη στις…", eg: "Έχω σύσκεψη στις έντεκα.", tr: "…da toplantım var" },
  { cat: "iş", level: "b1", frame: "Η προθεσμία είναι…", eg: "Η προθεσμία είναι την Παρασκευή.", tr: "Son tarih …" },
  { cat: "iş", level: "b1", frame: "Ας το αναβάλουμε", eg: "Ας το αναβάλουμε για αύριο.", tr: "Erteleyelim" },
  { cat: "iş", level: "b2", frame: "Είμαι υπεύθυνος/η για…", eg: "Είμαι υπεύθυνη για το έργο.", tr: "…den sorumluyum" },
  { cat: "iş", level: "b2", frame: "Θα σας στείλω το αρχείο", eg: "Θα σας στείλω το αρχείο σήμερα.", tr: "Dosyayı göndereceğim" },

  // duygu geniş
  { cat: "duygu", level: "a2", frame: "Χαίρομαι που…", eg: "Χαίρομαι που σε βλέπω.", tr: "… için sevindim" },
  { cat: "duygu", level: "a2", frame: "Λυπάμαι που…", eg: "Λυπάμαι που άργησα.", tr: "… için üzgünüm" },
  { cat: "duygu", level: "b1", frame: "Φοβάμαι μήπως…", eg: "Φοβάμαι μήπως αργήσω.", tr: "… diye korkuyorum" },
  { cat: "duygu", level: "b1", frame: "Ανησυχώ για…", eg: "Ανησυχώ για τα αποτελέσματα.", tr: "… için endişeleniyorum" },
  { cat: "duygu", level: "b1", frame: "Είμαι περήφανος/η για…", eg: "Είμαι περήφανη για σένα.", tr: "… ile gurur duyuyorum" },
  { cat: "duygu", level: "b2", frame: "Με εκνευρίζει που…", eg: "Με εκνευρίζει που αργείς.", tr: "… sinirlendiriyor" },

  // hava / doğa
  { cat: "hava", level: "a1", frame: "Κάνει ζέστη / κρύο", eg: "Κάνει πολλή ζέστη.", tr: "Sıcak / soğuk" },
  { cat: "hava", level: "a1", frame: "Βρέχει / Χιονίζει", eg: "Βρέχει από το πρωί.", tr: "Yağmur / kar" },
  { cat: "hava", level: "a2", frame: "Τι καιρό θα κάνει…;", eg: "Τι καιρό θα κάνει αύριο;", tr: "Hava nasıl olacak?" },
  { cat: "hava", level: "a2", frame: "Πάρε ομπρέλα", eg: "Πάρε ομπρέλα.", tr: "Şemsiye al" },

  // öğrenme / dil
  { cat: "öğrenme", level: "a1", frame: "Μαθαίνω ελληνικά", eg: "Μαθαίνω ελληνικά κάθε μέρα.", tr: "Yunanca öğreniyorum" },
  { cat: "öğrenme", level: "a2", frame: "Πώς λέγεται… στα ελληνικά;", eg: "Πώς λέγεται «kitap» στα ελληνικά;", tr: "Yunancası ne?" },
  { cat: "öğrenme", level: "a2", frame: "Δεν καταλαβαίνω καλά", eg: "Δεν καταλαβαίνω καλά ακόμα.", tr: "İyi anlamıyorum" },
  { cat: "öğrenme", level: "a2", frame: "Μιλάτε πιο αργά, παρακαλώ", eg: "Μιλάτε πιο αργά, παρακαλώ.", tr: "Daha yavaş konuşun" },
  { cat: "öğrenme", level: "b1", frame: "Κάνω λάθος / Έκανα λάθος", eg: "Έκανα λάθος.", tr: "Hata yaptım" },
  { cat: "öğrenme", level: "b1", frame: "Θέλω να βελτιώσω τα…", eg: "Θέλω να βελτιώσω τα ελληνικά μου.", tr: "…mı geliştirmek istiyorum" },

  // sosyal plan
  { cat: "sosyal", level: "a2", frame: "Πάμε για καφέ;", eg: "Πάμε για καφέ;", tr: "Kahveye gidelim mi?" },
  { cat: "sosyal", level: "a2", frame: "Τι ώρα βολεύει;", eg: "Τι ώρα βολεύει;", tr: "Saat kaç uygun?" },
  { cat: "sosyal", level: "a2", frame: "Τα λέμε αύριο", eg: "Τα λέμε αύριο!", tr: "Yarın görüşürüz" },
  { cat: "sosyal", level: "b1", frame: "Αν θες, μπορούμε να…", eg: "Αν θες, μπορούμε να βγούμε.", tr: "İstersen …ebiliriz" },
  { cat: "sosyal", level: "b1", frame: "Δυστυχώς δεν μπορώ", eg: "Δυστυχώς δεν μπορώ απόψε.", tr: "Maalesef yapamam" },
  { cat: "sosyal", level: "b1", frame: "Χάρηκα που σε γνώρισα", eg: "Χάρηκα που σε γνώρισα.", tr: "Tanıştığıma memnun oldum" },

  // ev / günlük
  { cat: "ev", level: "a1", frame: "Πού είναι τα κλειδιά;", eg: "Πού είναι τα κλειδιά;", tr: "Anahtarlar nerede?" },
  { cat: "ev", level: "a2", frame: "Άναψε / Σβήσε το φως", eg: "Άναψε το φως, παρακαλώ.", tr: "Işığı aç/kapa" },
  { cat: "ev", level: "a2", frame: "Κλείσε την πόρτα", eg: "Κλείσε την πόρτα.", tr: "Kapıyı kapat" },
  { cat: "ev", level: "a2", frame: "Το σπίτι είναι ακατάστατο", eg: "Το σπίτι είναι ακατάστατο.", tr: "Ev dağınık" },
  { cat: "ev", level: "b1", frame: "Πρέπει να καθαρίσω…", eg: "Πρέπει να καθαρίσω την κουζίνα.", tr: "… temizlemeliyim" },

  // para / banka
  { cat: "para", level: "a2", frame: "Δεν έχω μετρητά", eg: "Δεν έχω μετρητά πάνω μου.", tr: "Nakitim yok" },
  { cat: "para", level: "a2", frame: "Είναι ακριβό / φθηνό", eg: "Είναι πολύ ακριβό.", tr: "Pahalı / ucuz" },
  { cat: "para", level: "b1", frame: "Θέλω να κάνω ανάληψη", eg: "Θέλω να κάνω ανάληψη.", tr: "Para çekmek istiyorum" },
  { cat: "para", level: "b1", frame: "Ποιο είναι το υπόλοιπο;", eg: "Ποιο είναι το υπόλοιπο;", tr: "Bakiye ne?" },

  // izin / nezaket ekstra
  { cat: "nezaket", level: "a2", frame: "Με συγχωρείτε", eg: "Με συγχωρείτε, πού είναι…;", tr: "Affedersiniz" },
  { cat: "nezaket", level: "a2", frame: "Αν δεν σας πειράζει…", eg: "Αν δεν σας πειράζει, θα κάτσω εδώ.", tr: "Zahmet olmazsa" },
  { cat: "nezaket", level: "b1", frame: "Σας ευχαριστώ πάρα πολύ", eg: "Σας ευχαριστώ πάρα πολύ.", tr: "Çok teşekkürler" },
  { cat: "nezaket", level: "b1", frame: "Ζητώ συγγνώμη για…", eg: "Ζητώ συγγνώμη για την καθυστέρηση.", tr: "… için özür dilerim" },
  { cat: "nezaket", level: "b2", frame: "Θα εκτιμούσα αν…", eg: "Θα εκτιμούσα αν απαντούσατε.", tr: "… takdir ederim" },

  // zaman ince
  { cat: "zaman+", level: "b1", frame: "Μόλις + aorist", eg: "Μόλις έφτασα.", tr: "Az önce …dim / …ince" },
  { cat: "zaman+", level: "b1", frame: "Εδώ και + süre", eg: "Μένω εδώ και δύο χρόνια.", tr: "…dır …dir" },
  { cat: "zaman+", level: "b1", frame: "Πια / πλέον + olumsuz", eg: "Δεν μένω πια εκεί.", tr: "Artık … değil" },
  { cat: "zaman+", level: "b2", frame: "Όσο πιο… τόσο πιο…", eg: "Όσο πιο πολύ διαβάζω, τόσο πιο καλά καταλαβαίνω.", tr: "Ne kadar … o kadar …" },
  { cat: "zaman+", level: "b2", frame: "Εν τω μεταξύ…", eg: "Εν τω μεταξύ, διάβασε αυτό.", tr: "Bu arada" },

  // YDS / C1 ekstra
  { cat: "yds", level: "b2", frame: "Το κύριο συμπέρασμα είναι ότι…", eg: "Το κύριο συμπέρασμα είναι ότι…", tr: "Ana sonuç şudur ki" },
  { cat: "yds", level: "b2", frame: "Ο συγγραφέας ισχυρίζεται ότι…", eg: "Ο συγγραφέας ισχυρίζεται ότι…", tr: "Yazar iddia ediyor ki" },
  { cat: "yds", level: "c1", frame: "Παρά το γεγονός ότι…", eg: "Παρά το γεγονός ότι είναι δύσκολο…", tr: "… olmasına rağmen" },
  { cat: "yds", level: "c1", frame: "Αναμφίβολα…", eg: "Αναμφίβολα παίζει ρόλο.", tr: "Şüphesiz" },
  { cat: "yds", level: "c1", frame: "Ως εκ τούτου…", eg: "Ως εκ τούτου πρέπει να…", tr: "Bundan dolayı" },
  { cat: "yds", level: "c1", frame: "Δεδομένου ότι…", eg: "Δεδομένου ότι ο χρόνος είναι λίγος…", tr: "… göz önüne alınırsa" },
  { cat: "yds", level: "c1", frame: "Σε μεγάλο βαθμό…", eg: "Σε μεγάλο βαθμό εξαρτάται από…", tr: "Büyük ölçüde" },
  { cat: "yds", level: "c1", frame: "Δεν πρέπει να παραβλέψουμε ότι…", eg: "Δεν πρέπει να παραβλέψουμε ότι…", tr: "Göz ardı etmemeliyiz ki" },

  // tartışma
  { cat: "tartışma", level: "b2", frame: "Συμφωνώ απόλυτα", eg: "Συμφωνώ απόλυτα μαζί σου.", tr: "Tamamen katılıyorum" },
  { cat: "tartışma", level: "b2", frame: "Διαφωνώ επειδή…", eg: "Διαφωνώ επειδή δεν είναι πρακτικό.", tr: "Katılmıyorum çünkü" },
  { cat: "tartışma", level: "b2", frame: "Από τη μία… από την άλλη…", eg: "Από τη μία θέλω… από την άλλη…", tr: "Bir yandan… öte yandan…" },
  { cat: "tartışma", level: "c1", frame: "Το επιχείρημα αυτό βασίζεται σε…", eg: "Το επιχείρημα βασίζεται σε δεδομένα.", tr: "Argüman …ye dayanıyor" },
  { cat: "tartışma", level: "c1", frame: "Ας εξετάσουμε το εξής…", eg: "Ας εξετάσουμε το εξής παράδειγμα.", tr: "Şunu inceleyelim" },

  // fiil aspect mini kalıp
  { cat: "aspect", level: "b1", frame: "Θέλω να + aorist (bir kez)", eg: "Θέλω να σου γράψω.", tr: "bir kez …mek istiyorum" },
  { cat: "aspect", level: "b1", frame: "Θέλω να + present (süre)", eg: "Θέλω να γράφω καλύτερα.", tr: "sürekli …mek istiyorum" },
  { cat: "aspect", level: "b1", frame: "Χθες + aorist", eg: "Χθες διάβασα ένα κεφάλαιο.", tr: "Dün (bitmiş)" },
  { cat: "aspect", level: "b1", frame: "Παλιά + imperfect", eg: "Παλιά διάβαζα πολύ.", tr: "Eskiden (alışkanlık)" },

  // miktar
  { cat: "miktar", level: "a1", frame: "λίγο / πολύ / αρκετά", eg: "Θέλω λίγο νερό.", tr: "az / çok / epey" },
  { cat: "miktar", level: "a2", frame: "ένα κιλό / μισό κιλό + …", eg: "Θέλω ένα κιλό μήλα.", tr: "bir kilo …" },
  { cat: "miktar", level: "a2", frame: "Πόσα/Πόσες/Πόσοι…;", eg: "Πόσα άτομα είστε;", tr: "Kaç …?" },
  { cat: "miktar", level: "b1", frame: "όλο και πιο…", eg: "Γίνεται όλο και πιο δύσκολο.", tr: "gitgide daha …" },

  // internet
  { cat: "dijital", level: "a2", frame: "Δεν έχει internet / σύνδεση", eg: "Δεν έχει σύνδεση εδώ.", tr: "Bağlantı yok" },
  { cat: "dijital", level: "b1", frame: "Στείλε μου τον σύνδεσμο", eg: "Στείλε μου τον σύνδεσμο.", tr: "Linki gönder" },
  { cat: "dijital", level: "b1", frame: "Κατέβασε / ανέβασε το αρχείο", eg: "Κατέβασε το αρχείο.", tr: "İndir / yükle" },
  { cat: "dijital", level: "b1", frame: "Ξέχασα τον κωδικό", eg: "Ξέχασα τον κωδικό μου.", tr: "Şifremi unuttum" }
];

(function applyPatternsExtra() {
  if (typeof PATTERNS === "undefined") return;
  PATTERNS.bank = PATTERNS.bank.concat(PATTERNS_EXTRA);
  // typos in cat names from tartışμα -> tartışma already mixed; normalize
  PATTERNS.bank.forEach((p) => {
    if (p.cat === "tartışμα") p.cat = "tartışma";
  });

  if (typeof CURRICULUM !== "undefined") {
    const c1 = CURRICULUM.levels.find((l) => l.id === "c1");
    const unit = {
      id: "c1-u6",
      title: "Cümle Kalıpları IV",
      focus: "YDS · tartışma · C1 bağlar",
      tasks: [
        { id: "c1-u6-t1", title: "YDS kalıp seti", detail: "Παρά το γεγονός ότι, Δεδομένου ότι, Ως εκ τούτου…", minutes: 30, type: "study" },
        { id: "c1-u6-t2", title: "Tartışma kalıpları", detail: "Από τη μία… · Συμφωνώ · Διαφωνώ…", minutes: 25, type: "speak" },
        { id: "c1-u6-t3", title: "300 kelimelik kalıp denemesi", detail: "En az 12 ileri kalıp kullan.", minutes: 45, type: "write" }
      ]
    };
    if (c1 && !c1.units.some((u) => u.id === unit.id)) c1.units.push(unit);
  }

  if (typeof LESSONS !== "undefined") {
    LESSONS["c1-u6-t1"] = {
      goal: "İleri YDS/akademik kalıpları aktifleştirmek.",
      theory: [
        "Παρά το γεγονός ότι… Δεδομένου ότι… Ως εκ τούτου… Αναμφίβολα… Σε μεγάλο βαθμό…",
        "Kalıp antrenmanında C1/YDS örneklerini seçerek tekrarla."
      ],
      examples: PATTERNS_EXTRA.filter((p) => p.cat === "yds").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Kalıp antrenmanı 3 tur.", "Her YDS kalıbına 1 cümle.", "Cloze 1 set."],
      practice: ["Aynı fikri 3 farklı kalıpla yaz."],
      check: ["8 ileri kalıp ezber mi?"],
      train: "pattern"
    };
    LESSONS["c1-u6-t2"] = {
      goal: "Tartışmada yapılandırılmış kalıp kullanmak.",
      theory: ["Από τη μία… από την άλλη… Συμφωνώ/Διαφωνώ επειδή… Ας εξετάσουμε…"],
      examples: PATTERNS_EXTRA.filter((p) => p.cat === "tartışma" || p.cat === "tartışμα").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["2 dk lehte + 2 dk aleyhte.", "Kalıp say (≥6).", "Kaydet."],
      practice: ["Kalıp antrenmanı."],
      check: ["Her iki taraf da kalıplı mı?"],
      train: "pattern"
    };
    LESSONS["c1-u6-t3"] = {
      goal: "300 kelimede ≥12 ileri kalıp.",
      theory: ["Görüş + akademik + karşıtlık karışımı. Tekrarlayan kalıptan kaçın."],
      examples: [
        { el: "Κατά τη γνώμη μου…", tr: "görüş" },
        { el: "Παρά το γεγονός ότι…", tr: "rağmen" },
        { el: "Συμπερασματικά…", tr: "sonuç" }
      ],
      steps: ["300 kelime yaz.", "Kalıpları listele.", "Zayıf olanı güçlendir."],
      practice: ["Bir paragrafı yeniden yaz."],
      check: ["12+ kalıp var mı?"],
      train: "pattern"
    };
  }

  if (typeof TRAINERS !== "undefined") {
    TRAINERS.tips = TRAINERS.tips.concat([
      "Kalıp bankası genişledi: telefon, seyahat, YDS, tartışma… kategorilere bak.",
      "Aynı anlamı 2–3 kalıpla söyle — esneklik kazanırsın."
    ]);
    TRAINERS.badges = (TRAINERS.badges || []).concat([
      { id: "pattern50", title: "Kalıp avcısı", desc: "50 kalıp turu", check: (s) => ((s.trainerStats || {}).pattern || 0) >= 50 },
      { id: "patternfill20", title: "Kalıp yazarı", desc: "20 kalıp doldur", check: (s) => ((s.trainerStats || {}).patternfill || 0) >= 20 }
    ]);
  }
})();
