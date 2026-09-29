/* Part 2: B1 → C2+ lessons, merge, emit lessons.js */
const fs = require("fs");
const path = require("path");

function L(goal, theory, examples, steps, practice, check, extra = {}) {
  return { goal, theory, examples, steps, practice, check, ...extra };
}
function ex(el, tr) {
  return { el, tr };
}
function add(map, id, lesson) {
  map[id] = lesson;
}

const LESSONS = JSON.parse(fs.readFileSync(path.join(__dirname, "../js/_lessons_a.json"), "utf8"));

// B1
add(LESSONS, "b1-u1-t1", L(
  "να yapısı: istek, amaç, zorunluluk.",
  ["Θέλω να μάθω. Πρέπει να διαβάσω. Για να καταλάβω…", "να’dan sonra kişi çekimli fiil (subjunctive gövdesi)."],
  [ex("Θέλω να μάθω ελληνικά.", "Yunanca öğrenmek istiyorum."), ex("Πρέπει να φύγω.", "Gitmeliyim."), ex("Για να καταλάβω, διαβάζω αργά.", "Anlamak için yavaş okuyorum.")],
  ["25 cümle (θέλω/πρέπει/για να).", "να aspect antrenmanı.", "Particle θα/να."],
  ["10 cümleyi sesli oku."],
  ["να’dan sonra fiili doğru seçiyor musun?"],
  { train: "subjunctive" }
));

add(LESSONS, "b1-u1-t2", L(
  "να γράψω vs να γράφω: aspect bilinci.",
  ["να + aorist gövde ≈ bir kez/bitmiş niyet. να + present ≈ süre/alışkanlık.", "Θέλω να σου γράψω (bir mesaj). Θέλω να γράφω καλύτερα (sürekli gelişim)."],
  [ex("Θέλω να πάω.", "Gitmek istiyorum (bir kez)."), ex("Θέλω να πηγαίνω κάθε μέρα.", "Her gün gitmek istiyorum.")],
  ["να aspect antrenmanı 2 tur.", "10 çift cümle yaz."],
  ["Farkı Türkçe + örnek açıkla."],
  ["Aspect’i rastgele sorularda doğru seçiyor musun?"],
  { train: "subjunctive" }
));

add(LESSONS, "b1-u1-t3", L(
  "Arkadaşa 5 tavsiye (πρέπει να / καλό είναι να…).",
  ["Tavsiye dili: Πρέπει να… Καλό είναι να… Μη…"],
  [ex("Πρέπει να κοιμάσαι περισσότερο.", "Daha çok uyumalısın."), ex("Καλό είναι να διαβάζεις κάθε μέρα.", "Her gün okuman iyi olur."), ex("Μην αργείς.", "Geç kalma.")],
  ["5 tavsiye yaz + söyle.", "Olumsuz emir antrenmanı.", "Kaydet."],
  ["Tavsiyeler çeşitli konularda mı?"],
  ["Nazik üslubu koruyor musun?"],
  { train: "negimp" }
));

add(LESSONS, "b1-u2-t1", L(
  "Pasif şimdiki: γράφεται, λέγεται, γίνεται.",
  ["Haber/akademik dilde sık. Το βιβλίο γράφεται στα ελληνικά."],
  [ex("Λέγεται ότι…", "Deniliyor ki…"), ex("Γίνεται κάθε χρόνο.", "Her yıl yapılır."), ex("Το πρόβλημα λύεται.", "Sorun çözülür.")],
  ["Pasif antrenmanı.", "8 haber cümlesi yaz."],
  ["Aktifi pasife çevir (5)."],
  ["-μαι ekini tanıyor musun?"],
  { train: "passive" }
));

add(LESSONS, "b1-u2-t2", L(
  "Orta çatı / dönüşlü: σκέφτομαι, θυμάμαι, φοβάμαι…",
  ["Anlam çoğu zaman ‘kendi…’ veya özel sözlük anlamı. Çekimi pasife benzer."],
  [ex("Σκέφτομαι να φύγω.", "Gitmeyi düşünüyorum."), ex("Θυμάμαι το όνομα.", "İsmi hatırlıyorum."), ex("Φοβάμαι τα σκυλιά.", "Köpeklerden korkuyorum."), ex("Ντρέπομαι λίγο.", "Biraz utanıyorum.")],
  ["Dönüşlü antrenmanı.", "15 fiil + cümle listesi."],
  ["10 fiili ezbere cümlede kullan."],
  ["Aktif ile karıştırmıyor musun?"],
  { train: "reflexive" }
));

add(LESSONS, "b1-u2-t3", L(
  "Kısa haber/metin oku → 80 kelimelik Yunanca özet.",
  ["Kaynak: uygulama Okuma seti / YDS cloze metinleri.", "Özet: kim, ne, nerede, sonuç."],
  [ex("Σύμφωνα με το κείμενο…", "Metne göre…")],
  ["1 okuma metni bitir.", "80 kelime özet yaz.", "Yeni 5 kelimeyi karta ekle."],
  ["Özet ana fikri kapsıyor mu?"],
  ["Kopyala-yapıştır olmadan kendi cümlelerin mi?"]
));

