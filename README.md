# Teclea — Aprende mecanografía

Una aplicación web interactiva para aprender mecanografía paso a paso. Diseñada en español, incluye 6 lecciones progresivas, práctica guiada con retroalimentación en tiempo real y laboratorio 3D.

## Características

- Panel de bienvenida con meta diaria y racha de aprendizaje.
- Ruta visual de 6 lecciones con estados completado, actual y bloqueado.
- Práctica guiada con 8 ejercicios variados de la fila guía (A S D F · J K L Ñ).
- Medición de precisión, tiempo y progreso en tiempo real.
- Teclado visual que ilumina las teclas al presionarlas.
- Persistencia de progreso con localStorage (precisión, minutos practicados, ejercicios completados).
- Laboratorio 3D interactivo con Babylon.js para visualizar las teclas.
- Modo oscuro con toggle y persistencia de preferencia.
- Animaciones de entrada con Anime.js.
- Diseño adaptable para escritorio, tablet y móvil.

## Tecnologías

- HTML5
- CSS3 (variables CSS, clamp(), conic-gradient, grid, flexbox)
- JavaScript (Vanilla JS, módulo IIFE compartido)
- Google Fonts: Manrope y DM Mono
- Lucide Icons (SVG vectoriales)
- Babylon.js (motor 3D WebGL)
- Anime.js (animaciones)

## Estructura del proyecto

```text
Mecanografia/
├── index.html                    # Página principal (HOME)
├── README.md                     # Documentación del proyecto
│
├── assets/
│   ├── css/                      # 11 archivos CSS
│   │   ├── styles.css            # Estilos base y variables
│   │   ├── layout.css            # Layout fluido, header fijo, responsive
│   │   ├── home.css              # Estilos del home page
│   │   ├── home-polish.css       # Detalles de pulido del home
│   │   ├── enhancements.css      # Progress overview, method, bottom CTA
│   │   ├── theme.css             # Modo oscuro y toggle de tema
│   │   ├── lessons.css           # Catálogo y vista detalle de lecciones
│   │   ├── libraries.css         # Estilos del laboratorio 3D
│   │   ├── libraries-fix.css     # Fixes de z-index para hero art
│   │   ├── icons.css             # Tamaños de íconos Lucide
│   │   └── footer.css            # Estilos del footer
│   │
│   ├── images/
│   │   └── teclea-logo.svg       # Logo del proyecto
│   │
│   └── js/                       # 5 archivos JS
│       ├── shared.js             # Módulo compartido de práctica y progreso
│       ├── script.js             # Lógica de la página principal
│       ├── theme.js              # Toggle de modo oscuro
│       ├── experience.js         # Escena Babylon.js + animaciones Anime.js
│       └── practice.js           # Lógica de práctica standalone
│
└── pages/
    ├── practicar.html            # Página de práctica independiente
    ├── lecciones.html            # Catálogo de lecciones
    └── lecciones/                # 6 lecciones individuales
        ├── leccion-01.html       # Postura y posición
        ├── leccion-02.html       # La fila guía
        ├── leccion-03.html       # Ritmo y precisión
        ├── leccion-04.html       # Teclas de inicio
        ├── leccion-05.html       # Mano izquierda (Q a T)
        └── leccion-06.html       # Mano derecha (Y a P)
```

## Cómo usarlo

1. Descarga o clona este proyecto.
2. Abre `index.html` en tu navegador.
3. Haz clic en **Comenzar lección** o en **Empezar a practicar**.
4. Escribe el texto mostrado sin mirar el teclado.

No requiere instalación de dependencias ni servidor. Todas las librerías se cargan desde CDN.

## Persistencia

El progreso se guarda automáticamente en `localStorage` con la clave `teclea-progress`:

- Lecciones completadas
- Mejor precisión obtenida
- Minutos totales practicados
- Ejercicios completados

La preferencia de modo oscuro se guarda con la clave `teclea-theme`.
