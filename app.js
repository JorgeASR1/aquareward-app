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
  bg: '#F4F8FB',
  ink: '#233249',
  inkSoft: '#51627A',
  inkMuted: '#8695A6',
  card: '#FFFFFF',
  divider: '#D9E2EC',
  primary: '#0E9FBE',
  primaryDk: '#0A6E85',
  aqua: '#0E9FBE',
  aquaSoft: '#E1F2F7',
  coin: '#E8A317',
  coinSoft: '#FBEDC9',
  good: '#1E9B6B',
  goodSoft: '#D8F0E5',
  danger: '#D85A4A',
  forest: '#1E9B6B',
  essbio: '#021C8A',
  bgTop: '#FBFDFE',
  bgBot: '#E6F0F6',
  shadow: '0 1px 2px rgba(35,50,73,0.05), 0 10px 30px rgba(35,50,73,0.12)'
};
const BASE = {
  claro: {
    bg: '#F4F8FB',
    ink: '#233249',
    inkSoft: '#51627A',
    inkMuted: '#8695A6',
    card: '#FFFFFF',
    divider: '#D9E2EC',
    primary: '#0E9FBE',
    primaryDk: '#0A6E85',
    aqua: '#0E9FBE',
    aquaSoft: '#E1F2F7',
    coin: '#E8A317',
    coinSoft: '#FBEDC9',
    good: '#1E9B6B',
    goodSoft: '#D8F0E5',
    danger: '#D85A4A',
    forest: '#1E9B6B',
    essbio: '#021C8A',
    bgTop: '#FBFDFE',
    bgBot: '#E6F0F6',
    shadow: '0 1px 2px rgba(35,50,73,0.05), 0 10px 30px rgba(35,50,73,0.12)'
  },
  oscuro: {
    bg: '#0C1426',
    ink: '#E8EEF7',
    inkSoft: '#AEBBCF',
    inkMuted: '#7C8BA3',
    card: '#16213A',
    divider: '#2A3852',
    primary: '#2BC4DE',
    primaryDk: '#1C8AA0',
    aqua: '#2BC4DE',
    aquaSoft: '#123442',
    coin: '#F2B53D',
    coinSoft: '#3A2E12',
    good: '#34C188',
    goodSoft: '#123026',
    danger: '#E0705F',
    forest: '#34C188',
    essbio: '#4B79F0',
    bgTop: '#0C1426',
    bgBot: '#0E1B33',
    shadow: '0 2px 6px rgba(0,0,0,0.35), 0 12px 32px rgba(0,0,0,0.5)'
  }
};

// ───────── Iconos SVG ─────────
const Icon = {
  coin: (s = 18) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    fill: COLORS.coin
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "7.5",
    fill: "none",
    stroke: "#fff",
    strokeOpacity: "0.55",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7.5c-1.6 0-2.7 1-2.7 2.3 0 2.6 4.7 1.8 4.7 3.8 0 1.1-.9 1.7-2 1.7-1.4 0-2.2-.7-2.4-1.7M12 6.5v1.2M12 16v1.2",
    stroke: "#fff",
    strokeWidth: "1.3",
    strokeLinecap: "round"
  })),
  home: (c, s = 22) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 11l8-7 8 7v8a2 2 0 0 1-2 2h-3v-6h-6v6H6a2 2 0 0 1-2-2v-8z",
    stroke: c,
    strokeWidth: "1.7",
    strokeLinejoin: "round"
  })),
  gift: (c, s = 22) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "9",
    width: "18",
    height: "11",
    rx: "1.5",
    stroke: c,
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 13h18M12 9v11",
    stroke: c,
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 9c-2-3-6-3-6-1s2 1.5 6 1zM12 9c2-3 6-3 6-1s-2 1.5-6 1z",
    stroke: c,
    strokeWidth: "1.7",
    strokeLinejoin: "round"
  })),
  users: (c, s = 22) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "9",
    r: "3.2",
    stroke: c,
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "10",
    r: "2.5",
    stroke: c,
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 19c0-3 2.5-5 6-5s6 2 6 5M15 19c0-2.2 1.5-4 4-4",
    stroke: c,
    strokeWidth: "1.7",
    strokeLinecap: "round"
  })),
  mapPin: (c, s = 22) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 21s7-6.4 7-12a7 7 0 0 0-14 0c0 5.6 7 12 7 12z",
    stroke: c,
    strokeWidth: "1.7",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "9",
    r: "2.6",
    stroke: c,
    strokeWidth: "1.7"
  })),
  arrowDown: (c = COLORS.danger, s = 12) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 2v8M2 6l4 4 4-4",
    stroke: c,
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  shield: (s = 26) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z",
    fill: COLORS.aqua
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 12l2.5 2.5L16 9.5",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  receipt: (s = 26) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3z",
    fill: COLORS.aquaSoft,
    stroke: COLORS.primary,
    strokeWidth: "1.4",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 8h8M8 12h8M8 16h5",
    stroke: COLORS.primary,
    strokeWidth: "1.4",
    strokeLinecap: "round"
  })),
  shower: (s = 26) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3v4M5 11h14a0 0 0 0 1 0 0c0 1-1 2-2.5 2h-9C6 13 5 12 5 11z",
    fill: COLORS.aqua,
    stroke: COLORS.primary,
    strokeWidth: "1.3",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "17",
    r: "1",
    fill: COLORS.aqua
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "13",
    cy: "19",
    r: "1",
    fill: COLORS.aqua
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "1",
    fill: COLORS.aqua
  })),
  tree: (s = 26) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3c-3 3-5 5-5 8a5 5 0 0 0 10 0c0-3-2-5-5-8z",
    fill: COLORS.forest
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 13v8M9 19h6",
    stroke: "#6B4423",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  })),
  badge: (s = 26) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l2.5 2.5L18 4l.5 3.5L21 10l-1.5 3 1 3.5-3.5.5L15 20l-3-1.5L9 20l-1.5-3-3.5-.5 1-3.5L3.5 10 6 7.5 6.5 4 10 4.5 12 2z",
    fill: COLORS.coin
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 12l2 2 4-4",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  tank: (s = 26) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 8h12v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8z",
    fill: COLORS.aquaSoft,
    stroke: COLORS.primary,
    strokeWidth: "1.4",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 8h14M9 8V5h6v3",
    stroke: COLORS.primary,
    strokeWidth: "1.4",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 15c1.2.8 2.8.8 4 0s2.8-.8 4 0",
    stroke: COLORS.aqua,
    strokeWidth: "1.4",
    strokeLinecap: "round"
  })),
  pipe: (s = 28) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 28 28",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "11",
    width: "24",
    height: "6",
    rx: "1",
    fill: COLORS.aqua
  }), /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "9",
    width: "3",
    height: "10",
    fill: COLORS.primaryDk
  }), /*#__PURE__*/React.createElement("rect", {
    x: "19",
    y: "9",
    width: "3",
    height: "10",
    fill: COLORS.primaryDk
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "14",
    cy: "14",
    r: "1.5",
    fill: "#fff",
    opacity: "0.6"
  })),
  spark: (s = 14) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1v3M7 10v3M1 7h3M10 7h3M3 3l2 2M9 9l2 2M11 3l-2 2M5 9l-2 2",
    stroke: COLORS.coin,
    strokeWidth: "1.4",
    strokeLinecap: "round"
  })),
  history: (c, s = 16) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    stroke: c,
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5l3.5 2",
    stroke: c,
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))
};