add(LESSONS, "b1-u3-t1", L(
  "Tip 1 koşul: Αν έχει χρόνο, θα έρθει.",
  ["Gerçek/mümkün durum. Αν + şimdiki / θα + gelecek sık."],
  [ex("Αν βρέχει, θα μείνω σπίτι.", "Yağmur yağarsa evde kalacağım."), ex("Αν έχεις χρόνο, έλα.", "Zamanın varsa gel.")],
  ["Koşul antrenmanı.", "15 Tip 1 cümle."],
  ["5 senaryo için koşul kur."],
  ["Αν… θα… kalıbı oturdu mu?"],
  { train: "conditional" }
));

add(LESSONS, "b1-u3-t2", L(
  "Tip 2 hayali: Αν είχα…, θα ταξίδευα.",
  ["Karşıolgusal: imperfect + θα + imperfect."],
  [ex("Αν είχα χρήματα, θα ταξίδευα.", "Param olsaydı seyahat ederdim."), ex("Αν ήξερα, θα το έλεγα.", "Bilsem söylerdim.")],
  ["15 Tip 2 cümle.", "Koşul antrenmanı.", "Yanlış düzelt antrenmanı."],
  ["Tip 1 ile Tip 2’yi ayırt et (5 çift)."],
  ["Çekimlerde παρατατικός doğru mu?"],
  { train: "conditional" }
));

add(LESSONS, "b1-u3-t3", L(
  "3 konuda 1’er dk «Αν…» konuşması.",
  ["Konular: para, zaman, dil öğrenme. Kaydet."],
  [ex("Αν μπορούσα…", "Yapabilseydim…")],
  ["3 monolog kaydı.", "Her birinde en az 4 koşul cümlesi."],
  ["Kayıtlarda dolgu (εεε) sayısını not et."],
  ["3 dk toplam akıcı mı?"]
));

add(LESSONS, "b1-u4-t1", L(
  "Tematik kelime: iş, sağlık, eğitim, çevre, teknoloji.",
  ["Her temadan uygulama desteleri + yeni liste. Hedef tema başı ~40."],
  [ex("προθεσμία", "son tarih"), ex("ραντεβού", "randevu"), ex("περιβάλλον", "çevre"), ex("έρευνα", "araştırma")],
  ["Kartlar: İş, Sağlık, Okul, Teknoloji, Doğa.", "Her desteden tur at.", "40×5 hedefe doğru ilerle."],
  ["Her temadan 10 kelime TR→EL."],
  ["Zayıf temayı işaretledin mi?"]
));

add(LESSONS, "b1-u4-t2", L(
  "30 eş/zıt anlamlı çift.",
  ["Zıt + eşanlam antrenmanları. YDS tuzakları için kritik."],
  [ex("μεγάλος–μικρός", "büyük–küçük"), ex("αρχίζω–τελειώνω", "başla–bitir"), ex("αλλά ≈ όμως", "ama")],
  ["Zıt + Eşanlam antrenmanları.", "30 çift tablo."],
  ["15’ini ezbere sor."],
  ["False friend ile karıştırmıyor musun?"],
  { train: "opposite" }
));

add(LESSONS, "b1-u4-t3", L(
  "15 dk dinleme notu (uygulama TTS + dinle-anla).",
  ["Dış podcast zorunlu değil. Dinle-anla + dikte + günün kalıbı zinciri."],
  [ex("Η κεντρική ιδέα είναι…", "Ana fikir…")],
  ["Dinle-anla 3 tur.", "8 anahtar kelime + 3 cümle özet."],
  ["Özeti sesli söyle."],
  ["Ana fikri doğru yakaladın mı?"],
  { train: "listen" }
));

add(LESSONS, "b1-u4-t4", L(
  "B1 kapı: okuma + dilbilgisi + 200 kelimelik görüş.",
  ["Mini sınav + okuma + yazma. Zayıf alanı Yol’da aç."],
  [],
  ["Mini sınav.", "Okuma 2 metin.", "200 kelime görüş (Αν… / πρέπει να… kullan)."],
  ["Skor ve eksik listesi."],
  ["B1 hedeflerinin çoğunu karşılıyor musun?"],
  { train: "exam" }
));

add(LESSONS, "b1-u5-t1", L(
  "που göreli: Ο άνθρωπος που…",
  ["που ≈ ki / -en/-an. Tanımlayıcı bilgi."],
  [ex("Ο άνθρωπος που μιλάει είναι γιατρός.", "Konuşan adam doktor."), ex("Το βιβλίο που διάβασα ήταν καλό.", "Okuduğum kitap iyiydi.")],
  ["που antrenmanı.", "15 cümle yaz."],
  ["5 kişiyi που ile tanıt."],
  ["που’yu και ile değiştirmiyor musun?"],
  { train: "relative" }
));

