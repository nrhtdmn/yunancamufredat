/* Builds theory-deep-a2b1.js and theory-deep-b2c2.js with detailed Turkish theory */
const fs = require("fs");
const path = require("path");
const tasks = require("./_tasks.json");

function P(...paras) {
  return paras;
}

const A2B1 = {
  "a2-u1-t1": P(
    "Aorist (αόριστος) bitmiş/tek seferlik geçmiş eylemi anlatır; Türkçe -di’li geçmişe yakındır: Χθες έγραψα ένα μήνυμα.",
    "Düzenli aoristin omurgası: augment (çoğu kez έ-) + aorist gövdesi + kişi ekleri. γράφω → έγραψα, έγραψες, έγραψε, γράψαμε, γράψατε, έγραψαν.",
    "Aorist gövdesi şimdikinden farklı olabilir (γράφ- → γράψ-, διαβάζ- → διάβασ-, μίλησ-). ψ/σ gibi ünsüzler sık aorist işaretidir.",
    "Kullanım alanı: dün olan olaylar, tamamlanmış listeler, hikâyeyi ileri götüren eylemler.",
    "İmperfect önizlemesi: έγραφα (yazıyordum/yazardım) ≠ έγραψα (yazdım). Aynı fiil, farklı bakış (aspect).",
    "Türkçe tuzak: Her geçmişi aorist sanmak. Alışkanlık/tasvir için imperfect gerekir; bu derste önce aoristi kur.",
    "Sık hatalar: augment unutmak, şimdiki ekleri aorist gövdeye takmak, vurguyu kaydırmak.",
    "15 düzenli fiilde 1. tekil aorist + 8 cümle (χθες / το πρωί / πριν από δύο μέρες).",
    "Hedef: 15 fiilde doğru gövde+kişi; 8 doğal aorist cümlesi."
  ),
  "a2-u1-t2": P(
    "Düzensiz aoristler en sık fiillerdedir: πήγα, ήρθα, είδα, είπα, έφαγα, ήπια, πήρα, έδωσα. Kural üretmez; kart ezberi şart.",
    "Kart formatı: şimdiki | aorist | Türkçe | örnek cümle. Χθες πήγα στην αγορά. Του είπα την αλήθεια.",
    "ήρθα / είπα / είδα çekimlerini özellikle çalış; konuşma ve dolaylı anlatımın temelidir.",
    "Türkçe git/gel/gör/de/ye de düzensizdir — listeyi sahiplen, şikayet etme.",
    "Sık hata: πήγαινα (imperfect) ile πήγα (aorist) karışımı; uydurma gövdeler (έβλεψα).",
    "Her çekirdek fiilden 2 cümle + desteyi bitir.",
    "Hedef: 8 düzensiz aoristi otomatik üretmek."
  ),
  "a2-u1-t3": P(
    "«Dün ne yaptım?» aoristi metne çevirir (~150 kelime). Sabah–akşam olay zinciri kur.",
    "İskelet: ξύπνησα… έφαγα… πήγα… είδα… γύρισα… κοιμήθηκα… Saat ve yer ekle.",
    "Bağlaçlar: και, μετά, το απόγευμα, το βράδυ. Tekdüze «έκανα» tekrarından kaçın.",
    "Yaz → sesli oku → aorist fiilleri boya; düzenli/düzensiz say.",
    "Sık hata: Şimdiki zamana kaymak veya bilinçsiz imperfect.",
    "Hedef: 150 kelimelik aorist ağırlıklı günlük."
  ),
  "a2-u2-t1": P(
    "Παρατατικός geçmişte süre, alışkanlık, tasvir, arka plan anlatır ≈ Türkçe -yordu/-ardı: Παλιά διάβαζα πολύ.",
    "Biçim: augment + (çoğu kez) şimdiki gövdeye yakın biçim + imperfect ekleri (έγραφα, έγραφες…). Sınıf tablosunu ezberle.",
    "Karşıt: Χθες διάβασα το βιβλίο (bitmiş) vs Διάβαζα όταν… (süreç).",
    "Hikâyede imperfect sahne kurar, aorist olayı ilerletir — okuma için kritik fark.",
    "Sık hata: Her geçmişi imperfect yapmak; süreç yokken imperfect seçmek.",
    "Aynı fiili iki cümlede aorist/imperfect yaz, Türkçe gerekçe ekle.",
    "Hedef: 10 fiil tanıma + 6 doğru imperfect cümlesi."
  ),
  "a2-u2-t2": P(
    "Çocukluk anlatısı imperfect evindedir: Όταν ήμουν μικρός/ή, έπαιζα… πήγαινα…",
    "120+ kelime: yer, alışkanlık, insanlar, duygular. Özel anlar için seyrek aorist (μια φορά είδα…).",
    "είμαι imperfect: ήμουν, ήσουν, ήταν… ayrıca ezberle.",
    "Sık hata: Çocukluğu tamamen aorist yazmak.",
    "Hedef: Tutarlı 120+ kelimelik paragraf."
  ),
  "a2-u2-t3": P(
    "10 cümlede bilinçli aorist/imperfect seçimi; her birine Türkçe «neden» yaz.",
    "Sor: Bitti mi? Arka plan mı? Alışkanlık mı? Kesilen süreç mi?",
    "Klasik: Έτρωγα όταν χτύπησε το τηλέφωνο.",
    "Hedef: 10/10 gerekçeli doğru seçim."
  ),
  "a2-u3-t1": P(
    "Gelecek: θα + fiil. Θα πάω, θα δω, θα μιλήσω. θα değişmez; kişi fiildedir.",
    "Olumsuz: Δεν θα έρθω (sıra önemli).",
    "Plan ve tahmin: Αύριο θα δουλέψω. Θα βρέχει μάλλον.",
    "Türkçe -ecek ≈ θα + fiil; θα’yı düşürme.",
    "Sık hata: Yanlış gövde; θα’yı fiilden ayırmamak.",
    "20 plan cümlesi.",
    "Hedef: 20 doğru gelecek + olumsuz."
  ),
  "a2-u3-t2": P(
    "Hafta sonu planı: Cumartesi–Pazar θα zinciri + saat/yer; yazılı ve sözlü.",
    "Çeşit: Μετά θα… Το βράδυ θα… Αν προλάβω, θα…",
    "1 dk kaydet; netlik ve çekim kontrolü.",
    "Hedef: 10+ cümlelik plan monoloğu."
  ),
  "a2-u3-t3": P(
    "Nazik istek: Θα ήθελα… Μπορώ να…; Μήπως…; Θα μπορούσατε…",
    "Emir yerine Rica katmanı — kafe, ofis, yabancı.",
    "να’ya köprü: Μπορώ να κλείσω ραντεβού;",
    "Sık hata: Her yerde sert Θέλω.",
    "8 nazik cümle.",
    "Hedef: 8 kibar istek kalıbı."
  ),
  "a2-u4-t1": P(
    "Bağlaçlar metni büyütür: και, αλλά, γιατί, όταν, αν, που, για να, μετά, πριν, ενώ, όμως…",
    "15 bağlaç × 1 örnek listele; başta ve ortada dene.",
    "που özeldir — sonra B1’de derinleşir; şimdiden örneğini yaz.",
    "Sık hata: Her şeyi και ile bağlamak.",
    "Hedef: 15 sağlam örnek."
  ),
  "a2-u4-t2": P(
    "A2 okuma stratejisi: başlık → ilk/son → sorular → metin. Ana fikir önce.",
    "Bilinmeyen kelimede panik yok; bağlam tahmini.",
    "5 soruya tam cümle yanıt.",
    "Hedef: 5/5 anlamlı cevap."
  ),
  "a2-u4-t3": P(
    "Samimi e-posta ~120 kelime: selam + geçmiş (aorist) + gelecek (θα) + soru + kapanış.",
    "Γεια σου… Τα λέμε! Resmi üslup değil.",
    "Sık hata: Sadece şimdiki zaman.",
    "Hedef: Dengeli 120 kelimelik mail."
  ),
  "a2-u4-t4": P(
    "A2 kapısı: aorist/imperfect/gelecek/bağlaç + 200 kelimelik metin öz-değerlendirmesi.",
    "Zayıf alanı adlandır ve tekrara yaz.",
    "Sağlam değilsen B1’e zorlama.",
    "Hedef: Güçlü/zayıf listesi + örnek metin."
  ),
  "a2-u5-t1": P(
    "Doğrudan nesne (αιτιατική) çoğu «kimi/neyi?» sorusunun yanıtıdır. Maddeler değişir: τον/την/το; çoğul τους/τις/τα.",
    "Örnek: Βλέπω τον φίλο μου. Αγοράζω το βιβλίο. Καλώ την Μαρία.",
    "Eril belirsizde συχνά έναν: Θέλω έναν καφέ.",
    "Türkçe durum ekleri yok; Yunancada madde+isim biçimi nesneyi işaretler.",
    "Sık hata: Yalın maddeyi nesnede bırakmak (βλέπω ο φίλος).",
    "12 cümle: fiil + doğru nesne maddesi.",
    "Hedef: τον/την/το’yu %90 doğru seçmek."
  ),
  "a2-u5-t2": P(
    "Çift zamir: dolaylı + doğrudan (μου το, σου το, του το…). Θα σου το δώσω. Μου το είπε.",
    "Sıra genelde: dolaylı kişi + doğrudan nötr/isim zamiri + fiil.",
    "Başlangıç seti: μου το / σου το / μας το + δίνω/λέω/στέλνω.",
    "Sık hata: Türkçe «onu bana» sırasını aynen kopyalamak.",
    "10 mini diyalog.",
    "Hedef: 6 çift zamir kalıbını akıcı kullanmak."
  ),
  "a2-u5-t3": P(
    "Sipariş diyaloğu nesne + rica birleştirir: Θα ήθελα έναν… Μου φέρνετε το…;",
    "Rol: müşteri–garson; nesne maddelerine dikkat.",
    "Kaydet 2 dk.",
    "Hedef: Hatasız sipariş + 1 çift zamir."
  ),
  "a2-u6-t1": P(
    "Ofis kalıpları: σύσκεψη, προθεσμία, αρχείο, email, τηλεφώνημα. Έχω σύσκεψη στις… Η προθεσμία είναι…",
    "10 cümle: toplantı, son tarih, dosya gönderme, ara.",
    "Resmiyet: Θα σας στείλω το αρχείο σήμερα.",
    "Sık hata: Samimi fiilleri iş mailine taşımak.",
    "Hedef: 10 ofis cümlesi."
  ),
  "a2-u6-t2": P(
    "İş e-postası ~120 kelime: konu satırı zihnen, hitap, rica, tarih, kapanış (Με εκτίμηση).",
    "Kalıp: Σας γράφω για… Θα μπορούσατε να… Παρακαλώ επιβεβαιώστε…",
    "Geçmiş+gelecek bilgi harmanla.",
    "Hedef: Gönderilebilir kısa resmi mail."
  ),
  "a2-u6-t3": P(
    "Toplantı rolü: Ας… Συμφωνώ… Διαφωνώ… Ας το αναβάλουμε…",
    "2 dk kaydet; en az 5 kalıp.",
    "Hedef: Toplantı mikrofonunda anlaşılır katkı."
  ),
  "a2-u7-t1": P(
    "Sağlık şikayetleri: Με πονάει ο λαιμός / το κεφάλι. Έχω πυρετό. Νιώθω αδυναμία.",
    "Vücut + με πονάει kalıbını ezberle; cinsiyet/maddeye dikkat.",
    "Doktor sorusu: Από πότε; Πόσο συχνά;",
    "Sık hata: Türkçe ‘başım ağrıyor’u kelime kelime yanlış kurmak.",
    "10 şikayet cümlesi.",
    "Hedef: 8 semptom kalıbı."
  ),
  "a2-u7-t2": P(
    "Doktor diyaloğu: semptom → soru → tavsiye (Πρέπει να… Ξεκουράσου… Πάρε…). Kaydet.",
    "Nazik üslup; panik kelimelerinden kaçın.",
    "Hedef: 2 dk’lık tutarlı rol."
  ),
  "a2-u7-t3": P(
    "Geçmiş hastalık: aorist/imperfect karışımı. Πέρσι αρρώστησα… Είχα πυρετό… Έμεινα στο κρεβάτι…",
    "Kısa paragraf yaz; zaman zarfları ekle.",
    "Hedef: 80–120 kelimelik hastalık anlatısı."
  ),
  "a2-u8-t1": P(
    "Mağaza: Μπορώ να το δοκιμάσω; Έχετε άλλο μέγεθος/χρώμα; Μου πάει;",
    "Beden/renk kelimeleri + deneme kalıbı.",
    "Hedef: Deneme diyaloğunu akıcı kurmak."
  ),
  "a2-u8-t2": P(
    "Ödeme: Με κάρτα / μετρητά. Κάνει έκπτωση; Την απόδειξη, παρακαλώ.",
    "Fiyat sor + ödeme seç + fiş iste.",
    "Hedef: 6 ödeme kalıbı."
  ),
  "a2-u8-t3": P(
    "Müşteri–satıcı rolü 2 dk: deneme + fiyat + ödeme zinciri. Kaydet.",
    "Hedef: Eksiksiz alışveriş diyaloğu."
  ),
  "a2-u9-t1": P(
    "Kalıp bankası: istek (Θέλω να…), zorunluluk (Πρέπει να…), zaman (Όταν…), izin (Μπορώ να…). İskeleti ezberle.",
    "Her iskelete 3 örnek; TR→YN üretim yap.",
    "Hedef: 12 kalıp iskeleti."
  ),
  "a2-u9-t2": P(
    "Kalıbı doldur: boşluklu iskelete kendi kelimelerini koy. Üretim kası buradadır.",
    "Pattern-fill antrenmanı + 3 kendi cümle / kalıp.",
    "Hedef: 10 doldurulmuş kalıp."
  ),
  "a2-u9-t3": P(
    "2 dk sadece kalıp iskeletiyle konuş. Amaç akıcılık, süs değil.",
    "Kaydet; kaç kalıp kullandın say.",
    "Hedef: En az 8 kalıp / 2 dk."
  ),
  "a2-u10-t1": P(
    "Otel: Έχω κράτηση για… Το δωμάτιο είναι στον … όροφο. Τι ώρα είναι το check-out; Υπάρχει Wi-Fi;",
    "Resepsiyon rolü: nazik, net, kısa.",
    "Hedef: 6 otel kalıbı."
  ),
  "a2-u10-t2": P(
    "Randevu: Θέλω να κλείσω ραντεβού. Είστε διαθέσιμος/η; Αναγκάζομαι να ακυρώσω. Μπορούμε να το μεταθέσουμε;",
    "Al / iptal / ertele üçlüsünü ayrı ayrı ezberle.",
    "Hedef: 3 işlem × 2 cümle."
  ),
  "a2-u10-t3": P(
    "Şikayet: Έχω πρόβλημα με… Δεν λειτουργεί… Θα μπορούσατε να το φτιάξετε;",
    "Kibar kal; emirden kaçın. 2 dk kaydet.",
    "Hedef: Nazik şikayet monoloğu."
  ),
  "a2-u11-t1": P(
    "Banka: ανοίγω λογαριασμό, ανάληψη, κατάθεση, υπόλοιπο, προμήθεια, μπλοκαρίστηκε η κάρτα.",
    "Vezne rolü cümleleri yaz.",
    "Hedef: 6 banka kalıbı."
  ),
  "a2-u11-t2": P(
    "Davet: Θέλεις να έρθεις; Με χαρά! Δυστυχώς δεν μπορώ. Φέρνω κάτι; Ευχαριστώ για την πρόσκληση.",
    "Kabul ve red nazik olsun.",
    "Hedef: 2 diyalog (kabul+red)."
  ),
  "a2-u11-t3": P(
    "Ev/komşu: Μένω σε διαμέρισμα. Ο γείτονας κάνει θόρυβο. Χάλασε το ψυγείο. Ψάχνω διαμέρισμα προς ενοικίαση.",
    "2 dk ev anlat + 1 şikayet.",
    "Hedef: 5 ev kalıbı."
  ),

  "b1-u1-t1": P(
    "να yapısı Yunancanın omurgasıdır: Θέλω να μάθω. Πρέπει να διαβάσω. Για να καταλάβω. να + (çoğu kez) çekimli fiil.",
    "Türkçe -mak/-mek veya ‘ki …sin’ alanlarını να karşılar. Fiil kişiye göre çekilir: Θέλω να πάω / Θέλεις να πάς.",
    "Sık tetikleyiciler: θέλω, μπορώ, πρέπει, αρχίζω, προσπαθώ, για να…",
    "Sık hata: να’dan sonra mastar aramak (Yunancada İngilizce to-infinitive yok); kişi uyumsuzluğu.",
    "25 cümle: istek/zorunluluk/amaç.",
    "Hedef: 25 doğru να cümlesi."
  ),
  "b1-u1-t2": P(
    "Aspect: να γράφω (süreç/alışkanlık) vs να γράψω (tek sefer/bitmiş bakış). İkisi de ‘subjunctive’ alanında; gövde farkı anlamı değiştirir.",
    "Θέλω να γράφω κάθε μέρα (düzen) vs Θέλω να γράψω ένα μήνυμα τώρα (tek iş).",
    "Türkçe tek ‘yazmak’ ile bu farkı vermez; bilinçli seç.",
    "Sık hata: Hep aorist gövde veya hep present gövde.",
    "15 dönüşüm çifti yaz.",
    "Hedef: 10 çiftte doğru aspect seçimi."
  ),
  "b1-u1-t3": P(
    "Tavsiye: Πρέπει να… Καλό είναι να… Αν ήμουν εσύ, θα… Μην…",
    "Arkadaşa 5 tavsiye; kaydet.",
    "Hedef: 5 tavsiye + nazik üslup."
  ),
  "b1-u2-t1": P(
    "Pasif şimdiki: γράφεται, λέγεται, γίνεται. Haber dilinde özne ‘yapan’ değil ‘etkilenen/olan’dır.",
    "Το άρθρο γράφεται στα ελληνικά. Λέγεται ότι…",
    "Türkçe -il/-nıl ile kısmen örtüşür.",
    "Sık hata: Aktif özneyi zorla eklemek.",
    "12 haber cümlesi.",
    "Hedef: 8 pasif tanıma + 6 üretim."
  ),
  "b1-u2-t2": P(
    "Orta çatı: σκέφτομαι, θυμάμαι, ντρέπομαι, φοβάμαι, αισθάνομαι. Çekim ayrı tablo ister.",
    "15 fiil + cümle; anlam çoğu ‘kendi içinde’ süreç.",
    "Sık hata: Aktif ekleri orta çatıya takmak.",
    "Hedef: 15 fiil × 1 cümle."
  ),
  "b1-u2-t3": P(
    "Kısa haber oku → 80 kelimelik özet. Pasif ve λέγεται ότι… kalıplarını bilerek kullan.",
    "Özet = ana fikir + 2 detay + sonuç; kopyala-yapıştır değil.",
    "Hedef: 80 kelimelik kendi özetin."
  ),
  "b1-u3-t1": P(
    "Tip 1 koşul (gerçekçi): Αν + şimdiki/uygun biçim, θα + gelecek. Αν έχει χρόνο, θα έρθει.",
    "Türkçe ‘eğer …-se’ gerçekçi plan.",
    "15 örnek: hava, zaman, para, ders.",
    "Sık hata: αν’dan sonra yanlış zaman.",
    "Hedef: 15 tip 1 cümle."
  ),
  "b1-u3-t2": P(
    "Tip 2 (hayali): Αν + imperfect, θα + imperfect. Αν είχα χρήματα, θα ταξίδευα.",
    "Şu an gerçek değil; karşıolgusal.",
    "Türkçe -seydi/-ırdı alanına yakın.",
    "Sık hata: Tip 1 ile karıştırmak.",
    "12 hayali cümle.",
    "Hedef: 12 doğru tip 2."
  ),
  "b1-u3-t3": P(
    "3 konuda 1’er dk Αν… konuş. Tip 1 ve 2’yi karıştır.",
    "Kaydet; koşul sayısını say.",
    "Hedef: Her konuda en az 3 koşul cümlesi."
  ),
  "b1-u4-t1": P(
    "Tematik 5×40 kelime: iş, sağlık, eğitim, çevre, teknoloji. Madde+cinsiyetle kartla.",
    "Her temadan 5 üretim cümlesi.",
    "Hedef: 200 kelimelik aktif bankanın temeli."
  ),
  "b1-u4-t2": P(
    "30 eş/zıt çift: μεγάλος–μικρός, αρχίζω–τελειώνω… Bağlam cümlesi şart.",
    "YDS’de çeldirici için bu ağ kritik.",
    "Hedef: 30 çift + 10 cümle."
  ),
  "b1-u4-t3": P(
    "15 dk dinle: 8 anahtar kelime + ana fikir. Hız yavaş haber/podcast A2–B1.",
    "İkinci dinleyişte detay avla.",
    "Hedef: Anlaşılır not sayfası."
  ),
  "b1-u4-t4": P(
    "B1 kapı: okuma + dilbilgisi + 200 kelimelik görüş. Zayıf alanı işaretle.",
    "να, koşul, pasif, kelime — hangisi düştü?",
    "Hedef: Net teşhis + plan."
  ),
  "b1-u5-t1": P(
    "που: ilgi zamiri/bağlacı. Ο άντρας που μένει εδώ… Το βιβλίο που διάβασα…",
    "Türkçe ‘ki …’ / sıfat cümlesi. που çoğu zaman değişmez biçimdir (başlangıç seviyesi).",
    "Sık hata: που’yu atıp iki cümleyi kopuk bırakmak.",
    "15 που cümlesi.",
    "Hedef: 15 birleşik cümle."
  ),
  "b1-u5-t2": P(
    "Tanımlayıcı vs ek bilgi: The man who lives here (gerekli) vs my brother, who… (ek). Yunancada virgül/bağlam ipucu verir; abartmadan hisset.",
    "Pratik: Aynı ismi iki tür yan cümleyle genişlet.",
    "Hedef: 6 çift örnek."
  ),
  "b1-u5-t3": P(
    "Kişi tanıt: isim + που cümlesi + meslek/hobiler. 1 dk konuş.",
    "Hedef: Akıcı tanımlayıcı zincir."
  ),
  "b1-u6-t1": P(
    "Üstünlük: πιο + sıfat / -τερος; en üst: ο πιο… / -τατος. Η Αθήνα είναι μεγαλύτερη από…",
    "από ile karşılaştırma nesnesi.",
    "12 cümle.",
    "Sık hata: από’yu unutmak; sıfat uyumunu düşürmek.",
    "Hedef: 12 karşılaştırma."
  ),
  "b1-u6-t2": P(
    "Olumlu emir: Έλα, Δώσε, Διάβασε, Γράψε… Tekil/çoğul ve kibarlık (σας) farkını gör.",
    "Olumsuz emir ayrı kalıptır (μην + …) — karıştırma.",
    "Tablo + 10 emir cümlesi.",
    "Hedef: 10 doğru emir."
  ),
  "b1-u6-t3": P(
    "2 dk karşılaştırma konuşması: şehir/yemek/dil — πιο / ο πιο.",
    "Kaydet.",
    "Hedef: 6 karşılaştırma cümlesi sözlü."
  ),
  "b1-u7-t1": P(
    "Gelecek zarfları: αύριο, μεθαύριο, την επόμενη εβδομάδα, του χρόνου, σύντομα, αργότερα.",
    "10 plan cümlesi θα ile.",
    "Hedef: 10 zarf×cümle."
  ),
  "b1-u7-t2": P(
    "Duygu: Είμαι… Νιώθω… Χαίρομαι που… Λυπάμαι που… Φοβάμαι μήπως…",
    "που/μήπως seçimine dikkat.",
    "10 duygu cümlesi.",
    "Hedef: 8 duygu kalıbı."
  ),
  "b1-u7-t3": P(
    "Yer edatları: πάνω, κάτω, μπροστά, πίσω, δίπλα, ανάμεσα, κοντά σε, μακριά από…",
    "12 konum cümlesi.",
    "Hedef: 12 doğru edatlı cümle."
  ),
  "b1-u8-t1": P(
    "Bağlaçlı kalıplar: παρόλο που, γι’ αυτό, για να, ενώ, ώστε… Cümleyi büyütür.",
    "Her birine 2 örnek.",
    "Hedef: 10 ileri bağlaç örneği."
  ),
  "b1-u8-t2": P(
    "που & αν kalıplarını dönüştür: iki kısa cümle → birleşik. 15 dönüşüm.",
    "Hedef: 15 doğru birleşik."
  ),
  "b1-u8-t3": P(
    "150 kelime yazı; en az 8 kalıp/bağlaç. İşaretle say.",
    "Hedef: 8+ kalıplı metin."
  ),
  "b1-u9-t1": P(
    "Tech: Δεν ανοίγει η εφαρμογή. Ξέχασα τον κωδικό. Στείλε τον σύνδεσμο. Κάνε επανεκκίνηση.",
    "Destek hattı rolü.",
    "Hedef: 7 tech kalıbı."
  ),
  "b1-u9-t2": P(
    "Zaman: Δεν προλαβαίνω. Χάνω χρόνο. Βάζω προτεραιότητες. Αναβάλλω. Οργανώνω το πρόγραμμα.",
    "1 paragraf + kalıp listesi.",
    "Hedef: 5 zaman kalıbı."
  ),
  "b1-u9-t3": P(
    "Karşılaştırma + onay/red: πιο…από · όσο…τόσο · Συμφωνώ · Καταλαβαίνω…αλλά…",
    "2 dk tartışma kaydı.",
    "Hedef: Nazik red + 3 karşılaştırma."
  )
};

