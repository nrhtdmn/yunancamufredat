/**
 * Mega-expand all theory packs to textbook depth.
 * Reads existing theory files + task meta; writes expanded versions.
 */
const fs = require("fs");
const path = require("path");
const tasks = require("./_tasks.json");

function loadTheory(file, constName) {
  const s = fs.readFileSync(path.join(__dirname, "..", "js", file), "utf8");
  const fn = new Function(`${s}\n; return ${constName};`);
  return fn();
}

function saveTheory(file, constName, obj, banner) {
  const body =
    banner +
    "\nconst " +
    constName +
    " = " +
    JSON.stringify(obj, null, 2) +
    ";\n";
  fs.writeFileSync(path.join(__dirname, "..", "js", file), body);
  console.log("wrote", file, Object.keys(obj).length, "bytes", body.length);
}

/** Topic-specific enrichment kernels (Greek-heavy). */
const KERNEL = {
  "a0-u1-t1": {
    paradigm:
      "Αα Ββ Γγ Δδ Εε Ζζ Ηη Θθ Ιι Κκ Λλ Μμ Νν Ξξ Οο Ππ Ρρ Σσ/ς Ττ Υυ Φφ Χχ Ψψ Ωω. Adlar: άλφα βήτα γάμμα δέλτα έψιλον ζήτα ήτα θήτα ιώτα κάππα λάμδα μι νι ξι όμικρον πι ρο σίγμα ταυ ύψιλον φι χι ψι ωμέγα.",
    examples: [
      ["Βιβλίο", "kitap — Β = /v/"],
      ["Ημέρα", "gün — Η = /i/"],
      ["Ρόδα", "gül — Ρ = /r/"],
      ["Χάρτης", "harita — Χ = /h/"],
      ["Ψωμί", "ekmek — Ψ = /ps/"],
      ["Ξένος", "yabancı — Ξ = /ks/"],
      ["καλός", "iyi — sonda ς"],
      ["της", "onun (d) — sonda ς"]
    ],
    dialogue: [
      "— Πώς λέγεται αυτό το γράμμα;",
      "— Λέγεται βήτα. Προσέγγιση /v/.",
      "— Και αυτό;",
      "— Είναι ήτα. Ακούγεται σαν /i/."
    ]
  },
  "a2-u1-t1": {
    paradigm:
      "γράφω → έγραψα, έγραψες, έγραψε, γράψαμε, γράψατε, έγραψαν. διαβάζω → διάβασα… μιλώ/μιλάω → μίλησα… δουλεύω → δούλεψα… αγοράζω → αγόρασα…",
    examples: [
      ["Χθες έγραψα ένα μήνυμα.", "Dün bir mesaj yazdım."],
      ["Διάβασα το βιβλίο σε δύο μέρες.", "Kitabı iki günde okudum."],
      ["Μίλησα με την Μαρία το πρωί.", "Sabah Maria ile konuştum."],
      ["Αγόρασα ψωμί και γάλα.", "Ekmek ve süt aldım."],
      ["Δούλεψα μέχρι τις οκτώ.", "Sekize kadar çalıştım."],
      ["Τελείωσα την άσκηση.", "Alıştırmayı bitirdim."],
      ["Μαγείρεψα μακαρόνια.", "Makarna pişirdim."],
      ["Καθάρισα το δωμάτιο.", "Odayı temizledim."]
    ],
    dialogue: [
      "— Τι έκανες χθες;",
      "— Δούλεψα το πρωί και το απόγευμα διάβασα.",
      "— Μίλησες με τον Νίκο;",
      "— Ναι, του έγραψα και μετά μιλήσαμε."
    ]
  },
  "b1-u1-t1": {
    paradigm:
      "Θέλω να πάω / να πάς / να πάει / να πάμε / να πάτε / να πάνε. Πρέπει να διαβάσω. Μπορώ να βοηθήσω. Για να καταλάβω…",
    examples: [
      ["Θέλω να μάθω ελληνικά.", "Yunanca öğrenmek istiyorum."],
      ["Πρέπει να φύγω τώρα.", "Şimdi gitmeliyim."],
      ["Μπορώ να ανοίξω το παράθυρο;", "Pencereyi açabilir miyim?"],
      ["Προσπαθώ να καταλάβω το κείμενο.", "Metni anlamaya çalışıyorum."],
      ["Αρχίζω να γράφω.", "Yazmaya başlıyorum."],
      ["Για να περάσεις, πρέπει να μελετήσεις.", "Geçmek için çalışmalısın."],
      ["Θέλει να έρθει μαζί μας.", "Bizimle gelmek istiyor."],
      ["Δεν μπορώ να κοιμηθώ.", "Uyuyamıyorum."]
    ],
    dialogue: [
      "— Τι θέλεις να κάνεις το απόγευμα;",
      "— Θέλω να διαβάσω και μετά να βγω.",
      "— Μπορώ να έρθω μαζί σου;",
      "— Ναι, πρέπει όμως να τελειώσεις πρώτα τη δουλειά."
    ]
  },
  "b2-u1-t1": {
    paradigm:
      "έχω γράψει, έχεις γράψει, έχει γράψει, έχουμε γράψει, έχετε γράψει, έχουν γράψει. Ομοίως: έχω δει, έχω πάει, έχω φάει, έχω πει…",
    examples: [
      ["Έχω γράψει ήδη το μήνυμα.", "Mesajı çoktan yazmışım."],
      ["Έχεις πάει ποτέ στην Κρήτη;", "Hiç Girit’e gittin mi?"],
      ["Δεν έχω φάει ακόμα.", "Henüz yememişim."],
      ["Έχουμε τελειώσει την εργασία.", "Ödevi bitirmiş bulunuyoruz."],
      ["Έχει αλλάξει πολύ η πόλη.", "Şehir çok değişmiş."],
      ["Μόλις έχω φτάσει.", "Yeni vardım."],
      ["Ποτέ δεν έχω δει τέτοιο πράγμα.", "Böyle bir şey hiç görmedim."],
      ["Έχουν ήδη φύγει.", "Çoktan gitmişler."]
    ],
    dialogue: [
      "— Έχεις τελειώσει την αναφορά;",
      "— Ναι, την έχω ήδη στείλει.",
      "— Τέλεια. Έχω δει και εγώ το αρχείο.",
      "— Άρα έχουμε τελειώσει για σήμερα."
    ]
  }
};

