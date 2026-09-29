const Progress = (() => {
  const KEY = "odigos_progress_v1";
  const SETTINGS_KEY = "odigos_settings_v1";

  const defaultState = () => ({
    completed: {},
    currentLevelId: "a0",
    startDate: null,
    lastActiveDate: null,
    streak: 0,
    longestStreak: 0,
    totalMinutes: 0,
    dailyMode: "standard",
    onboardingDone: false,
    displayName: "",
    cards: {},
    cardsReviewed: 0,
    lastDiagnostic: null,
    journal: [],
    drillStats: { clozeCorrect: 0, clozeTotal: 0, readingCorrect: 0, readingTotal: 0 },
    speakDone: {},
    studyLog: {},
    trainerStats: { alpha: 0, verb: 0, gender: 0, aspect: 0, number: 0, dictation: 0, time: 0, aorist: 0, translate: 0, challenge: 0 },
    challengesWon: 0,
    unlockedBadges: {}
  });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      return { ...defaultState(), ...JSON.parse(raw) };
    } catch {
      return defaultState();
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function yesterdayStr() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  }

  function touchActivity(state) {
    const today = todayStr();
    if (state.lastActiveDate === today) return state;
    if (state.lastActiveDate === yesterdayStr()) {
      state.streak = (state.streak || 0) + 1;
    } else {
      state.streak = 1;
    }
    state.longestStreak = Math.max(state.longestStreak || 0, state.streak);
    state.lastActiveDate = today;
    if (!state.startDate) state.startDate = today;
    return state;
  }

  function isDone(taskId) {
    return !!load().completed[taskId];
  }

  function toggleTask(taskId, minutes = 0) {
    const state = load();
    if (state.completed[taskId]) {
      delete state.completed[taskId];
      state.totalMinutes = Math.max(0, (state.totalMinutes || 0) - (minutes || 0));
    } else {
      state.completed[taskId] = { at: new Date().toISOString(), minutes };
      state.totalMinutes = (state.totalMinutes || 0) + (minutes || 0);
      touchActivity(state);
    }
    save(state);
    refreshBadges();
    return state;
  }

  function setLevel(levelId) {
    const state = load();
    state.currentLevelId = levelId;
    save(state);
    return state;
  }

  function completeOnboarding({ levelId, name, dailyMode }) {
    const state = load();
    state.onboardingDone = true;
    state.currentLevelId = levelId;
    state.displayName = name || "";
    state.dailyMode = dailyMode || "standard";
    state.startDate = todayStr();
    save(state);
    return state;
  }

  function setDailyMode(mode) {
    const state = load();
    state.dailyMode = mode;
    save(state);
    return state;
  }

  function resetAll() {
    localStorage.removeItem(KEY);
    return defaultState();
  }

  function cardKey(deckId, el) {
    return `${deckId}::${el}`;
  }

  function reviewCard(deckId, el, knew) {
    const state = load();
    const key = cardKey(deckId, el);
    const prev = state.cards[key] || { box: 1, reviews: 0 };
    if (knew) {
      prev.box = Math.min(5, (prev.box || 1) + 1);
    } else {
      prev.box = 1;
    }
    prev.reviews = (prev.reviews || 0) + 1;
    prev.last = todayStr();
    state.cards[key] = prev;
    state.cardsReviewed = (state.cardsReviewed || 0) + 1;
    touchActivity(state);
    save(state);
    return state;
  }

  function saveDiagnostic(result) {
    const state = load();
    state.lastDiagnostic = { ...result, at: new Date().toISOString() };
    save(state);
    return state;
  }

  function addJournal(entry) {
    const state = load();
    state.journal = state.journal || [];
    state.journal.unshift({
      id: "j" + Date.now(),
      text: String(entry.text || "").slice(0, 500),
      tag: entry.tag || "genel",
      at: new Date().toISOString()
    });
    state.journal = state.journal.slice(0, 100);
    touchActivity(state);
    save(state);
    return state;
  }

  function removeJournal(id) {
    const state = load();
    state.journal = (state.journal || []).filter((j) => j.id !== id);
    save(state);
    return state;
  }

  function recordDrill(kind, correct) {
    const state = load();
    state.drillStats = state.drillStats || { clozeCorrect: 0, clozeTotal: 0, readingCorrect: 0, readingTotal: 0 };
    if (kind === "cloze") {
      state.drillStats.clozeTotal++;
      if (correct) state.drillStats.clozeCorrect++;
    } else if (kind === "reading") {
      state.drillStats.readingTotal++;
      if (correct) state.drillStats.readingCorrect++;
    }
    touchActivity(state);
    save(state);
    return state;
  }

  function markSpeak(id) {
    const state = load();
    state.speakDone = state.speakDone || {};
    state.speakDone[id] = new Date().toISOString();
    touchActivity(state);
    save(state);
    return state;
  }

  function logStudyMinutes(mins) {
    const state = load();
    const d = todayStr();
    state.studyLog = state.studyLog || {};
    state.studyLog[d] = (state.studyLog[d] || 0) + Math.max(0, Number(mins) || 0);
    state.totalMinutes = (state.totalMinutes || 0) + Math.max(0, Number(mins) || 0);
    touchActivity(state);
    save(state);
    return state;
  }

  function bumpTrainer(kind) {
    const state = load();
    state.trainerStats = state.trainerStats || {};
    state.trainerStats[kind] = (state.trainerStats[kind] || 0) + 1;
    touchActivity(state);
    save(state);
    return state;
  }

  function weekActivity() {
    const state = load();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const mins = (state.studyLog || {})[key] || 0;
      const active =
        mins > 0 ||
        Object.values(state.completed || {}).some((c) => (c.at || "").slice(0, 10) === key) ||
        state.lastActiveDate === key;
      days.push({
        key,
        label: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"][d.getDay()],
        mins,
        active: !!active
      });
    }
    return days;
  }

  function winChallenge() {
    const state = load();
    state.challengesWon = (state.challengesWon || 0) + 1;
    touchActivity(state);
    save(state);
    refreshBadges();
    return state;
  }

  function refreshBadges() {
    if (typeof TRAINERS === "undefined" || !TRAINERS.badges) return load();
    const state = load();
    state.unlockedBadges = state.unlockedBadges || {};
    let changed = false;
    TRAINERS.badges.forEach((b) => {
      if (!state.unlockedBadges[b.id] && b.check(state)) {
        state.unlockedBadges[b.id] = new Date().toISOString();
        changed = true;
      }
    });
    if (changed) save(state);
    return state;
  }

  function exportData() {
    return JSON.stringify(load(), null, 2);
  }

  function importData(json) {
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== "object") throw new Error("Geçersiz");
    const merged = { ...defaultState(), ...parsed };
    save(merged);
    return merged;
  }

  function levelStats(level) {
    const state = load();
    let total = 0;
    let done = 0;
    let minutes = 0;
    for (const unit of level.units) {
      for (const task of unit.tasks) {
        total++;
        if (state.completed[task.id]) {
          done++;
          minutes += task.minutes || 0;
        }
      }
    }
    return { total, done, minutes, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  function overallStats() {
    const state = load();
    let total = 0;
    let done = 0;
    for (const level of CURRICULUM.levels) {
      for (const unit of level.units) {
        for (const task of unit.tasks) {
          total++;
          if (state.completed[task.id]) done++;
        }
      }
    }
    return {
      total,
      done,
      pct: total ? Math.round((done / total) * 100) : 0,
      streak: state.streak || 0,
      longestStreak: state.longestStreak || 0,
      totalMinutes: state.totalMinutes || 0,
      currentLevelId: state.currentLevelId
    };
  }

  function nextIncompleteTask(fromLevelId) {
    const state = load();
    const levels = CURRICULUM.levels;
    const startIdx = Math.max(0, levels.findIndex((l) => l.id === (fromLevelId || state.currentLevelId)));
    for (let i = startIdx; i < levels.length; i++) {
      const level = levels[i];
      for (const unit of level.units) {
        for (const task of unit.tasks) {
          if (!state.completed[task.id]) {
            return { level, unit, task };
          }
        }
      }
    }
    for (let i = 0; i < startIdx; i++) {
      const level = levels[i];
      for (const unit of level.units) {
        for (const task of unit.tasks) {
          if (!state.completed[task.id]) {
            return { level, unit, task };
          }
        }
      }
    }
    return null;
  }

  function todayPlan() {
    const state = load();
    const mode = state.dailyMode || "standard";
    const template = CURRICULUM.dailyTemplates[mode] || CURRICULUM.dailyTemplates.standard;
    const wanted = new Set(template.blocks);
    const plan = [];
    const levels = CURRICULUM.levels;
    const startIdx = Math.max(0, levels.findIndex((l) => l.id === state.currentLevelId));

    const collect = (preferTypes) => {
      for (let i = startIdx; i < levels.length && plan.length < 4; i++) {
        const level = levels[i];
        for (const unit of level.units) {
          for (const task of unit.tasks) {
            if (state.completed[task.id]) continue;
            if (preferTypes && !preferTypes.has(task.type)) continue;
            if (plan.some((p) => p.task.id === task.id)) continue;
            plan.push({ level, unit, task });
            if (plan.length >= 4) return;
          }
        }
      }
    };

    collect(wanted);
    if (plan.length < 3) collect(null);
    return { mode, label: template.label, items: plan };
  }

  function unitStats(unit) {
    const state = load();
    let total = unit.tasks.length;
    let done = unit.tasks.filter((t) => state.completed[t.id]).length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  function isLevelUnlocked(levelId) {
    const levels = CURRICULUM.levels;
    const idx = levels.findIndex((l) => l.id === levelId);
    if (idx <= 0) return true;
    const prev = levels[idx - 1];
    const stats = levelStats(prev);
    return stats.pct >= 70;
  }

  return {
    load,
    save,
    isDone,
    toggleTask,
    setLevel,
    completeOnboarding,
    setDailyMode,
    resetAll,
    levelStats,
    overallStats,
    nextIncompleteTask,
    todayPlan,
    unitStats,
    isLevelUnlocked,
    todayStr,
    reviewCard,
    saveDiagnostic,
    cardKey,
    addJournal,
    removeJournal,
    recordDrill,
    markSpeak,
    logStudyMinutes,
    bumpTrainer,
    weekActivity,
    winChallenge,
    refreshBadges,
    exportData,
    importData
  };
})();
