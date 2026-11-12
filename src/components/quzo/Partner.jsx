import { useRef, useState } from "react";
import { ArrowUpRight, Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";

const API = process.env.REACT_APP_BACKEND_URL;
const TYPES = ["Partnership", "Developer", "Technology provider", "Financial infrastructure", "General enquiry"];
const EMAIL_RE = /^[^@\s<>]{1,64}@[^@\s<>]{1,190}\.[A-Za-z]{2,24}$/;
const EMPTY = { name: "", email: "", organisation: "", enquiry_type: "Partnership", message: "", website: "" };

const validate = (f) => {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.message.trim().length < 10) e.message = "Please write at least 10 characters.";
  return e;
};

const field = "q-focus w-full rounded-xl border bg-[#031B23] px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors duration-300 focus:border-[#19D8D0]";
const Err = ({ id, msg }) => (msg ? <span id={id} className="mt-1.5 block text-xs text-rose-300" role="alert">{msg}</span> : null);

const Success = ({ onReset }) => (
  <div className="flex min-h-[420px] flex-col items-start justify-center rounded-[28px] border border-[#19D8D0]/30 bg-[#052832]/70 p-8" role="status" data-testid="contact-success">
    <CheckCircle2 size={36} className="text-[#19D8D0]" />
    <h3 className="mt-6 font-display text-3xl text-white">Thank you — enquiry received.</h3>
    <p className="mt-3 max-w-md text-slate-300">Your message has been securely submitted to the QUZO team. We’ll respond to the email address you provided.</p>
    <button type="button" onClick={onReset} className="q-focus q-btn-ghost mt-8" data-testid="contact-send-another">Send another enquiry</button>
  </div>
);

export const Partner = () => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle");
  const [serverError, setServerError] = useState("");
  const nameRef = useRef(null);
  const startedAt = useRef(Date.now());
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const pick = (type) => {
    setState("idle");
    setForm((f) => ({ ...f, enquiry_type: type }));
    setTimeout(() => nameRef.current?.focus(), 50);
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    setServerError("");
    if (Object.keys(errs).length) return;
    setState("submitting");
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, elapsed_ms: Date.now() - startedAt.current }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const detail = typeof data?.detail === "string" ? data.detail : "Please check your details and try again.";
        throw new Error(res.status === 429 ? "Too many enquiries from your connection. Please try again later." : detail);
      }
      setState("success");
      setForm(EMPTY);
    } catch (err) {
      setState("error");
      setServerError(err?.message && err.message !== "Failed to fetch" ? err.message : "We couldn’t send your enquiry. Please check your connection and try again.");
    }
  };

  const reset = () => { startedAt.current = Date.now(); setState("idle"); };
  const border = (k) => (errors[k] ? "border-rose-400/60" : "border-white/15");

  return (
    <section id="contact" tabIndex={-1} className="relative overflow-hidden border-t border-white/10 py-24 md:py-36 outline-none" aria-labelledby="contact-heading">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal><p className="q-eyebrow">Partnerships</p></Reveal>
          <Reveal delay={0.08}>
            <h2 id="contact-heading" className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="contact-heading">
              Build the Future of <span className="text-[#19D8D0]">Intelligent Finance</span> with QUZO.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-slate-300">
              We welcome developers, technology providers, financial infrastructure partners and ecosystem contributors to explore opportunities with QUZO.
            </p>
          </Reveal>
          <Reveal delay={0.22} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => pick("Partnership")} className="q-focus q-btn-primary justify-center" data-testid="become-partner-button">
              Become a Partner <ArrowUpRight size={15} />
            </button>
            <button type="button" onClick={() => pick("General enquiry")} className="q-focus q-btn-ghost justify-center" data-testid="contact-quzo-button">
              <Mail size={15} /> Contact QUZO
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {state === "success" ? <Success onReset={reset} /> : (
            <form onSubmit={submit} noValidate className="relative rounded-[28px] border border-white/10 bg-[#052832]/70 p-6 md:p-8" data-testid="partnership-enquiry-form" aria-describedby="contact-privacy">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs text-slate-300">Your name *
                  <input ref={nameRef} maxLength={80} autoComplete="name" value={form.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby="err-name" className={`${field} ${border("name")} mt-2`} placeholder="Full name" data-testid="partner-name-input" />
                  <Err id="err-name" msg={errors.name} />
                </label>
                <label className="block text-xs text-slate-300">Work email *
                  <input type="email" maxLength={254} autoComplete="email" value={form.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby="err-email" className={`${field} ${border("email")} mt-2`} placeholder="name@company.com" data-testid="partner-email-input" />
                  <Err id="err-email" msg={errors.email} />
                </label>
              </div>
              <label className="mt-4 block text-xs text-slate-300">Organisation
                <input maxLength={120} autoComplete="organization" value={form.organisation} onChange={set("organisation")} className={`${field} border-white/15 mt-2`} placeholder="Optional" data-testid="partner-org-input" />
              </label>
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} name="website" /></label>
              </div>
              <fieldset className="mt-5">
                <legend className="text-xs text-slate-300">Enquiry type</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TYPES.map((t) => (
                    <button key={t} type="button" onClick={() => setForm((f) => ({ ...f, enquiry_type: t }))} aria-pressed={form.enquiry_type === t}
                      className={`q-focus rounded-full border px-3 py-1.5 text-xs transition-colors duration-300 ${form.enquiry_type === t ? "border-[#19D8D0] bg-[#19D8D0]/15 text-white" : "border-white/15 text-slate-300 hover:border-white/30"}`}
                      data-testid={`partner-type-${t.toLowerCase().replace(/\s+/g, "-")}`}>{t}</button>
                  ))}
                </div>
              </fieldset>
              <label className="mt-5 block text-xs text-slate-300">Message *
                <textarea rows={5} maxLength={1500} value={form.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby="err-message" className={`${field} ${border("message")} mt-2 resize-none`} placeholder="Tell us briefly how you would like to collaborate." data-testid="partner-message-input" />
                <span className="mt-1 flex justify-between text-[11px] text-slate-400"><Err id="err-message" msg={errors.message} /><span className="ml-auto">{form.message.length}/1500</span></span>
              </label>
              {state === "error" && (
                <p className="mt-4 flex items-start gap-2 rounded-xl border border-rose-400/40 bg-rose-400/10 p-3 text-sm text-rose-200" role="alert" data-testid="contact-error">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" /> {serverError}
                </p>
              )}
              <p id="contact-privacy" className="mt-4 text-xs text-slate-400">Your enquiry is sent securely to the QUZO team. Please don’t include passwords, private keys, seed phrases or financial details.</p>
              <button type="submit" disabled={state === "submitting"} className="q-focus q-btn-primary mt-6 w-full justify-center disabled:opacity-60" data-testid="partnership-submit-button">
                {state === "submitting" ? <><Loader2 size={15} className="animate-spin" /> Sending…</> : <>Send enquiry <ArrowUpRight size={15} /></>}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};
