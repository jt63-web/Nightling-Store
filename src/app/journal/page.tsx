import type { Metadata } from 'next';
import Link from 'next/link';
import { journalPosts } from '@/lib/journal';

export const metadata: Metadata = {
  title: 'Journal — Nightling',
  description: 'Sleep science, bedtime routines, and the gentle art of getting little ones to rest.',
};

export default function JournalPage() {
  const sorted = [...journalPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <p
        className="font-body text-xs tracking-widest uppercase mb-6 mode-transition"
        style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
      >
        Journal
      </p>
      <h1
        className="font-display text-5xl lg:text-6xl mb-16 mode-transition"
        style={{ color: 'var(--text-primary)' }}
      >
        Sleep, gently.
      </h1>

      <div className="space-y-10">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            className="block group"
          >
            <article
              className="rounded-3xl p-8 border mode-transition hover:border-opacity-80 transition-all"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-body text-xs px-3 py-1 rounded-full mode-transition"
                  style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-secondary)' }}
                >
                  {post.category}
                </span>
                <span className="font-body text-xs mode-transition" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
                  {post.readingTime} min read
                </span>
              </div>
              <h2
                className="font-display text-2xl lg:text-3xl mb-3 group-hover:opacity-80 transition-opacity mode-transition"
                style={{ color: 'var(--text-primary)' }}
              >
                {post.title}
              </h2>
              <p
                className="font-body leading-relaxed mode-transition"
                style={{ color: 'var(--text-secondary)' }}
              >
                {post.excerpt}
              </p>
              <p
                className="font-body text-sm mt-4 mode-transition"
                style={{ color: 'var(--accent)' }}
              >
                Read →
              </p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
