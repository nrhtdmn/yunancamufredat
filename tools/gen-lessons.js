/* Generates js/lessons.js — self-contained lessons for every curriculum task */
const fs = require("fs");
const path = require("path");

function L(goal, theory, examples, steps, practice, check, extra = {}) {
  return { goal, theory, examples, steps, practice, check, ...extra };
}
function ex(el, tr) {
  return { el, tr };
}

const LESSONS = {};

function add(id, lesson) {
  LESSONS[id] = lesson;
}

// ---- load A0 from previous gen if present, else redefine ----
try {
  Object.assign(LESSONS, JSON.parse(fs.readFileSync(path.join(__dirname, "../js/_lessons_part1.json"), "utf8")));
} catch (_) {}

// ========== A1 ==========
add(
  "a1-u1-t1",
  L(
    "İsim cinsiyetini ve ο/η/το maddesini kelimeyle birlikte ezberlemek.",
    [
      "Yunanca isimler eril (ο), dişil (η) veya nötr (το). Madde ismin kimliğidir — kelimeyi maddesiz ezberleme.",
      "Sık kalıplar: eril -ος/-ας/-ης (ο φίλος, ο άντρας, ο μαθητής); dişil -α/-η (η γυναίκα, η πόλη); nötr -ο/-ι/-μα (το βιβλίο, το παιδί, το πρόβλημα).",
      "İstisnalar vardır; gördüğün maddeyi doğru kabul et."
    ],
    [
      ex("ο άντρας", "adam"),
      ex("η γυναίκα", "kadın"),
      ex("το παιδί", "çocuk"),
      ex("ο καφές", "kahve"),
      ex("η πόλη", "şehir"),
      ex("το σπίτι", "ev"),
      ex("η μέρα", "gün"),
      ex("το νερό", "su")
    ],
    [
      "30 isim listesi çıkar: madde + isim + Türkçe.",
      "Antrenman: Madde (gender) — en az 15 tur.",
      "Yanlışları hata günlüğüne yaz."
    ],
    ["Her cinsten 5’er ismi ezbere maddeyle söyle."],
    ["Rastgele isimde ο/η/το’yu %90 doğru seçebiliyor musun?"],
    { train: "gender" }
  )
);

add(
  "a1-u1-t2",
  L(
    "Tekilden çoğula geçiş: οι / οι / τα ve sık çoğul kalıpları.",
    [
      "Maddeler: ο → οι, η → οι, το → τα.",
      "Örnekler: ο άντρας → οι άντρες; η γυναίκα → οι γυναίκες; το παιδί → τα παιδιά; το βιβλίο → τα βιβλία.",
      "Çoğul ekleri isim sınıfına göre değişir; ezber + antrenman."
    ],
    [
      ex("οι άντρες", "adamlar"),
      ex("οι γυναίκες", "kadınlar"),
      ex("τα παιδιά", "çocuklar"),
      ex("τα βιβλία", "kitaplar"),
      ex("οι φίλοι", "arkadaşlar"),
      ex("οι πόλεις", "şehirler")
    ],
    ["20 ismin çoğulunu yaz (maddeyle).", "Antrenman: Çoğul.", "Kartlarda çoğul formları not et."],
    ["10 tekil ver → çoğul söyle."],
    ["οι / τα seçimini karıştırmıyor musun?"],
    { train: "plural" }
  )
);

add(
  "a1-u1-t3",
  L(
    "Belirsiz madde ένας / μία / ένα ile istek ve tanıtım cümleleri.",
    [
      "Belirli: ο/η/το. Belirsiz: ένας (eril), μία/μια (dişil), ένα (nötr).",
      "Nesne halinde sık: έναν καφέ, μία μπύρα, ένα νερό.",
      "Θέλω έναν καφέ. / Έχω ένα αδέρφι."
    ],
    [
      ex("ένας άντρας", "bir adam"),
      ex("μία γυναίκα", "bir kadın"),
      ex("ένα παιδί", "bir çocuk"),
      ex("Θέλω έναν καφέ.", "Bir kahve istiyorum."),
      ex("Έχω μία ιδέα.", "Bir fikrim var.")
    ],
    ["10 sipariş cümlesi yaz (έναν/μία/ένα).", "Kafe diyaloğunda kullan.", "Scramble: cümle kur."],
    ["5 nesneyi belirsiz maddeyle söyle."],
    ["έναν ile ένα farkını örnekle açıklayabiliyor musun?"],
    { train: "scramble" }
  )
);

