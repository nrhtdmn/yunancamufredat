/* Kelime bankası + teşhis + dilbilgisi notları */
const CONTENT = {
  decks: {
    a0: [
      { el: "καλημέρα", tr: "günaydın", tip: "sabah–öğlen selamı" },
      { el: "καλησπέρα", tr: "iyi akşamlar", tip: "öğleden sonra / akşam" },
      { el: "ευχαριστώ", tr: "teşekkür ederim", tip: "efsariSTO" },
      { el: "παρακαλώ", tr: "lütfen / rica ederim", tip: "çift yönlü" },
      { el: "ναι", tr: "evet", tip: "" },
      { el: "όχι", tr: "hayır", tip: "" },
      { el: "νερό", tr: "su", tip: "nötr: το νερό" },
      { el: "ψωμί", tr: "ekmek", tip: "το ψωμί" },
      { el: "φίλος", tr: "arkadaş (e)", tip: "ο φίλος" },
      { el: "φίλη", tr: "arkadaş (k)", tip: "η φίλη" },
      { el: "όνομα", tr: "ad / isim", tip: "το όνομα" },
      { el: "αριθμός", tr: "sayı / numara", tip: "" }
    ],
    a1: [
      { el: "είμαι", tr: "benim / -im (olmak)", tip: "είμαι, είσαι, είναι…" },
      { el: "έχω", tr: "sahip olmak", tip: "έχω, έχεις, έχει…" },
      { el: "θέλω", tr: "istemek", tip: "Θέλω έναν καφέ." },
      { el: "πάω", tr: "gitmek", tip: "düzensiz çekim" },
      { el: "έρχομαι", tr: "gelmek", tip: "orta çatı" },
      { el: "διαβάζω", tr: "okumak", tip: "" },
      { el: "γράφω", tr: "yazmak", tip: "" },
      { el: "μιλάω", tr: "konuşmak", tip: "B tipi: μιλάω/μιλώ" },
      { el: "τρώω", tr: "yemek (fiil)", tip: "" },
      { el: "πίνω", tr: "içmek", tip: "" },
      { el: "σήμερα", tr: "bugün", tip: "" },
      { el: "αύριο", tr: "yarın", tip: "" },
      { el: "χθες", tr: "dün", tip: "" },
      { el: "δουλειά", tr: "iş / çalışma", tip: "η δουλειά" },
      { el: "σπίτι", tr: "ev", tip: "το σπίτι" },
      { el: "χρόνος", tr: "zaman / yıl", tip: "" },
      { el: "πρωί", tr: "sabah", tip: "" },
      { el: "βράδυ", tr: "akşam / gece", tip: "" }
    ],
    a2: [
      { el: "πήγα", tr: "gittim", tip: "aorist ← πάω" },
      { el: "ήρθα", tr: "geldim", tip: "aorist ← έρχομαι" },
      { el: "είδα", tr: "gördüm", tip: "aorist ← βλέπω" },
      { el: "είπα", tr: "söyledim", tip: "aorist ← λέω" },
      { el: "έφαγα", tr: "yedim", tip: "aorist ← τρώω" },
      { el: "έκανα", tr: "yaptım", tip: "aorist ← κάνω" },
      { el: "ήθελα", tr: "istiyordum / isterdim", tip: "imperfect / nazik" },
      { el: "θα πάω", tr: "gideceğim", tip: "gelecek: θα +" },
      { el: "γιατί", tr: "çünkü / neden", tip: "" },
      { el: "όταν", tr: "…dığında / when", tip: "" },
      { el: "αλλά", tr: "ama", tip: "" },
      { el: "πρέπει", tr: "gerek / lazım", tip: "πρέπει να…" },
      { el: "μπορώ", tr: "yapabilmek", tip: "μπορώ να…" },
      { el: "ταξίδι", tr: "seyahat", tip: "το ταξίδι" },
      { el: "ραντεβού", tr: "randevu", tip: "" },
      { el: "πρόβλημα", tr: "sorun", tip: "το πρόβλημα" }
    ],
    b1: [
      { el: "αν και", tr: "rağmen", tip: "" },
      { el: "ώστε", tr: "öyle ki / amacıyla", tip: "" },
      { el: "παρόλο που", tr: "olmasına rağmen", tip: "" },
      { el: "σκέφτομαι", tr: "düşünmek", tip: "orta çatı" },
      { el: "θυμάμαι", tr: "hatırlamak", tip: "" },
      { el: "φοβάμαι", tr: "korkmak", tip: "" },
      { el: "αποφασίζω", tr: "karar vermek", tip: "" },
      { el: "συμβαίνει", tr: "oluyor / meydana geliyor", tip: "" },
      { el: "περιβάλλον", tr: "çevre", tip: "το περιβάλλον" },
      { el: "υγεία", tr: "sağlık", tip: "η υγεία" },
      { el: "εκπαίδευση", tr: "eğitim", tip: "" },
      { el: "εργασία", tr: "çalışma / iş (resmi)", tip: "" },
      { el: "κοινωνία", tr: "toplum", tip: "" },
      { el: "ανάπτυξη", tr: "gelişme / büyüme", tip: "" },
      { el: "ευκαιρία", tr: "fırsat", tip: "" },
      { el: "αποτέλεσμα", tr: "sonuç", tip: "" }
    ],
    b2: [
      { el: "εντούτοις", tr: "yine de / ancak", tip: "akademik bağlayıcı" },
      { el: "συνεπώς", tr: "dolayısıyla", tip: "" },
      { el: "ωστόσο", tr: "buna karşın", tip: "" },
      { el: "αναμφίβολα", tr: "kuşkusuz", tip: "" },
      { el: "ιδιαιτέρως", tr: "özellikle", tip: "" },
      { el: "επιπτώσεις", tr: "etkiler / sonuçlar", tip: "οι επιπτώσεις" },
      { el: "κριτήριο", tr: "ölçüt", tip: "" },
      { el: "υπόθεση", tr: "varsayım / dava", tip: "" },
      { el: "συμπεριφορά", tr: "davranış", tip: "" },
      { el: "προοπτική", tr: "perspektif / görünüm", tip: "" },
      { el: "αξιολογώ", tr: "değerlendirmek", tip: "" },
      { el: "υποστηρίζω", tr: "desteklemek", tip: "" },
      { el: "αμφισβητώ", tr: "sorgulamak", tip: "" },
      { el: "συμπέρασμα", tr: "sonuç (çıkarım)", tip: "" },
      { el: "έρευνα", tr: "araştırma", tip: "" },
      { el: "δεδομένα", tr: "veriler", tip: "τα δεδομένα" }
    ],
    c1: [
      { el: "αξιοσημείωτος", tr: "dikkate değer", tip: "" },
      { el: "αμφιλεγόμενος", tr: "tartışmalı", tip: "" },
      { el: "καταλύτης", tr: "katalizör", tip: "" },
      { el: "παράμετρος", tr: "parametre", tip: "" },
      { el: "συνάφεια", tr: "alaka / bağlantı", tip: "" },
      { el: "εμπεριστατωμένος", tr: "derinlemesine / sağlam temelli", tip: "" },
      { el: "ρητορική", tr: "retorik", tip: "" },
      { el: "ιδεολογία", tr: "ideoloji", tip: "" },
      { el: "διαφάνεια", tr: "şeffaflık", tip: "" },
      { el: "βιωσιμότητα", tr: "sürdürülebilirlik", tip: "" },
      { el: "αλληλεπίδραση", tr: "etkileşim", tip: "" },
      { el: "προκατάληψη", tr: "önyargı", tip: "" }
    ],
    c2: [
      { el: "φιλότιμο", tr: "onur / gönüllü fedakârlık duygusu", tip: "kültürel kavram" },
      { el: "μεράκι", tr: "tutkuyla işine verme", tip: "kültürel" },
      { el: "κενό γράμμα", tr: "ölü mektup / boş formalite", tip: "deyim" },
      { el: "χάνω τα νερά μου", tr: "şaşırıp bocalamak", tip: "deyim" },
      { el: "βγάζω άκρη", tr: "anlam çıkarmak / çözmek", tip: "deyim" },
      { el: "ρίχνω λάδι στη φωτιά", tr: "yangına körükle gitmek", tip: "deyim" },
      { el: "έχει ψωμί", tr: "uzun sürer / çok iş var", tip: "deyim" },
      { el: "τα βρίσκω", tr: "anlaşmak / uzlaşmak", tip: "deyim" }
    ],
    yds: [
      { el: "σημασία", tr: "önem / anlam", tip: "YDS sıklık" },
      { el: "σκοπός", tr: "amaç", tip: "" },
      { el: "μέθοδος", tr: "yöntem", tip: "" },
      { el: "παράγοντας", tr: "faktör", tip: "" },
      { el: "διαδικασία", tr: "süreç", tip: "" },
      { el: "αναφέρω", tr: "bahsetmek / anmak", tip: "" },
      { el: "υποδεικνύω", tr: "işaret etmek / göstermek", tip: "" },
      { el: "συνίσταται σε", tr: "…den oluşur", tip: "kalıp" },
      { el: "όσον αφορά", tr: "…ile ilgili olarak", tip: "kalıp" },
      { el: "σε αντίθεση με", tr: "…nın aksine", tip: "kalıp" },
      { el: "λαμβάνω υπόψη", tr: "dikkate almak", tip: "kalıp" },
      { el: "κατά συνέπεια", tr: "sonuç olarak", tip: "kalıp" }
    ]
  },

  grammar: {
    a0: [
      { t: "Alfabe", b: "24 harf. Sesli: α ε η ι ο υ ω. İkililer: αι=e, ει/οι=i, ου=u, αυ/ευ bağlamda af-av / ef-ev." },
      { t: "Aksan", b: "Her kelimede bir vurgu (τόνος). Yanlış vurgu anlamı bozabilir." }
    ],
    a1: [
      { t: "Madde", b: "ο / η / το (belirli), ένας / μία / ένα (belirsiz). İsim cinsiyeti ezber işidir." },
      { t: "Ενεστώτας", b: "Şimdiki zaman: γραφω tipi ve μιλάω tipi ayrı çekilir. Olumsuz: δεν + fiil." }
    ],
    a2: [
      { t: "Αόριστος vs Παρατατικός", b: "Aorist = tamamlanmış olay (διάβασα). Imperfect = süre/alışkanlık (διάβαζα)." },
      { t: "Θα", b: "Gelecek: θα + fiil. Nazik istek: Θα ήθελα…" }
    ],
    b1: [
      { t: "να + fiil", b: "Υποτακτική: Θέλω να μάθω. Aspect: να γράψω (bir kez) / να γράφω (sürekli)." },
      { t: "Koşul", b: "Αν + gerçek gelecek; Αν + imperfect → θα + imperfect (hayali)." }
    ],
    b2: [
      { t: "Παρακείμενος", b: "έχω + aparemphato (έχω γράψει): geçmişin şimdiki sonucu." },
      { t: "Dolaylı anlatım", b: "Είπε ότι… · Ρώτησε αν… · Μου είπε να…" }
    ],
    c1: [
      { t: "Register", b: "Samimi ↔ resmi kelime seçimi YDS ve akademik yazıda kritik." },
      { t: "Bağlayıcılar", b: "εντούτοις, συνεπώς, ωστόσο, ιδιαιτέρως — paragraf akışı." }
    ],
    c2: [
      { t: "Nüans", b: "Deyim, ironi, üslup yoğunluğu. Aynı fikri üç register’de yazmayı pratik et." }
    ],
    c2plus: [
      { t: "YDS", b: "Önce ana fikir, sonra soru. Cloze’da yapı + kolokasyon. Her yanlışa otopsi." }
    ]
  },

  diagnostic: [
    { q: "«Καλημέρα» ne demek?", options: ["İyi geceler", "Günaydın", "Teşekkürler", "Lütfen"], a: 1, level: "a0" },
    { q: "το νερό — madde hangi cinsiyet?", options: ["Eril", "Dişil", "Nötr", "Çoğul"], a: 2, level: "a0" },
    { q: "«Είμαι από την Τουρκία» doğru mu?", options: ["Evet", "Hayır — από το gerekir", "Hayır — είμαι yok", "Sadece yazıda"], a: 0, level: "a1" },
    { q: "Θέλω ___ καφέ. Boşluk?", options: ["έναν", "μία", "τοις", "των"], a: 0, level: "a1" },
    { q: "γράφω fiilinin 2. tekil şimdiki hali?", options: ["γράφεις", "γράφει", "γράψω", "έγραψες"], a: 0, level: "a1" },
    { q: "«Χθες διάβασα ένα βιβλίο» zamanı?", options: ["Şimdiki", "Aorist", "Gelecek", "Perfect"], a: 1, level: "a2" },
    { q: "«Παλιά διάβαζα πολύ» neden imperfect?", options: ["Tek olay", "Alışkanlık / süre", "Emir", "Pasif"], a: 1, level: "a2" },
    { q: "Θα πάω αύριο — anlam?", options: ["Dün gittim", "Gidiyorum (şimdi)", "Yarın gideceğim", "Gitmeliyim"], a: 2, level: "a2" },
    { q: "Θέλω να μάθω ελληνικά — να ne?", options: ["Madde", "Subjunctive bağlayıcı", "Geçmiş eki", "Soru sözcüğü"], a: 1, level: "b1" },
    { q: "Αν είχα χρόνο, θα ερχόμουν — tip?", options: ["Gerçek koşul", "Hayali / karşıolgusal", "Emir", "Pasif"], a: 1, level: "b1" },
    { q: "λέγεται bu yapıda ne?", options: ["Emir", "Pasif / orta şimdiki", "Aorist", "İsim"], a: 1, level: "b1" },
    { q: "έχω γράψει zamanı?", options: ["Aorist", "Imperfect", "Parakeimenos (perfect)", "Gelecek"], a: 2, level: "b2" },
    { q: "«εντούτοις» en yakın anlam?", options: ["Çünkü", "Yine de / ancak", "Önce", "Belki"], a: 1, level: "b2" },
    { q: "YDS paragraf sorusunda ilk adım?", options: ["Seçenekleri ezberle", "Ana fikri yakala", "Her kelimeyi çevir", "Süre yok say"], a: 1, level: "b2" },
    { q: "Resmi üslupta «γεια» yerine daha uygun?", options: ["χαίρετε / καλημέρα", "ρε", "μωρέ", "τάδε"], a: 0, level: "c1" },
    { q: "φιλότιμο neyi anlatır?", options: ["Sadece para", "Onur / gönüllü fedakârlık duygusu", "Spor", "Yemek"], a: 1, level: "c2" }
  ],

  levelFromScore(correct, total) {
    const r = correct / total;
    if (r < 0.2) return "a0";
    if (r < 0.35) return "a1";
    if (r < 0.5) return "a2";
    if (r < 0.65) return "b1";
    if (r < 0.8) return "b2";
    if (r < 0.9) return "c1";
    return "c2";
  }
};