add(LESSONS, "b1-u5-t2", L(
  "Tanımlayıcı vs ek bilgi (virgül / ο οποίος farkına giriş).",
  ["Konuşmada που çok yaygındır. Yazıda ο οποίος daha resmi olabilir.", "Virgülden sonraki bilgi çoğu zaman ek bilgidir."],
  [ex("Ο φίλος μου που μένει στην Αθήνα…", "Atina’da yaşayan arkadaşım (tanımlayıcı)"), ex("Ο Νίκος, που είναι γιατρός, …", "Nikos, ki doktordur, … (ek bilgi)")],
  ["6 çift cümle yaz (tanımlayıcı/ek).", "που antrenmanı."],
  ["Farkı örnekle açıkla."],
  ["Bağlamda hangisi olduğunu söyleyebiliyor musun?"]
));

add(LESSONS, "b1-u5-t3", L(
  "3 kişiyi που ile uzun cümlede anlatmak.",
  ["Ad + meslek + şehir + bir özellik, hepsi που ile bağlanabilir."],
  [ex("Η Μαρία που δουλεύει στην Αθήνα και που αγαπάει τον καφέ…", "Atina’da çalışan ve kahveyi seven Maria…")],
  ["3 paragraf konuş/yaz.", "Kaydet."],
  ["Her kişide en az 2 που."],
  ["Akıcılık kabul edilebilir mi?"]
));

// B2
add(LESSONS, "b2-u1-t1", L(
  "έχω γράψει (παρακείμενος): geçmişin şimdiki sonucu.",
  ["Perfect: έχω + απαρέμφατο. Έχω τελειώσει = bitirmişim (sonuç duruyor)."],
  [ex("Έχω γράψει το μήνυμα.", "Mesajı yazmış bulunuyorum."), ex("Έχεις πάει στην Ελλάδα;", "Yunanistan’a gittin mi (hiç)?")],
  ["Perfect antrenmanı.", "20 cümle.", "Aorist ile karşılaştır 5 çift."],
  ["10 perfect cümle."],
  ["Ne zaman perfect seçeceğini açıklayabiliyor musun?"],
  { train: "perfect" }
));

add(LESSONS, "b2-u1-t2", L(
  "Dolaylı anlatım: Είπε ότι… Ρώτησε αν… Μου είπε να…",
  ["Aktarımda zaman/kişi kayması olabilir; B2’de kalıpları ezberle."],
  [ex("Είπε ότι θα έρθει.", "Geleceğini söyledi."), ex("Ρώτησε αν είμαι καλά.", "İyi olup olmadığımı sordu."), ex("Μου είπε να περιμένω.", "Beklememi söyledi.")],
  ["12 dönüşüm: düz → dolaylı.", "να + emir aktarımı."],
  ["Mini diyalog aktar."],
  ["ότι / αν / να ayrımını biliyor musun?"]
));

add(LESSONS, "b2-u1-t3", L(
  "İleri bağlaçlar: παρόλο που, ενώ, ώστε, εφόσον, ωστόσο…",
  ["Akademik/YDS bağları. Anlam ilişkisi: karşıt, amaç, koşul."],
  [ex("Παρόλο που βρέχει, θα βγω.", "Yağmur yağmasına rağmen çıkacağım."), ex("Διαβάζω ώστε να καταλάβω.", "Anlamak için okuyorum."), ex("Ωστόσο, δεν συμφωνώ.", "Yine de katılmıyorum.")],
  ["Bağlaç antrenmanı.", "40 bağlayıcı kartı (cümleyle).", "Cloze setleri."],
  ["10 cümle farklı bağlaç."],
  ["YDS’de ilişki türünü önce mi bakıyorsun?"],
  { train: "connector" }
));

add(LESSONS, "b2-u2-t1", L(
  "Haftalık haber rutini — uygulama metinleriyle.",
  ["Okuma seti + cloze metinleri «haber» yerine geçer. Her biri: özet + 5 kelime."],
  [ex("Η είδηση λέει ότι…", "Haber diyor ki…")],
  ["3 okuma metni.", "Her biri 40–60 kelime özet + 5 kelime."],
  ["Kelimeleri desteye ekle."],
  ["3 özet tamam mı?"]
));

add(LESSONS, "b2-u2-t2", L(
  "Normal hız dinleme pratiği (uygulama içi).",
  ["Dinle-anla + dikte zinciri 8–12 dk. Altyazı yok: önce genel, sonra detay."],
  [],
  ["Dinle-anla 4 tur.", "Dikte 5 cümle.", "Not: 8 anahtar ifade."],
  ["İkinci dinlemede detay arttı mı?"],
  ["Ana fikir doğru mu?"],
  { train: "listen" }
));

