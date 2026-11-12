import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { StreamArt, Particles, baseD } from "./GatewayStreams";

const STREAMS = [
  { id: "markets", name: "Crypto Markets", tag: "Price & liquidity data", text: "Market data and access for supported digital assets, brought into one consistent view.", curve: [[0, 120], [200, 110], [380, 250], [582, 372]], dur: 7, drift: 6, lx: 2, ly: 10 },
  { id: "ai", name: "AI Intelligence", tag: "Off-chain analysis", text: "Off-chain analysis and configurable strategies, with outputs passing through permission controls.", curve: [[330, 0], [360, 140], [470, 250], [598, 350]], dur: 8, drift: -5, lx: 37, ly: 4 },
  { id: "venues", name: "Trading Venues", tag: "Controlled routing", text: "Connections to supported trading venues through a single, controlled interface.", curve: [[0, 410], [180, 390], [380, 425], [570, 405]], dur: 9, drift: 4, lx: 2, ly: 43 },
  { id: "defi", name: "DeFi Applications", tag: "Swaps & liquidity", text: "Planned swaps, liquidity and decentralised applications on EVM-compatible infrastructure.", curve: [[0, 650], [200, 650], [380, 490], [585, 438]], dur: 8.5, drift: -6, lx: 2, ly: 72 },
  { id: "wallets", name: "Digital Wallets", tag: "Secure access", text: "Digital-asset management and secure access to QUZO ecosystem applications.", curve: [[130, 840], [230, 700], [420, 520], [602, 460]], dur: 10, drift: 5, lx: 20, ly: 94 },
];
const EXIT = "M590 402 C625 470 665 545 735 595 S870 700 1000 770";
const CORE = { name: "The QUZO Intelligence Gateway", text: "Five independent financial technologies pass through one intelligent infrastructure and leave as a single, unified flow." };
const ease = [0.22, 1, 0.36, 1];

const useParallax = (reduce) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const back = { x: useTransform(sx, (v) => v * 0.4), y: useTransform(sy, (v) => v * 0.4) };
  const mid = { x: useTransform(sx, (v) => v * 0.8), y: useTransform(sy, (v) => v * 0.8) };
  const front = { x: useTransform(sx, (v) => v * 1.3), y: useTransform(sy, (v) => v * 1.3) };
  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  const reset = () => { mx.set(0); my.set(0); };
  return { back, mid, front, onMove, reset };
};