// ───────── Estado persistente ─────────
const STORE_KEY = 'aquareward.v1';
const PROJECT_GOAL = 200000; // AC
const CLP_PER_M3 = 1180; // tarifa referencial Essbio
const M3_TO_AC = 100; // equivalencia para la barra del proyecto
const DAY = 86400000;
function freshState() {
  return {
    v: 1,
    balance: 1240,
    redemptions: [],
    // { id, title, cost, ts }
    projectFunded: 134000,
    donors: 312,
    myAC: 0,
    // total AC donados por el usuario
    myCLP: 0,
    // total $ donados por el usuario
    multiplierUntil: 0,
    tipIndex: 0
  };
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (s && s.v === 1) return {
        ...freshState(),
        ...s
      };
    }
  } catch (e) {/* almacenamiento no disponible: la app funciona en memoria */}
  return freshState();
}
function reducer(s, a) {
  switch (a.type) {
    case 'redeem':
      {
        const r = a.reward;
        if (s.balance < r.cost) return s;
        const next = {
          ...s,
          balance: s.balance - r.cost,
          redemptions: [{
            id: r.id,
            title: r.title,
            cost: r.cost,
            ts: Date.now()
          }, ...s.redemptions].slice(0, 30)
        };
        if (r.id === 'badge') next.multiplierUntil = Date.now() + 7 * DAY;
        return next;
      }
    case 'donateAC':
      {
        if (s.balance < a.amount) return s;
        return {
          ...s,
          balance: s.balance - a.amount,
          projectFunded: Math.min(PROJECT_GOAL, s.projectFunded + a.amount),
          donors: s.donors + (s.myAC || s.myCLP ? 0 : 1),
          myAC: s.myAC + a.amount
        };
      }
    case 'donateM3':
      {
        return {
          ...s,
          projectFunded: Math.min(PROJECT_GOAL, s.projectFunded + a.m3 * M3_TO_AC),
          donors: s.donors + (s.myAC || s.myCLP ? 0 : 1),
          myCLP: s.myCLP + a.m3 * CLP_PER_M3
        };
      }
    case 'nextTip':
      return {
        ...s,
        tipIndex: (s.tipIndex + 1) % TIPS.length
      };
    default:
      return s;
  }
}

// ───────── Utilidades ─────────
const fmtCL = n => Math.round(n).toLocaleString('es-CL');
const NUMFONT = '"Oswald", "Geist", ui-sans-serif, sans-serif';
function useSystemDark() {
  const mq = React.useMemo(() => window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null, []);
  const [dark, setDark] = React.useState(mq ? mq.matches : false);
  React.useEffect(() => {
    if (!mq) return;
    const fn = e => setDark(e.matches);
    mq.addEventListener ? mq.addEventListener('change', fn) : mq.addListener(fn);
    return () => mq.removeEventListener ? mq.removeEventListener('change', fn) : mq.removeListener(fn);
  }, [mq]);
  return dark;
}

// Cuenta animada que parte desde el valor anterior (no desde 0) cuando el
// target cambia — así el saldo "baja" suavemente al canjear o donar.
function useAnimatedNumber(target, duration = 900, decimals = 0, go = true) {
  const reduced = React.useMemo(() => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const [v, setV] = React.useState(go ? 0 : target);
  const vRef = React.useRef(go ? 0 : target);
  React.useEffect(() => {
    if (!go) return;
    if (reduced) {
      vRef.current = target;
      setV(target);
      return;
    }
    const from = vRef.current;
    const t0 = performance.now();
    let raf;
    const tick = t => {
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
  try {
    if (navigator.vibrate) navigator.vibrate(8);
  } catch (e) {}
}

// ───────── Piezas compartidas ─────────
function Card({
  children,
  style,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      background: COLORS.card,
      borderRadius: 26,
      padding: 18,
      boxShadow: COLORS.shadow,
      ...style
    }
  }, children);
}
function Pill({
  children,
  bg = COLORS.aquaSoft,
  color = COLORS.primary,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: bg,
      color,
      padding: '3px 9px',
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 0.1,
      ...style
    }
  }, children);
}
function AppHeader({
  title,
  subtitle,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: 'calc(env(safe-area-inset-top, 0px) + 22px) 22px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", null, subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.inkMuted,
      fontWeight: 500,
      marginBottom: 2,
      whiteSpace: 'nowrap'
    }
  }, subtitle), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 700,
      color: COLORS.ink,
      letterSpacing: -0.4
    }
  }, title)), right);
}