add(LESSONS, "b2-u2-t3", L(
  "250–300 kelimelik görüş yazısı (giriş–gelişme–sonuç).",
  ["Tez cümlesi, 2 gerekçe, örnek, sonuç. Bağlaçları bilerek kullan."],
  [ex("Κατά τη γνώμη μου…", "Bana göre…"), ex("Για παράδειγμα…", "Örneğin…"), ex("Συμπερασματικά…", "Sonuç olarak…")],
  ["Konu seç (teknoloji/eğitim).", "300 kelimeye yaklaş.", "Bağlaçları işaretle."],
  ["Yapı net mi?"],
  ["Kelime sayısı ve üslup B2’ye yaklaşıyor mu?"]
));

add(LESSONS, "b2-u3-t1", L(
  "Paragraf anatomisi: konu cümlesi, destek, sonuç.",
  ["YDS okuma: önce yapı, sonra şıklar.", "Uygulama okuma metinlerinde işaretle."],
  [ex("Η κεντρική ιδέα βρίσκεται…", "Ana fikir …da")],
  ["5 paragraf/metinde konu cümlesini bul.", "Okuma seti."],
  ["Şıkları okumadan önce kendi özetini yaz."],
  ["Tuzak şıklara düştün mü? Analiz et."]
));

add(LESSONS, "b2-u3-t2", L(
  "Bağlamdan kelime tahmini.",
  ["Sözlükten önce: tür (fiil/isim), olumlu/olumsuz, yakın anlam.", "Sonra kart/deck ile doğrula."],
  [],
  ["Bir okuma metninde 10 bilinmeyeni tahmin et.", "Doğrula, 10 kart yaz."],
  ["Tahmin doğruluk oranını not et."],
  ["%50+ mantıklı tahmin?"]
));

add(LESSONS, "b2-u3-t3", L(
  "YDS tarzı 10 soru — süre tut.",
  ["YDS sekmesi: cloze + okuma. Kronometre 12 dk."],
  [],
  ["Cloze 1 set + okuma soruları.", "Süre bitince dur.", "Yanlış analizi."],
  ["Soru tipi dağılımını yaz."],
  ["Süreye yetişiyor musun?"]
));

add(LESSONS, "b2-u3-t4", L(
  "Hata günlüğü: kelime / yapı / çıkarım / dikkat.",
  ["İlerleme → Hata günlüğü. Her yanlış bir etikete."],
  [],
  ["Son 10 yanlışı sınıflandır.", "Her sınıfa 1 mini alıştırma seç (antrenman)."],
  ["Aynı hata tekrar ediyor mu?"],
  ["Günlük güncel mi?"]
));

add(LESSONS, "b2-u4-t1", L(
  "10 konuda 2’şer dk hazırlıksız konuşma.",
  ["Konu örnekleri: iş, tatil, teknoloji, sağlık, dil, şehir, yemek, spor, aile, gelecek."],
  [],
  ["10 kayıt.", "Her birinde giriş+2 nokta+kapanış.", "En kötü 3’ü yeniden çek."],
  ["Dolgu kelimelerini say."],
  ["2 dk’yı doldurabiliyor musun?"]
));

add(LESSONS, "b2-u4-t2", L(
  "Tezi savunan ve karşı argümanı anlatan konuşma.",
  ["Kalıp: Κατά τη γνώμη μου… Από την άλλη…"],
  [ex("Από την άλλη πλευρά…", "Öte yandan…")],
  ["Bir tez seç.", "2 dk lehte, 2 dk aleyhte kaydet."],
  ["Her iki taraf da mantıklı mı?"],
  ["Bağlaçlar yeterli mi?"]
));

add(LESSONS, "b2-u4-t3", L(
  "B2 kapı sınavı: okuma + yazma + 4 dk konuşma.",
  ["Mini sınav + 250 kelime + monolog. Checklist: bağlaç, aspect, kelime."],
  [],
  ["Sınav + yazı + konuşma.", "Eksikleri listele."],
  ["%70+ ve üretim tamam mı?"],
  ["C1’e geçiş için zayıf nokta net mi?"],
  { train: "exam" }
));

add(LESSONS, "b2-u5-t1", L(
  "Argüman kalıp bankası.",
  ["Κατά τη γνώμη μου, Για παράδειγμα, Επιπλέον, Ωστόσο, Συμπερασματικά…"],
  [ex("Κατά τη γνώμη μου…", "Bana göre…"), ex("Για παράδειγμα…", "Örneğin…"), ex("Συμπερασματικά…", "Sonuç olarak…")],
  ["15 kalıp ezber + cümle.", "Bağlaç/kolokasyon antrenmanı."],
  ["1 dakikada 5 kalıp kullan."],
  ["Kalıplar ezbere geliyor mu?"],
  { train: "collocation" }
));

