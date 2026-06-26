import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Currency, getExchangeRates } from '@/lib/currency-helpers';

interface CurrencyStore {
  currency: Currency;
  rates: Record<string, number>;
  setCurrency: (c: Currency) => void;
  fetchRates: () => Promise<void>;
  getRate: () => number;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: 'AUD',
      rates: { AUD: 1 },

      setCurrency: (currency) => set({ currency }),

      fetchRates: async () => {
        const rates = await getExchangeRates();
        set({ rates });
      },

      getRate: () => {
        const { currency, rates } = get();
        return rates[currency] ?? 1;
      },
    }),
    {
      name: 'nightling-currency',
      skipHydration: true,
      partialize: (s) => ({ currency: s.currency }),
    }
  )
);

if (typeof window !== 'undefined') {
  useCurrencyStore.persist.rehydrate();
  // Detect locale on first visit
  useCurrencyStore.getState().fetchRates().catch(() => {});
  fetch('https://ipapi.co/json/')
    .then((r) => r.json())
    .then((d: { currency?: string }) => {
      if (!useCurrencyStore.persist.getOptions().storage?.getItem('nightling-currency')) {
        const detected = d.currency as Currency | undefined;
        if (detected && ['AUD', 'USD', 'EUR', 'GBP', 'CAD', 'JPY'].includes(detected)) {
          useCurrencyStore.getState().setCurrency(detected);
        }
      }
    })
    .catch(() => {});
}
