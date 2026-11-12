import { useState } from "react";

export const LAYERS = [
  { name: "Application Layer", text: "Wallet, trading interface, ecosystem dashboard and developer applications." },
  { name: "Integration Layer", text: "Supported exchanges, brokers, liquidity providers and third-party services." },
  { name: "Risk Management Layer", text: "User limits, permissions, exposure controls and execution restrictions." },
  { name: "Data & Oracle Layer", text: "Market data feeds, external information, validation and monitoring." },
  { name: "AI Intelligence Layer", text: "Off-chain market analysis, model processing and strategy evaluation." },
  { name: "Blockchain Layer", text: "EVM-compatible execution, smart contracts and on-chain settlement." },
];

const Plate = ({ y, on, i }) => (
  <g style={{ transform: `translateY(${on ? -10 : 0}px)`, transition: "transform 600ms cubic-bezier(.22,1,.36,1)" }}>
    <polygon points={`40,${y + 8} 150,${y + 48} 150,${y + 58} 40,${y + 18}`} fill={on ? "#0E5A60" : "#06303A"} />
    <polygon points={`150,${y + 48} 260,${y + 8} 260,${y + 18} 150,${y + 58}`} fill={on ? "#0B4A51" : "#04242C"} />
    <polygon points={`150,${y - 32} 260,${y + 8} 150,${y + 48} 40,${y + 8}`} fill={on ? "rgba(25,216,208,0.18)" : "#073A45"} stroke={on ? "#19D8D0" : "rgba(100,189,183,0.35)"} strokeWidth="0.8" />
    <g stroke={on ? "#19D8D0" : "rgba(255,255,255,0.12)"} strokeWidth="0.6">
      <line x1="95" y1={y - 12} x2="205" y2={y + 28} />
      <line x1="205" y1={y - 12} x2="95" y2={y + 28} />
    </g>
    <text x="272" y={y + 12} fontSize="11" fontFamily="JetBrains Mono" fill={on ? "#19D8D0" : "#94A3B8"}>L{6 - i}</text>
  </g>
);

export const LayerStack = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]" data-testid="tech-layer-stack">
      <svg viewBox="0 0 300 380" className="mx-auto w-full max-w-[380px]" role="img" aria-label="Isometric diagram of QUZO's six-layer architecture, from Application Layer at the top to Blockchain Layer at the base">
        {[...LAYERS].reverse().map((l, ri) => {
          const i = LAYERS.length - 1 - ri;
          return <Plate key={l.name} y={52 + i * 54} on={active === i} i={i} />;
        })}
      </svg>
      <ol className="border-t border-white/10">
        {LAYERS.map((l, i) => (
          <li key={l.name}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`q-focus group grid w-full grid-cols-[44px_1fr] gap-3 border-b py-4 text-left transition-colors duration-300 ${active === i ? "border-[#19D8D0]/50" : "border-white/10"}`}
              data-testid={`tech-layer-${i + 1}`}
            >
              <span className={`font-mono text-xs pt-1 ${active === i ? "text-[#19D8D0]" : "text-slate-400"}`}>L{6 - i}</span>
              <span>
                <span className={`block font-display text-lg md:text-xl transition-colors duration-300 ${active === i ? "text-white" : "text-slate-300"}`}>{l.name}</span>
                <span className={`block overflow-hidden text-sm leading-relaxed text-slate-300 transition-[max-height,opacity,margin] duration-500 ${active === i ? "mt-2 max-h-24 opacity-100" : "max-h-0 opacity-0 lg:max-h-0"}`}>{l.text}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
