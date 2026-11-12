const S = "rgba(226,240,242,0.85)";

const Cube = ({ x, y, s = 9, top = "#EAF4F5", l = "#9FB9BE", r = "#4F6C74" }) => (
  <g>
    <polygon points={`${x},${y - s * 0.58} ${x + s},${y} ${x},${y + s * 0.58} ${x - s},${y}`} fill={top} />
    <polygon points={`${x - s},${y} ${x},${y + s * 0.58} ${x},${y + s * 1.58} ${x - s},${y + s}`} fill={l} />
    <polygon points={`${x},${y + s * 0.58} ${x + s},${y} ${x + s},${y + s} ${x},${y + s * 1.58}`} fill={r} />
  </g>
);

const Blockchain = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
    <Cube x={22} y={34} />
    <Cube x={42} y={34} />
    <Cube x={32} y={22} top="#19D8D0" l="#12A9A3" r="#0B6F6C" />
    <path d="M22 44 L32 50 L42 44" fill="none" stroke="#19D8D0" strokeWidth="0.8" strokeOpacity="0.7" />
  </svg>
);

const AI = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <polygon key={i} points={`32,${20 + i * 9} 52,${30 + i * 9} 32,${40 + i * 9} 12,${30 + i * 9}`} fill={i === 0 ? "rgba(25,216,208,0.22)" : "rgba(170,205,210,0.12)"} stroke={S} strokeWidth="0.7" />
    ))}
    <path d="M22 30 L32 25 L42 30 M32 25 L32 35" stroke="#19D8D0" strokeWidth="0.9" fill="none" />
    <circle cx="32" cy="25" r="2" fill="#19D8D0" />
  </svg>
);

const Trading = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
    {[[14, 46, 14], [24, 42, 22], [34, 46, 16], [44, 40, 28], [54, 44, 20]].map(([x, y, h], i) => (
      <g key={x}>
        <line x1={x} y1={y - h - 5} x2={x} y2={y + 2} stroke={S} strokeWidth="0.6" />
        <rect x={x - 3} y={y - h} width="6" height={h} rx="1" fill={i === 3 ? "#19D8D0" : "url(#hmSilver)"} />
      </g>
    ))}
    <defs><linearGradient id="hmSilver" x1="0" x2="1"><stop offset="0" stopColor="#E6F1F2" /><stop offset="1" stopColor="#6F8C93" /></linearGradient></defs>
  </svg>
);

const Assets = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(0 ${-i * 7})`}>
        <ellipse cx="32" cy="44" rx="16" ry="7" fill="#2E4A52" />
        <rect x="16" y="40" width="32" height="4" fill="#5E7D85" />
        <ellipse cx="32" cy="40" rx="16" ry="7" fill={i === 2 ? "url(#hmTok)" : "#9FB9BE"} stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" />
      </g>
    ))}
    <path d="M32 21 l5 3 v5 l-5 3 l-5 -3 v-5 Z" fill="none" stroke="#19D8D0" strokeWidth="0.9" />
    <defs><linearGradient id="hmTok" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#F2FAFA" /><stop offset="1" stopColor="#8FB0B5" /></linearGradient></defs>
  </svg>
);

export const HERO_MODULES = [
  { id: "blockchain", name: "Blockchain", Art: Blockchain, x: 17, y: 16, depth: 1.4, float: 7 },
  { id: "ai", name: "AI Intelligence", Art: AI, x: 83, y: 14, depth: 1.1, float: 8.5 },
  { id: "trading", name: "Trading", Art: Trading, x: 16, y: 80, depth: 1.2, float: 9 },
  { id: "assets", name: "Digital Assets", Art: Assets, x: 84, y: 82, depth: 1.5, float: 7.8 },
];
