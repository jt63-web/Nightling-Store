'use client';

import { useCurrencyStore } from '@/lib/stores/currency';
import { CURRENCIES, type Currency } from '@/lib/currency-helpers';

export function CurrencyPicker() {
  const { currency, setCurrency } = useCurrencyStore();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as Currency)}
      className="text-xs font-body bg-transparent border-0 cursor-pointer focus:outline-none mode-transition"
      style={{ color: 'var(--text-secondary)' }}
      aria-label="Select currency"
    >
      {CURRENCIES.map((c) => (
        <option key={c} value={c} style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
          {c}
        </option>
      ))}
    </select>
  );
}
