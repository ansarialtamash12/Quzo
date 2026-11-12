import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { ALLOC } from "./Donut";

const SPAN = 48;
const TICKS = [0, 6, 12, 18, 24, 36, 48];
const pos = (m) => `${(m / SPAN) * 100}%`;
// Proposed terms from the QUZO whitepaper (months from Token Generation Event)
const VEST = {
  "Ecosystem Growth & Rewards": { tge: 0, cliff: 0, linear: 48, terms: "48-month programme window" },
  "Liquidity & Market Development": { tge: 20, cliff: 0, linear: 12, terms: "20% at launch, 80% over 12 months" },
  "Treasury & Operations": { tge: 0, cliff: 12, linear: 36, terms: "12-month cliff + 36-month linear" },
  "Core Team & Contributors": { tge: 0, cliff: 12, linear: 36, terms: "12-month cliff + 36-month linear" },
  "Strategic Investors": { tge: 0, cliff: 6, linear: 18, terms: "6-month cliff + 18-month linear" },
  "Foundation & Development": { tge: 0, cliff: 12, linear: 36, terms: "12-month cliff + 36-month linear" },
  "Marketing & Partnerships": { tge: 10, cliff: 0, linear: 24, terms: "10% at launch + 90% over 24 months" },
  "Advisors": { tge: 0, cliff: 6, linear: 24, terms: "6-month cliff + 24-month linear" },
};
const HATCH = "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.16)_0_3px,transparent_3px_7px)]";

const STATS = [
  { k: "Maximum supply", v: "8,000,000", u: "QUZO" },
  { k: "Distribution categories", v: "8", u: "allocations" },
  { k: "Ecosystem Growth + Liquidity", v: "40%", u: "3,200,000 QUZO" },
];

export const SupplyStats = () => (
  <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3" data-testid="tokenomics-supply-stats">
    {STATS.map((s) => (
      <div key={s.k} className="bg-[#031B23] p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">{s.k}</p>
        <p className="mt-3 font-display text-3xl text-white">{s.v}</p>
        <p className="mt-1 text-xs text-[#64BDB7]">{s.u}</p>
      </div>
    ))}
  </div>
);

const Bar = ({ a, v, i }) => (
  <span className="relative block h-3 rounded-full bg-white/[0.04]" role="img" aria-label={`${a.name}: ${v.terms}`} data-testid={`vesting-bar-${i + 1}`}>
    {TICKS.slice(1, -1).map((t) => <span key={t} className="absolute inset-y-0 w-px bg-white/[0.06]" style={{ left: pos(t) }} aria-hidden="true" />)}
    {v.cliff > 0 && <span className={`absolute inset-y-0 left-0 rounded-l-full border border-white/10 ${HATCH}`} style={{ width: pos(v.cliff) }} />}
    <motion.span
      className="absolute inset-y-0 origin-left rounded-full"
      style={{ left: pos(v.cliff), width: pos(v.linear), background: `linear-gradient(90deg, ${a.color}cc, ${a.color}55)` }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
    />
    {v.tge > 0 && <span className="absolute -top-1 left-0 h-5 w-1.5 rounded-sm bg-white shadow-[0_0_0_2px_#031B23]" title={`${v.tge}% at launch`} />}
  </span>
);

const Axis = () => (
  <div className="relative hidden h-5 md:block" aria-hidden="true">
    {TICKS.map((t) => (
      <span key={t} className="absolute -translate-x-1/2 font-mono text-[11px] text-slate-400 first:translate-x-0 last:-translate-x-full" style={{ left: pos(t) }}>{t === 0 ? "TGE" : `${t}m`}</span>
    ))}
  </div>
);

const Legend = () => (
  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400" data-testid="vesting-legend">
    <span className="flex items-center gap-2"><span className="h-3.5 w-1.5 rounded-sm bg-white" />Launch allocation</span>
    <span className="flex items-center gap-2"><span className={`h-2.5 w-6 rounded-full border border-white/10 ${HATCH}`} />Cliff</span>
    <span className="flex items-center gap-2"><span className="h-2.5 w-6 rounded-full bg-gradient-to-r from-[#19D8D0]/80 to-[#19D8D0]/30" />Release window</span>
  </div>
);

export const Vesting = () => (
  <Reveal className="mt-20">
    <div className="rounded-[28px] border border-white/10 bg-[#031B23] p-6 md:p-9" data-testid="tokenomics-vesting">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#19D8D0]">Vesting & release</p>
          <h3 className="mt-3 font-display text-2xl md:text-3xl text-white">Release schedule by allocation</h3>
        </div>
        <span className="rounded-full border border-[#19D8D0]/40 bg-[#19D8D0]/10 px-3 py-1 font-mono text-[11px] text-[#9FF3EE]" data-testid="vesting-status">Proposed</span>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-slate-400">Proposed schedule in months from the Token Generation Event (TGE), as set out in the QUZO whitepaper.</p>
      <Legend />
      <div className="mt-8 hidden grid-cols-[12px_1.2fr_1fr_2.2fr] gap-4 md:grid">
        <span className="col-span-3 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">Allocation / proposed terms</span>
        <Axis />
      </div>
      <ul className="mt-3 divide-y divide-white/10 border-y border-white/10">
        {ALLOC.map((a, i) => {
          const v = VEST[a.name];
          return (
            <li key={a.name} className="grid grid-cols-[12px_1fr] items-center gap-x-4 gap-y-2 py-4 md:grid-cols-[12px_1.2fr_1fr_2.2fr]" data-testid={`vesting-row-${i + 1}`}>
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: a.color }} />
              <span>
                <span className="block text-sm text-white">{a.name}</span>
                <span className="block font-mono text-xs text-slate-400">{a.pct}% · {a.amt} QUZO</span>
              </span>
              <span className="col-start-2 text-sm text-slate-300 md:col-start-auto" data-testid={`vesting-terms-${i + 1}`}>{v.terms}</span>
              <span className="col-start-2 md:col-start-auto"><Bar a={a} v={v} i={i} /></span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 font-mono text-[11px] text-slate-400 md:hidden">Timeline: TGE to month 48</p>
      <p className="mt-5 text-xs leading-relaxed text-slate-400" data-testid="vesting-note">Proposed only. Final cliff dates, release intervals, TGE amounts and smart-contract implementation must be confirmed before publication.</p>
    </div>
  </Reveal>
);
