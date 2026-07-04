// AquaReward — PWA funcional · Conservación del agua · Región del Biobío
// Evolución del prototipo de Claude Design a app móvil real:
//  · Pantalla completa con safe-areas (sin marco de teléfono simulado)
//  · Estado persistente en localStorage: saldo, canjes, donaciones
//  · Canje de premios con confirmación y descuento real de AquaCoins
//  · Donaciones (AC o m³→dinero) que avanzan la barra del proyecto
//  · Modo claro/oscuro automático según el sistema
// Paleta: marca Essbio — azul institucional + aqua app + dorado AquaCoin.

// ───────── Tema ─────────
const COLORS = {
  bg: '#F4F8FB', ink: '#233249', inkSoft: '#51627A', inkMuted: '#8695A6',
  card: '#FFFFFF', divider: '#D9E2EC',
  primary: '#0E9FBE', primaryDk: '#0A6E85',
  aqua: '#0E9FBE', aquaSoft: '#E1F2F7',
  coin: '#E8A317', coinSoft: '#FBEDC9',
  good: '#1E9B6B', goodSoft: '#D8F0E5',
  danger: '#D85A4A', forest: '#1E9B6B',
  essbio: '#021C8A',
  bgTop: '#FBFDFE', bgBot: '#E6F0F6',
  shadow: '0 1px 2px rgba(35,50,73,0.05), 0 10px 30px rgba(35,50,73,0.12)'
};

const BASE = {
  claro: {
    bg: '#F4F8FB', ink: '#233249', inkSoft: '#51627A', inkMuted: '#8695A6',
    card: '#FFFFFF', divider: '#D9E2EC',
    primary: '#0E9FBE', primaryDk: '#0A6E85',
    aqua: '#0E9FBE', aquaSoft: '#E1F2F7',
    coin: '#E8A317', coinSoft: '#FBEDC9', good: '#1E9B6B', goodSoft: '#D8F0E5',
    danger: '#D85A4A', forest: '#1E9B6B', essbio: '#021C8A',
    bgTop: '#FBFDFE', bgBot: '#E6F0F6',
    shadow: '0 1px 2px rgba(35,50,73,0.05), 0 10px 30px rgba(35,50,73,0.12)'
  },
  oscuro: {
    bg: '#0C1426', ink: '#E8EEF7', inkSoft: '#AEBBCF', inkMuted: '#7C8BA3',
    card: '#16213A', divider: '#2A3852',
    primary: '#2BC4DE', primaryDk: '#1C8AA0',
    aqua: '#2BC4DE', aquaSoft: '#123442',
    coin: '#F2B53D', coinSoft: '#3A2E12', good: '#34C188', goodSoft: '#123026',
    danger: '#E0705F', forest: '#34C188', essbio: '#4B79F0',
    bgTop: '#0C1426', bgBot: '#0E1B33',
    shadow: '0 2px 6px rgba(0,0,0,0.35), 0 12px 32px rgba(0,0,0,0.5)'
  }
};

// ───────── Iconos SVG ─────────
const Icon = {
  coin: (s = 18) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={COLORS.coin} />
      <circle cx="12" cy="12" r="7.5" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1" />
      <path d="M12 7.5c-1.6 0-2.7 1-2.7 2.3 0 2.6 4.7 1.8 4.7 3.8 0 1.1-.9 1.7-2 1.7-1.4 0-2.2-.7-2.4-1.7M12 6.5v1.2M12 16v1.2" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
    </svg>,

  home: (c, s = 22) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 11l8-7 8 7v8a2 2 0 0 1-2 2h-3v-6h-6v6H6a2 2 0 0 1-2-2v-8z" stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
    </svg>,

  gift: (c, s = 22) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="9" width="18" height="11" rx="1.5" stroke={c} strokeWidth="1.7" />
      <path d="M3 13h18M12 9v11" stroke={c} strokeWidth="1.7" />
      <path d="M12 9c-2-3-6-3-6-1s2 1.5 6 1zM12 9c2-3 6-3 6-1s-2 1.5-6 1z" stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
    </svg>,

  users: (c, s = 22) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="9" r="3.2" stroke={c} strokeWidth="1.7" />
      <circle cx="17" cy="10" r="2.5" stroke={c} strokeWidth="1.7" />
      <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5M15 19c0-2.2 1.5-4 4-4" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
    </svg>,

  mapPin: (c, s = 22) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 21s7-6.4 7-12a7 7 0 0 0-14 0c0 5.6 7 12 7 12z" stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.6" stroke={c} strokeWidth="1.7" />
    </svg>,

  arrowDown: (c = COLORS.danger, s = 12) =>
  <svg width={s} height={s} viewBox="0 0 12 12" fill="none">
      <path d="M6 2v8M2 6l4 4 4-4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  shield: (s = 26) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" fill={COLORS.aqua} />
      <path d="M8.5 12l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  receipt: (s = 26) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3z" fill={COLORS.aquaSoft} stroke={COLORS.primary} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 8h8M8 12h8M8 16h5" stroke={COLORS.primary} strokeWidth="1.4" strokeLinecap="round" />
    </svg>,

  shower: (s = 26) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3v4M5 11h14a0 0 0 0 1 0 0c0 1-1 2-2.5 2h-9C6 13 5 12 5 11z" fill={COLORS.aqua} stroke={COLORS.primary} strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="9" cy="17" r="1" fill={COLORS.aqua} />
      <circle cx="13" cy="19" r="1" fill={COLORS.aqua} />
      <circle cx="16" cy="16" r="1" fill={COLORS.aqua} />
    </svg>,

  tree: (s = 26) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3c-3 3-5 5-5 8a5 5 0 0 0 10 0c0-3-2-5-5-8z" fill={COLORS.forest} />
      <path d="M12 13v8M9 19h6" stroke="#6B4423" strokeWidth="1.6" strokeLinecap="round" />
    </svg>,

  badge: (s = 26) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.5 2.5L18 4l.5 3.5L21 10l-1.5 3 1 3.5-3.5.5L15 20l-3-1.5L9 20l-1.5-3-3.5-.5 1-3.5L3.5 10 6 7.5 6.5 4 10 4.5 12 2z" fill={COLORS.coin} />
      <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  tank: (s = 26) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 8h12v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8z" fill={COLORS.aquaSoft} stroke={COLORS.primary} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M5 8h14M9 8V5h6v3" stroke={COLORS.primary} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M8 15c1.2.8 2.8.8 4 0s2.8-.8 4 0" stroke={COLORS.aqua} strokeWidth="1.4" strokeLinecap="round" />
    </svg>,

  pipe: (s = 28) =>
  <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
      <rect x="2" y="11" width="24" height="6" rx="1" fill={COLORS.aqua} />
      <rect x="6" y="9" width="3" height="10" fill={COLORS.primaryDk} />
      <rect x="19" y="9" width="3" height="10" fill={COLORS.primaryDk} />
      <circle cx="14" cy="14" r="1.5" fill="#fff" opacity="0.6" />
    </svg>,

  spark: (s = 14) =>
  <svg width={s} height={s} viewBox="0 0 14 14" fill="none">
      <path d="M7 1v3M7 10v3M1 7h3M10 7h3M3 3l2 2M9 9l2 2M11 3l-2 2M5 9l-2 2" stroke={COLORS.coin} strokeWidth="1.4" strokeLinecap="round" />
    </svg>,

  history: (c, s = 16) =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.7" />
      <path d="M12 7v5l3.5 2" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
};

// ───────── Estado persistente ─────────
const STORE_KEY = 'aquareward.v1';
const CLP_PER_M3 = 1180; // tarifa referencial Essbio
const M3_TO_AC = 100; // equivalencia para la barra del proyecto
const DAY = 86400000;

// Proyectos comunitarios — en Comunidad se desliza entre tarjetas
const PROJECTS = [
{ id: 'sb', title: 'Red agua potable rural', loc: 'Santa Bárbara', fam: '84 familias', img: 'assets/tubul-rural.jpg', goal: 200000, days: 23 },
{ id: 'cb', title: 'Estanques de acumulación', loc: 'Cabrero', fam: '52 familias', img: 'assets/cabrero-rural.jpg', goal: 150000, days: 45 }];


function freshState() {
  return {
    v: 2,
    userName: '', // '' → aún sin registrar (pantalla de bienvenida)
    seniorMode: false, // modo fácil para adultos mayores
    tutorialsSeen: {}, // { inicio: true, ... } mini tutoriales por pantalla
    balance: 1240,
    redemptions: [], // { id, title, cost, ts }
    projects: {
      sb: { funded: 134000, donors: 312, myAC: 0, myCLP: 0 },
      cb: { funded: 61000, donors: 147, myAC: 0, myCLP: 0 }
    },
    multiplierUntil: 0,
    tipIndex: 0
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (s && s.v === 2) {
        const f = freshState();
        return { ...f, ...s, projects: { ...f.projects, ...(s.projects || {}) } };
      }
      if (s && s.v === 1) {
        // migración v1 → v2: el proyecto único pasa a ser "Santa Bárbara"
        const f = freshState();
        return {
          ...f,
          balance: typeof s.balance === 'number' ? s.balance : f.balance,
          redemptions: s.redemptions || [],
          multiplierUntil: s.multiplierUntil || 0,
          tipIndex: s.tipIndex || 0,
          projects: {
            ...f.projects,
            sb: {
              funded: typeof s.projectFunded === 'number' ? s.projectFunded : f.projects.sb.funded,
              donors: typeof s.donors === 'number' ? s.donors : f.projects.sb.donors,
              myAC: s.myAC || 0,
              myCLP: s.myCLP || 0
            }
          }
        };
      }
    }
  } catch (e) {/* almacenamiento no disponible: la app funciona en memoria */}
  return freshState();
}

function donateTo(s, pid, acAmount, clpAmount) {
  const p = s.projects[pid];
  const proj = PROJECTS.find((x) => x.id === pid);
  if (!p || !proj) return s;
  return {
    ...s.projects,
    [pid]: {
      ...p,
      funded: Math.min(proj.goal, p.funded + acAmount),
      donors: p.donors + (p.myAC || p.myCLP ? 0 : 1),
      myAC: p.myAC + (clpAmount ? 0 : acAmount),
      myCLP: p.myCLP + clpAmount
    }
  };
}

function reducer(s, a) {
  switch (a.type) {
    case 'setName':
      return { ...s, userName: String(a.name || '').trim().slice(0, 24) };
    case 'setSenior':
      return { ...s, seniorMode: !!a.on };
    case 'tutorialSeen':
      return { ...s, tutorialsSeen: { ...s.tutorialsSeen, [a.screen]: true } };
    case 'resetTutorials':
      return { ...s, tutorialsSeen: {} };
    case 'redeem': {
      const r = a.reward;
      if (s.balance < r.cost) return s;
      const next = {
        ...s,
        balance: s.balance - r.cost,
        redemptions: [{ id: r.id, title: r.title, cost: r.cost, ts: Date.now() }, ...s.redemptions].slice(0, 30)
      };
      if (r.id === 'badge') next.multiplierUntil = Date.now() + 7 * DAY;
      return next;
    }
    case 'donateAC': {
      if (s.balance < a.amount) return s;
      return {
        ...s,
        balance: s.balance - a.amount,
        projects: donateTo(s, a.pid, a.amount, 0)
      };
    }
    case 'donateM3': {
      return {
        ...s,
        projects: donateTo(s, a.pid, a.m3 * M3_TO_AC, a.m3 * CLP_PER_M3)
      };
    }
    case 'nextTip':
      return { ...s, tipIndex: (s.tipIndex + 1) % TIPS.length };
    default:
      return s;
  }
}

