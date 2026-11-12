import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from "framer-motion";
import { HERO_MODULES } from "./HeroModules";

const ease = [0.22, 1, 0.36, 1];
const streamD = (m) => `M${m.x} ${m.y} C${(m.x + 50) / 2} ${m.y} ${50} ${(m.y + 50) / 2} 50 50`;

export const QImage = ({ sizes, className = "" }) => (
  <img
    src="/images/quzo-gateway-560.webp"
    srcSet="/images/quzo-gateway-560.webp 560w, /images/quzo-gateway-900.webp 900w"
    sizes={sizes}
    width="900"
    height="900"
    decoding="async"
    alt="The QUZO Q symbol in polished chrome with subtle turquoise reflections"
    className={`h-full w-full object-contain ${className}`}
  />
);

const Module = ({ m, i, mx, my, reduce }) => {
  const x = useTransform(mx, (v) => v * m.depth);
  const y = useTransform(my, (v) => v * m.depth);
  const { Art } = m;
  return (
    <motion.div className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ left: `${m.x}%`, top: `${m.y}%`, x, y }} data-testid={`hero-module-${m.id}`}>
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.9 + i * 0.22, ease }}
      >
        <motion.div
          animate={reduce ? {} : { y: [0, -8, 0] }}
          transition={{ duration: m.float, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          className="flex flex-col items-center"
        >
          <div className="grid h-[48px] w-[48px] place-items-center rounded-xl border border-white/10 bg-[#052832]/70 p-1 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md sm:h-[72px] sm:w-[72px] sm:rounded-2xl sm:p-2">
            <Art />
          </div>
          <span className="mt-1.5 block max-w-[78px] text-center font-mono text-[9.5px] uppercase leading-tight tracking-[0.1em] text-slate-300 sm:max-w-none sm:whitespace-nowrap sm:text-[11px]">
            <span className="text-[#19D8D0]">0{i + 1}</span> {m.name}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const QObject = () => {
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const qx = useTransform(sx, (v) => v * 0.5);
  const qy = useTransform(sy, (v) => v * 0.5);
  const rotY = useTransform(sx, [-12, 12], [-8, 8]);
  const rotX = useTransform(sy, [-12, 12], [6, -6]);
  const { scrollY } = useScroll();
  const py = useTransform(scrollY, [0, 800], [0, 110]);
  const isLit = lit || reduce;
  const [parallax] = useState(() => window.innerWidth >= 1024 && !reduce);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 24);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 24);
  };

  return (
    <motion.div
      style={{ y: parallax ? py : 0 }}
      className="relative mx-auto aspect-square w-full max-w-[580px]"
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      data-testid="hero-q-object"
      role="img"
      aria-label="The QUZO chrome Q at the centre, with Blockchain, AI Intelligence, Trading and Digital Assets modules streaming data into it"
    >
      <div className="absolute inset-0 [perspective:1400px]" aria-hidden="true">
        <div className="q-orbit-3d absolute inset-[6%] rounded-full border border-[#64BDB7]/15">
          <span className="absolute left-1/2 -top-1 h-1.5 w-1.5 rounded-full bg-[#19D8D0]" />
        </div>
        <div className="absolute inset-[18%] rounded-full border border-dashed border-white/[0.07]" style={{ transform: "rotateX(72deg) rotateY(14deg)" }} />
      </div>

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {HERO_MODULES.map((m, i) => (
          <g key={m.id}>
            <path d={streamD(m)} fill="none" stroke="rgba(100,189,183,0.12)" strokeWidth="0.25" />
            <motion.path
              d={streamD(m)} fill="none" stroke="#19D8D0" strokeWidth="0.3" strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.75 }}
              transition={{ duration: 1.8, delay: 1.6 + i * 0.3, ease: [0.65, 0, 0.35, 1] }}
              onAnimationComplete={() => { if (i === HERO_MODULES.length - 1) setLit(true); }}
            />
            {isLit && !reduce && [0, 1].map((k) => (
              <circle key={k} r="0.65" fill={k ? "#19D8D0" : "#E6FFFD"}>
                <animateMotion dur={`${4.5 + i * 0.6}s`} begin={`${k * 2.3 + i * 0.5}s`} repeatCount="indefinite" path={streamD(m)} />
              </circle>
            ))}
          </g>
        ))}
      </svg>

      <motion.div
        aria-hidden="true"
        className="absolute inset-[24%] rounded-full bg-[radial-gradient(circle,rgba(25,216,208,0.22),transparent_65%)]"
        initial={false}
        animate={{ opacity: isLit ? [0.65, 1, 0.65] : 0 }}
        transition={isLit && !reduce ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : { duration: 1.5 }}
      />

      <div className="absolute inset-[22%] z-10 [perspective:1200px]">
        <motion.div
          className="relative h-full w-full"
          style={{ x: qx, y: qy, rotateX: rotX, rotateY: rotY }}
          initial={reduce ? false : { opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.4, ease }}
        >
          <div className={`h-full w-full ${reduce ? "" : "q-float"}`}>
            <QImage sizes="(min-width: 1024px) 26vw, 60vw" />
            <div
              aria-hidden="true"
              className={`absolute inset-0 mix-blend-screen transition-opacity duration-1000 ${reduce ? "" : "q-sweep"}`}
              style={{ opacity: isLit ? 1 : 0, WebkitMaskImage: "url(/images/quzo-gateway-560.webp)", maskImage: "url(/images/quzo-gateway-560.webp)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }}
            />
          </div>
        </motion.div>
        <div className="pointer-events-none absolute -bottom-[4%] left-1/2 h-5 w-2/3 -translate-x-1/2 rounded-[100%] bg-black/50 blur-xl" />
      </div>

      {HERO_MODULES.map((m, i) => <Module key={m.id} m={m} i={i} mx={sx} my={sy} reduce={reduce} />)}
    </motion.div>
  );
};
