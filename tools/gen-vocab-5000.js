/**
 * Gerçek Yunanca–Türkçe kelime bankası (sahte λέξη-N yok).
 * Kaynaklar: mevcut desteler + polyglot CSV + MUSE el-en / en-tr birleşimi + tematik listeler
 * Çalıştır: node tools/gen-vocab-5000.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const vocabDir = path.join(__dirname, "_vocab");

function loadExistingDecks() {
  const ctx = { console };
  vm.createContext(ctx);
  vm.runInContext(
    "var DRILLS={cloze:[],reading:[]}; var Lessons={get:function(){return null}};",
    ctx
  );
  const files = [
    "content.js",
    "trainers.js",
    "extras.js",
    "extras2.js",
    "extras3.js",
    "extras4.js",
    "extras5.js",
    "extras6.js",
    "extras7.js",
    "extras8.js",
    "extras9.js"
  ];
  for (const f of files) {
    try {
      let code = fs.readFileSync(path.join(root, "js", f), "utf8");
      if (f === "content.js") code += "\nthis.CONTENT=CONTENT;";
      vm.runInContext(code, ctx);
    } catch {
      /* skip */
    }
  }
  return (ctx.CONTENT && ctx.CONTENT.decks) || {};
}

function isGreeky(s) {
  return /[Α-Ωα-ωάέήίόύώϊϋΐΰΆΈΉΊΌΎΏ]/.test(s);
}

function isFake(el, tr) {
  const e = String(el || "");
  const t = String(tr || "");
  if (/^λέξη[-_]?\d+$/i.test(e)) return true;
  if (/^όρος_?\d+$/i.test(e)) return true;
  if (/^kelime\s*\d+$/i.test(t)) return true;
  if (/^terim\s*\d+$/i.test(t)) return true;
  if (/-\d+$/.test(e) && /türeme|ek|extra/i.test(t)) return true;
  if (/^[α-ωάέήίόύώ]{1,2}-[α-ω]+$/i.test(e) && t.includes("(")) return true; // derived junk
  return false;
}

function normalizeEl(el) {
  return String(el || "")
    .trim()
    .replace(/\s+/g, " ");
}

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (q && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else q = !q;
    } else if (ch === "," && !q) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out;
}

function loadPolyglotJoin() {
  const elPath = path.join(vocabDir, "words_el.csv");
  const trPath = path.join(vocabDir, "words_tr.csv");
  if (!fs.existsSync(elPath) || !fs.existsSync(trPath)) return [];
  const elLines = fs.readFileSync(elPath, "utf8").split(/\r?\n/).filter(Boolean);
  const trLines = fs.readFileSync(trPath, "utf8").split(/\r?\n/).filter(Boolean);
  const enToTr = new Map();
  for (let i = 1; i < trLines.length; i++) {
    const cols = parseCsvLine(trLines[i]);
    if (cols.length < 3) continue;
    const [trWord, , en] = cols;
    const key = en.trim().toLowerCase();
    if (!key || !trWord) continue;
    if (!enToTr.has(key)) enToTr.set(key, trWord.trim());
  }
  const pairs = [];
  for (let i = 1; i < elLines.length; i++) {
    const cols = parseCsvLine(elLines[i]);
    if (cols.length < 3) continue;
    const [elWord, pos, en] = cols;
    const key = en.trim().toLowerCase();
    const tr = enToTr.get(key);
    if (!elWord || !tr || !isGreeky(elWord)) continue;
    pairs.push({
      el: normalizeEl(elWord),
      tr,
      tip: pos || "",
      deck: "polyglot"
    });
  }
  return pairs;
}