// ───────── Utilidades ─────────
const fmtCL = (n) => Math.round(n).toLocaleString('es-CL');
const NUMFONT = '"Oswald", "Geist", ui-sans-serif, sans-serif';
const initials = (name) =>
(name || '').trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '·';
const firstName = (name) => (name || '').trim().split(/\s+/)[0] || '';
const logoSrc = (dark) => dark ? 'assets/logo-dark.png' : 'assets/logo-light.png';

function useSystemDark() {
  const mq = React.useMemo(
    () => window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null, []);
  const [dark, setDark] = React.useState(mq ? mq.matches : false);
  React.useEffect(() => {
    if (!mq) return;
    const fn = (e) => setDark(e.matches);
    mq.addEventListener ? mq.addEventListener('change', fn) : mq.addListener(fn);
    return () => mq.removeEventListener ? mq.removeEventListener('change', fn) : mq.removeListener(fn);
  }, [mq]);
  return dark;
}

// Cuenta animada que parte desde el valor anterior (no desde 0) cuando el
// target cambia — así el saldo "baja" suavemente al canjear o donar.
function useAnimatedNumber(target, duration = 900, decimals = 0, go = true) {
  const reduced = React.useMemo(
    () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const [v, setV] = React.useState(go ? 0 : target);
  const vRef = React.useRef(go ? 0 : target);
  React.useEffect(() => {
    if (!go) return;
    if (reduced) { vRef.current = target; setV(target); return; }
    const from = vRef.current;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = from + (target - from) * eased;
      vRef.current = val;
      setV(val);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, go, duration, reduced]);
  return decimals === 0 ? Math.round(v) : Number(v.toFixed(decimals));
}

function haptic() {
  try { if (navigator.vibrate) navigator.vibrate(8); } catch (e) {}
}

// ───────── Piezas compartidas ─────────
function Card({ children, style, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: COLORS.card, borderRadius: 26, padding: 18,
      boxShadow: COLORS.shadow,
      ...style
    }}>{children}</div>);
}

function Pill({ children, bg = COLORS.aquaSoft, color = COLORS.primary, style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: bg, color, padding: '3px 9px',
      borderRadius: 999, fontSize: 11, fontWeight: 600,
      letterSpacing: 0.1, ...style
    }}>{children}</span>);
}

function AppHeader({ title, subtitle, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: 'calc(env(safe-area-inset-top, 0px) + 22px) 22px 14px'
    }}>
      <div>
        {subtitle && <div style={{ fontSize: 13, color: COLORS.inkMuted, fontWeight: 500, marginBottom: 2, whiteSpace: 'nowrap' }}>{subtitle}</div>}
        <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.4 }}>{title}</div>
      </div>
      {right}
    </div>);
}

// Hoja inferior con confirmación (canjes y donaciones)
function BottomSheet({ open, onClose, children }) {
  const [render, setRender] = React.useState(open);
  React.useEffect(() => {
    if (open) { setRender(true); return; }
    const t = setTimeout(() => setRender(false), 340);
    return () => clearTimeout(t);
  }, [open]);
  if (!render) return null;
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 80,
      background: open ? 'rgba(8,16,28,0.45)' : 'rgba(8,16,28,0)',
      transition: 'background .3s', display: 'flex', alignItems: 'flex-end'
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: '100%', background: COLORS.card,
        borderRadius: '24px 24px 0 0', padding: '10px 20px',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)',
        transform: open ? 'translateY(0)' : 'translateY(105%)',
        transition: 'transform .34s cubic-bezier(.2,.8,.2,1)',
        boxShadow: '0 -12px 40px rgba(2,28,138,0.25)'
      }}>
        <div style={{ width: 42, height: 5, borderRadius: 3, background: COLORS.divider, margin: '6px auto 16px' }} />
        {children}
      </div>
    </div>);
}

function SheetRow({ label, value, strong }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 0', borderBottom: `1px solid ${COLORS.divider}`
    }}>
      <span style={{ fontSize: 13, color: COLORS.inkSoft, fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 14, color: strong ? COLORS.primary : COLORS.ink, fontWeight: 700 }}>{value}</span>
    </div>);
}

function SheetButton({ children, onClick, ghost, disabled }) {
  return (
    <button disabled={disabled} onClick={onClick} style={{
      width: '100%', marginTop: ghost ? 8 : 16,
      background: disabled ? COLORS.divider : ghost ? 'transparent' : COLORS.primary,
      color: disabled ? COLORS.inkMuted : ghost ? COLORS.inkSoft : '#fff',
      border: ghost ? `1px solid ${COLORS.divider}` : 'none',
      padding: 14, borderRadius: 14, fontSize: 14, fontWeight: 700,
      cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit'
    }}>{children}</button>);
}

function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div key={msg.key} className="ar-toast" style={{
      position: 'absolute', top: 'calc(env(safe-area-inset-top, 0px) + 14px)',
      left: '50%', zIndex: 90,
      background: COLORS.ink, color: COLORS.bg,
      padding: '11px 18px', borderRadius: 14, fontSize: 12.5, fontWeight: 700,
      display: 'flex', alignItems: 'center', gap: 8,
      boxShadow: '0 10px 30px rgba(0,0,0,0.35)', whiteSpace: 'nowrap',
      maxWidth: '88%', overflow: 'hidden', textOverflow: 'ellipsis'
    }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.good, flexShrink: 0 }} />
      {msg.text}
    </div>);
}

// Cinta de confianza — Essbio "Medición verificada" (footer, no header)
function TrustRibbon({ note = 'Essbio Mide' }) {
  return (
    <div style={{ padding: '2px 16px 12px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 11,
        padding: '10px 12px', borderRadius: 14,
        background: COLORS.card, border: `1px solid ${COLORS.divider}`,
        boxShadow: COLORS.shadow
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 999, background: COLORS.goodSoft,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke={COLORS.good} strokeWidth="1.6" />
            <path d="M8.5 12l2.3 2.3L15.5 9.5" stroke={COLORS.good} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.1 }}>Medición verificada</div>
          <div style={{ fontSize: 11, color: COLORS.inkMuted, marginTop: 1 }}>{note}</div>
        </div>
        <span style={{
          background: '#FFFFFF', borderRadius: 8, padding: '5px 9px',
          display: 'inline-flex', alignItems: 'center', flexShrink: 0,
          border: `1px solid ${COLORS.divider}`
        }}>
          <img src="assets/essbio-logo.png" alt="Essbio" style={{ height: 15, display: 'block' }} />
        </span>
      </div>
    </div>);
}

// ─────────────────────────────────────────────────────────
// PANTALLA 1 — INICIO
// ─────────────────────────────────────────────────────────
const TIPS = [
{ t: 'Cierra la llave al enjabonarte', d: 'Una ducha de 8 minutos con la llave abierta usa hasta 80 L. Ciérrala al enjabonarte y ahorra ~50 L.' },
{ t: 'Repara las llaves que gotean', d: 'Una llave goteando pierde hasta 46 L al día — más de 1.300 L al mes sin que lo notes.' },
{ t: 'Lava el auto con balde', d: 'Frente a la manguera, un balde ahorra cerca de 300 L por lavado. Tu auto queda igual de limpio.' },
{ t: 'Riega temprano o de noche', d: 'Evitas la evaporación del mediodía: la planta aprovecha más agua y tú usas menos.' },
{ t: 'Usa cargas completas', d: 'Lavadora y lavavajillas con carga completa ahorran hasta 60 L por ciclo frente a cargas parciales.' },
{ t: 'Revisa el estanque del WC', d: 'Un WC con fuga silenciosa pierde hasta 200 L al día. Echa unas gotas de colorante al estanque: si llegan a la taza sin tirar la cadena, hay fuga.' },
{ t: 'Instala aireadores en las llaves', d: 'Cuestan poco y mezclan aire con agua: reducen el consumo de cada llave hasta 40% sin que notes la diferencia.' },
{ t: 'Reutiliza el agua de las verduras', d: 'El agua con que lavas frutas y verduras sirve perfecto para regar tus plantas. Júntala en un recipiente y dale una segunda vida.' },
{ t: 'Descongela en el refrigerador', d: 'Descongelar alimentos bajo la llave gasta hasta 15 L por vez. Planifica y descongela en el refrigerador desde la noche anterior.' },
{ t: 'Barre en vez de manguerear', d: 'Limpiar el patio o la vereda con escoba en vez de manguera ahorra unos 200 L cada vez. El resultado es el mismo.' }];


function GaugeRing({ value = 8.7, max = 15, delta = -12, go = true }) {
  const pct = Math.min(value / max, 1);
  const R = 78, C = 2 * Math.PI * R;
  const animPct = useAnimatedNumber(pct, 1100, 4, go);
  const animVal = useAnimatedNumber(value, 1100, 2, go);
  const dash = C * animPct;
  return (
    <div style={{ position: 'relative', width: 200, height: 200 }}>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="gaugeG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={COLORS.aqua} />
            <stop offset="100%" stopColor={COLORS.primary} />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={R} stroke={COLORS.aquaSoft} strokeWidth="14" fill="none" />
        <circle cx="100" cy="100" r={R} stroke="url(#gaugeG)" strokeWidth="14" fill="none"
        strokeDasharray={`${dash} ${C}`} strokeLinecap="round"
        transform="rotate(-90 100 100)" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = i / 12 * Math.PI * 2 - Math.PI / 2;
          const x1 = 100 + Math.cos(a) * 92, y1 = 100 + Math.sin(a) * 92;
          const x2 = 100 + Math.cos(a) * 96, y2 = 100 + Math.sin(a) * 96;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS.divider} strokeWidth="1.5" />;
        })}
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ fontSize: 11, color: COLORS.inkMuted, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Consumo</div>
        <div style={{ fontFamily: NUMFONT, fontSize: 56, fontWeight: 600, color: COLORS.ink, letterSpacing: -1.5, lineHeight: 1 }}>
          {animVal.toFixed(1).replace('.', ',')}<span style={{ fontFamily: '"Geist", system-ui, sans-serif', fontSize: 16, color: COLORS.inkSoft, fontWeight: 600, marginLeft: 4 }}>m³</span>
        </div>
        <div style={{
          marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4,
          background: COLORS.goodSoft, color: COLORS.good,
          padding: '4px 9px', borderRadius: 999, fontSize: 12, fontWeight: 700
        }}>
          {Icon.arrowDown(COLORS.good, 11)} {Math.abs(delta)}% vs mes ant.
        </div>
      </div>
    </div>);
}

