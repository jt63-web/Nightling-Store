import type { Metadata } from 'next';
import { lights } from '@/lib/products';
import { moods } from '@/lib/moods';
import { MoodCard } from '@/components/collection/MoodCard';
import { CollectionGrid } from '@/components/collection/CollectionGrid';

export const metadata: Metadata = {
  title: 'The Collection',
  description: 'Browse all Nightling silicone night lights — sorted by mood, character, and sleep stage.',
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
          Every Nightling light is made from soft food-grade silicone, rechargeable via USB-C, and designed to be gentle on little eyes. Browse by mood, or scroll through the full range.
        </p>
      </div>

      {/* Mood navigation */}
      <section className="mb-20">
        <h2
          className="font-display text-2xl mb-8 mode-transition"
          style={{ color: 'var(--text-primary)' }}
        >
          Browse by mood
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {moods.map((mood) => (
            <MoodCard key={mood.slug} mood={mood} />
          ))}
        </div>
      </section>

      {/* All lights */}
      <section>
        <h2
          className="font-display text-2xl mb-8 mode-transition"
          style={{ color: 'var(--text-primary)' }}
        >
          All lights
        </h2>
        <CollectionGrid lights={lights} />
      </section>
    </main>
  );
}