add(
  "a1-u2-t1",
  L(
    "είμαι çekimini ve olumsuzunu (δεν είμαι) otomatikleştirmek.",
    [
      "είμαι, είσαι, είναι, είμαστε, είστε, είναι.",
      "Olumsuz: δεν + fiil → Δεν είμαι γιατρός.",
      "Tanımlama: Είμαι φοιτητής. Yer: Είμαι στην Αθήνα."
    ],
    [
      ex("Είμαι από την Τουρκία.", "Türkiye’denim."),
      ex("Είσαι καλά;", "İyi misin?"),
      ex("Είναι δάσκαλος.", "O öğretmen."),
      ex("Δεν είμαι κουρασμένος.", "Yorgun değilim."),
      ex("Είμαστε φίλοι.", "Arkadaşız.")
    ],
    ["Tabloyu ezberle, boşluk doldur.", "12 cümle: 6 olumlu 6 olumsuz.", "Fiil antrenmanı."],
    ["6 kişiyi karışık sor → çekim söyle."],
    ["είναι’nin hem o hem onlar için olduğunu unutmuyor musun?"],
    { train: "verb" }
  )
);

add(
  "a1-u2-t2",
  L(
    "έχω çekimi + sahiplik / ilişki cümleleri.",
    [
      "έχω, έχεις, έχει, έχουμε, έχετε, έχουν.",
      "Έχω δύο αδέρφια. Έχει χρόνο; Δεν έχω χρήματα."
    ],
    [
      ex("Έχω ένα αυτοκίνητο.", "Bir arabam var."),
      ex("Έχεις αδέρφια;", "Kardeşlerin var mı?"),
      ex("Δεν έχω χρόνο.", "Zamanım yok."),
      ex("Έχουμε μάθημα.", "Dersimiz var.")
    ],
    ["15 cümle yaz (sahip ol / olmamak).", "Tanışma metnine έχω ekle."],
    ["Aileni έχω ile anlat (5 cümle)."],
    ["Çekimi ezbere yazabiliyor musun?"]
  )
);

add(
  "a1-u2-t3",
  L(
    "80–100 kelimelik Yunanca profil metni yazıp sesli okumak.",
    [
      "İçerik: ad, yaş, şehir, iş/okul, aile, hobiler, neden Yunanca.",
      "Sadece είμαι/έχω/şimdiki zaman basit cümleler yeterli."
    ],
    [
      ex("Με λένε… και μένω στην…", "Adım… ve …’de yaşıyorum."),
      ex("Μου αρέσει ο καφές και τα βιβλία.", "Kahve ve kitapları severim.")
    ],
    ["Taslak Türkçe 5 madde → Yunanca yaz.", "Sesli oku, kaydet.", "Yazma antrenmanı promptunu da yap."],
    ["Metni başkası anlamadan düzgün okuyabiliyor musun?"],
    ["En az 80 kelime ve 3 διαφορετικό yapı var mı?"],
    { train: "write" }
  )
);

