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
      currency: 'USD',
      rates: { USD: 1 },

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
  // Defer rehydration until after React's first paint to avoid SSR/client price mismatch
  setTimeout(() => {
    useCurrencyStore.persist.rehydrate();
  }, 0);

  // Fetch live exchange rates (non-blocking)
  useCurrencyStore.getState().fetchRates().catch(() => {});

  // Auto-detect currency on first visit (no stored preference yet)
  fetch('https://ipapi.co/json/')
    .then((r) => r.json())
    .then((d: { currency?: string }) => {
      const stored = localStorage.getItem('nightling-currency');
      if (!stored) {
        const detected = d.currency as Currency | undefined;
        if (detected && ['AUD', 'USD', 'EUR', 'GBP', 'CAD', 'JPY'].includes(detected)) {
          useCurrencyStore.getState().setCurrency(detected);
          localStorage.setItem('nightling-currency', JSON.stringify({ state: { currency: detected } }));
        }
      }
    })
    .catch(() => {});
}
