import { Network, Workflow, BrainCircuit, Layers, ScanEye } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { ConnectVisual } from "./ConnectVisual";
import { motion } from "framer-motion";

const UnifiedBanner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="mt-24 overflow-hidden rounded-[28px] border border-white/10 bg-[#011A20] lg:grid lg:aspect-[2/1] lg:grid-cols-[0.8fr_1.2fr]"
    data-testid="vision-image"
  >
    <div className="flex flex-col justify-center p-6 pb-2 md:p-10 md:pb-4 lg:p-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#19D8D0]">
        From fragmented to unified
        <span className="ml-4 inline-block h-px w-12 bg-[#19D8D0]/60 align-middle" />
      </p>
      <h3 className="mt-5 font-display text-3xl leading-[1.12] text-white md:text-4xl lg:text-[2.4rem]" data-testid="vision-image-headline">
        One ecosystem for blockchain, intelligence and <span className="text-[#19D8D0]">connected finance.</span>
      </h3>
    </div>
    <div className="relative aspect-video lg:aspect-auto lg:h-full">
      <img
        src="/images/vision-unified-800.webp"
        srcSet="/images/vision-unified-800.webp 800w, /images/vision-unified-1400.webp 1095w"
        sizes="(min-width: 1024px) 60vw, 100vw"
        width="1095"
        height="819"
        loading="lazy"
        decoding="async"
        alt="The QUZO Q on a platform at the centre of a connected network linking trading charts, AI, blockchain blocks and digital assets across a global map"
        className="absolute inset-0 h-full w-full object-cover object-center [mask-image:linear-gradient(to_bottom,transparent,#000_15%)] lg:[mask-image:linear-gradient(to_right,transparent,#000_18%)]"
      />
    </div>
  </motion.div>
);

const PROBLEMS = [
  "Fragmented market access.",
  "Complex trading decisions.",
  "Limited intelligent automation.",
  "Disconnected financial infrastructure.",
  "Lack of transparent execution controls.",
];

const OBJECTIVES = [
  { icon: Network, title: "Unified market access", text: "Bring digital assets and supported trading integrations into one connected ecosystem." },
  { icon: BrainCircuit, title: "Intelligent decision support", text: "Provide AI-powered market analysis and insights to simplify complex trading decisions." },
  { icon: Workflow, title: "Configurable automation", text: "Enable user-defined strategies with clear, restricted and revocable permissions." },
  { icon: Layers, title: "Connected infrastructure", text: "Link blockchain, wallet, trading and DeFi applications on a shared EVM-compatible foundation." },
  { icon: ScanEye, title: "Transparent controls", text: "Make execution limits, risk settings and disclosures visible and understandable." },
];

export const Vision = () => (
  <section id="vision" tabIndex={-1} className="relative py-24 md:py-36 outline-none" aria-labelledby="vision-heading">
    <div className="mx-auto max-w-[1320px] px-5 md:px-10">
      <SectionHead id="vision" index="02" label="The Vision & The Problem" title="Building a More Intelligent Financial Ecosystem" />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <Reveal><p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Today’s challenges</p></Reveal>
          <ol className="mt-6" data-testid="vision-problems-list">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p} delay={i * 0.06}>
                <li className="group flex items-baseline gap-6 border-b border-white/10 py-5 transition-colors duration-300 hover:border-[#19D8D0]/40">
                  <span className="font-mono text-xs text-[#19D8D0]/80">0{i + 1}</span>
                  <span className="font-display text-xl md:text-2xl text-slate-200 transition-transform duration-500 group-hover:translate-x-2">{p}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.2}>
            <blockquote className="mt-12 border-l-2 border-[#19D8D0] pl-6 text-lg md:text-xl leading-relaxed text-white" data-testid="vision-statement">
              QUZO aims to bring blockchain infrastructure, AI-powered trading intelligence and connected financial applications closer together through one unified ecosystem.
            </blockquote>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
          <ConnectVisual />
        </Reveal>
      </div>

      <UnifiedBanner />

      <div className="mt-28 flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#19D8D0]">Five objectives</p>
          <h3 className="mt-3 font-display text-2xl md:text-3xl text-white">What QUZO is designed to achieve</h3>
        </Reveal>
        <Reveal delay={0.1}><p className="max-w-sm text-sm text-slate-400">Each objective answers one of the challenges above.</p></Reveal>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" data-testid="vision-objectives">
        {OBJECTIVES.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.07} className={`h-full ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
            <article className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#052832]/50 p-7 transition-[transform,border-color,background-color] duration-500 hover:-translate-y-1 hover:border-[#19D8D0]/40 hover:bg-[#052832]" data-testid={`vision-objective-${i + 1}`}>
              <span className="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-[#19D8D0] transition-transform duration-700 group-hover:scale-x-100" />
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-[#031B23] transition-colors duration-500 group-hover:border-[#19D8D0]/50">
                  <Icon size={22} className="text-[#19D8D0]" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-slate-400">0{i + 1}</span>
              </div>
              <h3 className="mt-auto pt-10 font-display text-lg leading-snug text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
