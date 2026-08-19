document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('typingInput');
  const line = document.getElementById('typingLine');
  const keyboard = document.getElementById('keyboard');
  const timerEl = document.getElementById('timer');
  const accuracyEl = document.getElementById('accuracy');
  const typedCountEl = document.getElementById('typedCount');
  const wpmEl = document.getElementById('wpm');
  const starsEl = document.getElementById('stars');
  const fingerGuide = document.getElementById('fingerGuide');
  const levelLabel = document.getElementById('levelLabel');
  const levelSelect = document.getElementById('levelSelect');
  const completionModal = document.getElementById('completionModal');
  const nextExerciseBtn = document.getElementById('nextExercise');

  const progress = Teclea.getProgress();
  let currentLevel = progress.currentLevel;
  let practiceInstance = null;

  function startPractice(levelId) {
    currentLevel = levelId || currentLevel;
    if (practiceInstance) {
      const newTarget = practiceInstance.reset(currentLevel);
      if (typedCountEl) typedCountEl.textContent = `0/${newTarget.length}`;
    } else if (input && line && keyboard) {
      practiceInstance = Teclea.initPractice({
        inputEl: input,
        lineEl: line,
        keyboardEl: keyboard,
        timerEl,
        accuracyEl,
        progressEl: typedCountEl,
        wpmEl,
        starsEl,
        fingerGuideEl: fingerGuide,
        levelLabelEl: levelLabel,
        levelId: currentLevel,
        onComplete({ accuracy, wpm, stars, elapsed }) {
          if (completionModal) {
            document.getElementById('finalAccuracy').textContent = `${accuracy}%`;
            document.getElementById('finalWPM').textContent = wpm;
            document.getElementById('finalStars').innerHTML = Teclea.getStarsHTML(stars);
            document.getElementById('finalTime').textContent = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`;
            completionModal.hidden = false;
          }
          input.blur();
        }
      });
    }
    input.focus();
  }

  if (nextExerciseBtn) nextExerciseBtn.addEventListener('click', () => {
    if (completionModal) completionModal.hidden = true;
    startPractice();
  });

  if (levelSelect) {
    Teclea.LEVELS.forEach(level => {
      const opt = document.createElement('option');
      opt.value = level.id;
      opt.textContent = `Nivel ${level.id}: ${level.name}`;
      if (progress.levelsCompleted.includes(level.id)) opt.textContent += ' ✓';
      levelSelect.appendChild(opt);
    });
    levelSelect.value = currentLevel;
    levelSelect.addEventListener('change', (e) => {
      currentLevel = parseInt(e.target.value);
      startPractice(currentLevel);
    });
  }

  startPractice();
});
