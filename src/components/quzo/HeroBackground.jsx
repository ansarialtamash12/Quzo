import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { NetworkCanvas } from "./NetworkCanvas";

const STREAMS = [
  "M-50 620 C 300 560, 520 700, 820 520 S 1300 380, 1700 440",
  "M-50 260 C 260 300, 480 180, 760 260 S 1200 420, 1700 300",
  "M200 960 C 380 760, 640 720, 900 600 S 1250 330, 1500 -40",
  "M-50 820 C 360 800, 700 880, 1000 760 S 1450 640, 1700 700",
];
const DOTS_H = [
  { row: 3, dur: 19, delay: 0 }, { row: 6, dur: 24, delay: 6 }, { row: 9, dur: 21, delay: 11 }, { row: 11, dur: 27, delay: 3, desk: true },
];
const DOTS_V = [{ col: 8, dur: 18, delay: 4 }, { col: 14, dur: 23, delay: 9, desk: true }, { col: 17, dur: 20, delay: 14, desk: true }];

const usePointerDepth = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 30, damping: 20 });
  const sy = useSpring(my, { stiffness: 30, damping: 20 });
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return undefined;
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);
  const useLayer = (d) => ({ x: useTransform(sx, (v) => v * -d), y: useTransform(sy, (v) => v * -d) });
  return {
    ambient: useLayer(8),
    grid: useLayer(14),
    streams: useLayer(20),
    particles: useLayer(30),
  };
};

export const HeroBackground = () => {
  const { ambient, grid, streams, particles } = usePointerDepth();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true" data-testid="hero-background">
      <motion.div className="absolute -inset-[6%]" style={ambient}>
        <div className="q-amb-a absolute left-[58%] top-[18%] h-[70%] w-[46%] rounded-full bg-[radial-gradient(circle,rgba(25,216,208,0.11),transparent_62%)] max-lg:left-[10%] max-lg:top-[52%] max-lg:w-[80%]" />
        <div className="q-amb-b absolute -left-[8%] top-[-10%] h-[60%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(100,189,183,0.07),transparent_65%)]" />
        <div className="q-amb-c absolute bottom-[-20%] left-[30%] h-[55%] w-[45%] rounded-full bg-[radial-gradient(circle,rgba(160,200,210,0.05),transparent_65%)]" />
      </motion.div>

      <motion.div className="absolute -inset-[4%] [perspective:1400px]" style={grid}>
        <div className="absolute inset-0 origin-top [transform:rotateX(14deg)_scale(1.15)]">
          <div className="q-grid absolute inset-0" />
          {DOTS_H.map((d) => (
            <span key={`h${d.row}`} className={`q-gdot-x absolute left-0 h-[3px] w-[3px] rounded-full bg-[#7FF3EC] ${d.desk ? "hidden lg:block" : ""}`} style={{ top: d.row * 72 - 1.5, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }} />
          ))}
          {DOTS_V.map((d) => (
            <span key={`v${d.col}`} className={`q-gdot-y absolute top-0 h-[3px] w-[3px] rounded-full bg-[#7FF3EC] ${d.desk ? "hidden lg:block" : ""}`} style={{ left: d.col * 72 - 1.5, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }} />
          ))}
        </div>
      </motion.div>

      <motion.svg className="absolute -inset-[4%] h-[108%] w-[108%]" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={streams}>
        {STREAMS.map((d, i) => (
          <g key={d} className={i === 3 ? "hidden lg:inline" : ""}>
            <path d={d} fill="none" stroke="rgba(100,189,183,0.08)" strokeWidth="1" />
            <path d={d} fill="none" stroke="rgba(100,189,183,0.18)" strokeWidth="1" strokeDasharray="2 16" className="q-bgflow" style={{ animationDuration: `${40 + i * 8}s` }} />
            <path d={d} fill="none" stroke="#19D8D0" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="70 2400" className="q-bgpulse" style={{ animationDuration: `${16 + i * 4}s`, animationDelay: `${i * 3.5}s` }} />
          </g>
        ))}
      </motion.svg>

      <motion.div className="absolute -inset-[3%]" style={particles}>
        <NetworkCanvas />
      </motion.div>
    </div>
  );
};
