const App = (() => {
  let view = "today";
  let selectedLevelId = null;

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

  function render() {
    const state = Progress.load();
    const root = $("#app");
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
              ${CURRICULUM.levels.map((l) => `<option value="${l.id}">${l.code} — ${escapeHtml(l.title)}</option>`).join("")}
            </select>
          </label>
          <p class="hint">8 aydır çalışıyorsan genelde A1–A2 arasıdır. Emin değilsen A1’den başla; eksik birimleri hızlıca işaretlersin.</p>
          <label>
            <span>Günlük tempo</span>
            <select name="mode">
              ${Object.entries(CURRICULUM.dailyTemplates)
                .map(([k, v]) => `<option value="${k}">${escapeHtml(v.label)}</option>`)
                .join("")}
            </select>
          </label>
          <button type="submit" class="btn btn-primary">Yolculuğu başlat</button>
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
          <span class="pill muted">${stats.pct}% tamamlandı</span>
        </div>
      </header>
      <main class="main" id="main"></main>
      <nav class="tabbar" aria-label="Ana menü">
        <button data-view="today" class="${view === "today" ? "active" : ""}"><span class="tab-icon">◎</span>Bugün</button>
        <button data-view="roadmap" class="${view === "roadmap" || view === "level" ? "active" : ""}"><span class="tab-icon">☰</span>Yol</button>
        <button data-view="yds" class="${view === "yds" ? "active" : ""}"><span class="tab-icon">✦</span>YDS</button>
        <button data-view="progress" class="${view === "progress" ? "active" : ""}"><span class="tab-icon">▣</span>İlerleme</button>
      </nav>
    </div>`);

    shell.querySelectorAll(".tabbar button").forEach((btn) => {
      btn.addEventListener("click", () => {
        view = btn.dataset.view;
        selectedLevelId = null;
        render();
      });
    });

    const main = shell.querySelector("#main");
    if (view === "today") main.appendChild(renderToday(state));
    else if (view === "roadmap") main.appendChild(renderRoadmap());
    else if (view === "level") main.appendChild(renderLevel(selectedLevelId || state.currentLevelId));
    else if (view === "yds") main.appendChild(renderYds());
    else if (view === "progress") main.appendChild(renderProgress(state));

    return shell;
  }

  function renderToday(state) {
    const plan = Progress.todayPlan();
    const next = Progress.nextIncompleteTask();
    const name = state.displayName ? `, ${escapeHtml(state.displayName)}` : "";
    const level = CURRICULUM.levels.find((l) => l.id === state.currentLevelId);

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
      <h3 class="section-title">YDS görevleri</h3>
      <ul class="task-list" id="yds-list"></ul>
    </section>`);

    const list = section.querySelector("#yds-list");
    ydsTasks.forEach(({ level, unit, task }) => list.appendChild(taskRow(level, unit, task)));
    return section;
  }

  function renderProgress(state) {
    const stats = Progress.overallStats();
    const hours = (stats.totalMinutes / 60).toFixed(1);
    const section = el(`<section class="view progress-view">
      <div class="view-intro">
        <p class="eyebrow">İlerleme</p>
        <h1>Senin haritan</h1>
        <p class="lede">Başlangıç: ${state.startDate || "—"} · Seri: ${stats.streak} · En uzun seri: ${stats.longestStreak}</p>
      </div>
      <div class="stat-grid">
        <div class="stat"><span class="stat-n">${stats.pct}%</span><span class="stat-l">Genel tamamlanma</span></div>
        <div class="stat"><span class="stat-n">${stats.done}</span><span class="stat-l">Bitmiş görev</span></div>
        <div class="stat"><span class="stat-n">${hours}</span><span class="stat-l">Saat (işaretli)</span></div>
        <div class="stat"><span class="stat-n">${stats.streak}</span><span class="stat-l">Günlük seri</span></div>
      </div>
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
