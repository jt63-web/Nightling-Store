'use client';

import { useModeStore } from '@/lib/stores/mode';
import { useCartStore } from '@/lib/stores/cart';
import { useCurrencyStore } from '@/lib/stores/currency';
import { FREE_SHIPPING_AUD, FLAT_SHIPPING_AUD, formatPrice } from '@/lib/currency-helpers';
import type { Currency } from '@/lib/currency-helpers';

export function FreeShippingBar() {
  const mode = useModeStore((s) => s.mode);
  const isNight = mode === 'night';
  const subtotal = useCartStore((s) => s.subtotalCents());
  const { currency, getRate } = useCurrencyStore();
  const rate = getRate();

  const thresholdCents = FREE_SHIPPING_AUD;
  const remaining = Math.max(0, thresholdCents - subtotal);
  const pct = Math.min(100, (subtotal / thresholdCents) * 100);
  const qualifies = remaining === 0;

  const remainingFormatted = formatPrice(remaining, currency as Currency, rate);
  const thresholdFormatted = formatPrice(thresholdCents, currency as Currency, rate);
  const flatFormatted = formatPrice(FLAT_SHIPPING_AUD, currency as Currency, rate);

  return (
    <div className="px-6 py-3 border-b mode-transition" style={{ borderColor: 'var(--border)' }}>
      <p className="font-body text-xs mb-2 mode-transition" style={{ color: 'var(--text-secondary)' }}>
        {qualifies
          ? 'You qualify for free shipping!'
          : `Add ${remainingFormatted} for free shipping (otherwise ${flatFormatted})`}
      </p>
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--bg-subtle)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            backgroundColor: isNight ? '#FFB957' : '#FFD78E',
          }}
        />
      </div>
      <p className="font-body text-[10px] mt-1 mode-transition" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
        Free shipping over {thresholdFormatted}
      </p>
    </div>
  );
}
