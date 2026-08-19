const lessons = [
  { n: '01', title: 'Postura y posición', text: 'Prepárate para escribir', icon: 'fa-solid fa-person-walking', color: '#fde4bf', done: true },
  { n: '02', title: 'La fila guía', text: 'A S D F · J K L Ñ', icon: 'fa-solid fa-keyboard', color: '#d9f0ec', done: true },
  { n: '03', title: 'Ritmo y precisión', text: 'Escribe con calma', icon: 'fa-solid fa-gauge-high', color: '#e3e9ff', done: true },
  { n: '04', title: 'Teclas de inicio', text: 'Refuerza la fila guía', icon: 'fa-solid fa-arrow-up-right', color: '#ffe2dc', current: true },
  { n: '05', title: 'Mano izquierda', text: 'Letras Q a T', icon: 'fa-solid fa-hand-left', color: '#f0e6ff' },
  { n: '06', title: 'Mano derecha', text: 'Letras Y a P', icon: 'fa-solid fa-hand-right', color: '#e9f0f4' }
];

const grid = document.getElementById('lessonGrid');
if (grid) {
  grid.innerHTML = lessons.map(l =>
    `<article class="lesson-card ${l.done ? 'done' : l.current ? 'current' : 'locked'}">
      <div class="icon" style="background:${l.color}"><i class="${l.icon}"></i></div>
      <small>LECCIÓN ${l.n}</small>
      <h3>${l.title}</h3>
      <p>${l.text}</p>
      <span class="card-status"><i class="${l.done ? 'fa-solid fa-circle-check' : l.current ? 'fa-solid fa-arrow-right' : 'fa-solid fa-lock'}"></i></span>
      <a class="lesson-open" href="pages/lecciones/leccion-${l.n}.html">${l.done || l.current ? 'Ver lección →' : 'Ver contenido →'}</a>
    </article>`
  ).join('');
}

const progress = Teclea.getProgress();
const completedCountEl = document.getElementById('completedCount');
const goalNumberEl = document.getElementById('goalNumber');
const streakEl = document.getElementById('streakCount');
if (completedCountEl) completedCountEl.textContent = progress.levelsCompleted.length;
if (goalNumberEl) {
  const goal = Math.min(100, Math.round((progress.practiceMinutes / 20) * 100));
  goalNumberEl.textContent = goal;
}

const practicePanel = document.getElementById('practicePanel');
const typingInput = document.getElementById('typingInput');
const typingLine = document.getElementById('typingLine');
const keyboard = document.getElementById('keyboard');
const timerEl = document.getElementById('timer');
const accuracyEl = document.getElementById('accuracy');
const typedCountEl = document.getElementById('typedCount');
const wpmEl = document.getElementById('wpm');
const starsEl = document.getElementById('stars');
const fingerGuide = document.getElementById('fingerGuide');
const levelLabel = document.getElementById('levelLabel');
const startBtn = document.getElementById('startLesson');
const closeBtn = document.getElementById('closePractice');
const completionModal = document.getElementById('completionModal');
const nextExerciseBtn = document.getElementById('nextExercise');

let practiceInstance = null;

function openPractice() {
  if (!practicePanel) return;
  practicePanel.hidden = false;
  practicePanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => typingInput.focus(), 350);
}

function closePractice() {
  if (!practicePanel) return;
  practicePanel.hidden = true;
  if (typingInput) typingInput.value = '';
  if (timerEl) timerEl.textContent = '0:00';
  if (accuracyEl) accuracyEl.textContent = '100%';
  if (typedCountEl) typedCountEl.textContent = '0/0';
  if (wpmEl) wpmEl.textContent = '0';
  if (starsEl) starsEl.innerHTML = '';
}

if (startBtn) startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openPractice();
});

if (closeBtn) closeBtn.addEventListener('click', closePractice);

if (nextExerciseBtn) nextExerciseBtn.addEventListener('click', () => {
  if (completionModal) completionModal.hidden = true;
  if (practiceInstance) {
    const newTarget = practiceInstance.reset(progress.currentLevel);
    if (typedCountEl) typedCountEl.textContent = `0/${newTarget.length}`;
    typingInput.focus();
  }
});

if (typingInput && typingLine && keyboard) {
  practiceInstance = Teclea.initPractice({
    inputEl: typingInput,
    lineEl: typingLine,
    keyboardEl: keyboard,
    timerEl,
    accuracyEl,
    progressEl: typedCountEl,
    wpmEl,
    starsEl,
    fingerGuideEl: fingerGuide,
    levelLabelEl: levelLabel,
    levelId: progress.currentLevel,
    onComplete({ accuracy, wpm, stars, elapsed }) {
      if (completionModal) {
        document.getElementById('finalAccuracy').textContent = `${accuracy}%`;
        document.getElementById('finalWPM').textContent = wpm;
        document.getElementById('finalStars').innerHTML = Teclea.getStarsHTML(stars);
        document.getElementById('finalTime').textContent = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`;
        completionModal.hidden = false;
      }
      const updated = Teclea.getProgress();
      if (completedCountEl) completedCountEl.textContent = updated.levelsCompleted.length;
      if (goalNumberEl) {
        const goal = Math.min(100, Math.round((updated.practiceMinutes / 20) * 100));
        goalNumberEl.textContent = goal;
      }
      typingInput.blur();
    }
  });
}