function BalanceDisplay({ balance }) {
  const n = useAnimatedNumber(balance, 1100);
  return (
    <div style={{ fontFamily: NUMFONT, fontSize: 48, fontWeight: 600, color: '#fff', letterSpacing: -1.2, lineHeight: 1 }}>
      {fmtCL(n)}<span style={{ fontFamily: '"Geist", system-ui, sans-serif', fontSize: 15, fontWeight: 600, opacity: 0.7, marginLeft: 6 }}>AC</span>
    </div>);
}

function ScreenInicio({ state, dispatch, goPremios, openProfile }) {
  const h = new Date().getHours();
  const greeting = h < 12 ? '¡Hola, buen día!' : h < 20 ? '¡Hola, buenas tardes!' : '¡Hola, buenas noches!';
  const now = new Date();
  const month = now.toLocaleDateString('es-CL', { month: 'long' });
  const daysLeft = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate();
  const multiActive = state.multiplierUntil > Date.now();
  const multiDays = multiActive ? Math.ceil((state.multiplierUntil - Date.now()) / DAY) : 0;
  const tip = TIPS[state.tipIndex % TIPS.length];

  return (
    <div style={{ paddingBottom: 24 }}>
      <AppHeader
        subtitle={greeting}
        title={state.userName}
        right={
        <button onClick={() => { haptic(); openProfile(); }} aria-label="Tu perfil y ajustes" style={{
          width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer',
          background: `linear-gradient(135deg, ${COLORS.aqua}, ${COLORS.primary})`,
          color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(14,159,190,0.35)'
        }}>{initials(state.userName)}</button>
        } />

      {/* Tarjeta de saldo */}
      <div style={{ padding: '4px 16px 14px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDk} 100%)`,
          borderRadius: 22, padding: '18px 20px', position: 'relative', overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(14,110,126,0.28)'
        }}>
          <svg style={{ position: 'absolute', right: -10, top: -10, opacity: 0.15 }} width="160" height="160" viewBox="0 0 160 160">
            <circle cx="100" cy="60" r="60" fill="#fff" />
            <circle cx="140" cy="120" r="35" fill="#fff" />
          </svg>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500, letterSpacing: 0.4, textTransform: 'uppercase' }}>AQUACOINS</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                {Icon.coin(28)}
                <BalanceDisplay balance={state.balance} />
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                +85 AC esta semana
                {multiActive &&
                <span style={{
                  background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)',
                  borderRadius: 999, padding: '2px 8px', fontSize: 10.5, fontWeight: 700, color: '#fff'
                }}>×2 activo · {multiDays} d</span>
                }
              </div>
            </div>
            <button onClick={goPremios} style={{
              border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.12)',
              color: '#fff', fontSize: 12, fontWeight: 600, padding: '8px 12px',
              borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit'
            }}>Canjear →</button>
          </div>
        </div>
      </div>

      {/* Gauge + métricas */}
      <div style={{ padding: '0 16px 14px' }}>
        <Card style={{ padding: '20px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink }}>Consumo de {month}</div>
            <div style={{ fontSize: 11, color: COLORS.inkMuted, fontWeight: 600 }}>{daysLeft} días restantes</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 6px' }}>
            <GaugeRing />
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0,
            borderTop: `1px solid ${COLORS.divider}`, paddingTop: 14, marginTop: 4
          }}>
            {[
            { l: 'Promedio diario', v: '0,29 m³', s: '−14% vs mes ant.' },
            { l: 'Meta del mes', v: '15,0 m³', s: 'Bonus: +120 AC' },
            { l: 'Proyección', v: '13,0 m³', s: 'Cumplirás meta' }].
            map((s, i) =>
            <div key={i} style={{
              paddingLeft: i === 0 ? 0 : 12,
              borderLeft: i === 0 ? 'none' : `1px solid ${COLORS.divider}`
            }}>
                <div style={{ fontSize: 10, color: COLORS.inkMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>{s.l}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink, marginTop: 3 }}>{s.v}</div>
                <div style={{ fontSize: 10.5, color: COLORS.good, marginTop: 1, fontWeight: 600 }}>{s.s}</div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Cinta de confianza Essbio */}
      <TrustRibbon note="Essbio Mide · lectura oficial del medidor" />

      {/* Tip conductual (informativo, rota al confirmar) */}
      <div style={{ padding: '0 16px 14px' }}>
        <Card style={{ padding: 0, overflow: 'hidden', border: `1.5px solid ${COLORS.aquaSoft}` }}>
          <div key={state.tipIndex} className="ar-fade" style={{
            background: `linear-gradient(180deg, ${COLORS.aquaSoft} 0%, ${COLORS.card} 100%)`,
            padding: 18
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <Pill bg={COLORS.card} color={COLORS.primary} style={{ border: `1px solid ${COLORS.aquaSoft}` }}>
                {Icon.spark(11)} TIP DE HOY
              </Pill>
              <span style={{ fontSize: 10.5, color: COLORS.inkMuted, fontWeight: 600 }}>
                {state.tipIndex % TIPS.length + 1} de {TIPS.length}
              </span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.ink, lineHeight: 1.3, letterSpacing: -0.2 }}>
              {tip.t}
            </div>
            <div style={{ fontSize: 13, color: COLORS.inkSoft, marginTop: 4, lineHeight: 1.45 }}>
              {tip.d}
            </div>
            <div style={{ marginTop: 14 }}>
              <button onClick={() => { haptic(); dispatch({ type: 'nextTip' }); }} style={{
                width: '100%', background: 'transparent', color: COLORS.primary,
                border: `1px solid ${COLORS.divider}`,
                padding: '11px 14px', borderRadius: 12,
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
              }}>Entendido · ver otro tip</button>
            </div>
          </div>
        </Card>
      </div>
    </div>);
}

// ─────────────────────────────────────────────────────────
// PANTALLA 2 — PREMIOS (canje funcional)
// ─────────────────────────────────────────────────────────
const REWARDS = [
{ id: 'essbio', icon: (s) => Icon.receipt(s), title: 'Descuento en boleta Essbio', sub: '15% en próxima cuenta', cost: 800, tag: 'POPULAR', tagColor: () => COLORS.primary, tint: () => COLORS.aquaSoft, cat: 'servicios' },
{ id: 'ducha', icon: (s) => Icon.shower(s), title: 'Kit ahorro ducha', sub: 'Cabezal eficiente + reductor', cost: 600, tag: '', tagColor: () => '#B5641F', tint: () => '#FFE9D2', cat: 'eco' },
{ id: 'lluvia', icon: (s) => Icon.tank(s), title: 'Estanque recolector lluvia', sub: 'Barril 200 L para riego sin agua potable', cost: 500, tag: 'ECO', tagColor: () => COLORS.forest, tint: () => COLORS.aquaSoft, cat: 'eco' },
{ id: 'tree', icon: (s) => Icon.tree(s), title: 'Planta árbol nativo', sub: 'Quillay sembrado en Arauco', cost: 300, tag: 'ECO', tagColor: () => COLORS.forest, tint: () => '#E2EFE6', cat: 'eco' },
{ id: 'badge', icon: (s) => Icon.badge(s), title: 'Multiplicador', sub: 'Bonifica ×2 tus AquaCoins por 7 días', cost: 200, tag: '', tagColor: () => COLORS.coin, tint: () => COLORS.coinSoft, cat: 'insignias' }];

const CATS = [
{ id: 'todo', l: 'Todo' },
{ id: 'servicios', l: 'Servicios' },
{ id: 'eco', l: 'Eco' },
{ id: 'insignias', l: 'Insignias' }];


function RewardRowInline({ item, balance, redeemedCount, multiActive, onRedeem }) {
  const isActiveMulti = item.id === 'badge' && multiActive;
  const can = balance >= item.cost && !isActiveMulti;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px' }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: item.tint(), flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>{item.icon(26)}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.1 }}>{item.title}</div>
          {item.tag &&
          <span style={{
            background: COLORS.card, color: item.tagColor(),
            border: `1px solid ${item.tagColor()}33`,
            fontSize: 9, fontWeight: 700, letterSpacing: 0.3,
            padding: '2px 6px', borderRadius: 4
          }}>{item.tag}</span>
          }
          {redeemedCount > 0 && !isActiveMulti &&
          <span style={{
            background: COLORS.goodSoft, color: COLORS.good,
            fontSize: 9, fontWeight: 700, letterSpacing: 0.3,
            padding: '2px 6px', borderRadius: 4
          }}>✓ ×{redeemedCount}</span>
          }
        </div>
        <div style={{ fontSize: 11.5, color: COLORS.inkMuted, lineHeight: 1.35 }}>{item.sub}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
          {Icon.coin(13)}
          <span style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.ink }}>{item.cost} AC</span>
        </div>
      </div>
      <button disabled={!can} onClick={() => can && onRedeem(item)} style={{
        background: isActiveMulti ? COLORS.goodSoft : can ? COLORS.primary : COLORS.divider,
        color: isActiveMulti ? COLORS.good : can ? '#fff' : COLORS.inkMuted,
        border: 'none', padding: '8px 14px', borderRadius: 999,
        fontSize: 12, fontWeight: 700, cursor: can ? 'pointer' : 'not-allowed',
        flexShrink: 0, fontFamily: 'inherit'
      }}>{isActiveMulti ? 'Activo ✓' : can ? 'Canjear' : 'Faltan ' + fmtCL(item.cost - balance)}</button>
    </div>);
}

