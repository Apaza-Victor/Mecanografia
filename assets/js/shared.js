const Teclea = (() => {

  const LEVELS = [
    { id: 1, name: 'Fila guía',      keys: 'asdfjklñ', texts: ['asdf jklñ','fdsa ñlkj','asdf jklñ fdsa ñlkj','jklñ asdf fdsa ñlkj','asdf jklñ asdf jklñ asdf jklñ'] },
    { id: 2, name: 'Mano izquierda',  keys: 'qwertasdfgzxcvb', texts: ['qwer asdf','qwer asdf zxcv','qwert asdfg zxcvb','asdf qwer zxcv asdf','qwert asdfg zxcvb qwer'] },
    { id: 3, name: 'Mano derecha',    keys: 'yuiophjklnm', texts: ['yuiop jklñ','yuiop jklñ m','yuiop jklñ hnm','yuiop jklñ hjnm','yuiop jklñ yuiop jklñ'] },
    { id: 4, name: 'Palabras simples', keys: 'abcdefghijklmnopqrstuvwxyzñ', texts: ['casa mesa luna sol','papel libro gato perro','ventana puerta calle jardín','mano dedo ojo nariz boca','agua fuego tierra viento'] },
    { id: 5, name: 'Oraciones',       keys: 'abcdefghijklmnopqrstuvwxyzñ', texts: ['el gato duerme en la mesa','mi hermano tiene un perro grande','la casa blanca está en la colina','hoy hace mucho sol en la playa','las estrellas brillan en la noche'] },
    { id: 6, name: 'Textos rápidos',  keys: 'abcdefghijklmnopqrstuvwxyzñ', texts: ['practicar todos los días ayuda a mejorar','aprender a escribir sin mirar el teclado toma tiempo','la paciencia es la clave del aprendizaje','cada día un poco más rápido y con más precisión','escribir rápido y bien es una habilidad valiosa'] },
    { id: 7, name: 'Mayúsculas',      keys: 'abcdefghijklmnopqrstuvwxyzñ', texts: ['España es un país de Europa','María tiene una casa grande','Pedro y Juan van al parque','La Universidad de Madrid es famosa','Hoy es Lunes y mañana es Martes'] },
    { id: 8, name: 'Números',         keys: 'abcdefghijklmnopqrstuvwxyzñ1234567890', texts: ['tengo 2 gatos y 3 perros','el precio es 125 euros','mi teléfono es 612 345 678','vivo en la calle Mayor número 42','son las 3 y media de la tarde'] },
    { id: 9, name: 'Puntuación',      keys: 'abcdefghijklmnopqrstuvwxyzñ', texts: ['¡Hola! ¿Cómo estás?',' Dice: "Voy a la tienda".','el precio es: 50 euros.','París, Roma y Lisboa.','¿Sabías que leen mucho?'] },
    { id: 10, name: 'Combinaciones',  keys: 'abcdefghijklmnopqrstuvwxyzñ', texts: ['el juez ejecuta la sentencia','axter zigzag quick fix','el quiz de ayer fue difícil','pizza con queso extra','joya de jade y zinc'] },
    { id: 11, name: 'Textos largos',   keys: 'abcdefghijklmnopqrstuvwxyzñ', texts: ['el amor por la lectura abre puertas a mundos infinitos donde la imaginación no tiene límites y cada página es una nueva aventura','escribir a máquina sin mirar las teclas es como tocar un instrumento musical con los dedos la práctica constante lleva a la perfección','la tecnología avanza rápidamente y aprender a usar el teclado de forma eficiente es una habilidad fundamental para cualquier profesional moderno','en la escuela aprendí que la paciencia y la disciplina son las claves del éxito cuando se trata de adquirir nuevas destrezas manuales','los científicos descubrieron que practicar mecanografía durante treinta minutos al día mejora significativamente la velocidad y la precisión'] },
    { id: 12, name: 'Desafío final',  keys: 'abcdefghijklmnopqrstuvwxyzñ1234567890', texts: ['¿Sabías que el récord mundial es de más de 200 palabras por minuto?','María escribió: "¡Hola Mundo!" y ¡funcionó! El código era: 42.','En 2024, España exportó 1.250 millones de euros en productos agroalimentarios.','La fórmula química del agua es H₂O y su peso molecular es 18 g/mol.','E-mail: usuario@correo.com | Teléfono: +34 612 345 678 | Fax: 912 345 679.'] }
  ];

  const FINGER_MAP = {
    'q':'LM','w':'LA','e':'LI','r':'LI','t':'LI',
    'a':'LM','s':'LA','d':'LI','f':'LI',
    'z':'LP','x':'LA','c':'LI','v':'LI','b':'LI',
    'y':'RI','u':'RI','i':'RI','o':'RA','p':'RM',
    'h':'RI','j':'RI','k':'RA','l':'RM','ñ':'RM',
    'n':'RI','m':'RI',
    ' ':' '
  };

  const FINGER_NAMES = { LP:'Meñique izq', LA:'Anular izq', LI:'Índice izq', LM:'Medio izq', RI:'Índice der', RA:'Anular der', RM:'Medio der' };

  const FINGER_COLORS = { LP:'#e76d5b', LA:'#f8c848', LI:'#9be0df', LM:'#b8e5d1', RI:'#9be0df', RA:'#f8c848', RM:'#e76d5b' };

  const KEYBOARD_ROWS = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L','Ñ'],
    ['Z','X','C','V','B','N','M']
  ];

  const HOME_KEYS = 'ASDFJKLÑ';

  /* --- 3D Keyboard layout (Spanish) --- */
  const KB_LAYOUT = [
    [
      {key:'`',sub:'º'},{key:'1',sub:'!'},{key:'2',sub:'"'},{key:'3',sub:'·'},
      {key:'4',sub:'$'},{key:'5',sub:'%'},{key:'6',sub:'&'},{key:'7',sub:'/'},
      {key:'8',sub:'('},{key:'9',sub:')'},{key:'0',sub:'='},{key:"'",sub:'?'},
      {key:'¿',sub:'¿'},{key:'Backspace',special:true,cls:'kb-backspace'}
    ],
    [
      {key:'Tab',special:true,cls:'kb-tab'},
      {key:'q'},{key:'w'},{key:'e'},{key:'r'},{key:'t'},
      {key:'y'},{key:'u'},{key:'i'},{key:'o'},{key:'p'},
      {key:'+'},{key:'´',sub:'¨'},{key:'|',special:true,cls:'kb-backspace',w:52}
    ],
    [
      {key:'Caps',special:true,cls:'kb-caps'},
      {key:'a'},{key:'s'},{key:'d'},{key:'f'},{key:'g'},
      {key:'h'},{key:'j'},{key:'k'},{key:'l'},{key:'ç'},{key:'ñ'},
      {key:'Enter',special:true,cls:'kb-enter'}
    ],
    [
      {key:'Shift',special:true,cls:'kb-lshift'},
      {key:'<'},{key:'z'},{key:'x'},{key:'c'},{key:'v'},
      {key:'b'},{key:'n'},{key:'m'},{key:','},{key:'.'},{key:'-'},
      {key:'Shift',special:true,cls:'kb-rshift'}
    ],
    [
      {key:'Ctrl',special:true,cls:'kb-ctrl'},
      {key:'Alt',special:true,cls:'kb-alt'},
      {key:' ',display:'ESPACIO',special:false,cls:'kb-space'},
      {key:'Alt',special:true,cls:'kb-alt'},
      {key:'Ctrl',special:true,cls:'kb-ctrl'}
    ]
  ];

  function defaultProgress() {
    return {
      currentLevel: 1,
      levelsCompleted: [],
      levelStars: {},
      exercisesCompleted: 0,
      bestAccuracy: 0,
      bestWPM: 0,
      bestStars: 0,
      practiceMinutes: 0,
      totalPracticeSeconds: 0,
      streak: 0,
      lastPracticeDate: null,
      lastPlayback: null
    };
  }

  function getProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem('teclea-progress'));
      return saved ? { ...defaultProgress(), ...saved } : defaultProgress();
    } catch { return defaultProgress(); }
  }

  function saveProgress(data) {
    const merged = { ...getProgress(), ...data };
    localStorage.setItem('teclea-progress', JSON.stringify(merged));
    return merged;
  }

  function updateStreak(progress) {
    const today = new Date().toDateString();
    if (progress.lastPracticeDate === today) return progress;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (progress.lastPracticeDate === yesterday) {
      progress.streak += 1;
    } else if (progress.lastPracticeDate !== today) {
      progress.streak = 1;
    }
    progress.lastPracticeDate = today;
    return progress;
  }

  function calcStars(accuracy, wpm, targetLength) {
    let stars = 1;
    if (accuracy >= 80 && wpm >= 10) stars = 2;
    if (accuracy >= 90 && wpm >= 15) stars = 3;
    if (accuracy >= 95 && wpm >= 25) stars = 4;
    if (accuracy >= 99 && wpm >= 35) stars = 5;
    return stars;
  }

  function calcWPM(correctChars, seconds) {
    if (seconds < 1) return 0;
    return Math.round((correctChars / 5) / (seconds / 60));
  }

  function getStarsHTML(stars, max = 5) {
    let html = '';
    for (let i = 1; i <= max; i++) {
      html += `<span class="star ${i <= stars ? 'earned' : ''}">${i <= stars ? '★' : '☆'}</span>`;
    }
    return html;
  }

  function getLevelForExercise(exerciseIndex) {
    let accumulated = 0;
    for (const level of LEVELS) {
      accumulated += level.texts.length;
      if (exerciseIndex < accumulated) return level;
    }
    return LEVELS[LEVELS.length - 1];
  }

  function getRandomExercise(levelId) {
    const level = LEVELS.find(l => l.id === levelId) || LEVELS[0];
    const text = level.texts[Math.floor(Math.random() * level.texts.length)];
    return { text, level };
  }

  function getFingerForChar(ch) {
    return FINGER_MAP[ch.toLowerCase()] || null;
  }

  function getFingerName(finger) {
    return FINGER_NAMES[finger] || '';
  }

  function getFingerColor(finger) {
    return FINGER_COLORS[finger] || '#888';
  }

  function buildKeyboard(container, highlightChar) {
    if (!container) return;
    container.innerHTML = '';
    KB_LAYOUT.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'kb-row';
      row.forEach(item => {
        const kbd = document.createElement('kbd');
        const keyVal = item.key.toLowerCase();
        kbd.setAttribute('data-key', keyVal);
        if (item.sub) kbd.setAttribute('data-sub', item.sub);

        /* Special key classes */
        if (item.special) kbd.classList.add('kb-special');
        if (item.cls) kbd.classList.add(item.cls);

        /* Home row indicator */
        if (HOME_KEYS.includes(item.key.toUpperCase()) && !item.special) {
          kbd.classList.add('kb-home');
          const bump = document.createElement('span');
          bump.className = 'kb-bump';
          kbd.appendChild(bump);
        }

        /* Highlight the next key to type */
        if (highlightChar && highlightChar.toLowerCase() === keyVal) {
          const finger = FINGER_MAP[keyVal];
          const color = FINGER_COLORS[finger] || '#9be0df';
          kbd.classList.add('kb-highlight');
          kbd.style.setProperty('--finger-hl', color);
          kbd.style.setProperty('--finger-hl-glow', color + '66');
          kbd.style.setProperty('--finger-hl-border', color);
        }

        rowDiv.appendChild(kbd);
      });
      container.appendChild(rowDiv);
    });
  }

  function renderLine(container, target, value = '') {
    if (!container) return;
    const chars = [...target];
    const vals = [...value];
    container.innerHTML = chars.map((char, i) => {
      let cls = '';
      if (i < vals.length) cls = vals[i] === char ? 'done' : 'wrong';
      else if (i === vals.length) cls = 'current';
      const finger = FINGER_MAP[char.toLowerCase()];
      const fingerColor = FINGER_COLORS[finger] || '';
      const display = char === ' ' ? '&nbsp;' : char;
      return `<span class="${cls}" style="--finger-color:${fingerColor}">${display}</span>`;
    }).join('');
  }

  function renderFingerGuide(container, target) {
    if (!container) return;
    const uniqueFingers = new Set();
    [...target.toLowerCase()].forEach(ch => {
      const f = FINGER_MAP[ch];
      if (f && f !== ' ') uniqueFingers.add(f);
    });
    container.innerHTML = [...uniqueFingers].map(f =>
      `<span class="finger-chip" style="background:${FINGER_COLORS[f]}22;color:${FINGER_COLORS[f]};border:1px solid ${FINGER_COLORS[f]}44">${FINGER_NAMES[f]}</span>`
    ).join('');
  }

  const SOUNDS = {
    correct: ['snd/key1.mp3', 'snd/key2.mp3', 'snd/key3.mp3'],
    wrong: ['snd/freesound_community-mech-keyboard-02-102918.mp3'],
    complete: ['snd/soul_serenity_sounds-typing-sound-02-229861.mp3']
  };

  const audioPool = {};

  function preloadSounds() {
    Object.entries(SOUNDS).forEach(([type, files]) => {
      audioPool[type] = files.map(src => {
        const a = new Audio(src);
        a.preload = 'auto';
        a.volume = type === 'complete' ? 0.5 : 0.3;
        return a;
      });
    });
  }

  function playSound(type) {
    try {
      if (!audioPool.correct) preloadSounds();
      const pool = audioPool[type];
      if (!pool || pool.length === 0) return;
      const sound = pool[Math.floor(Math.random() * pool.length)];
      sound.currentTime = 0;
      sound.play().catch(() => {});
    } catch {}
  }

  function savePlayback(data) {
    localStorage.setItem('teclea-playback', JSON.stringify(data));
  }

  function getPlayback() {
    try { return JSON.parse(localStorage.getItem('teclea-playback')); } catch { return null; }
  }

  function initPractice(config) {
    const {
      inputEl, lineEl, keyboardEl, timerEl, accuracyEl, progressEl,
      wpmEl, starsEl, fingerGuideEl, levelLabelEl,
      onComplete, soundEnabled = true
    } = config;

    const levelId = config.levelId || 1;
    const { text: target, level } = getRandomExercise(levelId);
    let startedAt = null;
    let timerId = null;
    let finished = false;
    let correctCount = 0;
    let keystrokes = [];

    preloadSounds();
    if (levelLabelEl) levelLabelEl.textContent = level.name;
    buildKeyboard(keyboardEl);
    renderLine(lineEl, target);
    if (fingerGuideEl) renderFingerGuide(fingerGuideEl, target);

    inputEl.addEventListener('input', (e) => {
      let value = e.target.value.toLowerCase();
      if (value.length > target.length) value = value.slice(0, target.length);
      e.target.value = value;

      const lastChar = value[value.length - 1];
      const expectedChar = target[value.length - 1];
      if (soundEnabled && lastChar) {
        playSound(lastChar === expectedChar ? 'correct' : 'wrong');
      }

      if (!startedAt && value) {
        startedAt = Date.now();
        timerId = setInterval(() => {
          const s = Math.floor((Date.now() - startedAt) / 1000);
          if (timerEl) timerEl.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
        }, 250);
      }

      correctCount = [...value].filter((c, i) => c === target[i]).length;
      const accuracy = value.length ? Math.round((correctCount / value.length) * 100) : 100;
      const elapsed = startedAt ? Math.floor((Date.now() - startedAt) / 1000) : 0;
      const wpm = calcWPM(correctCount, elapsed);
      const stars = calcStars(accuracy, wpm, target.length);

      if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;
      if (progressEl) progressEl.textContent = `${value.length}/${target.length}`;
      if (wpmEl) wpmEl.textContent = `${wpm}`;
      if (starsEl) starsEl.innerHTML = getStarsHTML(stars);
      if (keyboardEl) {
        const currentChar = value.length < target.length ? target[value.length] : null;
        buildKeyboard(keyboardEl, currentChar);
      }
      renderLine(lineEl, target, value);

      if (value === target && !finished) {
        finished = true;
        clearInterval(timerId);
        playSound('complete');

        const finalAccuracy = Math.round((correctCount / value.length) * 100);
        const finalWPM = calcWPM(correctCount, elapsed);
        const finalStars = calcStars(finalAccuracy, finalWPM, target.length);

        let progress = getProgress();
        progress = updateStreak(progress);

        const prevStars = progress.levelStars[level.id] || 0;
        const newLevelStars = { ...progress.levelStars, [level.id]: Math.max(prevStars, finalStars) };

        let levelsCompleted = [...progress.levelsCompleted];
        if (finalStars >= 3 && !levelsCompleted.includes(level.id)) {
          levelsCompleted.push(level.id);
        }

        const updated = saveProgress({
          levelsCompleted,
          levelStars: newLevelStars,
          exercisesCompleted: progress.exercisesCompleted + 1,
          bestAccuracy: Math.max(progress.bestAccuracy, finalAccuracy),
          bestWPM: Math.max(progress.bestWPM, finalWPM),
          bestStars: Math.max(progress.bestStars, finalStars),
          practiceMinutes: progress.practiceMinutes + Math.ceil(elapsed / 60),
          totalPracticeSeconds: progress.totalPracticeSeconds + elapsed
        });

        savePlayback({
          target, value, accuracy: finalAccuracy, wpm: finalWPM, stars: finalStars,
          time: elapsed, date: new Date().toISOString(), level: level.name
        });

        if (onComplete) onComplete({
          accuracy: finalAccuracy, wpm: finalWPM, stars: finalStars,
          elapsed, target
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.target === inputEl) {
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        const el = document.querySelector(`#keyboard kbd[data-key="${key}"]`);
        if (el) {
          el.classList.add('kb-active');
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.target === inputEl) {
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        const el = document.querySelector(`#keyboard kbd[data-key="${key}"]`);
        if (el) {
          el.classList.remove('kb-active');
        }
      }
    });

    return {
      reset(newLevelId) {
        finished = false;
        startedAt = null;
        correctCount = 0;
        clearInterval(timerId);
        inputEl.value = '';
        const lid = newLevelId || levelId;
        const { text: newText, level: newLevel } = getRandomExercise(lid);
        if (levelLabelEl) levelLabelEl.textContent = newLevel.name;
        renderLine(lineEl, newText);
        if (fingerGuideEl) renderFingerGuide(fingerGuideEl, newText);
        buildKeyboard(keyboardEl);
        if (accuracyEl) accuracyEl.textContent = '100%';
        if (progressEl) progressEl.textContent = `0/${newText.length}`;
        if (timerEl) timerEl.textContent = '0:00';
        if (wpmEl) wpmEl.textContent = '0';
        if (starsEl) starsEl.innerHTML = getStarsHTML(0);
        return newText;
      }
    };
  }

  return {
    LEVELS, FINGER_MAP, FINGER_NAMES, FINGER_COLORS,
    KEYBOARD_ROWS, HOME_KEYS,
    getProgress, saveProgress, updateStreak,
    calcStars, calcWPM, getStarsHTML, getRandomExercise,
    getFingerForChar, getFingerName, getFingerColor,
    buildKeyboard, renderLine, renderFingerGuide,
    playSound, savePlayback, getPlayback,
    initPractice
  };
})();
