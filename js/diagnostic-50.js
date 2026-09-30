/**
 * 50 soruluk CEFR seviye tespit sınavı + skorlama.
 * CONTENT.diagnostic üzerine yazar.
 */
const DIAGNOSTIC50 = [
  // —— A0 (1–7): alfabe, selam, temel kelime ——
  { level: "a0", q: "«Καλημέρα» ne demek?", options: ["İyi geceler", "Günaydın", "Teşekkürler", "Rica ederim"], a: 1 },
  { level: "a0", q: "«Ευχαριστώ» ne demek?", options: ["Lütfen", "Affedersiniz", "Teşekkür ederim", "Merhaba"], a: 2 },
  { level: "a0", q: "το νερό — cinsiyet?", options: ["Eril (ο)", "Dişil (η)", "Nötr (το)", "Çoğul"], a: 2 },
  { level: "a0", q: "«Ναι» / «Όχι» sırasıyla?", options: ["Hayır / Evet", "Evet / Hayır", "Lütfen / Teşekkür", "Merhaba / Hoşça kal"], a: 1 },
  { level: "a0", q: "Yunancada vurgu (τόνος) genelde nerede olur?", options: ["Hiç kullanılmaz", "Kelimenin bir hecesinde işaretlenir", "Sadece fiillerde", "Sadece isimlerde"], a: 1 },
  { level: "a0", q: "«Με λένε Νίκο» anlamı?", options: ["Nikos’u görüyorum", "Adım Nikos", "Nikos buradan", "Nikos hasta"], a: 1 },
  { level: "a0", q: "«Παρακαλώ» hem … hem … için kullanılır.", options: ["sadece emir", "lütfen ve rica ederim", "sadece teşekkür", "sadece veda"], a: 1 },

  // —— A1 (8–14): madde, είμαι/έχω, şimdiki ——
  { level: "a1", q: "Θέλω ___ καφέ. Doğru madde?", options: ["μία", "έναν", "τοις", "των"], a: 1 },
  { level: "a1", q: "Είμαι από ___ Τουρκία.", options: ["το", "την", "τον", "τα"], a: 1 },
  { level: "a1", q: "γράφω → 2. tekil şimdiki?", options: ["γράφει", "γράφεις", "γράψω", "έγραψες"], a: 1 },
  { level: "a1", q: "«Έχω δύο αδέρφια» doğru mu?", options: ["Evet", "Hayır — είμαι gerekir", "Hayır — αδέρφια yanlış", "Sadece yazıda"], a: 0 },
  { level: "a1", q: "η φίλη çoğulu?", options: ["οι φίλοι", "οι φίλες", "τα φίλα", "τους φίλους"], a: 1 },
  { level: "a1", q: "«Μου αρέσει ο καφές» anlamı?", options: ["Kahve istiyorum", "Kahveyi severim", "Kahve yok", "Kahve içtim"], a: 1 },
  { level: "a1", q: "Πού ___ το μουσείο;", options: ["είναι", "έχει", "θέλει", "κάνει"], a: 0 },

  // —— A2 (15–21): aorist vs imperfect, gelecek, να ——
  { level: "a2", q: "«Χθες διάβασα ένα βιβλίο» zamanı?", options: ["Ενεστώτας", "Αόριστος", "Παρατατικός", "Μέλλοντας"], a: 1 },
  { level: "a2", q: "«Παλιά διάβαζα πολύ» neden παρατατικός?", options: ["Tek bitmiş olay", "Alışkanlık / süre", "Emir", "Pasif"], a: 1 },
  { level: "a2", q: "Θα πάω αύριο ≈", options: ["Dün gittim", "Şimdi gidiyorum", "Yarın gideceğim", "Gitmeliyim"], a: 2 },
  { level: "a2", q: "Θέλω να μάθω — «να» işlevi?", options: ["Belirsiz madde", "Subjunctive / istek bağlayıcı", "Geçmiş eki", "Soru sözcüğü"], a: 1 },
  { level: "a2", q: "πάω aorist 1. tekil?", options: ["πήγα", "πήγαινα", "θα πάω", "έχω πάει"], a: 0 },
  { level: "a2", q: "«Δεν πρέπει να αργείς» anlamı?", options: ["Geç kalabilirsin", "Geç kalmamalısın", "Geç kaldın", "Geç kalırdın"], a: 1 },
  { level: "a2", q: "έρχομαι aorist?", options: ["ήρθα", "ερχόμουν", "θα έρθω", "έχω έρθει"], a: 0 },

  // —— B1 (22–28): koşul, pasif, bağlaç, perfect giriş ——
  { level: "b1", q: "Αν είχα χρόνο, θα ερχόμουν — tip?", options: ["Gerçek/olası koşul", "Hayali / karşıolgusal", "Emir cümlesi", "Pasif"], a: 1 },
  { level: "b1", q: "λέγεται bu bağlamda?", options: ["Emir", "Pasif/orta şimdiki", "Aorist aktif", "İsim hali"], a: 1 },
  { level: "b1", q: "«παρόλο που» ≈", options: ["çünkü", "…e rağmen", "eğer", "sonra"], a: 1 },
  { level: "b1", q: "έχω γράψει zamanı?", options: ["Αόριστος", "Παρατατικός", "Παρακείμενος", "Μέλλοντας"], a: 2 },
  { level: "b1", q: "Μου το δίνει — «το» ne?", options: ["Madde", "Nesne zamiri", "Bağlaç", "Zarf"], a: 1 },
  { level: "b1", q: "«ώστε να» işlevi?", options: ["Karşıtlık", "Amaç / sonuç", "Zaman", "Koşul"], a: 1 },
  { level: "b1", q: "Αν βρέξει, θα μείνουμε μέσα — tip?", options: ["Hayali geçmiş", "Gerçek/olası gelecek koşul", "Emir", "Pasif"], a: 1 },

  // —— B2 (29–35): perfect zinciri, bağlaç, üslup, YDS strateji ——
  { level: "b2", q: "Είχα ήδη φάει όταν ήρθες — zaman?", options: ["Αόριστος", "Υπερσυντέλικος", "Ενεστώτας", "Μέλλοντας"], a: 1 },
  { level: "b2", q: "«εντούτοις» ≈", options: ["çünkü", "yine de / ancak", "önce", "belki"], a: 1 },
  { level: "b2", q: "Θα έχω τελειώσει μέχρι τις 8 ≈", options: ["8’de bitiriyorum", "8’e kadar bitirmiş olacağım", "8’de bitirdim", "8’de bitirmeliyim"], a: 1 },
  { level: "b2", q: "YDS paragrafında ilk sağlam adım?", options: ["Seçenekleri ezberle", "Ana fikir / tutumu yakala", "Her kelimeyi tek tek çevir", "Süre yok say"], a: 1 },
  { level: "b2", q: "«δεδομένου ότι» ≈", options: ["…e rağmen", "… göz önüne alınırsa", "sanki", "hiçbir zaman"], a: 1 },
  { level: "b2", q: "Aktarım: «Θα έρθω» → είπε ότι…", options: ["θα έρθει", "θα ερχόταν / θα πήγαινε (bağlama göre)", "ήρθε", "να έρθει zorunlu"], a: 0 },
  { level: "b2", q: "Cloze’da boşluktan önce bakılacak en kritik şey?", options: ["Sadece kelime uzunluğu", "Bağlam + dilbilgisi ipucu", "Soru numarası", "Yazarın adı"], a: 1 },

  // —— C1 (36–42): üslup, akademik, nüans ——
  { level: "c1", q: "Resmi hitapta «γεια» yerine daha uygun?", options: ["χαίρετε / καλημέρα σας", "ρε", "μωρέ", "τάδε"], a: 0 },
  { level: "c1", q: "«αξίζει να υπογραμμιστεί ότι» üslubu?", options: ["Gündelik sohbet", "Akademik / yazılı vurgu", "Çocuk dili", "Argo"], a: 1 },
  { level: "c1", q: "«εφόσον» en yakın?", options: ["madem ki / olduğuna göre", "asla", "belki", "dışarıda"], a: 0 },
  { level: "c1", q: "Paraphrase amacı?", options: ["Aynı anlamı başka sözlerle", "Kelime sayısını artırmak", "Yanlışı gizlemek", "Zamanı doldurmak"], a: 0 },
  { level: "c1", q: "«η διατύπωση είναι ατυχής» ≈", options: ["İfade talihsiz / uygunsuz", "İfade mükemmel", "İfade kısa", "İfade Yunanca değil"], a: 0 },
  { level: "c1", q: "Varsayım: «Εάν υποθέσουμε ότι…» işlevi?", options: ["Emir", "Hipotez kurma", "Geçmiş anlatı", "Alışveriş"], a: 1 },
  { level: "c1", q: "«κριτική ανάγνωση» ne ister?", options: ["Sadece sesli okuma", "Kaynak/argümanı sorgulayarak okuma", "Ezber", "Çeviri yapmama"], a: 1 },

  // —— C2 (43–50): incelik, deyim, retorik ——
  { level: "c2", q: "«φιλότιμο» neyi anlatır?", options: ["Sadece para", "Onur / gönüllü fedakârlık duygusu", "Spor kuralı", "Yemek tarifi"], a: 1 },
  { level: "c2", q: "«ας μην χάσουμε το δάσος για το δέντρο» ≈", options: ["Ağaç dikelim", "Ayrıntıda ana fikri kaçırmayalım", "Ormana gidelim", "Matematik formülü"], a: 1 },
  { level: "c2", q: "«η ειρωνεία έγκειται στο ότι…» işlevi?", options: ["Tanım vermek", "İroninin özünü açıklamak", "Emir vermek", "Saat sormak"], a: 1 },
  { level: "c2", q: "Üslup dönüşümü C2’de neyi hedefler?", options: ["Aynı anlamı resmi/akademik/doğal registernede yeniden yazmak", "Sadece kısaltmak", "Sadece uzatmak", "Yunancayı silmek"], a: 0 },
  { level: "c2", q: "«με τον κίνδυνο να απλοποιήσω» ne yapar?", options: ["Basitleştirme riskini peşinen kabul eder", "Hata gizler", "Emir verir", "Konuyu kapatır"], a: 0 },
  { level: "c2", q: "Retorik soru (ρητορική ερώτηση) amacı?", options: ["Gerçek cevap beklemek", "Vurgu / ikna", "Dilbilgisi düzeltmek", "Fiyat sormak"], a: 1 },
  { level: "c2", q: "«ανεξαρτήτως του αν…» ≈", options: ["… olup olmadığına bakılmaksızın", "sadece eğer", "asla", "hemen"], a: 0 },
  { level: "c2", q: "YDS’te tutum (attitude) sorusunda en güvenilir ipucu?", options: ["Kelime sayısı", "Değerlendirici sıfat/zarf ve bağlaçlar", "Paragraf uzunluğu", "Yazarın memleketi"], a: 1 }
];

