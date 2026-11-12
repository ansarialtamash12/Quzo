import { useState } from "react";
import { motion } from "framer-motion";

export const ALLOC = [
  { name: "Ecosystem Growth & Rewards", pct: 25, amt: "2,000,000", color: "#19D8D0" },
  { name: "Liquidity & Market Development", pct: 15, amt: "1,200,000", color: "#64BDB7" },
  { name: "Treasury & Operations", pct: 15, amt: "1,200,000", color: "#B6E8E4" },
  { name: "Core Team & Contributors", pct: 12, amt: "960,000", color: "#2B8F95" },
  { name: "Strategic Investors", pct: 10, amt: "800,000", color: "#D7E1E6" },
  { name: "Foundation & Development", pct: 10, amt: "800,000", color: "#3FA9C9" },
  { name: "Marketing & Partnerships", pct: 8, amt: "640,000", color: "#8FA9B3" },
  { name: "Advisors", pct: 5, amt: "400,000", color: "#1D6470" },
];

const R = 80;
const C = 2 * Math.PI * R;
const GAP = 3;

export const Donut = () => {
  const [hover, setHover] = useState(null);
  let acc = 0;
  const cur = hover !== null ? ALLOC[hover] : null;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
      <div className="relative mx-auto aspect-square w-full max-w-[440px]" data-testid="tokenomics-donut-chart">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" role="img" aria-label="Token allocation donut chart, maximum supply 8,000,000 QUZO">
          <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="18" />
          {ALLOC.map((a, i) => {
            const len = (a.pct / 100) * C;
            const off = acc;
            acc += len;
            const on = hover === i;
            return (
              <motion.circle
                key={a.name}
                cx="100" cy="100" r={R} fill="none"
                stroke={a.color}
                strokeWidth={on ? 22 : 16}
                strokeDashoffset={-off}
                initial={{ strokeDasharray: `0 ${C}` }}
                whileInView={{ strokeDasharray: `${len - GAP} ${C}` }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                style={{ opacity: hover === null || on ? 1 : 0.35, transition: "opacity 300ms, stroke-width 300ms", cursor: "pointer" }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                data-testid={`donut-segment-${i + 1}`}
              />
            );
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center" aria-live="polite">
          <div className="max-w-[58%]">
            {cur ? (
              <>
                <p className="font-display text-5xl text-white">{cur.pct}%</p>
                <p className="mt-2 font-mono text-xs text-[#19D8D0]">{cur.amt} QUZO</p>
                <p className="mt-2 text-xs leading-snug text-slate-300">{cur.name}</p>
              </>
            ) : (
              <>
                <p className="font-display text-3xl sm:text-4xl text-white" data-testid="tokenomics-total-supply">8,000,000</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#19D8D0]">QUZO</p>
                <p className="mt-1 text-xs text-slate-400">Maximum supply</p>
              </>
            )}
          </div>
        </div>
      </div>

      <ul className="border-t border-white/10" data-testid="tokenomics-legend">
        {ALLOC.map((a, i) => (
          <li key={a.name}>
            <button
              type="button"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className={`q-focus grid w-full grid-cols-[14px_1fr_auto] items-center gap-4 border-b border-white/10 py-3.5 text-left transition-colors duration-300 ${hover === i ? "bg-white/[0.04]" : ""}`}
              data-testid={`tokenomics-legend-${i + 1}`}
            >
              <span className="h-3 w-3 rounded-sm" style={{ background: a.color }} />
              <span className="text-sm text-slate-200">{a.name}</span>
              <span className="text-right">
                <span className="font-display text-lg text-white">{a.pct}%</span>
                <span className="ml-3 hidden font-mono text-xs text-slate-400 sm:inline">{a.amt}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
