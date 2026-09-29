const App = (() => {
  let view = "today";
  let selectedLevelId = null;
  let cardDeckId = null;
  let cardQueue = [];
  let cardIndex = 0;
  let cardFlipped = false;
  let diagIndex = 0;
  let diagAnswers = [];
  let diagActive = false;
  let drillMode = null;
  let drillIndex = 0;
  let drillFeedback = null;
  let speakTimer = null;
  let speakLeft = 0;
  let speakPromptId = null;
  let trainerMode = null;
  let trainerQ = null;
  let trainerScore = { ok: 0, n: 0 };
  let trainerFeedback = null;
  let challengeQueue = [];
  let challengeIndex = 0;

  function speakGreek(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "el-GR";
    u.rate = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const elVoice = voices.find((v) => (v.lang || "").toLowerCase().startsWith("el"));
    if (elVoice) u.voice = elVoice;
    window.speechSynthesis.speak(u);
  }

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function typeBadge(type) {
    const label = CURRICULUM.typeLabels[type] || type;
    return `<span class="badge badge-${escapeHtml(type)}">${escapeHtml(label)}</span>`;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function render() {
    const state = Progress.load();
    const root = $("#app");
    if (diagActive) {
      root.innerHTML = "";
      root.appendChild(renderDiagnostic());
      return;
    }
    if (drillMode) {
      root.innerHTML = "";
      root.appendChild(renderDrill(state));
      return;
    }
    if (trainerMode) {
      root.innerHTML = "";
      root.appendChild(renderTrainer(state));
      return;
    }
    if (!state.onboardingDone) {
      root.innerHTML = "";
      root.appendChild(renderOnboarding());
      return;
    }
    root.innerHTML = "";
    root.appendChild(renderShell(state));
  }

  function renderOnboarding() {
    const wrap = el(`<div class="onboard">
      <div class="onboard-bg" aria-hidden="true"></div>
      <div class="onboard-card">
        <p class="brand-mark">Οδηγός</p>
        <h1>Yunanca seni sisteme bağlar</h1>
        <p class="lede">A0’dan C2+’ya tek yol. Uygulama ne diyecek, sen yapacaksın. Sonunda dil senin olacak — YDS dahil.</p>
        <form id="onboard-form" class="onboard-form">
          <label>
            <span>Adın (isteğe bağlı)</span>
            <input name="name" type="text" placeholder="Örn. Nurhat" maxlength="40" autocomplete="nickname" />
          </label>
          <label>
            <span>Şu an yaklaşık seviyen</span>
            <select name="level" required>
              ${CURRICULUM.levels.map((l) => `<option value="${l.id}" ${l.id === "a1" ? "selected" : ""}>${l.code} — ${escapeHtml(l.title)}</option>`).join("")}
            </select>
          </label>
          <p class="hint">8 aydır çalışıyorsan genelde A1–A2. Emin değilsen teşhis sınavını çalıştır.</p>
          <label>
            <span>Günlük tempo</span>
            <select name="mode">
              ${Object.entries(CURRICULUM.dailyTemplates)
                .map(([k, v]) => `<option value="${k}" ${k === "standard" ? "selected" : ""}>${escapeHtml(v.label)}</option>`)
                .join("")}
            </select>
          </label>
          <button type="submit" class="btn btn-primary">Yolculuğu başlat</button>
          <button type="button" class="btn btn-ghost" id="start-diag">Önce teşhis sınavı (16 soru)</button>
        </form>
      </div>
    </div>`);

    wrap.querySelector("#onboard-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      Progress.completeOnboarding({
        name: fd.get("name"),
        levelId: fd.get("level"),
        dailyMode: fd.get("mode")
      });
      view = "today";
      render();
    });

    wrap.querySelector("#start-diag").addEventListener("click", () => {
      diagIndex = 0;
      diagAnswers = [];
      diagActive = true;
      render();
    });
    return wrap;
  }

  function renderDiagnostic() {
    const items = CONTENT.diagnostic;
    if (diagIndex >= items.length) {
      const correct = diagAnswers.filter(Boolean).length;
      const levelId = CONTENT.levelFromScore(correct, items.length);
      const level = CURRICULUM.levels.find((l) => l.id === levelId);
      Progress.saveDiagnostic({ correct, total: items.length, levelId });
      const wrap = el(`<div class="onboard">
        <div class="onboard-bg" aria-hidden="true"></div>
        <div class="onboard-card">
          <p class="brand-mark">Teşhis</p>
          <h1>${correct}/${items.length}</h1>
          <p class="lede">Önerilen başlangıç: <strong>${escapeHtml(level.code)} · ${escapeHtml(level.title)}</strong></p>
          <button class="btn btn-primary" id="diag-apply">Bu seviyeyle başla</button>
          <button class="btn btn-ghost" id="diag-again">Tekrar çöz</button>
        </div>
      </div>`);
      wrap.querySelector("#diag-apply").addEventListener("click", () => {
        const state = Progress.load();
        Progress.completeOnboarding({
          name: state.displayName || "",
          levelId,
          dailyMode: state.dailyMode || "standard"
        });
        diagActive = false;
        view = "today";
        render();
      });
      wrap.querySelector("#diag-again").addEventListener("click", () => {
        diagIndex = 0;
        diagAnswers = [];
        render();
      });
      return wrap;
    }

    const item = items[diagIndex];
    const wrap = el(`<div class="onboard">
      <div class="onboard-bg" aria-hidden="true"></div>
      <div class="onboard-card diag-card">
        <p class="eyebrow">Soru ${diagIndex + 1} / ${items.length}</p>
        <h1 class="diag-q">${escapeHtml(item.q)}</h1>
        <div class="diag-opts" id="diag-opts"></div>
        <div class="progress-line lg"><span style="width:${Math.round((diagIndex / items.length) * 100)}%"></span></div>
      </div>
    </div>`);

    const opts = wrap.querySelector("#diag-opts");
    item.options.forEach((opt, i) => {
      const btn = el(`<button type="button" class="btn diag-opt">${escapeHtml(opt)}</button>`);
      btn.addEventListener("click", () => {
        diagAnswers.push(i === item.a);
        diagIndex++;
        render();
      });
      opts.appendChild(btn);
    });
    return wrap;
  }

  function renderShell(state) {
    const stats = Progress.overallStats();
    const shell = el(`<div class="shell">
      <header class="topbar">
        <div class="topbar-brand">
          <span class="logo">Οδηγός</span>
          <span class="logo-sub">Yunanca A0 → C2+</span>
        </div>
        <div class="topbar-meta">
          <span class="pill" title="Seri">${stats.streak} gün seri</span>
          <span class="pill muted">${stats.pct}%</span>
        </div>
      </header>
      <main class="main" id="main"></main>
      <nav class="tabbar" aria-label="Ana menü">
        <button data-view="today" class="${view === "today" ? "active" : ""}"><span class="tab-icon">◎</span>Bugün</button>
        <button data-view="roadmap" class="${view === "roadmap" || view === "level" ? "active" : ""}"><span class="tab-icon">☰</span>Yol</button>
        <button data-view="cards" class="${view === "cards" ? "active" : ""}"><span class="tab-icon">Α</span>Kart</button>
        <button data-view="yds" class="${view === "yds" ? "active" : ""}"><span class="tab-icon">✦</span>YDS</button>
        <button data-view="progress" class="${view === "progress" ? "active" : ""}"><span class="tab-icon">▣</span>İlerleme</button>
      </nav>
    </div>`);

    shell.querySelectorAll(".tabbar button").forEach((btn) => {
      btn.addEventListener("click", () => {
        view = btn.dataset.view;
        selectedLevelId = null;
        cardDeckId = null;
        render();
      });
    });

    const main = shell.querySelector("#main");
    if (view === "today") main.appendChild(renderToday(state));
    else if (view === "roadmap") main.appendChild(renderRoadmap());
    else if (view === "level") main.appendChild(renderLevel(selectedLevelId || state.currentLevelId));
    else if (view === "cards") main.appendChild(renderCards(state));
    else if (view === "yds") main.appendChild(renderYds());
    else if (view === "progress") main.appendChild(renderProgress(state));

    return shell;
  }

  function renderToday(state) {
    const plan = Progress.todayPlan();
    const next = Progress.nextIncompleteTask();
    const name = state.displayName ? `, ${escapeHtml(state.displayName)}` : "";
    const level = CURRICULUM.levels.find((l) => l.id === state.currentLevelId);
    const deckId = CONTENT.decks[level.id] ? level.id : level.id === "c2plus" ? "yds" : "a1";
    const dueHint = CONTENT.decks[deckId] ? CONTENT.decks[deckId].length : 0;

    const todayMins = (state.studyLog || {})[Progress.todayStr()] || 0;
    const week = Progress.weekActivity();
    const ts = state.trainerStats || {};
    const section = el(`<section class="view today-view">
      <div class="hero-today">
        <p class="eyebrow">Bugünün emri</p>
        <h1>Merhaba${name}</h1>
        <p class="lede">Aktif seviye: <strong>${escapeHtml(level.code)} · ${escapeHtml(level.title)}</strong> — ${escapeHtml(plan.label)} · bugün ${todayMins} dk</p>
      </div>
      <div class="week-strip" aria-label="Son 7 gün">
        ${week
          .map(
            (d) =>
              `<div class="week-day ${d.active ? "on" : ""}" title="${d.key}${d.mins ? " · " + d.mins + " dk" : ""}"><span>${d.label}</span><i></i></div>`
          )
          .join("")}
      </div>
      ${
        next
          ? `<article class="focus-card">
              <p class="eyebrow">Sıradaki görev</p>
              <h2>${escapeHtml(next.task.title)}</h2>
              <p>${escapeHtml(next.task.detail)}</p>
              <div class="focus-meta">
                ${typeBadge(next.task.type)}
                <span class="meta">${escapeHtml(next.level.code)} · ${escapeHtml(next.unit.title)} · ~${next.task.minutes} dk</span>
              </div>
              <button class="btn btn-primary" data-do="${next.task.id}" data-min="${next.task.minutes}">Tamamladım</button>
            </article>`
          : `<article class="focus-card done"><h2>Tüm yol tamam</h2><p>Müfredattaki her görev işaretli. Bakım rutinine geç.</p></article>`
      }
      <article class="mini-action">
        <div>
          <strong>Kelime turu</strong>
          <p>${escapeHtml(deckId.toUpperCase())} destesinden ~${dueHint} kart hazır</p>
        </div>
        <button class="btn btn-ghost" id="go-cards">Kart aç</button>
      </article>
      <article class="mini-action study-log-box">
        <div>
          <strong>Çalışma süresi ekle</strong>
          <p>Kaynak dışında çalıştıysan buraya yaz</p>
        </div>
        <form id="mins-form" class="mins-form">
          <input name="mins" type="number" min="5" max="300" step="5" value="25" aria-label="Dakika" />
          <button type="submit" class="btn btn-ghost">+ dk</button>
        </form>
      </article>
      ${trainerButtons(ts)}
      <div class="section-head">
        <h3>Bugünkü plan</h3>
        <select id="mode-select" aria-label="Günlük tempo">
          ${Object.entries(CURRICULUM.dailyTemplates)
            .map(
              ([k, v]) =>
                `<option value="${k}" ${k === state.dailyMode ? "selected" : ""}>${escapeHtml(v.label)}</option>`
            )
            .join("")}
        </select>
      </div>
      <ul class="task-list" id="today-list"></ul>
      <div class="principles">
        <h3>Kurallar</h3>
        <ul>${CURRICULUM.principles.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
      </div>
    </section>`);

    const list = section.querySelector("#today-list");
    plan.items.forEach(({ level: lv, unit, task }) => {
      list.appendChild(taskRow(lv, unit, task));
    });

    section.querySelector("#mode-select")?.addEventListener("change", (e) => {
      Progress.setDailyMode(e.target.value);
      render();
    });

    section.querySelector("[data-do]")?.addEventListener("click", (e) => {
      const btn = e.currentTarget;
      Progress.toggleTask(btn.dataset.do, Number(btn.dataset.min) || 0);
      render();
    });

    section.querySelector("#go-cards")?.addEventListener("click", () => {
      view = "cards";
      cardDeckId = deckId;
      startDeck(deckId);
      render();
    });

    section.querySelector("#mins-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const mins = Number(new FormData(e.target).get("mins")) || 0;
      Progress.logStudyMinutes(mins);
      render();
    });

    section.querySelectorAll("[data-train]").forEach((btn) => {
      btn.addEventListener("click", () => {
        startTrainer(btn.dataset.train);
        render();
      });
    });

    return section;
  }

  function taskRow(level, unit, task) {
    const done = Progress.isDone(task.id);
    const row = el(`<li class="task-row ${done ? "is-done" : ""}">
      <button class="check" aria-pressed="${done}" aria-label="Görevi işaretle"></button>
      <div class="task-body">
        <div class="task-title-row">
          <strong>${escapeHtml(task.title)}</strong>
          ${typeBadge(task.type)}
        </div>
        <p>${escapeHtml(task.detail)}</p>
        <span class="meta">${escapeHtml(level.code)} · ${escapeHtml(unit.title)} · ~${task.minutes} dk</span>
      </div>
    </li>`);
    row.querySelector(".check").addEventListener("click", () => {
      Progress.toggleTask(task.id, task.minutes || 0);
      render();
    });
    return row;
  }

  function renderRoadmap() {
    const section = el(`<section class="view roadmap-view">
      <div class="view-intro">
        <p class="eyebrow">Yol haritası</p>
        <h1>A0 → C2+</h1>
        <p class="lede">Bir seviye en az %70 tamamlanmadan sonrakiler kilitli kalır. Atlamak yok — sistem bu.</p>
      </div>
      <input type="search" id="road-search" class="road-search" placeholder="Görev veya birim ara…" autocomplete="off" />
      <ul class="search-hits" id="search-hits" hidden></ul>
      <ol class="level-rail" id="level-rail"></ol>
    </section>`);

    const rail = section.querySelector("#level-rail");
    CURRICULUM.levels.forEach((level, i) => {
      const stats = Progress.levelStats(level);
      const unlocked = Progress.isLevelUnlocked(level.id);
      const state = Progress.load();
      const isCurrent = state.currentLevelId === level.id;
      const li = el(`<li class="level-card ${unlocked ? "" : "locked"} ${isCurrent ? "current" : ""}" style="--accent:${level.color}">
        <div class="level-index">${String(i + 1).padStart(2, "0")}</div>
        <div class="level-body">
          <div class="level-codes">
            <span class="code">${escapeHtml(level.code)}</span>
            <span class="greek">${escapeHtml(level.greekTitle)}</span>
          </div>
          <h2>${escapeHtml(level.title)}</h2>
          <p>${escapeHtml(level.subtitle)}</p>
          <div class="progress-line"><span style="width:${stats.pct}%"></span></div>
          <div class="level-foot">
            <span>${stats.done}/${stats.total} görev · ${escapeHtml(level.duration)}</span>
            ${unlocked ? `<button class="btn btn-ghost" data-open="${level.id}">Aç</button>` : `<span class="lock">Önceki seviye %70</span>`}
          </div>
        </div>
      </li>`);
      li.querySelector("[data-open]")?.addEventListener("click", () => {
        selectedLevelId = level.id;
        Progress.setLevel(level.id);
        view = "level";
        render();
      });
      rail.appendChild(li);
    });

    const hits = section.querySelector("#search-hits");
    section.querySelector("#road-search").addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      hits.innerHTML = "";
      if (q.length < 2) {
        hits.hidden = true;
        return;
      }
      const found = [];
      CURRICULUM.levels.forEach((level) => {
        level.units.forEach((unit) => {
          unit.tasks.forEach((task) => {
            const hay = `${task.title} ${task.detail} ${unit.title} ${level.code}`.toLowerCase();
            if (hay.includes(q)) found.push({ level, unit, task });
          });
        });
      });
      hits.hidden = false;
      found.slice(0, 12).forEach(({ level, unit, task }) => {
        const li = el(`<li><button type="button"><strong>${escapeHtml(task.title)}</strong><span>${escapeHtml(level.code)} · ${escapeHtml(unit.title)}</span></button></li>`);
        li.querySelector("button").addEventListener("click", () => {
          selectedLevelId = level.id;
          Progress.setLevel(level.id);
          view = "level";
          render();
        });
        hits.appendChild(li);
      });
      if (!found.length) hits.appendChild(el(`<li class="empty-hit">Sonuç yok</li>`));
    });
    return section;
  }

  function renderLevel(levelId) {
    const level = CURRICULUM.levels.find((l) => l.id === levelId) || CURRICULUM.levels[0];
    const stats = Progress.levelStats(level);
    const notes = CONTENT.grammar[level.id] || [];
    const section = el(`<section class="view level-view">
      <button class="back" id="back-road">← Yol haritası</button>
      <header class="level-hero" style="--accent:${level.color}">
        <p class="eyebrow">${escapeHtml(level.code)} · ${escapeHtml(level.greekTitle)}</p>
        <h1>${escapeHtml(level.title)}</h1>
        <p class="lede">${escapeHtml(level.goal)}</p>
        <div class="chips">${level.skills.map((s) => `<span class="chip">${escapeHtml(s)}</span>`).join("")}</div>
        <div class="progress-line lg"><span style="width:${stats.pct}%"></span></div>
        <p class="meta">${stats.pct}% · ${stats.done}/${stats.total} görev · ~${stats.minutes} dk birikmiş</p>
      </header>
      ${
        notes.length
          ? `<article class="unit-block grammar-block">
              <header class="unit-head"><div><h2>Hızlı dilbilgisi</h2><p>Bu seviyenin omurgası</p></div></header>
              <ul class="grammar-list">${notes.map((n) => `<li><strong>${escapeHtml(n.t)}</strong><span>${escapeHtml(n.b)}</span></li>`).join("")}</ul>
            </article>`
          : ""
      }
      <div id="units"></div>
    </section>`);

    section.querySelector("#back-road").addEventListener("click", () => {
      view = "roadmap";
      render();
    });

    const units = section.querySelector("#units");
    level.units.forEach((unit) => {
      const us = Progress.unitStats(unit);
      const block = el(`<article class="unit-block">
        <header class="unit-head">
          <div>
            <h2>${escapeHtml(unit.title)}</h2>
            <p>${escapeHtml(unit.focus)}</p>
          </div>
          <span class="unit-pct">${us.pct}%</span>
        </header>
        <ul class="task-list"></ul>
      </article>`);
      const list = block.querySelector(".task-list");
      unit.tasks.forEach((task) => list.appendChild(taskRow(level, unit, task)));
      units.appendChild(block);
    });
    return section;
  }

  function startDeck(deckId) {
    const cards = CONTENT.decks[deckId] || [];
    const state = Progress.load();
    cardQueue = shuffle(
      cards.map((c) => {
        const key = Progress.cardKey(deckId, c.el);
        const meta = state.cards[key] || { box: 1 };
        return { ...c, box: meta.box || 1 };
      })
    ).sort((a, b) => a.box - b.box);
    cardIndex = 0;
    cardFlipped = false;
    cardDeckId = deckId;
  }

  function startTrainer(mode) {
    trainerMode = mode;
    trainerScore = { ok: 0, n: 0 };
    trainerFeedback = null;
    challengeQueue = [];
    challengeIndex = 0;
    if (mode === "challenge") {
      const modes = ["gender", "aspect", "number", "verb", "aorist", "time", "alpha", "translate", "prep", "conditional"];
      challengeQueue = shuffle(modes.concat(modes)).slice(0, 10).map((m) => nextTrainerQuestion(m));
      trainerQ = challengeQueue[0];
      return;
    }
    if (mode === "write") {
      trainerQ = null;
      return;
    }
    trainerQ = nextTrainerQuestion(mode);
  }

  function normalizeGreek(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ς/g, "σ")
      .replace(/[;？?!.…,·'’"“”]/g, "")
      .replace(/[^a-zα-ωίϊΐύϋΰέάόήώ\s]/gi, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function nextTrainerQuestion(mode) {
    if (mode === "alpha") {
      const item = TRAINERS.alphabet[Math.floor(Math.random() * TRAINERS.alphabet.length)];
      const wrong = shuffle(TRAINERS.alphabet.filter((x) => x.name !== item.name)).slice(0, 3).map((x) => x.name);
      return {
        kind: "alpha",
        prompt: item.ch,
        sub: "Harfin adı?",
        answer: item.name,
        options: shuffle([item.name, ...wrong]),
        speak: item.ch.split(" ")[0],
        input: false
      };
    }
    if (mode === "gender") {
      const item = TRAINERS.gender[Math.floor(Math.random() * TRAINERS.gender.length)];
      return {
        kind: "gender",
        prompt: item.noun,
        sub: `${item.tr} — doğru madde?`,
        answer: item.art,
        options: shuffle(["ο", "η", "το"]),
        speak: item.art + " " + item.noun,
        input: false
      };
    }
    if (mode === "aspect") {
      const item = TRAINERS.aspect[Math.floor(Math.random() * TRAINERS.aspect.length)];
      return {
        kind: "aspect",
        prompt: item.tr,
        sub: "Aorist mi, imperfect mi?",
        answer: item.answer,
        options: ["aorist", "imperfect"],
        hint: `aorist: ${item.aorist} · imperfect: ${item.imperfect}`,
        speak: item.answer === "aorist" ? item.aorist : item.imperfect,
        input: false
      };
    }
    if (mode === "number") {
      const item = TRAINERS.numbers[Math.floor(Math.random() * TRAINERS.numbers.length)];
      const wrong = shuffle(TRAINERS.numbers.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "number",
        prompt: String(item.n),
        sub: "Yunancası?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        speak: item.el,
        input: false
      };
    }
    if (mode === "time") {
      const item = TRAINERS.time[Math.floor(Math.random() * TRAINERS.time.length)];
      const wrong = shuffle(TRAINERS.time.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "time",
        prompt: item.tr,
        sub: "Yunanca saat ifadesi?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        speak: item.el,
        input: false
      };
    }
    if (mode === "aorist") {
      const item = TRAINERS.aorist[Math.floor(Math.random() * TRAINERS.aorist.length)];
      const wrong = shuffle(TRAINERS.aorist.filter((x) => x.aor !== item.aor)).slice(0, 3).map((x) => x.aor);
      return {
        kind: "aorist",
        prompt: `${item.base} (${item.tr})`,
        sub: "Aorist (εγώ) formu?",
        answer: item.aor,
        options: shuffle([item.aor, ...wrong]),
        speak: item.aor,
        input: false
      };
    }
    if (mode === "translate") {
      const item = TRAINERS.translate[Math.floor(Math.random() * TRAINERS.translate.length)];
      return {
        kind: "translate",
        prompt: item.tr,
        sub: "Yunancaya çevir (yaklaşık yazım kabul)",
        answer: item.el,
        options: null,
        speak: item.el,
        input: true
      };
    }
    if (mode === "prep") {
      const item = TRAINERS.prep[Math.floor(Math.random() * TRAINERS.prep.length)];
      return {
        kind: "prep",
        prompt: item.tr,
        sub: item.gap,
        answer: item.options[item.a],
        options: item.options,
        hint: item.tip,
        speak: item.options[item.a],
        input: false
      };
    }
    if (mode === "conditional") {
      const item = TRAINERS.conditional[Math.floor(Math.random() * TRAINERS.conditional.length)];
      const wrong = shuffle(TRAINERS.conditional.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "conditional",
        prompt: item.tr,
        sub: "Doğru Yunanca karşılık?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "dictation") {
      const phrase = TRAINERS.dictation[Math.floor(Math.random() * TRAINERS.dictation.length)];
      return {
        kind: "dictation",
        prompt: "Dinle ve yaz",
        sub: "Duyduğun Yunanca cümleyi yaz (aksan şart değil)",
        answer: phrase,
        options: null,
        speak: phrase,
        input: true,
        autoSpeak: true
      };
    }
    const verb = TRAINERS.verbs[Math.floor(Math.random() * TRAINERS.verbs.length)];
    const form = verb.forms[Math.floor(Math.random() * verb.forms.length)];
    const pool = TRAINERS.verbs.flatMap((v) => v.forms.map((f) => f.f));
    const wrong = shuffle(pool.filter((f) => f !== form.f)).slice(0, 3);
    return {
      kind: "verb",
      prompt: `${verb.infinitive} (${verb.gloss})`,
      sub: `${form.p} → ?`,
      answer: form.f,
      options: shuffle([form.f, ...wrong]),
      speak: form.f,
      input: false
    };
  }

  const TRAINER_TITLES = {
    alpha: "Alfabe",
    verb: "Fiil çekimi",
    gender: "Madde (ο/η/το)",
    aspect: "Aorist / Imperfect",
    number: "Sayılar",
    dictation: "Dikte",
    time: "Saatler",
    aorist: "Düzensiz aorist",
    translate: "TR → EL",
    prep: "Edatlar",
    conditional: "Koşul (αν)",
    write: "Yazma",
    challenge: "Günlük challenge"
  };

  function renderTrainer() {
    if (trainerMode === "write") return renderWritingStudio();

    if (trainerMode === "challenge" && challengeIndex >= challengeQueue.length) {
      Progress.bumpTrainer("challenge");
      Progress.winChallenge();
      const w = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card">
        <p class="brand-mark">Challenge</p>
        <h1>${trainerScore.ok}/10</h1>
        <p class="lede">${trainerScore.ok >= 7 ? "Güçlü tur. Devam." : "Zayıf alanlara dön: Kart + antrenman."}</p>
        <button class="btn btn-primary" id="train-exit">Bugün’e dön</button>
        <button class="btn btn-ghost" id="again">Tekrar</button>
      </div></div>`);
      w.querySelector("#train-exit").onclick = () => {
        trainerMode = null;
        view = "today";
        render();
      };
      w.querySelector("#again").onclick = () => {
        startTrainer("challenge");
        render();
      };
      return w;
    }

    if (!trainerQ) trainerQ = nextTrainerQuestion(trainerMode === "challenge" ? "verb" : trainerMode);
    const title =
      trainerMode === "challenge"
        ? `Challenge ${challengeIndex + 1}/10`
        : TRAINER_TITLES[trainerMode] || "Antrenman";
    const wrap = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card diag-card">
      <p class="eyebrow">${escapeHtml(title)} · ${trainerScore.ok}/${trainerScore.n}</p>
      <h1 class="diag-q ${trainerQ.kind === "number" || trainerQ.kind === "aspect" || trainerQ.kind === "translate" || trainerQ.kind === "time" ? "" : "greek-line"}">${escapeHtml(trainerQ.prompt)}</h1>
      <p class="lede center-soft">${escapeHtml(trainerQ.sub)}</p>
      ${trainerQ.hint && trainerFeedback ? `<p class="meta center-soft">${escapeHtml(trainerQ.hint)}</p>` : ""}
      <button type="button" class="btn btn-ghost" id="say-q">♪ Dinle</button>
      <div class="diag-opts" id="opts"></div>
      ${trainerFeedback ? `<p class="feedback ${trainerFeedback.ok ? "ok" : "bad"}">${escapeHtml(trainerFeedback.msg)}</p><button class="btn btn-primary" id="next">Sonraki</button>` : ""}
      <button class="btn btn-ghost" id="train-exit" style="width:100%;margin-top:10px">Çık</button>
    </div></div>`);

    wrap.querySelector("#say-q").addEventListener("click", () => speakGreek(trainerQ.speak || trainerQ.prompt));
    if (trainerQ.autoSpeak && !trainerFeedback) {
      setTimeout(() => speakGreek(trainerQ.speak), 250);
    }

    const finish = (ok, msg) => {
      trainerScore.n++;
      if (ok) trainerScore.ok++;
      if (trainerMode !== "challenge") Progress.bumpTrainer(trainerMode);
      else Progress.bumpTrainer(trainerQ.kind);
      Progress.refreshBadges();
      trainerFeedback = { ok, msg };
      render();
    };

    if (!trainerFeedback) {
      if (trainerQ.input) {
        const form = el(`<form class="dict-form"><input name="ans" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Yunanca yaz…" required /><button class="btn btn-primary" type="submit">Kontrol</button></form>`);
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const val = new FormData(e.target).get("ans");
          const ok = normalizeGreek(val) === normalizeGreek(trainerQ.answer);
          finish(ok, ok ? "Doğru." : `Yanlış. Doğru: ${trainerQ.answer}`);
        });
        wrap.querySelector("#opts").appendChild(form);
      } else {
        trainerQ.options.forEach((opt) => {
          const label = opt === "aorist" ? "Aorist (tek olay)" : opt === "imperfect" ? "Imperfect (süre/alışkanlık)" : opt;
          const b = el(`<button type="button" class="btn diag-opt">${escapeHtml(label)}</button>`);
          b.addEventListener("click", () => {
            const ok = opt === trainerQ.answer;
            finish(ok, ok ? "Doğru." : `Yanlış. Doğru: ${trainerQ.answer}${trainerQ.hint ? " — " + trainerQ.hint : ""}`);
          });
          wrap.querySelector("#opts").appendChild(b);
        });
      }
    }

    wrap.querySelector("#next")?.addEventListener("click", () => {
      trainerFeedback = null;
      if (trainerMode === "challenge") {
        challengeIndex++;
        trainerQ = challengeQueue[challengeIndex] || null;
      } else {
        trainerQ = nextTrainerQuestion(trainerMode);
      }
      render();
    });
    wrap.querySelector("#train-exit").addEventListener("click", () => {
      trainerMode = null;
      trainerQ = null;
      trainerFeedback = null;
      challengeQueue = [];
      view = "today";
      render();
    });
    return wrap;
  }

  function renderWritingStudio() {
    const state = Progress.load();
    const items = TRAINERS.writing;
    const wrap = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card wide-card">
      <p class="brand-mark">Yazma stüdyosu</p>
      <p class="lede">Prompt seç, süre tut, checklist’i işaretle. Metni defterine yaz; burada üretim disiplini kurulur.</p>
      <ul class="write-list" id="write-list"></ul>
      <button class="btn btn-ghost" id="train-exit" style="width:100%;margin-top:10px">Çık</button>
    </div></div>`);
    const list = wrap.querySelector("#write-list");
    items.forEach((w) => {
      const done = !!(state.writeDone || {})[w.id];
      const li = el(`<li class="write-item">
        <div>
          <strong>${escapeHtml(w.title)}</strong>
          <p>${escapeHtml(w.prompt)}</p>
          <ul class="check-mini">${w.checklist.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul>
        </div>
        <button type="button" class="btn ${done ? "btn-ghost" : "btn-primary"}" data-w="${w.id}">${done ? "Tekrar" : "~" + w.minutes + " dk · Bitir"}</button>
      </li>`);
      li.querySelector("button").addEventListener("click", () => {
        Progress.markWrite(w.id);
        Progress.logStudyMinutes(w.minutes);
        alert("İşaretlendi. Metni kendin yazmış olmalısın — dürüstlük şart.");
        render();
      });
      list.appendChild(li);
    });
    wrap.querySelector("#train-exit").addEventListener("click", () => {
      trainerMode = null;
      view = "today";
      render();
    });
    return wrap;
  }

  function trainerButtons(ts) {
    return `
      <button type="button" class="btn btn-primary challenge-btn" data-train="challenge">Günlük challenge (10 soru)</button>
      <div class="quick-train multi">
        <button type="button" class="btn btn-ghost sand-btn" data-train="alpha">Alfabe (${ts.alpha || 0})</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="verb">Fiil (${ts.verb || 0})</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="gender">Madde (${ts.gender || 0})</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="aspect">Aspect (${ts.aspect || 0})</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="aorist">Aorist (${ts.aorist || 0})</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="prep">Edat (${ts.prep || 0})</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="conditional">αν (${ts.conditional || 0})</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="number">Sayı (${ts.number || 0})</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="time">Saat (${ts.time || 0})</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="dictation">Dikte (${ts.dictation || 0})</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="translate">TR→EL (${ts.translate || 0})</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="write">Yazma</button>
      </div>`;
  }

  function renderCards(state) {
    const deckIds = Object.keys(CONTENT.decks);
    const ts = state.trainerStats || {};
    if (!cardDeckId) {
      const section = el(`<section class="view cards-view">
        <div class="view-intro">
          <p class="eyebrow">Kelime</p>
          <h1>Kartlar</h1>
          <p class="lede">Leitner kutuları: bilmediğin kartlar sık döner. Önce Yunanca gör, çevir, işaretle.</p>
        </div>
        ${trainerButtons(ts)}
        <ul class="deck-grid" id="deck-grid"></ul>
        <p class="meta sand-meta">Toplam kart tekrarı: ${state.cardsReviewed || 0}</p>
      </section>`);
      const grid = section.querySelector("#deck-grid");
      deckIds.forEach((id) => {
        const n = CONTENT.decks[id].length;
        const label =
          id === "yds"
            ? "YDS"
            : id === "food"
              ? "Yemek"
              : id === "travel"
                ? "Seyahat"
                : id === "exam"
                  ? "Sınav"
                  : id.toUpperCase();
        const btn = el(`<li><button class="deck-btn" data-deck="${id}"><span class="deck-code">${label}</span><span>${n} kart</span></button></li>`);
        btn.querySelector("button").addEventListener("click", () => {
          startDeck(id);
          render();
        });
        grid.appendChild(btn);
      });
      section.querySelectorAll("[data-train]").forEach((btn) => {
        btn.addEventListener("click", () => {
          startTrainer(btn.dataset.train);
          render();
        });
      });
      return section;
    }

    if (cardIndex >= cardQueue.length) {
      const section = el(`<section class="view cards-view">
        <div class="view-intro">
          <p class="eyebrow">Bitti</p>
          <h1>Tur tamam</h1>
          <p class="lede">${escapeHtml(cardDeckId.toUpperCase())} destesi gözden geçirildi.</p>
        </div>
        <button class="btn btn-primary" id="again-deck">Aynı desteyi tekrar</button>
        <button class="btn btn-ghost" id="back-decks">Destelere dön</button>
      </section>`);
      section.querySelector("#again-deck").addEventListener("click", () => {
        startDeck(cardDeckId);
        render();
      });
      section.querySelector("#back-decks").addEventListener("click", () => {
        cardDeckId = null;
        render();
      });
      return section;
    }

    const card = cardQueue[cardIndex];
    const section = el(`<section class="view cards-view">
      <button class="back" id="back-decks">← Desteler</button>
      <p class="eyebrow sand-meta">${escapeHtml(cardDeckId.toUpperCase())} · ${cardIndex + 1}/${cardQueue.length} · kutu ${card.box}</p>
      <button type="button" class="flash-card ${cardFlipped ? "flipped" : ""}" id="flash">
        <span class="flash-front">${escapeHtml(card.el)}</span>
        <span class="flash-back">
          <strong>${escapeHtml(card.tr)}</strong>
          ${card.tip ? `<small>${escapeHtml(card.tip)}</small>` : ""}
        </span>
      </button>
      <div class="speak-row">
        <button type="button" class="btn btn-ghost" id="say-el">♪ Dinle</button>
      </div>
      <p class="meta sand-meta center">${cardFlipped ? "Bildin mi?" : "Çevirmek için dokun"}</p>
      <div class="card-actions ${cardFlipped ? "" : "hidden"}">
        <button class="btn btn-ghost" id="card-no">Tekrar</button>
        <button class="btn btn-primary" id="card-yes">Biliyorum</button>
      </div>
    </section>`);

    section.querySelector("#flash").addEventListener("click", () => {
      cardFlipped = !cardFlipped;
      render();
    });
    section.querySelector("#say-el")?.addEventListener("click", (e) => {
      e.stopPropagation();
      speakGreek(card.el);
    });
    section.querySelector("#back-decks").addEventListener("click", () => {
      cardDeckId = null;
      render();
    });
    section.querySelector("#card-yes")?.addEventListener("click", () => {
      Progress.reviewCard(cardDeckId, card.el, true);
      cardIndex++;
      cardFlipped = false;
      render();
    });
    section.querySelector("#card-no")?.addEventListener("click", () => {
      Progress.reviewCard(cardDeckId, card.el, false);
      cardIndex++;
      cardFlipped = false;
      render();
    });
    return section;
  }

  function startDrill(mode) {
    drillMode = mode;
    drillIndex = 0;
    drillFeedback = null;
    if (speakTimer) {
      clearInterval(speakTimer);
      speakTimer = null;
    }
    speakLeft = 0;
    speakPromptId = null;
  }

  function renderDrill(state) {
    if (drillMode === "cloze") return renderClozeDrill(state);
    if (drillMode === "reading") return renderReadingDrill(state);
    if (drillMode === "speak") return renderSpeakDrill(state);
    drillMode = null;
    return renderYds();
  }

  function renderClozeDrill(state) {
    const items = DRILLS.cloze;
    if (drillIndex >= items.length) {
      const ds = state.drillStats || {};
      const w = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card">
        <p class="brand-mark">Cloze bitti</p>
        <h1>${ds.clozeCorrect || 0}/${ds.clozeTotal || 0}</h1>
        <p class="lede">Skor localStorage’da birikir.</p>
        <button class="btn btn-primary" id="drill-home">YDS’ye dön</button>
        <button class="btn btn-ghost" id="drill-retry">Tekrar</button>
      </div></div>`);
      w.querySelector("#drill-home").onclick = () => {
        drillMode = null;
        view = "yds";
        render();
      };
      w.querySelector("#drill-retry").onclick = () => {
        startDrill("cloze");
        render();
      };
      return w;
    }
    const item = items[drillIndex];
    const wrap = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card diag-card">
      <p class="eyebrow">Cloze ${drillIndex + 1}/${items.length}</p>
      <h1 class="diag-q greek-line">${escapeHtml(item.text)}</h1>
      <div class="diag-opts" id="opts"></div>
      ${drillFeedback ? `<p class="feedback ${drillFeedback.ok ? "ok" : "bad"}">${escapeHtml(drillFeedback.msg)}</p><button class="btn btn-primary" id="next">Devam</button>` : ""}
    </div></div>`);
    const opts = wrap.querySelector("#opts");
    if (!drillFeedback) {
      item.options.forEach((opt, i) => {
        const b = el(`<button type="button" class="btn diag-opt">${escapeHtml(opt)}</button>`);
        b.addEventListener("click", () => {
          const ok = i === item.a;
          Progress.recordDrill("cloze", ok);
          drillFeedback = { ok, msg: ok ? "Doğru. " + item.why : "Yanlış. " + item.why };
          render();
        });
        opts.appendChild(b);
      });
    }
    wrap.querySelector("#next")?.addEventListener("click", () => {
      drillFeedback = null;
      drillIndex++;
      render();
    });
    return wrap;
  }

  function renderReadingDrill(state) {
    const items = DRILLS.reading;
    if (drillIndex >= items.length) {
      const ds = state.drillStats || {};
      const w = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card">
        <p class="brand-mark">Okuma bitti</p>
        <h1>${ds.readingCorrect || 0}/${ds.readingTotal || 0}</h1>
        <button class="btn btn-primary" id="drill-home">YDS’ye dön</button>
        <button class="btn btn-ghost" id="drill-retry">Tekrar</button>
      </div></div>`);
      w.querySelector("#drill-home").onclick = () => { drillMode = null; view = "yds"; render(); };
      w.querySelector("#drill-retry").onclick = () => { startDrill("reading"); render(); };
      return w;
    }
    const item = items[drillIndex];
    const wrap = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card diag-card wide-card">
      <p class="eyebrow">Okuma ${drillIndex + 1}/${items.length}</p>
      <p class="passage">${escapeHtml(item.passage)}</p>
      <h2 class="diag-q">${escapeHtml(item.q)}</h2>
      <div class="diag-opts" id="opts"></div>
      ${drillFeedback ? `<p class="feedback ${drillFeedback.ok ? "ok" : "bad"}">${drillFeedback.ok ? "Doğru." : "Yanlış — ana fikre dön."}</p><button class="btn btn-primary" id="next">Devam</button>` : ""}
    </div></div>`);
    if (!drillFeedback) {
      item.options.forEach((opt, i) => {
        const b = el(`<button type="button" class="btn diag-opt">${escapeHtml(opt)}</button>`);
        b.addEventListener("click", () => {
          const ok = i === item.a;
          Progress.recordDrill("reading", ok);
          drillFeedback = { ok };
          render();
        });
        wrap.querySelector("#opts").appendChild(b);
      });
    }
    wrap.querySelector("#next")?.addEventListener("click", () => {
      drillFeedback = null;
      drillIndex++;
      render();
    });
    return wrap;
  }

  function renderSpeakDrill(state) {
    const items = DRILLS.speak;
    const item = items[Math.min(drillIndex, items.length - 1)];
    const done = !!(state.speakDone || {})[item.id];
    const wrap = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card diag-card">
      <p class="eyebrow">Konuşma ${drillIndex + 1}/${items.length} · ${escapeHtml(item.level.toUpperCase())}</p>
      <h1 class="diag-q">${escapeHtml(item.prompt)}</h1>
      <p class="timer-display" id="timer">${speakLeft > 0 ? speakLeft + " sn" : item.seconds + " sn hazır"}</p>
      <div class="card-actions">
        <button class="btn btn-ghost" id="speak-start">${speakLeft > 0 ? "Durdur" : "Kronometre"}</button>
        <button class="btn btn-primary" id="speak-done">${done ? "Tamamlandı ✓" : "Bitirdim"}</button>
      </div>
      <button class="btn btn-ghost" id="speak-next" style="width:100%;margin-top:8px">Sonraki prompt</button>
      <button class="btn btn-ghost" id="drill-home" style="width:100%;margin-top:8px">YDS’ye dön</button>
    </div></div>`);

    wrap.querySelector("#speak-start").addEventListener("click", () => {
      if (speakTimer) {
        clearInterval(speakTimer);
        speakTimer = null;
        speakLeft = 0;
        render();
        return;
      }
      speakLeft = item.seconds;
      speakPromptId = item.id;
      speakTimer = setInterval(() => {
        speakLeft--;
        const t = document.getElementById("timer");
        if (t) t.textContent = speakLeft > 0 ? speakLeft + " sn" : "Süre doldu";
        if (speakLeft <= 0) {
          clearInterval(speakTimer);
          speakTimer = null;
        }
      }, 1000);
      render();
    });
    wrap.querySelector("#speak-done").addEventListener("click", () => {
      Progress.markSpeak(item.id);
      if (speakTimer) { clearInterval(speakTimer); speakTimer = null; }
      speakLeft = 0;
      render();
    });
    wrap.querySelector("#speak-next").addEventListener("click", () => {
      if (speakTimer) { clearInterval(speakTimer); speakTimer = null; }
      speakLeft = 0;
      drillIndex = (drillIndex + 1) % items.length;
      render();
    });
    wrap.querySelector("#drill-home").addEventListener("click", () => {
      if (speakTimer) { clearInterval(speakTimer); speakTimer = null; }
      drillMode = null;
      view = "yds";
      render();
    });
    return wrap;
  }

  function renderYds() {
    const state = Progress.load();
    const ds = state.drillStats || {};
    const ydsTasks = [];
    CURRICULUM.levels.forEach((level) => {
      level.units.forEach((unit) => {
        unit.tasks.forEach((task) => {
          if (task.type === "yds" || level.id === "c2plus" || (level.id === "b2" && unit.id.includes("u3")) || (level.id === "c1" && unit.id.includes("u3"))) {
            ydsTasks.push({ level, unit, task });
          }
        });
      });
    });

    const section = el(`<section class="view yds-view">
      <div class="view-intro">
        <p class="eyebrow">Sınav hattı</p>
        <h1>YDS Yunanca</h1>
        <p class="lede">Cloze ${ds.clozeCorrect || 0}/${ds.clozeTotal || 0} · Okuma ${ds.readingCorrect || 0}/${ds.readingTotal || 0}</p>
      </div>
      <div class="drill-launch">
        <button class="btn btn-primary" data-drill="cloze">Cloze seti</button>
        <button class="btn btn-ghost sand-btn" data-drill="reading">Okuma seti</button>
        <button class="btn btn-ghost sand-btn" data-drill="speak">Konuşma kronometre</button>
      </div>
      <div class="yds-grid">
        <article class="info-panel">
          <h3>Strateji</h3>
          <ol>
            <li>Önce paragrafın ana fikrini bul, sonra soruya bak.</li>
            <li>Cloze’da önce dilbilgisi ipucu, sonra kolokasyon.</li>
            <li>Her yanlış için hata günlüğü tut — aynı tip tekrar etmesin.</li>
            <li>Haftada en az bir zamanlı set çöz.</li>
            <li>Deneme sonrası aynı gün otopsi yap.</li>
          </ol>
        </article>
        <article class="info-panel">
          <h3>Kaynak önerisi</h3>
          <ul class="plain">${CURRICULUM.resources.map((r) => `<li><strong>${escapeHtml(r.title)}</strong> — ${escapeHtml(r.note)}</li>`).join("")}</ul>
        </article>
      </div>
      <article class="mini-action yds-vocab">
        <div>
          <strong>YDS kelime destesi</strong>
          <p>Akademik kalıplar ve sık kelimeler</p>
        </div>
        <button class="btn btn-ghost" id="yds-cards">Kart aç</button>
      </article>
      <h3 class="section-title">YDS görevleri</h3>
      <ul class="task-list" id="yds-list"></ul>
    </section>`);

    const list = section.querySelector("#yds-list");
    ydsTasks.forEach(({ level, unit, task }) => list.appendChild(taskRow(level, unit, task)));
    section.querySelector("#yds-cards").addEventListener("click", () => {
      view = "cards";
      startDeck("yds");
      render();
    });
    section.querySelectorAll("[data-drill]").forEach((btn) => {
      btn.addEventListener("click", () => {
        startDrill(btn.dataset.drill);
        render();
      });
    });
    return section;
  }

  function renderProgress(state) {
    const stats = Progress.overallStats();
    const hours = (stats.totalMinutes / 60).toFixed(1);
    const diag = state.lastDiagnostic;
    const journal = state.journal || [];
    const section = el(`<section class="view progress-view">
      <div class="view-intro">
        <p class="eyebrow">İlerleme</p>
        <h1>Senin haritan</h1>
        <p class="lede">Başlangıç: ${state.startDate || "—"} · Seri: ${stats.streak} · Kart: ${state.cardsReviewed || 0}</p>
      </div>
      <div class="stat-grid">
        <div class="stat"><span class="stat-n">${stats.pct}%</span><span class="stat-l">Genel tamamlanma</span></div>
        <div class="stat"><span class="stat-n">${stats.done}</span><span class="stat-l">Bitmiş görev</span></div>
        <div class="stat"><span class="stat-n">${hours}</span><span class="stat-l">Saat (işaretli)</span></div>
        <div class="stat"><span class="stat-n">${stats.streak}</span><span class="stat-l">Günlük seri</span></div>
      </div>
      ${
        diag
          ? `<article class="info-panel diag-summary">
              <h3>Son teşhis</h3>
              <p>${diag.correct}/${diag.total} doğru · öneri: <strong>${escapeHtml((CURRICULUM.levels.find((l) => l.id === diag.levelId) || {}).code || diag.levelId)}</strong></p>
            </article>`
          : ""
      }
      <button class="btn btn-ghost sand-btn" id="rerun-diag">Teşhis sınavını yeniden çalıştır</button>
      <article class="info-panel journal-panel">
        <h3>Rozetler</h3>
        <ul class="badge-grid" id="badge-grid"></ul>
      </article>
      <article class="info-panel journal-panel">
        <h3>Yedekle / Geri yükle</h3>
        <p class="hint-inline">İlerlemeyi JSON olarak indir veya başka cihazdan yükle.</p>
        <div class="backup-row">
          <button type="button" class="btn btn-primary" id="export-btn">Dışa aktar</button>
          <label class="btn btn-ghost file-label">İçe aktar<input type="file" id="import-file" accept="application/json,.json" hidden /></label>
        </div>
      </article>
      <article class="info-panel journal-panel">
        <h3>Hata günlüğü</h3>
        <p class="hint-inline">Yanlış soru, karışan yapı, unutulan kelime — buraya yaz.</p>
        <form id="journal-form" class="journal-form">
          <select name="tag">
            <option value="yds">YDS</option>
            <option value="grammar">Dilbilgisi</option>
            <option value="vocab">Kelime</option>
            <option value="genel">Genel</option>
          </select>
          <input name="text" type="text" maxlength="500" placeholder="Örn. αν + aorist karıştırdım" required />
          <button type="submit" class="btn btn-primary">Ekle</button>
        </form>
        <ul class="journal-list" id="journal-list"></ul>
      </article>
      <h3 class="section-title">Seviye kırılımı</h3>
      <ul class="break-list" id="break-list"></ul>
      <div class="danger-zone">
        <button class="btn btn-ghost" id="reset-btn">Tüm ilerlemeyi sıfırla</button>
      </div>
    </section>`);

    const jlist = section.querySelector("#journal-list");
    const badgeGrid = section.querySelector("#badge-grid");
    Progress.refreshBadges();
    const unlocked = Progress.load().unlockedBadges || {};
    (TRAINERS.badges || []).forEach((b) => {
      const on = !!unlocked[b.id];
      badgeGrid.appendChild(
        el(`<li class="${on ? "on" : ""}"><strong>${escapeHtml(b.title)}</strong><span>${escapeHtml(b.desc)}</span></li>`)
      );
    });
    journal.slice(0, 20).forEach((j) => {
      const li = el(`<li><span class="j-tag">${escapeHtml(j.tag)}</span><span class="j-text">${escapeHtml(j.text)}</span><button type="button" data-del="${j.id}" aria-label="Sil">×</button></li>`);
      li.querySelector("button").addEventListener("click", () => {
        Progress.removeJournal(j.id);
        render();
      });
      jlist.appendChild(li);
    });

    section.querySelector("#journal-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      Progress.addJournal({ tag: fd.get("tag"), text: fd.get("text") });
      render();
    });

    const breakList = section.querySelector("#break-list");
    CURRICULUM.levels.forEach((level) => {
      const ls = Progress.levelStats(level);
      breakList.appendChild(
        el(`<li>
          <div class="break-label"><span>${escapeHtml(level.code)}</span><span>${ls.done}/${ls.total}</span></div>
          <div class="progress-line"><span style="width:${ls.pct}%;background:${level.color}"></span></div>
        </li>`)
      );
    });

    section.querySelector("#rerun-diag").addEventListener("click", () => {
      diagIndex = 0;
      diagAnswers = [];
      diagActive = true;
      render();
    });

    section.querySelector("#export-btn")?.addEventListener("click", () => {
      const blob = new Blob([Progress.exportData()], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `odigos-backup-${Progress.todayStr()}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    });

    section.querySelector("#import-file")?.addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        Progress.importData(text);
        alert("İlerleme yüklendi.");
        render();
      } catch {
        alert("Dosya okunamadı.");
      }
    });

    section.querySelector("#reset-btn").addEventListener("click", () => {
      if (confirm("Tüm ilerleme silinecek. Emin misin?")) {
        Progress.resetAll();
        view = "today";
        render();
      }
    });
    return section;
  }

  function init() {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    Progress.refreshBadges();
    render();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => App.init());
