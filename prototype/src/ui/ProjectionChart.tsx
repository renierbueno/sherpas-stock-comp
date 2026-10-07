// Projected net worth with goal markers and vest markers (AC-D-03), and a band where a year's
// vests include performance units (AC-D-04). One series, one axis; colours validated with the
// dataviz palette check (line #4666d7, vests #c2410c). The projection itself is SIMULATED.
import { useState } from 'react';
import { money } from '../model/format';
import type { ProjectionPoint } from '../model/projection';
import type { Goal } from '../model/types';

const W = 720;
const H = 260;
const PAD = { l: 64, r: 16, t: 24, b: 32 };

const short = (n: number) => (n >= 1_000_000 ? `$${+(n / 1_000_000).toFixed(2)}M` : n === 0 ? '$0' : `$${Math.round(n / 1000)}K`);

export function ProjectionChart({ points, goals }: { points: ProjectionPoint[]; goals: Goal[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const top = Math.max(...points.map((p) => p.high ?? p.netWorth)) * 1.05;
  const raw = top / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((v) => v >= raw)!;
  const max = step * Math.ceil(top / step);
  const x = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / (points.length - 1);
  const y = (v: number) => PAD.t + (1 - v / max) * (H - PAD.t - PAD.b);
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p.netWorth)}`).join(' ');
  const band = points.some((p) => p.low !== undefined);
  const bandPath = band
    ? points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p.high ?? p.netWorth)}`).join(' ') + ' ' +
      [...points].reverse().map((p, j) => `L${x(points.length - 1 - j)},${y(p.low ?? p.netWorth)}`).join(' ') + ' Z'
    : '';
  const ticks = Array.from({ length: Math.round(max / step) + 1 }, (_, i) => i * step);
  const hp = hover === null ? null : points[hover];
  const goalsAt = (year: number) => goals.filter((g) => g.year === year);

  return (
    <figure className="chart" aria-label="Projected net worth">
      <figcaption className="row">
        <strong>Projected net worth</strong>
        <span className="legend"><i className="sw line" /> Net worth (SIMULATED projection)</span>
        <span className="legend"><i className="sw vest" /> Year with vests (after tax)</span>
        <span className="legend"><i className="sw goal" /> Goal</span>
        {band && <span className="legend"><i className="sw band" /> Range of performance units</span>}
      </figcaption>
      <div className="chartwrap">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Projected net worth by year, with goals and vests">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} className="grid" />
              <text x={PAD.l - 8} y={y(t) + 4} textAnchor="end" className="tick">{short(t)}</text>
            </g>
          ))}
          {points.map((p, i) => <text key={p.year} x={x(i)} y={H - 10} textAnchor="middle" className="tick">{p.year}</text>)}
          {band && <path d={bandPath} className="band" />}
          <path d={line} className="line" />
          {points.map((p, i) => goalsAt(p.year).map((g, k) => (
            <g key={g.id} transform={`translate(${x(i)},${y(p.netWorth) - 18 - k * 16})`}>
              <rect x={-5} y={-5} width={10} height={10} transform="rotate(45)" className="goal" />
              <text x={9} y={4} className="glabel">{g.name}</text>
            </g>
          )))}
          {points.map((p, i) => p.vestAfterTax > 0 && <circle key={p.year} cx={x(i)} cy={y(p.netWorth)} r={5} className="vest" data-vest-year={p.year} />)}
          {points.map((p, i) => (
            <rect key={`hit${p.year}`} x={x(i) - 18} y={PAD.t} width={36} height={H - PAD.t - PAD.b} fill="transparent"
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
          ))}
          {hp && <line x1={x(hover!)} x2={x(hover!)} y1={PAD.t} y2={H - PAD.b} className="cross" />}
        </svg>
        {hp && (
          <div className="tip" style={{ left: `${(x(hover!) / W) * 100}%` }}>
            <strong>{hp.year}</strong>
            <div>Net worth {money(hp.netWorth)}</div>
            {hp.vestAfterTax > 0 && <div>Vests after tax {money(hp.vestAfterTax)}</div>}
            {hp.low !== undefined && <div>Range {money(hp.low)} to {money(hp.high!)}</div>}
            {goalsAt(hp.year).map((g) => <div key={g.id}>Goal: {g.name}</div>)}
          </div>
        )}
      </div>
    </figure>
  );
}