function ScreenPremios({ state, dispatch, showToast }) {
  const [cat, setCat] = React.useState('todo');
  const [pending, setPending] = React.useState(null); // premio en confirmación
  const balance = state.balance;
  const multiActive = state.multiplierUntil > Date.now();
  const counts = React.useMemo(() => {
    const c = { todo: REWARDS.length };
    REWARDS.forEach((r) => { c[r.cat] = (c[r.cat] || 0) + 1; });
    return c;
  }, []);
  const redeemedBy = (id) => state.redemptions.filter((r) => r.id === id).length;
  const featured = REWARDS[0];
  const showFeatured = cat === 'todo' || cat === featured.cat;
  const list = REWARDS.slice(1).filter((r) => cat === 'todo' || r.cat === cat);

  const confirmRedeem = () => {
    if (!pending || balance < pending.cost) return;
    haptic();
    dispatch({ type: 'redeem', reward: pending });
    showToast(pending.id === 'badge' ?
    '×2 AquaCoins activo por 7 días' :
    `Canjeaste: ${pending.title}`);
    setPending(null);
  };

  return (
    <div style={{ paddingBottom: 24 }}>
      <AppHeader
        subtitle="Catálogo de recompensas"
        title="Premios"
        right={
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: COLORS.coinSoft, padding: '7px 12px', borderRadius: 999
        }}>
            {Icon.coin(16)}
            <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.coin === '#E8A317' ? '#7d5a13' : COLORS.coin }}>{fmtCL(balance)} AC</span>
          </div>
        } />

      {/* Filtros por categoría (funcionales) */}
      <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {CATS.map((t) => {
          const active = cat === t.id;
          return (
            <button key={t.id} onClick={() => { setCat(t.id); haptic(); }} style={{
              padding: '7px 13px', borderRadius: 999,
              background: active ? COLORS.ink : COLORS.card,
              color: active ? COLORS.bg : COLORS.inkSoft,
              fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap',
              border: active ? 'none' : `1px solid ${COLORS.divider}`,
              display: 'flex', alignItems: 'center', gap: 5,
              cursor: 'pointer', fontFamily: 'inherit'
            }}>
              {t.l}
              <span style={{ fontSize: 10, opacity: 0.6, fontWeight: 600 }}>{counts[t.id] || 0}</span>
            </button>);
        })}
      </div>

      {/* Destacado */}
      {showFeatured &&
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.card} 0%, ${COLORS.aquaSoft} 100%)`,
          borderRadius: 20, padding: 18, position: 'relative', overflow: 'hidden',
          border: `1px solid ${COLORS.divider}`
        }}>
          <Pill bg={COLORS.coin} color="#fff">DESTACADO</Pill>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: COLORS.card, border: `1px solid ${COLORS.divider}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{Icon.receipt(34)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.2 }}>15% en boleta Essbio</div>
              <div style={{ fontSize: 12, color: COLORS.inkSoft, marginTop: 2 }}>Aplicable al próximo ciclo. 124 personas lo canjearon esta semana.</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {Icon.coin(18)}
              <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.ink }}>{featured.cost} <span style={{ fontSize: 12, color: COLORS.inkMuted, fontWeight: 600 }}>AC</span></span>
            </div>
            <button
            disabled={balance < featured.cost}
            onClick={() => balance >= featured.cost && setPending(featured)}
            style={{
              background: balance >= featured.cost ? COLORS.primary : COLORS.divider,
              color: balance >= featured.cost ? '#fff' : COLORS.inkMuted,
              border: 'none', padding: '10px 18px', borderRadius: 999,
              fontSize: 13, fontWeight: 700,
              cursor: balance >= featured.cost ? 'pointer' : 'not-allowed', fontFamily: 'inherit'
            }}>{balance >= featured.cost ? 'Canjear →' : `Faltan ${fmtCL(featured.cost - balance)}`}</button>
          </div>
        </div>
      </div>
      }

      {/* Lista */}
      {list.length > 0 &&
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ fontSize: 11, color: COLORS.inkMuted, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '0 4px 8px' }}>Disponibles ahora</div>
        <Card style={{ padding: 0 }}>
          {list.map((r, i) =>
          <div key={r.id} style={{ borderBottom: i < list.length - 1 ? `1px solid ${COLORS.divider}` : 'none' }}>
              <RewardRowInline
              item={r} balance={balance}
              redeemedCount={redeemedBy(r.id)}
              multiActive={multiActive}
              onRedeem={(item) => setPending(item)} />
            </div>
          )}
        </Card>
      </div>
      }

      {/* Historial de canjes */}
      {state.redemptions.length > 0 &&
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 11, color: COLORS.inkMuted, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '0 4px 8px', display: 'flex', alignItems: 'center', gap: 5 }}>
          {Icon.history(COLORS.inkMuted, 13)} Mis canjes
        </div>
        <Card style={{ padding: 0 }}>
          {state.redemptions.slice(0, 6).map((r, i, arr) => {
            const item = REWARDS.find((x) => x.id === r.id);
            return (
              <div key={r.ts + '-' + i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.divider}` : 'none'
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, background: item ? item.tint() : COLORS.aquaSoft,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>{item ? item.icon(20) : Icon.coin(20)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.ink }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.inkMuted, marginTop: 1 }}>
                    {new Date(r.ts).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.danger }}>−{fmtCL(r.cost)} AC</span>
              </div>);
          })}
        </Card>
      </div>
      }

      {/* Hoja de confirmación de canje */}
      <BottomSheet open={!!pending} onClose={() => setPending(null)}>
        {pending &&
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, background: pending.tint(),
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>{pending.icon(30)}</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.2 }}>{pending.title}</div>
              <div style={{ fontSize: 12.5, color: COLORS.inkMuted, marginTop: 2 }}>{pending.sub}</div>
            </div>
          </div>
          <SheetRow label="Costo" value={`−${fmtCL(pending.cost)} AC`} />
          <SheetRow label="Saldo actual" value={`${fmtCL(balance)} AC`} />
          <SheetRow label="Saldo después del canje" value={`${fmtCL(balance - pending.cost)} AC`} strong />
          <SheetButton onClick={confirmRedeem} disabled={balance < pending.cost}>
            Confirmar canje
          </SheetButton>
          <SheetButton ghost onClick={() => setPending(null)}>Cancelar</SheetButton>
        </>
        }
      </BottomSheet>
    </div>);
}

// ─────────────────────────────────────────────────────────
// PANTALLA 3 — COMUNIDAD (donaciones funcionales)
// ─────────────────────────────────────────────────────────
function ImpactCounter({ target, go }) {
  const n = useAnimatedNumber(target, 1400, 0, go);
  return (
    <span style={{ fontFamily: NUMFONT, fontWeight: 600, fontSize: 56, letterSpacing: -1.6, lineHeight: 1 }}>{fmtCL(n)}</span>);
}

// Tarjeta de proyecto — cada una mantiene su propio selector de aporte
function ProjectCard({ proj, pstate, balance, onConfirm }) {
  const [donMode, setDonMode] = React.useState('ac'); // 'ac' | 'm3'
  const [donAC, setDonAC] = React.useState(50);
  const [donM3, setDonM3] = React.useState(2);
  const clp = (n) => n.toLocaleString('es-CL');

  const funded = pstate.funded;
  const pct = Math.min(funded / proj.goal, 1);
  const complete = funded >= proj.goal;
  const canDonateAC = balance >= donAC;

  return (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            height: 150, position: 'relative', overflow: 'hidden',
            backgroundImage: `url("${proj.img}")`,
            backgroundSize: 'cover', backgroundPosition: 'center 40%'
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(10,34,51,0.18) 0%, transparent 35%, transparent 60%, rgba(10,34,51,0.45) 100%)'
            }} />
            <div style={{
              position: 'absolute', bottom: 10, left: 12, right: 12,
              display: 'flex', alignItems: 'center', gap: 6,
              color: '#fff', fontSize: 11, fontWeight: 600,
              textShadow: '0 1px 4px rgba(0,0,0,0.5)'
            }}>
              {Icon.pipe(18)} {proj.loc} · Región del Biobío
            </div>
            <div style={{
              position: 'absolute', top: 12, left: 12,
              background: 'rgba(255,255,255,0.95)', color: COLORS.forest,
              padding: '5px 10px', borderRadius: 999, fontSize: 10.5, fontWeight: 700,
              letterSpacing: 0.4, textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: 5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: COLORS.good }} />
              {complete ? 'Financiado' : 'Activo'}
            </div>
          </div>

          <div style={{ padding: 18 }}>
            <div style={{ fontSize: 11, color: COLORS.inkMuted, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 }}>
              Proyecto comunitario
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.3, lineHeight: 1.25 }}>
              {proj.title}
            </div>
            <div style={{ fontSize: 13, color: COLORS.inkSoft, marginTop: 2 }}>{proj.loc} · {proj.fam}</div>

            {/* progreso */}
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: complete ? COLORS.good : COLORS.ink }}>
                  {complete ? '¡100% financiado!' : `${Math.round(pct * 100)}% financiado`}
                </span>
                <span style={{ fontSize: 12, color: COLORS.inkMuted, fontWeight: 600 }}>{fmtCL(funded)} / {fmtCL(proj.goal)} AC</span>
              </div>
              <div style={{ height: 10, borderRadius: 999, background: COLORS.divider, overflow: 'hidden', position: 'relative' }}>
                <div style={{
                  width: `${pct * 100}%`, height: '100%',
                  background: `linear-gradient(90deg, ${COLORS.aqua}, ${COLORS.primary})`,
                  borderRadius: 999, position: 'relative',
                  transition: 'width .9s cubic-bezier(.2,.7,.2,1)'
                }}>
                  <div style={{
                    position: 'absolute', right: 0, top: 0, bottom: 0, width: 14,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5))'
                  }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: COLORS.inkMuted }}>
                <span><b style={{ color: COLORS.ink }}>{fmtCL(pstate.donors)}</b> donantes</span>
                <span>Finaliza en <b style={{ color: COLORS.ink }}>{proj.days} días</b></span>
              </div>
              {(pstate.myAC > 0 || pstate.myCLP > 0) &&
              <div style={{
                marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6,
                background: COLORS.goodSoft, color: COLORS.good,
                padding: '5px 11px', borderRadius: 999, fontSize: 11.5, fontWeight: 700
              }}>
                ♥ Tu aporte: {pstate.myAC > 0 ? `${fmtCL(pstate.myAC)} AC` : ''}{pstate.myAC > 0 && pstate.myCLP > 0 ? ' · ' : ''}{pstate.myCLP > 0 ? `$${fmtCL(pstate.myCLP)}` : ''}
              </div>
              }
            </div>

            {/* selector de donación */}
            {!complete &&
            <div style={{
              marginTop: 18, padding: 14, background: COLORS.bg,
              borderRadius: 14, border: `1px solid ${COLORS.divider}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: COLORS.inkSoft, fontWeight: 600 }}>Elige tu aporte</div>
                <div style={{ display: 'flex', gap: 2, background: COLORS.card, borderRadius: 9, padding: 2, border: `1px solid ${COLORS.divider}` }}>
                  {[{ k: 'ac', t: 'AquaCoins' }, { k: 'm3', t: 'Agua m³' }].map((o) =>
                  <button key={o.k} onClick={() => { setDonMode(o.k); haptic(); }} style={{
                    padding: '5px 11px', borderRadius: 7, border: 'none', cursor: 'pointer',
                    background: donMode === o.k ? COLORS.primary : 'transparent',
                    color: donMode === o.k ? '#fff' : COLORS.inkSoft,
                    fontSize: 11.5, fontWeight: 700, fontFamily: 'inherit'
                  }}>{o.t}</button>
                  )}
                </div>
              </div>

              {donMode === 'ac' ?
              <div style={{ display: 'flex', gap: 6 }}>
                {[25, 50, 100, 250].map((v) =>
                <button key={v} onClick={() => setDonAC(v)} style={{
                  flex: 1, padding: '10px 0', borderRadius: 10,
                  background: donAC === v ? COLORS.primary : COLORS.card,
                  color: donAC === v ? '#fff' : COLORS.ink,
                  border: donAC === v ? 'none' : `1px solid ${COLORS.divider}`,
                  fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                  fontFamily: 'inherit'
                }}>{v} AC</button>
                )}
              </div> :
              <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 5, 10].map((v) =>
                <button key={v} onClick={() => setDonM3(v)} style={{
                  flex: 1, padding: '8px 0', borderRadius: 10,
                  background: donM3 === v ? COLORS.primary : COLORS.card,
                  color: donM3 === v ? '#fff' : COLORS.ink,
                  border: donM3 === v ? 'none' : `1px solid ${COLORS.divider}`,
                  cursor: 'pointer', lineHeight: 1.1, fontFamily: 'inherit'
                }}>
                    <div style={{ fontSize: 14, fontWeight: 800 }}>{v} m³</div>
                    <div style={{ fontSize: 10, fontWeight: 600, opacity: donM3 === v ? 0.85 : 0.6, marginTop: 1 }}>
                      ${clp(v * CLP_PER_M3)}
                    </div>
                  </button>
                )}
              </div>}

              <button
              disabled={donMode === 'ac' && !canDonateAC}
              onClick={() => onConfirm(donMode, donMode === 'ac' ? donAC : donM3)}
              style={{
                width: '100%', marginTop: 10,
                background: donMode === 'ac' && !canDonateAC ? COLORS.divider : COLORS.ink,
                color: donMode === 'ac' && !canDonateAC ? COLORS.inkMuted : COLORS.bg,
                border: 'none', padding: '13px', borderRadius: 12,
                fontSize: 14, fontWeight: 700,
                cursor: donMode === 'ac' && !canDonateAC ? 'not-allowed' : 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                fontFamily: 'inherit'
              }}>
                {donMode === 'ac' ?
                canDonateAC ? `Donar ${donAC} AC al proyecto →` : 'Saldo insuficiente' :
                `Donar $${clp(donM3 * CLP_PER_M3)} al proyecto →`}
              </button>
              <div style={{ fontSize: 10.5, color: COLORS.inkMuted, marginTop: 8, textAlign: 'center', lineHeight: 1.4 }}>
                {donMode === 'm3' ?
                `Equivale a ${donM3} m³ de agua · tarifa referencial Essbio` :
                'Se descuentan de tu saldo de AquaCoins'}
              </div>
            </div>
            }
            {complete &&
            <div style={{
              marginTop: 18, padding: 16, background: COLORS.goodSoft,
              borderRadius: 14, textAlign: 'center'
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.good }}>🎉 ¡Meta alcanzada!</div>
              <div style={{ fontSize: 12, color: COLORS.inkSoft, marginTop: 4 }}>
                Gracias a {fmtCL(pstate.donors)} donantes, el proyecto está 100% financiado.
              </div>
            </div>
            }
          </div>
        </Card>);
}

