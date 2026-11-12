import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { SectionImage } from "./SectionImage";

const PHASES = [
  { name: "Foundation", items: ["Finalise brand and architecture.", "Confirm token design and tokenomics.", "Research blockchain architecture.", "Define AI requirements.", "Establish security and compliance requirements."] },
  { name: "Development", items: ["Develop EVM-compatible infrastructure.", "Build wallet and interfaces.", "Develop AI prototypes.", "Establish data and oracle integrations.", "Begin internal testing."] },
  { name: "Testing & Integrations", items: ["Controlled testnet when ready.", "Test contracts and network.", "Integrate crypto data sources.", "Explore authorised trading partners.", "Security assessments and audits."] },
  { name: "Ecosystem Launch", items: ["Prepare mainnet readiness.", "Release supported wallet and apps.", "Introduce eligible token utility.", "Expand developer and partner participation.", "Adoption programmes."] },
  { name: "Global Expansion", items: ["Expand trading integrations.", "Grow developer ecosystem.", "Introduce DeFi applications.", "Explore fintech partnerships.", "Develop governance participation."] },
];

export const Roadmap = () => {
  const [active, setActive] = useState(0);
  const p = PHASES[active];
  return (
    <section id="roadmap" tabIndex={-1} className="relative py-24 md:py-36 outline-none" aria-labelledby="roadmap-heading">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <SectionHead id="roadmap" index="06" label="Roadmap & Global Ecosystem" title="From Infrastructure Design to Ecosystem Expansion" intro="Five proposed development phases. These are planned stages, not completed milestones, and carry no fixed dates." />

        <Reveal className="mt-10 flex flex-wrap items-center gap-2 font-mono text-[11px]" >
          <span className="text-slate-400 mr-2">Status:</span>
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-slate-400" data-testid="roadmap-legend-completed">Completed · 0</span>
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-slate-400">In progress · 0</span>
          <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-2.5 py-1 text-amber-200">Proposed · 5</span>
        </Reveal>

        <Reveal className="mt-10">
          <div className="relative" role="tablist" aria-label="Roadmap phases">
            <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-white/10 lg:block" aria-hidden="true">
              <motion.div className="h-px bg-[#19D8D0]" animate={{ width: `${(active / 4) * 100}%` }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
            </div>
            <div className="grid gap-2 lg:grid-cols-5 lg:gap-6">
              {PHASES.map((ph, i) => {
                const on = active === i;
                return (
                  <button
                    key={ph.name}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="roadmap-panel"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`q-focus group relative flex items-center gap-4 rounded-2xl border p-3 text-left transition-colors duration-300 lg:flex-col lg:items-start lg:border-0 lg:p-0 ${on ? "border-[#19D8D0]/40 bg-[#052832] lg:bg-transparent" : "border-white/10"}`}
                    data-testid={`roadmap-phase-${i + 1}-card`}
                  >
                    <span className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border font-mono text-xs transition-colors duration-300 ${on ? "border-[#19D8D0] bg-[#19D8D0] text-[#031B23]" : i < active ? "border-[#19D8D0]/60 bg-[#031B23] text-[#19D8D0]" : "border-white/20 bg-[#031B23] text-slate-300"}`}>0{i + 1}</span>
                    <span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">Phase 0{i + 1} · <span className="text-amber-200/80">Proposed</span></span>
                      <span className={`mt-1 block font-display text-lg uppercase tracking-wide transition-colors duration-300 ${on ? "text-white" : "text-slate-300 group-hover:text-white"}`}>{ph.name}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div id="roadmap-panel" role="tabpanel" className="mt-10 grid overflow-hidden rounded-[28px] border border-white/10 bg-[#052832]/60 lg:grid-cols-[0.8fr_1.2fr]" data-testid="roadmap-detail">
          <motion.div key={`h-${active}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative border-b border-white/10 p-8 md:p-10 lg:border-b-0 lg:border-r">
            <span className="font-display text-[7rem] md:text-[9rem] leading-none text-white/[0.06]">0{active + 1}</span>
            <h3 className="mt-2 font-display text-3xl md:text-4xl text-white">{p.name}</h3>
            <span className="mt-5 inline-flex rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 font-mono text-[11px] text-amber-200">Proposed phase</span>
          </motion.div>
          <ul className="p-8 md:p-10">
            {p.items.map((it, i) => (
              <motion.li key={`${active}-${it}`} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: i * 0.05 }} className="flex items-start gap-4 border-b border-white/10 py-4 last:border-0">
                <Check size={16} className="mt-1 shrink-0 text-[#19D8D0]" aria-hidden="true" />
                <span className="text-base text-slate-200">{it}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <SectionImage src="/images/roadmap.webp" alt="Earth at night seen from space, representing global ecosystem expansion" className="mt-6 h-[300px] md:h-[440px]" testId="roadmap-image">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#19D8D0]">Global ecosystem · proposed</p>
          <p className="mt-3 max-w-xl font-display text-2xl md:text-4xl text-white">Designed to grow with developers and partners worldwide.</p>
        </SectionImage>
      </div>
    </section>
  );
};
