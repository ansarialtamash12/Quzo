import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 48, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 1, delay, ease }}
  >
    {children}
  </motion.div>
);

const MaskedTitle = ({ text, id }) => (
  <motion.h2
    className="q-h2 mt-6"
    data-testid={`${id}-heading`}
    id={`${id}-heading`}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.15 }}
    transition={{ staggerChildren: 0.06 }}
  >
    {text.split(" ").map((w, i) => (
      <span key={`${w}-${i}`} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.18em] align-bottom">
        <motion.span
          className="inline-block"
          variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
          transition={{ duration: 0.9, ease }}
        >
          {w}&nbsp;
        </motion.span>
      </span>
    ))}
  </motion.h2>
);

export const SectionHead = ({ index, label, title, intro, id }) => (
  <div className="max-w-3xl">
    <Reveal>
      <p className="q-eyebrow" data-testid={`${id}-eyebrow`}>
        <span className="text-[#19D8D0]">{index}</span>
        <motion.span
          className="mx-3 inline-block h-px w-10 origin-left bg-[#19D8D0]/50 align-middle"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease }}
        />
        {label}
      </p>
    </Reveal>
    <MaskedTitle text={title} id={id} />
    {intro && (
      <Reveal delay={0.25}>
        <p className="mt-6 text-base md:text-lg text-slate-300/90 leading-relaxed max-w-2xl">{intro}</p>
      </Reveal>
    )}
  </div>
);
