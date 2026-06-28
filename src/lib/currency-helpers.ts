export type Currency = 'AUD' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'JPY';

export const CURRENCIES: Currency[] = ['AUD', 'USD', 'EUR', 'GBP', 'CAD', 'JPY'];

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  AUD: 'A$',
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  JPY: '¥',
};

let cachedRates: Record<string, number> | null = null;
let cacheTime = 0;
const TTL = 60 * 60 * 1000; // 1 hour

export async function getExchangeRates(): Promise<Record<string, number>> {
  if (cachedRates && Date.now() - cacheTime < TTL) return cachedRates;
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();
    if (data?.rates) {
      cachedRates = data.rates as Record<string, number>;
      cacheTime = Date.now();
      return cachedRates;
    }
  } catch {
    // fall through to defaults
  }
  return { USD: 1, AUD: 1.55, EUR: 0.92, GBP: 0.79, CAD: 1.36, JPY: 157 };
}

export function formatPrice(cents: number, currency: Currency, rate = 1): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  const value = (cents / 100) * rate;
  if (currency === 'JPY') return `${symbol}${Math.round(value)}`;
  return `${symbol}${value.toFixed(2)}`;
}
