import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { journalPosts, getPostBySlug } from '@/lib/journal';

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Nightling Journal`,
    description: post.excerpt,
  };
}

export default function JournalPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString('en-AU', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { '@type': 'Organization', name: 'Nightling' },
          }),
        }}
      />
      <main className="max-w-3xl mx-auto px-6 py-20">
        {/* Back link */}
        <Link
          href="/journal"
          className="font-body text-sm hover:opacity-60 transition-opacity inline-flex items-center gap-1 mb-10 mode-transition"
          style={{ color: 'var(--text-secondary)' }}
        >
          ← Journal
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <span
            className="font-body text-xs px-3 py-1 rounded-full mode-transition"
            style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          >
            {post.category}
          </span>
          <span className="font-body text-xs mode-transition" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
            {post.readingTime} min read · {date}
          </span>
        </div>

        <h1
          className="font-display text-4xl lg:text-5xl mb-12 mode-transition"
          style={{ color: 'var(--text-primary)' }}
        >
          {post.title}
        </h1>

        <div
          className="font-body leading-relaxed text-lg prose-nightling mode-transition"
          style={{ color: 'var(--text-secondary)' }}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* Footer nav */}
        <div
          className="mt-20 pt-8 border-t mode-transition"
          style={{ borderColor: 'var(--border)' }}
        >
          <Link
            href="/journal"
            className="font-body text-sm mode-transition hover:opacity-70 transition-opacity"
            style={{ color: 'var(--accent)' }}
          >
            ← More from the journal
          </Link>
        </div>
      </main>
    </>
  );
}