function ScreenComunidad({ state, dispatch, showToast, active }) {
  const [pending, setPending] = React.useState(null); // { proj, mode, amount }
  const [page, setPage] = React.useState(0);
  const clp = (n) => n.toLocaleString('es-CL');
  const canConfirm = !pending || pending.mode !== 'ac' || state.balance >= pending.amount;

  const confirmDonation = () => {
    if (!pending) return;
    haptic();
    if (pending.mode === 'ac') {
      if (state.balance < pending.amount) return;
      dispatch({ type: 'donateAC', pid: pending.proj.id, amount: pending.amount });
      showToast(`¡Gracias! Aportaste ${pending.amount} AC a ${pending.proj.loc}`);
    } else {
      dispatch({ type: 'donateM3', pid: pending.proj.id, m3: pending.amount });
      showToast(`¡Gracias! Aportaste $${clp(pending.amount * CLP_PER_M3)} a ${pending.proj.loc}`);
    }
    setPending(null);
  };

  return (
    <div style={{ paddingBottom: 24 }}>
      <AppHeader subtitle="Tu impacto en la región" title="Comunidad" />

      {/* Carrusel de proyectos comunitarios */}
      <div className="ar-carousel"
      onScroll={(e) => {
        const el = e.currentTarget;
        setPage(Math.round(el.scrollLeft / el.clientWidth));
      }}
      style={{
        display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none', gap: 12, padding: '0 16px'
      }}>
        {PROJECTS.map((p) =>
        <div key={p.id} style={{ flex: '0 0 100%', scrollSnapAlign: 'center', minWidth: 0 }}>
            <ProjectCard
          proj={p}
          pstate={state.projects[p.id]}
          balance={state.balance}
          onConfirm={(mode, amount) => setPending({ proj: p, mode, amount })} />
          </div>
        )}
      </div>
      {/* indicador de páginas */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, padding: '12px 0 14px' }}>
        {PROJECTS.map((p, i) =>
        <span key={p.id} style={{
          width: page === i ? 20 : 7, height: 7, borderRadius: 999,
          background: page === i ? COLORS.primary : COLORS.divider,
          transition: 'all .3s'
        }} />
        )}
        <span style={{ fontSize: 10.5, color: COLORS.inkMuted, fontWeight: 600, marginLeft: 8 }}>
          Desliza para ver más proyectos
        </span>
      </div>

      {/* Impacto personal */}
      <div style={{ padding: '0 16px 14px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.aqua}, ${COLORS.primary})`,
          borderRadius: 22, padding: 20, color: '#fff', position: 'relative', overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(59,181,199,0.25)'
        }}>
          <svg style={{ position: 'absolute', right: -8, top: -8, opacity: 0.16 }} width="180" height="180" viewBox="0 0 180 180">
            <path d="M120 30c-15 18-26 32-26 48a26 26 0 0 0 52 0c0-16-11-30-26-48z" fill="#fff" />
            <path d="M60 90c-9 11-16 19-16 30a16 16 0 0 0 32 0c0-11-7-19-16-30z" fill="#fff" />
          </svg>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Impacto acumulado</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
              <ImpactCounter target={14200} go={active} />
              <span style={{ fontSize: 18, fontWeight: 600, opacity: 0.85 }}>L conservados</span>
            </div>
            <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6, lineHeight: 1.4 }}>
              Equivalen a <b>71 días de agua potable</b> para una familia rural de 4 personas.
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10,
              marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>9</div>
                <div style={{ fontSize: 10.5, opacity: 0.8, fontWeight: 600 }}>Meses activo</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>4</div>
                <div style={{ fontSize: 10.5, opacity: 0.8, fontWeight: 600 }}>Árboles plantados</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>2,3 t</div>
                <div style={{ fontSize: 10.5, opacity: 0.8, fontWeight: 600 }}>CO₂ evitado</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Otras iniciativas */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 11, color: COLORS.inkMuted, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '0 4px 8px' }}>Otras iniciativas</div>
        <Card style={{ padding: 0 }}>
          {[
          { icon: (s) => Icon.tree(s), title: 'Reforestación cuenca río Andalién', loc: 'Concepción · 41%', tint: '#E2EFE6' },
          { icon: (s) => Icon.shield(s), title: 'Sensores comunitarios de napas', loc: 'Los Ángeles · 12%', tint: COLORS.aquaSoft }].
          map((p, i, a) =>
          <div key={i}
          onClick={() => showToast('Próximamente: más proyectos comunitarios')}
          style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
            borderBottom: i < a.length - 1 ? `1px solid ${COLORS.divider}` : 'none',
            cursor: 'pointer'
          }}>
              <div style={{
              width: 44, height: 44, borderRadius: 12, background: p.tint,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>{p.icon(22)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.ink }}>{p.title}</div>
                <div style={{ fontSize: 11.5, color: COLORS.inkMuted, marginTop: 1 }}>{p.loc}</div>
              </div>
              <div style={{ color: COLORS.inkMuted, fontSize: 18 }}>›</div>
            </div>
          )}
        </Card>
      </div>

      {/* Hoja de confirmación de donación */}
      <BottomSheet open={!!pending} onClose={() => setPending(null)}>
        {pending &&
        <>
          <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.2, marginBottom: 4 }}>
            Confirmar donación
          </div>
          <div style={{ fontSize: 12.5, color: COLORS.inkMuted, marginBottom: 12 }}>
            {pending.proj.title} · {pending.proj.loc}
          </div>
          {pending.mode === 'ac' ?
          <>
            <SheetRow label="Aporte" value={`${pending.amount} AC`} />
            <SheetRow label="Saldo actual" value={`${fmtCL(state.balance)} AC`} />
            <SheetRow label="Saldo después" value={`${fmtCL(state.balance - pending.amount)} AC`} strong />
          </> :
          <>
            <SheetRow label="Aporte" value={`${pending.amount} m³ de agua`} />
            <SheetRow label="Equivalente en dinero" value={`$${fmtCL(pending.amount * CLP_PER_M3)}`} strong />
            <div style={{ fontSize: 11, color: COLORS.inkMuted, padding: '10px 0 0', lineHeight: 1.4 }}>
              Demo: pago simulado · tarifa referencial Essbio $1.180/m³
            </div>
          </>
          }
          <SheetButton onClick={confirmDonation} disabled={!canConfirm}>
            {pending.mode === 'ac' ? `Donar ${pending.amount} AC` : `Donar $${fmtCL(pending.amount * CLP_PER_M3)}`}
          </SheetButton>
          <SheetButton ghost onClick={() => setPending(null)}>Cancelar</SheetButton>
        </>
        }
      </BottomSheet>
    </div>);
}

// ─────────────────────────────────────────────────────────
// PANTALLA 4 — REPORTES (módulo de mapa en iframe)
// ─────────────────────────────────────────────────────────
function ScreenReportes({ dark }) {
  const ref = React.useRef(null);
  const mode = dark ? 'oscuro' : 'claro';
  React.useEffect(() => {
    const send = () => {
      try {
        const w = ref.current && ref.current.contentWindow;
        if (!w) return;
        w.postMessage({ type: 'aqua-theme', mode }, '*');
        // Los iframes no heredan env(safe-area-inset-*): se lo pasamos medido.
        const probe = document.getElementById('sat-probe');
        const top = probe ? probe.getBoundingClientRect().height : 0;
        w.postMessage({ type: 'aqua-insets', top }, '*');
      } catch (e) {}
    };
    send();
    const f = ref.current;
    if (f) f.addEventListener('load', send);
    return () => { if (f) f.removeEventListener('load', send); };
  }, [mode]);
  return (
    <iframe
      ref={ref}
      src={`reportes.html?theme=${mode}`}
      title="Reportes comunitarios"
      style={{ display: 'block', width: '100%', height: '100%', border: 'none', background: COLORS.bg }} />);
}

// ─────────────────────────────────────────────────────────
// BIENVENIDA — registro de nombre al primer uso
// ─────────────────────────────────────────────────────────
function Welcome({ dark, onDone }) {
  const [name, setName] = React.useState('');
  const valid = name.trim().length >= 2;
  const go = () => { if (valid) { haptic(); onDone(name.trim()); } };
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column',
      padding: 'calc(env(safe-area-inset-top, 0px) + 30px) 26px calc(env(safe-area-inset-bottom, 0px) + 26px)'
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div className="ar-fade">
          <img src={logoSrc(dark)} alt="AquaReward" style={{ width: 250, maxWidth: '78vw', display: 'block', margin: '0 auto' }} />
          <div style={{ marginTop: 22, fontSize: 15.5, color: COLORS.inkSoft, lineHeight: 1.55, maxWidth: 300, marginLeft: 'auto', marginRight: 'auto' }}>
            Gana <b style={{ color: COLORS.ink }}>AquaCoins</b> por ahorrar agua, canjea premios reales y apoya proyectos de agua rural en el Biobío.
          </div>
          <div style={{ marginTop: 16 }}>
            <Pill>Región del Biobío · con datos de Essbio</Pill>
          </div>
        </div>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 13.5, fontWeight: 700, color: COLORS.ink, marginBottom: 8 }}>
          Para empezar, ¿cómo te llamas?
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') go(); }}
          placeholder="Escribe tu nombre"
          maxLength={24}
          autoComplete="name"
          style={{
            width: '100%', padding: '15px 16px', borderRadius: 15,
            border: `1.5px solid ${COLORS.divider}`, background: COLORS.card,
            color: COLORS.ink, fontSize: 16, fontWeight: 600, fontFamily: 'inherit', outline: 'none'
          }} />
        <button disabled={!valid} onClick={go} style={{
          width: '100%', marginTop: 12, padding: 16, borderRadius: 15, border: 'none',
          background: valid ? COLORS.primary : COLORS.divider,
          color: valid ? '#fff' : COLORS.inkMuted,
          fontSize: 16, fontWeight: 800, cursor: valid ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit', transition: 'background .25s'
        }}>Comenzar →</button>
        <div style={{ fontSize: 11.5, color: COLORS.inkMuted, textAlign: 'center', marginTop: 12, lineHeight: 1.4 }}>
          Tu nombre se guarda solo en este teléfono. Sin correos, sin contraseñas.
        </div>
      </div>
    </div>);
}

