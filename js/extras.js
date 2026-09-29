/* Ek içerik paketi — müfredat birimleri, kelime, YDS, diyalog */
const EXTRAS = {
  units: {
    a0: [
      {
        id: "a0-u3",
        title: "Okuma Akışı",
        focus: "Heceleme, aksanlı okuma",
        tasks: [
          { id: "a0-u3-t1", title: "50 kelime yüksek ses", detail: "Kart destesinden 50 kelimeyi aksanla oku, kaydet.", minutes: 25, type: "speak" },
          { id: "a0-u3-t2", title: "Minimal çiftler", detail: "πόλη/πολύ, καλό/καλώ, φίλος/φύλλο — farkı duy.", minutes: 20, type: "listen" },
          { id: "a0-u3-t3", title: "El yazısı sayfası", detail: "Alfabe + 20 kelimeyi el yazısıyla yaz.", minutes: 20, type: "practice" }
        ]
      }
    ],
    a1: [
      {
        id: "a1-u5",
        title: "Zamirler & Soru",
        focus: "εγώ/εσύ · τι/πού/πότε",
        tasks: [
          { id: "a1-u5-t1", title: "Kişi zamirleri", detail: "εγώ εσύ αυτός… cümlede kullan. 12 örnek.", minutes: 20, type: "study" },
          { id: "a1-u5-t2", title: "Soru sözcükleri", detail: "τι, ποιος, πού, πότε, γιατί, πώς. Mini röportaj yap.", minutes: 25, type: "speak" },
          { id: "a1-u5-t3", title: "Sahip zamirleri", detail: "μου/σου/του… «Το βιβλίο μου.» 15 cümle.", minutes: 20, type: "practice" }
        ]
      },
      {
        id: "a1-u6",
        title: "Zaman İfadeleri",
        focus: "bugün, her gün, haftanın günleri",
        tasks: [
          { id: "a1-u6-t1", title: "Haftanın günleri", detail: "Δευτέρα… Κυριακή ezber + cümle.", minutes: 15, type: "vocab" },
          { id: "a1-u6-t2", title: "Sıklık zarfları", detail: "πάντα, συχνά, μερικές φορές, ποτέ. Rutin anlat.", minutes: 20, type: "speak" },
          { id: "a1-u6-t3", title: "Saat söyleme", detail: "Τι ώρα είναι; Antrenman: Saatler.", minutes: 20, type: "practice" }
        ]
      }
    ],
    a2: [
      {
        id: "a2-u5",
        title: "Nesne Zamirleri",
        focus: "με/σε/τον/την/το",
        tasks: [
          { id: "a2-u5-t1", title: "Doğrudan nesne", detail: "Τον βλέπω · Την ξέρω · Το θέλω. Tablo + 20 cümle.", minutes: 30, type: "study" },
          { id: "a2-u5-t2", title: "Çift zamir giriş", detail: "Μου το δίνει. Basit örnekler ezberle.", minutes: 25, type: "practice" },
          { id: "a2-u5-t3", title: "Diyalog: sipariş", detail: "Garson diyaloğunda zamir kullan.", minutes: 20, type: "speak" }
        ]
      }
    ],
    b1: [
      {
        id: "b1-u5",
        title: "Göreli Cümleler",
        focus: "που / ο οποίος",
        tasks: [
          { id: "b1-u5-t1", title: "που kullanımı", detail: "Ο άνθρωπος που… 15 cümle yaz.", minutes: 30, type: "study" },
          { id: "b1-u5-t2", title: "Tanımlayıcı vs ek bilgi", detail: "Virgül farkını örneklerle göster.", minutes: 25, type: "practice" },
          { id: "b1-u5-t3", title: "Kişi tanıt", detail: "3 kişiyi που ile uzun cümlede anlat.", minutes: 20, type: "speak" }
        ]
      }
    ],
    b2: [
      {
        id: "b2-u5",
        title: "Argüman Yapısı",
        focus: "tez – gerekçe – örnek – sonuç",
        tasks: [
          { id: "b2-u5-t1", title: "Kalıp bankası", detail: "Κατά τη γνώμη μου… · Για παράδειγμα… · Συμπερασματικά…", minutes: 25, type: "vocab" },
          { id: "b2-u5-t2", title: "300 kelimelik görüş", detail: "Teknoloji veya eğitim konusunda yapılandırılmış yazı.", minutes: 50, type: "write" },
          { id: "b2-u5-t3", title: "Sözlü savunma", detail: "Aynı tezi 3 dk konuş, kaydet.", minutes: 25, type: "speak" }
        ]
      }
    ],
    c1: [
      {
        id: "c1-u5",
        title: "Söylem Bağları",
        focus: "metin tutarlılığı",
        tasks: [
          { id: "c1-u5-t1", title: "40 bağlayıcı", detail: "Karşıtlık, neden-sonuç, ekleme, örnekleme listesi.", minutes: 40, type: "vocab" },
          { id: "c1-u5-t2", title: "Paragraf yeniden yaz", detail: "Zayıf bir paragrafı akademik üsluba çevir.", minutes: 35, type: "write" },
          { id: "c1-u5-t3", title: "Editör gözü", detail: "Eski yazından 5 bağlayıcı hatası bul ve düzelt.", minutes: 25, type: "review" }
        ]
      }
    ]
  },

  vocab: {
    a1: [
      { el: "πρωί", tr: "sabah", tip: "" },
      { el: "μεσημέρι", tr: "öğlen", tip: "" },
      { el: "απόγευμα", tr: "öğleden sonra", tip: "" },
      { el: "εβδομάδα", tr: "hafta", tip: "" },
      { el: "μήνας", tr: "ay", tip: "" },
      { el: "χρόνος", tr: "yıl / zaman", tip: "" },
      { el: "καιρός", tr: "hava / zaman", tip: "" },
      { el: "ζεστός", tr: "sıcak", tip: "" },
      { el: "κρύος", tr: "soğuk", tip: "" },
      { el: "ωραίος", tr: "güzel", tip: "" }
    ],
    a2: [
      { el: "ξυπνάω", tr: "uyanmak", tip: "" },
      { el: "κοιμάμαι", tr: "uyumak", tip: "" },
      { el: "ντύνομαι", tr: "giyinmek", tip: "" },
      { el: "πλένομαι", tr: "yıkanmak", tip: "" },
      { el: "μαγειρεύω", tr: "yemek pişirmek", tip: "" },
      { el: "καθαρίζω", tr: "temizlemek", tip: "" },
      { el: "ψωνίζω", tr: "alışveriş yapmak", tip: "" },
      { el: "ταξιδεύω", tr: "seyahat etmek", tip: "" }
    ],
    b1: [
      { el: "επιτυχία", tr: "başarı", tip: "" },
      { el: "αποτυχία", tr: "başarısızlık", tip: "" },
      { el: "προσπάθεια", tr: "çaba", tip: "" },
      { el: "στόχος", tr: "hedef", tip: "" },
      { el: "κίνητρο", tr: "motivasyon", tip: "" },
      { el: "συνήθεια", tr: "alışkanlık", tip: "" },
      { el: "πρόοδος", tr: "ilerleme", tip: "" },
      { el: "δυσκολία", tr: "zorluk", tip: "" }
    ],
    b2: [
      { el: "επιχείρημα", tr: "argüman", tip: "" },
      { el: "αντίθεση", tr: "karşıtlık", tip: "" },
      { el: "σύγκριση", tr: "karşılaştırma", tip: "" },
      { el: "τεκμήριο", tr: "kanıt", tip: "" },
      { el: "προϋπόθεση", tr: "ön koşul", tip: "" },
      { el: "συνέπεια", tr: "sonuç / tutarlılık", tip: "" },
      { el: "αμφιβολία", tr: "şüphe", tip: "" },
      { el: "βεβαιότητα", tr: "kesinlik", tip: "" }
    ],
    yds: [
      { el: "επιπτώσεις", tr: "etkiler", tip: "" },
      { el: "αναπόφευκτος", tr: "kaçınılmaz", tip: "" },
      { el: "ουσιώδης", tr: "esas / özsel", tip: "" },
      { el: "περιορισμένος", tr: "sınırlı", tip: "" },
      { el: "εκτενής", tr: "geniş / kapsamlı", tip: "" },
      { el: "αμφίβολος", tr: "şüpheli", tip: "" },
      { el: "προφανής", tr: "açık / bariz", tip: "" },
      { el: "σταδιακά", tr: "kademeli olarak", tip: "" },
      { el: "ουσιαστικά", tr: "aslında / özünde", tip: "" },
      { el: "ενδεχομένως", tr: "muhtemelen", tip: "" }
    ]
  },

  cloze: [
    { id: "clx1", text: "Ο άνθρωπος ___ μένει δίπλα μας είναι γιατρός.", options: ["που", "ποιος", "τι", "αν"], a: 0, why: "που = göreli zamir." },
    { id: "clx2", text: "___ μείνω σπίτι γιατί είμαι άρρωστος.", options: ["Θα", "Να", "Ας", "Μη"], a: 0, why: "Gelecek plan: θα." },
    { id: "clx3", text: "Μου ___ το βιβλίο χθες.", options: ["έδωσε", "δίνει", "θα δώσει", "να δώσει"], a: 0, why: "χθες → aorist." },
    { id: "clx4", text: "Δεν μπορώ να έρθω ___ έχω δουλειά.", options: ["γιατί", "αν και", "ώστε", "πριν"], a: 0, why: "γιατί = çünkü." },
    { id: "clx5", text: "Είναι πιο ___ από μένα.", options: ["ψηλός", "ψηλό", "ψηλά", "ύψος"], a: 0, why: "Karşılaştırma: πιο + sıfat." },
    { id: "clx6", text: "Πρέπει να ___ προσεκτικά πριν απαντήσεις.", options: ["διαβάσεις", "διαβάζεις", "διάβασες", "θα διαβάσεις"], a: 0, why: "να + aorist subjunctive (bir kez)." },
    { id: "clx7", text: "Το πρόβλημα ___ λύση.", options: ["χρειάζεται", "τρώει", "τρέχει", "γελάει"], a: 0, why: "χρειάζομαι = ihtiyaç duymak." },
    { id: "clx8", text: "___ τα αποτελέσματα, η μέθοδος είναι αποτελεσματική.", options: ["Σύμφωνα με", "Μέσα σε", "Πάνω από", "Κάτω από"], a: 0, why: "Σύμφωνα με = …e göre." }
  ],

  reading: [
    {
      id: "rdx1",
      passage:
        "Η καθημερινή επανάληψη μικρών δόσεων μάθησης αποδεικνύεται συχνά πιο αποτελεσματική από τις πολύωρες συνεδρίες της τελευταίας στιγμής. Ο εγκέφαλος χρειάζεται χρόνο για να εδραιώσει τη νέα γνώση.",
      q: "Yazar neyi savunuyor?",
      options: [
        "Son dakika uzun çalışma daha iyi",
        "Küçük dozda günlük tekrar daha etkili",
        "Beyin tekrara ihtiyaç duymaz",
        "Sadece sınav günü çalış"
      ],
      a: 1
    },
    {
      id: "rdx2",
      passage:
        "Στις εξετάσεις κατανόησης κειμένου, οι παγίδες συχνά βασίζονται σε λέξεις που εμφανίζονται στο κείμενο αλλά σε διαφορετικό πλαίσιο. Γι’ αυτό η κατανόηση της κεντρικής ιδέας προηγείται της επιλογής απάντησης.",
      q: "Tuzağın kaynağı nedir?",
      options: [
        "Metinde hiç geçmeyen kelimeler",
        "Farklı bağlamda geçen kelimeler",
        "Sadece dilbilgisi",
        "Yazım hataları"
      ],
      a: 1
    }
  ],

  pronouns: [
    { prompt: "Onu (eril) görüyorum", answer: "Τον βλέπω", options: ["Τον βλέπω", "Την βλέπω", "Το βλέπω", "Τους βλέπω"] },
    { prompt: "Onu (dişil) tanıyorum", answer: "Την ξέρω", options: ["Την ξέρω", "Τον ξέρω", "Το ξέρω", "Τις ξέρω"] },
    { prompt: "Bana veriyor", answer: "Μου δίνει", options: ["Μου δίνει", "Με δίνει", "Σου δίνει", "Του δίνει"] },
    { prompt: "Seni bekliyorum", answer: "Σε περιμένω", options: ["Σε περιμένω", "Σου περιμένω", "Με περιμένω", "Τον περιμένω"] },
    { prompt: "Bizi çağırıyor", answer: "Μας φωνάζει", options: ["Μας φωνάζει", "Μας φωνάζουμε", "Σας φωνάζει", "Τους φωνάζει"] },
    { prompt: "Onlara söylüyorum", answer: "Τους λέω", options: ["Τους λέω", "Τον λέω", "Μας λέω", "Σας λέω"] }
  ],

  particles: [
    { tr: "Yarın gideceğim (gelecek)", options: ["Θα πάω", "Να πάω", "Ας πάω", "Μη πας"], a: 0, tip: "θα = gelecek" },
    { tr: "Gitmek istiyorum", options: ["Θέλω να πάω", "Θέλω θα πάω", "Θέλω ας πάω", "Θέλω μη πάω"], a: 0, tip: "να + fiil" },
    { tr: "Hadi gidelim", options: ["Ας πάμε", "Θα πάμε", "Να πάμε μόνο", "Μη πάμε"], a: 0, tip: "ας = öneri" },
    { tr: "Gitme!", options: ["Μην πας", "Θα πας", "Ας πας", "Να πας οπωσδήποτε"], a: 0, tip: "μη(ν) = olumsuz emir/istek" },
    { tr: "Okumalıyım", options: ["Πρέπει να διαβάσω", "Πρέπει θα διαβάσω", "Πρέπει ας διαβάσω", "Πρέπει μη διαβάσω"], a: 0, tip: "πρέπει να" },
    { tr: "Belki gelir", options: ["Ίσως να έρθει", "Ίσως θα να έρθει", "Ίσως ας έρθει", "Ίσως μη έρθει μόνο"], a: 0, tip: "ίσως να" }
  ],

  passive: [
    { active: "Ο Νίκος γράφει το γράμμα.", passive: "Το γράμμα γράφεται από τον Νίκο." },
    { active: "Η Μαρία ανοίγει την πόρτα.", passive: "Η πόρτα ανοίγεται από τη Μαρία." },
    { active: "Λένε ότι…", passive: "Λέγεται ότι…" },
    { active: "Κάποιος έκλεψε το ποδήλατο.", passive: "Το ποδήλατο κλάπηκε." },
    { active: "Χτίζουν ένα σχολείο.", passive: "Χτίζεται ένα σχολείο." },
    { active: "Δημοσίευσαν την έρευνα.", passive: "Η έρευνα δημοσιεύτηκε." }
  ],

  dialogues: [
    {
      id: "d1",
      title: "Καφετέρια",
      lines: [
        { sp: "Α", el: "Καλημέρα! Τι θα θέλατε;" },
        { sp: "Β", el: "Έναν καφέ και ένα νερό, παρακαλώ." },
        { sp: "Α", el: "Θέλετε ζάχαρη;" },
        { sp: "Β", el: "Όχι, σκέτο. Τον λογαριασμό στο τέλος." }
      ]
    },
    {
      id: "d2",
      title: "Οδικές οδηγίες",
      lines: [
        { sp: "Α", el: "Με συγχωρείτε, πού είναι ο σταθμός;" },
        { sp: "Β", el: "Πηγαίνετε ευθεία και μετά δεξιά." },
        { sp: "Α", el: "Είναι μακριά;" },
        { sp: "Β", el: "Όχι, πέντε λεπτά με τα πόδια." }
      ]
    },
    {
      id: "d3",
      title: "Στο γιατρό",
      lines: [
        { sp: "Α", el: "Τι συμβαίνει;" },
        { sp: "Β", el: "Πονάω το κεφάλι μου από χθες." },
        { sp: "Α", el: "Έχετε πυρετό;" },
        { sp: "Β", el: "Λίγο. Τι με συμβουλεύετε;" }
      ]
    }
  ],

  listenQuiz: [
    { say: "Θέλω έναν καφέ παρακαλώ", q: "Ne istedi?", options: ["Çay", "Kahve", "Su", "Hesap"], a: 1 },
    { say: "Αύριο θα πάω στην Αθήνα", q: "Ne zaman?", options: ["Dün", "Bugün", "Yarın", "Hiç"], a: 2 },
    { say: "Δεν καταλαβαίνω ελληνικά καλά", q: "Ne diyor?", options: ["İyi anlıyor", "İyi anlamıyor", "Konuşmuyor", "Yazıyor"], a: 1 },
    { say: "Το βιβλίο είναι πάνω στο τραπέζι", q: "Kitap nerede?", options: ["Altında", "Üstünde", "Yanında", "İçinde"], a: 1 },
    { say: "Χθες είδα τον φίλο μου", q: "Zaman?", options: ["Gelecek", "Şimdi", "Dün", "Her gün"], a: 2 },
    { say: "Πρέπει να διαβάσω για τις εξετάσεις", q: "Neden okumalı?", options: ["Tatil", "Sınavlar", "Yemek", "Uyku"], a: 1 }
  ]
};

(function applyExtras() {
  if (typeof CURRICULUM !== "undefined") {
    Object.keys(EXTRAS.units).forEach((levelId) => {
      const level = CURRICULUM.levels.find((l) => l.id === levelId);
      if (!level) return;
      EXTRAS.units[levelId].forEach((u) => {
        if (!level.units.some((x) => x.id === u.id)) level.units.push(u);
      });
    });
  }
  if (typeof CONTENT !== "undefined") {
    Object.keys(EXTRAS.vocab).forEach((deck) => {
      CONTENT.decks[deck] = (CONTENT.decks[deck] || []).concat(EXTRAS.vocab[deck]);
    });
  }
  if (typeof DRILLS !== "undefined") {
    DRILLS.cloze = DRILLS.cloze.concat(EXTRAS.cloze);
    DRILLS.reading = DRILLS.reading.concat(EXTRAS.reading);
  }
})();