// Hoja inferior con confirmación (canjes y donaciones)
function BottomSheet({
  open,
  onClose,
  children
}) {
  const [render, setRender] = React.useState(open);
  React.useEffect(() => {
    if (open) {
      setRender(true);
      return;
    }
    const t = setTimeout(() => setRender(false), 340);
    return () => clearTimeout(t);
  }, [open]);
  if (!render) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 80,
      background: open ? 'rgba(8,16,28,0.45)' : 'rgba(8,16,28,0)',
      transition: 'background .3s',
      display: 'flex',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      background: COLORS.card,
      borderRadius: '24px 24px 0 0',
      padding: '10px 20px',
      paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)',
      transform: open ? 'translateY(0)' : 'translateY(105%)',
      transition: 'transform .34s cubic-bezier(.2,.8,.2,1)',
      boxShadow: '0 -12px 40px rgba(2,28,138,0.25)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 5,
      borderRadius: 3,
      background: COLORS.divider,
      margin: '6px auto 16px'
    }
  }), children));
}
function SheetRow({
  label,
  value,
  strong
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: `1px solid ${COLORS.divider}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: COLORS.inkSoft,
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: strong ? COLORS.primary : COLORS.ink,
      fontWeight: 700
    }
  }, value));
}
function SheetButton({
  children,
  onClick,
  ghost,
  disabled
}) {
  return /*#__PURE__*/React.createElement("button", {
    disabled: disabled,
    onClick: onClick,
    style: {
      width: '100%',
      marginTop: ghost ? 8 : 16,
      background: disabled ? COLORS.divider : ghost ? 'transparent' : COLORS.primary,
      color: disabled ? COLORS.inkMuted : ghost ? COLORS.inkSoft : '#fff',
      border: ghost ? `1px solid ${COLORS.divider}` : 'none',
      padding: 14,
      borderRadius: 14,
      fontSize: 14,
      fontWeight: 700,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'inherit'
    }
  }, children);
}
function Toast({
  msg
}) {
  if (!msg) return null;
  return /*#__PURE__*/React.createElement("div", {
    key: msg.key,
    className: "ar-toast",
    style: {
      position: 'absolute',
      top: 'calc(env(safe-area-inset-top, 0px) + 14px)',
      left: '50%',
      zIndex: 90,
      background: COLORS.ink,
      color: COLORS.bg,
      padding: '11px 18px',
      borderRadius: 14,
      fontSize: 12.5,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
      whiteSpace: 'nowrap',
      maxWidth: '88%',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: COLORS.good,
      flexShrink: 0
    }
  }), msg.text);
}

// Cinta de confianza — Essbio "Medición verificada" (footer, no header)
function TrustRibbon({
  note = 'Essbio Mide'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '2px 16px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '10px 12px',
      borderRadius: 14,
      background: COLORS.card,
      border: `1px solid ${COLORS.divider}`,
      boxShadow: COLORS.shadow
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 999,
      background: COLORS.goodSoft,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    stroke: COLORS.good,
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 12l2.3 2.3L15.5 9.5",
    stroke: COLORS.good,
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: COLORS.ink,
      letterSpacing: -0.1
    }
  }, "Medici\xF3n verificada"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.inkMuted,
      marginTop: 1
    }
  }, note)), /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#FFFFFF',
      borderRadius: 8,
      padding: '5px 9px',
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: 0,
      border: `1px solid ${COLORS.divider}`
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/essbio-logo.png",
    alt: "Essbio",
    style: {
      height: 15,
      display: 'block'
    }
  }))));
}

// ─────────────────────────────────────────────────────────
// PANTALLA 1 — INICIO
// ─────────────────────────────────────────────────────────
const TIPS = [{
  t: 'Cierra la llave al enjabonarte',
  d: 'Una ducha de 8 minutos con la llave abierta usa hasta 80 L. Ciérrala al enjabonarte y ahorra ~50 L.'
}, {
  t: 'Repara las llaves que gotean',
  d: 'Una llave goteando pierde hasta 46 L al día — más de 1.300 L al mes sin que lo notes.'
}, {
  t: 'Lava el auto con balde',
  d: 'Frente a la manguera, un balde ahorra cerca de 300 L por lavado. Tu auto queda igual de limpio.'
}, {
  t: 'Riega temprano o de noche',
  d: 'Evitas la evaporación del mediodía: la planta aprovecha más agua y tú usas menos.'
}, {
  t: 'Usa cargas completas',
  d: 'Lavadora y lavavajillas con carga completa ahorran hasta 60 L por ciclo frente a cargas parciales.'
}];
function GaugeRing({
  value = 8.7,
  max = 15,
  delta = -12,
  go = true
}) {
  const pct = Math.min(value / max, 1);
  const R = 78,
    C = 2 * Math.PI * R;
  const animPct = useAnimatedNumber(pct, 1100, 4, go);
  const animVal = useAnimatedNumber(value, 1100, 2, go);
  const dash = C * animPct;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 200,
      height: 200
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "200",
    height: "200",
    viewBox: "0 0 200 200"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "gaugeG",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: COLORS.aqua
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: COLORS.primary
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "100",
    r: R,
    stroke: COLORS.aquaSoft,
    strokeWidth: "14",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "100",
    r: R,
    stroke: "url(#gaugeG)",
    strokeWidth: "14",
    fill: "none",
    strokeDasharray: `${dash} ${C}`,
    strokeLinecap: "round",
    transform: "rotate(-90 100 100)"
  }), Array.from({
    length: 12
  }).map((_, i) => {
    const a = i / 12 * Math.PI * 2 - Math.PI / 2;
    const x1 = 100 + Math.cos(a) * 92,
      y1 = 100 + Math.sin(a) * 92;
    const x2 = 100 + Math.cos(a) * 96,
      y2 = 100 + Math.sin(a) * 96;
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      stroke: COLORS.divider,
      strokeWidth: "1.5"
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.inkMuted,
      fontWeight: 600,
      letterSpacing: 0.5,
      textTransform: 'uppercase'
    }
  }, "Consumo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: NUMFONT,
      fontSize: 56,
      fontWeight: 600,
      color: COLORS.ink,
      letterSpacing: -1.5,
      lineHeight: 1
    }
  }, animVal.toFixed(1).replace('.', ','), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Geist", system-ui, sans-serif',
      fontSize: 16,
      color: COLORS.inkSoft,
      fontWeight: 600,
      marginLeft: 4
    }
  }, "m\xB3")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: COLORS.goodSoft,
      color: COLORS.good,
      padding: '4px 9px',
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700
    }
  }, Icon.arrowDown(COLORS.good, 11), " ", Math.abs(delta), "% vs mes ant.")));
}
function BalanceDisplay({
  balance
}) {
  const n = useAnimatedNumber(balance, 1100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: NUMFONT,
      fontSize: 48,
      fontWeight: 600,
      color: '#fff',
      letterSpacing: -1.2,
      lineHeight: 1
    }
  }, fmtCL(n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Geist", system-ui, sans-serif',
      fontSize: 15,
      fontWeight: 600,
      opacity: 0.7,
      marginLeft: 6
    }
  }, "AC"));
}
function ScreenInicio({
  state,
  dispatch,
  goPremios
}) {
  const h = new Date().getHours();
  const greeting = h < 12 ? '¡Hola, buen día!' : h < 20 ? '¡Hola, buenas tardes!' : '¡Hola, buenas noches!';
  const now = new Date();
  const month = now.toLocaleDateString('es-CL', {
    month: 'long'
  });
  const daysLeft = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate();
  const multiActive = state.multiplierUntil > Date.now();
  const multiDays = multiActive ? Math.ceil((state.multiplierUntil - Date.now()) / DAY) : 0;
  const tip = TIPS[state.tipIndex % TIPS.length];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 24
    }
  }, /*#__PURE__*/React.createElement(AppHeader, {
    subtitle: greeting,
    title: "Mati A.",
    right: /*#__PURE__*/React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 999,
        background: `linear-gradient(135deg, ${COLORS.aqua}, ${COLORS.primary})`,
        color: '#fff',
        fontWeight: 700,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, "MA")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDk} 100%)`,
      borderRadius: 22,
      padding: '18px 20px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 8px 24px rgba(14,110,126,0.28)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      right: -10,
      top: -10,
      opacity: 0.15
    },
    width: "160",
    height: "160",
    viewBox: "0 0 160 160"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "60",
    r: "60",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "140",
    cy: "120",
    r: "35",
    fill: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'rgba(255,255,255,0.7)',
      fontWeight: 500,
      letterSpacing: 0.4,
      textTransform: 'uppercase'
    }
  }, "AQUACOINS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 6
    }
  }, Icon.coin(28), /*#__PURE__*/React.createElement(BalanceDisplay, {
    balance: state.balance
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'rgba(255,255,255,0.65)',
      marginTop: 8,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, "+85 AC esta semana", multiActive && /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'rgba(255,255,255,0.2)',
      border: '1px solid rgba(255,255,255,0.35)',
      borderRadius: 999,
      padding: '2px 8px',
      fontSize: 10.5,
      fontWeight: 700,
      color: '#fff'
    }
  }, "\xD72 activo \xB7 ", multiDays, " d"))), /*#__PURE__*/React.createElement("button", {
    onClick: goPremios,
    style: {
      border: '1px solid rgba(255,255,255,0.3)',
      background: 'rgba(255,255,255,0.12)',
      color: '#fff',
      fontSize: 12,
      fontWeight: 600,
      padding: '8px 12px',
      borderRadius: 999,
      cursor: 'pointer',
      fontFamily: 'inherit'
    }
  }, "Canjear \u2192")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 14px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: '20px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: COLORS.ink
    }
  }, "Consumo de ", month), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.inkMuted,
      fontWeight: 600
    }
  }, daysLeft, " d\xEDas restantes")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '4px 0 6px'
    }
  }, /*#__PURE__*/React.createElement(GaugeRing, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 0,
      borderTop: `1px solid ${COLORS.divider}`,
      paddingTop: 14,
      marginTop: 4
    }
  }, [{
    l: 'Promedio diario',
    v: '0,29 m³',
    s: '−14% vs mes ant.'
  }, {
    l: 'Meta del mes',
    v: '15,0 m³',
    s: 'Bonus: +120 AC'
  }, {
    l: 'Proyección',
    v: '13,0 m³',
    s: 'Cumplirás meta'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      paddingLeft: i === 0 ? 0 : 12,
      borderLeft: i === 0 ? 'none' : `1px solid ${COLORS.divider}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: COLORS.inkMuted,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.4
    }
  }, s.l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: COLORS.ink,
      marginTop: 3
    }
  }, s.v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: COLORS.good,
      marginTop: 1,
      fontWeight: 600
    }
  }, s.s)))))), /*#__PURE__*/React.createElement(TrustRibbon, {
    note: "Essbio Mide \xB7 lectura oficial del medidor"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 14px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0,
      overflow: 'hidden',
      border: `1.5px solid ${COLORS.aquaSoft}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    key: state.tipIndex,
    className: "ar-fade",
    style: {
      background: `linear-gradient(180deg, ${COLORS.aquaSoft} 0%, ${COLORS.card} 100%)`,
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    bg: COLORS.card,
    color: COLORS.primary,
    style: {
      border: `1px solid ${COLORS.aquaSoft}`
    }
  }, Icon.spark(11), " TIP DE HOY"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      color: COLORS.inkMuted,
      fontWeight: 600
    }
  }, state.tipIndex % TIPS.length + 1, " de ", TIPS.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: COLORS.ink,
      lineHeight: 1.3,
      letterSpacing: -0.2
    }
  }, tip.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.inkSoft,
      marginTop: 4,
      lineHeight: 1.45
    }
  }, tip.d), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      haptic();
      dispatch({
        type: 'nextTip'
      });
    },
    style: {
      width: '100%',
      background: 'transparent',
      color: COLORS.primary,
      border: `1px solid ${COLORS.divider}`,
      padding: '11px 14px',
      borderRadius: 12,
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'inherit'
    }
  }, "Entendido \xB7 ver otro tip"))))));
}

