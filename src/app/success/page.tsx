import type { Metadata } from 'next';
import Link from 'next/link';
import { CloudLogo } from '@/components/shared/CloudLogo';

export const metadata: Metadata = {
  title: 'Order confirmed — Nightling',
  description: 'Your Nightling order has been placed. Sweet dreams ahead.',
};

export default function SuccessPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-8">
        <CloudLogo size={120} float />
      </div>

      <h1
        className="font-display text-4xl lg:text-5xl mb-4 mode-transition"
        style={{ color: 'var(--text-primary)' }}
      >
        Order confirmed.
      </h1>
      <p
        className="font-body text-lg max-w-md leading-relaxed mb-10 mode-transition"
        style={{ color: 'var(--text-secondary)' }}
      >
        Your Nightling is on its way. Expect a soft glow in your child&apos;s room within 3–5 business days. We&apos;ll send a shipping confirmation to your inbox.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/collection"
          className="px-8 py-3 rounded-2xl font-body font-semibold mode-transition"
          style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-page)' }}
        >
          Continue shopping
        </Link>
        <Link
          href="/"
          className="px-8 py-3 rounded-2xl font-body mode-transition"
          style={{ border: '1.5px solid var(--border)', color: 'var(--text-secondary)' }}
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
