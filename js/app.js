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
  let activeTaskId = null;
  let lessonReturnView = "today";
  let patternFilterCat = "all";
  let patternFilterLevel = "all";
  let patternSearch = "";
  let wordSearch = "";
  let menuOpen = false;
  let activeAssignmentId = null;
  let activeAssignmentKind = null;
  let ankiSession = null; // { queue, index, flipped, done, again, good }
  let ankiPool = "due"; // due | level | custom | patterns

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

  function finishTrainerSession() {
    if (activeAssignmentKind === "weak" && activeAssignmentId) {
      Progress.completeAssignment(activeAssignmentId);
    }
    activeAssignmentId = null;
    activeAssignmentKind = null;
    trainerMode = null;
    trainerQ = null;
    trainerFeedback = null;
    challengeQueue = [];
    view = "today";
  }

  function render() {
    const state = Progress.load();
    const root = $("#app");
    if (view !== "lesson" && scrollTopCleanup) {
      scrollTopCleanup();
      scrollTopCleanup = null;
    }
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
        <h1>Ben öğretmeninim. Sen öğrencisin.</h1>
        <p class="lede">Sana sırayla ne yapacağını söyleyeceğim. Sen sadece onu yap. Atlamayacaksın, seçmeyeceksin — takip edeceksin.</p>
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
          <p class="hint">Emin değilsen önce 50 soruluk seviye tespit sınavını çöz.</p>
          <input type="hidden" name="mode" value="standard" />
          <input type="hidden" name="goal" value="45" />
          <button type="submit" class="btn btn-primary">Öğretmene bağlan</button>
          <button type="button" class="btn btn-ghost" id="start-diag">Önce seviye tespit (50 soru)</button>
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

  let scrollTopCleanup = null;

  function bindScrollTop(host) {
    if (scrollTopCleanup) {
      scrollTopCleanup();
      scrollTopCleanup = null;
    }
    if (!host) return;
    const btn = el(`<button type="button" class="scroll-top" hidden aria-label="Yukarı çık">↑</button>`);
    host.appendChild(btn);
    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(0, doc.scrollHeight - window.innerHeight);
      const y = window.scrollY || doc.scrollTop || 0;
      const nearBottom = max > 240 && y >= max - 100;
      btn.hidden = !nearBottom;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    scrollTopCleanup = () => {
      window.removeEventListener("scroll", onScroll);
      btn.remove();
    };
  }

  function renderDiagnostic() {
    const items = CONTENT.diagnostic;
    if (diagIndex >= items.length) {
      const correct = diagAnswers.filter(Boolean).length;
      const levelId =
        typeof CONTENT.levelFromScore === "function"
          ? CONTENT.levelFromScore(correct, items.length, diagAnswers)
          : "a1";
      const level = CURRICULUM.levels.find((l) => l.id === levelId) || CURRICULUM.levels[0];
      Progress.saveDiagnostic({ correct, total: items.length, levelId });
      const bands =
        typeof CONTENT.diagnosticBreakdown === "function" ? CONTENT.diagnosticBreakdown(diagAnswers) : [];
      const bandHtml = bands.length
        ? `<ul class="diag-bands">${bands
            .map(
              (b) =>
                `<li><span>${escapeHtml(String(b.level).toUpperCase())}</span><span>${b.ok}/${b.n} · %${b.pct}</span></li>`
            )
            .join("")}</ul>`
        : "";
      const wrap = el(`<div class="onboard">
        <div class="onboard-bg" aria-hidden="true"></div>
        <div class="onboard-card">
          <p class="brand-mark">Seviye tespit · 50 soru</p>
          <h1>${correct}/${items.length}</h1>
          <p class="lede">Ölçülen seviye: <strong>${escapeHtml(level.code)} · ${escapeHtml(level.title)}</strong></p>
          <p class="meta">Skor bant bant hesaplanır; alt seviyeler zayıfsa öneri düşer.</p>
          ${bandHtml}
          <button class="btn btn-primary" id="diag-apply">Bu seviyeyle devam</button>
          <button class="btn btn-ghost" id="diag-again">Tekrar çöz</button>
        </div>
      </div>`);
      wrap.querySelector("#diag-apply").addEventListener("click", () => {
        const state = Progress.load();
        if (!state.onboardingDone) {
          Progress.completeOnboarding({
            name: state.displayName || "",
            levelId,
            dailyMode: state.dailyMode || "standard",
            dailyGoalMin: state.dailyGoalMin || 45
          });
        } else {
          Progress.setLevel(levelId);
          Progress.rebuildTeacherAgenda();
        }
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
        <p class="eyebrow">Seviye tespit · ${diagIndex + 1} / ${items.length}${item.level ? ` · ${String(item.level).toUpperCase()}` : ""}</p>
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
    const name = state.displayName ? escapeHtml(state.displayName) : "öğrenci";
    const shell = el(`<div class="shell teacher-shell">
      <header class="topbar">
        <div class="topbar-brand">
          <span class="logo">Οδηγός</span>
          <span class="logo-sub">Öğretmen · ${name}</span>
        </div>
        <button type="button" class="menu-toggle" id="menu-toggle" aria-label="Menü" aria-expanded="${menuOpen}">
          <span class="burger" aria-hidden="true"><i></i><i></i><i></i></span>
        </button>
      </header>
      <div class="drawer-backdrop ${menuOpen ? "open" : ""}" id="drawer-backdrop" ${menuOpen ? "" : "hidden"}></div>
      <aside class="drawer ${menuOpen ? "open" : ""}" id="drawer" aria-hidden="${!menuOpen}">
        <p class="drawer-title">Menü</p>
        <nav class="drawer-nav">
          <button type="button" data-view="today" class="${view === "today" || view === "lesson" ? "active" : ""}">Ders (şimdi)</button>
          <button type="button" data-view="words" class="${view === "words" ? "active" : ""}">Kelimeler</button>
          <button type="button" data-view="patterns" class="${view === "patterns" ? "active" : ""}">Kalıplar</button>
          <button type="button" data-view="settings" class="${view === "settings" ? "active" : ""}">Ayarlar</button>
          <button type="button" data-view="anki" class="drawer-anki ${view === "anki" ? "active" : ""}">Anki</button>
        </nav>
        <p class="drawer-meta">${stats.streak} gün seri · %${stats.pct}</p>
        <p class="drawer-hint">Atlama yok. Öğretmen ne verdiyse onu yap.</p>
      </aside>
      <main class="main" id="main"></main>
    </div>`);

    const closeMenu = () => {
      menuOpen = false;
      render();
    };

    shell.querySelector("#menu-toggle").addEventListener("click", () => {
      menuOpen = !menuOpen;
      render();
    });
    shell.querySelector("#drawer-backdrop").addEventListener("click", closeMenu);
    shell.querySelectorAll(".drawer-nav button").forEach((btn) => {
      btn.addEventListener("click", () => {
        view = btn.dataset.view;
        selectedLevelId = null;
        cardDeckId = null;
        activeTaskId = null;
        menuOpen = false;
        render();
      });
    });

    const main = shell.querySelector("#main");
    if (view === "today") main.appendChild(renderToday(state));
    else if (view === "lesson") main.appendChild(renderLesson(state));
    else if (view === "words") main.appendChild(renderWordsBank(state));
    else if (view === "patterns") main.appendChild(renderPatternsBank(state));
    else if (view === "settings") main.appendChild(renderSettings(state));
    else if (view === "anki") main.appendChild(renderAnki(state));
    else {
      view = "today";
      main.appendChild(renderToday(state));
    }

    return shell;
  }

  function renderToday(state) {
    const next = Progress.nextTeacherAssignment();
    const agenda = Progress.agendaStats();
    const name = state.displayName ? `, ${escapeHtml(state.displayName)}` : "";
    const level = CURRICULUM.levels.find((l) => l.id === state.currentLevelId);
    const todayMins = (state.studyLog || {})[Progress.todayStr()] || 0;
    const goal = state.dailyGoalMin || 45;
    const goalPct = Math.min(100, Math.round((todayMins / goal) * 100));
    const ped = CURRICULUM.pedagogy || {};

    let cardHtml = "";
    if (!next) {
      cardHtml = `<article class="focus-card done teacher-card">
        <p class="eyebrow">Öğretmen</p>
        <h2>Bugünlük bu kadar</h2>
        <p>Yeni konu ve tekrarlar bitti. Dinlen. Yarın ağırlığa göre yeni plan kuracağım.</p>
      </article>`;
    } else if (next.kind === "weak") {
      cardHtml = `<article class="focus-card teacher-card review-card">
        <p class="eyebrow">Tekrar · zayıf nokta</p>
        <h2>${escapeHtml(next.assignment.title)}</h2>
        <p class="teacher-reason">${escapeHtml(next.reason)}</p>
        <p>${escapeHtml(next.assignment.detail)}</p>
        <div class="focus-meta">
          <span class="badge badge-review">Zayıf tekrar</span>
          <span class="meta">~${next.minutes} dk · ${next.wrongCount || 0} madde</span>
        </div>
        <button class="btn btn-primary" id="start-weak">Başla</button>
        <button class="btn btn-ghost" data-finish="${escapeHtml(next.assignment.id)}">Tamamladım</button>
      </article>`;
    } else if (next.kind === "review") {
      const code = next.level ? next.level.code : "";
      cardHtml = `<article class="focus-card teacher-card review-card">
        <p class="eyebrow">Tekrar · öğretmen kararı</p>
        <h2>${escapeHtml(next.task.title)}</h2>
        <p class="teacher-reason">${escapeHtml(next.reason)}</p>
        <p>${escapeHtml(next.task.detail)}</p>
        <div class="focus-meta">
          <span class="badge badge-review">Aralıklı tekrar</span>
          ${typeBadge(next.task.type)}
          <span class="meta">~${next.minutes} dk · ${escapeHtml(code)} · ${escapeHtml(next.unit?.title || "")}</span>
        </div>
        <button class="btn btn-primary" data-open-assign="${escapeHtml(next.assignment.id)}">Tekrara başla</button>
        <button class="btn btn-ghost" data-finish="${escapeHtml(next.assignment.id)}">Tamamladım</button>
      </article>`;
    } else {
      const code = next.level ? next.level.code : "";
      cardHtml = `<article class="focus-card teacher-card">
        <p class="eyebrow">Yeni konu · şimdi bunu yap</p>
        <h2>${escapeHtml(next.task.title)}</h2>
        <p>${escapeHtml(next.task.detail)}</p>
        <div class="focus-meta">
          ${typeBadge(next.task.type)}
          <span class="meta">~${next.minutes} dk · ${escapeHtml(code)} · ${escapeHtml(next.unit?.title || "")}</span>
        </div>
        <button class="btn btn-primary" data-open-assign="${escapeHtml(next.assignment.id)}">Başla</button>
        <button class="btn btn-ghost" data-finish="${escapeHtml(next.assignment.id)}">Tamamladım</button>
      </article>`;
    }

    const section = el(`<section class="view today-view today-teacher">
      <div class="hero-today">
        <p class="eyebrow">Öğretmen · ${escapeHtml(level.code)}</p>
        <h1>Merhaba${name}</h1>
        <div class="goal-box">
          <div class="goal-top"><span>${todayMins}/${goal} dk</span><span>${agenda.remaining ? `${agenda.done}/${agenda.total} · ${agenda.remaining} kaldı` : "bugün bitti"}</span></div>
          <div class="progress-line lg"><span style="width:${goalPct}%"></span></div>
        </div>
        ${agenda.reviews ? `<p class="agenda-mix">Bugün ${agenda.reviews} tekrar slotu var — ağır konular daha sık geri gelir.</p>` : ""}
      </div>

      ${cardHtml}

      <p class="teacher-note">${escapeHtml(ped.summary || "Yeni konu + aralıklı tekrar. Sen sadece verileni yap.")}</p>
    </section>`);

    section.querySelectorAll("[data-finish]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Progress.completeAssignment(btn.dataset.finish);
        activeAssignmentId = null;
        activeAssignmentKind = null;
        render();
      });
    });

    section.querySelector("[data-open-assign]")?.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.openAssign;
      openAssignment(id);
    });

    section.querySelector("#start-weak")?.addEventListener("click", () => {
      activeAssignmentId = next.assignment.id;
      activeAssignmentKind = "weak";
      startTrainer("review");
      render();
    });

    return section;
  }

  function openAssignment(assignmentId) {
    const next = Progress.nextTeacherAssignment();
    if (!next || !next.assignment || next.assignment.id !== assignmentId) {
      view = "today";
      render();
      return;
    }
    activeAssignmentId = assignmentId;
    activeAssignmentKind = next.kind;
    if (next.kind === "weak") {
      startTrainer("review");
      render();
      return;
    }
    activeTaskId = next.task.id;
    lessonReturnView = "today";
    view = "lesson";
    render();
  }

  function collectAllWords(state) {
    const built = [];
    const decks = (typeof CONTENT !== "undefined" && CONTENT.decks) || {};
    Object.keys(decks).forEach((deckId) => {
      (decks[deckId] || []).forEach((w) => {
        built.push({
          id: `sys_${deckId}_${w.el}`,
          el: w.el,
          tr: w.tr,
          tip: w.tip || "",
          deck: deckId,
          custom: false
        });
      });
    });
    (state.customWords || []).forEach((w) => built.push({ ...w, custom: true }));
    return built;
  }

  function collectAllPatterns(state) {
    const bank = typeof PATTERNS !== "undefined" && Array.isArray(PATTERNS.bank) ? PATTERNS.bank : [];
    const built = bank.map((p, i) => ({
      ...p,
      id: p.id || `sys_p_${i}`,
      custom: false
    }));
    (state.customPatterns || []).forEach((p) => built.push({ ...p, custom: true }));
    return built;
  }

  function renderWordsBank(state) {
    const all = collectAllWords(state);
    const q = (wordSearch || "").trim().toLowerCase();
    const filtered = !q
      ? all
      : all.filter((w) => `${w.el} ${w.tr} ${w.tip} ${w.deck || ""}`.toLowerCase().includes(q));

    const section = el(`<section class="view list-view">
      <div class="view-intro">
        <p class="eyebrow">Liste</p>
        <h1>Kelimeler</h1>
        <p class="lede">${all.length} kelime · ${filtered.length} gösteriliyor</p>
      </div>

      <form class="add-form sand-panel" id="add-word-form">
        <p class="add-form-title">Kelime ekle</p>
        <label><span>Yunanca</span><input name="el" required maxlength="80" autocomplete="off" placeholder="π.χ. καλημέρα" /></label>
        <label><span>Türkçe</span><input name="tr" required maxlength="120" autocomplete="off" placeholder="günaydın" /></label>
        <label><span>Not (isteğe bağlı)</span><input name="tip" maxlength="120" autocomplete="off" placeholder="kısa not" /></label>
        <button type="submit" class="btn btn-primary">Ekle</button>
      </form>

      <input type="search" id="word-q" class="pattern-search" placeholder="Ara…" value="${escapeHtml(wordSearch)}" autocomplete="off" />
      <ul class="pattern-list" id="word-list"></ul>
      ${filtered.length ? "" : `<p class="meta sand-meta">Eşleşen kelime yok.</p>`}
    </section>`);

    const list = section.querySelector("#word-list");
    filtered.forEach((w) => {
      const li = el(`<li class="pattern-item">
        <div class="pattern-card word-row">
          <button type="button" class="word-speak">
            <strong class="pattern-frame">${escapeHtml(w.el)}</strong>
            <span class="pattern-tr">${escapeHtml(w.tr)}</span>
            ${w.tip ? `<span class="pattern-eg">${escapeHtml(w.tip)}</span>` : ""}
            ${w.custom ? `<span class="pill muted">benim</span>` : w.deck ? `<span class="pill muted">${escapeHtml(String(w.deck).toUpperCase())}</span>` : ""}
          </button>
          ${w.custom ? `<button type="button" class="btn-del" data-del="${escapeHtml(w.id)}" aria-label="Sil">Sil</button>` : ""}
        </div>
      </li>`);
      li.querySelector(".word-speak").addEventListener("click", () => speakGreek(w.el));
      li.querySelector("[data-del]")?.addEventListener("click", () => {
        Progress.removeCustomWord(w.id);
        render();
      });
      list.appendChild(li);
    });

    let searchTimer = null;
    section.querySelector("#word-q").addEventListener("input", (e) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        wordSearch = e.target.value || "";
        render();
      }, 180);
    });

    section.querySelector("#add-word-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      Progress.addCustomWord({
        el: fd.get("el"),
        tr: fd.get("tr"),
        tip: fd.get("tip")
      });
      wordSearch = "";
      render();
    });

    return section;
  }

  function renderSettings(state) {
    const stats = Progress.overallStats();
    const section = el(`<section class="view settings-view list-view">
      <div class="view-intro">
        <p class="eyebrow">Menü</p>
        <h1>Ayarlar</h1>
        <p class="lede">Seviye ve tempo burada. Ders akışını sen seçmezsin — öğretmen hâlâ verir.</p>
      </div>

      <form class="add-form sand-panel" id="settings-form">
        <p class="add-form-title">Profil</p>
        <label>
          <span>Adın</span>
          <input name="name" type="text" maxlength="40" value="${escapeHtml(state.displayName || "")}" placeholder="Örn. Nurhat" autocomplete="nickname" />
        </label>
        <label>
          <span>Seviye</span>
          <select name="level">
            ${CURRICULUM.levels
              .map(
                (l) =>
                  `<option value="${l.id}" ${l.id === state.currentLevelId ? "selected" : ""}>${l.code} — ${escapeHtml(l.title)}</option>`
              )
              .join("")}
          </select>
        </label>
        <label>
          <span>Günlük tempo</span>
          <select name="mode">
            ${Object.entries(CURRICULUM.dailyTemplates)
              .map(
                ([k, v]) =>
                  `<option value="${k}" ${k === state.dailyMode ? "selected" : ""}>${escapeHtml(v.label)}</option>`
              )
              .join("")}
          </select>
        </label>
        <label>
          <span>Günlük dakika hedefi</span>
          <select name="goal">
            ${[25, 45, 60, 90]
              .map((g) => `<option value="${g}" ${g === (state.dailyGoalMin || 45) ? "selected" : ""}>${g} dk</option>`)
              .join("")}
          </select>
        </label>
        <label>
          <span>Ses hızı</span>
          <select name="tts">
            <option value="0.75" ${ttsRate === 0.75 ? "selected" : ""}>Yavaş</option>
            <option value="0.9" ${ttsRate === 0.9 ? "selected" : ""}>Normal</option>
            <option value="1.05" ${ttsRate === 1.05 ? "selected" : ""}>Hızlı</option>
          </select>
        </label>
        <button type="submit" class="btn btn-primary">Kaydet</button>
      </form>

      <article class="sand-panel settings-stats">
        <p class="add-form-title">Durum</p>
        <p class="meta">${stats.streak} gün seri · %${stats.pct} tamamlanma · ${stats.done} görev</p>
        <p class="meta">Kalıp bankası: ${
          typeof PATTERNS !== "undefined" && PATTERNS.bank ? PATTERNS.bank.length : 0
        } · Kelime: ${
          typeof CONTENT !== "undefined" && CONTENT.vocabCount ? CONTENT.vocabCount() : "—"
        } · Senin kalıpların: ${(state.customPatterns || []).length}</p>
      </article>

      <div class="settings-actions">
        <button type="button" class="btn btn-primary" id="start-level-test">Seviye tespit sınavı (50 soru)</button>
        <button type="button" class="btn btn-ghost sand-btn" id="rebuild-agenda">Bugünkü planı yenile</button>
        <button type="button" class="btn btn-ghost sand-btn" id="export-settings">Yedek al</button>
        <label class="btn btn-ghost sand-btn file-label">Yedek yükle<input type="file" id="import-settings" accept="application/json,.json" hidden /></label>
        <button type="button" class="btn btn-ghost sand-btn danger-btn" id="reset-settings">Sıfırla</button>
      </div>
    </section>`);

    section.querySelector("#settings-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      Progress.setDisplayName(fd.get("name"));
      Progress.setLevel(fd.get("level"));
      Progress.setDailyMode(fd.get("mode"));
      Progress.setDailyGoal(fd.get("goal"));
      ttsRate = Number(fd.get("tts")) || 0.9;
      Progress.rebuildTeacherAgenda();
      view = "today";
      render();
    });

    section.querySelector("#rebuild-agenda").addEventListener("click", () => {
      Progress.rebuildTeacherAgenda();
      view = "today";
      render();
    });

    section.querySelector("#start-level-test").addEventListener("click", () => {
      diagIndex = 0;
      diagAnswers = [];
      diagActive = true;
      menuOpen = false;
      render();
    });

    section.querySelector("#export-settings").addEventListener("click", () => {
      const data = Progress.exportData();
      const blob = new Blob([data], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `odigos-yedek-${Progress.todayStr()}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    });

    section.querySelector("#import-settings").addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        Progress.importData(text);
        Progress.rebuildTeacherAgenda();
        view = "today";
        render();
      } catch {
        alert("Yedek okunamadı.");
      }
    });

    section.querySelector("#reset-settings").addEventListener("click", () => {
      if (!confirm("Tüm ilerleme silinsin mi? Bu geri alınamaz.")) return;
      Progress.resetAll();
      view = "today";
      render();
    });

    return section;
  }

  function renderAnki(state) {
    if (ankiSession) return renderAnkiSession(state);

    const words = collectAllWords(state);
    const patterns = collectAllPatterns(state);
    const levelId = state.currentLevelId || "a1";

    const wordCards = words.map((w) => ({
      key: Progress.cardKey(w.deck || "mega", w.el),
      front: w.el,
      back: w.tr,
      tip: w.tip || "",
      kind: "kelime",
      deck: w.deck || ""
    }));
    const patternCards = patterns.map((p) => ({
      key: Progress.cardKey("pattern", p.id || p.eg),
      front: p.frame,
      back: `${p.eg}\n${p.tr || ""}`,
      tip: p.cat || "",
      kind: "kalıp",
      deck: p.level || ""
    }));
    const customCards = (state.customWords || []).map((w) => ({
      key: Progress.cardKey("custom", w.el),
      front: w.el,
      back: w.tr,
      tip: w.tip || "",
      kind: "kelime",
      deck: "benim"
    }));
    const levelCards = wordCards.filter((c) => c.deck === levelId || c.deck === "benim");

    const dueKeys = wordCards.map((c) => c.key);
    const stats = Progress.ankiStatsForKeys(dueKeys);
    const reviewedDue = wordCards.filter((c) => Progress.isCardDue(c.key));
    const newCards = wordCards.filter((c) => !Progress.getCardState(c.key).reviews);
    const dueCards = reviewedDue.concat(shuffle(newCards).slice(0, 15)).slice(0, 40);

    const section = el(`<section class="view anki-view list-view">
      <div class="view-intro">
        <p class="eyebrow">Aralıklı tekrar</p>
        <h1>Anki</h1>
        <p class="lede">Kendi kelimelerinle Anki gibi çalış. Bağlantı yok — her şey burada.</p>
      </div>

      <article class="sand-panel anki-stats-panel">
        <div class="anki-stat-grid">
          <div class="anki-stat"><span class="n">${stats.due}</span><span class="l">Vadesi gelen</span></div>
          <div class="anki-stat"><span class="n">${stats.new}</span><span class="l">Yeni</span></div>
          <div class="anki-stat"><span class="n">${state.cardsReviewed || 0}</span><span class="l">Toplam tekrar</span></div>
        </div>
      </article>

      <div class="settings-actions anki-start-stack">
        <button type="button" class="btn btn-primary" data-start="due">Çalış (${dueCards.length} kart)</button>
        <button type="button" class="btn btn-ghost sand-btn" data-start="new">Yalnız yeni (20)</button>
        <button type="button" class="btn btn-ghost sand-btn" data-start="level">Seviye kelimeleri (${levelId.toUpperCase()})</button>
        <button type="button" class="btn btn-ghost sand-btn" data-start="custom">Benim kelimelerim (${customCards.length})</button>
        <button type="button" class="btn btn-ghost sand-btn" data-start="patterns">Kalıplar (50)</button>
      </div>

      <p class="teacher-note">Kartı aç → hatırla → Tekrar / Zor / İyi / Kolay. Unuttukların yarın yine gelir.</p>
    </section>`);

    const pools = {
      due: dueCards,
      new: shuffle(newCards).slice(0, 20),
      level: shuffle(levelCards).slice(0, 40),
      custom: shuffle(customCards).slice(0, 40),
      patterns: shuffle(patternCards).slice(0, 50)
    };

    section.querySelectorAll("[data-start]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pool = pools[btn.dataset.start] || [];
        if (!pool.length) {
          alert("Bu destede kart yok.");
          return;
        }
        ankiPool = btn.dataset.start;
        ankiSession = {
          queue: shuffle(pool),
          index: 0,
          flipped: false,
          done: 0,
          again: 0,
          good: 0
        };
        render();
      });
    });

    return section;
  }

  function renderAnkiSession(state) {
    const s = ankiSession;
    if (!s || !s.queue.length || s.index >= s.queue.length) {
      const done = s ? s.done : 0;
      const again = s ? s.again : 0;
      const good = s ? s.good : 0;
      ankiSession = null;
      const wrap = el(`<section class="view anki-view list-view">
        <div class="view-intro">
          <p class="eyebrow">Tur bitti</p>
          <h1>${done} kart</h1>
          <p class="lede">İyi: ${good} · Tekrar: ${again}</p>
        </div>
        <button type="button" class="btn btn-primary" id="anki-again-hub">Anki’ye dön</button>
      </section>`);
      wrap.querySelector("#anki-again-hub").onclick = () => {
        view = "anki";
        render();
      };
      return wrap;
    }

    const card = s.queue[s.index];
    const left = s.queue.length - s.index;
    const section = el(`<section class="view anki-view anki-study">
      <div class="anki-top">
        <button type="button" class="back" id="anki-exit">← Çık</button>
        <span class="meta sand-meta">${s.index + 1}/${s.queue.length} · ${left} kaldı</span>
      </div>
      <button type="button" class="anki-card ${s.flipped ? "flipped" : ""}" id="anki-card" aria-label="Kartı çevir">
        <span class="anki-kind">${escapeHtml(card.kind || "")}</span>
        <span class="anki-front greek-line">${escapeHtml(card.front)}</span>
        ${
          s.flipped
            ? `<span class="anki-back">${escapeHtml(card.back)}${card.tip ? `<small>${escapeHtml(card.tip)}</small>` : ""}</span>`
            : `<span class="anki-hint">Göster</span>`
        }
      </button>
      ${
        s.flipped
          ? `<div class="anki-rates">
              <button type="button" class="btn rate-again" data-rate="again">Tekrar</button>
              <button type="button" class="btn rate-hard" data-rate="hard">Zor</button>
              <button type="button" class="btn rate-good" data-rate="good">İyi</button>
              <button type="button" class="btn rate-easy" data-rate="easy">Kolay</button>
            </div>`
          : `<p class="meta sand-meta center">Dokununca cevap açılır</p>`
      }
      <button type="button" class="btn btn-ghost sand-btn" id="anki-speak">Dinle</button>
    </section>`);

    section.querySelector("#anki-exit").onclick = () => {
      ankiSession = null;
      render();
    };
    section.querySelector("#anki-card").onclick = () => {
      if (!ankiSession.flipped) {
        ankiSession.flipped = true;
        render();
      }
    };
    section.querySelector("#anki-speak")?.addEventListener("click", () => {
      const text = s.flipped ? String(card.back).split("\n")[0] : card.front;
      speakGreek(card.front);
    });
    section.querySelectorAll("[data-rate]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const rating = btn.dataset.rate;
        Progress.rateAnkiCard(card.key, rating);
        ankiSession.done += 1;
        if (rating === "again") {
          ankiSession.again += 1;
          // push back a few cards later
          const insertAt = Math.min(ankiSession.queue.length, ankiSession.index + 3 + Math.floor(Math.random() * 3));
          ankiSession.queue.splice(insertAt, 0, card);
        } else {
          ankiSession.good += 1;
        }
        ankiSession.index += 1;
        ankiSession.flipped = false;
        render();
      });
    });

    return section;
  }

  function findTaskMeta(taskId) {
    for (const level of CURRICULUM.levels) {
      for (const unit of level.units) {
        const task = unit.tasks.find((t) => t.id === taskId);
        if (task) return { level, unit, task };
      }
    }
    return null;
  }

  function openLesson(taskId, fromView) {
    activeTaskId = taskId;
    activeAssignmentKind = activeAssignmentKind || "new";
    lessonReturnView = "today";
    view = "lesson";
    render();
  }

  function renderLesson(state) {
    const meta = findTaskMeta(activeTaskId);
    if (!meta) {
      view = "today";
      return renderToday(state);
    }
    const { level, unit, task } = meta;
    const lesson = typeof Lessons !== "undefined" ? Lessons.get(task.id) : null;
    const isReview = activeAssignmentKind === "review";
    const assign = Progress.nextTeacherAssignment();
    const reason =
      isReview && assign && assign.assignment && assign.assignment.id === activeAssignmentId
        ? assign.reason
        : isReview
          ? (CURRICULUM.pedagogy?.reviewReasons?.interleave || "Tekrar zamanı.")
          : "";
    const typeLabel = (CURRICULUM.typeLabels && CURRICULUM.typeLabels[task.type]) || task.type;
    const mins = isReview ? Math.max(10, Math.round((task.minutes || 20) * 0.55)) : task.minutes;

    const theoryHtml = (lesson?.theory || [task.detail])
      .map((p) => {
        if (typeof p === "object" && p && p.title) {
          return `<h3 class="lesson-h3">${escapeHtml(p.title)}</h3><p class="lesson-p">${escapeHtml(p.text || "")}</p>`;
        }
        const raw = String(p);
        const m = raw.match(/^([^:]{3,48}):\s+([\s\S]+)$/);
        if (m) {
          return `<h3 class="lesson-h3">${escapeHtml(m[1])}</h3><p class="lesson-p">${escapeHtml(m[2])}</p>`;
        }
        return `<p class="lesson-p">${escapeHtml(raw)}</p>`;
      })
      .join("");
    const examples = lesson?.examples || [];
    const steps = isReview
      ? [
          "Kitaba bakmadan: konuyu 3 cümleyle Türkçe özetle.",
          "Örneklerden en az 3 tanesini ezbere Yunanca söyle (dokunup dinle, sonra sen).",
          "Aynı kalıpla 2 yeni cümle üret (kendi hayatından).",
          "Zayıf hissettiğin noktayı bir satır not et — yarın yine sorabilirim."
        ]
      : lesson?.steps || [];
    const practice = isReview ? [] : lesson?.practice || [];
    const check = isReview
      ? [
          "Ezbere en az 3 örnek söyleyebildim.",
          "Kendi 2 cümlemi kurdum.",
          "Karışık nokta varsa kelime/kalıp listesine ekledim."
        ]
      : lesson?.check || [];
    const table = isReview ? null : lesson?.table;

    const section = el(`<section class="view lesson-view ${isReview ? "lesson-review" : ""}">
      <button class="back" id="lesson-back">← Geri</button>
      <header class="lesson-hero">
        <p class="eyebrow">${isReview ? "Tekrar · " : ""}${escapeHtml(level.code)} · ${escapeHtml(unit.title)} · ${escapeHtml(typeLabel)} · ~${mins} dk</p>
        <h1>${isReview ? "Tekrar: " : ""}${escapeHtml(task.title)}</h1>
        <p class="lede">${escapeHtml(isReview ? reason || task.detail : lesson?.goal || task.detail)}</p>
      </header>

      ${
        isReview
          ? `<article class="lesson-block review-why">
              <h2>Neden tekrar?</h2>
              <p class="lesson-p">${escapeHtml(reason)}</p>
              <p class="lesson-p">Ağırlık: ${Progress.taskWeight(task)}/6 · Aralıklı tekrar ile kalıcılaştırıyoruz.</p>
            </article>`
          : ""
      }

      <article class="lesson-block">
        <h2>${isReview ? "Hızlı hatırlatma" : "Konu"}</h2>
        ${theoryHtml}
      </article>

      ${
        table
          ? `<article class="lesson-block">
              <h2>${escapeHtml(table.title || "Tablo")}</h2>
              <div class="lesson-table-wrap"><table class="lesson-table">
                <thead><tr>${(table.headers || []).map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>
                <tbody>${(table.rows || [])
                  .map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join("")}</tr>`)
                  .join("")}</tbody>
              </table></div>
            </article>`
          : ""
      }

      ${
        examples.length
          ? `<article class="lesson-block">
              <h2>Örnekler</h2>
              <ul class="lesson-examples" id="lesson-ex"></ul>
            </article>`
          : ""
      }

      ${
        steps.length
          ? `<article class="lesson-block">
              <h2>${isReview ? "Tekrar adımları" : "Şimdi yap"}</h2>
              <ol class="lesson-steps">${steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
            </article>`
          : ""
      }

      ${
        practice.length
          ? `<article class="lesson-block">
              <h2>Alıştırma</h2>
              <ul class="lesson-steps">${practice.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
            </article>`
          : ""
      }

      ${
        check.length
          ? `<article class="lesson-block">
              <h2>Bitirmeden kontrol</h2>
              <ul class="lesson-check">${check.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
            </article>`
          : ""
      }

      <div class="lesson-actions">
        ${!isReview && lesson?.train ? `<button type="button" class="btn btn-ghost" id="lesson-train">İlgili antrenman</button>` : ""}
        <button type="button" class="btn btn-primary" id="lesson-done">${
          isReview ? "Tekrarı tamamladım" : "Dersi tamamladım"
        }</button>
      </div>
    </section>`);

    const exList = section.querySelector("#lesson-ex");
    if (exList) {
      examples.forEach((item) => {
        const li = el(`<li>
          <button type="button" class="lesson-ex-btn">
            <span class="greek-line">${escapeHtml(item.el)}</span>
            <span class="meta">${escapeHtml(item.tr || "")}</span>
          </button>
        </li>`);
        li.querySelector("button").addEventListener("click", () => speakGreek(item.el));
        exList.appendChild(li);
      });
    }

    section.querySelector("#lesson-back").onclick = () => {
      activeTaskId = null;
      activeAssignmentId = null;
      activeAssignmentKind = null;
      view = "today";
      render();
    };
    section.querySelector("#lesson-done").onclick = () => {
      if (activeAssignmentId) {
        Progress.completeAssignment(activeAssignmentId);
      } else if (!isReview) {
        Progress.toggleTask(task.id, task.minutes || 0);
      }
      activeTaskId = null;
      activeAssignmentId = null;
      activeAssignmentKind = null;
      view = "today";
      render();
    };
    section.querySelector("#lesson-train")?.addEventListener("click", () => {
      startTrainer(lesson.train);
      render();
    });

    bindScrollTop(section);
    return section;
  }

  function taskRow(level, unit, task) {
    const done = Progress.isDone(task.id);
    const row = el(`<li class="task-row ${done ? "is-done" : ""}">
      <button class="check" aria-pressed="${done}" aria-label="Görevi işaretle"></button>
      <div class="task-body" role="button" tabindex="0">
        <div class="task-title-row">
          <strong>${escapeHtml(task.title)}</strong>
          ${typeBadge(task.type)}
        </div>
        <p>${escapeHtml(task.detail)}</p>
        <span class="meta">${escapeHtml(level.code)} · ${escapeHtml(unit.title)} · ~${task.minutes} dk · Dersi aç</span>
      </div>
    </li>`);
    row.querySelector(".check").addEventListener("click", (e) => {
      e.stopPropagation();
      Progress.toggleTask(task.id, task.minutes || 0);
      render();
    });
    const open = () => openLesson(task.id, view === "level" ? "level" : view === "yds" ? "yds" : "roadmap");
    row.querySelector(".task-body").addEventListener("click", open);
    row.querySelector(".task-body").addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
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
          openLesson(task.id, "roadmap");
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
      const modes = ["gender", "aspect", "number", "verb", "aorist", "time", "alpha", "translate", "prep", "conditional", "pronoun", "particle", "compare", "subjunctive", "collocation", "imperative", "perfect", "months", "genitive", "opposite", "ordinal", "direction", "adjective", "question", "connector", "frequency", "emotion", "plural", "relative", "restaurant", "case", "negimp", "dblpron", "timeadv", "transport", "jobs"];
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
      const modes = ["gender", "aorist", "number", "prep", "translate", "adjective", "weekdays", "polite", "particle", "opposite", "ordinal", "direction", "question", "connector", "emotion", "plural", "relative", "restaurant", "negimp", "timeadv", "transport", "jobs", "weather", "measure", "office", "pattern"];
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
    if (mode === "plural") {
      const item = EXTRAS5.plurals[Math.floor(Math.random() * EXTRAS5.plurals.length)];
      const wrong = shuffle(EXTRAS5.plurals.filter((x) => x.pl !== item.pl)).slice(0, 3).map((x) => x.pl);
      return {
        kind: "plural",
        prompt: item.sg,
        sub: `Çoğul hali? (${item.tr})`,
        answer: item.pl,
        options: shuffle([item.pl, ...wrong]),
        speak: item.pl,
        input: false
      };
    }
    if (mode === "falsefriend") {
      const item = EXTRAS5.falseFriends[Math.floor(Math.random() * EXTRAS5.falseFriends.length)];
      const wrong = shuffle(EXTRAS5.falseFriends.filter((x) => x.tr !== item.tr)).slice(0, 3).map((x) => x.tr);
      return {
        kind: "falsefriend",
        prompt: item.el,
        // tuzaga dusme -> proper Turkish
    sub: "Gerçek anlamı? (tuzağa düşme)",
        answer: item.tr,
        options: shuffle([item.tr, ...wrong]),
        hint: item.trap || item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "relative") {
      const item = EXTRAS5.relative[Math.floor(Math.random() * EXTRAS5.relative.length)];
      const wrong = shuffle(EXTRAS5.relative.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "relative",
        prompt: item.tr,
        sub: "που ile göreli cümle?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "restaurant") {
      const item = EXTRAS5.restaurant[Math.floor(Math.random() * EXTRAS5.restaurant.length)];
      const wrong = shuffle(EXTRAS5.restaurant.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "restaurant",
        prompt: item.tr,
        sub: "Restoran ifadesi?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "case") {
      const item = EXTRAS5.cases[Math.floor(Math.random() * EXTRAS5.cases.length)];
      const wrong = shuffle(EXTRAS5.cases.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "case",
        prompt: item.tr,
        sub: "Doğru durum / yapı?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "negimp") {
      const item = EXTRAS6.negImperative[Math.floor(Math.random() * EXTRAS6.negImperative.length)];
      const wrong = shuffle(EXTRAS6.negImperative.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "negimp",
        prompt: item.tr,
        sub: "Olumsuz emir?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "dblpron") {
      const item = EXTRAS6.doublePronoun[Math.floor(Math.random() * EXTRAS6.doublePronoun.length)];
      const wrong = shuffle(EXTRAS6.doublePronoun.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "dblpron",
        prompt: item.tr,
        sub: "Çift zamir yapısı?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "timeadv") {
      const item = EXTRAS6.timeAdverbs[Math.floor(Math.random() * EXTRAS6.timeAdverbs.length)];
      const wrong = shuffle(EXTRAS6.timeAdverbs.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "timeadv",
        prompt: item.tr,
        sub: "Zaman zarfı?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "transport") {
      const item = EXTRAS6.transport[Math.floor(Math.random() * EXTRAS6.transport.length)];
      const wrong = shuffle(EXTRAS6.transport.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "transport",
        prompt: item.tr,
        sub: "Ulaşım / yol?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "jobs") {
      const item = EXTRAS6.jobs[Math.floor(Math.random() * EXTRAS6.jobs.length)];
      const wrong = shuffle(EXTRAS6.jobs.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "jobs",
        prompt: item.tr,
        sub: "Meslek?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "phone") {
      const item = EXTRAS6.phone[Math.floor(Math.random() * EXTRAS6.phone.length)];
      const wrong = shuffle(EXTRAS6.phone.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "phone",
        prompt: item.tr,
        sub: "Telefon ifadesi?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "weather") {
      const item = EXTRAS7.weatherTalk[Math.floor(Math.random() * EXTRAS7.weatherTalk.length)];
      const wrong = shuffle(EXTRAS7.weatherTalk.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "weather",
        prompt: item.tr,
        sub: "Hava kalıbı?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "measure") {
      const item = EXTRAS7.measures[Math.floor(Math.random() * EXTRAS7.measures.length)];
      const wrong = shuffle(EXTRAS7.measures.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "measure",
        prompt: item.tr,
        sub: "Ölçü / miktar?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "office") {
      const item = EXTRAS7.office[Math.floor(Math.random() * EXTRAS7.office.length)];
      const wrong = shuffle(EXTRAS7.office.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "office",
        prompt: item.tr,
        sub: "Ofis / iş kalıbı?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "writeframe") {
      const item = EXTRAS7.writingFrames[Math.floor(Math.random() * EXTRAS7.writingFrames.length)];
      const wrong = shuffle(EXTRAS7.writingFrames.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "writeframe",
        prompt: item.tr,
        sub: "Yazma çerçevesi?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "howmuch") {
      const item = EXTRAS7.quantityQ[Math.floor(Math.random() * EXTRAS7.quantityQ.length)];
      const wrong = shuffle(EXTRAS7.quantityQ.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "howmuch",
        prompt: item.tr,
        sub: "Πόσο… sorusu?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "superlative") {
      const item = EXTRAS8.superlative[Math.floor(Math.random() * EXTRAS8.superlative.length)];
      const wrong = shuffle(EXTRAS8.superlative.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "superlative",
        prompt: item.tr,
        sub: "Üstünlük (en…)?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "posimp") {
      const item = EXTRAS8.posImperative[Math.floor(Math.random() * EXTRAS8.posImperative.length)];
      const wrong = shuffle(EXTRAS8.posImperative.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "posimp",
        prompt: item.tr,
        sub: "Olumlu emir?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "familytalk") {
      const item = EXTRAS8.familyTalk[Math.floor(Math.random() * EXTRAS8.familyTalk.length)];
      const wrong = shuffle(EXTRAS8.familyTalk.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "familytalk",
        prompt: item.tr,
        sub: "Aile sohbeti?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "healthtalk") {
      const item = EXTRAS8.healthTalk[Math.floor(Math.random() * EXTRAS8.healthTalk.length)];
      const wrong = shuffle(EXTRAS8.healthTalk.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "healthtalk",
        prompt: item.tr,
        sub: "Sağlık ifadesi?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "pasttime") {
      const item = EXTRAS8.pastTime[Math.floor(Math.random() * EXTRAS8.pastTime.length)];
      const wrong = shuffle(EXTRAS8.pastTime.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "pasttime",
        prompt: item.tr,
        sub: "Geçmiş zaman zarfı?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "futuretime") {
      const item = EXTRAS9.futureTime[Math.floor(Math.random() * EXTRAS9.futureTime.length)];
      const wrong = shuffle(EXTRAS9.futureTime.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "futuretime",
        prompt: item.tr,
        sub: "Gelecek zaman zarfı?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split(" / ")[0],
        input: false
      };
    }
    if (mode === "habits") {
      const item = EXTRAS9.habits[Math.floor(Math.random() * EXTRAS9.habits.length)];
      const wrong = shuffle(EXTRAS9.habits.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "habits",
        prompt: item.tr,
        sub: "Alışkanlık cümlesi?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "shoptalk") {
      const item = EXTRAS9.shopTalk[Math.floor(Math.random() * EXTRAS9.shopTalk.length)];
      const wrong = shuffle(EXTRAS9.shopTalk.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "shoptalk",
        prompt: item.tr,
        sub: "Mağaza kalıbı?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el,
        input: false
      };
    }
    if (mode === "emotionsent") {
      const item = EXTRAS9.emotionSent[Math.floor(Math.random() * EXTRAS9.emotionSent.length)];
      const wrong = shuffle(EXTRAS9.emotionSent.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "emotionsent",
        prompt: item.tr,
        sub: "Duygu cümlesi?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.split("/")[0].trim(),
        input: false
      };
    }
    if (mode === "prepplus") {
      const item = EXTRAS9.prepositionPlus[Math.floor(Math.random() * EXTRAS9.prepositionPlus.length)];
      const wrong = shuffle(EXTRAS9.prepositionPlus.filter((x) => x.el !== item.el)).slice(0, 3).map((x) => x.el);
      return {
        kind: "prepplus",
        prompt: item.tr,
        sub: "Yer edatı / konum?",
        answer: item.el,
        options: shuffle([item.el, ...wrong]),
        hint: item.tip,
        speak: item.el.replace("…", ""),
        input: false
      };
    }
    if (mode === "pattern") {
      const bank = collectAllPatterns(Progress.load());
      if (!bank.length) return null;
      const item = bank[Math.floor(Math.random() * bank.length)];
      const askFrame = Math.random() < 0.5;
      if (askFrame) {
        const wrong = shuffle(bank.filter((x) => x.frame !== item.frame)).slice(0, 3).map((x) => x.frame);
        return {
          kind: "pattern",
          prompt: item.tr,
          sub: `Kalıp iskeleti? [${item.cat} · ${item.level}]`,
          answer: item.frame,
          options: shuffle([item.frame, ...wrong]),
          hint: item.eg,
          speak: item.eg,
          input: false
        };
      }
      const wrong = shuffle(bank.filter((x) => x.eg !== item.eg)).slice(0, 3).map((x) => x.eg);
      return {
        kind: "pattern",
        prompt: item.frame,
        sub: `Örnek cümle? (${item.tr})`,
        answer: item.eg,
        options: shuffle([item.eg, ...wrong]),
        hint: item.cat,
        speak: item.eg,
        input: false
      };
    }
    if (mode === "patternfill") {
      const bank = collectAllPatterns(Progress.load());
      if (!bank.length) return null;
      const item = bank[Math.floor(Math.random() * bank.length)];
      return {
        kind: "patternfill",
        prompt: item.frame,
        sub: "Bu iskelete uygun örnek cümleyi yaz (yaklaşık kabul)",
        answer: item.eg,
        options: null,
        hint: item.tr + " · örn: " + item.eg,
        speak: item.eg,
        input: true
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
    plural: "Çoğul",
    falsefriend: "False friend",
    relative: "που göreli",
    restaurant: "Restoran",
    case: "Durum / edat",
    negimp: "Olumsuz emir",
    dblpron: "Çift zamir",
    timeadv: "Zaman zarfı",
    transport: "Ulaşım",
    jobs: "Meslek",
    phone: "Telefon",
    weather: "Hava",
    measure: "Ölçü",
    office: "Ofis",
    writeframe: "Yazma kalıbı",
    howmuch: "Πόσο…",
    superlative: "Üstünlük",
    posimp: "Olumlu emir",
    familytalk: "Aile sohbeti",
    healthtalk: "Sağlık",
    pasttime: "Geçmiş zarf",
    futuretime: "Gelecek zarf",
    habits: "Alışkanlık",
    shoptalk: "Mağaza",
    emotionsent: "Duygu cümle",
    prepplus: "Yer edatı",
    pattern: "Cümle kalıbı",
    patternfill: "Kalıp doldur",
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
      finishTrainerSession();
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
        <button type="button" class="btn btn-primary" id="open-pattern-bank">Tüm kalıplar</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="pattern">Kalıp antrenmanı</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="speed10">Hızlı 10</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="exam">Sınav</button>
        <button type="button" class="btn btn-ghost sand-btn" data-train="review">Yanlışlar (${wrongN})</button>
      </div>
      <details class="train-cat">
        <summary>Tüm antrenmanlar</summary>
        <div class="quick-train multi">
          ${btn("alpha", "Alfabe")}${btn("gender", "Madde")}${btn("number", "Sayı")}${btn("bignum", "100+")}${btn("ordinal", "Sıra")}${btn("weekdays", "Gün")}${btn("months", "Ay")}${btn("time", "Saat")}${btn("question", "Soru")}${btn("match", "Eşleştir")}
          ${btn("verb", "Fiil")}${btn("aspect", "Aspect")}${btn("aorist", "Aorist")}${btn("perfect", "Perfect")}${btn("imperative", "Emir")}${btn("posimp", "Έλα")}${btn("negimp", "Μην")}${btn("subjunctive", "να")}${btn("particle", "θα/να")}${btn("reflexive", "Dönüşlü")}
          ${btn("pronoun", "Zamir")}${btn("dblpron", "Çift zamir")}${btn("prep", "Edat")}${btn("genitive", "Genitif")}${btn("case", "Durum")}${btn("adjective", "Sıfat")}${btn("compare", "Karşılaştır")}${btn("superlative", "En…")}${btn("opposite", "Zıt")}${btn("synonym", "Eşanlam")}${btn("connector", "Bağlaç")}${btn("relative", "που")}${btn("plural", "Çoğul")}${btn("conditional", "αν")}${btn("passive", "Pasif")}${btn("polite", "Nazik")}${btn("collocation", "Kalıp")}
          ${btn("direction", "Yön")}${btn("timeadv", "Zaman")}${btn("pasttime", "Geçmiş")}${btn("futuretime", "Gelecek")}${btn("frequency", "Sıklık")}${btn("habits", "Alışkanlık")}${btn("emotion", "Duygu")}${btn("emotionsent", "Duygu cümle")}${btn("body", "Vücut")}${btn("weather", "Hava")}${btn("measure", "Ölçü")}${btn("howmuch", "Πόσο")}${btn("prepplus", "Yer edatı")}${btn("transport", "Ulaşım")}${btn("jobs", "Meslek")}${btn("phone", "Telefon")}${btn("office", "Ofis")}${btn("familytalk", "Aile")}${btn("healthtalk", "Sağlık")}${btn("shoptalk", "Mağaza")}${btn("restaurant", "Restoran")}${btn("writeframe", "Yazı kalıbı")}${btn("pattern", "Cümle kalıbı")}${btn("patternfill", "Kalıp doldur")}${btn("falsefriend", "False friend")}${btn("fixerror", "Düzelt")}${btn("scramble", "Cümle")}${btn("dictation", "Dikte")}${btn("listen", "Dinle")}${btn("translate", "TR→EL")}
          <button type="button" class="btn btn-ghost sand-btn" data-train="dialogue">Diyalog</button>
          <button type="button" class="btn btn-ghost sand-btn" data-train="write">Yazma</button>
        </div>
      </details>`;
  }

  function renderPatternsBank(state) {
    const bank = collectAllPatterns(state || Progress.load());
    const cats = [...new Set(bank.map((p) => p.cat).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr"));
    const levels = [...new Set(bank.map((p) => p.level).filter(Boolean))].sort((a, b) => {
      const order = ["a0", "a1", "a2", "b1", "b2", "c1", "c2"];
      return order.indexOf(a) - order.indexOf(b);
    });
    const q = (patternSearch || "").trim().toLowerCase();
    const filtered = bank.filter((p) => {
      if (patternFilterCat !== "all" && p.cat !== patternFilterCat) return false;
      if (patternFilterLevel !== "all" && p.level !== patternFilterLevel) return false;
      if (!q) return true;
      const hay = `${p.frame} ${p.eg} ${p.tr} ${p.cat}`.toLowerCase();
      return hay.includes(q);
    });

    const catOptions = [`<option value="all">Tüm kategoriler</option>`]
      .concat(cats.map((c) => `<option value="${escapeHtml(c)}" ${patternFilterCat === c ? "selected" : ""}>${escapeHtml(c)}</option>`))
      .join("");
    const levelOptions = [`<option value="all">Tüm seviyeler</option>`]
      .concat(
        levels.map(
          (lv) =>
            `<option value="${escapeHtml(lv)}" ${patternFilterLevel === lv ? "selected" : ""}>${escapeHtml(
              String(lv).toUpperCase()
            )}</option>`
        )
      )
      .join("");

    const section = el(`<section class="view patterns-view list-view">
      <div class="view-intro">
        <p class="eyebrow">Liste</p>
        <h1>Kalıplar</h1>
        <p class="lede">${bank.length} kalıp · ${filtered.length} gösteriliyor</p>
      </div>

      <form class="add-form sand-panel" id="add-pattern-form">
        <p class="add-form-title">Kalıp ekle</p>
        <label><span>İskelet</span><input name="frame" required maxlength="120" autocomplete="off" placeholder="Θέλω + nesne" /></label>
        <label><span>Örnek (Yunanca)</span><input name="eg" required maxlength="160" autocomplete="off" placeholder="Θέλω έναν καφέ." /></label>
        <label><span>Türkçe</span><input name="tr" maxlength="160" autocomplete="off" placeholder="… istiyorum" /></label>
        <div class="pattern-filter-row">
          <label><span>Kategori</span><input name="cat" maxlength="40" autocomplete="off" placeholder="benim" value="benim" /></label>
          <label><span>Seviye</span>
            <select name="level">
              ${["a0", "a1", "a2", "b1", "b2", "c1", "c2"].map((lv) => `<option value="${lv}" ${lv === "a1" ? "selected" : ""}>${lv.toUpperCase()}</option>`).join("")}
            </select>
          </label>
        </div>
        <button type="submit" class="btn btn-primary">Ekle</button>
      </form>

      <div class="pattern-filters">
        <input type="search" id="pattern-q" class="pattern-search" placeholder="Ara…" value="${escapeHtml(
          patternSearch
        )}" autocomplete="off" />
        <div class="pattern-filter-row">
          <select id="pattern-cat" aria-label="Kategori">${catOptions}</select>
          <select id="pattern-level" aria-label="Seviye">${levelOptions}</select>
        </div>
      </div>
      <ul class="pattern-list" id="pattern-list"></ul>
      ${filtered.length ? "" : `<p class="meta sand-meta">Eşleşen kalıp yok.</p>`}
    </section>`);

    const list = section.querySelector("#pattern-list");
    filtered.forEach((p) => {
      const li = el(`<li class="pattern-item">
        <div class="pattern-card word-row">
          <button type="button" class="word-speak">
            <span class="pattern-meta"><span class="pill muted">${escapeHtml(
              String(p.level || "").toUpperCase()
            )}</span><span class="pill muted">${escapeHtml(p.cat || "")}</span>${p.custom ? `<span class="pill muted">benim</span>` : ""}</span>
            <strong class="pattern-frame">${escapeHtml(p.frame)}</strong>
            <span class="pattern-eg">${escapeHtml(p.eg)}</span>
            <span class="pattern-tr">${escapeHtml(p.tr || "")}</span>
          </button>
          ${p.custom ? `<button type="button" class="btn-del" data-del="${escapeHtml(p.id)}" aria-label="Sil">Sil</button>` : ""}
        </div>
      </li>`);
      li.querySelector(".word-speak").addEventListener("click", () => speakGreek(p.eg));
      li.querySelector("[data-del]")?.addEventListener("click", () => {
        Progress.removeCustomPattern(p.id);
        render();
      });
      list.appendChild(li);
    });

    const applyFilters = () => {
      patternSearch = section.querySelector("#pattern-q").value || "";
      patternFilterCat = section.querySelector("#pattern-cat").value || "all";
      patternFilterLevel = section.querySelector("#pattern-level").value || "all";
      render();
    };

    let searchTimer = null;
    section.querySelector("#pattern-q").addEventListener("input", () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(applyFilters, 180);
    });
    section.querySelector("#pattern-cat").addEventListener("change", applyFilters);
    section.querySelector("#pattern-level").addEventListener("change", applyFilters);

    section.querySelector("#add-pattern-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      Progress.addCustomPattern({
        frame: fd.get("frame"),
        eg: fd.get("eg"),
        tr: fd.get("tr"),
        cat: fd.get("cat"),
        level: fd.get("level")
      });
      patternSearch = "";
      render();
    });

    return section;
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
                                        : id === "nature"
                                          ? "Doğa"
                                          : id === "sports"
                                            ? "Spor"
                                            : id === "money"
                                              ? "Para"
                                              : id === "clothes"
                                                ? "Giysi"
                                                : id === "hotel"
                                                  ? "Otel"
                                                  : id === "animals"
                                                    ? "Hayvanlar"
                                                    : id === "kitchen"
                                                      ? "Mutfak"
                                                      : id === "travel2"
                                                        ? "Seyahat+"
                                                        : id === "feelings2"
                                                          ? "Duygular+"
                                                          : id === "school2"
                                                            ? "Okul+"
                                                            : id === "bank"
                                                              ? "Banka"
                                                              : id === "internet"
                                                                ? "İnternet"
                                                                : id === "bathroom"
                                                                  ? "Banyo"
                                                                  : id === "street"
                                                                    ? "Sokak"
                                                                    : id === "celebration"
                                                                      ? "Kutlama"
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
      section.querySelector("#open-pattern-bank")?.addEventListener("click", () => {
        view = "patterns";
        render();
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
        <div class="install-home-block" id="install-home-block">
          <button type="button" class="btn btn-primary" id="install-home-btn" style="width:100%;margin-top:12px">Ana ekrana ekle</button>
          <p class="meta install-home-hint" id="install-home-hint" hidden></p>
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

    wireInstallHomeButton(section);

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

  let deferredInstall = null;

  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function isIos() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }

  function setupInstallPrompt() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredInstall = e;
    });
    window.addEventListener("appinstalled", () => {
      deferredInstall = null;
    });
  }

  async function promptInstall() {
    if (!deferredInstall) return false;
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall = null;
    return true;
  }

  function wireInstallHomeButton(section) {
    const btn = section.querySelector("#install-home-btn");
    const hint = section.querySelector("#install-home-hint");
    if (!btn) return;

    if (isStandalone()) {
      btn.textContent = "Ana ekranda kurulu";
      btn.disabled = true;
      if (hint) {
        hint.hidden = false;
        hint.textContent = "Uygulama zaten ana ekrandan açılıyor.";
      }
      return;
    }

    btn.addEventListener("click", async () => {
      const ok = await promptInstall();
      if (ok) {
        if (hint) {
          hint.hidden = false;
          hint.textContent = "Kurulum tamam / pencere açıldı.";
        }
        btn.textContent = "Ana ekrana eklendi";
        return;
      }
      if (hint) {
        hint.hidden = false;
        if (isIos()) {
          hint.textContent = "Safari → Paylaş (□↑) → Ana Ekrana Ekle.";
        } else {
          hint.textContent = "Chrome menü (⋮) → Uygulamayı yükle / Ana ekrana ekle.";
        }
      }
    });
  }

  function init() {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    Progress.refreshBadges();
    document.getElementById("install-bar")?.remove();
    setupInstallPrompt();
    render();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => App.init());