add(LESSONS, "b2-u5-t2", L(
  "300 kelimelik yapılandırılmış görüş yazısı.",
  ["Tez–gerekçe–örnek–sonuç. Önceki kalıp bankasını kullan."],
  [],
  ["300 kelime yaz.", "Her paragrafa işlev etiketi koy."],
  ["Üslup tutarlı mı?"],
  ["Kelime sayısı ve yapı tamam mı?"]
));

add(LESSONS, "b2-u5-t3", L(
  "Aynı tezi 3 dk sözlü savun.",
  ["Yazıdan nota geç, ezberleme — konuş."],
  [],
  ["3 dk kaydet.", "Dinle, 3 iyileştirme yap, yeniden kaydet."],
  ["Süre doldu mu?"],
  ["Mesaj net mi?"]
));

// C1
add(LESSONS, "c1-u1-t1", L(
  "Aynı mesajı samimi / nötr / resmi yazmak.",
  ["Register: οικείο ↔ επίσημο. Fiil seçimi, hitap, bağlaç değişir."],
  [ex("Γεια! Θα περάσω αργότερα.", "Samimi"), ex("Θα ήθελα να σας ενημερώσω ότι…", "Resmi")],
  ["5 mesaj × 3 üslup = 15 versiyon.", "Nazik/resmi kalıpları kullan."],
  ["Resmi olanı sesli oku."],
  ["Üç üslup gerçekten farklı mı?"],
  { train: "polite" }
));

add(LESSONS, "c1-u1-t2", L(
  "Akademik bağlayıcı kartı (≈40).",
  ["εντούτοις, συνεπώς, ιδιαιτέρως, αναμφίβολα, ως εκ τούτου…"],
  [ex("Εντούτοις…", "Bununla birlikte…"), ex("Συνεπώς…", "Dolayısıyla…"), ex("Αναμφίβολα…", "Şüphesiz…")],
  ["40 ifade + örnek.", "Bağlaç antrenmanı + cloze.", "YDS kelime destesi."],
  ["20’sini TR→EL."],
  ["Yazıda en az 8’ini kullanabiliyor musun?"],
  { train: "connector" }
));

add(LESSONS, "c1-u1-t3", L(
  "Uzun metin özeti (200 kelime) — uygulama okumaları zinciri.",
  ["2–3 okuma metnini birleştirip tek akademik özete dönüştür."],
  [ex("Το κείμενο υποστηρίζει ότι…", "Metin şunu savunuyor…")],
  ["Okuma seti yoğun.", "200 kelime özet, bağlayıcılı."],
  ["Özet tarafsız mı?"],
  ["Kişisel yorum ile özeti ayırdın mı?"]
));

add(LESSONS, "c1-u2-t1", L(
  "50 deyim: anlam + örnek + Türkçe.",
  [
    "Örnek set (hepsini cümleyle genişlet): τα βρήκαμε (anlaştık), μου ήρθε (aklıma geldi), κάνω κουράγιο (cesaret bul), δεν βαριέσαι (boş ver), όλα καλά, άστο, ρίχνω μια ματιά, παίρνω θάρρος, χάνω το δίκιο μου, είμαι στα κέφια μου…"
  ],
  [ex("Τα βρήκαμε.", "Anlaştık."), ex("Ρίξε μια ματιά.", "Bir göz at."), ex("Δεν βαριέσαι.", "Boş ver / ne yapalım.")],
  ["50 satırlık tablo doldur.", "Günün kalıplarını ekle.", "10’unu konuşmada kullan."],
  ["20 rastgele soru."],
  ["Deyimi kelimesi kelimesine çevirmiyor musun?"]
));

add(LESSONS, "c1-u2-t2", L(
  "10 düz cümleyi doğal/idiomatik hale getirmek.",
  ["Literal Türkçe düşünceyi Yunanca kalıba çevir."],
  [ex("Είμαι πολύ κουρασμένος.", "→ Πεθαίνω από την κούραση (bağlama göre)")],
  ["10 dönüşüm yaz.", "Native gibi mi diye sesli oku."],
  ["3 versiyonu kaydet."],
  ["Abartılı/yanlış deyim kullanmadın mı?"]
));

add(LESSONS, "c1-u2-t3", L(
  "Native içerik yerine yoğun dinleme notu (uygulama).",
  ["20 dk: dinle-anla + dikte + kalıp tekrarı. Yeni ifadeleri listele."],
  [],
  ["20 dk kronometre.", "12 ifade listesi.", "3’ünü cümlede kullan."],
  ["Liste aktif mi?"],
  ["Pasif dinleme olmadı mı?"],
  { train: "dictation" }
));

