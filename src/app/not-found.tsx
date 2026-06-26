import Link from 'next/link';
import { CloudLogo } from '@/components/shared/CloudLogo';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 opacity-60">
        <CloudLogo size={100} float />
      </div>
      <h1
        className="font-display text-5xl mb-4 mode-transition"
        style={{ color: 'var(--text-primary)' }}
      >
        Lost in the dark.
      </h1>
      <p
        className="font-body text-lg mb-10 max-w-sm mode-transition"
        style={{ color: 'var(--text-secondary)' }}
      >
        The page you are looking for wandered off. Let us guide you home.
      </p>
      <Link
        href="/"
        className="px-8 py-3 rounded-2xl font-body font-semibold mode-transition"
        style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-page)' }}
      >
        Back home
      </Link>
    </main>
  );
}