add(
  "a1-u3-t1",
  L(
    "A tipi -ω fiillerin şimdiki zaman çekimi.",
    [
      "γράφω: γράφω, γράφεις, γράφει, γράφουμε, γράφετε, γράφουν.",
      "Sık fiiller: διαβάζω, πίνω, τρώω, δουλεύω, μαθαίνω, καταλαβαίνω.",
      "Konuşma dili: μιλάω / μιλάς… da duyulur."
    ],
    [
      ex("Γράφω ένα μήνυμα.", "Mesaj yazıyorum."),
      ex("Διαβάζω ελληνικά.", "Yunanca okuyorum."),
      ex("Πίνω καφέ.", "Kahve içiyorum."),
      ex("Καταλαβαίνω λίγο.", "Biraz anlıyorum.")
    ],
    ["5 fiilin tam çekim tablosunu yaz.", "Günlük 8 cümle kur.", "Fiil antrenmanı."],
    ["γράφω’yu 6 kişi için hatasız söyle."],
    ["-ω fiillerde kişi eklerini ezberledin mi?"],
    { train: "verb" }
  )
);

add(
  "a1-u3-t2",
  L(
    "B tipi -άω/-ώ fiilleri A tipiyle karıştırmadan çekmek.",
    [
      "αγαπώ/αγαπάω: αγαπώ, αγαπάς, αγαπά, αγαπάμε, αγαπάτε, αγαπούν.",
      "ρωτάω, περπατάω, κοιτάω, βοηθάω sık B tipi.",
      "A ile B’yi aynı listede karıştırarak test et."
    ],
    [
      ex("Αγαπάω την Ελλάδα.", "Yunanistan’ı seviyorum."),
      ex("Ρωτάω τον δάσκαλο.", "Öğretmene soruyorum."),
      ex("Περπατάω κάθε μέρα.", "Her gün yürüyorum.")
    ],
    ["10 B tipi fiil listesi + 2’şer cümle.", "A/B karışık 10 soruluk mini test kendine yap."],
    ["αγαπάω çekimini yaz."],
    ["A tipi ile B tipi eki farkını söyleyebiliyor musun?"]
  )
);

add(
  "a1-u3-t3",
  L(
    "Sabah–akşam rutini şimdiki zamanda anlatmak (12+ cümle).",
    [
      "Sıklık: πάντα, συχνά, συνήθως, μετά, μετά το μάθημα…",
      "Fiilleri zincirle: Ξυπνάω → πλένομαι → πίνω καφέ → πάω στη δουλειά."
    ],
    [
      ex("Το πρωί ξυπνάω στις επτά.", "Sabah yedide uyanırım."),
      ex("Μετά πίνω καφέ και διαβάζω.", "Sonra kahve içer ve okurum."),
      ex("Το βράδυ βλέπω μια σειρά.", "Akşam bir dizi izlerim.")
    ],
    ["12 cümle yaz, sonra ezbere söyle.", "Sıklık antrenmanı.", "Kaydet."],
    ["Zaman sırası bozulmadan anlatabiliyor musun?"],
    ["En az 12 cümle ve 3 sıklık zarfı var mı?"],
    { train: "frequency" }
  )
);

add(
  "a1-u3-t4",
  L(
    "Yavaş diyalogları uygulama içinde dinleyip ana fikri çıkarmak.",
    [
      "Dış kaynak yok: Dinle-anla + Diyalog + TTS ile çalış.",
      "İlk geçişte genel fikir; ikinci geçişte kim/ne/nerede."
    ],
    [ex("Τι είπε;", "Ne dedi?"), ex("Πού είναι;", "Nerede?")],
    ["Dinle-anla antrenmanı 2 tur.", "Diyalog 1 tur.", "Her diyalog için Türkçe 1 cümle özet."],
    ["3 diyalog özeti yaz."],
    ["Ana fikri kaçırmadan özetleyebiliyor musun?"],
    { train: "listen" }
  )
);

