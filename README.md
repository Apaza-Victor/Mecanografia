# Teclea — Aprende mecanografía

Una aplicación web interactiva para aprender mecanografía paso a paso. Diseñada en español, incluye 6 lecciones progresivas, práctica guiada con retroalimentación en tiempo real, laboratorio 3D y recursos completos para dominar el teclado.

**Vivo:** [apaza-victor.github.io/Mecanografia](https://apaza-victor.github.io/Mecanografia/)

## Características

- 12 niveles progresivos con 60 ejercicios de práctica
- Teclado 3D realista con highlight por dedo y guía de colores
- Sistema de guía de dedos (qué dedo usar para cada tecla)
- Medición en tiempo real: precisión, WPM, tiempo, estrellas
- Laboratorio 3D interactivo con Babylon.js
- Dark/light mode con persistencia en localStorage
- Animaciones de scroll con Anime.js
- Tracking de racha (streak) y progreso acumulado
- 6 lecciones educativas completas (postura, fila guía, ritmo, QWERTY, fila inferior, práctica real)
- Página de recursos con programas, webs y apps recomendadas
- Página de trucos y consejos (28 tips para mejorar)
- Totalmente responsive (escritorio, tablet, móvil)

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Markup | HTML5 (semántico, lang="es") |
| Estilos | CSS3 (variables, clamp(), grid, flexbox, backdrop-filter) |
| Lógica | JavaScript vanilla (módulo IIFE, sin frameworks) |
| 3D | Babylon.js (WebGL) + CSS 3D transforms |
| Animaciones | Anime.js |
| Iconos | Font Awesome 6.5.1 (CDN) |
| Fuentes | Google Fonts — Manrope (UI) + DM Mono (escritura) |
| Persistencia | localStorage |

## Estructura del proyecto

```text
Mecanografia/
├── index.html                     # Página principal
├── README.md
│
├── assets/
│   ├── css/                       # 12 archivos CSS modulares
│   │   ├── styles.css             # Base, variables, dark mode
│   │   ├── layout.css             # Layout de subpáginas
│   │   ├── home.css               # Hero del home
│   │   ├── enhancements.css       # Grid de lecciones, progreso, método
│   │   ├── improvements.css       # Práctica, catálogo, recursos, trucos
│   │   ├── lessons.css            # Detalle de lecciones
│   │   ├── keyboard-practice.css  # Teclado 3D de práctica
│   │   ├── keyboard-3d.css        # Teclado CSS 3D del hero
│   │   ├── theme.css              # Dark mode completo
│   │   ├── footer.css             # Footer
│   │   ├── icons.css              # Tamaños de iconos
│   │   └── libraries.css          # Babylon canvas
│   │
│   ├── images/
│   │   └── teclea-logo.svg        # Logo
│   │
│   └── js/                        # 8 archivos JS
│       ├── shared.js              # Motor principal (niveles, práctica, progreso)
│       ├── script.js              # Controlador del home
│       ├── practice.js            # Controlador de práctica standalone
│       ├── theme.js               # Toggle dark/light mode
│       ├── experience.js          # Babylon.js 3D + Anime.js
│       ├── keyboard-3d.js         # Interacción teclado CSS 3D
│       ├── css-keyboard.js        # Teclado CSS alternativo
│       └── animated-bg.js         # Fondo animado (canvas)
│
├── pages/
│   ├── practicar.html             # Página de práctica con selector de niveles
│   ├── lecciones.html             # Catálogo de 6 lecciones
│   ├── recursos.html              # Programas, webs y apps recomendadas
│   ├── trucos.html                # 28 trucos y consejos
│   └── lecciones/                 # Lecciones individuales
│       ├── leccion-01.html        # Postura y posición
│       ├── leccion-02.html        # La fila guía
│       ├── leccion-03.html        # Ritmo y precisión
│       ├── leccion-04.html        # Fila superior QWERTY
│       ├── leccion-05.html        # Fila inferior y símbolos
│       └── leccion-06.html        # Práctica real
│
└── snd/                           # Efectos de sonido
    ├── key1.mp3
    ├── key2.mp3
    ├── key3.mp3
    ├── freesound_community-mech-keyboard-02-102918.mp3
    └── soul_serenity_sounds-typing-sound-02-229861.mp3
```

## Cómo usarlo

### Opción 1: GitHub Pages (en línea)
Visita [apaza-victor.github.io/Mecanografia](https://apaza-victor.github.io/Mecanografia/)

### Opción 2: Local
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Apaza-Victor/Mecanografia.git
   ```
2. Abre `index.html` en tu navegador.

No requiere instalación de dependencias ni servidor. Todas las librerías se cargan desde CDN.

## Contenido educativo

### Lecciones
1. **Postura y posición** — Ergonomía, postura correcta, qué es la mecanografía
2. **La fila guía** — ASDF JKLÑ, posición de los dedos, teclas de referencia
3. **Ritmo y precisión** — WPM, por qué la precisión va primero que la velocidad
4. **Fila superior QWERTY** — Mapa de dedos para la fila superior
5. **Fila inferior y símbolos** — ZXCVBNM, mayúsculas, números, puntuación
6. **Práctica real** — Ejercicios integrales con textos completos

### Recursos
- Programas de escritorio: Rapid Typing, TypingMaster, TIPP10, Klavaro
- Webs interactivas: TypingClub, Keybr, Typing.com, 10FastFingers, ZType, TypeRacer, Monkeytype
- Apps móviles: TypingClub, Rapid Typing, Keybr
- Herramientas complementarias: Grammarly, teclados mecánicos, reposamuñecas
- Tabla comparativa y plan de estudio sugerido

### Trucos y consejos
- 28 trucos organizados por nivel (principiante → avanzado)
- Errores comunes a evitar (con comparaciones correcto/incorrecto)
- Técnicas para ganar velocidad y mejorar precisión
- Salud y ergonomía (regla 20-20-20, estiramientos)
- Cómo superar mesetas de aprendizaje
- Benchmarks de velocidad (10-120+ WPM)

## Persistencia

El progreso se guarda en `localStorage`:

| Clave | Contenido |
|-------|-----------|
| `teclea-progress` | Nivel actual, niveles completados, estrellas, precisión, WPM, minutos, racha |
| `teclea-theme` | Preferencia de modo oscuro/claro |
| `teclea-playback` | Último ejercicio completado |

## Licencia

Proyecto educativo. Usa las librerías indicadas bajo sus respectivas licencias.
