'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getLatestPosts } from '@/lib/journal';

export function JournalTeasers() {
  const posts = getLatestPosts(3);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p
              className="font-body text-xs tracking-widest uppercase mb-3 mode-transition"
              style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
            >
              Sleep journal
            </p>
            <h2
              className="font-display text-3xl lg:text-4xl mode-transition"
              style={{ color: 'var(--text-primary)' }}
            >
              From the journal.
            </h2>
          </div>
          <Link
            href="/journal"
            className="hidden md:block font-body text-sm hover:opacity-60 transition-opacity mode-transition"
            style={{ color: 'var(--text-secondary)' }}
          >
            All articles →
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/journal/${post.slug}`}>
                <div
                  className="rounded-3xl overflow-hidden border mode-transition hover:opacity-90 transition-opacity"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--bg-card)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  {/* Placeholder image area */}
                  <div
                    className="aspect-video flex items-center justify-center"
                    style={{ backgroundColor: 'var(--bg-subtle)' }}
                  >
                    <span
                      className="font-display text-5xl opacity-20"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {i === 0 ? '◉' : i === 1 ? '◎' : '●'}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="font-body text-xs px-2.5 py-1 rounded-full mode-transition"
                        style={{
                          backgroundColor: 'var(--bg-subtle)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {post.category}
                      </span>
                      <span
                        className="font-body text-xs mode-transition"
                        style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
                      >
                        {post.readingTime} min read
                      </span>
                    </div>
                    <h3
                      className="font-display text-xl mb-3 text-balance leading-snug mode-transition"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="font-body text-sm leading-relaxed line-clamp-3 mode-transition"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
