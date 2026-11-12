const WORDS = ["Digital Assets", "Decentralised Finance", "Intelligent Trading", "EVM-Compatible", "AI Intelligence", "Unified Ecosystem"];

const Row = ({ hidden }) => (
  <div className="flex shrink-0 items-center" aria-hidden={hidden ? "true" : undefined}>
    {WORDS.map((w) => (
      <span key={w} className="flex items-center">
        <span className="q-outline-text font-display text-5xl md:text-7xl tracking-tight whitespace-nowrap px-8">{w}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><rect x="4" y="4" width="10" height="10" transform="rotate(45 9 9)" fill="#19D8D0" /></svg>
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <div className="relative overflow-hidden border-y border-white/10 py-8 md:py-10" data-testid="editorial-marquee">
    <div className="q-marquee flex w-max">
      <Row />
      <Row hidden />
    </div>
  </div>
);
