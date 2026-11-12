import { Logo } from "./Logo";
import { SmartLink } from "./SmartLink";
import { NAV_LINKS, SITE } from "../../config/site";
import { scrollToId } from "../../lib/scroll";

const link = "q-focus text-sm text-slate-300 transition-colors duration-300 hover:text-[#19D8D0] text-left";

export const Footer = () => (
  <footer className="border-t border-white/10 bg-[#021419]" data-testid="site-footer">
    <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-10">
      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Logo testId="footer-logo" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-300">Intelligence Meets Decentralised Finance. An AI-powered blockchain ecosystem connecting digital assets, decentralised finance and intelligent trading.</p>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Navigate</p>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}><button type="button" onClick={() => scrollToId(id)} className={link} data-testid={`footer-${id}-link`}>{label}</button></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Resources</p>
          <ul className="mt-5 space-y-3">
            <li><SmartLink href={SITE.whitepaperUrl} label="The QUZO whitepaper" className={link} testId="footer-whitepaper-link">Whitepaper</SmartLink></li>
            <li><button type="button" onClick={() => scrollToId("contact")} className={link} data-testid="footer-contact-link">Contact Us</button></li>
          </ul>
        </div>
      </div>
      <div className="mt-16 rounded-2xl border border-white/10 p-6" data-testid="footer-disclaimer">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Disclaimer</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          QUZO is a developing blockchain and financial technology ecosystem. Features and integrations described as proposed or planned are subject to development, technical validation and applicable requirements. Digital assets involve risk. AI-generated insights are not financial advice and do not guarantee accuracy or profitability.
        </p>
      </div>
      <p className="mt-8 text-xs text-slate-400">© {new Date().getFullYear()} QUZO. All rights reserved.</p>
    </div>
  </footer>
);