function exLines(ex) {
  if (!ex || !ex.length) return "Örnekleri kendin üret: her kalıba en az iki cümle yaz ve sesli oku.";
  return ex.map(([el, tr]) => `${el} (${tr})`).join(" ");
}

function dlgLines(d) {
  if (!d || !d.length) {
    return "Kendi mini diyaloğunu yaz: soru–cevap–tepki–kapanış. Sonra kaydet ve dinle.";
  }
  return d.join(" ");
}

function inferKernel(task) {
  const t = `${task.title} ${task.detail}`.toLowerCase();
  if (KERNEL[task.id]) return KERNEL[task.id];
  if (/alfabe|harf/.test(t)) return KERNEL["a0-u1-t1"];
  if (/aorist|αόριστ|düzenli aorist|düzensiz/.test(t)) return KERNEL["a2-u1-t1"];
  if (/να yap|subjunctive|tavsiye/.test(t)) return KERNEL["b1-u1-t1"];
  if (/perfect|parakeimen|έχω γράψει/.test(t)) return KERNEL["b2-u1-t1"];
  return {};
}

function megaFor(task, prev) {
  const id = task.id;
  const title = task.title;
  const detail = task.detail;
  const level = id.split("-")[0].toUpperCase();
  const k = inferKernel(task);
  const prevText = (prev || []).filter((p) => typeof p === "string" && p.length > 40);

  const paras = [];
  paras.push(
    `Ne öğreniyorsun: ${title} (${level}). Müfredat hedefi: ${detail} Bu anlatım konuyu yüzeyde özetlemez; biçim, anlam, kullanım, sık hata ve öz-kontrolü aynı derste birleştirir. Bitirmeden bir sonraki göreve geçme.`
  );
  paras.push(
    `Neden önemli: ${level} seviyesinde «${title}» hem günlük üretimde hem ileride YDS/okuma-yazma iskeletinde tekrar çıkar. Burayı zayıf bırakırsan sonraki ünitelerde aynı boşluk büyür. Amacın tanımak değil, doğru ve hızlı üretmek.`
  );
  paras.push(
    `Adım adım kurallar: Önce yapının iskeletini ezberle, sonra kişi/cinsiyet/zaman uyumunu ekle, en son üslubu (samimi/resmi) seç. Her yeni örnekte şu sırayı uygula: (1) anlamı Türkçe söyle, (2) Yunanca iskeleti kur, (3) ekleri yerleştir, (4) τόνος ile sesli oku, (5) bir benzer cümle daha üret.`
  );
  paras.push(
    `Tam çekim / tablo: ${
      k.paradigm ||
      `«${title}» için kendi tablonu çıkar: olumlu–olumsuz–soru biçimleri; tekil/çoğul veya kişiler; varsa madde ve uyum. Tabloyu deftere yazıp ezbere söyle. ${detail}`
    }`
  );
  paras.push(
    `Türkçe ile karşılaştırma: Türkçe çoğu zaman ek veya tek yardımcı ile işi bitirir; Yunancada madde, kişi eki, görünüş (aspect), να/θα/δεν sırası ve kalıp blokları ayrı ayrı işler. «${title}» konusunda birebir kelime çevirisi yerine hazır iskelet kullan. Yanlış hissettiğin yerde Türkçe cümleyi parçala, Yunanca parçaları yeniden diz.`
  );
  paras.push(`Bol örnekler: ${exLines(k.examples)}`);
  paras.push(`Mini diyalog veya model metin: ${dlgLines(k.dialogue)}`);
  paras.push(
    `Komşu yapılar ve karşıtlar: Bu konuyu yalnız öğrenme. Yanındaki zaman/yapı/kalıpla çift tut (ör. aorist↔imperfect, θέλω↔πρέπει να, ότι↔αν↔να, samimi↔resmi). Karşıt çifti yazmadan «anladım» deme; farkı bir cümleyle Türkçe açıkla.`
  );
  paras.push(
    `İstisnalar ve nüans: Her kuralın istisnası veya üslup tercihi vardır. Sözlükteki ilk biçim her zaman konuşma biçimi olmayabilir (-άω/-ώ gibi). Şüphede yüksek frekanslı modeli seç, sonra varyantı not et. Abartılı edebi biçimleri A2–B1’de zorlama.`
  );
  paras.push(
    `Sık hatalar ve düzeltmeleri: (1) Türkçe söz sırasını aynen kopyalamak → iskeleti önce kur. (2) Madde/cinsiyet/kişi uyumunu atlamak → her isim ve fiili kontrol et. (3) Olumsuzluk yerini yanlış koymak → δεν çoğu kez fiilden hemen önce. (4) Vurguyu yok saymak → τόνος’u sesli işaretle. (5) Tek örnekle yetinmek → en az 8 üretim cümlesi.`
  );
  paras.push(
    `Ne zaman kullanılır: Gerçek hayatta «${title}» şu sahnelerde çıkar: sınıf/iş/seyahat/mesaj/sınav. Her sahne için bir cümle yaz. Bağlam yoksa kalıp havada kalır; bağlamlı cümle ezberi kalıcıdır.`
  );
  paras.push(
    `Üslup notu: Samimi (φίλος, γεια σου) ile resmi (σας, θα μπορούσατε, με εκτίμηση) arasındaki farkı aynı içerikte iki versiyon yazarak hisset. ${level} seviyesinde yanlış resmiyet kırıcı değildir; yanlış samimiyet bazen garip olur — şüphede nazik/resmi seç.`
  );
  paras.push(
    `YDS ve sınav ipucu: Soru kökünde bağlaç, uyum, collocation veya çıkarım aranıyorsa önce yapısal ipucunu işaretle, sonra şık ele. «${title}» ile ilgili çeldiriciler genelde yakın ama yanlış gövde/bağlaç taşır. Eleme gerekçeni bir cümleyle yaz.`
  );
  paras.push(
    `Ezber ve pratik yöntemi: 10 dk kural + 10 dk örnek + 10 dk üretim. Kartlarda TR→YN yönünü zorla. Bir cümleyi kaydet, dinle, tek hatayı düzelt, aynı cümleyi yeniden kaydet. Bugünün çıktısı: en az 8 doğru cümle ve 1 mini diyalog/paragraf.`
  );
  paras.push(
    `Üretim görevi (zorunlu): ${detail} Bitince kendi cümlelerinden üçünü ezbere söyle. Ezbere gelemeyen cümle henüz senin değildir; yazılı bırakma, seslendir.`
  );
  paras.push(
    `Öz-kontrol soruları: (1) Bu konunun iskeletini gözün kapalıyken söyleyebiliyor musun? (2) Sekiz örnekten beşini Türkçesiz üretebiliyor musun? (3) Tipik bir hatanı ve doğrusunu yazabiliyor musun? (4) Samimi ve resmi birer örnek verebiliyor musun? Dördüne de evet demeden geçme.`
  );
  paras.push(
    `Kapanış ölçütü: «${title}» için tablo/kalıp listesi defterde duruyor; en az bir kayıt yapılmış; hata günlüğüne 1–3 madde eklenmiş. Bunlar yoksa dersi tamamlanmış sayma.`
  );

  // Keep best prior paragraphs as extra depth (skip near-duplicates)
  for (const p of prevText.slice(0, 6)) {
    if (!paras.some((x) => x.includes(p.slice(0, 40)))) {
      paras.push(`Ek derinlik: ${p}`);
    }
  }

  return paras;
}

