// SIMULATED market prices at the analysis date, per ticker. A ticker missing here has no
// market price (AC-A-07, AC-B-30). Invented values, not market data.
export const PRICES: Record<string, number> = {
  HLDN: 50,
  ARVH: 80,
  KSTB: 30,
  ORSW: 40,
};

export const priceOf = (ticker: string | undefined): number | null =>
  ticker && PRICES[ticker] !== undefined ? PRICES[ticker] : null;