add(
  "a1-u4-t1",
  L(
    "Kafede sipariş, hesap ve nazik istek kalıpları.",
    [
      "Θα ήθελα… / Έναν καφέ, παρακαλώ. Τον λογαριασμό, παρακαλώ.",
      "Είναι πικάντικο; Έχετε χορτοφαγικό; Για πακέτο;"
    ],
    [
      ex("Θα ήθελα έναν καφέ χωρίς ζάχαρη.", "Şekersiz kahve isterdim."),
      ex("Τον λογαριασμό, παρακαλώ.", "Hesap lütfen."),
      ex("Τι προτείνετε;", "Ne önerirsiniz?")
    ],
    ["Restoran antrenmanı.", "Nazik üslup antrenmanı.", "Rol kaydı: garson + müşteri."],
    ["Sipariş→hesap diyaloğunu ezbere kur."],
    ["5 kalıbı hatasız kullanabiliyor musun?"],
    { train: "restaurant" }
  )
);

add(
  "a1-u4-t2",
  L(
    "Alışveriş kelimeleri: fiyat, beden, renk, ucuz/pahalı.",
    [
      "Πόσο κάνει; Φτηνό / ακριβό. Μέγεθος, χρώμα, έκπτωση, ταμείο, απόδειξη."
    ],
    [
      ex("Πόσο κάνει;", "Kaç para?"),
      ex("Είναι ακριβό.", "Pahalı."),
      ex("Έχετε μεγαλύτερο μέγεθος;", "Daha büyük beden var mı?")
    ],
    ["Kartlar: Alışveriş + Renkler desteleri.", "25 kelimeyi maddeyle yaz.", "Eşleştir oyunu."],
    ["10 kelime TR→EL."],
    ["Fiyat sorma cümlesi otomatik mi?"],
    { train: "match" }
  )
);

add(
  "a1-u4-t3",
  L(
    "Yön sorma ve tarif kalıpları.",
    [
      "Πού είναι…; Πώς πάω στο/στην…;",
      "δεξιά, αριστερά, ευθεία, κοντά, μακριά, απέναντι, δίπλα, στη γωνία."
    ],
    [
      ex("Πού είναι η στάση;", "Durak nerede?"),
      ex("Στρίψε δεξιά.", "Sağa dön."),
      ex("Είναι κοντά.", "Yakın.")
    ],
    ["Yön antrenmanı.", "Ulaşım kelimeleri.", "Hayali haritada 5 tarif söyle."],
    ["3 soru + 3 tarif yaz."],
    ["Sağ/sol/düz karışmıyor mu?"],
    { train: "direction" }
  )
);

add(
  "a1-u4-t4",
  L(
    "A1 kapı: madde, είμαι/έχω, şimdiki zaman, kelime — öz test.",
    [
      "Hedef ≥ %80. Uygulama: Mini sınav + Hızlı 10 + Yanlış tekrarı.",
      "Zayıf türü not et; o antrenmana dön."
    ],
    [ex("Πόσο καλά;", "Ne kadar iyi?")],
    ["Mini sınav (20).", "Hızlı 10.", "Yanlış tekrarını bitir."],
    ["Skoru İlerleme notuna yaz."],
    ["%80+ veya zayıf konu listesi hazır mı?"],
    { train: "exam" }
  )
);

add(
  "a1-u5-t1",
  L(
    "Kişi zamirleri: εγώ εσύ αυτός/αυτή/αυτό…",
    [
      "Özne zamirleri çoğu zaman düşer (fiil eki yeter); vurgu/karşıtlıkta kullanılır.",
      "Εγώ είμαι… Εσύ; Αυτός είναι…"
    ],
    [
      ex("Εγώ είμαι φοιτητής.", "Ben öğrenciyim."),
      ex("Εσύ τι κάνεις;", "Sen ne yapıyorsun?"),
      ex("Αυτοί είναι φίλοι μου.", "Onlar arkadaşlarım.")
    ],
    ["Tablo ezber + 12 cümle.", "Zamir antrenmanı."],
    ["6 zamiri örnek cümlede kullan."],
    ["αυτός/αυτή/αυτό cinsiyet uyumuna dikkat ettin mi?"],
    { train: "pronoun" }
  )
);

