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

    const section = el(`<section class="view today-view">
      <div class="hero-today">
        <p class="eyebrow">Bugünün emri</p>
        <h1>Merhaba${name}</h1>
        <p class="lede">Aktif seviye: <strong>${escapeHtml(level.code)} · ${escapeHtml(level.title)}</strong> — ${escapeHtml(plan.label)}</p>
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

  function renderCards(state) {
    const deckIds = Object.keys(CONTENT.decks);
    if (!cardDeckId) {
      const section = el(`<section class="view cards-view">
        <div class="view-intro">
          <p class="eyebrow">Kelime</p>
          <h1>Kartlar</h1>
          <p class="lede">Leitner kutuları: bilmediğin kartlar sık döner. Önce Yunanca gör, çevir, işaretle.</p>
        </div>
        <ul class="deck-grid" id="deck-grid"></ul>
        <p class="meta sand-meta">Toplam kart tekrarı: ${state.cardsReviewed || 0}</p>
      </section>`);
      const grid = section.querySelector("#deck-grid");
      deckIds.forEach((id) => {
        const n = CONTENT.decks[id].length;
        const label = id === "yds" ? "YDS" : id.toUpperCase();
        const btn = el(`<li><button class="deck-btn" data-deck="${id}"><span class="deck-code">${label}</span><span>${n} kart</span></button></li>`);
        btn.querySelector("button").addEventListener("click", () => {
          startDeck(id);
          render();
        });
        grid.appendChild(btn);
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

  function renderYds() {
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
        <p class="lede">YDS puanı okuma hızı, akademik kelime ve hata analizinden gelir. B2’den itibaren bu hat aktif; C2+ zirve denemeleri.</p>
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
    return section;
  }

  function renderProgress(state) {
    const stats = Progress.overallStats();
    const hours = (stats.totalMinutes / 60).toFixed(1);
    const diag = state.lastDiagnostic;
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
      <h3 class="section-title">Seviye kırılımı</h3>
      <ul class="break-list" id="break-list"></ul>
      <div class="danger-zone">
        <button class="btn btn-ghost" id="reset-btn">Tüm ilerlemeyi sıfırla</button>
      </div>
    </section>`);

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
    render();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => App.init());
