import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const SectionImage = ({ src, alt, className = "", imgClassName = "", children, testId }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.figure
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-[#052832] ${className}`}
      data-testid={testId}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ y }}
        variants={{ hidden: { scale: 1.3 }, show: { scale: 1.18 } }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#031B23]/90 via-[#031B23]/25 to-transparent" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 origin-right bg-[#031B23]"
        variants={{ hidden: { scaleX: 1 }, show: { scaleX: 0 } }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />
      {children && (
        <motion.figcaption
          className="absolute inset-x-0 bottom-0 p-6 md:p-10"
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.figcaption>
      )}
    </motion.figure>
  );
};
