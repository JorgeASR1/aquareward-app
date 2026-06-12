# AquaReward — PWA

App móvil funcional de conservación del agua (Región del Biobío). Evolución del
prototipo de Claude Design a una **PWA instalable**: pantalla completa, estado
persistente y funcionamiento offline.

## Qué hace

- **Inicio** — saldo de AquaCoins en vivo, gauge de consumo mensual (mes y días
  restantes reales), cinta de confianza Essbio y tips de ahorro rotativos.
- **Premios** — catálogo con filtros funcionales por categoría, canje con hoja de
  confirmación que **descuenta el saldo de verdad**, historial "Mis canjes" y
  Multiplicador ×2 con vigencia real de 7 días.
- **Comunidad** — donaciones en AquaCoins o en m³ de agua (equivalente en pesos)
  que **avanzan la barra del proyecto**, registro de tu aporte acumulado y estado
  de meta alcanzada al llegar al 100%.
- **Reportes** — mapa comunitario de fugas: los reportes que creas y sus estados
  **quedan guardados** en el dispositivo.
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