// ─────────────────────────────────────────────────────────
// PANTALLA 2 — PREMIOS (canje funcional)
// ─────────────────────────────────────────────────────────
const REWARDS = [{
  id: 'essbio',
  icon: s => Icon.receipt(s),
  title: 'Descuento en boleta Essbio',
  sub: '15% en próxima cuenta',
  cost: 800,
  tag: 'POPULAR',
  tagColor: () => COLORS.primary,
  tint: () => COLORS.aquaSoft,
  cat: 'servicios'
}, {
  id: 'ducha',
  icon: s => Icon.shower(s),
  title: 'Kit ahorro ducha',
  sub: 'Cabezal eficiente + reductor',
  cost: 600,
  tag: '',
  tagColor: () => '#B5641F',
  tint: () => '#FFE9D2',
  cat: 'eco'
}, {
  id: 'lluvia',
  icon: s => Icon.tank(s),
  title: 'Estanque recolector lluvia',
  sub: 'Barril 200 L para riego sin agua potable',
  cost: 500,
  tag: 'ECO',
  tagColor: () => COLORS.forest,
  tint: () => COLORS.aquaSoft,
  cat: 'eco'
}, {
  id: 'tree',
  icon: s => Icon.tree(s),
  title: 'Planta árbol nativo',
  sub: 'Quillay sembrado en Arauco',
  cost: 300,
  tag: 'ECO',
  tagColor: () => COLORS.forest,
  tint: () => '#E2EFE6',
  cat: 'eco'
}, {
  id: 'badge',
  icon: s => Icon.badge(s),
  title: 'Multiplicador',
  sub: 'Bonifica ×2 tus AquaCoins por 7 días',
  cost: 200,
  tag: '',
  tagColor: () => COLORS.coin,
  tint: () => COLORS.coinSoft,
  cat: 'insignias'
}];
const CATS = [{
  id: 'todo',
  l: 'Todo'
}, {
  id: 'servicios',
  l: 'Servicios'
}, {
  id: 'eco',
  l: 'Eco'
}, {
  id: 'insignias',
  l: 'Insignias'
}];
function RewardRowInline({
  item,
  balance,
  redeemedCount,
  multiActive,
  onRedeem
}) {
  const isActiveMulti = item.id === 'badge' && multiActive;
  const can = balance >= item.cost && !isActiveMulti;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 14,
      background: item.tint(),
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, item.icon(26)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 2,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.ink,
      letterSpacing: -0.1
    }
  }, item.title), item.tag && /*#__PURE__*/React.createElement("span", {
    style: {
      background: COLORS.card,
      color: item.tagColor(),
      border: `1px solid ${item.tagColor()}33`,
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: 0.3,
      padding: '2px 6px',
      borderRadius: 4
    }
  }, item.tag), redeemedCount > 0 && !isActiveMulti && /*#__PURE__*/React.createElement("span", {
    style: {
      background: COLORS.goodSoft,
      color: COLORS.good,
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: 0.3,
      padding: '2px 6px',
      borderRadius: 4
    }
  }, "\u2713 \xD7", redeemedCount)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: COLORS.inkMuted,
      lineHeight: 1.35
    }
  }, item.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      marginTop: 6
    }
  }, Icon.coin(13), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: COLORS.ink
    }
  }, item.cost, " AC"))), /*#__PURE__*/React.createElement("button", {
    disabled: !can,
    onClick: () => can && onRedeem(item),
    style: {
      background: isActiveMulti ? COLORS.goodSoft : can ? COLORS.primary : COLORS.divider,
      color: isActiveMulti ? COLORS.good : can ? '#fff' : COLORS.inkMuted,
      border: 'none',
      padding: '8px 14px',
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700,
      cursor: can ? 'pointer' : 'not-allowed',
      flexShrink: 0,
      fontFamily: 'inherit'
    }
  }, isActiveMulti ? 'Activo ✓' : can ? 'Canjear' : 'Faltan ' + fmtCL(item.cost - balance)));
}
function ScreenPremios({
  state,
  dispatch,
  showToast
}) {
  const [cat, setCat] = React.useState('todo');
  const [pending, setPending] = React.useState(null); // premio en confirmación
  const balance = state.balance;
  const multiActive = state.multiplierUntil > Date.now();
  const counts = React.useMemo(() => {
    const c = {
      todo: REWARDS.length
    };
    REWARDS.forEach(r => {
      c[r.cat] = (c[r.cat] || 0) + 1;
    });
    return c;
  }, []);
  const redeemedBy = id => state.redemptions.filter(r => r.id === id).length;
  const featured = REWARDS[0];
  const showFeatured = cat === 'todo' || cat === featured.cat;
  const list = REWARDS.slice(1).filter(r => cat === 'todo' || r.cat === cat);
  const confirmRedeem = () => {
    if (!pending || balance < pending.cost) return;
    haptic();
    dispatch({
      type: 'redeem',
      reward: pending
    });
    showToast(pending.id === 'badge' ? '×2 AquaCoins activo por 7 días' : `Canjeaste: ${pending.title}`);
    setPending(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 24
    }
  }, /*#__PURE__*/React.createElement(AppHeader, {
    subtitle: "Cat\xE1logo de recompensas",
    title: "Premios",
    right: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: COLORS.coinSoft,
        padding: '7px 12px',
        borderRadius: 999
      }
    }, Icon.coin(16), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.coin === '#E8A317' ? '#7d5a13' : COLORS.coin
      }
    }, fmtCL(balance), " AC"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 14px',
      display: 'flex',
      gap: 8,
      overflowX: 'auto'
    }
  }, CATS.map(t => {
    const active = cat === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => {
        setCat(t.id);
        haptic();
      },
      style: {
        padding: '7px 13px',
        borderRadius: 999,
        background: active ? COLORS.ink : COLORS.card,
        color: active ? COLORS.bg : COLORS.inkSoft,
        fontSize: 12.5,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        border: active ? 'none' : `1px solid ${COLORS.divider}`,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        cursor: 'pointer',
        fontFamily: 'inherit'
      }
    }, t.l, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        opacity: 0.6,
        fontWeight: 600
      }
    }, counts[t.id] || 0));
  })), showFeatured && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${COLORS.card} 0%, ${COLORS.aquaSoft} 100%)`,
      borderRadius: 20,
      padding: 18,
      position: 'relative',
      overflow: 'hidden',
      border: `1px solid ${COLORS.divider}`
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    bg: COLORS.coin,
    color: "#fff"
  }, "DESTACADO"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 16,
      background: COLORS.card,
      border: `1px solid ${COLORS.divider}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, Icon.receipt(34)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: COLORS.ink,
      letterSpacing: -0.2
    }
  }, "15% en boleta Essbio"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.inkSoft,
      marginTop: 2
    }
  }, "Aplicable al pr\xF3ximo ciclo. 124 personas lo canjearon esta semana."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, Icon.coin(18), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: COLORS.ink
    }
  }, featured.cost, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: COLORS.inkMuted,
      fontWeight: 600
    }
  }, "AC"))), /*#__PURE__*/React.createElement("button", {
    disabled: balance < featured.cost,
    onClick: () => balance >= featured.cost && setPending(featured),
    style: {
      background: balance >= featured.cost ? COLORS.primary : COLORS.divider,
      color: balance >= featured.cost ? '#fff' : COLORS.inkMuted,
      border: 'none',
      padding: '10px 18px',
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 700,
      cursor: balance >= featured.cost ? 'pointer' : 'not-allowed',
      fontFamily: 'inherit'
    }
  }, balance >= featured.cost ? 'Canjear →' : `Faltan ${fmtCL(featured.cost - balance)}`)))), list.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.inkMuted,
      fontWeight: 700,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      padding: '0 4px 8px'
    }
  }, "Disponibles ahora"), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0
    }
  }, list.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      borderBottom: i < list.length - 1 ? `1px solid ${COLORS.divider}` : 'none'
    }
  }, /*#__PURE__*/React.createElement(RewardRowInline, {
    item: r,
    balance: balance,
    redeemedCount: redeemedBy(r.id),
    multiActive: multiActive,
    onRedeem: item => setPending(item)
  }))))), state.redemptions.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.inkMuted,
      fontWeight: 700,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      padding: '0 4px 8px',
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, Icon.history(COLORS.inkMuted, 13), " Mis canjes"), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0
    }
  }, state.redemptions.slice(0, 6).map((r, i, arr) => {
    const item = REWARDS.find(x => x.id === r.id);
    return /*#__PURE__*/React.createElement("div", {
      key: r.ts + '-' + i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.divider}` : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 10,
        background: item ? item.tint() : COLORS.aquaSoft,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, item ? item.icon(20) : Icon.coin(20)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: COLORS.ink
      }
    }, r.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.inkMuted,
        marginTop: 1
      }
    }, new Date(r.ts).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: COLORS.danger
      }
    }, "\u2212", fmtCL(r.cost), " AC"));
  }))), /*#__PURE__*/React.createElement(BottomSheet, {
    open: !!pending,
    onClose: () => setPending(null)
  }, pending && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 16,
      background: pending.tint(),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, pending.icon(30)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: COLORS.ink,
      letterSpacing: -0.2
    }
  }, pending.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: COLORS.inkMuted,
      marginTop: 2
    }
  }, pending.sub))), /*#__PURE__*/React.createElement(SheetRow, {
    label: "Costo",
    value: `−${fmtCL(pending.cost)} AC`
  }), /*#__PURE__*/React.createElement(SheetRow, {
    label: "Saldo actual",
    value: `${fmtCL(balance)} AC`
  }), /*#__PURE__*/React.createElement(SheetRow, {
    label: "Saldo despu\xE9s del canje",
    value: `${fmtCL(balance - pending.cost)} AC`,
    strong: true
  }), /*#__PURE__*/React.createElement(SheetButton, {
    onClick: confirmRedeem,
    disabled: balance < pending.cost
  }, "Confirmar canje"), /*#__PURE__*/React.createElement(SheetButton, {
    ghost: true,
    onClick: () => setPending(null)
  }, "Cancelar"))));
}

// ─────────────────────────────────────────────────────────
// PANTALLA 3 — COMUNIDAD (donaciones funcionales)
// ─────────────────────────────────────────────────────────
function ImpactCounter({
  target,
  go
}) {
  const n = useAnimatedNumber(target, 1400, 0, go);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: NUMFONT,
      fontWeight: 600,
      fontSize: 56,
      letterSpacing: -1.6,
      lineHeight: 1
    }
  }, fmtCL(n));
}
function ScreenComunidad({
  state,
  dispatch,
  showToast,
  active
}) {
  const [donMode, setDonMode] = React.useState('ac'); // 'ac' | 'm3'
  const [donAC, setDonAC] = React.useState(50);
  const [donM3, setDonM3] = React.useState(2);
  const [confirming, setConfirming] = React.useState(false);
  const clp = n => n.toLocaleString('es-CL');
  const funded = state.projectFunded;
  const pct = Math.min(funded / PROJECT_GOAL, 1);
  const complete = funded >= PROJECT_GOAL;
  const canDonateAC = state.balance >= donAC;
  const confirmDonation = () => {
    haptic();
    if (donMode === 'ac') {
      if (!canDonateAC) return;
      dispatch({
        type: 'donateAC',
        amount: donAC
      });
      showToast(`¡Gracias! Aportaste ${donAC} AC al proyecto`);
    } else {
      dispatch({
        type: 'donateM3',
        m3: donM3
      });
      showToast(`¡Gracias! Aportaste $${clp(donM3 * CLP_PER_M3)} al proyecto`);
    }
    setConfirming(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 24
    }
  }, /*#__PURE__*/React.createElement(AppHeader, {
    subtitle: "Tu impacto en la regi\xF3n",
    title: "Comunidad"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 14px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 150,
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: 'url("assets/tubul-rural.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(10,34,51,0.18) 0%, transparent 35%, transparent 60%, rgba(10,34,51,0.45) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 10,
      left: 12,
      right: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: '#fff',
      fontSize: 11,
      fontWeight: 600,
      textShadow: '0 1px 4px rgba(0,0,0,0.5)'
    }
  }, Icon.pipe(18), " Santa B\xE1rbara \xB7 Regi\xF3n del Biob\xEDo"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      background: 'rgba(255,255,255,0.95)',
      color: COLORS.forest,
      padding: '5px 10px',
      borderRadius: 999,
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: 0.4,
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: COLORS.good
    }
  }), complete ? 'Financiado' : 'Activo')), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.inkMuted,
      fontWeight: 700,
      letterSpacing: 0.4,
      textTransform: 'uppercase',
      marginBottom: 4
    }
  }, "Proyecto comunitario"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: COLORS.ink,
      letterSpacing: -0.3,
      lineHeight: 1.25
    }
  }, "Red agua potable rural"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.inkSoft,
      marginTop: 2
    }
  }, "Santa B\xE1rbara \xB7 84 familias"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: complete ? COLORS.good : COLORS.ink
    }
  }, complete ? '¡100% financiado!' : `${Math.round(pct * 100)}% financiado`), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: COLORS.inkMuted,
      fontWeight: 600
    }
  }, fmtCL(funded), " / ", fmtCL(PROJECT_GOAL), " AC")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      borderRadius: 999,
      background: COLORS.divider,
      overflow: 'hidden',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct * 100}%`,
      height: '100%',
      background: `linear-gradient(90deg, ${COLORS.aqua}, ${COLORS.primary})`,
      borderRadius: 999,
      position: 'relative',
      transition: 'width .9s cubic-bezier(.2,.7,.2,1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: 14,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5))'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 8,
      fontSize: 11,
      color: COLORS.inkMuted
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: COLORS.ink
    }
  }, fmtCL(state.donors)), " donantes"), /*#__PURE__*/React.createElement("span", null, "Finaliza en ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: COLORS.ink
    }
  }, "23 d\xEDas"))), (state.myAC > 0 || state.myCLP > 0) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: COLORS.goodSoft,
      color: COLORS.good,
      padding: '5px 11px',
      borderRadius: 999,
      fontSize: 11.5,
      fontWeight: 700
    }
  }, "\u2665 Tu aporte: ", state.myAC > 0 ? `${fmtCL(state.myAC)} AC` : '', state.myAC > 0 && state.myCLP > 0 ? ' · ' : '', state.myCLP > 0 ? `$${fmtCL(state.myCLP)}` : '')), !complete && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      padding: 14,
      background: COLORS.bg,
      borderRadius: 14,
      border: `1px solid ${COLORS.divider}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.inkSoft,
      fontWeight: 600
    }
  }, "Elige tu aporte"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      background: COLORS.card,
      borderRadius: 9,
      padding: 2,
      border: `1px solid ${COLORS.divider}`
    }
  }, [{
    k: 'ac',
    t: 'AquaCoins'
  }, {
    k: 'm3',
    t: 'Agua m³'
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.k,
    onClick: () => {
      setDonMode(o.k);
      haptic();
    },
    style: {
      padding: '5px 11px',
      borderRadius: 7,
      border: 'none',
      cursor: 'pointer',
      background: donMode === o.k ? COLORS.primary : 'transparent',
      color: donMode === o.k ? '#fff' : COLORS.inkSoft,
      fontSize: 11.5,
      fontWeight: 700,
      fontFamily: 'inherit'
    }
  }, o.t)))), donMode === 'ac' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, [25, 50, 100, 250].map(v => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setDonAC(v),
    style: {
      flex: 1,
      padding: '10px 0',
      borderRadius: 10,
      background: donAC === v ? COLORS.primary : COLORS.card,
      color: donAC === v ? '#fff' : COLORS.ink,
      border: donAC === v ? 'none' : `1px solid ${COLORS.divider}`,
      fontSize: 13,
      fontWeight: 700,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      fontFamily: 'inherit'
    }
  }, v, " AC"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, [1, 2, 5, 10].map(v => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setDonM3(v),
    style: {
      flex: 1,
      padding: '8px 0',
      borderRadius: 10,
      background: donM3 === v ? COLORS.primary : COLORS.card,
      color: donM3 === v ? '#fff' : COLORS.ink,
      border: donM3 === v ? 'none' : `1px solid ${COLORS.divider}`,
      cursor: 'pointer',
      lineHeight: 1.1,
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 800
    }
  }, v, " m\xB3"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      opacity: donM3 === v ? 0.85 : 0.6,
      marginTop: 1
    }
  }, "$", clp(v * CLP_PER_M3))))), /*#__PURE__*/React.createElement("button", {
    disabled: donMode === 'ac' && !canDonateAC,
    onClick: () => setConfirming(true),
    style: {
      width: '100%',
      marginTop: 10,
      background: donMode === 'ac' && !canDonateAC ? COLORS.divider : COLORS.ink,
      color: donMode === 'ac' && !canDonateAC ? COLORS.inkMuted : COLORS.bg,
      border: 'none',
      padding: '13px',
      borderRadius: 12,
      fontSize: 14,
      fontWeight: 700,
      cursor: donMode === 'ac' && !canDonateAC ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      fontFamily: 'inherit'
    }
  }, donMode === 'ac' ? canDonateAC ? `Donar ${donAC} AC al proyecto →` : 'Saldo insuficiente' : `Donar $${clp(donM3 * CLP_PER_M3)} al proyecto →`), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: COLORS.inkMuted,
      marginTop: 8,
      textAlign: 'center',
      lineHeight: 1.4
    }
  }, donMode === 'm3' ? `Equivale a ${donM3} m³ de agua · tarifa referencial Essbio` : 'Se descuentan de tu saldo de AquaCoins')), complete && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      padding: 16,
      background: COLORS.goodSoft,
      borderRadius: 14,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.good
    }
  }, "\uD83C\uDF89 \xA1Meta alcanzada!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.inkSoft,
      marginTop: 4
    }
  }, "Gracias a ", fmtCL(state.donors), " donantes, el proyecto est\xE1 100% financiado."))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${COLORS.aqua}, ${COLORS.primary})`,
      borderRadius: 22,
      padding: 20,
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 8px 24px rgba(59,181,199,0.25)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      right: -8,
      top: -8,
      opacity: 0.16
    },
    width: "180",
    height: "180",
    viewBox: "0 0 180 180"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M120 30c-15 18-26 32-26 48a26 26 0 0 0 52 0c0-16-11-30-26-48z",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60 90c-9 11-16 19-16 30a16 16 0 0 0 32 0c0-11-7-19-16-30z",
    fill: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.85,
      fontWeight: 600,
      letterSpacing: 0.5,
      textTransform: 'uppercase'
    }
  }, "Impacto acumulado"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(ImpactCounter, {
    target: 14200,
    go: active
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      opacity: 0.85
    }
  }, "L conservados")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      opacity: 0.85,
      marginTop: 6,
      lineHeight: 1.4
    }
  }, "Equivalen a ", /*#__PURE__*/React.createElement("b", null, "71 d\xEDas de agua potable"), " para una familia rural de 4 personas."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 10,
      marginTop: 16,
      paddingTop: 14,
      borderTop: '1px solid rgba(255,255,255,0.2)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800
    }
  }, "9"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      opacity: 0.8,
      fontWeight: 600
    }
  }, "Meses activo")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800
    }
  }, "4"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      opacity: 0.8,
      fontWeight: 600
    }
  }, "\xC1rboles plantados")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800
    }
  }, "2,3 t"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      opacity: 0.8,
      fontWeight: 600
    }
  }, "CO\u2082 evitado")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.inkMuted,
      fontWeight: 700,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      padding: '0 4px 8px'
    }
  }, "Otras iniciativas"), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0
    }
  }, [{
    icon: s => Icon.tree(s),
    title: 'Reforestación cuenca río Andalién',
    loc: 'Concepción · 41%',
    tint: '#E2EFE6'
  }, {
    icon: s => Icon.shield(s),
    title: 'Sensores comunitarios de napas',
    loc: 'Los Ángeles · 12%',
    tint: COLORS.aquaSoft
  }].map((p, i, a) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => showToast('Próximamente: más proyectos comunitarios'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      borderBottom: i < a.length - 1 ? `1px solid ${COLORS.divider}` : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: p.tint,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, p.icon(22)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 700,
      color: COLORS.ink
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: COLORS.inkMuted,
      marginTop: 1
    }
  }, p.loc)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: COLORS.inkMuted,
      fontSize: 18
    }
  }, "\u203A"))))), /*#__PURE__*/React.createElement(BottomSheet, {
    open: confirming,
    onClose: () => setConfirming(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: COLORS.ink,
      letterSpacing: -0.2,
      marginBottom: 4
    }
  }, "Confirmar donaci\xF3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: COLORS.inkMuted,
      marginBottom: 12
    }
  }, "Red agua potable rural \xB7 Santa B\xE1rbara"), donMode === 'ac' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SheetRow, {
    label: "Aporte",
    value: `${donAC} AC`
  }), /*#__PURE__*/React.createElement(SheetRow, {
    label: "Saldo actual",
    value: `${fmtCL(state.balance)} AC`
  }), /*#__PURE__*/React.createElement(SheetRow, {
    label: "Saldo despu\xE9s",
    value: `${fmtCL(state.balance - donAC)} AC`,
    strong: true
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SheetRow, {
    label: "Aporte",
    value: `${donM3} m³ de agua`
  }), /*#__PURE__*/React.createElement(SheetRow, {
    label: "Equivalente en dinero",
    value: `$${fmtCL(donM3 * CLP_PER_M3)}`,
    strong: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.inkMuted,
      padding: '10px 0 0',
      lineHeight: 1.4
    }
  }, "Demo: pago simulado \xB7 tarifa referencial Essbio $1.180/m\xB3")), /*#__PURE__*/React.createElement(SheetButton, {
    onClick: confirmDonation,
    disabled: donMode === 'ac' && !canDonateAC
  }, donMode === 'ac' ? `Donar ${donAC} AC` : `Donar $${fmtCL(donM3 * CLP_PER_M3)}`), /*#__PURE__*/React.createElement(SheetButton, {
    ghost: true,
    onClick: () => setConfirming(false)
  }, "Cancelar")));
}

