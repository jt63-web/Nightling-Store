import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmed — Nightling',
  description: 'Your Nightling order has been confirmed.',
};

export default function SuccessPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <p className="text-5xl mb-6" style={{ color: 'var(--accent)' }}>✦</p>
        <h1
          className="font-display text-4xl mb-4 mode-transition"
          style={{ color: 'var(--text-primary)' }}
        >
          Order confirmed.
        </h1>
        <p
          className="font-body text-lg leading-relaxed mb-8 mode-transition"
          style={{ color: 'var(--text-secondary)' }}
        >
          Thank you for your order. Your Nightling light is on its way &mdash; we&apos;ll dispatch within 1 business day.
        </p>
        <Link
          href="/collection"
          className="inline-block px-8 py-3 rounded-full font-body font-semibold text-sm mode-transition hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--midnight, #1F2A44)' }}
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