add(LESSONS, "c1-u3-t1", L(
  "Cloze stratejisi: dilbilgisi ipucu + kolokasyon.",
  ["Önce boşluğun türü (edat/fiil/bağlaç). Sonra anlam.", "YDS → Cloze setleri."],
  [],
  ["3 cloze seti.", "Her yanlışta «neden» yaz."],
  ["Strateji notunu 5 madde yap."],
  ["İlk şık tuzağına düşmeyi azalttın mı?"]
));

add(LESSONS, "c1-u3-t2", L(
  "YDS akademik kelime bankası (hedef 200, uygulama destesiyle).",
  ["YDS destesi + extras kelimeler. Her kelimeye 1 üretim cümlesi."],
  [ex("υπόθεση", "varsayım"), ex("συμπέρασμα", "sonuç"), ex("επίδραση", "etki"), ex("αξιολόγηση", "değerlendirme")],
  ["YDS kart turları.", "Günde 20 yeni + 20 tekrar.", "Cümle üret."],
  ["50 kelimeyi aktif kullanabiliyor musun?"],
  ["Sadece tanıma mı kaldı?"]
));

add(LESSONS, "c1-u3-t3", L(
  "Zamanlı deneme parçası: 20 soru.",
  ["Mini sınav + cloze + okuma. Analiz zorunlu."],
  [],
  ["20 soru süreyle.", "Otopsi.", "Zayıf tip kampı planla."],
  ["Skor kaydı."],
  ["Aynı hatalar tekrar ediyor mu?"],
  { train: "exam" }
));

add(LESSONS, "c1-u4-t1", L(
  "400 kelimelik toplumsal deneme.",
  ["Giriş–tez–2 gövde–karşı görüş–sonuç. Akademik bağlayıcı zorunlu."],
  [],
  ["400 kelime.", "Bağlayıcıları say (≥10).", "Bir gün sonra düzenle."],
  ["Yapı C1 mi?"],
  ["Tekrarlayan kelimeyi azalttın mı?"]
));

add(LESSONS, "c1-u4-t2", L(
  "5 dk slaytsız sunum kaydı.",
  ["Giriş, 3 nokta, sonuç. Dolgu azalt."],
  [],
  ["Taslak 8 satır.", "5 dk kaydet.", "Dinle, dolguları işaretle, yeniden."],
  ["İkinci kayıt daha temiz mi?"],
  ["Süre ve netlik tamam mı?"]
));

add(LESSONS, "c1-u4-t3", L(
  "C1 kapı: zor metin + deneme + dinleme checklist.",
  ["Okuma zor set + 300 kelime + dinleme turu. Can-do listesi işaretle."],
  [],
  ["Üç parçayı bitir.", "Checklist yaz."],
  ["Zayıf kutu net mi?"],
  ["C2’ye geçiş için ne eksik?"]
));

add(LESSONS, "c1-u5-t1", L(
  "40 söylem bağlayıcısı listesi (karşıt/neden/ekleme/örnek).",
  ["Metin tutarlılığı için. Önceki akademik seti genişlet."],
  [],
  ["4 kategori × 10.", "Her birine cümle.", "Bağlaç antrenmanı."],
  ["Ezber testi 20 soru."],
  ["Yazıda çeşitlilik var mı?"],
  { train: "connector" }
));

add(LESSONS, "c1-u5-t2", L(
  "Zayıf paragrafı akademik üsluba çevirmek.",
  ["Kısa cümleleri birleştir; bağlayıcı ekle; tekrarı kır."],
  [],
  ["Kendi eski yazından 1 paragraf seç.", "Yeniden yaz.", "Önce/sonra karşılaştır."],
  ["Üslup yükseldi mi?"],
  ["Anlam bozulmadı mı?"]
));

add(LESSONS, "c1-u5-t3", L(
  "Eski yazında 5 bağlayıcı hatası bul ve düzelt.",
  ["Yanlış ilişki, gereks fazla ωστόσο, eksik bağ…"],
  [],
  ["5 hata + düzeltme.", "Hata günlüğüne ekle."],
  ["Aynı hatayı bir daha yapmamak için kural yaz."],
  ["5/5 düzeltildi mi?"]
));

// C2
add(LESSONS, "c2-u1-t1", L(
  "Edebi üslup analizi — uygulama içi edebiyat parçası.",
  [
    "Metin: «Το πρωί η πόλη μύριζε θάλασσα και φρεσκοψημένο ψωμί. Οι άνθρωποι περπατούσαν αργά, σαν να μην τους βιάζει κανένας χρόνος. Κάπου μακριά, μια καμπάνα θύμιζε ότι η μέρα είχε επίσημα αρχίσει.»",
    "Görev: imgeler, tempo, tekrar eden sesler, anlatıcı tutumu."
  ],
  [ex("μύριζε", "kokuyordu"), ex("σαν να…", "sanki…")],
  ["Metni 2 kez oku.", "Türkçe 150 kelime üslup analizi yaz.", "5 edebi kelimeyi ezberle."],
  ["Analizde en az 3 üslup özelliği."],
  ["Sadece özet değil, üslup konuştun mu?"]
));