const B2C2 = {
  "b2-u1-t1": P(
    "Parakeimenos (έχω + αππαρέμφατο/ρήμα τύπος): έχω γράψει ≈ ‘yazmış bulunuyorum / yazmışlığım var’. Sonuç odaklı geçmiş.",
    "Kullanım: deneyim, sonucu süren eylem, henüz/çoktan (ήδη, ποτέ, ακόμα).",
    "Türkçe -miş / ‘…miş bulunuyor’ alanına kısmen yakın; her aoristin yerine geçmez.",
    "Έγραψα (olay) vs Έχω γράψει (sonuç/deneyim) farkını 10 çiftte yaz.",
    "Sık hata: Her geçmişi perfect yapmak.",
    "20 cümle.",
    "Hedef: 20 bilinçli perfect."
  ),
  "b2-u1-t2": P(
    "Dolaylı anlatım: Είπε ότι… Ρώτησε αν… Μου είπε να… Zaman ve kişi kaymalarına dikkat.",
    "Dönüşüm alıştırması: doğrudan → dolaylı 15 cümle.",
    "Türkçe ‘diye/ki’ zincirine benzer ama Yunanca bağlaç seçimi net olmalı.",
    "Sık hata: ότι / αν / να karışımı.",
    "Hedef: 15 doğru dönüşüm."
  ),
  "b2-u1-t3": P(
    "İleri bağlaçlar: παρόλο που, ενώ, ώστε, εφόσον, ωστόσο, εντούτοις, συνεπώς…",
    "Akademik yazıda paragraf bağını bunlar taşır. Her birine 2 örnek.",
    "YDS’de çeldirici bağlaç soruları için anlam nüansını yaz (karşıt mı sonuç mu?).",
    "Hedef: 10 bağlaç × 2 örnek."
  ),
  "b2-u2-t1": P(
    "Haftalık haber rutini: 3 metin → her biri özet + 5 kelime. Kaynak uygulama içi okuma setleri de olur.",
    "Özet kendi cümlelerinle; kopyalama yok.",
    "Hedef: 3× (özet+5 kelime)."
  ),
  "b2-u2-t2": P(
    "Normal hız dinleme: ilk geçiş altyazısız ana fikir; ikinci geçiş not. 8–12 dk.",
    "Bilinmeyenleri tahmin et, sonra doğrula.",
    "Hedef: Ana fikir + 8 kelime notu."
  ),
  "b2-u2-t3": P(
    "250–300 kelime görüş: giriş–gelişme–sonuç. Tez cümlesi net olsun.",
    "En az 6 ileri bağlaç/kalıp.",
    "Hedef: Yapılı 300’e yakın deneme."
  ),
  "b2-u3-t1": P(
    "Paragraf anatomisi: konu cümlesi, destek, örnek, sonuç. 5 paragrafta işaretle.",
    "YDS’de soru çoğu kez konu cümlesi veya çıkarım ister.",
    "Hedef: 5 paragraf analizi."
  ),
  "b2-u3-t2": P(
    "Bağlamdan kelime: 10 bilinmeyeni sözlüksüz tahmin → sonra doğrula. Tahmin gerekçesi yaz.",
    "Hedef: 10 tahmin + doğrulama."
  ),
  "b2-u3-t3": P(
    "YDS tarzı 10 soru, ~12 dk. Süre tut. Bitince hata türü işaretle.",
    "Hedef: Süre içinde 10 soru + analiz."
  ),
  "b2-u3-t4": P(
    "Hata günlüğü: kelime / yapı / çıkarım / dikkat. Aynı hatayı tekrar etme planı yaz.",
    "Hedef: Sınıflı hata listesi."
  ),
  "b2-u4-t1": P(
    "10 konu kartı × 2 dk hazırlıksız konuşma. Kaydet. Dolgu (εε, δηλαδή) azalt.",
    "Hedef: 10 take; 3’ünü yeniden çek."
  ),
  "b2-u4-t2": P(
    "Tezi savun → karşı argümanı da anlat. Αφενός… αφετέρου… Ωστόσο…",
    "Hedef: İki tarafı da 2’şer dk."
  ),
  "b2-u4-t3": P(
    "B2 kapı: okuma+yazma+4 dk konuşma. CEFR B2 checklist ile işaretle.",
    "Hedef: Kanıtlı öz-değerlendirme."
  ),
  "b2-u5-t1": P(
    "Görüş kalıp bankası: Κατά τη γνώμη μου… Συμφωνώ ότι… Διαφωνώ επειδή… Από τη μία…",
    "20 kalıp ezber + örnek.",
    "Hedef: 20 kalıp."
  ),
  "b2-u5-t2": P(
    "300 kelimelik görüş; en az 12 kalıp işaretli.",
    "Hedef: Kalıp yoğun ama doğal metin."
  ),
  "b2-u5-t3": P(
    "Sözlü savunma 3 dk; kalıpları abartmadan kullan.",
    "Hedef: Net tez + 2 gerekçe + örnek."
  ),
  "b2-u6-t1": P(
    "Yazma iskeleti: giriş tezi, gerekçe, örnek, karşıt, sonuç. 8 çerçeve cümlesi ezberle.",
    "Hedef: 8 iskelet otomatik."
  ),
  "b2-u6-t2": P(
    "250 kelime deneme; iskeleti uygula. Süre tut (40–45 dk).",
    "Hedef: Tam iskeletli deneme."
  ),
  "b2-u6-t3": P(
    "Kendi yazını düzenle: bağlaç çeşitliliği, tekrar kırpma, uzun cümleleri böl.",
    "Önce/sonra karşılaştır.",
    "Hedef: Görünür iyileşme."
  ),
  "b2-u7-t1": P(
    "Akademik görüş: Κατά τη γνώμη μου… Σύμφωνα με… Είναι σημαντικό να…",
    "Samimi dil ile akademik dil farkını 5 çiftte göster.",
    "Hedef: 10 akademik kalıp."
  ),
  "b2-u7-t2": P(
    "Resmi mail: bilgilendirme + onay isteği + kapanış. Hitap ve imza.",
    "Hedef: 1 eksiksiz resmi mail."
  ),
  "b2-u7-t3": P(
    "Cloze/okumada kalıp avı: 10 kalıp listele, anlamını yaz.",
    "Hedef: 10 kalıp kartı."
  ),
  "b2-u8-t1": P(
    "Haber dili: Ανακοινώθηκε ότι… Σύμφωνα με πληροφορίες… Η συζήτηση επικεντρώνεται σε…",
    "Pasif ve dolaylılık yoğunluğu yüksektir.",
    "Hedef: 8 haber kalıbı."
  ),
  "b2-u8-t2": P(
    "C2’ye yaklaşan üslup denemesi: αξιοσημείωτο, έγκειται, ουσία — abartmadan 5 kalıp.",
    "150–200 kelime.",
    "Hedef: Doğal yoğunluk."
  ),
  "b2-u8-t3": P(
    "Okumada kalıp avı + pattern antrenmanı. 5 kalıp deftere.",
    "Hedef: 5 kalıp + tur."
  ),

  "c1-u1-t1": P(
    "Üslup dönüşümü: aynı mesaj samimi / nötr / resmi. Kelime seçimi, hitap, dolaylılık değişir.",
    "5 mesaj × 3 üslup. Farkları Türkçe not et.",
    "Hedef: 5 üçlü dönüşüm."
  ),
  "c1-u1-t2": P(
    "Akademik bağlayıcılar: εντούτοις, συνεπώς, ιδιαιτέρως, αναμφίβολα, επομένως, εν τέλει…",
    "40 ifade kartı; her birine 1 cümle.",
    "Hedef: 40’ın 30’unu aktif kullanmak."
  ),
  "c1-u1-t3": P(
    "Uzun metin → 200 kelimelik özet. Ana tez + argümanlar + sonuç; alıntı yağmuruna hayır.",
    "Hedef: Yoğun ama sadık özet."
  ),
  "c1-u2-t1": P(
    "50 deyim: anlam + örnek + Türkçe karşılık. Deyimi bağlamda öğren.",
    "Günde 10 deyim × 5 gün.",
    "Hedef: 50 kart tamam."
  ),
  "c1-u2-t2": P(
    "10 düz cümleyi idiomatik/doğal hale getir. Abartma; anlaşılırlık önce.",
    "Hedef: 10 iyileştirme."
  ),
  "c1-u2-t3": P(
    "20 dk native içerik: yeni ifadeleri listele (en az 12).",
    "Hedef: 12 ifade defteri."
  ),
  "c1-u3-t1": P(
    "Cloze stratejisi: uyum, bağlaç, kolokasyon, anlam. Şık eleme sırası yaz.",
    "3 set çöz + her yanlışta kural notu.",
    "Hedef: Strateji + 3 set."
  ),
  "c1-u3-t2": P(
    "Akademik kelime bankası (hedef 200): aktif cümle üretmeden kart bitmez.",
    "Hedef: Bu derste 40 yeni aktif cümle."
  ),
  "c1-u3-t3": P(
    "Zamanlı YDS parçası (~20 soru). Süre + analiz zorunlu.",
    "Hedef: Süre disiplini + hata sınıfları."
  ),
  "c1-u4-t1": P(
    "400 kelimelik toplumsal deneme: tez, gerekçe, örnek, karşıt, sonuç.",
    "Üslup C1: bağlaç + akademik kelime, ama şişkin değil.",
    "Hedef: 400 kelimelik yapı."
  ),
  "c1-u4-t2": P(
    "5 dk sunum, slaytsız, kayıt. Dolgu azalt; geçiş kalıpları kullan.",
    "Hedef: Net 5 dk."
  ),
  "c1-u4-t3": P(
    "C1 kapı: zor metin + deneme + dinleme. Checklist işaretle.",
    "Hedef: Kanıtlı C1 öz-değerlendirme."
  ),
  "c1-u5-t1": P(
    "40 bağlayıcıyı anlam gruplarıyla ezberle: karşıt, sonuç, örnek, vurgu, koşul.",
    "Hedef: 40 kart + 20 cümle."
  ),
  "c1-u5-t2": P(
    "Aynı paragrafı daha akademik yeniden yaz; bağlayıcı ekle, tekrarı kırp.",
    "Hedef: Önce/sonra farkı net."
  ),
  "c1-u5-t3": P(
    "Editör gözü: kendi metninde zayıf bağ, yanlış collocation, üslup kayması avla.",
    "Hedef: 10 düzeltme notu."
  ),
  "c1-u6-t1": P(
    "YDS kalıp seti: Παρά το γεγονός ότι, Δεδομένου ότι, Ως εκ τούτου, Σε αντίθεση με…",
    "Her kalıba 2 örnek.",
    "Hedef: 12 YDS kalıbı."
  ),
  "c1-u6-t2": P(
    "Tartışma: Από τη μία… Από την άλλη… Συμφωνώ… Διαφωνώ επειδή…",
    "2 dk kaydet.",
    "Hedef: Dengeli tartışma."
  ),
  "c1-u6-t3": P(
    "300 kelime; en az 12 ileri kalıp işaretli.",
    "Hedef: Kalıp zengin deneme."
  ),
  "c1-u7-t1": P(
    "Çevre: προστατεύουμε το περιβάλλον, ανακυκλώνω, κλιματική αλλαγή, επιτακτική ανάγκη, αν δεν ληφθούν μέτρα…",
    "6 kalıp × örnek.",
    "Hedef: Çevre seti aktif."
  ),
  "c1-u7-t2": P(
    "YDS bağlaç XI: Παρά, Ανεξάρτητα από το αν, Υπό την προϋπόθεση ότι, Εν ολίγοις, Κατά συνέπεια…",
    "TR→iskelet ezber.",
    "Hedef: 8/8 iskelet."
  ),
  "c1-u7-t3": P(
    "350 kelimelik çevre denemesi; ≥10 ileri kalıp; Εν ολίγοις ile kapanış dene.",
    "Hedef: 350 + 10 kalıp."
  ),

  "c2-u1-t1": P(
    "Edebi metin: olay değil üslup ve imge. Türkçe analiz notu: anlatıcı, ton, tekrarlar, metafor.",
    "Alıntı seç → neden güçlü açıkla.",
    "Hedef: Derin okuma notu."
  ),
  "c2-u1-t2": P(
    "Kültürel referanslar: mit, tarih, günlük kültür ipuçları. Bilmediğini araştırıp kısaca not et.",
    "Hedef: 8 referans kartı."
  ),
  "c2-u1-t3": P(
    "Mizah & ironi: literal anlam ≠ kastedilen. Bağlam ve ton ipuçlarını yaz.",
    "Hedef: 5 ironik örneği açıklamak."
  ),
  "c2-u2-t1": P(
    "Alan sözlüğü (kendi alanın): 40 terim, Yunanca tanımlı + örnek cümle.",
    "Hedef: 40 terim aktif."
  ),
  "c2-u2-t2": P(
    "Uzman anlatım 4–5 dk: terimleri öğretir gibi konuş, kayıt.",
    "Hedef: Anlaşılır uzman monoloğu."
  ),
  "c2-u2-t3": P(
    "Teknik özet 150–200 kelime: jargon kontrollü, bağlaçlı, net.",
    "Hedef: Editöre verilebilir özet."
  ),
  "c2-u3-t1": P(
    "İnce yapı: ortaçlar, yoğun isim tamlamaları, dolaylılık. 15 örnek bankası.",
    "Hedef: 15 ince yapı."
  ),
  "c2-u3-t2": P(
    "Stil düzenleme: aynı metni daha yoğun ve daha sade iki versiyona çek.",
    "Hedef: İki üslup kontrolü."
  ),
  "c2-u3-t3": P(
    "C2 öz-değerlendirme: akıcılık, doğruluk, üslup, idiomatiklik, strateji. Kanıt örnekleri ekle.",
    "Hedef: Dürüst C2 checklist."
  ),
  "c2-u4-t1": P(
    "C2 iskelet: έγκειται στο ότι, με κάθε επιφύλαξη, η ουσία είναι ότι, χωρίς να θέλω να υπερβάλω, είναι αξιοσημείωτο ότι…",
    "6 kalıp × 2 örnek + sesli.",
    "Hedef: 6/6 otomatik."
  ),
  "c2-u4-t2": P(
    "Eski B2 yazını C2 kalıplarla yeniden yaz; anlamı koru, yoğunluğu artır.",
    "Önce/sonra karşılaştır.",
    "Hedef: Ölçülebilir üslup artışı."
  ),
  "c2-u4-t3": P(
    "3 dk sözlü nüans: çekince + vurgu dengesi. En az 4 C2 kalıbı. Dinle düzelt.",
    "Hedef: Doğal nüans kaydı."
  )
};

function writePack(filename, constName, obj, expected) {
  const keys = Object.keys(obj);
  if (keys.length !== expected) {
    console.error(constName, "have", keys.length, "expected", expected);
  }
  const body =
    "/* Deep theory — patches LESSONS via theory-deep.js */\n" +
    "const " +
    constName +
    " = " +
    JSON.stringify(obj, null, 2) +
    ";\n";
  fs.writeFileSync(path.join(__dirname, "..", "js", filename), body);
  console.log("wrote", filename, keys.length);
}

writePack("theory-deep-a2b1.js", "THEORY_DEEP_A2B1", A2B1, 62);
writePack("theory-deep-b2c2.js", "THEORY_DEEP_B2C2", B2C2, 58);

// verify coverage
const needA = tasks.filter((t) => t.id.startsWith("a2-") || t.id.startsWith("b1-")).map((t) => t.id);
const needB = tasks.filter((t) => /^(b2|c1|c2)-/.test(t.id)).map((t) => t.id);
const missA = needA.filter((id) => !A2B1[id]);
const missB = needB.filter((id) => !B2C2[id]);
console.log("missing a2b1", missA);
console.log("missing b2c2", missB);
