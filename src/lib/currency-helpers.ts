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

// Shipping thresholds in AUD cents; converted to other currencies dynamically
export const FREE_SHIPPING_AUD = 7000; // A$70
export const FLAT_SHIPPING_AUD = 695;  // A$6.95

let cachedRates: Record<string, number> | null = null;
let cacheTime = 0;
const TTL = 60 * 60 * 1000; // 1 hour

export async function getExchangeRates(): Promise<Record<string, number>> {
  if (cachedRates && Date.now() - cacheTime < TTL) return cachedRates;
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/AUD');
    const data = await res.json();
    if (data?.rates) {
      cachedRates = data.rates as Record<string, number>;
      cacheTime = Date.now();
      return cachedRates;
    }
  } catch {
    // fall through to defaults
  }
  return { AUD: 1, USD: 0.64, EUR: 0.59, GBP: 0.51, CAD: 0.88, JPY: 97 };
}

export function formatPrice(cents: number, currency: Currency, rate = 1): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  const value = (cents / 100) * rate;
  if (currency === 'JPY') return `${symbol}${Math.round(value)}`;
  return `${symbol}${value.toFixed(2)}`;
}
