import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

const spring = { stiffness: 120, damping: 16, mass: 0.6 };

export const CoinTilt = () => {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [0, 1], [-14, 14]);
  const rotateX = useTransform(sy, [0, 1], [12, -12]);
  const shine = useTransform([sx, sy], ([x, y]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.32), transparent 45%)`);
  const shadowX = useTransform(sx, [0, 1], [14, -14]);

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { px.set(0.5); py.set(0.5); };

  return (
    <motion.figure
      onPointerMove={onMove}
      onPointerLeave={reset}
      initial={reduce ? false : { opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_45%,#0A3A44_0%,#052832_55%,#031B23_100%)] [perspective:900px]"
      data-testid="tokenomics-image"
    >
      <motion.span aria-hidden="true" style={{ x: shadowX }} className="absolute bottom-[12%] h-[7%] w-[52%] rounded-[100%] bg-black/60 blur-xl" />
      <motion.div style={{ rotateX, rotateY }} className="relative w-[76%] [transform-style:preserve-3d]" data-testid="tokenomics-coin">
        <img src="/images/token.webp" width="800" height="800" loading="lazy" decoding="async" alt="QUZO coin with a brushed-silver Q on a deep teal face inside a polished metal rim" className="h-full w-full object-contain" />
        <motion.span
          aria-hidden="true"
          style={{ backgroundImage: shine, WebkitMaskImage: "url(/images/token.webp)", maskImage: "url(/images/token.webp)", WebkitMaskSize: "contain", maskSize: "contain" }}
          className="pointer-events-none absolute inset-0 mix-blend-screen"
        />
      </motion.div>
    </motion.figure>
  );
};
