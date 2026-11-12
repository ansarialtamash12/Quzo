import { Activity, BrainCircuit, CandlestickChart, ArrowLeftRight, Code2, Vote } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { Donut } from "./Donut";
import { CoinTilt } from "./CoinTilt";
import { SupplyStats, Vesting } from "./TokenDetails";

const UTIL = [
  { icon: Activity, name: "Network Activity", text: "Potential transaction fees and smart-contract activity." },
  { icon: BrainCircuit, name: "AI Services", text: "Potential utility for supported AI services." },
  { icon: CandlestickChart, name: "Trading Applications", text: "Eligible trading tools and ecosystem services may support QUZO payments." },
  { icon: ArrowLeftRight, name: "DeFi Applications", text: "Potential utility in compatible decentralised finance applications." },
  { icon: Code2, name: "Developer Ecosystem", text: "Grants and ecosystem incentive programmes." },
  { icon: Vote, name: "Governance", text: "Potential participation in selected governance processes." },
];

const UtilityRow = ({ u, i }) => {
  const Icon = u.icon;
  return (
    <Reveal delay={i * 0.05}>
      <div className="group relative flex h-full gap-5 p-6 md:p-8 transition-colors duration-500 hover:bg-[#052832]" data-testid={`utility-${i + 1}`}>
        <span className="font-mono text-xs text-slate-400 pt-1">0{i + 1}</span>
        <div>
          <Icon size={22} className="text-[#19D8D0] transition-transform duration-500 group-hover:-translate-y-1" aria-hidden="true" />
          <h3 className="mt-5 font-display text-xl text-white">{u.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{u.text}</p>
        </div>
      </div>
    </Reveal>
  );
};

export const Tokenomics = () => (
  <section id="tokenomics" tabIndex={-1} className="relative bg-[#052832]/40 py-24 md:py-36 outline-none" aria-labelledby="tokenomics-heading">
    <div className="mx-auto max-w-[1320px] px-5 md:px-10">
      <SectionHead id="tokenomics" index="05" label="QUZO Token Utility & Tokenomics" title="Utility Designed Around Real Ecosystem Activity" intro="The QUZO token is designed around potential participation in ecosystem activity. Utility depends on development progress, technical validation and applicable requirements." />

      <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 lg:grid-cols-[0.8fr_2.2fr]">
        <div className="relative flex flex-col justify-between gap-10 bg-[#031B23] p-8 md:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Token utility</p>
          <CoinTilt />
          <p className="text-sm text-slate-300">Six potential utility areas connect the token to activity across the QUZO ecosystem.</p>
        </div>
        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {UTIL.map((u, i) => <div key={u.name} className="bg-[#031B23]"><UtilityRow u={u} i={i} /></div>)}
        </div>
      </div>

      <Reveal className="mt-24 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#19D8D0]">Token allocation</p>
          <h3 className="mt-3 font-display text-3xl md:text-4xl text-white">8,000,000 QUZO maximum supply</h3>
        </div>
        <p className="max-w-sm text-sm text-slate-400">Hover a segment or legend item to see its share and token amount.</p>
      </Reveal>
      <SupplyStats />
      <Reveal className="mt-12"><Donut /></Reveal>
      <Vesting />
      <p className="mt-10 text-xs text-slate-400">No token price, returns or yield are offered or implied on this page.</p>
    </div>
  </section>
);
