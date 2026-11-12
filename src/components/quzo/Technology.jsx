import { ShieldCheck, KeyRound, LockKeyhole, Siren, Database, FileText, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { LayerStack } from "./LayerStack";
import { SmartLink } from "./SmartLink";
import { ArchitectureFlow } from "./ArchitectureFlow";
import { SITE } from "../../config/site";

const TRUST = [
  { icon: ShieldCheck, label: "Independent smart-contract audits" },
  { icon: KeyRound, label: "Secure key management" },
  { icon: LockKeyhole, label: "Restricted and revocable AI permissions" },
  { icon: Siren, label: "Monitoring and incident response" },
  { icon: Database, label: "Data-source validation" },
  { icon: FileText, label: "Transparent risk disclosures" },
];

// Update status + evidence only when supporting documentation is published.
const EVIDENCE = [
  { item: "Smart contract audit", field: "Audit provider · Report link", status: "Not Yet Published" },
  { item: "Smart contract addresses", field: "Contract addresses · Explorer links", status: "Not Yet Published" },
  { item: "Multisignature wallets", field: "Signer threshold · Configuration", status: "Not Yet Published" },
  { item: "Key management", field: "Architecture overview", status: "Not Yet Published" },
  { item: "Administrative access", field: "Roles · Access controls", status: "Not Yet Published" },
  { item: "Vulnerability disclosure", field: "Bug bounty programme", status: "Not Yet Published" },
  { item: "Incident response", field: "Monitoring policy", status: "Not Yet Published" },
  { item: "Oracle & market data", field: "Data-source information", status: "Not Yet Published" },
  { item: "AI permissions", field: "Execution safeguards", status: "Not Yet Published" },
  { item: "Privacy & data protection", field: "Privacy policy · Documentation", status: "Not Yet Published" },
];

const STATUS = {
  Implemented: "text-[#19D8D0] border-[#19D8D0]/40 bg-[#19D8D0]/10",
  "In Development": "text-amber-300 border-amber-300/40 bg-amber-300/10",
  "Not Yet Published": "text-slate-300 border-white/20 bg-white/5",
};

const StatusPill = ({ s }) => (
  <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] ${STATUS[s]}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />{s}
  </span>
);

export const Technology = () => (
  <section id="technology" tabIndex={-1} className="relative py-24 md:py-36 outline-none" aria-labelledby="technology-heading">
    <div className="mx-auto max-w-[1320px] px-5 md:px-10">
      <SectionHead id="technology" index="04" label="Technology & Security" title="Technology Built with Security in Mind" intro="A layered architecture separates user applications, integrations, risk controls, data, off-chain intelligence and on-chain settlement." />

      <Reveal className="mt-16"><LayerStack /></Reveal>

      <ArchitectureFlow />

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="h-full rounded-[28px] border border-[#19D8D0]/20 bg-[#052832] p-7 md:p-9" data-testid="security-trust-panel">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#19D8D0]">Security & Trust</p>
            <h3 className="mt-4 font-display text-2xl md:text-3xl text-white">Security principles guiding the build</h3>
            <ul className="mt-8 space-y-1">
              {TRUST.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-4 rounded-xl px-2 py-3 transition-colors duration-300 hover:bg-white/5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10"><Icon size={17} className="text-[#19D8D0]" aria-hidden="true" /></span>
                  <span className="text-sm md:text-base text-slate-200">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full rounded-[28px] border border-white/10 bg-[#031B23] p-7 md:p-9" data-testid="tech-security-table">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Security transparency</p>
                <h3 className="mt-3 font-display text-2xl text-white">Evidence register</h3>
              </div>
              <div className="flex flex-wrap gap-2" aria-label="Status legend">
                {Object.keys(STATUS).map((s) => <StatusPill key={s} s={s} />)}
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400">Items are marked Implemented only when supporting evidence has been published.</p>
            <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {EVIDENCE.map((e, i) => (
                <li key={e.item} className="grid grid-cols-1 gap-2 py-3.5 sm:grid-cols-[1fr_1fr_auto] sm:items-center sm:gap-4" data-testid={`evidence-row-${i + 1}`}>
                  <span className="text-sm text-white">{e.item}</span>
                  <span className="font-mono text-xs text-slate-400">{e.field}</span>
                  <StatusPill s={e.status} />
                </li>
              ))}
            </ul>
            <SmartLink href={SITE.securityDocsUrl} label="Security documentation" testId="view-security-docs-button" className="q-focus q-btn-primary mt-8">
              View Security Documentation <ArrowUpRight size={15} />
            </SmartLink>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