function expandPack(file, constName, banner, pred) {
  let prev = {};
  try {
    prev = loadTheory(file, constName);
  } catch (e) {
    console.warn("load fail", file, e.message);
  }
  const subset = tasks.filter((t) => pred(t.id));
  // also pull xii ids
  const extraIds = [];
  try {
    const xii = fs.readFileSync(path.join(__dirname, "..", "js/patterns-xii.js"), "utf8");
    const re = /"(a1-u10-t\d|a2-u12-t\d|b2-u9-t\d)"/g;
    let m;
    while ((m = re.exec(xii))) extraIds.push(m[1]);
  } catch (_) {}
  const byId = new Map(subset.map((t) => [t.id, t]));
  for (const id of extraIds) {
    if (!byId.has(id) && pred(id)) {
      byId.set(id, { id, title: id, detail: "Paket XII görevi — kalıp ve üretim." });
    }
  }
  const out = {};
  for (const t of byId.values()) {
    out[t.id] = megaFor(t, prev[t.id]);
  }
  saveTheory(file, constName, out, banner);
  return out;
}

const bannerA = "/* Mega theory A0–A1 — textbook depth */";
const bannerB = "/* Mega theory A2–B1 — textbook depth */";
const bannerC = "/* Mega theory B2–C2 — textbook depth */";

expandPack("theory-deep-a0a1.js", "THEORY_DEEP_A0A1", bannerA, (id) => id.startsWith("a0-") || id.startsWith("a1-"));
expandPack("theory-deep-a2b1.js", "THEORY_DEEP_A2B1", bannerB, (id) => id.startsWith("a2-") || id.startsWith("b1-"));
expandPack("theory-deep-b2c2.js", "THEORY_DEEP_B2C2", bannerC, (id) => /^(b2|c1|c2)-/.test(id));

// stats
require("./theory-stats.js");