// ─────────────────────────────────────────────────────────
// MINI TUTORIALES — se muestran la primera vez que se visita cada pantalla
// ─────────────────────────────────────────────────────────
const TUTORIALS = {
  inicio: [
  { icon: '💰', t: 'Tu saldo de AquaCoins', d: 'Ganas AquaCoins (AC) automáticamente por ahorrar agua cada mes. El botón "Canjear" te lleva directo a los premios.' },
  { icon: '💧', t: 'Tu consumo del mes', d: 'El anillo muestra los m³ que llevas y cuánto falta para tu meta. Si cumples la meta, recibes un bonus de AquaCoins.' },
  { icon: '💡', t: 'Tip de hoy', d: 'Cada día un consejo para ahorrar agua en tu casa. Cuando lo hayas leído, tócalo y aparecerá otro.' }],

  premios: [
  { icon: '🎁', t: 'Canjea premios reales', d: 'Usa tus AquaCoins en descuentos, kits de ahorro y más. Toca "Canjear" y confirma: el costo se descuenta de tu saldo.' },
  { icon: '🔎', t: 'Filtra por categoría', d: 'Los botones de arriba filtran el catálogo: Servicios, Eco o Insignias.' },
  { icon: '🧾', t: 'Mis canjes', d: 'Todo lo que canjeas queda registrado al final de esta pantalla, con fecha y costo.' }],

  comunidad: [
  { icon: '🤝', t: 'Apoya proyectos reales', d: 'Dona AquaCoins o m³ de agua a proyectos de agua rural del Biobío. Tu aporte avanza la barra de financiamiento.' },
  { icon: '👉', t: 'Desliza entre proyectos', d: 'Hay más de un proyecto activo: desliza la tarjeta hacia el lado para conocer el proyecto de Cabrero.' }],

  reportes: [
  { icon: '📍', t: 'Mapa comunitario', d: 'Cada pin es un reporte de fuga hecho por vecinos. Tócalo para ver en qué estado está.' },
  { icon: '➕', t: 'Reporta una fuga', d: 'Toca "Reportar", elige el tipo de problema y luego toca el punto exacto del mapa donde está la fuga.' },
  { icon: '✅', t: 'La comunidad confirma', d: 'Con 3 confirmaciones de vecinos, el reporte se escala automáticamente a Essbio.' }]
};

function Tutorial({ screen, dark, onDone }) {
  const steps = TUTORIALS[screen];
  const [i, setI] = React.useState(0);
  if (!steps || !steps.length) return null;
  const st = steps[i];
  const last = i === steps.length - 1;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 95, background: 'rgba(8,16,28,0.62)', display: 'flex', alignItems: 'flex-end' }}>
      <div style={{
        width: '100%', background: COLORS.card, borderRadius: '26px 26px 0 0',
        padding: '20px 24px calc(env(safe-area-inset-bottom, 0px) + 20px)',
        boxShadow: '0 -12px 40px rgba(2,28,138,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <img src={logoSrc(dark)} alt="AquaReward" style={{ height: 20 }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.inkMuted, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Tutorial · {i + 1} de {steps.length}
          </span>
        </div>
        <div key={i} className="ar-fade">
          <div style={{ fontSize: 38, lineHeight: 1 }}>{st.icon}</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: COLORS.ink, marginTop: 10, letterSpacing: -0.3 }}>{st.t}</div>
          <div style={{ fontSize: 14, color: COLORS.inkSoft, marginTop: 6, lineHeight: 1.5, minHeight: 63 }}>{st.d}</div>
        </div>
        <div style={{ display: 'flex', gap: 5, margin: '16px 0 14px' }}>
          {steps.map((_, k) =>
          <span key={k} style={{
            height: 6, borderRadius: 999, flex: k === i ? 2.2 : 1,
            background: k <= i ? COLORS.primary : COLORS.divider, transition: 'all .3s'
          }} />
          )}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onDone} style={{
            flex: 1, background: 'transparent', color: COLORS.inkSoft,
            border: `1px solid ${COLORS.divider}`, padding: 13, borderRadius: 13,
            fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
          }}>Saltar</button>
          <button onClick={() => { haptic(); if (last) onDone();else setI(i + 1); }} style={{
            flex: 2, background: COLORS.primary, color: '#fff', border: 'none',
            padding: 13, borderRadius: 13, fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit'
          }}>{last ? '¡Entendido!' : 'Siguiente →'}</button>
        </div>
      </div>
    </div>);
}

// ─────────────────────────────────────────────────────────
// PERFIL — avatar (arriba a la derecha en Inicio): nombre y modo fácil
// ─────────────────────────────────────────────────────────
function Switch({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} aria-pressed={on} aria-label="Activar" style={{
      width: 52, height: 32, borderRadius: 999, border: 'none', cursor: 'pointer',
      background: on ? COLORS.good : COLORS.divider, position: 'relative',
      transition: 'background .25s', flexShrink: 0, padding: 0
    }}>
      <span style={{
        position: 'absolute', top: 3, left: on ? 23 : 3, width: 26, height: 26,
        borderRadius: 999, background: '#fff', transition: 'left .25s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.25)'
      }} />
    </button>);
}

function ProfileSheet({ open, onClose, state, dispatch, showToast }) {
  const [name, setName] = React.useState(state.userName);
  React.useEffect(() => { if (open) setName(state.userName); }, [open, state.userName]);
  const canSave = name.trim().length >= 2 && name.trim() !== state.userName;
  const save = () => {
    if (!canSave) return;
    dispatch({ type: 'setName', name });
    showToast('Nombre actualizado');
  };
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 999,
          background: `linear-gradient(135deg, ${COLORS.aqua}, ${COLORS.primary})`,
          color: '#fff', fontWeight: 700, fontSize: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>{initials(state.userName)}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.2 }}>{state.userName}</div>
          <div style={{ fontSize: 11.5, color: COLORS.inkMuted, marginTop: 1 }}>Tus datos viven solo en este teléfono</div>
        </div>
      </div>

      {/* Modo fácil (adultos mayores) */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0',
        borderTop: `1px solid ${COLORS.divider}`, borderBottom: `1px solid ${COLORS.divider}`
      }}>
        <span style={{ fontSize: 26 }}>🤍</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: COLORS.ink }}>Modo fácil</div>
          <div style={{ fontSize: 12, color: COLORS.inkSoft, lineHeight: 1.4, marginTop: 1 }}>
            Pantallas simples, letra grande y botones de ayuda. Pensado para adultos mayores.
          </div>
        </div>
        <Switch on={state.seniorMode} onChange={(on) => {
          haptic();
          dispatch({ type: 'setSenior', on });
          onClose();
        }} />
      </div>

      {/* Repetir tutoriales */}
      <button onClick={() => {
        dispatch({ type: 'resetTutorials' });
        showToast('Verás los tutoriales de nuevo');
        onClose();
      }} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 12,
        background: 'transparent', border: 'none', borderBottom: `1px solid ${COLORS.divider}`,
        padding: '14px 0', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left'
      }}>
        <span style={{ fontSize: 24 }}>🎓</span>
        <span style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: COLORS.ink }}>Ver los tutoriales otra vez</span>
        <span style={{ color: COLORS.inkMuted, fontSize: 18 }}>›</span>
      </button>

      {/* Cambiar nombre */}
      <div style={{ paddingTop: 14 }}>
        <div style={{ fontSize: 11, color: COLORS.inkMuted, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>Tu nombre</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') save(); }}
            maxLength={24}
            style={{
              flex: 1, minWidth: 0, padding: '12px 14px', borderRadius: 12,
              border: `1.5px solid ${COLORS.divider}`, background: COLORS.bg,
              color: COLORS.ink, fontSize: 16, fontWeight: 600, fontFamily: 'inherit', outline: 'none'
            }} />
          <button disabled={!canSave} onClick={save} style={{
            padding: '0 18px', borderRadius: 12, border: 'none',
            background: canSave ? COLORS.primary : COLORS.divider,
            color: canSave ? '#fff' : COLORS.inkMuted,
            fontSize: 13.5, fontWeight: 700, cursor: canSave ? 'pointer' : 'not-allowed', fontFamily: 'inherit'
          }}>Guardar</button>
        </div>
      </div>
      <SheetButton ghost onClick={onClose}>Cerrar</SheetButton>
    </BottomSheet>);
}

// ─────────────────────────────────────────────────────────
// MODO FÁCIL — interfaz simplificada para adultos mayores
// ─────────────────────────────────────────────────────────
const SENIOR_HELP = {
  home: { title: '¿Cómo funciona esta pantalla?', lines: [
    'Arriba están tus AquaCoins: puntos que ganas por ahorrar agua en tu casa.',
    'Más abajo ves cuánta agua has usado este mes.',
    'Los botones grandes te llevan a cada sección: premios, donaciones, reportes y consejos.',
    'Si te pierdes, toca el círculo con el signo "?" — siempre explica la pantalla donde estás.'] },
  premios: { title: '¿Cómo canjeo un premio?', lines: [
    'Cada tarjeta es un premio. El número junto a la moneda dice cuántos AquaCoins cuesta.',
    'Si el botón está azul, te alcanza. Tócalo y confirma: es un solo paso.',
    'Tus AquaCoins se descuentan al confirmar. Nunca se cobra dinero.'] },
  donar: { title: '¿Cómo dono?', lines: [
    'Primero elige a qué proyecto quieres ayudar tocando su tarjeta.',
    'Después elige cuántos AquaCoins quieres dar.',
    'Al final confirma. Tu aporte ayuda a llevar agua potable a familias del campo.'] },
  reportes: { title: '¿Cómo reporto una fuga?', lines: [
    'El mapa muestra fugas de agua reportadas por los vecinos.',
    'Toca el botón azul "Reportar", elige qué problema ves, y después toca el lugar del mapa donde está.',
    'Cuando 3 vecinos confirman una fuga, Essbio la repara.'] },
  consejos: { title: '¿Qué son los consejos?', lines: [
    'Son ideas simples para gastar menos agua en la casa.',
    'Cada consejo explica cuánta agua ahorra.',
    'Ahorrar agua te da AquaCoins todos los meses.'] }
};

