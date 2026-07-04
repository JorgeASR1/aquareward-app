# AquaReward — PWA

App móvil funcional de conservación del agua (Región del Biobío). Evolución del
prototipo de Claude Design a una **PWA instalable**: pantalla completa, estado
persistente y funcionamiento offline.

## Qué hace

- **Bienvenida** — al primer uso pide tu nombre y te registra como usuario local;
  el avatar (arriba a la derecha en Inicio) abre tu perfil.
- **Mini tutoriales** — la primera vez que visitas cada pantalla, un tutorial
  breve explica sus funciones principales (repetibles desde el perfil).
- **Inicio** — saldo de AquaCoins en vivo, gauge de consumo mensual (mes y días
  restantes reales), cinta de confianza Essbio y 10 tips de ahorro rotativos.
- **Premios** — catálogo con filtros funcionales por categoría, canje con hoja de
  confirmación que **descuenta el saldo de verdad**, historial "Mis canjes" y
  Multiplicador ×2 con vigencia real de 7 días.
- **Comunidad** — dos proyectos (Santa Bárbara y Cabrero) en un **carrusel
  deslizable**; donaciones en AquaCoins o m³ que avanzan la barra de cada
  proyecto, con registro de tu aporte acumulado por proyecto.
- **Reportes** — mapa comunitario de fugas: eliges el **punto exacto del mapa**
  al reportar; los reportes y sus estados quedan guardados en el dispositivo.
- **Modo fácil** — interfaz simplificada para adultos mayores (letra grande,
  botones de ayuda "?" en cada pantalla, flujos de un paso). Se activa desde el
  avatar de Inicio → "Modo fácil".
- **Modo oscuro automático** según el sistema (incluye el mapa de Reportes).

Todo el estado vive en `localStorage` — no hay servidor; los datos son de demo.

## Cómo probarla

La PWA necesita servirse por HTTP (el service worker no funciona desde `file://`):

```bash
cd app
python3 -m http.server 8080
# o: npx serve .
```

Abre `http://localhost:8080` en el navegador. Para probarla **desde el teléfono**,
publícala en cualquier hosting estático con HTTPS (GitHub Pages, Netlify, Vercel):
sube el contenido de esta carpeta tal cual, sin build.

### Instalarla en el teléfono

- **Android (Chrome):** abre la URL → menú ⋮ → "Instalar aplicación".
- **iPhone (Safari):** abre la URL → Compartir → "Añadir a pantalla de inicio".

Tras la primera visita funciona offline (el service worker precachea la app).

## Estructura

```
app/
├── index.html            shell de la PWA (metas iOS/Android, safe-areas, registro del SW)
├── app.js                aplicación React (compilada desde src/app.jsx)
├── src/app.jsx           código fuente JSX — edita aquí
├── reportes.html         módulo del mapa de reportes (iframe, con persistencia)
├── sw.js                 service worker: precache + caché de tipografías
├── manifest.webmanifest  manifiesto PWA
├── vendor/               React 18 (producción, sin CDN — funciona offline)
├── assets/               logo Essbio + foto del proyecto rural
└── icons/                íconos PWA (192/512/maskable/apple-touch)
```

## Editar y recompilar

El JSX se pre-compila a JS plano (sin Babel en el navegador → arranque rápido).
Tras editar `src/app.jsx`:

```bash
npm i -D @babel/core @babel/cli @babel/preset-react
npx babel src/app.jsx --presets @babel/preset-react -o app.js
```

Si cambias archivos precacheados, sube la versión en `sw.js` (`VERSION`) para
que los clientes instalados actualicen.

## Reiniciar los datos de demo

En la consola del navegador:

```js
localStorage.removeItem('aquareward.v1');          // saldo, canjes, donaciones
localStorage.removeItem('aquareward.reportes.v1'); // reportes del mapa
```