add(
  "a1-u5-t2",
  L(
    "Soru sözcükleriyle mini röportaj.",
    ["τι, ποιος/ποια, πού, πότε, γιατί, πώς, πόσο, πόσοι…", "Cevapta tam cümle kullan."],
    [
      ex("Τι κάνεις;", "Ne yapıyorsun?"),
      ex("Πού μένεις;", "Nerede yaşıyorsun?"),
      ex("Πότε φεύγεις;", "Ne zaman gidiyorsun?"),
      ex("Γιατί μαθαίνεις ελληνικά;", "Neden Yunanca öğreniyorsun?")
    ],
    ["Soru antrenmanı.", "10 soru yaz, kendi cevapla, kaydet."],
    ["Röportaj: 6 soru 6 cevap."],
    ["Soru sözcüğünü yanlış seçmiyor musun?"],
    { train: "question" }
  )
);

add(
  "a1-u5-t3",
  L(
    "İyelik: μου σου του της… Το βιβλίο μου.",
    [
      "μου/σου/του/της/μας/σας/τους isimden sonra (veya özel yapılarda önce).",
      "Το όνομά μου. Η φίλη σου. Το σπίτι τους."
    ],
    [
      ex("Το βιβλίο μου.", "Kitabım."),
      ex("Η αδελφή σου.", "Kız kardeşin."),
      ex("Το αυτοκίνητό του.", "Onun arabası.")
    ],
    ["15 iyelik cümlesi yaz.", "Genitif antrenmanı ile sahiplik pekiştir."],
    ["Aile üyelerini iyelikle anlat."],
    ["μου/σου yerini doğru koyuyor musun?"],
    { train: "genitive" }
  )
);

add(
  "a1-u6-t1",
  L(
    "Haftanın günlerini ezberleyip cümlede kullanmak.",
    ["Δευτέρα Τρίτη Τετάρτη Πέμπτη Παρασκευή Σάββατο Κυριακή.", "την Δευτέρα = pazartesi günü."],
    [
      ex("τη Δευτέρα", "pazartesi"),
      ex("το Σάββατο", "cumartesi"),
      ex("Έχω μάθημα την Τρίτη.", "Salı dersim var.")
    ],
    ["Gün antrenmanı.", "7 cümle: her gün için bir aktivite."],
    ["Karışık sor: Bugün ne? Yarın ne?"],
    ["7 günü sırasız sayabiliyor musun?"],
    { train: "weekdays" }
  )
);

add(
  "a1-u6-t2",
  L(
    "Sıklık zarflarıyla rutin anlatmak.",
    ["πάντα, συνήθως, συχνά, μερικές φορές, σπάνια, ποτέ.", "Olumsuzda ποτέ ile Δεν birlikte: Δεν πάω ποτέ."],
    [
      ex("Πάντα πίνω καφέ.", "Her zaman kahve içerim."),
      ex("Σπάνια βλέπω τηλεόραση.", "Nadiren TV izlerim."),
      ex("Δεν καπνίζω ποτέ.", "Asla sigara içmem.")
    ],
    ["Sıklık antrenmanı.", "Rutinini 8 cümlede anlat."],
    ["6 zarfı örnekle."],
    ["ποτέ + δεν kuralını uyguluyor musun?"],
    { train: "frequency" }
  )
);

add(
  "a1-u6-t3",
  L(
    "Saat sorma ve söyleme.",
    ["Τι ώρα είναι; Είναι τρεις. Είναι και τέταρτο / παρά τέταρτο / και μισή."],
    [
      ex("Τι ώρα είναι;", "Saat kaç?"),
      ex("Είναι δύο.", "Saat iki."),
      ex("Στις οκτώ.", "Sekizde.")
    ],
    ["Saat antrenmanı.", "Günün programını saatlerle söyle."],
    ["10 rastgele saat söyle."],
    ["και μισή / παρά ayrımını biliyor musun?"],
    { train: "time" }
  )
);