function HelpSheet({ open, onClose, help }) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      {help &&
      <>
        <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.ink, marginBottom: 12, lineHeight: 1.25, letterSpacing: -0.3 }}>
          {help.title}
        </div>
        {help.lines.map((l, i) =>
        <div key={i} style={{
          display: 'flex', gap: 12, padding: '11px 0', alignItems: 'flex-start',
          borderBottom: i < help.lines.length - 1 ? `1px solid ${COLORS.divider}` : 'none'
        }}>
            <span style={{
            width: 28, height: 28, borderRadius: 999, background: COLORS.aquaSoft,
            color: COLORS.primary, fontSize: 15, fontWeight: 800, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>{i + 1}</span>
            <span style={{ fontSize: 17, lineHeight: 1.5, color: COLORS.ink }}>{l}</span>
          </div>
        )}
        <button onClick={onClose} style={{
          width: '100%', marginTop: 16, padding: 17, borderRadius: 15, border: 'none',
          background: COLORS.primary, color: '#fff', fontSize: 18, fontWeight: 800,
          cursor: 'pointer', fontFamily: 'inherit'
        }}>Entendido</button>
      </>
      }
    </BottomSheet>);
}

function SeniorHeader({ title, onBack, onHelp }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: 'calc(env(safe-area-inset-top, 0px) + 14px) 16px 12px'
    }}>
      {onBack &&
      <button onClick={onBack} style={{
        display: 'flex', alignItems: 'center', gap: 6, background: COLORS.card,
        border: `2px solid ${COLORS.divider}`, borderRadius: 14, padding: '12px 16px',
        fontSize: 17, fontWeight: 800, color: COLORS.ink, cursor: 'pointer',
        fontFamily: 'inherit', flexShrink: 0
      }}>← Volver</button>
      }
      <div style={{ flex: 1, fontSize: 22, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.3, minWidth: 0 }}>{title}</div>
      <button onClick={onHelp} aria-label="Ayuda" style={{
        width: 50, height: 50, borderRadius: 999, background: COLORS.primary,
        color: '#fff', fontSize: 24, fontWeight: 800, border: 'none',
        cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit'
      }}>?</button>
    </div>);
}

function SeniorBigButton({ emoji, label, sub, onClick }) {
  return (
    <button onClick={() => { haptic(); onClick(); }} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 15,
      background: COLORS.card, border: `2px solid ${COLORS.divider}`, borderRadius: 20,
      padding: '17px 16px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
      boxShadow: COLORS.shadow
    }}>
      <span style={{ fontSize: 31, width: 44, textAlign: 'center', flexShrink: 0 }}>{emoji}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 19, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.2 }}>{label}</span>
        {sub && <span style={{ display: 'block', fontSize: 14.5, color: COLORS.inkSoft, marginTop: 2, lineHeight: 1.35 }}>{sub}</span>}
      </span>
      <span style={{ fontSize: 26, color: COLORS.inkMuted, flexShrink: 0 }}>›</span>
    </button>);
}

function SeniorApp({ state, dispatch, dark, showToast }) {
  const [page, setPage] = React.useState('home');
  const [help, setHelp] = React.useState(false);
  const [pendingReward, setPendingReward] = React.useState(null);
  const [donProj, setDonProj] = React.useState(null);
  const [donAmount, setDonAmount] = React.useState(null);
  const first = firstName(state.userName);
  const multiActive = state.multiplierUntil > Date.now();
  const now = new Date();
  const month = now.toLocaleDateString('es-CL', { month: 'long' });

  const goHome = () => { haptic(); setPage('home'); setHelp(false); setDonProj(null); setDonAmount(null); };

  const confirmReward = () => {
    if (!pendingReward || state.balance < pendingReward.cost) return;
    haptic();
    dispatch({ type: 'redeem', reward: pendingReward });
    showToast(`Listo: canjeaste ${pendingReward.title}`);
    setPendingReward(null);
  };

  const confirmDon = () => {
    if (!donProj || !donAmount || state.balance < donAmount) return;
    haptic();
    dispatch({ type: 'donateAC', pid: donProj.id, amount: donAmount });
    showToast('¡Muchas gracias por tu aporte!');
    setDonProj(null);
    setDonAmount(null);
  };

  const scroller = (children) =>
  <div className="ar-screen" style={{
    flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch',
    padding: '2px 16px calc(env(safe-area-inset-bottom, 0px) + 28px)'
  }}>{children}</div>;

  const bigBtn = (label, opts = {}) => ({
    width: '100%', padding: 17, borderRadius: 15, border: 'none',
    background: opts.disabled ? COLORS.divider : opts.ghost ? 'transparent' : opts.color || COLORS.primary,
    color: opts.disabled ? COLORS.inkMuted : opts.ghost ? COLORS.inkSoft : '#fff',
    ...(opts.ghost ? { border: `2px solid ${COLORS.divider}` } : {}),
    fontSize: 18, fontWeight: 800, cursor: opts.disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit', marginTop: opts.mt ?? 0
  });

  // ── PANTALLA PRINCIPAL ──
  if (page === 'home') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'calc(env(safe-area-inset-top, 0px) + 16px) 18px 8px'
        }}>
          <img src={logoSrc(dark)} alt="AquaReward" style={{ height: 30 }} />
          <button onClick={() => setHelp(true)} aria-label="Ayuda" style={{
            width: 50, height: 50, borderRadius: 999, background: COLORS.primary,
            color: '#fff', fontSize: 24, fontWeight: 800, border: 'none',
            cursor: 'pointer', fontFamily: 'inherit'
          }}>?</button>
        </div>
        {scroller(
          <>
            <div style={{ fontSize: 27, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.4, padding: '8px 2px 14px' }}>
              Hola, {first} 👋
            </div>

            {/* saldo grande */}
            <div style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDk})`,
              borderRadius: 22, padding: '20px 22px', color: '#fff',
              boxShadow: '0 8px 24px rgba(14,110,126,0.28)'
            }}>
              <div style={{ fontSize: 14, opacity: 0.85, fontWeight: 700, letterSpacing: 0.3 }}>TUS AQUACOINS</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                {Icon.coin(34)}
                <span style={{ fontFamily: NUMFONT, fontSize: 52, fontWeight: 600, letterSpacing: -1, lineHeight: 1 }}>{fmtCL(state.balance)}</span>
              </div>
              <div style={{ fontSize: 15, opacity: 0.9, marginTop: 10, lineHeight: 1.4 }}>
                Los ganas ahorrando agua en tu casa.{multiActive ? ' Tienes el bonus ×2 activo.' : ''}
              </div>
            </div>

            {/* consumo simple */}
            <Card style={{ marginTop: 14, padding: '18px 20px' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.inkSoft }}>Tu consumo de {month}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
                <span style={{ fontFamily: NUMFONT, fontSize: 44, fontWeight: 600, color: COLORS.ink, letterSpacing: -1, lineHeight: 1 }}>8,7</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.inkSoft }}>m³</span>
              </div>
              <div style={{
                marginTop: 10, fontSize: 16.5, fontWeight: 700, color: COLORS.good,
                background: COLORS.goodSoft, borderRadius: 12, padding: '10px 14px', lineHeight: 1.4
              }}>
                👍 Vas muy bien: 12% menos que el mes pasado.
              </div>
            </Card>

            {/* accesos grandes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
              <SeniorBigButton emoji="🎁" label="Mis premios" sub="Canjea tus AquaCoins" onClick={() => setPage('premios')} />
              <SeniorBigButton emoji="💧" label="Donar agua" sub="Ayuda a familias del campo" onClick={() => setPage('donar')} />
              <SeniorBigButton emoji="📍" label="Reportar una fuga" sub="Avisa si ves agua perdiéndose en la calle" onClick={() => setPage('reportes')} />
              <SeniorBigButton emoji="💡" label="Consejos de ahorro" sub="Ideas para gastar menos agua" onClick={() => setPage('consejos')} />
            </div>

            <button onClick={() => setHelp(true)} style={{
              ...bigBtn('', { ghost: true, mt: 18 }), color: COLORS.primary, borderColor: COLORS.primary
            }}>❓ ¿Necesitas ayuda?</button>
            <button onClick={() => { haptic(); dispatch({ type: 'setSenior', on: false }); }} style={bigBtn('', { ghost: true, mt: 10 })}>
              Usar modo normal
            </button>
          </>
        )}
        <HelpSheet open={help} onClose={() => setHelp(false)} help={SENIOR_HELP.home} />
      </div>);
  }

  // ── MIS PREMIOS ──
  if (page === 'premios') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <SeniorHeader title="Mis premios" onBack={goHome} onHelp={() => setHelp(true)} />
        {scroller(
          <>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, background: COLORS.coinSoft,
              borderRadius: 14, padding: '13px 16px', marginBottom: 14
            }}>
              {Icon.coin(22)}
              <span style={{ fontSize: 17, fontWeight: 800, color: COLORS.ink }}>Tienes {fmtCL(state.balance)} AquaCoins</span>
            </div>
            {REWARDS.map((r) => {
              const isActiveMulti = r.id === 'badge' && multiActive;
              const can = state.balance >= r.cost && !isActiveMulti;
              return (
                <Card key={r.id} style={{ padding: 18, marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 15, background: r.tint(), flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>{r.icon(30)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.2, lineHeight: 1.25 }}>{r.title}</div>
                      <div style={{ fontSize: 14.5, color: COLORS.inkSoft, marginTop: 3, lineHeight: 1.35 }}>{r.sub}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 13 }}>
                    {Icon.coin(19)}
                    <span style={{ fontSize: 16.5, fontWeight: 800, color: COLORS.ink }}>Cuesta {fmtCL(r.cost)} AquaCoins</span>
                  </div>
                  <button
                  disabled={!can}
                  onClick={() => can && setPendingReward(r)}
                  style={bigBtn('', { disabled: !can, mt: 12 })}>
                    {isActiveMulti ? 'Ya está activo ✓' : can ? 'Canjear este premio' : `Te faltan ${fmtCL(r.cost - state.balance)} AquaCoins`}
                  </button>
                </Card>);
            })}
          </>
        )}
        <BottomSheet open={!!pendingReward} onClose={() => setPendingReward(null)}>
          {pendingReward &&
          <>
            <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.3 }}>¿Canjear este premio?</div>
            <div style={{ fontSize: 17, color: COLORS.inkSoft, margin: '8px 0 6px', lineHeight: 1.4 }}>{pendingReward.title}</div>
            <div style={{ fontSize: 17, color: COLORS.ink, padding: '10px 0', borderTop: `1px solid ${COLORS.divider}`, lineHeight: 1.6 }}>
              Te costará <b>{fmtCL(pendingReward.cost)} AquaCoins</b>.<br />
              Te quedarán <b>{fmtCL(state.balance - pendingReward.cost)} AquaCoins</b>.
            </div>
            <button onClick={confirmReward} style={bigBtn('', { color: COLORS.good, mt: 8 })}>Sí, canjear</button>
            <button onClick={() => setPendingReward(null)} style={bigBtn('', { ghost: true, mt: 10 })}>No, volver atrás</button>
          </>
          }
        </BottomSheet>
        <HelpSheet open={help} onClose={() => setHelp(false)} help={SENIOR_HELP.premios} />
      </div>);
  }

  // ── DONAR ──
  if (page === 'donar') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <SeniorHeader title="Donar agua" onBack={donProj ? () => { setDonProj(null); setDonAmount(null); } : goHome} onHelp={() => setHelp(true)} />
        {scroller(
          !donProj ?
          <>
            <div style={{ fontSize: 17.5, fontWeight: 700, color: COLORS.ink, lineHeight: 1.45, padding: '4px 2px 14px' }}>
              Elige el proyecto que quieres apoyar:
            </div>
            {PROJECTS.map((p) => {
              const ps = state.projects[p.id];
              const pct = Math.round(Math.min(ps.funded / p.goal, 1) * 100);
              return (
                <Card key={p.id} onClick={() => { haptic(); setDonProj(p); }} style={{ padding: 0, overflow: 'hidden', marginBottom: 14, cursor: 'pointer' }}>
                  <div style={{ height: 120, backgroundImage: `url("${p.img}")`, backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
                  <div style={{ padding: 18 }}>
                    <div style={{ fontSize: 19, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.2 }}>{p.title}</div>
                    <div style={{ fontSize: 15, color: COLORS.inkSoft, marginTop: 3 }}>{p.loc} · {p.fam}</div>
                    <div style={{ height: 12, borderRadius: 999, background: COLORS.divider, overflow: 'hidden', marginTop: 12 }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${COLORS.aqua}, ${COLORS.primary})`, borderRadius: 999 }} />
                    </div>
                    <div style={{ fontSize: 15.5, fontWeight: 700, color: COLORS.ink, marginTop: 8 }}>{pct}% completado</div>
                    <button style={bigBtn('', { mt: 12 })}>Elegir este proyecto</button>
                  </div>
                </Card>);
            })}
          </> :

          <>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, background: COLORS.aquaSoft,
              borderRadius: 14, padding: '13px 16px', marginBottom: 16
            }}>
              <span style={{ fontSize: 22 }}>💧</span>
              <span style={{ fontSize: 15.5, fontWeight: 700, color: COLORS.ink, lineHeight: 1.35 }}>
                Proyecto: {donProj.title} ({donProj.loc})
              </span>
            </div>
            <div style={{ fontSize: 17.5, fontWeight: 700, color: COLORS.ink, lineHeight: 1.45, paddingBottom: 14 }}>
              ¿Cuántos AquaCoins quieres donar?
            </div>
            {[25, 50, 100, 200].map((v) => {
              const can = state.balance >= v;
              return (
                <button key={v} disabled={!can} onClick={() => { haptic(); setDonAmount(v); }} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  background: COLORS.card, border: `2px solid ${COLORS.divider}`, borderRadius: 16,
                  padding: '17px 18px', cursor: can ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
                  marginBottom: 11, opacity: can ? 1 : 0.5, boxShadow: COLORS.shadow
                }}>
                  {Icon.coin(24)}
                  <span style={{ flex: 1, textAlign: 'left', fontSize: 19, fontWeight: 800, color: COLORS.ink }}>{v} AquaCoins</span>
                  <span style={{ fontSize: 24, color: COLORS.inkMuted }}>›</span>
                </button>);
            })}
            <div style={{ fontSize: 14.5, color: COLORS.inkMuted, textAlign: 'center', marginTop: 6 }}>
              Tienes {fmtCL(state.balance)} AquaCoins
            </div>
          </>
        )}
        <BottomSheet open={!!(donProj && donAmount)} onClose={() => setDonAmount(null)}>
          {donProj && donAmount &&
          <>
            <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.3 }}>¿Confirmas tu donación?</div>
            <div style={{ fontSize: 17, color: COLORS.ink, padding: '12px 0', lineHeight: 1.6 }}>
              Vas a donar <b>{donAmount} AquaCoins</b> al proyecto de <b>{donProj.loc}</b>.<br />
              Te quedarán <b>{fmtCL(state.balance - donAmount)} AquaCoins</b>.
            </div>
            <button onClick={confirmDon} style={bigBtn('', { color: COLORS.good })}>Sí, donar</button>
            <button onClick={() => setDonAmount(null)} style={bigBtn('', { ghost: true, mt: 10 })}>No, volver atrás</button>
          </>
          }
        </BottomSheet>
        <HelpSheet open={help} onClose={() => setHelp(false)} help={SENIOR_HELP.donar} />
      </div>);
  }

  // ── REPORTES (mapa) ──
  if (page === 'reportes') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <SeniorHeader title="Reportar fuga" onBack={goHome} onHelp={() => setHelp(true)} />
        <div style={{ flex: 1, minHeight: 0 }}>
          <ScreenReportes dark={dark} />
        </div>
        <HelpSheet open={help} onClose={() => setHelp(false)} help={SENIOR_HELP.reportes} />
      </div>);
  }

  // ── CONSEJOS ──
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SeniorHeader title="Consejos" onBack={goHome} onHelp={() => setHelp(true)} />
      {scroller(
        TIPS.map((tip, i) =>
        <Card key={i} style={{ padding: 18, marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{
              width: 34, height: 34, borderRadius: 999, background: COLORS.aquaSoft,
              color: COLORS.primary, fontSize: 16, fontWeight: 800, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{i + 1}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.2, lineHeight: 1.3 }}>{tip.t}</div>
                <div style={{ fontSize: 15.5, color: COLORS.inkSoft, marginTop: 5, lineHeight: 1.5 }}>{tip.d}</div>
              </div>
            </div>
          </Card>
        )
      )}
      <HelpSheet open={help} onClose={() => setHelp(false)} help={SENIOR_HELP.consejos} />
    </div>);
}

