import { motion } from "framer-motion";
import { QImage } from "./QObject";

const W = 600;
const H = 450;
const C = [300, 240];
const VERTS = [[300, 88], [540, 164], [540, 316], [300, 392], [60, 316], [60, 164]];
const CARDS = [[300, 62], [520, 144], [520, 300], [300, 380], [80, 300], [80, 144]];
const pct = ([x, y]) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
const hex = (d = 0, s = 1) => VERTS.map(([x, y]) => `${C[0] + (x - C[0]) * s},${C[1] + (y - C[1]) * s + d}`).join(" ");
const ease = [0.22, 1, 0.36, 1];

const Defs = () => (
  <defs>
    <linearGradient id="eco-face" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1B353D" /><stop offset="1" stopColor="#0A1E25" /></linearGradient>
    <linearGradient id="eco-metal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2E464E" /><stop offset="0.3" stopColor="#B9CED2" /><stop offset="0.55" stopColor="#6F8C93" /><stop offset="0.8" stopColor="#A9C0C5" /><stop offset="1" stopColor="#2E464E" /></linearGradient>
    <linearGradient id="eco-edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="rgba(230,245,247,0.55)" /><stop offset="0.5" stopColor="rgba(160,190,196,0.18)" /><stop offset="1" stopColor="rgba(230,245,247,0.4)" /></linearGradient>
    <pattern id="eco-brush" width="6" height="3" patternUnits="userSpaceOnUse"><rect width="6" height="1" fill="rgba(255,255,255,0.025)" /></pattern>
  </defs>
);

const Platform = ({ active, reduce }) => (
  <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
    <Defs />
    <polygon points={hex(12)} fill="url(#eco-metal)" opacity="0.75" />
    <polygon points={hex()} fill="url(#eco-face)" stroke="url(#eco-edge)" strokeWidth="1" />
    <polygon points={hex()} fill="url(#eco-brush)" />
    <polygon points={hex(0, 0.58)} fill="none" stroke="rgba(255,255,255,0.07)" strokeDasharray="3 5" />
    {VERTS.map(([x, y], i) => {
      const on = active === i;
      const d = `M${C[0]} ${C[1]} L${x} ${y}`;
      return (
        <g key={i}>
          <path d={d} stroke="rgba(100,189,183,0.2)" strokeWidth="1.2" />
          <motion.path d={d} stroke="#19D8D0" strokeWidth="1.2" initial={false} animate={{ opacity: on ? 0.85 : 0 }} transition={{ duration: 0.6 }} />
          <ellipse cx={x} cy={y} rx="9" ry="3.2" fill={on ? "#19D8D0" : "rgba(185,206,210,0.55)"} style={{ transition: "fill 500ms" }} />
          {!reduce && (
            <circle r={on ? 2.6 : 1.8} fill={on ? "#E6FFFD" : "#19D8D0"} opacity="0">
              <animateMotion dur={`${on ? 2.6 : 4.8 + i * 0.35}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.8;1" dur={`${on ? 2.6 : 4.8 + i * 0.35}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" />
            </circle>
          )}
        </g>
      );
    })}
    <ellipse cx={C[0]} cy={C[1] + 10} rx="84" ry="24" fill="url(#eco-metal)" opacity="0.8" />
    <ellipse cx={C[0]} cy={C[1] + 3} rx="84" ry="22" fill="#0B2229" stroke="url(#eco-edge)" />
    <ellipse cx={C[0]} cy={C[1] + 3} rx="58" ry="14" fill="none" stroke="rgba(25,216,208,0.35)" />
  </svg>
);

const Module = ({ it, i, on, select, reduce }) => {
  const Icon = it.icon;
  return (
    <div className="absolute z-10 w-[27%] -translate-x-1/2 -translate-y-1/2" style={pct(CARDS[i])}>
      <motion.div initial={reduce ? false : { opacity: 0, y: 14, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.9, delay: 0.25 + i * 0.1, ease }}>
        <motion.button
          type="button"
          onMouseEnter={() => select(i)}
          onFocus={() => select(i)}
          onClick={() => select(i)}
          aria-pressed={on}
          aria-label={`${it.name}: ${it.text}`}
          whileHover={reduce ? {} : { y: -4 }}
          animate={{ y: on ? -3 : 0 }}
          transition={{ duration: 0.45, ease }}
          className={`q-focus group relative flex w-full items-center gap-2.5 rounded-lg border px-2 py-2 text-left backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 sm:rounded-xl sm:px-3 sm:py-2.5 ${on ? "border-[#19D8D0]/70 bg-[#0B3A44]/85 shadow-[0_16px_32px_-14px_rgba(25,216,208,0.4)]" : "border-white/12 bg-[#0A2A33]/60 shadow-[0_14px_28px_-16px_rgba(0,0,0,0.9)] hover:border-[#19D8D0]/45"}`}
          data-testid={`ecosystem-node-${it.id}`}
        >
          <span className={`hidden h-8 w-8 shrink-0 place-items-center rounded-md border transition-[border-color,transform] duration-500 group-hover:scale-105 sm:grid ${on ? "border-[#19D8D0]/50 bg-[#19D8D0]/10" : "border-white/10 bg-white/[0.03]"}`}>
            <Icon size={16} className={on ? "text-[#19D8D0]" : "text-[#64BDB7]"} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[10px] tracking-[0.14em] text-slate-400">0{i + 1} · QUZO</span>
            <span className={`block truncate font-display text-[12px] tracking-[0.04em] sm:text-[14px] ${on ? "text-white" : "text-slate-200"}`}>{it.name.replace("QUZO ", "")}</span>
          </span>
          <span className={`absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-[#19D8D0] to-transparent transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export const EcosystemRing = ({ items, active, select, reduce }) => (
  <div className="relative mx-auto aspect-[600/450] w-full max-w-[520px] lg:max-w-[560px]" data-testid="ecosystem-structure">
    <motion.div className="absolute inset-0" initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1.1, ease }}>
      <Platform active={active} reduce={reduce} />
    </motion.div>
    <div className="pointer-events-none absolute z-[5] w-[30%] -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: `${((C[1] - 30) / H) * 100}%` }} aria-hidden="true">
      <div className={reduce ? "" : "q-float"}><QImage sizes="(min-width: 1024px) 170px, 30vw" /></div>
    </div>
    {items.map((it, i) => <Module key={it.id} it={it} i={i} on={active === i} select={select} reduce={reduce} />)}
  </div>
);