export const ConnectVisual = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);
  const [live, setLive] = useState(false);
  const show = inView || reduce;
  const isLive = live || reduce;
  const { back, mid, front, onMove, reset } = useParallax(reduce);
  const s = active === null ? null : STREAMS[active];

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#04181F]" data-testid="vision-connect-visual">
      <div className="relative z-10 flex items-center justify-between px-5 pt-5 md:px-7 md:pt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">The QUZO intelligence gateway</p>
        <span className={`hidden font-mono text-[11px] transition-colors duration-700 sm:inline ${isLive ? "text-[#19D8D0]" : "text-slate-500"}`}>{isLive ? "5 streams · 1 flow" : "Initialising"}</span>
      </div>

      <div
        ref={ref}
        className="relative aspect-[1024/860] w-full"
        onMouseMove={onMove}
        onMouseLeave={() => { reset(); setActive(null); }}
      >
        <motion.div
          className={`absolute inset-0 ${reduce ? "" : "q-camera"}`}
          initial={reduce ? false : { opacity: 0, scale: 1.08, filter: "blur(12px)" }}
          animate={show ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 2.2, ease }}
        >
          <motion.div className="absolute inset-0" style={back}>
            <div className="absolute left-[45%] top-[20%] h-[56%] w-[30%] rounded-full bg-[radial-gradient(ellipse,rgba(25,216,208,0.10),transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(100,189,183,0.05)_45%,transparent_60%)]" />
          </motion.div>

          <motion.svg viewBox="0 0 1000 840" className="absolute inset-0 h-full w-full" style={mid} aria-hidden="true">
            {STREAMS.map((st, i) => {
              const dim = active !== null && active !== i;
              return (
                <motion.g
                  key={st.id}
                  animate={reduce ? {} : { y: [0, st.drift, 0] }}
                  transition={{ duration: 9 + i * 1.3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ opacity: dim ? 0.22 : 1, transition: "opacity 700ms" }}
                >
                  <StreamArt s={st} delay={0.9 + i * 0.28} show={show} reduce={reduce} />
                  {isLive && !reduce && <Particles s={st} i={i} on={active === i} dim={dim} />}
                </motion.g>
              );
            })}
          </motion.svg>

          <motion.div
            className="absolute left-[21.3%] top-[3.9%] h-[89.6%] w-[75.3%]"
            style={mid}
            initial={reduce ? false : { y: 40, opacity: 0 }}
            animate={show ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 2.4, delay: 0.3, ease }}
          >
            <img
              src="/images/quzo-gateway-560.webp"
              srcSet="/images/quzo-gateway-560.webp 560w, /images/quzo-gateway-900.webp 900w"
              sizes="(min-width: 1024px) 30vw, 65vw"
              width="900"
              height="900"
              loading="lazy"
              decoding="async"
              alt="The QUZO Q symbol rendered in polished chrome with rounded edges and subtle turquoise reflections, forming the intelligence gateway"
              className="absolute inset-0 h-full w-full object-contain"
            />
            <div
              aria-hidden="true"
              className={`absolute inset-0 mix-blend-screen ${reduce ? "" : "q-sweep"}`}
              style={{ WebkitMaskImage: "url(/images/quzo-gateway-560.webp)", maskImage: "url(/images/quzo-gateway-560.webp)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }}
            />
          </motion.div>

          <motion.svg viewBox="0 0 1000 840" className="absolute inset-0 h-full w-full" style={front} aria-hidden="true">
            <motion.ellipse cx="590" cy="402" rx="78" ry="92" fill="url(#gwCore)" initial={false} animate={{ opacity: isLive ? (active !== null ? 1 : 0.7) : 0 }} transition={{ duration: 1.6 }} />
            <defs>
              <radialGradient id="gwCore"><stop offset="0" stopColor="#19D8D0" stopOpacity="0.22" /><stop offset="1" stopColor="#19D8D0" stopOpacity="0" /></radialGradient>
            </defs>
            <motion.path
              d={EXIT} fill="none" stroke="#19D8D0" strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={show ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: 2.5, ease: [0.65, 0, 0.35, 1] }}
              onAnimationComplete={() => setLive(true)}
              style={{ strokeWidth: active !== null ? 2.4 : 1.6, opacity: 0.9, transition: "stroke-width 600ms" }}
            />
            <path d={EXIT} fill="none" stroke="rgba(230,255,253,0.5)" strokeWidth="0.6" strokeDasharray="2 10" className={reduce ? "" : "q-flow"} />
            {isLive && !reduce && [0, 1, 2, 3].map((k) => (
              <circle key={k} r="2.4" fill="#E6FFFD">
                <animateMotion dur="5s" begin={`${k * 1.25}s`} repeatCount="indefinite" path={EXIT} />
              </circle>
            ))}
            {STREAMS.map((st, i) => (
              <path
                key={`hit-${st.id}`}
                d={baseD(st.curve)}
                fill="none" stroke="transparent" strokeWidth="34" style={{ pointerEvents: "stroke", cursor: "pointer" }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              />
            ))}
          </motion.svg>
        </motion.div>

        {STREAMS.map((st, i) => {
          const on = active === i;
          return (
            <motion.button
              key={`lbl-${st.id}`}
              type="button"
              initial={reduce ? false : { opacity: 0, x: -10 }}
              animate={show ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 1.4 + i * 0.2, ease }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`q-focus absolute z-10 flex -translate-y-1/2 items-baseline gap-1.5 whitespace-nowrap rounded-md border-l-2 py-1 pl-2 pr-2.5 text-left backdrop-blur-sm transition-colors duration-500 ${on ? "border-[#19D8D0] bg-[#0A2E38]/85" : "border-white/25 bg-[#04181F]/60 hover:border-white/50"}`}
              style={{ left: `${st.lx}%`, top: `${st.ly}%` }}
              data-testid={`vision-module-${st.id}`}
            >
              <span className={`font-mono text-[9.5px] sm:text-[10.5px] ${on ? "text-[#19D8D0]" : "text-slate-400"}`}>0{i + 1}</span>
              <span className={`font-display text-[11px] sm:text-[13px] ${on ? "text-white" : "text-slate-200"}`}>{st.name}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="min-h-[124px] border-t border-white/10 px-5 py-5 md:px-7" aria-live="polite" data-testid="vision-module-detail">
        <motion.div key={s ? s.id : "core"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#19D8D0]">{s ? `Stream 0${active + 1} · ${s.tag}` : "Hover or tap a stream"}</p>
          <p className="mt-2 font-display text-lg text-white">{s ? s.name : CORE.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">{s ? s.text : CORE.text}</p>
        </motion.div>
      </div>
    </div>
  );
};