// ─────────────────────────────────────────────────────────
// TAB BAR + APP
// ─────────────────────────────────────────────────────────
const TABS = [
{ id: 'inicio', label: 'Inicio', icon: Icon.home },
{ id: 'premios', label: 'Premios', icon: Icon.gift },
{ id: 'comunidad', label: 'Comunidad', icon: Icon.users },
{ id: 'reportes', label: 'Reportes', icon: Icon.mapPin }];


function TabBar({ active, onChange, dark }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
      paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)', paddingTop: 8,
      background: dark ? 'rgba(16,26,46,0.88)' : 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      borderTop: `0.5px solid ${COLORS.divider}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 8px' }}>
        {TABS.map((t) => {
          const isActive = t.id === active;
          const c = isActive ? COLORS.primary : COLORS.inkMuted;
          return (
            <button key={t.id} onClick={() => onChange(t.id)} aria-label={t.label} style={{
              flex: 1, padding: '6px 0', cursor: 'pointer', position: 'relative',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'transparent', border: 'none', fontFamily: 'inherit',
              WebkitTapHighlightColor: 'transparent'
            }}>
              {t.icon(c)}
              <div style={{ fontSize: 10.5, fontWeight: 600, color: c, letterSpacing: 0.1 }}>{t.label}</div>
              {isActive &&
              <div style={{
                position: 'absolute', top: -8, width: 28, height: 3,
                borderRadius: '0 0 3px 3px', background: COLORS.primary
              }} />
              }
            </button>);
        })}
      </div>
    </div>);
}

const PAPER_TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

function App() {
  const dark = useSystemDark();
  const base = dark ? BASE.oscuro : BASE.claro;
  // Tema aplicado sincrónicamente para que todos los hijos lean los colores
  // actualizados en este mismo render.
  Object.assign(COLORS, base);

  const [tab, setTab] = React.useState('inicio');
  // Montaje perezoso + pantallas persistentes: cada tab se monta la primera
  // vez que se visita y queda montado (conserva scroll, estado y el iframe
  // del mapa sin recargar).
  const [visited, setVisited] = React.useState({ inicio: true });
  const [state, dispatch] = React.useReducer(reducer, undefined, loadState);
  const [toast, setToast] = React.useState(null);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const toastTimer = React.useRef(null);

  const showToast = React.useCallback((text) => {
    clearTimeout(toastTimer.current);
    setToast({ text, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  React.useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }, [state]);

  React.useEffect(() => {
    const m = document.querySelector('meta[name="theme-color"]:not([media])');
    if (m) m.setAttribute('content', dark ? '#0C1426' : '#FBFDFE');
    document.body.style.background = base.bg;
  }, [dark]);

  const switchTab = (id) => {
    haptic();
    setTab(id);
    setVisited((v) => v[id] ? v : { ...v, [id]: true });
  };

  const bg = `linear-gradient(180deg, ${base.bgTop} 0%, ${base.bgTop} 30%, ${base.bgBot} 100%)`;
  const shellStyle = {
    position: 'relative', height: '100%', overflow: 'hidden',
    background: bg, color: COLORS.ink,
    fontFamily: '"Geist", ui-sans-serif, -apple-system, system-ui, sans-serif'
  };
  const texture =
  <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
    backgroundImage: PAPER_TEXTURE, backgroundRepeat: 'repeat',
    mixBlendMode: dark ? 'screen' : 'multiply', opacity: dark ? 0.5 : 1
  }} />;

  // 1) Primer uso: registro de nombre
  if (!state.userName) {
    return (
      <div id="app" style={shellStyle}>
        {texture}
        <Welcome dark={dark} onDone={(name) => dispatch({ type: 'setName', name })} />
      </div>);
  }

  // 2) Modo fácil (adultos mayores)
  if (state.seniorMode) {
    return (
      <div id="app" style={shellStyle}>
        {texture}
        <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
          <SeniorApp state={state} dispatch={dispatch} dark={dark} showToast={showToast} />
        </div>
        <Toast msg={toast} />
      </div>);
  }

  // 3) Modo normal
  const screens = {
    inicio: <ScreenInicio state={state} dispatch={dispatch} goPremios={() => switchTab('premios')} openProfile={() => setProfileOpen(true)} />,
    premios: <ScreenPremios state={state} dispatch={dispatch} showToast={showToast} />,
    comunidad: <ScreenComunidad state={state} dispatch={dispatch} showToast={showToast} active={tab === 'comunidad' || !!visited.comunidad} />,
    reportes: <ScreenReportes dark={dark} />
  };
  const showTut = !state.tutorialsSeen[tab] && !profileOpen;

  return (
    <div id="app" style={shellStyle}>
      {texture}

      {TABS.map((t) => {
        if (!visited[t.id]) return null;
        const isActive = tab === t.id;
        const isMap = t.id === 'reportes';
        return (
          <div key={t.id} className="ar-screen" style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            bottom: isMap ? 'calc(64px + env(safe-area-inset-bottom, 0px))' : 0,
            overflow: isMap ? 'hidden' : 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: isMap ? 0 : 'calc(80px + env(safe-area-inset-bottom, 0px))',
            zIndex: 1,
            visibility: isActive ? 'visible' : 'hidden',
            pointerEvents: isActive ? 'auto' : 'none'
          }}>
            {screens[t.id]}
          </div>);
      })}

      <TabBar active={tab} onChange={switchTab} dark={dark} />
      <ProfileSheet open={profileOpen} onClose={() => setProfileOpen(false)}
      state={state} dispatch={dispatch} showToast={showToast} />
      {showTut &&
      <Tutorial screen={tab} dark={dark}
      onDone={() => dispatch({ type: 'tutorialSeen', screen: tab })} />
      }
      <Toast msg={toast} />
    </div>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
