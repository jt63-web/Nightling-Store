import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMoodBySlug, moods } from '@/lib/moods';
import { getLightsByMood } from '@/lib/products';
import { CollectionGrid } from '@/components/collection/CollectionGrid';

export function generateStaticParams() {
  return moods.map((m) => ({ mood: m.slug }));
}

export async function generateMetadata({ params }: { params: { mood: string } }): Promise<Metadata> {
  const mood = getMoodBySlug(params.mood);
  if (!mood) return {};
  return {
    title: mood.name,
    description: mood.description,
  };
}

export default function MoodPage({ params }: { params: { mood: string } }) {
  const mood = getMoodBySlug(params.mood);
  if (!mood) notFound();
  const moodLights = getLightsByMood(mood.slug);

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-16 max-w-2xl">
        <p
          className="font-body text-xs tracking-widest uppercase mb-4 mode-transition"
          style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
        >
          {mood.tagline}
        </p>
        <h1
          className="font-display text-5xl lg:text-6xl mb-6 mode-transition"
          style={{ color: 'var(--text-primary)' }}
        >
          {mood.name}
        </h1>
        <p
          className="font-body text-lg leading-relaxed mode-transition"
          style={{ color: 'var(--text-secondary)' }}
        >
          {mood.description}
        </p>
      </div>

      {moodLights.length > 0 ? (
        <CollectionGrid lights={moodLights} />
      ) : (
        <p
          className="font-body text-lg mode-transition"
          style={{ color: 'var(--text-secondary)' }}
        >
          More lights in this collection coming soon.
        </p>
      )}
    </main>
  );
}
