import type { Metadata } from 'next';
import { lights } from '@/lib/products';
import { CollectionGrid } from '@/components/collection/CollectionGrid';

export const metadata: Metadata = {
  title: 'The Collection — Nightling',
  description: 'Browse all Nightling silicone night lights — rechargeable, BPA-free, and gentle on little eyes.',
};

export default function CollectionPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-16">
        <p
          className="font-body text-xs tracking-widest uppercase mb-4 mode-transition"
          style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
        >
          The collection
        </p>
        <h1
          className="font-display text-5xl lg:text-6xl mb-6 mode-transition"
          style={{ color: 'var(--text-primary)' }}
        >
          Find your light.
        </h1>
        <p
          className="font-body text-lg max-w-xl leading-relaxed mode-transition"
          style={{ color: 'var(--text-secondary)' }}
        >
          Every Nightling light is made from soft food-grade silicone, rechargeable via USB-C, and designed to be gentle on little eyes.
        </p>
      </div>

      <CollectionGrid lights={lights} />
    </main>
  );
}