add(LESSONS, "c2-u1-t2", L(
  "Kültürel kavram kartları (φιλότιμο vb.).",
  [
    "φιλότιμο: onur + gönüllü fedakârlık karışımı. κέφι: neşe/keyif hali. καφενείο: sosyal alan. φιλόξενια: misafirperverlik. μεράκι: işe tutkuyla bağlanma. παλικαριά: yiğitlik. μοίρα: kader. χωριό: köy kimliği. θάλασσα: kültürel motif. ιστορία: geçmişle bağ."
  ],
  [ex("φιλότιμο", "onur / gönüllü sorumluluk duygusu"), ex("φιλοξενία", "misafirperverlik"), ex("μεράκι", "tutkuyla yapılan iş")],
  ["10 kavram kartı: tanım + örnek cümle + kişisel yorum.", "3’ünü konuşmada kullan."],
  ["Kartları sesli anlat."],
  ["Türkçe’ye birebir zorlama çeviri yapmadın mı?"]
));

add(LESSONS, "c2-u1-t3", L(
  "Mizah/ironi: neden komik?",
  [
    "Örnek: «Θα φτάσω σε πέντε λεπτά» — Yunanistan’da bazen esnek zaman; abartı ve ortak bilgi mizah yaratır.",
    "İroni: söylenen ≠ kastedilen. Ton + bağlam."
  ],
  [],
  ["3 örnek yaz (kendi veya metinden).", "Her birinde mekanizma: abartı/ironi/kelime oyunu.", "Sesli anlat."],
  ["Açıklama Türkçe net mi?"],
  ["Kültürel varsayımı yazdın mı?"]
));

add(LESSONS, "c2-u2-t1", L(
  "Kendi alanından 100 terim (Yunanca tanım).",
  ["Meslek/okul alanın. Her satır: terim — Yunanca tanım — örnek."],
  [],
  ["100 satır tablo.", "Günde 20.", "10’unu sunumda kullan."],
  ["Tanımlar Yunanca mı (Türkçe kaçak az)?"],
  ["Aktif kullanım var mı?"]
));

add(LESSONS, "c2-u2-t2", L(
  "Alanından konuyu 8–10 dk Yunanca anlatmak.",
  ["Giriş, tanımlar, örnek, sonuç. Terim listeni kullan."],
  [],
  ["Taslak.", "10 dk kaydet.", "Anlaşılırlık için sadeleştir, yeniden kaydet."],
  ["Terimler doğru mu?"],
  ["Dinleyici varsayımı net mi?"]
));

add(LESSONS, "c2-u2-t3", L(
  "Teknik özet 300 kelime.",
  ["Makale/rapor yerine: kendi alan notların + uygulama akademik kelimeleri."],
  [],
  ["300 kelime özet.", "Jargon + bağlayıcı dengesi."],
  ["Özet tarafsız ve yoğun mu?"],
  ["C2 yoğunluğu var mı?"]
));

add(LESSONS, "c2-u3-t1", L(
  "İnce yapı bankası: nadir ama güçlü kalıplar.",
  [
    "όσο + karşılaştırma, είτε… είτε…, αντι να…, χωρίς να…, με το να…, το να + fiil (isimleştirme), όχι μόνο… αλλά και…"
  ],
  [ex("Αντί να φύγω, έμεινα.", "Gitmek yerine kaldım."), ex("Χωρίς να το καταλάβω…", "Anlamadan…"), ex("Το να μαθαίνεις κάθε μέρα βοηθάει.", "Her gün öğrenmek yardım eder.")],
  ["12 yapı × 2 cümle.", "Eski yazına 5’ini yerleştir."],
  ["Doğallık kontrolü."],
  ["Zorlama üslup olmadı mı?"]
));

add(LESSONS, "c2-u3-t2", L(
  "Eski yazını C2 üslubuna yeniden yazmak.",
  ["Daha yoğun bağlaç, daha az tekrar, daha net tez."],
  [],
  ["Eski B2/C1 yazısını seç.", "Yeniden yaz.", "Önce/sonra kelime çeşitliliği say."],
  ["İyileşme somut mu?"],
  ["Anlam aynı, üslup üstün mü?"]
));

add(LESSONS, "c2-u3-t3", L(
  "CEFR C2 can-do öz değerlendirme.",
  ["Uzun metin zahmetsiz mi? Nüans/ironi? Alan dili? Doğaçlama konuşma?"],
  [],
  ["10 can-do maddesi yaz, 1–5 puanla.", "≤3 olanlara görev bağla."],
  ["Dürüst puanlama."],
  ["Gelişim planı çıktı mı?"]
));