// ─────────────────────────────────────────────────────────
// PANTALLA 4 — REPORTES (módulo de mapa en iframe)
// ─────────────────────────────────────────────────────────
function ScreenReportes({
  dark
}) {
  const ref = React.useRef(null);
  const mode = dark ? 'oscuro' : 'claro';
  React.useEffect(() => {
    const send = () => {
      try {
        const w = ref.current && ref.current.contentWindow;
        if (!w) return;
        w.postMessage({
          type: 'aqua-theme',
          mode
        }, '*');
        // Los iframes no heredan env(safe-area-inset-*): se lo pasamos medido.
        const probe = document.getElementById('sat-probe');
        const top = probe ? probe.getBoundingClientRect().height : 0;
        w.postMessage({
          type: 'aqua-insets',
          top
        }, '*');
      } catch (e) {}
    };
    send();
    const f = ref.current;
    if (f) f.addEventListener('load', send);
    return () => {
      if (f) f.removeEventListener('load', send);
    };
  }, [mode]);
  return /*#__PURE__*/React.createElement("iframe", {
    ref: ref,
    src: `reportes.html?theme=${mode}`,
    title: "Reportes comunitarios",
    style: {
      display: 'block',
      width: '100%',
      height: '100%',
      border: 'none',
      background: COLORS.bg
    }
  });
}

