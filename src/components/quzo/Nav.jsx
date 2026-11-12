import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { SmartLink } from "./SmartLink";
import { NAV_LINKS, SITE } from "../../config/site";
import { scrollToId, getLenis } from "../../lib/scroll";
import {Link} from "react-router-dom";
import {ArrowRight} from "lucide-react";

const useActiveSection = () => {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_LINKS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
};

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop(); else lenis?.start();
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id) => { getLenis()?.start(); setOpen(false); scrollToId(id); };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 border-b ${scrolled || open ? "bg-[#031B23]/85 backdrop-blur-xl border-white/10" : "bg-transparent border-transparent"}`}
      data-testid="site-header"
    >
      <nav className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-5 md:px-10" aria-label="Primary">
        <button type="button" onClick={() => go("home")} aria-label="QUZO home" className="q-focus rounded-md" data-testid="nav-logo-button">
          <Logo />
        </button>
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                aria-current={active === id ? "true" : undefined}
                className={`q-focus relative rounded-full px-4 py-2 text-[13px] tracking-wide transition-colors duration-300 ${active === id ? "text-white" : "text-slate-400 hover:text-white"}`}
                data-testid={`nav-${id}-link`}
              >
                {label}
                {active === id && <motion.span layoutId="nav-dot" className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-[#19D8D0]" />}
              </button>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-3">
          <SmartLink href={SITE.whitepaperUrl} label="The QUZO whitepaper" testId="nav-whitepaper-button" className="q-focus q-btn-ghost">
            Whitepaper
          </SmartLink>
        <Link 
  to="/login" 
  className="q-focus q-btn-primary inline-flex items-center gap-2" 
  data-testid="nav-get-started-button"
>
  Get Started <ArrowUpRight size={15} />
</Link>
        </div>
        <button
          type="button"
          className="q-focus lg:hidden grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          data-testid="nav-mobile-toggle"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-[#031B23] px-6 pb-10 pt-6"
            data-testid="mobile-menu"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map(({ id, label }, i) => (
                <motion.li key={id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <button type="button" onClick={() => go(id)} className="q-focus flex w-full items-baseline gap-4 border-b border-white/10 py-4 text-left" data-testid={`mobile-nav-${id}-link`}>
                    <span className="font-mono text-xs text-[#19D8D0]">0{i + 1}</span>
                    <span className="font-display text-3xl text-white">{label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <SmartLink href={SITE.whitepaperUrl} label="The QUZO whitepaper" testId="mobile-whitepaper-button" className="q-focus q-btn-ghost justify-center">
                Whitepaper
              </SmartLink>
              <Link 
                to="/login" 
                className="q-focus q-btn-primary justify-center inline-flex items-center gap-2" 
                data-testid="mobile-get-started-button"
              >
                Get Started <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
