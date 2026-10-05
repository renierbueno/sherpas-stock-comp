export const money = (n: number): string => `$${Math.round(n).toLocaleString('en-US')}`;

/** Whole percent; rounding is ours (the spec gives no precision). */
export const pct = (share: number): string => `${Math.round(share * 100)}%`;

export function dateLabel(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
