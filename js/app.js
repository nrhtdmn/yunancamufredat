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
  let focusTimer = null;
  let focusLeft = 0;
  let matchPairs = [];
  let matchSelected = null;
  let matchLocked = false;
  let ttsRate = 0.9;

  function attachGreekKeyboard(form, inputName) {
    const input = form.querySelector(`[name="${inputName}"]`);
    if (!input) return;
    const rows = [
      ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ"],
      ["ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π"],
      ["ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"],
      ["ά", "έ", "ή", "ί", "ό", "ύ", "ώ", "ς"],
      [" ", "⌫", "·", ";", "!", "?", ",", "."]
    ];
    const board = el(`<div class="gk-board" aria-label="Yunanca klavye"></div>`);
    rows.forEach((row) => {
      const r = el(`<div class="gk-row"></div>`);
      row.forEach((ch) => {
        const b = el(`<button type="button" class="gk-key ${ch === " " ? "wide" : ""}">${ch === " " ? "boşluk" : escapeHtml(ch)}</button>`);
        b.addEventListener("click", () => {
          if (ch === "⌫") {
            input.value = input.value.slice(0, -1);
          } else {
            input.value += ch;
          }
          input.focus();
        });
        r.appendChild(b);
      });
      board.appendChild(r);
    });
    form.appendChild(board);
  }

  function speakGreek(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "el-GR";
    u.rate = ttsRate || 0.9;
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
          <label>
            <span>Günlük dakika hedefi</span>
            <select name="goal">
              <option value="25">25 dk</option>
              <option value="45" selected>45 dk</option>
              <option value="60">60 dk</option>
              <option value="90">90 dk</option>
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
        dailyMode: fd.get("mode"),
        dailyGoalMin: fd.get("goal")
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
    const todayMins = (state.studyLog || {})[Progress.todayStr()] || 0;
    const goal = state.dailyGoalMin || 45;
    const goalPct = Math.min(100, Math.round((todayMins / goal) * 100));
    const phrase = EXTRAS4.phrases[new Date().getDate() % EXTRAS4.phrases.length];
    const doneToday = plan.items.filter(({ task }) => Progress.isDone(task.id)).length;
    const section = el(`<section class="view today-view today-slim">
      <div class="hero-today">
        <p class="eyebrow">${escapeHtml(level.code)} · ${escapeHtml(plan.label)}</p>
        <h1>Merhaba${name}</h1>
        <div class="goal-box">
          <div class="goal-top"><span>${todayMins}/${goal} dk</span><span>${doneToday}/${plan.items.length} görev</span></div>
          <div class="progress-line lg"><span style="width:${goalPct}%"></span></div>
        </div>
      </div>

      <article class="phrase-slim" id="phrase-slim">
        <p class="greek-line">${escapeHtml(phrase.el)}</p>
        <p class="meta">${escapeHtml(phrase.tr)}</p>
      </article>

      ${
        next
          ? `<article class="focus-card">
              <p class="eyebrow">Şimdi yap</p>
              <h2>${escapeHtml(next.task.title)}</h2>
              <p>${escapeHtml(next.task.detail)}</p>
              <div class="focus-meta">
                ${typeBadge(next.task.type)}
                <span class="meta">~${next.task.minutes} dk · ${escapeHtml(next.unit.title)}</span>
              </div>
              <button class="btn btn-primary" data-do="${next.task.id}" data-min="${next.task.minutes}">Tamamladım</button>
            </article>`
          : `<article class="focus-card done"><h2>Bugün bitti</h2><p>Plan tamam. Kart veya hızlı tur ile pekiştir.</p></article>`
      }

      <div class="today-actions">
        <button type="button" class="btn btn-primary" id="go-cards">Kartlar</button>
        <button type="button" class="btn btn-ghost" data-train="flash5">Hızlı 5</button>
        <button type="button" class="btn btn-ghost" data-train="challenge">Challenge</button>
      </div>

      <details class="plan-fold">
        <summary>Bugünün planı (${doneToday}/${plan.items.length})</summary>
        <div class="section-head plan-mode">
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
      </details>
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

    section.querySelector("#phrase-slim")?.addEventListener("click", () => {
      speakGreek(phrase.el);
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
      const modes = ["gender", "aspect", "number", "verb", "aorist", "time", "alpha", "translate", "prep", "conditional", "pronoun", "particle", "compare", "subjunctive", "collocation", "imperative", "perfect", "months", "genitive", "opposite", "ordinal", "direction", "adjective", "question", "connector", "frequency", "emotion"];
      challengeQueue = shuffle(modes.concat(modes)).slice(0, 10).map((m) => nextTrainerQuestion(m));
      trainerQ = challengeQueue[0];
      return;
    }
    if (mode === "write") {
      trainerQ = null;
      return;
    }
    if (mode === "dialogue" || mode === "listen") {
      trainerQ = null;
      return;
    }
    if (mode === "match") {
      startMatch();
      trainerQ = null;
      return;
    }
    if (mode === "exam") {
      challengeQueue = shuffle(EXTRAS2.examBank).slice(0, 20).map((item, i) => ({
        kind: "exam",
        prompt: item.q,
        sub: `Soru ${i + 1}/20 · ${item.kind}`,
        answer: item.options[item.a],
        options: item.options,
        speak: item.options[item.a],
        input: false,
        exam: true
      }));
      challengeIndex = 0;
      trainerQ = challengeQueue[0];
      trainerScore = { ok: 0, n: 0 };
      return;
    }
    if (mode === "flash5") {
      const modes = ["gender", "aorist", "number", "prep", "translate", "adjective", "weekdays", "polite", "particle", "opposite", "ordinal", "direction", "question", "connector", "emotion"];
      challengeQueue = shuffle(modes).slice(0, 5).map((m) => nextTrainerQuestion(m));
      challengeIndex = 0;
      trainerMode = "flash5";
      trainerQ = challengeQueue[0];
      trainerScore = { ok: 0, n: 0 };
      return;
    }
    if (mode === "speed10") {
      const modes = ["gender", "number", "aorist", "prep", "weekdays", "months", "opposite", "ordinal", "direction", "question", "connector", "frequency", "emotion", "body", "adjective", "polite"];
      challengeQueue = shuffle(modes.concat(modes)).slice(0, 10).map((m) => nextTrainerQuestion(m));
      challengeIndex = 0;
      trainerMode = "speed10";
      trainerQ = challengeQueue[0];
      trainerScore = { ok: 0, n: 0 };
      return;
    }
    if (mode === "scramble") {
      const item = EXTRAS2.scramble[Math.floor(Math.random() * EXTRAS2.scramble.length)];
      trainerQ = {
        kind: "scramble",
        prompt: item.tr,
        sub: "Kelimeleri doğru sıraya diz (dokunarak ekle)",
        answer: item.answer,
        pool: shuffle(item.words.slice()),
        built: [],
        options: null,
        speak: item.answer,
        input: false,
        scramble: true
      };
      return;
    }
    if (mode === "review") {
      const wrongs = Progress.load().wrongQueue || [];
      if (!wrongs.length) {
        trainerQ = { kind: "review", empty: true };
        return;
      }
      challengeQueue = shuffle(wrongs.slice());
      challengeIndex = 0;
      const w = challengeQueue[0];
      trainerQ = {
        kind: "review",
        prompt: w.prompt,
        sub: `(${w.kind}) Doğru cevabı yaz`,
        answer: w.answer,
        options: null,
        speak: w.answer,
        input: true,
        wrongId: w.id
      };
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
    if (mode === "pronoun") {
      const item = EXTRAS.pronouns[Math.floor(Math.random() * EXTRAS.pronouns.length)];
      return {
        kind: "pronoun",
        prompt: item.prompt,
        sub: "Doğru zamir cümlesi?",
        answer: item.answer,
        options: shuffle(item.options.slice()),
        speak: item.answer,
        input: false
      };
    }
    if (mode === "particle") {
      const item = EXTRAS.particles[Math.floor(Math.random() * EXTRAS.particles.length)];
      return {
        kind: "particle",
        prompt: item.tr,
        sub: "Doğru yapı?",
        answer: item.options[item.a],
        options: item.options,
        hint: item.tip,
        speak: item.options[item.a],
        input: false
      };
    }
    if (mode === "passive") {
      const item = EXTRAS.passive[Math.floor(Math.random() * EXTRAS.passive.length)];
      const wrong = shuffle(EXTRAS.passive.filter((x) => x.passive !== item.passive)).slice(0, 3).map((x) => x.passive);
      return {
        kind: "passive",
        prompt: item.active,
        sub: "Pasif / edilgen karşılık?",
        answer: item.passive,
        options: shuffle([item.passive, ...wrong]),
        speak: item.passive,
        input: false
      };
    }
    if (mode === "compare") {
      const item = TRAINERS.compare[Math.floor(Math.random() * TRAINERS.compare.length)];
      const wrong = shuffle(TRAINERS.compare.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "compare",
        prompt: item.tr,
        sub: "Yunanca karşılaştırma?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "subjunctive") {
      const item = TRAINERS.subjunctive[Math.floor(Math.random() * TRAINERS.subjunctive.length)];
      return {
        kind: "subjunctive",
        prompt: item.tr,
        sub: "να + hangi aspect?",
        answer: item.options[item.a],
        options: item.options,
        hint: item.tip,
        speak: item.options[item.a],
        input: false
      };
    }
    if (mode === "collocation") {
      const item = TRAINERS.collocations[Math.floor(Math.random() * TRAINERS.collocations.length)];
      const wrong = shuffle(TRAINERS.collocations.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "collocation",
        prompt: item.tr,
        sub: "Doğal kalıp?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "imperative") {
      const item = TRAINERS.imperative[Math.floor(Math.random() * TRAINERS.imperative.length)];
      const wrong = shuffle(TRAINERS.imperative.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "imperative",
        prompt: item.tr,
        sub: "Emir kipi?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "perfect") {
      const item = TRAINERS.perfect[Math.floor(Math.random() * TRAINERS.perfect.length)];
      const wrong = shuffle(TRAINERS.perfect.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "perfect",
        prompt: item.tr,
        sub: "Παρακείμενος?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "months") {
      const item = TRAINERS.months[Math.floor(Math.random() * TRAINERS.months.length)];
      const wrong = shuffle(TRAINERS.months.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "months",
        prompt: item.tr,
        sub: "Yunancası?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        speak: item.el,
        input: false
      };
    }
    if (mode === "weekdays") {
      const item = TRAINERS.weekdays[Math.floor(Math.random() * TRAINERS.weekdays.length)];
      const wrong = shuffle(TRAINERS.weekdays.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "weekdays",
        prompt: item.tr,
        sub: "Yunancası?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        speak: item.el,
        input: false
      };
    }
    if (mode === "genitive") {
      const item = TRAINERS.genitive[Math.floor(Math.random() * TRAINERS.genitive.length)];
      const wrong = shuffle(TRAINERS.genitive.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "genitive",
        prompt: item.tr,
        sub: "Genitif sahiplik?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "reflexive") {
      const item = EXTRAS2.reflexive[Math.floor(Math.random() * EXTRAS2.reflexive.length)];
      const wrong = shuffle(EXTRAS2.reflexive.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "reflexive",
        prompt: item.tr,
        sub: "Dönüşlü / orta çatı fiil?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "polite") {
      const item = EXTRAS2.polite[Math.floor(Math.random() * EXTRAS2.polite.length)];
      const wrong = shuffle(EXTRAS2.polite.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "polite",
        prompt: item.tr,
        sub: "Nazik ifade?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "adjective") {
      const item = EXTRAS2.adjectives[Math.floor(Math.random() * EXTRAS2.adjectives.length)];
      const wrong = shuffle(EXTRAS2.adjectives.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "adjective",
        prompt: item.tr,
        sub: "Sıfat + isim uyumu?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "bignum") {
      const item = EXTRAS2.bigNumbers[Math.floor(Math.random() * EXTRAS2.bigNumbers.length)];
      const wrong = shuffle(EXTRAS2.bigNumbers.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "bignum",
        prompt: String(item.n),
        sub: "Yunancası?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        speak: item.el,
        input: false
      };
    }
    if (mode === "opposite") {
      const item = EXTRAS3.opposites[Math.floor(Math.random() * EXTRAS3.opposites.length)];
      const askA = Math.random() < 0.5;
      const prompt = askA ? item.a : item.b;
      const answer = askA ? item.b : item.a;
      const wrong = shuffle(EXTRAS3.opposites.filter((x) => x.a !== item.a).map((x) => (askA ? x.b : x.a))).slice(0, 3);
      return {
        kind: "opposite",
        prompt,
        sub: `Zıt anlamlısı? (${item.tr})`,
        answer,
        options: shuffle([answer, ...wrong]),
        speak: answer,
        input: false
      };
    }
    if (mode === "fixerror") {
      const item = EXTRAS3.fixError[Math.floor(Math.random() * EXTRAS3.fixError.length)];
      const wrong = shuffle(EXTRAS3.fixError.filter((x) => x.good !== item.good)).slice(0, 3).map((x) => x.good);
      return {
        kind: "fixerror",
        prompt: item.bad,
        sub: "Doğru hali hangisi?",
        answer: item.good,
        options: shuffle([item.good, ...wrong]),
        hint: item.why,
        speak: item.good,
        input: false
      };
    }
    if (mode === "ordinal") {
      const item = EXTRAS3.ordinals[Math.floor(Math.random() * EXTRAS3.ordinals.length)];
      const wrong = shuffle(EXTRAS3.ordinals.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "ordinal",
        prompt: `${item.n} (${item.tr})`,
        sub: "Sıra sayısı Yunancası?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "direction") {
      const item = EXTRAS3.directions[Math.floor(Math.random() * EXTRAS3.directions.length)];
      const wrong = shuffle(EXTRAS3.directions.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "direction",
        prompt: item.tr,
        sub: "Yön / konum ifadesi?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "synonym") {
      const item = EXTRAS4.synonyms[Math.floor(Math.random() * EXTRAS4.synonyms.length)];
      const askA = Math.random() < 0.5;
      const prompt = askA ? item.a : item.b;
      const answer = askA ? item.b : item.a;
      const wrong = shuffle(EXTRAS4.synonyms.filter((x) => x.a !== item.a).map((x) => (askA ? x.b : x.a))).slice(0, 3);
      return {
        kind: "synonym",
        prompt,
        sub: `Eşanlamlı / yakın anlamlı? (${item.tr})`,
        answer,
        options: shuffle([answer, ...wrong]),
        speak: answer.split(" / ")[0],
        input: false
      };
    }
    if (mode === "question") {
      const item = EXTRAS4.questions[Math.floor(Math.random() * EXTRAS4.questions.length)];
      const wrong = shuffle(EXTRAS4.questions.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "question",
        prompt: item.tr,
        sub: "Soru sözcüğü?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0].replace(";", ""),
        input: false
      };
    }
    if (mode === "connector") {
      const item = EXTRAS4.connectors[Math.floor(Math.random() * EXTRAS4.connectors.length)];
      const wrong = shuffle(EXTRAS4.connectors.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "connector",
        prompt: item.tr,
        sub: "Bağlaç / söylem bağı?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "frequency") {
      const item = EXTRAS4.frequency[Math.floor(Math.random() * EXTRAS4.frequency.length)];
      const wrong = shuffle(EXTRAS4.frequency.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "frequency",
        prompt: item.tr,
        sub: "Sıklık ifadesi?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "emotion") {
      const item = EXTRAS4.emotions[Math.floor(Math.random() * EXTRAS4.emotions.length)];
      const wrong = shuffle(EXTRAS4.emotions.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "emotion",
        prompt: item.tr,
        sub: "Duygu sıfatı?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "body") {
      const item = EXTRAS4.body[Math.floor(Math.random() * EXTRAS4.body.length)];
      const wrong = shuffle(EXTRAS4.body.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "body",
        prompt: item.tr,
        sub: "Vücut bölümü?",
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
    pronoun: "Zamirler",
    particle: "θα / να / ας",
    passive: "Pasif",
    compare: "Karşılaştırma",
    subjunctive: "να aspect",
    collocation: "Kolokasyon",
    imperative: "Emir kipi",
    perfect: "Perfect",
    months: "Ay / mevsim",
    weekdays: "Haftanın günleri",
    genitive: "Genitif",
    reflexive: "Dönüşlü fiil",
    polite: "Nazik üslup",
    adjective: "Sıfat uyumu",
    bignum: "Büyük sayı",
    opposite: "Zıt anlamlı",
    fixerror: "Yanlış düzelt",
    ordinal: "Sıra sayısı",
    direction: "Yön / konum",
    synonym: "Eşanlamlı",
    question: "Soru sözcüğü",
    connector: "Bağlaç",
    frequency: "Sıklık",
    emotion: "Duygu",
    body: "Vücut",
    scramble: "Cümle kur",
    exam: "Mini sınav",
    flash5: "Hızlı 5",
    speed10: "Hızlı 10",
    match: "Eşleştir",
    review: "Yanlış tekrarı",
    dialogue: "Diyalog",
    listen: "Dinle-anla",
    write: "Yazma",
    challenge: "Günlük challenge"
  };

  function startMatch() {
    const state = Progress.load();
    const deckId = CONTENT.decks[state.currentLevelId] ? state.currentLevelId : "a1";
    const pool = shuffle(CONTENT.decks[deckId] || CONTENT.decks.a1).slice(0, 4);
    matchPairs = [];
    pool.forEach((c, i) => {
      matchPairs.push({ id: "el" + i, pair: i, text: c.el, side: "el", done: false });
      matchPairs.push({ id: "tr" + i, pair: i, text: c.tr, side: "tr", done: false });
    });
    matchPairs = shuffle(matchPairs);
    matchSelected = null;
    matchLocked = false;
    trainerScore = { ok: 0, n: 0 };
  }

  function renderMatch() {
    const left = matchPairs.filter((p) => !p.done).length;
    if (!left) {
      Progress.bumpTrainer("match");
      const w = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card">
        <p class="brand-mark">Eşleştirme</p>
        <h1>Tur bitti</h1>
        <button class="btn btn-primary" id="again">Tekrar</button>
        <button class="btn btn-ghost" id="train-exit">Çık</button>
      </div></div>`);
      w.querySelector("#again").onclick = () => {
        startMatch();
        render();
      };
      w.querySelector("#train-exit").onclick = () => {
        trainerMode = null;
        view = "today";
        render();
      };
      return w;
    }
    const wrap = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card wide-card">
      <p class="eyebrow">Eşleştir · EL ↔ TR</p>
      <div class="match-grid" id="match-grid"></div>
      <button class="btn btn-ghost" id="train-exit" style="width:100%;margin-top:10px">Çık</button>
    </div></div>`);
    const grid = wrap.querySelector("#match-grid");
    matchPairs.forEach((tile) => {
      const b = el(`<button type="button" class="match-tile ${tile.done ? "done" : ""} ${matchSelected && matchSelected.id === tile.id ? "sel" : ""} ${tile.side}">${escapeHtml(tile.text)}</button>`);
      if (!tile.done) {
        b.addEventListener("click", () => {
          if (matchLocked) return;
          if (!matchSelected) {
            matchSelected = tile;
            render();
            return;
          }
          if (matchSelected.id === tile.id) {
            matchSelected = null;
            render();
            return;
          }
          if (matchSelected.pair === tile.pair && matchSelected.side !== tile.side) {
            matchSelected.done = true;
            tile.done = true;
            const elTile = matchPairs.find((p) => p.pair === tile.pair && p.side === "el");
            if (elTile) speakGreek(elTile.text);
            matchSelected = null;
            matchLocked = false;
            render();
          } else {
            matchLocked = true;
            setTimeout(() => {
              matchSelected = null;
              matchLocked = false;
              render();
            }, 450);
          }
        });
      }
      grid.appendChild(b);
    });
    wrap.querySelector("#train-exit").addEventListener("click", () => {
      trainerMode = null;
      view = "today";
      render();
    });
    return wrap;
  }

  function renderTrainer() {
    if (trainerMode === "write") return renderWritingStudio();
    if (trainerMode === "dialogue") return renderDialogueStudio();
    if (trainerMode === "listen") return renderListenQuiz();
    if (trainerMode === "match") return renderMatch();
    if (trainerQ && trainerQ.empty) {
      const w = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card">
        <p class="brand-mark">Yanlış tekrarı</p>
        <p class="lede">Kuyruk boş. Antrenmanda yanlış yaptıkça buraya düşer.</p>
        <button class="btn btn-primary" id="train-exit">Bugün’e dön</button>
      </div></div>`);
      w.querySelector("#train-exit").onclick = () => {
        trainerMode = null;
        view = "today";
        render();
      };
      return w;
    }

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

    if (trainerMode === "exam" && challengeIndex >= challengeQueue.length) {
      Progress.bumpTrainer("exam");
      const pct = Math.round((trainerScore.ok / Math.max(1, trainerScore.n)) * 100);
      const w = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card">
        <p class="brand-mark">Mini sınav</p>
        <h1>${trainerScore.ok}/20 · %${pct}</h1>
        <p class="lede">${pct >= 70 ? "İyi bant. Haftalık tekrarla." : "Yanlış tekrarını aç, zayıf türleri ez."}</p>
        <button class="btn btn-primary" id="train-exit">Bugün’e dön</button>
        <button class="btn btn-ghost" id="again">Tekrar sınav</button>
      </div></div>`);
      w.querySelector("#train-exit").onclick = () => {
        trainerMode = null;
        view = "today";
        render();
      };
      w.querySelector("#again").onclick = () => {
        startTrainer("exam");
        render();
      };
      return w;
    }

    if (trainerMode === "flash5" && challengeIndex >= challengeQueue.length) {
      Progress.bumpTrainer("flash5");
      const w = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card">
        <p class="brand-mark">Hızlı 5</p>
        <h1>${trainerScore.ok}/5</h1>
        <button class="btn btn-primary" id="again">Bir tur daha</button>
        <button class="btn btn-ghost" id="train-exit">Çık</button>
      </div></div>`);
      w.querySelector("#again").onclick = () => {
        startTrainer("flash5");
        render();
      };
      w.querySelector("#train-exit").onclick = () => {
        trainerMode = null;
        view = "today";
        render();
      };
      return w;
    }

    if (trainerMode === "speed10" && challengeIndex >= challengeQueue.length) {
      Progress.bumpTrainer("speed10");
      const pct = Math.round((trainerScore.ok / Math.max(1, trainerScore.n)) * 100);
      const w = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card">
        <p class="brand-mark">Hızlı 10</p>
        <h1>${trainerScore.ok}/10 · %${pct}</h1>
        <p class="lede">${pct >= 80 ? "Sprint iyi." : "Yanlış tekrarını aç."}</p>
        <button class="btn btn-primary" id="again">Tekrar sprint</button>
        <button class="btn btn-ghost" id="train-exit">Çık</button>
      </div></div>`);
      w.querySelector("#again").onclick = () => {
        startTrainer("speed10");
        render();
      };
      w.querySelector("#train-exit").onclick = () => {
        trainerMode = null;
        view = "today";
        render();
      };
      return w;
    }

    if (!trainerQ) trainerQ = nextTrainerQuestion(trainerMode === "challenge" || trainerMode === "exam" || trainerMode === "flash5" || trainerMode === "speed10" ? "verb" : trainerMode);
    const title =
      trainerMode === "challenge"
        ? `Challenge ${challengeIndex + 1}/10`
        : trainerMode === "exam"
          ? `Sınav ${challengeIndex + 1}/20`
          : trainerMode === "flash5"
            ? `Hızlı ${challengeIndex + 1}/5`
            : trainerMode === "speed10"
              ? `Sprint ${challengeIndex + 1}/10`
            : TRAINER_TITLES[trainerMode] || "Antrenman";
    const wrap = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card diag-card">
      <p class="eyebrow">${escapeHtml(title)} · ${trainerScore.ok}/${trainerScore.n}</p>
      <h1 class="diag-q ${trainerQ.kind === "number" || trainerQ.kind === "aspect" || trainerQ.kind === "translate" || trainerQ.kind === "time" || trainerQ.kind === "exam" || trainerQ.kind === "scramble" || trainerQ.kind === "ordinal" ? "" : "greek-line"}">${escapeHtml(trainerQ.prompt)}</h1>
      <p class="lede center-soft">${escapeHtml(trainerQ.sub)}</p>
      ${trainerQ.hint && trainerFeedback ? `<p class="meta center-soft">${escapeHtml(trainerQ.hint)}</p>` : ""}
      ${trainerQ.scramble ? `<p class="scramble-built greek-line" id="built">${escapeHtml((trainerQ.built || []).join(" ") || "…")}</p>` : ""}
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
      if (trainerMode === "challenge" || trainerMode === "exam" || trainerMode === "flash5" || trainerMode === "speed10") Progress.bumpTrainer(trainerQ.kind || trainerMode);
      else Progress.bumpTrainer(trainerMode);
      if (!ok) {
        Progress.pushWrong({
          prompt: trainerQ.prompt,
          answer: trainerQ.answer,
          kind: trainerQ.kind || trainerMode
        });
      } else if (trainerMode === "review" && trainerQ.wrongId) {
        Progress.popWrong(trainerQ.wrongId);
      }
      Progress.refreshBadges();
      trainerFeedback = { ok, msg };
      render();
    };

    if (!trainerFeedback) {
      if (trainerQ.scramble) {
        const poolWrap = el(`<div class="scramble-pool"></div>`);
        (trainerQ.pool || []).forEach((word, idx) => {
          const b = el(`<button type="button" class="btn diag-opt scramble-word">${escapeHtml(word)}</button>`);
          b.addEventListener("click", () => {
            trainerQ.built = trainerQ.built || [];
            trainerQ.built.push(word);
            trainerQ.pool.splice(idx, 1);
            if (!trainerQ.pool.length) {
              const ok = normalizeGreek(trainerQ.built.join(" ")) === normalizeGreek(trainerQ.answer);
              finish(ok, ok ? "Doğru." : `Yanlış. Doğru: ${trainerQ.answer}`);
            } else {
              render();
            }
          });
          poolWrap.appendChild(b);
        });
        const undo = el(`<button type="button" class="btn btn-ghost">Geri al</button>`);
        undo.addEventListener("click", () => {
          if (trainerQ.built && trainerQ.built.length) {
            const w = trainerQ.built.pop();
            trainerQ.pool.push(w);
            render();
          }
        });
        wrap.querySelector("#opts").appendChild(poolWrap);
        wrap.querySelector("#opts").appendChild(undo);
      } else if (trainerQ.input) {
        const form = el(`<form class="dict-form"><input name="ans" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Yunanca yaz…" required /><button class="btn btn-primary" type="submit">Kontrol</button></form>`);
        attachGreekKeyboard(form, "ans");
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const val = new FormData(e.target).get("ans");
          const ok = normalizeGreek(val) === normalizeGreek(trainerQ.answer);
          finish(ok, ok ? "Doğru." : `Yanlış. Doğru: ${trainerQ.answer}`);
        });
        wrap.querySelector("#opts").appendChild(form);
      } else if (trainerQ.options) {
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
      if (trainerMode === "challenge" || trainerMode === "exam" || trainerMode === "flash5" || trainerMode === "speed10") {
        challengeIndex++;
        trainerQ = challengeQueue[challengeIndex] || null;
      } else if (trainerMode === "review") {
        challengeIndex++;
        const w = challengeQueue[challengeIndex];
        if (!w) {
          trainerQ = { kind: "review", empty: true };
        } else {
          trainerQ = {
            kind: "review",
            prompt: w.prompt,
            sub: `(${w.kind}) Doğru cevap?`,
            answer: w.answer,
            options: null,
            speak: w.answer,
            input: true,
            wrongId: w.id
          };
        }
      } else if (trainerMode === "scramble") {
        const item = EXTRAS2.scramble[Math.floor(Math.random() * EXTRAS2.scramble.length)];
        trainerQ = {
          kind: "scramble",
          prompt: item.tr,
          sub: "Kelimeleri doğru sıraya diz (dokunarak ekle)",
          answer: item.answer,
          pool: shuffle(item.words.slice()),
          built: [],
          options: null,
          speak: item.answer,
          input: false,
          scramble: true
        };
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

  function renderDialogueStudio() {
    const d = EXTRAS.dialogues[Math.floor(Math.random() * EXTRAS.dialogues.length)];
    const wrap = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card wide-card">
      <p class="brand-mark">Diyalog · ${escapeHtml(d.title)}</p>
      <p class="lede">Her satırı dinle, sonra sen oku. Rol değiştirip tekrarla.</p>
      <ol class="dialogue-lines" id="d-lines"></ol>
      <button class="btn btn-primary" id="d-next">Başka diyalog</button>
      <button class="btn btn-ghost" id="train-exit" style="width:100%;margin-top:8px">Çık</button>
    </div></div>`);
    const ol = wrap.querySelector("#d-lines");
    d.lines.forEach((line) => {
      const li = el(`<li><span class="sp">${escapeHtml(line.sp)}</span><button type="button" class="line-el">${escapeHtml(line.el)}</button></li>`);
      li.querySelector("button").addEventListener("click", () => speakGreek(line.el));
      ol.appendChild(li);
    });
    wrap.querySelector("#d-next").addEventListener("click", () => {
      Progress.bumpTrainer("dialogue");
      render();
    });
    wrap.querySelector("#train-exit").addEventListener("click", () => {
      trainerMode = null;
      view = "today";
      render();
    });
    return wrap;
  }

  function renderListenQuiz() {
    if (!trainerQ || trainerQ.kind !== "listen") {
      const item = EXTRAS.listenQuiz[Math.floor(Math.random() * EXTRAS.listenQuiz.length)];
      trainerQ = { kind: "listen", ...item, speak: item.say };
      trainerFeedback = null;
      setTimeout(() => speakGreek(item.say), 300);
    }
    const wrap = el(`<div class="onboard"><div class="onboard-bg"></div><div class="onboard-card diag-card">
      <p class="eyebrow">Dinle-anla · ${trainerScore.ok}/${trainerScore.n}</p>
      <h1 class="diag-q">♪ Sesli soru</h1>
      <p class="lede center-soft">${escapeHtml(trainerQ.q)}</p>
      <button type="button" class="btn btn-ghost" id="say-q">Tekrar dinle</button>
      <div class="diag-opts" id="opts"></div>
      ${trainerFeedback ? `<p class="feedback ${trainerFeedback.ok ? "ok" : "bad"}">${escapeHtml(trainerFeedback.msg)}</p><button class="btn btn-primary" id="next">Sonraki</button>` : ""}
      <button class="btn btn-ghost" id="train-exit" style="width:100%;margin-top:10px">Çık</button>
    </div></div>`);
    wrap.querySelector("#say-q").addEventListener("click", () => speakGreek(trainerQ.speak));
    if (!trainerFeedback) {
      trainerQ.options.forEach((opt, i) => {
        const b = el(`<button type="button" class="btn diag-opt">${escapeHtml(opt)}</button>`);
        b.addEventListener("click", () => {
          const ok = i === trainerQ.a;
          trainerScore.n++;
          if (ok) trainerScore.ok++;
          Progress.bumpTrainer("listen");
          trainerFeedback = { ok, msg: ok ? "Doğru." : `Yanlış. Duyulan: ${trainerQ.say}` };
          render();
        });
        wrap.querySelector("#opts").appendChild(b);
      });
    }
    wrap.querySelector("#next")?.addEventListener("click", () => {
      trainerFeedback = null;
      trainerQ = null;
      render();
    });
    wrap.querySelector("#train-exit").addEventListener("click", () => {
      trainerMode = null;
      trainerQ = null;
      view = "today";
      render();
    });
    return wrap;
  }

  function todayTrio(state) {
    const level = state.currentLevelId || "a1";
    const picks = [];
    const map = [
      { id: "cards", label: "Kelime kartı", action: "cards" },
      { id: "challenge", label: "Challenge", action: "challenge" },
      { id: "aorist", label: "Aorist", action: "aorist" },
      { id: "listen", label: "Dinle-anla", action: "listen" },
      { id: "write", label: "Yazma", action: "write" },
      { id: "prep", label: "Edat", action: "prep" }
    ];
    if (level === "a0" || level === "a1") {
      picks.push(map[0], { id: "alpha", label: "Alfabe", action: "alpha" }, { id: "gender", label: "Madde", action: "gender" });
    } else if (level === "a2" || level === "b1") {
      picks.push(map[0], map[2], map[5]);
    } else {
      picks.push(map[1], map[3], map[4]);
    }
    return picks.slice(0, 3);
  }

  function trainerButtons(ts) {
    const wrongN = (Progress.load().wrongQueue || []).length;
    const btn = (id, label) =>
      `<button type="button" class="btn btn-ghost sand-btn" data-train="${id}">${label} (${ts[id] || 0})</button>`;
    return `
      <div class="launch-stack launch-slim">
        <button type="button" class="btn btn-primary" data-train="challenge">Challenge</button>
        <button type="button" class="btn btn-primary" data-train="flash5">Hızlı 5</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="speed10">Hızlı 10</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="exam">Sınav</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="review">Yanlışlar (${wrongN})</button>
      </div>
      <details class="train-cat">
        <summary>Tüm antrenmanlar</summary>
        <div class="quick-train multi">
          ${btn("alpha", "Alfabe")}${btn("gender", "Madde")}${btn("number", "Sayı")}${btn("bignum", "100+")}${btn("ordinal", "Sıra")}${btn("weekdays", "Gün")}${btn("months", "Ay")}${btn("time", "Saat")}${btn("question", "Soru")}${btn("match", "Eşleştir")}
          ${btn("verb", "Fiil")}${btn("aspect", "Aspect")}${btn("aorist", "Aorist")}${btn("perfect", "Perfect")}${btn("imperative", "Emir")}${btn("subjunctive", "να")}${btn("particle", "θα/να")}${btn("reflexive", "Dönüşlü")}
          ${btn("pronoun", "Zamir")}${btn("prep", "Edat")}${btn("genitive", "Genitif")}${btn("adjective", "Sıfat")}${btn("compare", "Karşılaştır")}${btn("opposite", "Zıt")}${btn("synonym", "Eşanlam")}${btn("connector", "Bağlaç")}${btn("conditional", "αν")}${btn("passive", "Pasif")}${btn("polite", "Nazik")}${btn("collocation", "Kalıp")}
          ${btn("direction", "Yön")}${btn("frequency", "Sıklık")}${btn("emotion", "Duygu")}${btn("body", "Vücut")}${btn("fixerror", "Düzelt")}${btn("scramble", "Cümle")}${btn("dictation", "Dikte")}${btn("listen", "Dinle")}${btn("translate", "TR→EL")}
          <button type="button" class="btn btn-ghost sand-btn" data-train="dialogue">Diyalog</button>
          <button type="button" class="btn btn-ghost sand-btn" data-train="write">Yazma</button>
        </div>
      </details>`;
  }

  function renderCards(state) {
    const deckIds = Object.keys(CONTENT.decks);
    const ts = state.trainerStats || {};
    if (!cardDeckId) {
      const section = el(`<section class="view cards-view">
        <div class="view-intro">
          <p class="eyebrow">Kelime & antrenman</p>
          <h1>Kartlar</h1>
        </div>
        ${trainerButtons(ts)}
        <p class="eyebrow sand-meta" style="margin:16px 0 8px">Desteler</p>
        <ul class="deck-grid" id="deck-grid"></ul>
        <p class="meta sand-meta">Tekrar: ${state.cardsReviewed || 0}</p>
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
                  : id === "friends"
                    ? "False friends"
                    : id === "weather"
                      ? "Hava"
                      : id === "health"
                        ? "Sağlık"
                        : id === "work"
                          ? "İş"
                          : id === "home"
                            ? "Ev"
                            : id === "family"
                              ? "Aile"
                              : id === "colors"
                                ? "Renkler"
                                : id === "shopping"
                                  ? "Alışveriş"
                                  : id === "city"
                                    ? "Şehir"
                                    : id === "school"
                                      ? "Okul"
                                      : id === "tech"
                                        ? "Teknoloji"
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
        <p class="lede">${stats.streak} gün seri · ${state.cardsReviewed || 0} kart · ${hours} sa</p>
      </div>
      <div class="stat-grid">
        <div class="stat"><span class="stat-n">${stats.pct}%</span><span class="stat-l">Tamamlanma</span></div>
        <div class="stat"><span class="stat-n">${stats.done}</span><span class="stat-l">Görev</span></div>
        <div class="stat"><span class="stat-n">${stats.streak}</span><span class="stat-l">Seri</span></div>
        <div class="stat"><span class="stat-n">${hours}</span><span class="stat-l">Saat</span></div>
      </div>
      <article class="info-panel journal-panel settings-panel">
        <h3>Ayarlar</h3>
        <div class="settings-grid">
          <label>Hedef
            <select id="goal-select" class="goal-select">
              ${[25, 45, 60, 90].map((g) => `<option value="${g}" ${g === (state.dailyGoalMin || 45) ? "selected" : ""}>${g} dk</option>`).join("")}
            </select>
          </label>
          <label>Ses hızı
            <select id="tts-rate" class="goal-select">
              <option value="0.75" ${ttsRate === 0.75 ? "selected" : ""}>Yavaş</option>
              <option value="0.9" ${ttsRate === 0.9 ? "selected" : ""}>Normal</option>
              <option value="1.05" ${ttsRate === 1.05 ? "selected" : ""}>Hızlı</option>
            </select>
          </label>
        </div>
        <div class="settings-row">
          <form id="mins-form" class="mins-form">
            <input name="mins" type="number" min="5" max="300" step="5" value="25" aria-label="Dakika" />
            <button type="submit" class="btn btn-ghost">+ dk</button>
          </form>
          <button type="button" class="btn btn-ghost" id="focus-btn">${focusLeft > 0 ? "Durdur " + focusLeft + "s" : "Odak 25′"}</button>
        </div>
      </article>
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
        <h3>Beceri</h3>
        <ul class="skill-bars" id="skill-bars"></ul>
      </article>
      <article class="info-panel journal-panel">
        <h3>30 gün</h3>
        <div class="heat-grid" id="heat-grid"></div>
      </article>
      <article class="info-panel journal-panel">
        <h3>Rozetler</h3>
        <ul class="badge-grid" id="badge-grid"></ul>
      </article>
      <article class="info-panel journal-panel">
        <h3>Yedek</h3>
        <div class="backup-row">
          <button type="button" class="btn btn-primary" id="export-btn">Dışa aktar</button>
          <label class="btn btn-ghost file-label">İçe aktar<input type="file" id="import-file" accept="application/json,.json" hidden /></label>
        </div>
      </article>
      <article class="info-panel journal-panel">
        <h3>Hata günlüğü</h3>
        <form id="journal-form" class="journal-form">
          <select name="tag">
            <option value="yds">YDS</option>
            <option value="grammar">Dilbilgisi</option>
            <option value="vocab">Kelime</option>
            <option value="genel">Genel</option>
          </select>
          <input name="text" type="text" maxlength="500" placeholder="Not…" required />
          <button type="submit" class="btn btn-primary">Ekle</button>
        </form>
        <ul class="journal-list" id="journal-list"></ul>
      </article>
      <h3 class="section-title">Seviyeler</h3>
      <ul class="break-list" id="break-list"></ul>
      <div class="danger-zone">
        <button class="btn btn-ghost" id="reset-btn">Tüm ilerlemeyi sıfırla</button>
      </div>
    </section>`);

    const jlist = section.querySelector("#journal-list");
    const badgeGrid = section.querySelector("#badge-grid");
    const heat = section.querySelector("#heat-grid");
    const skillBars = section.querySelector("#skill-bars");
    const tsAll = state.trainerStats || {};
    const topSkills = Object.entries(tsAll)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    const maxSkill = Math.max(1, ...topSkills.map((x) => x[1]));
    topSkills.forEach(([k, v]) => {
      skillBars.appendChild(
        el(`<li><span>${escapeHtml(k)}</span><div class="progress-line"><span style="width:${Math.round((v / maxSkill) * 100)}%"></span></div><em>${v}</em></li>`)
      );
    });
    if (!topSkills.length) skillBars.appendChild(el(`<li><span>Henüz antrenman yok</span></li>`));
    Progress.monthActivity().forEach((d) => {
      heat.appendChild(el(`<i class="heat h${d.heat}" title="${d.key}${d.mins ? " · " + d.mins + " dk" : ""}"></i>`));
    });
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

    section.querySelector("#goal-select")?.addEventListener("change", (e) => {
      Progress.setDailyGoal(e.target.value);
      render();
    });
    section.querySelector("#tts-rate")?.addEventListener("change", (e) => {
      ttsRate = Number(e.target.value) || 0.9;
    });
    section.querySelector("#mins-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const mins = Number(new FormData(e.target).get("mins")) || 0;
      Progress.logStudyMinutes(mins);
      render();
    });
    section.querySelector("#focus-btn")?.addEventListener("click", () => {
      if (focusTimer) {
        clearInterval(focusTimer);
        focusTimer = null;
        focusLeft = 0;
        render();
        return;
      }
      focusLeft = 25 * 60;
      focusTimer = setInterval(() => {
        focusLeft--;
        const btn = document.getElementById("focus-btn");
        if (btn) btn.textContent = focusLeft > 0 ? "Durdur " + focusLeft + "s" : "Odak 25′";
        if (focusLeft <= 0) {
          clearInterval(focusTimer);
          focusTimer = null;
          Progress.logStudyMinutes(25);
          alert("25 dk odak tamam.");
          render();
        }
      }, 1000);
      render();
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
    if (!document.getElementById("install-bar")) {
      document.body.appendChild(renderInstallBar());
    }
    setupInstallPrompt();
    render();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
  }

  let deferredInstall = null;
  function setupInstallPrompt() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredInstall = e;
      const bar = document.getElementById("install-bar");
      if (bar) bar.hidden = false;
    });
  }

  function renderInstallBar() {
    const bar = el(`<div class="install-bar" id="install-bar" hidden>
      <span>Οδηγός’u ana ekrana ekle</span>
      <button type="button" class="btn btn-primary" id="install-btn">Kur</button>
      <button type="button" class="btn btn-ghost" id="install-x" aria-label="Kapat">×</button>
    </div>`);
    bar.querySelector("#install-btn").addEventListener("click", async () => {
      if (!deferredInstall) return;
      deferredInstall.prompt();
      await deferredInstall.userChoice;
      deferredInstall = null;
      bar.hidden = true;
    });
    bar.querySelector("#install-x").addEventListener("click", () => {
      bar.hidden = true;
    });
    return bar;
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => App.init());