(function applyDiagnostic50() {
  if (typeof CONTENT === "undefined") return;
  CONTENT.diagnostic = DIAGNOSTIC50;

  const ORDER = ["a0", "a1", "a2", "b1", "b2", "c1", "c2"];

  CONTENT.levelFromScore = function levelFromScore(correct, total, answerFlags) {
    // answerFlags: boolean[] parallel to diagnostic items (optional)
    if (!Array.isArray(answerFlags) || answerFlags.length !== CONTENT.diagnostic.length) {
      const r = total ? correct / total : 0;
      if (r < 0.2) return "a0";
      if (r < 0.34) return "a1";
      if (r < 0.48) return "a2";
      if (r < 0.62) return "b1";
      if (r < 0.76) return "b2";
      if (r < 0.88) return "c1";
      return "c2";
    }

    const byLevel = {};
    ORDER.forEach((lv) => {
      byLevel[lv] = { ok: 0, n: 0 };
    });
    CONTENT.diagnostic.forEach((item, i) => {
      const lv = item.level || "a1";
      if (!byLevel[lv]) byLevel[lv] = { ok: 0, n: 0 };
      byLevel[lv].n += 1;
      if (answerFlags[i]) byLevel[lv].ok += 1;
    });

    function rate(lv) {
      const b = byLevel[lv];
      return b.n ? b.ok / b.n : 0;
    }

    // En yüksek seviye: o bantta ≥%55 ve alt bantların ortalaması ≥%60
    let best = "a0";
    for (const lv of ORDER) {
      const idx = ORDER.indexOf(lv);
      const lower = ORDER.slice(0, idx);
      const lowerAvg = lower.length
        ? lower.reduce((s, x) => s + rate(x), 0) / lower.length
        : 1;
      if (rate(lv) >= 0.55 && lowerAvg >= 0.6) best = lv;
      else if (idx > 0 && rate(lv) < 0.4) break;
    }

    // Çok düşük alt bant varsa bir basamak düş
    const bestIdx = ORDER.indexOf(best);
    for (let i = 0; i < bestIdx; i++) {
      if (rate(ORDER[i]) < 0.45) {
        best = ORDER[Math.max(0, i)];
        break;
      }
    }
    return best;
  };

  CONTENT.diagnosticBreakdown = function diagnosticBreakdown(answerFlags) {
    const ORDER2 = ["a0", "a1", "a2", "b1", "b2", "c1", "c2"];
    return ORDER2.map((lv) => {
      let ok = 0;
      let n = 0;
      CONTENT.diagnostic.forEach((item, i) => {
        if (item.level !== lv) return;
        n += 1;
        if (answerFlags[i]) ok += 1;
      });
      return { level: lv, ok, n, pct: n ? Math.round((ok / n) * 100) : 0 };
    });
  };
})();