// ========== A2 ==========
add(
  "a2-u1-t1",
  L(
    "Düzenli aorist: tamamlanmış geçmiş + augment (έ-).",
    [
      "Aorist = bir kez / bitmiş olay. έγραψα, διάβασα, μίλησα.",
      "Çoğu fiilde geçmişte έ- gelir (augment). Vurgu kurallarına karttan bak.",
      "Şimdiki γράφω → aorist έγραψα (ben)."
    ],
    [
      ex("Χθες έγραψα ένα μήνυμα.", "Dün bir mesaj yazdım."),
      ex("Διάβασα το βιβλίο.", "Kitabı okudum."),
      ex("Μίλησα με τον Νίκο.", "Nikos’la konuştum.")
    ],
    ["15 fiilin aorist (εγώ) formunu yaz.", "Aorist antrenmanı.", "Aspect: aorist seç."],
    ["10 geçmiş cümle (hepsi aorist)."],
    ["Augment’i unutmuyor musun?"],
    { train: "aorist" }
  )
);

add(
  "a2-u1-t2",
  L(
    "Düzensiz aoristleri kart+cümleyle sabitlemek.",
    [
      "πήγα, ήρθα, είδα, είπα, έφαγα, ήπια, πήρα, έδωσα, βγήκα, μπήκα…",
      "Bunlar yüksek frekans — ayrı liste şart."
    ],
    [
      ex("Πήγα στην Αθήνα.", "Atina’ya gittim."),
      ex("Είδα μια ταινία.", "Bir film gördüm."),
      ex("Είπα την αλήθεια.", "Gerçeği söyledim."),
      ex("Ήρθα νωρίς.", "Erken geldim.")
    ],
    ["Düzensiz aorist antrenmanı.", "Her fiile 2 cümle.", "Hızlı 5’te aorist gelsin."],
    ["8 düzensizi TR→EL söyle."],
    ["πήγα/ήρθα/είδα otomatik mi?"],
    { train: "aorist" }
  )
);

add(
  "a2-u1-t3",
  L(
    "Aorist ile «dün» günlüğü (≈150 kelime) yazıp okumak.",
    ["Sadece bitmiş olaylar. Saat + yer + kim ile zenginleştir.", "Imperfect’e kayma."],
    [ex("Χθες το πρωί…", "Dün sabah…"), ex("Μετά πήγα…", "Sonra gittim…")],
    ["150 kelime yaz.", "Sesli oku.", "3 aorist hatasını düzelt."],
    ["Metinde en az 12 aorist var mı?"],
    ["Okurken aksan ve kişi ekleri doğru mu?"]
  )
);

add(
  "a2-u2-t1",
  L(
    "Παρατατικός: süre, alışkanlık, arka plan.",
    [
      "έγραφα = yazıyordum / yazardım. Aorist έγραψα = yazdım (bitirdim).",
      "Παλιά διάβαζα πολύ. Χθες διάβασα ένα κεφάλαιο."
    ],
    [
      ex("Όταν ήμουν μικρός, έπαιζα ποδόσφαιρο.", "Küçükken futbol oynardım."),
      ex("Χθες έβλεπα τηλεόραση όταν…", "Dün TV izliyordum ki…")
    ],
    ["Aspect antrenmanı.", "10 çift cümle: aorist vs imperfect."],
    ["Farkı Türkçe açıkla + 2 örnek."],
    ["Alışkanlık için imperfect seçiyor musun?"],
    { train: "aspect" }
  )
);

add(
  "a2-u2-t2",
  L(
    "Çocukluk anlatısı (120+ kelime, παρατατικός ağırlıklı).",
    ["Mekan, alışkanlıklar, duygular. Ara sıra aorist ile tek olay ekle."],
    [ex("Πήγαινα στο σχολείο με τα πόδια.", "Okula yürüyerek giderdim.")],
    ["120 kelime yaz.", "Imperfect fiilleri altını çiz.", "Sesli oku."],
    ["Alışkanlık cümleleri net mi?"],
    ["120+ kelime tamam mı?"]
  )
);

