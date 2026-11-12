import { motion } from "framer-motion";

const bez = ([p0, p1, p2, p3], t) => {
  const u = 1 - t;
  const x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0];
  const y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1];
  const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
  const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
  const len = Math.hypot(dx, dy) || 1;
  return { x, y, nx: -dy / len, ny: dx / len };
};

export const baseD = (c) => `M${c[0][0]} ${c[0][1]} C${c[1][0]} ${c[1][1]} ${c[2][0]} ${c[2][1]} ${c[3][0]} ${c[3][1]}`;

const line = (c, n, off) => {
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const s = bez(c, t);
    const o = off(i, t);
    return `${(s.x + s.nx * o).toFixed(1)} ${(s.y + s.ny * o).toFixed(1)}`;
  });
  return `M${pts.join(" L")}`;
};

const AMP = [3, -7, 5, -2, 9, -4, 6, -8, 2, -5, 7, -3, 4, -6, 8, -2];
const SILVER = "rgba(214,232,235,0.6)";
const TEAL = "#19D8D0";

const Draw = ({ d, stroke, width = 1, delay, show, reduce, opacity = 1, dash }) => (
  <motion.path
    d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash}
    initial={reduce ? false : { pathLength: 0, opacity: 0 }}
    animate={show ? { pathLength: 1, opacity } : {}}
    transition={{ duration: 2.2, delay, ease: [0.65, 0, 0.35, 1] }}
  />
);

export const StreamArt = ({ s, delay, show, reduce }) => {
  const c = s.curve;
  const p = { delay, show, reduce };
  if (s.id === "markets") {
    return (
      <g>
        <Draw d={line(c, 44, (i, t) => AMP[i % AMP.length] * (1 - t * 0.7))} stroke={SILVER} width={1.2} {...p} />
        <Draw d={baseD(c)} stroke={TEAL} width={0.6} opacity={0.5} dash="1 6" {...p} />
      </g>
    );
  }
  if (s.id === "ai") {
    return (
      <g>
        {[-6, -3, 0, 3, 6].map((k) => (
          <Draw key={k} d={line(c, 40, (i, t) => k * (1 - t * 0.8))} stroke={k === 0 ? TEAL : SILVER} width={k === 0 ? 1 : 0.5} opacity={k === 0 ? 0.9 : 0.45} {...p} />
        ))}
        {[0.18, 0.36, 0.54].map((t) => { const q = bez(c, t); return <circle key={t} cx={q.x} cy={q.y} r="2.2" fill="#E6FFFD" opacity="0.8" />; })}
      </g>
    );
  }
  if (s.id === "venues") {
    const ties = Array.from({ length: 18 }, (_, i) => {
      const t = 0.04 + i * 0.05;
      const q = bez(c, t);
      const w = 8 * (1 - t * 0.6);
      return `M${(q.x + q.nx * w).toFixed(1)} ${(q.y + q.ny * w).toFixed(1)} L${(q.x - q.nx * w).toFixed(1)} ${(q.y - q.ny * w).toFixed(1)}`;
    }).join(" ");
    return (
      <g>
        <Draw d={line(c, 40, (i, t) => 8 * (1 - t * 0.6))} stroke={SILVER} width={1.1} {...p} />
        <Draw d={line(c, 40, (i, t) => -8 * (1 - t * 0.6))} stroke={SILVER} width={1.1} {...p} />
        <Draw d={ties} stroke="rgba(214,232,235,0.3)" width={0.7} {...p} />
      </g>
    );
  }
  if (s.id === "defi") {
    return (
      <g>
        <Draw d={line(c, 60, (i, t) => Math.sin(i * 0.42) * 9 * (1 - t * 0.6))} stroke={SILVER} width={1.1} {...p} />
        <Draw d={line(c, 60, (i, t) => -Math.sin(i * 0.42) * 9 * (1 - t * 0.6))} stroke={TEAL} width={1} opacity={0.75} {...p} />
      </g>
    );
  }
  return (
    <g>
      <Draw d={baseD(c)} stroke="rgba(214,232,235,0.25)" width={10} {...p} />
      <Draw d={baseD(c)} stroke={SILVER} width={0.6} {...p} />
    </g>
  );
};

const HEX = "M0 -5 L4.3 -2.5 L4.3 2.5 L0 5 L-4.3 2.5 L-4.3 -2.5 Z";

export const Particles = ({ s, i, on, dim }) => {
  const d = baseD(s.curve);
  const dur = on ? s.dur * 0.6 : s.dur;
  const op = dim ? 0.25 : 1;
  return [0, 1, 2].map((k) => {
    const begin = `${(k * dur) / 3 + i * 0.4}s`;
    if (s.id === "wallets") {
      return (
        <path key={k} d={HEX} fill="rgba(25,216,208,0.18)" stroke="#CFE9E7" strokeWidth="0.8" opacity={op}>
          <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite" path={d} rotate="auto" />
        </path>
      );
    }
    if (s.id === "markets") {
      return (
        <rect key={k} x="-2" y="-2" width="4" height="4" fill="#E6FFFD" opacity={op}>
          <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite" path={d} rotate="auto" />
        </rect>
      );
    }
    if (s.id === "venues") {
      return (
        <rect key={k} x="-6" y="-1" width="12" height="2" rx="1" fill={TEAL} opacity={op}>
          <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite" path={d} rotate="auto" />
        </rect>
      );
    }
    return (
      <circle key={k} r={on ? 2.6 : 2} fill={k % 2 ? TEAL : "#E6FFFD"} opacity={op}>
        <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite" path={d} />
      </circle>
    );
  });
};