function loadMuseJoin(limit = 8000) {
  const elEnPath = path.join(vocabDir, "el-en.txt");
  const enTrPath = path.join(vocabDir, "en-tr.txt");
  if (!fs.existsSync(elEnPath) || !fs.existsSync(enTrPath)) return [];

  const enToTr = new Map();
  fs.readFileSync(enTrPath, "utf8")
    .split(/\r?\n/)
    .forEach((line) => {
      const [en, tr] = line.split("\t");
      if (!en || !tr) return;
      const k = en.trim().toLowerCase();
      if (!enToTr.has(k) && /^[a-zA-Z' -]+$/.test(en.trim()) && tr.trim().length > 1) {
        enToTr.set(k, tr.trim());
      }
    });

  const pairs = [];
  const seen = new Set();
  fs.readFileSync(elEnPath, "utf8")
    .split(/\r?\n/)
    .forEach((line) => {
      if (pairs.length >= limit) return;
      const [el, en] = line.split("\t");
      if (!el || !en || !isGreeky(el)) return;
      // skip noisy proper-looking all-caps / very short
      const elN = normalizeEl(el);
      if (elN.length < 2 || elN.length > 40) return;
      if (/^\d/.test(elN)) return;
      const tr = enToTr.get(en.trim().toLowerCase());
      if (!tr) return;
      if (seen.has(elN)) return;
      seen.add(elN);
      pairs.push({ el: elN, tr, tip: "", deck: "muse" });
    });
  return pairs;
}

const thematic = {
  a0: [
    ["καλημέρα", "günaydın"],
    ["καλησπέρα", "iyi akşamlar"],
    ["καληνύχτα", "iyi geceler"],
    ["γεια", "merhaba"],
    ["αντίο", "hoşça kal"],
    ["ευχαριστώ", "teşekkürler"],
    ["παρακαλώ", "lütfen / rica ederim"],
    ["συγγνώμη", "özür dilerim"],
    ["ναι", "evet"],
    ["όχι", "hayır"],
    ["νερό", "su"],
    ["ψωμί", "ekmek"],
    ["γάλα", "süt"],
    ["καφές", "kahve"],
    ["τσάι", "çay"],
    ["φίλος", "arkadaş (e)"],
    ["φίλη", "arkadaş (k)"],
    ["όνομα", "ad"],
    ["αριθμός", "sayı"]
  ],
  numbers: [
    ["μηδέν", "sıfır"],
    ["ένα", "bir"],
    ["δύο", "iki"],
    ["τρία", "üç"],
    ["τέσσερα", "dört"],
    ["πέντε", "beş"],
    ["έξι", "altı"],
    ["επτά", "yedi"],
    ["οκτώ", "sekiz"],
    ["εννέα", "dokuz"],
    ["δέκα", "on"],
    ["είκοσι", "yirmi"],
    ["τριάντα", "otuz"],
    ["σαράντα", "kırk"],
    ["πενήντα", "elli"],
    ["εξήντα", "altmış"],
    ["εβδομήντα", "yetmiş"],
    ["ογδόντα", "seksen"],
    ["ενενήντα", "doksan"],
    ["εκατό", "yüz"],
    ["χίλια", "bin"]
  ],
  family: [
    ["οικογένεια", "aile"],
    ["μητέρα", "anne"],
    ["πατέρας", "baba"],
    ["γονείς", "ebeveynler"],
    ["αδελφός", "erkek kardeş"],
    ["αδελφή", "kız kardeş"],
    ["γιος", "oğul"],
    ["κόρη", "kız çocuğu"],
    ["παππούς", "dede"],
    ["γιαγιά", "nine"],
    ["θείος", "amca / dayı"],
    ["θεία", "hala / teyze"],
    ["άντρας", "koca / erkek"],
    ["γυναίκα", "kadın / eş"],
    ["παιδί", "çocuk"],
    ["μωρό", "bebek"],
    ["σύζυγος", "eş"]
  ],
  food: [
    ["φαγητό", "yemek"],
    ["πρωινό", "kahvaltı"],
    ["κρέας", "et"],
    ["κοτόπουλο", "tavuk"],
    ["ψάρι", "balık"],
    ["αυγό", "yumurta"],
    ["τυρί", "peynir"],
    ["ρύζι", "pirinç"],
    ["σαλάτα", "salata"],
    ["σούπα", "çorba"],
    ["μήλο", "elma"],
    ["πορτοκάλι", "portakal"],
    ["μπανάνα", "muz"],
    ["ντομάτα", "domates"],
    ["πατάτα", "patates"],
    ["λάδι", "yağ"],
    ["αλάτι", "tuz"],
    ["ζάχαρη", "şeker"],
    ["μέλι", "bal"],
    ["κρασί", "şarap"],
    ["μπίρα", "bira"],
    ["παγωτό", "dondurma"]
  ],
  home: [
    ["σπίτι", "ev"],
    ["διαμέρισμα", "daire"],
    ["δωμάτιο", "oda"],
    ["κουζίνα", "mutfak"],
    ["μπάνιο", "banyo"],
    ["πόρτα", "kapı"],
    ["παράθυρο", "pencere"],
    ["τραπέζι", "masa"],
    ["καρέκλα", "sandalye"],
    ["κρεβάτι", "yatak"],
    ["κλειδί", "anahtar"],
    ["ψυγείο", "buzdolabı"]
  ],
  city: [
    ["πόλη", "şehir"],
    ["δρόμος", "sokak"],
    ["πλατεία", "meydan"],
    ["στάση", "durak"],
    ["αεροδρόμιο", "havaalanı"],
    ["νοσοκομείο", "hastane"],
    ["σχολείο", "okul"],
    ["πανεπιστήμιο", "üniversite"],
    ["μουσείο", "müze"],
    ["εστιατόριο", "restoran"],
    ["ξενοδοχείο", "otel"],
    ["τράπεζα", "banka"],
    ["φαρμακείο", "eczane"],
    ["παραλία", "plaj"],
    ["θάλασσα", "deniz"]
  ],
  verbs: [
    ["είμαι", "olmak"],
    ["έχω", "sahip olmak"],
    ["κάνω", "yapmak"],
    ["πάω", "gitmek"],
    ["έρχομαι", "gelmek"],
    ["βλέπω", "görmek"],
    ["ακούω", "duymak"],
    ["μιλάω", "konuşmak"],
    ["λέω", "söylemek"],
    ["διαβάζω", "okumak"],
    ["γράφω", "yazmak"],
    ["τρώω", "yemek"],
    ["πίνω", "içmek"],
    ["θέλω", "istemek"],
    ["μπορώ", "ebilmek"],
    ["ξέρω", "bilmek"],
    ["καταλαβαίνω", "anlamak"],
    ["μαθαίνω", "öğrenmek"],
    ["δουλεύω", "çalışmak"],
    ["μένω", "oturmak"],
    ["αγοράζω", "satın almak"],
    ["πουλάω", "satmak"],
    ["ανοίγω", "açmak"],
    ["κλείνω", "kapatmak"],
    ["παίρνω", "almak"],
    ["δίνω", "vermek"],
    ["περπατάω", "yürümek"],
    ["τρέχω", "koşmak"],
    ["κοιμάμαι", "uyumak"],
    ["ξυπνάω", "uyanmak"],
    ["φεύγω", "ayrılmak"],
    ["φτάνω", "varmak"],
    ["περιμένω", "beklemek"],
    ["ρωτάω", "sormak"],
    ["απαντάω", "cevaplamak"],
    ["βοηθάω", "yardım etmek"],
    ["αγαπάω", "sevmek"],
    ["σκέφτομαι", "düşünmek"],
    ["θυμάμαι", "hatırlamak"],
    ["ξεχνάω", "unutmak"],
    ["αρχίζω", "başlamak"],
    ["τελειώνω", "bitirmek"],
    ["προσπαθώ", "çabalamak"],
    ["πιστεύω", "inanmak"],
    ["ελπίζω", "umut etmek"],
    ["φοβάμαι", "korkmak"],
    ["χαίρομαι", "sevinmek"],
    ["πήγα", "gittim"],
    ["ήρθα", "geldim"],
    ["είδα", "gördüm"],
    ["είπα", "söyledim"],
    ["έφαγα", "yedim"],
    ["έκανα", "yaptım"],
    ["θα πάω", "gideceğim"],
    ["θα έρθω", "geleceğim"]
  ],
  adjectives: [
    ["καλός", "iyi"],
    ["κακός", "kötü"],
    ["μεγάλος", "büyük"],
    ["μικρός", "küçük"],
    ["νέος", "yeni / genç"],
    ["παλιός", "eski"],
    ["ωραίος", "güzel"],
    ["εύκολος", "kolay"],
    ["δύσκολος", "zor"],
    ["γρήγορος", "hızlı"],
    ["αργός", "yavaş"],
    ["ακριβός", "pahalı"],
    ["φθηνός", "ucuz"],
    ["ζεστός", "sıcak"],
    ["κρύος", "soğuk"],
    ["χαρούμενος", "mutlu"],
    ["λυπημένος", "üzgün"],
    ["κουρασμένος", "yorgun"],
    ["έτοιμος", "hazır"],
    ["σημαντικός", "önemli"]
  ]
};

const decks = loadExistingDecks();
const seen = new Set();
const all = [];

function add(deck, el, tr, tip) {
  el = normalizeEl(el);
  tr = String(tr || "").trim();
  if (!el || !tr || !isGreeky(el)) return false;
  if (isFake(el, tr)) return false;
  if (seen.has(el)) return false;
  // skip pure punctuation / digits
  if (!/[α-ωάέήίόύώ]/i.test(el)) return false;
  seen.add(el);
  all.push({ el, tr, tip: tip || "", deck: deck || "mega" });
  return true;
}

// 1) existing real decks (skip extra/derived fakes)
Object.keys(decks).forEach((deckId) => {
  if (deckId === "extra" || deckId === "derived" || deckId === "combo" || deckId === "mega") return;
  (decks[deckId] || []).forEach((w) => add(deckId, w.el, w.tr, w.tip || ""));
});

// 2) thematic
Object.keys(thematic).forEach((deck) => {
  thematic[deck].forEach(([el, tr]) => add(deck, el, tr, ""));
});

// 3) polyglot join
loadPolyglotJoin().forEach((p) => add(p.deck, p.el, p.tr, p.tip));

// 4) MUSE join
loadMuseJoin(12000).forEach((p) => add(p.deck, p.el, p.tr, p.tip));

console.log("unique real so far", all.length);

// Prefer quality: if over 5000, keep first 5000 (existing+thematic+polyglot first, muse fills)
const target = all.slice(0, 5000);

// Mega file = only words not already in base content (without mega/extra)
const baseSeen = new Set();
Object.keys(decks).forEach((id) => {
  if (id === "extra" || id === "derived" || id === "combo" || id === "mega") return;
  (decks[id] || []).forEach((w) => w.el && baseSeen.add(normalizeEl(w.el)));
});

const megaList = [];
const megaSeen = new Set(baseSeen);
for (const w of target) {
  if (megaSeen.has(w.el)) continue;
  megaSeen.add(w.el);
  megaList.push({ el: w.el, tr: w.tr, tip: w.tip || "", deck: w.deck === "muse" || w.deck === "polyglot" ? "core" : w.deck });
}

const file = `/* Gerçek kelime paketi — sahte λέξη-N yok. ${megaList.length} madde */
const VOCAB_MEGA = ${JSON.stringify(megaList, null, 2)};

(function mergeVocabMega() {
  if (typeof CONTENT === "undefined" || !CONTENT.decks) return;
  // temizle: eski sahte desteler
  delete CONTENT.decks.extra;
  delete CONTENT.decks.derived;
  delete CONTENT.decks.combo;
  delete CONTENT.decks.mega;

  const seen = new Set();
  Object.keys(CONTENT.decks).forEach((id) => {
    CONTENT.decks[id] = (CONTENT.decks[id] || []).filter((w) => {
      if (!w || !w.el) return false;
      if (/^λέξη[-_]?\\d+$/i.test(w.el) || /^όρος_?\\d+$/i.test(w.el)) return false;
      if (/^kelime\\s*\\d+$/i.test(w.tr || "")) return false;
      if (seen.has(w.el)) return false;
      seen.add(w.el);
      return true;
    });
  });

  VOCAB_MEGA.forEach((w) => {
    if (!w || !w.el || seen.has(w.el)) return;
    if (/^λέξη[-_]?\\d+$/i.test(w.el) || /^όρος_?\\d+$/i.test(w.el)) return;
    seen.add(w.el);
    const deck = w.deck || "core";
    if (!CONTENT.decks[deck]) CONTENT.decks[deck] = [];
    CONTENT.decks[deck].push({ el: w.el, tr: w.tr, tip: w.tip || "" });
  });

  CONTENT.vocabCount = function vocabCount() {
    const u = new Set();
    Object.keys(CONTENT.decks).forEach((id) => {
      (CONTENT.decks[id] || []).forEach((w) => w && w.el && u.add(w.el));
    });
    return u.size;
  };
})();
`;

fs.writeFileSync(path.join(root, "js/vocab-mega.js"), file);
console.log("wrote vocab-mega.js", megaList.length, "projected unique ~", megaSeen.size);