// C2+
add(LESSONS, "c2p-u1-t1", L(
  "Tam deneme #1 — uygulama sınav + cloze + okuma zinciri.",
  ["Gerçek süre: Mini sınav + ek cloze/okuma ile ~uzun oturum. Ham skor kaydet."],
  [],
  ["Süre tut.", "Cevapları işaretle.", "Skoru İlerleme/günlüğe yaz."],
  ["Kesinti olmadı mı?"],
  ["Ham skor not edildi mi?"],
  { train: "exam" }
));

add(LESSONS, "c2p-u1-t2", L(
  "Hata otopsi: neden + kural + benzer 2 soru.",
  ["Her yanlış için: kök neden, kural, 2 benzer soru üret (kendine)."],
  [],
  ["Tüm yanlışları tablola.", "Antrenmana bağla.", "Hata günlüğü."],
  ["Her satır dolu mu?"],
  ["Aynı tip tekrar etmesin diye plan var mı?"]
));

add(LESSONS, "c2p-u1-t3", L(
  "En zayıf soru tipinde 3 gün yoğun set.",
  ["Cloze mi, okuma çıkarımı mı, bağlaç mı? O antrenmanı günde 2 blok."],
  [],
  ["Zayıf tipi seç.", "3 gün × ilgili antrenman/drill.", "Mini ölçüm."],
  ["Skor yükseldi mi?"],
  ["Tip hâlâ zayıf mı?"]
));

add(LESSONS, "c2p-u1-t4", L(
  "Tam deneme #2 — iyileşmeyi ölç.",
  ["Aynı koşullar. #1 ile karşılaştır."],
  [],
  ["Deneme.", "Fark tablosu.", "Yeni zayıf tip."],
  ["Tutarlı band?"],
  ["Bir sonraki döngü planı?"],
  { train: "exam" }
));

add(LESSONS, "c2p-u2-t1", L(
  "Haftalık uzun okuma + kelime defteri.",
  ["Okuma setlerini birleştir; 1 uzun oturum. Deftere 15 kelime."],
  [],
  ["60 dk okuma.", "15 kelime + cümle.", "1 özet."],
  ["Rutin bu hafta işledi mi?"],
  ["Kelimeler tekrar listesine girdi mi?"]
));

add(LESSONS, "c2p-u2-t2", L(
  "Haftalık 45 dk dinleme bakımı.",
  ["Dinle-anla + dikte + kalıp. Not al."],
  [],
  ["45 dk.", "10 ifade.", "3 üretim cümlesi."],
  ["Pasif kalmadın mı?"],
  ["İfadeler aktif mi?"],
  { train: "listen" }
));

add(LESSONS, "c2p-u2-t3", L(
  "Haftalık üretim: deneme veya 10 dk konuşma.",
  ["Birini seç, bitir, kaydet/ arşivle."],
  [],
  ["Üretim yap.", "1 hata listesi çıkar.", "Düzeltme sürümü."],
  ["Üretim tamam mı?"],
  ["Gerileme sinyali var mı?"]
));

add(LESSONS, "c2p-u2-t4", L(
  "Aylık seviye kontrolü.",
  ["Kısa deneme + konuşma. Gerileme varsa ilgili birime dön (Yol haritası)."],
  [],
  ["Mini sınav + 3 dk konuşma.", "Can-do güncelle.", "Geri dönüş görevi seç."],
  ["Karar net mi?"],
  ["Takvimde gelecek ay kontrolü var mı?"],
  { train: "exam" }
));

// Emit lessons.js
const out = `/* Autogenerated self-contained lessons for every task — A0→C2+ */
const LESSONS = ${JSON.stringify(LESSONS, null, 2)};

const Lessons = {
  get(taskId) {
    return LESSONS[taskId] || null;
  },
  allIds() {
    return Object.keys(LESSONS);
  }
};
`;

fs.writeFileSync(path.join(__dirname, "../js/lessons.js"), out);
console.log("lessons.js", Object.keys(LESSONS).length, "keys");

// verify against curriculum ids
const cur = fs.readFileSync(path.join(__dirname, "../js/curriculum.js"), "utf8");
eval(cur.replace("const CURRICULUM", "global.CURRICULUM"));
const extrasCode = fs.readFileSync(path.join(__dirname, "../js/extras.js"), "utf8");
eval(extrasCode.replace("const EXTRAS", "global.EXTRAS"));
Object.keys(EXTRAS.units || {}).forEach((levelId) => {
  const level = CURRICULUM.levels.find((l) => l.id === levelId);
  if (!level) return;
  EXTRAS.units[levelId].forEach((u) => {
    if (!level.units.some((x) => x.id === u.id)) level.units.push(u);
  });
});
const missing = [];
CURRICULUM.levels.forEach((l) =>
  l.units.forEach((u) =>
    u.tasks.forEach((t) => {
      if (!LESSONS[t.id]) missing.push(t.id);
    })
  )
);
console.log("missing", missing.length, missing.join(","));
