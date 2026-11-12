export const Logo = ({ testId = "brand-logo" }) => (
  <span className="flex items-center gap-2.5 text-white" data-testid={testId}>
    <img src="/images/quzo-q-96.webp" width="34" height="34" alt="" aria-hidden="true" className="h-[34px] w-[34px] object-contain" />
    <span className="font-display text-[1.35rem] font-semibold tracking-[0.18em]">QUZO</span>
  </span>
);
