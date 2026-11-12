import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Blocks, BrainCircuit, CandlestickChart, ArrowLeftRight, Wallet, Waves, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHead, Reveal } from "./Reveal";
import { NetworkCanvas } from "./NetworkCanvas";
import { EcosystemRing } from "./EcosystemRing";

const ITEMS = [
  { id: "chain", name: "QUZO CHAIN", icon: Blocks, tag: "Infrastructure", text: "EVM-compatible blockchain infrastructure supporting smart contracts and decentralised applications." },
  { id: "ai", name: "QUZO AI", icon: BrainCircuit, tag: "Intelligence", text: "Market analysis, insights and configurable trading strategies." },
  { id: "trade", name: "QUZO TRADE", icon: CandlestickChart, tag: "Markets", text: "Interface for supported cryptocurrency trading integrations." },
  { id: "wallet", name: "QUZO WALLET", icon: Wallet, tag: "Access", text: "Digital-asset management and ecosystem access." },
  { id: "defi", name: "QUZO DEFI", icon: ArrowLeftRight, tag: "Planned", text: "Planned swaps, liquidity and decentralised financial applications." },
  { id: "liquidity", name: "QUZO LIQUIDITY", icon: Waves, tag: "Planned", text: "Planned liquidity coordination for supported applications." },
];
const ease = [0.22, 1, 0.36, 1];
const navBtn = "q-focus grid h-8 w-8 place-items-center rounded-full border border-white/15 text-slate-200 transition-colors hover:border-[#19D8D0]/60";

const Panel = ({ active, select }) => {
  const it = ITEMS[active];
  const Icon = it.icon;
  const go = (d) => select((active + d + ITEMS.length) % ITEMS.length);
  return (
    <div className="relative mx-auto w-full max-w-[440px] rounded-[20px] border border-white/10 bg-[#04181F]/70 p-6 backdrop-blur-sm md:p-7" data-testid="ecosystem-detail">
      <motion.div key={it.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
        <p className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-slate-400" data-testid="ecosystem-detail-category">
          0{active + 1} / {it.tag}<span className="h-px w-8 bg-[#19D8D0]" />
        </p>
        <h3 className="mt-5 flex items-center gap-3 font-display text-2xl text-white md:text-[32px]" data-testid="ecosystem-detail-title">
          <Icon size={26} className="shrink-0 text-[#19D8D0]" aria-hidden="true" />{it.name}
        </h3>
        <p className="mt-4 min-h-[72px] text-[15px] leading-relaxed text-slate-300" data-testid="ecosystem-detail-text">{it.text}</p>
      </motion.div>
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
        <div className="flex gap-1.5" role="tablist" aria-label="Ecosystem components">
          {ITEMS.map((x, i) => (
            <button key={x.id} type="button" role="tab" aria-selected={active === i} aria-label={x.name} onClick={() => select(i)} className="q-focus py-2" data-testid={`ecosystem-dot-${x.id}`}>
              <span className={`block h-[3px] rounded-full transition-[width,background-color] duration-500 ${active === i ? "w-7 bg-[#19D8D0]" : "w-4 bg-white/20 hover:bg-white/40"}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-1 whitespace-nowrap font-mono text-xs text-slate-400" data-testid="ecosystem-counter">0{active + 1} / 06</span>
          <button type="button" onClick={() => go(-1)} aria-label="Previous component" className={navBtn} data-testid="ecosystem-prev"><ChevronLeft size={15} /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next component" className={navBtn} data-testid="ecosystem-next"><ChevronRight size={15} /></button>
        </div>
      </div>
    </div>
  );
};

export const Ecosystem = () => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  return (
    <section id="ecosystem" tabIndex={-1} className="relative isolate overflow-hidden bg-[linear-gradient(180deg,transparent,rgba(5,40,50,0.4)_16%,rgba(5,40,50,0.4)_84%,transparent)] py-16 outline-none md:py-16" aria-labelledby="ecosystem-heading" data-testid="ecosystem-section">
      <div className="absolute inset-0 -z-10 opacity-40" aria-hidden="true"><NetworkCanvas /></div>
      <div className="q-amb-a absolute left-[8%] top-[30%] -z-10 h-[60%] w-[45%] rounded-full bg-[radial-gradient(closest-side,rgba(25,216,208,0.07),transparent)]" aria-hidden="true" />
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-14">
          <SectionHead id="ecosystem" index="03" label="The QUZO Ecosystem" title="One Ecosystem. Multiple Financial Capabilities." />
          <Reveal delay={0.2}>
            <p className="max-w-[440px] text-base leading-relaxed text-slate-300/90 lg:mx-auto" data-testid="ecosystem-intro">Six connected components share one core: an EVM-compatible foundation with intelligence, markets, wallet access and planned DeFi capabilities around it.</p>
          </Reveal>
        </div>
        <div className="mt-8 grid items-center gap-8 md:mt-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <EcosystemRing items={ITEMS} active={active} select={setActive} reduce={reduce} />
          <Panel active={active} select={setActive} />
        </div>
      </div>
    </section>
  );
};
