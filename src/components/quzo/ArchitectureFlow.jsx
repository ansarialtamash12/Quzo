import { Wallet, ShieldCheck, FileCode2, Blocks, ScanEye, BrainCircuit, Database, ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

// Statuses change only when implementation evidence is published.
const FLOW = [
  { icon: Wallet, title: "Wallet & dApp connectivity", text: "User wallets and decentralised applications connect to the network." },
  { icon: ShieldCheck, title: "Security & permission controls", text: "Limits, permissions and revocable AI execution rights checked before any action." },
  { icon: FileCode2, title: "Smart contract execution", text: "Business logic runs in audited, EVM-compatible smart contracts." },
  { icon: Blocks, title: "EVM-compatible blockchain", text: "Consensus, block production and on-chain settlement." },
  { icon: ScanEye, title: "On-chain transparency", text: "Transactions are publicly verifiable through a block explorer." },
];
const OFFCHAIN = [
  { icon: BrainCircuit, title: "AI intelligence layer", text: "Off-chain market analysis and strategy evaluation; outputs pass through permission controls.", row: "lg:row-start-2" },
  { icon: Database, title: "Data & oracle integrations", text: "Validated market data feeds supplied to smart contracts.", row: "lg:row-start-3" },
];

const ROWS = ["lg:row-start-1", "lg:row-start-2", "lg:row-start-3", "lg:row-start-4", "lg:row-start-5"];

const Pill = () => (
  <span className="whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-2 py-0.5 font-mono text-[10.5px] text-slate-300">Planned</span>
);

const Node = ({ icon: Icon, title, text, accent, testId }) => (
  <div className={`group flex h-full items-start gap-4 rounded-2xl border bg-[#031B23] p-4 transition-colors duration-300 hover:border-[#19D8D0]/50 ${accent ? "border-[#64BDB7]/30" : "border-white/10"}`} data-testid={testId}>
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-[#052832]"><Icon size={18} className="text-[#19D8D0]" aria-hidden="true" /></span>
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-display text-base text-white">{title}</h4>
        <Pill />
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{text}</p>
    </div>
  </div>
);

export const ArchitectureFlow = () => (
  <Reveal className="mt-24">
    <div className="rounded-[28px] border border-white/10 bg-[#052832]/50 p-6 md:p-10" data-testid="architecture-flow">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#19D8D0]">Reference architecture</p>
          <h3 className="mt-3 font-display text-2xl md:text-3xl text-white">How a request moves through QUZO</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10.5px]" aria-label="Capability status legend">
          <span className="rounded-full border border-[#19D8D0]/40 bg-[#19D8D0]/10 px-2 py-0.5 text-[#19D8D0]">Implemented</span>
          <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-2 py-0.5 text-amber-200">In Development</span>
          <span className="rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-slate-300">Planned</span>
        </div>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-slate-400">All components are shown as planned. A status changes only when implementation evidence is published.</p>

      <div className="mt-10 grid gap-3 lg:grid-cols-[1fr_72px_1.25fr] lg:grid-rows-5 lg:gap-x-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 lg:col-start-1 lg:row-start-1 lg:self-end lg:pb-3">Off-chain</p>
        {OFFCHAIN.map((n, i) => (
          <div key={n.title} className={`lg:col-start-1 ${n.row}`}>
            <Node {...n} accent testId={`arch-offchain-${i + 1}`} />
          </div>
        ))}
        {OFFCHAIN.map((n) => (
          <div key={`c-${n.title}`} className={`hidden lg:col-start-2 ${n.row} lg:flex items-center px-2`} aria-hidden="true">
            <span className="h-px flex-1 border-t border-dashed border-[#19D8D0]/50" />
            <ArrowRight size={14} className="text-[#19D8D0]" />
          </div>
        ))}
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 lg:hidden">On-chain flow</p>
        {FLOW.map((n, i) => (
          <div key={n.title} className={`relative lg:col-start-3 ${ROWS[i]}`}>
            <Node {...n} testId={`arch-flow-${i + 1}`} />
            {i < FLOW.length - 1 && <ArrowDown size={14} className="absolute -bottom-[11px] left-9 z-10 text-[#19D8D0]" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  </Reveal>
);
