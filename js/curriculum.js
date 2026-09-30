/* Οδηγός — A0 → C2+ Yunanca Müfredatı + YDS */
const CURRICULUM = {
  levels: [
    {
      id: "a0",
      code: "A0",
      title: "Temel Taşlar",
      greekTitle: "Τα Θεμέλια",
      subtitle: "Alfabe, sesler, ilk kelimeler",
      duration: "2–4 hafta",
      color: "#1B6B7A",
      goal: "Yunanca alfabeyi okuyup yazabilir, temel sesleri çıkarabilir, günlük selamlaşma yapabilirsin.",
      skills: ["Okuma", "Telaffuz", "Kelime"],
      units: [
        {
          id: "a0-u1",
          title: "Alfabe & Sesler",
          focus: "24 harf, ikili ünlüler, aksan",
          tasks: [
            { id: "a0-u1-t1", title: "Alfabeyi ezberle", detail: "Α–Ω sıralı yaz. Her harfi yüksek sesle söyle. Büyük/küçük harf çiftlerini eşleştir.", minutes: 25, type: "study" },
            { id: "a0-u1-t2", title: "Sesli harfler & ikililer", detail: "α ε η ι ο υ ω + αι ει οι ου αυ ευ. Minimal çiftler: είμαι / είπε, καλό / καλή.", minutes: 20, type: "practice" },
            { id: "a0-u1-t3", title: "Aksan (τόνος) kuralı", detail: "Her kelimede vurgu nereye düşer? 3 heceli kelimelerde aksan alıştırması yap.", minutes: 15, type: "study" },
            { id: "a0-u1-t4", title: "Okuma: 20 kelime", detail: "καλημέρα, ευχαριστώ, παρακαλώ, ναι, όχι, νερό, ψωμί… Yüksek sesle oku, kaydet, dinle.", minutes: 20, type: "speak" }
          ]
        },
        {
          id: "a0-u2",
          title: "İlk İletişim",
          focus: "Selamlaşma, tanışma, sayılar",
          tasks: [
            { id: "a0-u2-t1", title: "Selamlaşma seti", detail: "καλημέρα / καλησπέρα / καληνύχτα / γεια σου / αντίο. Duruma göre hangi kullanılır?", minutes: 15, type: "study" },
            { id: "a0-u2-t2", title: "Tanışma diyaloğu", detail: "Με λένε… · Χαίρω πολύ · Από πού είσαι; · Είμαι από την Τουρκία. Ezberle ve rol yap.", minutes: 25, type: "speak" },
            { id: "a0-u2-t3", title: "Sayılar 0–100", detail: "Cardinal sayılar. Yaş, fiyat, saat için kullan. 15 rastgele sayıyı Yunanca söyle.", minutes: 30, type: "practice" },
            { id: "a0-u2-t4", title: "Kontrol: kendini kaydet", detail: "1 dakikalık tanıtım: ad, nerelisin, kaç yaşındasın. Dinle, hataları not et.", minutes: 15, type: "review" }
          ]
        }
      ]
    },
    {
      id: "a1",
      code: "A1",
      title: "Hayatta Kalma",
      greekTitle: "Επιβίωση",
      subtitle: "Şimdiki zaman, makaleler, günlük ihtiyaç",
      duration: "6–10 hafta",
      color: "#2A7A68",
      goal: "Basit cümlelerle kendini tanıtabilir, sipariş verebilir, yön sorabilir, şimdiki zamanda konuşabilirsin.",
      skills: ["Dilbilgisi", "Konuşma", "Kelime", "Dinleme"],
      units: [
        {
          id: "a1-u1",
          title: "İsim & Madde (Άρθρο)",
          focus: "ο / η / το — cinsiyet ve çoğul",
          tasks: [
            { id: "a1-u1-t1", title: "Cinsiyet kalıpları", detail: "Eril -ος/-ας/-ης, dişil -α/-η, nötr -ο/-ι/-μα. 30 ismi cinsiyet + madde ile listele.", minutes: 30, type: "study" },
            { id: "a1-u1-t2", title: "Çoğul oluşturma", detail: "ο άνδρας → οι άνδρες, το παιδί → τα παιδιά. 20 ismin çoğulunu yaz.", minutes: 25, type: "practice" },
            { id: "a1-u1-t3", title: "Belirsiz madde", detail: "ένας / μία / ένα kullanımı. Mini diyalog: «Θέλω έναν καφέ.»", minutes: 15, type: "practice" }
          ]
        },
        {
          id: "a1-u2",
          title: "Είμαι & Έχω",
          focus: "Olmak / sahip olmak + tanıtım",
          tasks: [
            { id: "a1-u2-t1", title: "είμαι çekimi", detail: "είμαι, είσαι, είναι, είμαστε, είστε, είναι. Olumsuz: δεν είμαι.", minutes: 20, type: "study" },
            { id: "a1-u2-t2", title: "έχω çekimi", detail: "έχω… + nesne. «Έχω δύο αδέρφια.» 15 cümle yaz.", minutes: 20, type: "practice" },
            { id: "a1-u2-t3", title: "Profil metni", detail: "80–100 kelimelik Yunanca kendini tanıt. Okuyup sesli kaydet.", minutes: 30, type: "write" }
          ]
        },
        {
          id: "a1-u3",
          title: "Şimdiki Zaman (Ενεστώτας)",
          focus: "A ve B tipi fiiller",
          tasks: [
            { id: "a1-u3-t1", title: "A tipi: -ω fiiller", detail: "γράφω, διαβάζω, μιλάω/μιλώ, τρώω, πίνω, κοιμάμαι. Çekim tablosu çıkar.", minutes: 35, type: "study" },
            { id: "a1-u3-t2", title: "B tipi: -άω / -ώ", detail: "αγαπάω, ρωτάω, περπατάω. Ayrı çekim; karıştırmadan 10 fiil ezberle.", minutes: 30, type: "study" },
            { id: "a1-u3-t3", title: "Günlük rutin anlatımı", detail: "Sabah–akşam rutinini şimdiki zamanda yaz ve söyle. En az 12 cümle.", minutes: 25, type: "speak" },
            { id: "a1-u3-t4", title: "Dinleme: yavaş diyalog", detail: "A1 seviyesinde 3 kısa diyalog dinle. Ana fikri Türkçe yaz.", minutes: 20, type: "listen" }
          ]
        },
        {
          id: "a1-u4",
          title: "Günlük Durumlar",
          focus: "Kafe, alışveriş, yol tarif",
          tasks: [
            { id: "a1-u4-t1", title: "Kafe / restoran", detail: "Θα ήθελα… · Τον λογαριασμό, παρακαλώ · Είναι πικάντικο; Rol yap.", minutes: 25, type: "speak" },
            { id: "a1-u4-t2", title: "Alışveriş kelimeleri", detail: "πόσο κάνει, φθηνό, ακριβό, μέγεθος, χρώμα. 25 kelime kartı.", minutes: 20, type: "vocab" },
            { id: "a1-u4-t3", title: "Yön sorma", detail: "Πού είναι…; · Πώς πάω στο…; · δεξιά / αριστερά / ευθεία. Harita üzerinde pratik.", minutes: 20, type: "practice" },
            { id: "a1-u4-t4", title: "A1 mini sınav", detail: "20 soruluk öz-test: madde, είμαι/έχω, şimdiki zaman, kelime. %80+ hedef.", minutes: 30, type: "review" }
          ]
        }
      ]
    },
    {
      id: "a2",
      code: "A2",
      title: "Temel Akıcılık",
      greekTitle: "Βασική Ροή",
      subtitle: "Geçmiş, gelecek, günlük hikâyeler",
      duration: "8–12 hafta",
      color: "#3D7A4A",
      goal: "Geçmiş ve gelecek zamanlarda basit olayları anlatabilir, e-posta yazabilir, kısa metinleri anlayabilirsin.",
      skills: ["Dilbilgisi", "Yazma", "Okuma", "Dinleme"],
      units: [
        {
          id: "a2-u1",
          title: "Aorist (Αόριστος)",
          focus: "Tamamlanmış geçmiş — ana anlatım zamanı",
          tasks: [
            { id: "a2-u1-t1", title: "Düzenli aorist", detail: "έγραψα, διάβασα, μίλησα. Augment (έ-) kuralını öğren. 15 fiil çek.", minutes: 40, type: "study" },
            { id: "a2-u1-t2", title: "Düzensiz aoristler", detail: "πήγα, ήρθα, είδα, είπα, έφαγα, ήπια, πήρα, έδωσα. Kart + cümle.", minutes: 35, type: "vocab" },
            { id: "a2-u1-t3", title: "Dün ne yaptım?", detail: "Aorist ile 150 kelimelik günlük yaz. Sesli oku.", minutes: 30, type: "write" }
          ]
        },
        {
          id: "a2-u2",
          title: "İmperfect (Παρατατικός)",
          focus: "Alışkanlık, süreklilik, arka plan",
          tasks: [
            { id: "a2-u2-t1", title: "Παρατατικός çekimi", detail: "έγραφα, διάβαζα… Aorist ile fark: «Χθες διάβασα» vs «Παλιά διάβαζα».", minutes: 35, type: "study" },
            { id: "a2-u2-t2", title: "Çocukluğum", detail: "Παρατατικός ile çocukluk anlatısı (120+ kelime).", minutes: 30, type: "write" },
            { id: "a2-u2-t3", title: "Karışık geçmiş pratik", detail: "10 cümlede aorist/imperfect seçimi yap; nedenini yaz.", minutes: 25, type: "practice" }
          ]
        },
        {
          id: "a2-u3",
          title: "Gelecek & Planlar",
          focus: "Θα + fiil, μέλλων",
          tasks: [
            { id: "a2-u3-t1", title: "Basit gelecek", detail: "Θα πάω, θα δω, θα μιλήσω. 20 plan cümlesi.", minutes: 25, type: "study" },
            { id: "a2-u3-t2", title: "Hafta sonu planı", detail: "Yazılı + sözlü: Cumartesi–Pazar programını anlat.", minutes: 20, type: "speak" },
            { id: "a2-u3-t3", title: "İstek / rica", detail: "Θα ήθελα, μπορώ να…, μήπως… Nazik istek kalıpları.", minutes: 20, type: "practice" }
          ]
        },
        {
          id: "a2-u4",
          title: "Bağlaçlar & Metin",
          focus: "και, αλλά, γιατί, όταν, αν",
          tasks: [
            { id: "a2-u4-t1", title: "Temel bağlaçlar", detail: "15 bağlaç + örnek cümle listesi çıkar.", minutes: 25, type: "study" },
            { id: "a2-u4-t2", title: "A2 okuma", detail: "Kısa hikâye / blog (A2). 5 soruya yanıt ver.", minutes: 30, type: "read" },
            { id: "a2-u4-t3", title: "E-posta yaz", detail: "Arkadaşa 120 kelimelik Yunanca e-posta (geçmiş + gelecek).", minutes: 30, type: "write" },
            { id: "a2-u4-t4", title: "A2 seviye kapısı", detail: "Öz-değerlendirme: geçmiş/gelecek + 200 kelimelik metin. Eksikleri not et.", minutes: 40, type: "review" }
          ]
        }
      ]
    },
    {
      id: "b1",
      code: "B1",
      title: "Bağımsız Kullanıcı",
      greekTitle: "Ανεξάρτητος",
      subtitle: "Karmaşık cümleler, pasif, koşul, medya",
      duration: "3–5 ay",
      color: "#4A6B8A",
      goal: "Günlük ve yarı-resmi konularda bağımsızca konuşup yazabilir, haberleri ana hatlarıyla anlayabilirsin.",
      skills: ["Dilbilgisi", "Okuma", "Dinleme", "Konuşma", "YDS"],
      units: [
        {
          id: "b1-u1",
          title: "Subjunctive (Υποτακτική)",
          focus: "να + fiil — istek, amaç, zorunluluk",
          tasks: [
            { id: "b1-u1-t1", title: "να yapısı", detail: "Θέλω να μάθω · Πρέπει να διαβάσω · Για να καταλάβω. 25 cümle.", minutes: 35, type: "study" },
            { id: "b1-u1-t2", title: "Aorist vs present subjunctive", detail: "να γράψω / να γράφω farkı. Aspect bilinci.", minutes: 30, type: "study" },
            { id: "b1-u1-t3", title: "Tavsiye diyaloğu", detail: "Arkadaşa Yunanca 5 tavsiye ver (πρέπει να / καλό είναι να…).", minutes: 20, type: "speak" }
          ]
        },
        {
          id: "b1-u2",
          title: "Pasif & Orta Çatı",
          focus: "-μαι fiilleri, edilgen anlam",
          tasks: [
            { id: "b1-u2-t1", title: "Pasif şimdiki zaman", detail: "γράφεται, λέγεται, γίνεται. Haber dili örnekleri.", minutes: 30, type: "study" },
            { id: "b1-u2-t2", title: "Orta çatı fiiller", detail: "σκέφτομαι, θυμάμαι, ντρέπομαι, φοβάμαι. 15 fiil + cümle.", minutes: 25, type: "vocab" },
            { id: "b1-u2-t3", title: "Haber özeti", detail: "Kısa Yunanca haber oku; 80 kelimelik özet yaz.", minutes: 35, type: "write" }
          ]
        },
        {
          id: "b1-u3",
          title: "Koşul Cümleleri",
          focus: "αν + gerçek / hipotetik",
          tasks: [
            { id: "b1-u3-t1", title: "Tip 1 koşul", detail: "Αν έχει χρόνο, θα έρθει. 15 örnek.", minutes: 25, type: "study" },
            { id: "b1-u3-t2", title: "Tip 2 (hayali)", detail: "Αν είχα χρήματα, θα ταξίδευα. Karşıolgusal pratik.", minutes: 30, type: "practice" },
            { id: "b1-u3-t3", title: "Tartışma: «Αν…»", detail: "3 konu seç; her biri için 1 dk konuş (koşul kullanarak).", minutes: 25, type: "speak" }
          ]
        },
        {
          id: "b1-u4",
          title: "Kelime Genişletme B1",
          focus: "2000–3000 aktif kelime bandı",
          tasks: [
            { id: "b1-u4-t1", title: "Tematik listeler", detail: "İş, sağlık, eğitim, çevre, teknoloji — her temada 40 kelime.", minutes: 45, type: "vocab" },
            { id: "b1-u4-t2", title: "Eş anlamlı / zıt", detail: "30 kelime çifti (μεγάλος–μικρός, αρχίζω–τελειώνω…).", minutes: 25, type: "vocab" },
            { id: "b1-u4-t3", title: "Podcast / yavaş haber", detail: "15 dk dinle; 8 anahtar kelime + ana fikir notu.", minutes: 30, type: "listen" },
            { id: "b1-u4-t4", title: "B1 kapı sınavı", detail: "Okuma + dilbilgisi + 200 kelimelik görüş yazısı. Zayıf alanı işaretle.", minutes: 50, type: "review" }
          ]
        }
      ]
    },
    {
      id: "b2",
      code: "B2",
      title: "İleri Bağımsızlık",
      greekTitle: "Προχωρημένος",
      subtitle: "Nüans, medya, akademik giriş, YDS temeli",
      duration: "4–6 ay",
      color: "#5A5F8A",
      goal: "Karmaşık metinleri takip edebilir, fikirlerini detaylı savunabilir, YDS tarzı okuma sorularına giriş yapabilirsin.",
      skills: ["Okuma", "Yazma", "Dinleme", "Dilbilgisi", "YDS"],
      units: [
        {
          id: "b2-u1",
          title: "İleri Dilbilgisi",
          focus: "Partisipler, dolaylı anlatım, ince zamanlar",
          tasks: [
            { id: "b2-u1-t1", title: "Perfect zamanlar", detail: "έχω γράψει (parakeimenos). Kullanım alanları + 20 cümle.", minutes: 35, type: "study" },
            { id: "b2-u1-t2", title: "Dolaylı anlatım", detail: "Είπε ότι… · Ρώτησε αν… · Μου είπε να… Dönüşüm alıştırması.", minutes: 35, type: "practice" },
            { id: "b2-u1-t3", title: "İleri bağlaçlar", detail: "παρόλο που, ενώ, ώστε, εφόσον, ωστόσο. Akademik bağlayıcı seti.", minutes: 30, type: "study" }
          ]
        },
        {
          id: "b2-u2",
          title: "Medya & Gerçek İçerik",
          focus: "Haber, belgesel, tartışma",
          tasks: [
            { id: "b2-u2-t1", title: "Haftalık haber rutini", detail: "3 Yunanca haber oku. Her biri için: özet + 5 yeni kelime.", minutes: 45, type: "read" },
            { id: "b2-u2-t2", title: "Video: normal hız", detail: "8–12 dk YouTube/ERT. Altyazısız ilk geçiş, sonra not.", minutes: 40, type: "listen" },
            { id: "b2-u2-t3", title: "Görüş yazısı", detail: "250–300 kelime: güncel bir konuda tutumunu yaz (giriş–gelişme–sonuç).", minutes: 45, type: "write" }
          ]
        },
        {
          id: "b2-u3",
          title: "YDS Okuma Temeli",
          focus: "Paragraf yapısı, çıkarım, kelime tahmini",
          tasks: [
            { id: "b2-u3-t1", title: "Paragraf anatomisi", detail: "Konu cümlesi, destek, sonuç. 5 paragrafta işaretle.", minutes: 30, type: "study" },
            { id: "b2-u3-t2", title: "Bağlamdan kelime", detail: "Bilinmeyen 10 kelimeyi sözlüksüz tahmin et; sonra doğrula.", minutes: 25, type: "practice" },
            { id: "b2-u3-t3", title: "YDS tarzı 10 soru", detail: "Uzun paragraf + çoktan seçmeli. Süre tut (öneri: 12 dk).", minutes: 30, type: "yds" },
            { id: "b2-u3-t4", title: "Hata günlüğü", detail: "Yanlış soruları sınıflandır: kelime / yapı / çıkarım / dikkat.", minutes: 20, type: "review" }
          ]
        },
        {
          id: "b2-u4",
          title: "Konuşma Akıcılığı",
          focus: "3–5 dk monolog, tartışma",
          tasks: [
            { id: "b2-u4-t1", title: "Hazırlıksız konuşma", detail: "10 konu kartı. Her birinde 2 dk konuş, kaydet.", minutes: 40, type: "speak" },
            { id: "b2-u4-t2", title: "Karşı argüman", detail: "Bir tezi savun, sonra karşı tarafı da Yunanca anlat.", minutes: 30, type: "speak" },
            { id: "b2-u4-t3", title: "B2 kapı sınavı", detail: "Okuma + yazma + 4 dk konuşma. CEFR B2 checklist ile işaretle.", minutes: 60, type: "review" }
          ]
        }
      ]
    },
    {
      id: "c1",
      code: "C1",
      title: "İleri Yetkinlik",
      greekTitle: "Επάρκεια",
      subtitle: "Akademik dil, nüans, idiomatik kullanım",
      duration: "4–7 ay",
      color: "#7A4F6A",
      goal: "Uzun ve zor metinleri anlayabilir, incelikli görüş belirtebilir, YDS’de yüksek doğruluk hedeflersin.",
      skills: ["Okuma", "Yazma", "Dinleme", "Kelime", "YDS"],
      units: [
        {
          id: "c1-u1",
          title: "Akademik & Resmi Üslup",
          focus: "Register: οικείο ↔ επίσημο",
          tasks: [
            { id: "c1-u1-t1", title: "Üslup dönüşümü", detail: "Aynı mesajı samimi / nötr / resmi yaz. 5 örnek.", minutes: 35, type: "write" },
            { id: "c1-u1-t2", title: "Akademik bağlayıcılar", detail: "εντούτοις, συνεπώς, ιδιαιτέρως, αναμφίβολα… 40 ifade kartı.", minutes: 30, type: "vocab" },
            { id: "c1-u1-t3", title: "Makale özeti", detail: "Uzun bir köşe yazısı / akademik özet oku; 200 kelimelik özet.", minutes: 45, type: "read" }
          ]
        },
        {
          id: "c1-u2",
          title: "İdiom & Atasözü",
          focus: "Doğal ifade katmanı",
          tasks: [
            { id: "c1-u2-t1", title: "50 deyim", detail: "Her deyim: anlam + örnek cümle + Türkçe karşılık.", minutes: 50, type: "vocab" },
            { id: "c1-u2-t2", title: "Doğal yeniden yazım", detail: "10 düz cümleyi daha doğal/idiomatik hale getir.", minutes: 30, type: "practice" },
            { id: "c1-u2-t3", title: "Dizi / podcast notu", detail: "Native içerik 20 dk. Yeni ifadeleri listele.", minutes: 35, type: "listen" }
          ]
        },
        {
          id: "c1-u3",
          title: "YDS Yoğunlaşma",
          focus: "Cloze, çeviri mantığı, hız",
          tasks: [
            { id: "c1-u3-t1", title: "Cloze stratejisi", detail: "Boşluk doldurma: dilbilgisi ipuçları + kolokasyon. 3 set çöz.", minutes: 40, type: "yds" },
            { id: "c1-u3-t2", title: "Akademik kelime bankası", detail: "YDS sıklık: 200 kelime. Aktif üretim cümleleri yaz.", minutes: 50, type: "vocab" },
            { id: "c1-u3-t3", title: "Zamanlı deneme parçası", detail: "20 YDS tarzı soru, süre sınırlı. Analiz zorunlu.", minutes: 45, type: "yds" }
          ]
        },
        {
          id: "c1-u4",
          title: "Üretim: Uzun Form",
          focus: "Deneme, sunum, tartışma",
          tasks: [
            { id: "c1-u4-t1", title: "400 kelimelik deneme", detail: "Toplumsal bir konuda yapılandırılmış deneme.", minutes: 60, type: "write" },
            { id: "c1-u4-t2", title: "5 dk sunum", detail: "Slaytsız konuş. Kaydet, dolgu kelimelerini azalt.", minutes: 40, type: "speak" },
            { id: "c1-u4-t3", title: "C1 kapı sınavı", detail: "Zor metin + deneme + dinleme. C1 checklist.", minutes: 70, type: "review" }
          ]
        }
      ]
    },
    {
      id: "c2",
      code: "C2",
      title: "Ustalık",
      greekTitle: "Αριστεία",
      subtitle: "Yakın-anadil, tüm registerler",
      duration: "4–8 ay",
      color: "#8A4535",
      goal: "Neredeyse her bağlamda zahmetsiz anlama ve üretim; kültürel ve üslupsal nüansı yakalarsın.",
      skills: ["Okuma", "Yazma", "Dinleme", "Konuşma", "Kültür"],
      units: [
        {
          id: "c2-u1",
          title: "Edebiyat & Kültür",
          focus: "Roman, şiir, tarih, mizah",
          tasks: [
            { id: "c2-u1-t1", title: "Kısa öykü / roman bölümü", detail: "Edebi metin oku. Üslup ve imgeleri Türkçe analiz et.", minutes: 60, type: "read" },
            { id: "c2-u1-t2", title: "Kültürel referanslar", detail: "Yunan tarihi/güncel kültür: 10 kavram kartı (π.χ. φιλότιμο).", minutes: 40, type: "study" },
            { id: "c2-u1-t3", title: "Mizah & ironi", detail: "Stand-up / satira / komedi sahnesi. Neden komik olduğunu açıkla.", minutes: 30, type: "listen" }
          ]
        },
        {
          id: "c2-u2",
          title: "Uzmanlık Alanı",
          focus: "Meslek / akademik alan dilin",
          tasks: [
            { id: "c2-u2-t1", title: "Alan sözlüğü", detail: "Kendi alanından 100 terim + tanımlar Yunanca.", minutes: 50, type: "vocab" },
            { id: "c2-u2-t2", title: "Uzman anlatım", detail: "Alanından bir konuyu 8–10 dk Yunanca anlat.", minutes: 45, type: "speak" },
            { id: "c2-u2-t3", title: "Teknik özet", detail: "Makale/raporu Yunanca 300 kelimede özetle.", minutes: 50, type: "write" }
          ]
        },
        {
          id: "c2-u3",
          title: "İnce Dilbilgisi & Üslup",
          focus: "Nadir yapılar, ritim, doğruluk",
          tasks: [
            { id: "c2-u3-t1", title: "İnce yapı bankası", detail: "Nadir ama güçlü yapılar (özel partisip kullanımları vb.).", minutes: 40, type: "study" },
            { id: "c2-u3-t2", title: "Stil düzenleme", detail: "Eski yazını C2 üslubuna yeniden yaz: daha yoğun, daha zarif.", minutes: 45, type: "write" },
            { id: "c2-u3-t3", title: "C2 öz-değerlendirme", detail: "CEFR C2 can-do listesini dürüstçe işaretle.", minutes: 30, type: "review" }
          ]
        }
      ]
    },
    {
      id: "c2plus",
      code: "C2+",
      title: "Ustalık + YDS Zirve",
      greekTitle: "Κορυφή",
      subtitle: "Sınav ustalığı ve dili canlı tutma",
      duration: "Sürekli",
      color: "#A67C00",
      goal: "YDS’de yüksek puan stratejisi oturur; dili kaybetmeden ileri seviyeyi korursun.",
      skills: ["YDS", "Bakım", "Hız", "Strateji"],
      units: [
        {
          id: "c2p-u1",
          title: "YDS Tam Deneme Döngüsü",
          focus: "Süre, dayanıklılık, analiz",
          tasks: [
            { id: "c2p-u1-t1", title: "Tam deneme #1", detail: "Gerçek süreyle tam deneme. Ham skor kaydet.", minutes: 180, type: "yds" },
            { id: "c2p-u1-t2", title: "Hata otopsi", detail: "Her yanlış: neden + kural/kelime + benzer 2 soru üret.", minutes: 90, type: "review" },
            { id: "c2p-u1-t3", title: "Zayıf tip kampı", detail: "En zayıf soru tipinde 3 gün yoğun set.", minutes: 60, type: "yds" },
            { id: "c2p-u1-t4", title: "Tam deneme #2", detail: "İyileşmeyi ölç. Hedef: tutarlı yüksek band.", minutes: 180, type: "yds" }
          ]
        },
        {
          id: "c2p-u2",
          title: "Bakım Rutini",
          focus: "Dili canlı tut",
          tasks: [
            { id: "c2p-u2-t1", title: "Haftalık okuma", detail: "Her hafta 1 uzun makale + kelime defteri.", minutes: 60, type: "read" },
            { id: "c2p-u2-t2", title: "Haftalık dinleme", detail: "Podcast / haber / tartışma 45 dk.", minutes: 45, type: "listen" },
            { id: "c2p-u2-t3", title: "Haftalık üretim", detail: "1 deneme veya 10 dk konuşma kaydı.", minutes: 40, type: "write" },
            { id: "c2p-u2-t4", title: "Aylık seviye kontrolü", detail: "Kısa deneme + konuşma. Gerileme varsa o birime dön.", minutes: 90, type: "review" }
          ]
        }
      ]
    }
  ],

  dailyTemplates: {
    short: { label: "Kısa gün · 25–35 dk", blocks: ["study", "vocab"] },
    standard: { label: "Standart · 60–75 dk", blocks: ["study", "practice", "vocab", "review"] },
    intensive: { label: "Yoğun · 90–120 dk", blocks: ["study", "practice", "read", "speak", "yds"] },
    ydsFocus: { label: "YDS günü · 70–90 dk", blocks: ["yds", "vocab", "review"] }
  },

  typeLabels: {
    study: "Çalışma",
    practice: "Alıştırma",
    vocab: "Kelime",
    read: "Okuma",
    write: "Yazma",
    speak: "Konuşma",
    listen: "Dinleme",
    review: "Tekrar / Sınav",
    yds: "YDS"
  },

  resources: [
    { title: "Οδηγός dersleri", note: "Her görevde Konu · Örnek · Şimdi yap · Alıştırma — dış kaynak gerekmez." },
    { title: "Kartlar & antrenmanlar", note: "Alfabe, madde, aorist, YDS cloze… derslerin pratik motoru." },
    { title: "YDS sekmesi", note: "Cloze ve okuma setleri uygulama içinde." },
    { title: "Hata günlüğü", note: "Yanlışları İlerleme’de tut; aynı tuzağı kes." }
  ],

  principles: [
    "Öğretmen verir, öğrenci yapar — seçim yok, atlama yok.",
    "Yeni konu + aralıklı tekrar: ağır konular daha sık geri gelir.",
    "Her gün en az bir dersi aç ve bitir — mükemmellik değil süreklilik.",
    "Ders sayfası yeter: konu + örnek + adımlar.",
    "Önce anla, sonra üret: oku/dinle → not → yaz/konuş.",
    "Aorist ile imperfect’i karıştırma; aspect kritiktir.",
    "Yanlış kuyruğu ve unutulan üniteler yeni dersten önce gelir.",
    "Kapı sınavını geçmeden sonraki seviyeyi zorlama."
  ],

  /** Öğretim motoru: ağırlık + aralıklı tekrar (spaced repetition) */
  pedagogy: {
    summary:
      "Yeni öğrenme ile eski konuyu karıştır (interleaving). Ağır dilbilgisi daha sık tekrarlanır. Yanlışlar önce gelir.",
    typeWeight: {
      study: 5,
      practice: 4,
      speak: 4,
      write: 4,
      vocab: 3,
      listen: 3,
      read: 3,
      yds: 3,
      review: 2
    },
    /** reviewCount’a göre gün aralığı — ağır tip daha sık */
    intervalsByWeight: {
      6: [1, 2, 4, 9],
      5: [1, 2, 5, 12],
      4: [1, 3, 7, 14],
      3: [2, 5, 10, 21],
      2: [3, 7, 14, 30]
    },
    heavyKeywords: [
      "aorist",
      "çekim",
      "aspect",
      "madde",
      "cinsiyet",
      "fiil",
      "pasif",
      "subjunctive",
      "bağlaç",
      "imperfect",
      "genitif",
      "durum",
      "ώστε",
      "να ",
      "θα "
    ],
    /** Günde en fazla kaç görev (yeni + tekrar) */
    dailyCap: 4,
    /** Kaç yeni sonrası bir tekrar sıkıştırılır (yeterli due varsa) */
    newPerReview: 2,
    reviewReasons: {
      overdue: "Bu konuyu uzun süredir görmedin — unutma eğrisi yükseldi.",
      heavy: "Ağır dilbilgisi / çekim konusu; sık tekrar şart.",
      recent: "Dün/yeni öğrendin; ilk pekiştirme turu.",
      weak: "Yanlış kuyruğunda zayıf nokta var — önce onu temizle.",
      interleave: "Arada eski konuya dönüyoruz; karışık çalışma kalıcı öğrenmeyi güçlendirir."
    }
  }
};
