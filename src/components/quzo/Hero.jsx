import { motion } from "framer-motion";
import { ArrowRight, FileText, Blocks, BrainCircuit, Network } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { QObject } from "./QObject";
import { SmartLink } from "./SmartLink";
import { SITE } from "../../config/site";
import { scrollToId } from "../../lib/scroll";

const LINES = [
  { text: "Intelligence Meets", accent: false },
  { text: "Decentralised", accent: true },
  { text: "Finance.", accent: true },
];

const CAPS = [
  { icon: Blocks, label: "EVM-Compatible Infrastructure" },
  { icon: BrainCircuit, label: "AI-Powered Intelligence" },
  { icon: Network, label: "Multi-Market Connectivity" },
];

const ease = [0.22, 1, 0.36, 1];

export const Hero = () => {
  const fade = (d) => ({ initial: { opacity: 0, y: 24, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 1, delay: d, ease } });

  return (
    <section id="home" tabIndex={-1} className="relative isolate min-h-[100svh] overflow-hidden pt-[72px] outline-none" aria-labelledby="hero-title">
      <HeroBackground />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-[#031B23]" />

      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 pb-16 pt-10 md:px-10 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1.1fr_0.9fr] lg:pb-10 lg:pt-0">
        <div>
          <motion.p {...fade(0.1)} className="q-eyebrow" data-testid="hero-eyebrow">
            <span className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-[#19D8D0] align-middle" />
            AI · Blockchain · Multi-Market
          </motion.p>
          <h1 id="hero-title" className="mt-7 font-display text-[2.7rem] leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-[5.4rem]" data-testid="hero-headline">
            {LINES.map((l, i) => (
              <span key={l.text} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "100%", opacity: 0, color: "#F1F5F9" }}
                  animate={{ y: "0%", opacity: 1, color: l.accent ? "#19D8D0" : "#FFFFFF" }}
                  transition={{
                    y: { duration: 1.2, delay: l.accent ? 0.95 + (i - 1) * 0.15 : 0.25, ease },
                    opacity: { duration: 1.2, delay: l.accent ? 0.95 + (i - 1) * 0.15 : 0.25, ease },
                    color: { duration: 1.8, delay: l.accent ? 1.45 + (i - 1) * 0.15 : 0, ease: "easeInOut" },
                  }}
                >
                  {l.text}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p {...fade(0.7)} className="mt-7 max-w-xl text-base text-slate-300 md:text-lg leading-relaxed" data-testid="hero-description">
            An AI-powered blockchain ecosystem connecting digital assets, decentralised finance and intelligent trading.
          </motion.p>
          <motion.div {...fade(0.85)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => scrollToId("ecosystem")} className="q-focus q-btn-primary justify-center" data-testid="hero-explore-button">
              Explore the QUZO Ecosystem <ArrowRight size={16} />
            </button>
            <SmartLink href={SITE.whitepaperUrl} label="The QUZO whitepaper" testId="hero-whitepaper-button" className="q-focus q-btn-ghost justify-center">
              <FileText size={16} /> Read the Whitepaper
            </SmartLink>
          </motion.div>
          <motion.ul {...fade(1)} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3" data-testid="hero-capabilities">
            {CAPS.map(({ icon: Icon, label }) => (
              <li key={label} className="group flex items-center gap-3 bg-[#031B23]/90 px-4 py-4 transition-colors duration-300 hover:bg-[#052832]">
                <Icon size={18} className="shrink-0 text-[#19D8D0]" aria-hidden="true" />
                <span className="text-[13px] leading-snug text-slate-200">{label}</span>
              </li>
            ))}
          </motion.ul>
        </div>
        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[460px] lg:max-w-none">
          <QObject />
        </div>
      </div>
    </section>
  );
};