add(
  "a2-u2-t3",
  L(
    "10 cümlede aorist/imperfect seçimi + gerekçe.",
    ["Her cümlede sor: bitmiş tek olay mı, süre/alışkanlık mı?"],
    [
      ex("Χθες είδα τον Γιάννη.", "Aorist — tek olay"),
      ex("Κάθε μέρα έβλεπα τον Γιάννη.", "Imperfect — alışkanlık")
    ],
    ["10 cümle yaz, yanına A veya I koy.", "Aspect antrenmanı 2 tur."],
    ["Gerekçeleri Türkçe birer satır."],
    ["10/10 gerekçe mantıklı mı?"],
    { train: "aspect" }
  )
);

add(
  "a2-u3-t1",
  L(
    "Θα + fiil ile basit gelecek planları.",
    ["Θα πάω, θα δω, θα μιλήσω. Olumsuz: Δεν θα…", "Yakın plan ve tahmin."],
    [
      ex("Αύριο θα πάω στη δουλειά.", "Yarın işe gideceğim."),
      ex("Δεν θα αργήσω.", "Gecikmeyeceğim.")
    ],
    ["20 plan cümlesi.", "θα/να/ας antrenmanı.", "Haftalık takvimini söyle."],
    ["10 gelecek cümle kaydet."],
    ["Θα’yı unutmuyor musun?"],
    { train: "particle" }
  )
);

add(
  "a2-u3-t2",
  L(
    "Cumartesi–Pazar programını yazılı ve sözlü anlatmak.",
    ["Gelecek + saat + yer. Bağlaç: και, μετά, το βράδυ."],
    [ex("Το Σάββατο θα…", "Cumartesi …acağım.")],
    ["Yaz 10 cümle → ezbere 1 dk konuş.", "Gün + saat antrenmanı."],
    ["Plan gerçekçi ve çeşitli mi?"],
    ["Sözlüde takılmadan bitirdin mi?"]
  )
);

add(
  "a2-u3-t3",
  L(
    "Nazik istek: Θα ήθελα, μπορώ να…, μήπως…",
    ["Emir yerine rica. Restoran, ofis, yardım isteme."],
    [
      ex("Θα ήθελα ένα νερό.", "Bir su isterdim."),
      ex("Μπορώ να κλείσω την πόρτα;", "Kapıyı kapatabilir miyim?"),
      ex("Μήπως θα μπορούσατε να βοηθήσετε;", "Yardım edebilir misiniz?")
    ],
    ["Nazik üslup antrenmanı.", "8 rica cümlesi.", "Polite + restaurant."],
    ["Resmi bir ricayı kaydet."],
    ["Kaba emir kullanmadan çözebiliyor musun?"],
    { train: "polite" }
  )
);

add(
  "a2-u4-t1",
  L(
    "Temel bağlaçlar: και αλλά γιατί όταν αν…",
    ["Cümleleri birleştir; YDS ve yazma için temel.", "ωστόσο, γι' αυτό, δηλαδή ekle."],
    [
      ex("Θέλω να μάθω γιατί…", "Öğrenmek istiyorum çünkü…"),
      ex("Όταν έχω χρόνο, διαβάζω.", "Zamanım olunca okurum."),
      ex("Αν βρέχει, μένω σπίτι.", "Yağmur yağarsa evde kalırım.")
    ],
    ["15 bağlaç + örnek listesi.", "Bağlaç antrenmanı."],
    ["5 uzun cümle kur."],
    ["Aynı bağlacı tekrar tekrar kullanmıyor musun?"],
    { train: "connector" }
  )
);