// ─────────────────────────────────────────────────────────
// TAB BAR + APP
// ─────────────────────────────────────────────────────────
const TABS = [{
  id: 'inicio',
  label: 'Inicio',
  icon: Icon.home
}, {
  id: 'premios',
  label: 'Premios',
  icon: Icon.gift
}, {
  id: 'comunidad',
  label: 'Comunidad',
  icon: Icon.users
}, {
  id: 'reportes',
  label: 'Reportes',
  icon: Icon.mapPin
}];
function TabBar({
  active,
  onChange,
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 30,
      paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)',
      paddingTop: 8,
      background: dark ? 'rgba(16,26,46,0.88)' : 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      borderTop: `0.5px solid ${COLORS.divider}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '0 8px'
    }
  }, TABS.map(t => {
    const isActive = t.id === active;
    const c = isActive ? COLORS.primary : COLORS.inkMuted;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => onChange(t.id),
      "aria-label": t.label,
      style: {
        flex: 1,
        padding: '6px 0',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        background: 'transparent',
        border: 'none',
        fontFamily: 'inherit',
        WebkitTapHighlightColor: 'transparent'
      }
    }, t.icon(c), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        fontWeight: 600,
        color: c,
        letterSpacing: 0.1
      }
    }, t.label), isActive && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: -8,
        width: 28,
        height: 3,
        borderRadius: '0 0 3px 3px',
        background: COLORS.primary
      }
    }));
  })));
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
  const [visited, setVisited] = React.useState({
    inicio: true
  });
  const [state, dispatch] = React.useReducer(reducer, undefined, loadState);
  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);
  const showToast = React.useCallback(text => {
    clearTimeout(toastTimer.current);
    setToast({
      text,
      key: Date.now()
    });
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);
  React.useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {}
  }, [state]);
  React.useEffect(() => {
    const m = document.querySelector('meta[name="theme-color"]:not([media])');
    if (m) m.setAttribute('content', dark ? '#0C1426' : '#FBFDFE');
    document.body.style.background = base.bg;
  }, [dark]);
  const switchTab = id => {
    haptic();
    setTab(id);
    setVisited(v => v[id] ? v : {
      ...v,
      [id]: true
    });
  };
  const bg = `linear-gradient(180deg, ${base.bgTop} 0%, ${base.bgTop} 30%, ${base.bgBot} 100%)`;
  const screens = {
    inicio: /*#__PURE__*/React.createElement(ScreenInicio, {
      state: state,
      dispatch: dispatch,
      goPremios: () => switchTab('premios')
    }),
    premios: /*#__PURE__*/React.createElement(ScreenPremios, {
      state: state,
      dispatch: dispatch,
      showToast: showToast
    }),
    comunidad: /*#__PURE__*/React.createElement(ScreenComunidad, {
      state: state,
      dispatch: dispatch,
      showToast: showToast,
      active: tab === 'comunidad' || !!visited.comunidad
    }),
    reportes: /*#__PURE__*/React.createElement(ScreenReportes, {
      dark: dark
    })
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "app",
    style: {
      position: 'relative',
      height: '100%',
      overflow: 'hidden',
      background: bg,
      color: COLORS.ink,
      fontFamily: '"Geist", ui-sans-serif, -apple-system, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      backgroundImage: PAPER_TEXTURE,
      backgroundRepeat: 'repeat',
      mixBlendMode: dark ? 'screen' : 'multiply',
      opacity: dark ? 0.5 : 1
    }
  }), TABS.map(t => {
    if (!visited[t.id]) return null;
    const isActive = tab === t.id;
    const isMap = t.id === 'reportes';
    return /*#__PURE__*/React.createElement("div", {
      key: t.id,
      className: "ar-screen",
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: isMap ? 'calc(64px + env(safe-area-inset-bottom, 0px))' : 0,
        overflow: isMap ? 'hidden' : 'auto',
        WebkitOverflowScrolling: 'touch',
        paddingBottom: isMap ? 0 : 'calc(80px + env(safe-area-inset-bottom, 0px))',
        zIndex: 1,
        visibility: isActive ? 'visible' : 'hidden',
        pointerEvents: isActive ? 'auto' : 'none'
      }
    }, screens[t.id]);
  }), /*#__PURE__*/React.createElement(TabBar, {
    active: tab,
    onChange: switchTab,
    dark: dark
  }), /*#__PURE__*/React.createElement(Toast, {
    msg: toast
  }));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));