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
    dailyGoalMin: 45,
    cards: {},
    cardsReviewed: 0,
    lastDiagnostic: null,
    journal: [],
    drillStats: { clozeCorrect: 0, clozeTotal: 0, readingCorrect: 0, readingTotal: 0 },
    speakDone: {},
    studyLog: {},
    trainerStats: { alpha: 0, verb: 0, gender: 0, aspect: 0, number: 0, dictation: 0, time: 0, aorist: 0, translate: 0, challenge: 0 },
    challengesWon: 0,
    unlockedBadges: {},
    writeDone: {},
    wrongQueue: [],
    customWords: [],
    customPatterns: [],
    reviews: {},
    teacherAgenda: null,
    ankiHost: "http://127.0.0.1:8765",
    ankiDeck: "Οδηγός",
    ankiPushed: {}
  });

  const ANKI_INTERVALS = {
    // box → days until next review after "good"
    1: 1,
    2: 3,
    3: 7,
    4: 14,
    5: 30
  };

  function addDays(isoDay, days) {
    const d = new Date((isoDay || todayStr()) + "T12:00:00");
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

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
    state.teacherAgenda = null;
    save(state);
    return state;
  }

  function setDisplayName(name) {
    const state = load();
    state.displayName = String(name || "").trim().slice(0, 40);
    save(state);
    return state;
  }

  function completeOnboarding({ levelId, name, dailyMode, dailyGoalMin }) {
    const state = load();
    state.onboardingDone = true;
    state.currentLevelId = levelId;
    state.displayName = name || "";
    state.dailyMode = dailyMode || "standard";
    if (dailyGoalMin) state.dailyGoalMin = Number(dailyGoalMin) || 45;
    state.startDate = todayStr();
    save(state);
    return state;
  }

  function setDailyGoal(mins) {
    const state = load();
    state.dailyGoalMin = Math.max(10, Math.min(300, Number(mins) || 45));
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
    return rateAnkiCard(cardKey(deckId, el), knew ? "good" : "again");
  }

  function getCardState(key) {
    const state = load();
    const prev = (state.cards || {})[key] || {};
    return {
      box: prev.box || 1,
      reviews: prev.reviews || 0,
      last: prev.last || null,
      due: prev.due || prev.last || todayStr(),
      ease: prev.ease || 2.5,
      interval: prev.interval || 0
    };
  }

  function rateAnkiCard(key, rating) {
    const state = load();
    const prev = state.cards[key] || { box: 1, reviews: 0, ease: 2.5, interval: 0 };
    let box = prev.box || 1;
    let ease = prev.ease || 2.5;
    let interval = prev.interval || 0;
    const today = todayStr();

    if (rating === "again") {
      box = 1;
      interval = 0;
      ease = Math.max(1.3, ease - 0.2);
      prev.due = today;
    } else if (rating === "hard") {
      box = Math.max(1, box);
      interval = Math.max(1, Math.round((interval || 1) * 1.2));
      ease = Math.max(1.3, ease - 0.15);
      prev.due = addDays(today, interval);
    } else if (rating === "easy") {
      box = Math.min(5, box + 2);
      interval = Math.max(ANKI_INTERVALS[box] || 4, Math.round((interval || 1) * ease * 1.3));
      ease = Math.min(3.0, ease + 0.15);
      prev.due = addDays(today, interval);
    } else {
      // good
      box = Math.min(5, box + 1);
      if (!interval) interval = ANKI_INTERVALS[box] || 1;
      else interval = Math.max(ANKI_INTERVALS[box] || 1, Math.round(interval * ease));
      prev.due = addDays(today, interval);
    }

    prev.box = box;
    prev.ease = Math.round(ease * 100) / 100;
    prev.interval = interval;
    prev.reviews = (prev.reviews || 0) + 1;
    prev.last = today;
    state.cards[key] = prev;
    state.cardsReviewed = (state.cardsReviewed || 0) + 1;
    touchActivity(state);
    const day = today;
    state.studyLog = state.studyLog || {};
    state.studyLog[day] = (state.studyLog[day] || 0) + 1;
    save(state);
    return state;
  }

  function isCardDue(key, onDay) {
    const day = onDay || todayStr();
    const c = getCardState(key);
    if (!c.reviews) return false; // yeni kartlar due sayılmaz
    return (c.due || day) <= day;
  }

  function ankiStatsForKeys(keys) {
    const day = todayStr();
    let due = 0;
    let neu = 0;
    let learning = 0;
    let review = 0;
    keys.forEach((key) => {
      const c = getCardState(key);
      if (!c.reviews) {
        neu += 1;
        return;
      }
      if ((c.due || day) <= day) {
        due += 1;
        if (c.box <= 2) learning += 1;
        else review += 1;
      }
    });
    return { due, new: neu, learning, review, total: keys.length };
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

  function pushWrong(item) {
    const state = load();
    state.wrongQueue = state.wrongQueue || [];
    const entry = {
      id: "w" + Date.now() + Math.random().toString(16).slice(2, 6),
      prompt: String(item.prompt || "").slice(0, 200),
      answer: String(item.answer || "").slice(0, 120),
      kind: item.kind || "genel",
      at: new Date().toISOString()
    };
    state.wrongQueue.unshift(entry);
    state.wrongQueue = state.wrongQueue.slice(0, 40);
    save(state);
    return state;
  }

  function popWrong(id) {
    const state = load();
    state.wrongQueue = (state.wrongQueue || []).filter((w) => w.id !== id);
    save(state);
    return state;
  }

  function clearWrongs() {
    const state = load();
    state.wrongQueue = [];
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

  function monthActivity() {
    const state = load();
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const mins = (state.studyLog || {})[key] || 0;
      let heat = 0;
      if (mins >= 60) heat = 3;
      else if (mins >= 30) heat = 2;
      else if (mins > 0 || state.lastActiveDate === key) heat = 1;
      days.push({ key, mins, heat });
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

  function markWrite(id) {
    const state = load();
    state.writeDone = state.writeDone || {};
    state.writeDone[id] = new Date().toISOString();
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

  function pedagogy() {
    return (CURRICULUM && CURRICULUM.pedagogy) || {};
  }

  function daysBetween(isoA, isoB) {
    if (!isoA) return 999;
    const a = new Date(String(isoA).slice(0, 10) + "T12:00:00");
    const b = isoB ? new Date(String(isoB).slice(0, 10) + "T12:00:00") : new Date();
    return Math.max(0, Math.round((b - a) / 86400000));
  }

  function taskWeight(task) {
    const ped = pedagogy();
    const map = ped.typeWeight || {};
    let w = map[task.type] || 3;
    const hay = `${task.title || ""} ${task.detail || ""}`.toLowerCase();
    const keys = ped.heavyKeywords || [];
    if (keys.some((k) => hay.includes(String(k).toLowerCase()))) w += 1;
    return Math.min(6, w);
  }

  function idealIntervalDays(task, reviewCount) {
    const ped = pedagogy();
    const w = taskWeight(task);
    const table = ped.intervalsByWeight || {};
    const seq = table[w] || table[3] || [2, 5, 10, 21];
    const idx = Math.min(Math.max(0, reviewCount || 0), seq.length - 1);
    return seq[idx];
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

  function lastTouchAt(state, taskId) {
    const rev = (state.reviews || {})[taskId];
    if (rev && rev.lastAt) return rev.lastAt;
    const done = state.completed[taskId];
    return done && done.at ? done.at : null;
  }

  function reviewCountOf(state, taskId) {
    return ((state.reviews || {})[taskId] || {}).count || 0;
  }

  function dueReviews(state) {
    const out = [];
    const reasons = (pedagogy().reviewReasons) || {};
    Object.keys(state.completed || {}).forEach((taskId) => {
      const meta = findTaskMeta(taskId);
      if (!meta) return;
      const { level, unit, task } = meta;
      const last = lastTouchAt(state, taskId);
      const count = reviewCountOf(state, taskId);
      const ideal = idealIntervalDays(task, count);
      const age = daysBetween(last, todayStr());
      if (age < ideal) return;
      const weight = taskWeight(task);
      const overdue = age - ideal;
      let reasonKey = "overdue";
      if (weight >= 5) reasonKey = "heavy";
      else if (count === 0 && age <= 2) reasonKey = "recent";
      else if (overdue >= 3) reasonKey = "overdue";
      else reasonKey = "interleave";
      out.push({
        level,
        unit,
        task,
        weight,
        age,
        ideal,
        overdue,
        count,
        score: overdue * weight + weight * 2 + (count === 0 ? 3 : 0),
        reason: reasons[reasonKey] || reasons.interleave || "Tekrar zamanı."
      });
    });
    out.sort((a, b) => b.score - a.score);
    return out;
  }

  function incompleteNews(state) {
    const items = [];
    const levels = CURRICULUM.levels;
    const startIdx = Math.max(0, levels.findIndex((l) => l.id === state.currentLevelId));
    for (let i = startIdx; i < levels.length; i++) {
      const level = levels[i];
      for (const unit of level.units) {
        for (const task of unit.tasks) {
          if (state.completed[task.id]) continue;
          items.push({ level, unit, task });
        }
      }
    }
    return items;
  }

  function buildTeacherAgenda(state) {
    const ped = pedagogy();
    const cap = ped.dailyCap || 4;
    const newPerReview = ped.newPerReview || 2;
    const reasons = ped.reviewReasons || {};
    const news = incompleteNews(state);
    const dues = dueReviews(state);
    const items = [];
    let ni = 0;
    let ri = 0;
    let newsSinceReview = 0;
    const wrongN = (state.wrongQueue || []).length;

    if (wrongN > 0) {
      items.push({
        id: `weak_${todayStr()}`,
        kind: "weak",
        taskId: null,
        title: "Yanlışları temizle",
        detail: `${wrongN} zayıf madde bekliyor. Önce bunları düzelt, sonra yeni konuya geç.`,
        minutes: Math.min(15, 5 + wrongN),
        reason: reasons.weak || "Yanlış kuyruğu önce.",
        weight: 6
      });
    }

    while (items.length < cap && (ni < news.length || ri < dues.length)) {
      const preferReview =
        dues.length > ri &&
        (newsSinceReview >= newPerReview || (news.length <= ni && dues.length > ri) || (ni === 0 && dues[0] && dues[0].score >= 10 && items.length > 0));

      if (preferReview && dues[ri]) {
        const d = dues[ri++];
        items.push({
          id: `rev_${d.task.id}_${todayStr()}`,
          kind: "review",
          taskId: d.task.id,
          title: d.task.title,
          detail: d.task.detail,
          minutes: Math.max(10, Math.round((d.task.minutes || 20) * 0.55)),
          reason: d.reason,
          weight: d.weight,
          levelId: d.level.id,
          unitTitle: d.unit.title,
          type: d.task.type
        });
        newsSinceReview = 0;
        continue;
      }

      if (news[ni]) {
        const n = news[ni++];
        items.push({
          id: `new_${n.task.id}`,
          kind: "new",
          taskId: n.task.id,
          title: n.task.title,
          detail: n.task.detail,
          minutes: n.task.minutes || 20,
          reason: "Sıradaki yeni konu — önce bunu öğren.",
          weight: taskWeight(n.task),
          levelId: n.level.id,
          unitTitle: n.unit.title,
          type: n.task.type
        });
        newsSinceReview += 1;
        continue;
      }

      if (dues[ri]) {
        const d = dues[ri++];
        items.push({
          id: `rev_${d.task.id}_${todayStr()}`,
          kind: "review",
          taskId: d.task.id,
          title: d.task.title,
          detail: d.task.detail,
          minutes: Math.max(10, Math.round((d.task.minutes || 20) * 0.55)),
          reason: d.reason,
          weight: d.weight,
          levelId: d.level.id,
          unitTitle: d.unit.title,
          type: d.task.type
        });
        continue;
      }
      break;
    }

    if (!items.length && !news.length && !dues.length) {
      return { date: todayStr(), items: [], done: {} };
    }

    return {
      date: todayStr(),
      items,
      done: {}
    };
  }

  function ensureTeacherAgenda(state) {
    const today = todayStr();
    if (state.teacherAgenda && state.teacherAgenda.date === today && Array.isArray(state.teacherAgenda.items)) {
      return state.teacherAgenda;
    }
    state.teacherAgenda = buildTeacherAgenda(state);
    save(state);
    return state.teacherAgenda;
  }

  function nextTeacherAssignment() {
    const state = load();
    const agenda = ensureTeacherAgenda(state);
    const done = agenda.done || {};
    const next = (agenda.items || []).find((it) => !done[it.id]);
    if (!next) return null;
    if (next.kind === "weak") {
      return {
        kind: "weak",
        assignment: next,
        reason: next.reason,
        minutes: next.minutes,
        wrongCount: (state.wrongQueue || []).length
      };
    }
    const meta = next.taskId ? findTaskMeta(next.taskId) : null;
    return {
      kind: next.kind,
      assignment: next,
      reason: next.reason,
      minutes: next.minutes,
      level: meta?.level || null,
      unit: meta?.unit || null,
      task: meta?.task || null
    };
  }

  function agendaStats() {
    const state = load();
    const agenda = ensureTeacherAgenda(state);
    const items = agenda.items || [];
    const doneMap = agenda.done || {};
    const remaining = items.filter((it) => !doneMap[it.id]).length;
    const done = items.length - remaining;
    const reviews = items.filter((it) => it.kind === "review" || it.kind === "weak").length;
    return { total: items.length, done, remaining, reviews };
  }

  function completeAssignment(assignmentId, opts = {}) {
    const state = load();
    const agenda = ensureTeacherAgenda(state);
    const item = (agenda.items || []).find((it) => it.id === assignmentId);
    if (!item) return state;

    if (item.kind === "new" && item.taskId) {
      if (!state.completed[item.taskId]) {
        state.completed[item.taskId] = { at: new Date().toISOString(), minutes: item.minutes || 0 };
        state.totalMinutes = (state.totalMinutes || 0) + (item.minutes || 0);
        touchActivity(state);
        const day = todayStr();
        state.studyLog = state.studyLog || {};
        state.studyLog[day] = (state.studyLog[day] || 0) + (item.minutes || 0);
      }
      if (!state.reviews) state.reviews = {};
      if (!state.reviews[item.taskId]) {
        state.reviews[item.taskId] = { count: 0, lastAt: state.completed[item.taskId].at };
      }
    } else if (item.kind === "review" && item.taskId) {
      if (!state.reviews) state.reviews = {};
      const prev = state.reviews[item.taskId] || { count: 0, lastAt: null };
      prev.count = (prev.count || 0) + 1;
      prev.lastAt = new Date().toISOString();
      state.reviews[item.taskId] = prev;
      touchActivity(state);
      const mins = item.minutes || 10;
      state.totalMinutes = (state.totalMinutes || 0) + mins;
      const day = todayStr();
      state.studyLog = state.studyLog || {};
      state.studyLog[day] = (state.studyLog[day] || 0) + mins;
    } else if (item.kind === "weak") {
      touchActivity(state);
      const mins = item.minutes || 10;
      state.totalMinutes = (state.totalMinutes || 0) + mins;
      const day = todayStr();
      state.studyLog = state.studyLog || {};
      state.studyLog[day] = (state.studyLog[day] || 0) + mins;
    }

    agenda.done = agenda.done || {};
    agenda.done[item.id] = true;
    state.teacherAgenda = agenda;
    save(state);
    refreshBadges();
    return state;
  }

  function rebuildTeacherAgenda() {
    const state = load();
    state.teacherAgenda = buildTeacherAgenda(state);
    save(state);
    return state.teacherAgenda;
  }

  function setAnkiSettings({ host, deck } = {}) {
    const state = load();
    if (host != null) state.ankiHost = String(host).trim() || "http://127.0.0.1:8765";
    if (deck != null) state.ankiDeck = String(deck).trim() || "Οδηγός";
    save(state);
    return state;
  }

  function markAnkiPushed(keys) {
    const state = load();
    state.ankiPushed = state.ankiPushed || {};
    const at = new Date().toISOString();
    (keys || []).forEach((k) => {
      if (k) state.ankiPushed[k] = at;
    });
    save(state);
    return state;
  }

  function isAnkiPushed(key) {
    return !!(load().ankiPushed || {})[key];
  }

  function uid(prefix) {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  }

  function addCustomWord({ el, tr, tip }) {
    const state = load();
    const word = {
      id: uid("w"),
      el: String(el || "").trim(),
      tr: String(tr || "").trim(),
      tip: String(tip || "").trim(),
      custom: true
    };
    if (!word.el || !word.tr) return state;
    state.customWords = [...(state.customWords || []), word];
    save(state);
    return state;
  }

  function removeCustomWord(id) {
    const state = load();
    state.customWords = (state.customWords || []).filter((w) => w.id !== id);
    save(state);
    return state;
  }

  function addCustomPattern({ frame, eg, tr, cat, level }) {
    const state = load();
    const pattern = {
      id: uid("p"),
      frame: String(frame || "").trim(),
      eg: String(eg || "").trim(),
      tr: String(tr || "").trim(),
      cat: String(cat || "benim").trim() || "benim",
      level: String(level || "a1").trim() || "a1",
      custom: true
    };
    if (!pattern.frame || !pattern.eg) return state;
    state.customPatterns = [...(state.customPatterns || []), pattern];
    save(state);
    return state;
  }

  function removeCustomPattern(id) {
    const state = load();
    state.customPatterns = (state.customPatterns || []).filter((p) => p.id !== id);
    save(state);
    return state;
  }

  return {
    load,
    save,
    isDone,
    toggleTask,
    setLevel,
    setDisplayName,
    completeOnboarding,
    setDailyMode,
    setDailyGoal,
    resetAll,
    levelStats,
    overallStats,
    nextIncompleteTask,
    todayPlan,
    unitStats,
    isLevelUnlocked,
    todayStr,
    reviewCard,
    rateAnkiCard,
    getCardState,
    isCardDue,
    ankiStatsForKeys,
    saveDiagnostic,
    cardKey,
    addJournal,
    removeJournal,
    recordDrill,
    markSpeak,
    logStudyMinutes,
    bumpTrainer,
    pushWrong,
    popWrong,
    clearWrongs,
    weekActivity,
    monthActivity,
    winChallenge,
    markWrite,
    refreshBadges,
    exportData,
    importData,
    addCustomWord,
    removeCustomWord,
    addCustomPattern,
    removeCustomPattern,
    nextTeacherAssignment,
    agendaStats,
    completeAssignment,
    rebuildTeacherAgenda,
    taskWeight,
    dueReviews,
    setAnkiSettings,
    markAnkiPushed,
    isAnkiPushed
  };
})();