add(
  "a2-u4-t2",
  L(
    "A2 okuma: uygulama içi metin + 5 soru.",
    ["YDS → Okuma seti. Dış site yok.", "Bilinmeyen kelimeyi bağlamdan tahmin et, sonra karta ekle."],
    [ex("Ποιο είναι το θέμα;", "Konu nedir?")],
    ["Okuma setinden 2 metin çöz.", "Her metin için 3 yeni kelime yaz."],
    ["5 sorunun cevaplarını kontrol et."],
    ["Ana fikri doğru işaretledin mi?"]
  )
);

add(
  "a2-u4-t3",
  L(
    "Arkadaşa 120 kelimelik e-posta (geçmiş + gelecek).",
    ["Selam + haber (aorist) + plan (θα) + soru + kapanış."],
    [
      ex("Γεια σου…", "Merhaba…"),
      ex("Χθες πήγα…", "Dün gittim…"),
      ex("Το Σαββατοκύριακο θα…", "Hafta sonu …acağım."),
      ex("Γράψε μου!", "Yaz bana!")
    ],
    ["120 kelime yaz.", "Geçmiş/gelecek fiilleri renklendir.", "Sesli oku."],
    ["Zaman kayması var mı kontrol et."],
    ["120+ kelime ve iki zaman dilimi var mı?"]
  )
);

add(
  "a2-u4-t4",
  L(
    "A2 kapı: geçmiş/gelecek + 200 kelimelik metin öz değerlendirme.",
    ["Mini sınav + yazma + yanlış tekrarı.", "Eksik konuları Yol haritasında işaretle."],
    [],
    ["Mini sınav.", "200 kelimelik serbest metin (dün+yarın).", "Zayıf liste çıkar."],
    ["%70+ ve metin tamam mı?"],
    ["Bir sonraki seviyeye geçmeye hazır mısın?"],
    { train: "exam" }
  )
);

add(
  "a2-u5-t1",
  L(
    "Doğrudan nesne zamirleri: με σε τον την το…",
    ["Τον βλέπω. Την ξέρω. Το θέλω. Με καταλαβαίνει;", "Cinsiyet/sayı uyumu."],
    [
      ex("Τον βλέπω.", "Onu (eril) görüyorum."),
      ex("Την καλω.", "Onu (dişil) arıyorum."),
      ex("Το θέλω.", "Onu (nötr) istiyorum."),
      ex("Με βοηθάς;", "Bana yardım ediyor musun?")
    ],
    ["Tablo + 20 cümle.", "Zamir antrenmanı.", "İsimli cümleyi zamirliye çevir."],
    ["10 dönüşüm yap."],
    ["τον/την/το karışıyor mu?"],
    { train: "pronoun" }
  )
);

add(
  "a2-u5-t2",
  L(
    "Çift zamir giriş: Μου το δίνει.",
    ["Sıra: dolaylı + doğrudan (Μου το…). Emirde sonda: Δώσ' το μου."],
    [
      ex("Μου το δίνει.", "Bana onu veriyor."),
      ex("Σου το λέω.", "Sana onu söylüyorum."),
      ex("Δώσ' το μου.", "Ver onu bana.")
    ],
    ["Çift zamir antrenmanı.", "8 cümle ezber."],
    ["Σου το λέω tipini 5 varyasyon."],
    ["Sırayı ters çevirmiyor musun?"],
    { train: "dblpron" }
  )
);

add(
  "a2-u5-t3",
  L(
    "Garson diyaloğunda zamir kullanmak.",
    ["Sipariş + «Σας το φέρνω αμέσως» tipinde kalıplar."],
    [
      ex("Σας το φέρνω.", "Size onu getiriyorum."),
      ex("Μου φέρνετε τον λογαριασμό;", "Hesabı getirir misiniz?")
    ],
    ["Restoran + çift zamir.", "1 dk rol kaydı."],
    ["Diyalogda en az 3 zamir."],
    ["Doğal duruyor mu?"],
    { train: "restaurant" }
  )
);

fs.writeFileSync(path.join(__dirname, "../js/_lessons_a.json"), JSON.stringify(LESSONS));
console.log("wrote A0-A2", Object.keys(LESSONS).length);
