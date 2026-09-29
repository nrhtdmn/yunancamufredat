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
    displayName: ""
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
    todayStr
  };
})();
