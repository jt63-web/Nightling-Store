'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/stores/cart';
import { useCurrencyStore } from '@/lib/stores/currency';
import { formatPrice } from '@/lib/currency-helpers';
import type { Currency } from '@/lib/currency-helpers';
import { FreeShippingBar } from './FreeShippingBar';

export function WhisperCart() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotalCents, discountCents } = useCartStore();
  const { currency, getRate } = useCurrencyStore();
  const rate = getRate();

  async function handleCheckout() {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, currency }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      // fallback
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(31,42,68,0.35)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-50 flex flex-col mode-transition"
            style={{
              backgroundColor: 'var(--bg-page)',
              boxShadow: 'var(--shadow-card)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b mode-transition"
              style={{ borderColor: 'var(--border)' }}
            >
              <h2
                className="font-display text-xl mode-transition"
                style={{ color: 'var(--text-primary)' }}
              >
                Your bag
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-60"
                style={{ color: 'var(--text-secondary)' }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <FreeShippingBar />

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-16">
                  <p className="font-display text-3xl" style={{ color: 'var(--text-primary)' }}>
                    Your bag is empty.
                  </p>
                  <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Find a light that feels like home.
                  </p>
                  <Link
                    href="/collection"
                    onClick={closeCart}
                    className="mt-2 px-6 py-2.5 rounded-full font-body text-sm font-medium mode-transition"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--midnight, #1F2A44)' }}
                  >
                    Browse the collection
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.slug} className="flex gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 relative"
                      style={{ backgroundColor: 'var(--bg-subtle)' }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-body font-medium text-sm truncate mode-transition"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.name}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div
                          className="flex items-center border rounded-full overflow-hidden"
                          style={{ borderColor: 'var(--border)' }}
                        >
                          <button
                            onClick={() => updateQty(item.slug, item.qty - 1)}
                            className="w-7 h-7 flex items-center justify-center text-sm hover:opacity-60 transition-opacity"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-body text-xs" style={{ color: 'var(--text-primary)' }}>
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.slug, item.qty + 1)}
                            className="w-7 h-7 flex items-center justify-center text-sm hover:opacity-60 transition-opacity"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.slug)}
                          className="text-xs hover:opacity-60 transition-opacity"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p
                      className="font-body text-sm font-medium flex-shrink-0 mode-transition"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {formatPrice(item.price * item.qty, currency as Currency, rate)}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-5 border-t mode-transition space-y-3"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm mode-transition" style={{ color: 'var(--text-secondary)' }}>
                    Subtotal
                  </span>
                  <span className="font-body text-sm mode-transition" style={{ color: 'var(--text-secondary)' }}>
                    {formatPrice(subtotalCents(), currency as Currency, rate)}
                  </span>
                </div>
                {discountCents() > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm mode-transition" style={{ color: '#2a9d5c' }}>
                      🎁 Buy 1 Get 1 10% Off
                    </span>
                    <span className="font-body text-sm font-semibold" style={{ color: '#2a9d5c' }}>
                      -{formatPrice(discountCents(), currency as Currency, rate)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center border-t pt-3 mode-transition" style={{ borderColor: 'var(--border)' }}>
                  <span className="font-body font-semibold mode-transition" style={{ color: 'var(--text-primary)' }}>
                    Total
                  </span>
                  <span className="font-body font-semibold mode-transition" style={{ color: 'var(--text-primary)' }}>
                    {formatPrice(subtotalCents() - discountCents(), currency as Currency, rate)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="block w-full text-center py-3.5 rounded-full font-body font-semibold text-sm mode-transition hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--midnight, #1F2A44)' }}
                >
                  Checkout
                </button>
                <button
                  onClick={closeCart}
                  className="block w-full text-center py-2 font-body text-sm hover:opacity-60 transition-opacity"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
