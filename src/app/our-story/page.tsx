import type { Metadata } from 'next';
import { CloudLogo } from '@/components/shared/CloudLogo';

export const metadata: Metadata = {
  title: 'Our Story — Nightling',
  description: 'How a restless toddler and a night-light obsession became Nightling.',
};

export default function OurStoryPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <p
        className="font-body text-xs tracking-widest uppercase mb-6 mode-transition"
        style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
      >
        Our story
      </p>
      <h1
        className="font-display text-5xl lg:text-6xl mb-12 mode-transition"
        style={{ color: 'var(--text-primary)' }}
      >
        Lights on for the little ones.
      </h1>

      <div className="flex justify-center mb-16">
        <CloudLogo size={160} float />
      </div>

      <div className="space-y-8 font-body text-lg leading-relaxed mode-transition" style={{ color: 'var(--text-secondary)' }}>
        <p>
          It started with a two-year-old who was afraid of the dark, and a parent who kept stubbing their toe on plastic night-lights that buzzed, flickered, and cast blue-ish shadows across the bedroom ceiling.
        </p>
        <p>
          We wanted a light that was <em>soft</em>. Not just dimable — genuinely soft. Something a child could reach out and touch at 2am without knocking it off the shelf. Something that warmed the room without wrecking sleep.
        </p>
        <p>
          We spent months testing silicone formulas, LED temperatures, and diffuser geometries. The result was Cloud Dreamer — a plump, smiling cloud with the warmest 2700K glow we could coax out of a single LED and food-grade silicone.
        </p>
        <p>
          Nightling lights are made in a certified factory that also produces baby feeding equipment. Every material is tested against the same standards we&apos;d apply to a teething ring — because some children do, inevitably, put them in their mouths.
        </p>
        <p>
          Our team is tiny: two founders, a product designer, and a small warehouse team. We&apos;re building this slowly and carefully, one character at a time.
        </p>
        <p
          className="font-display text-2xl pt-4 mode-transition"
          style={{ color: 'var(--text-primary)' }}
        >
          Sleep well. Glow softly.
        </p>
      </div>
    </main>
  );
}
