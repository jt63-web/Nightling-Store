import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility — Nightling',
  description: 'Our commitment to an accessible Nightling experience for all users.',
};

export default function AccessibilityPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-display text-4xl mb-4 mode-transition" style={{ color: 'var(--text-primary)' }}>
        Accessibility
      </h1>
      <p className="font-body text-sm mb-12 mode-transition" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
        Last reviewed: June 2026
      </p>

      <div className="space-y-10 font-body leading-relaxed mode-transition" style={{ color: 'var(--text-secondary)' }}>
        <p>
          Nightling is committed to making its website accessible to everyone, including people with disabilities. We aim to meet WCAG 2.1 Level AA.
        </p>

        {[
          {
            heading: 'What we have done',
            items: [
              'All interactive elements are keyboard navigable',
              'Images and icons include descriptive alt text or aria-labels',
              'Colour contrast meets or exceeds 4.5:1 for body text',
              'The day/night mode toggle is labelled for screen readers',
              'Font sizes are set in relative units and respond to browser zoom',
            ],
          },
          {
            heading: 'Known limitations',
            items: [
              'Some SVG illustrations are decorative and marked presentation-only',
              'The ambient sound player is UI-only at this stage; audio controls will be added with full audio functionality',
            ],
          },
        ].map(({ heading, items }) => (
          <section key={heading}>
            <h2 className="font-display text-xl mb-3 mode-transition" style={{ color: 'var(--text-primary)' }}>
              {heading}
            </h2>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h2 className="font-display text-xl mb-3 mode-transition" style={{ color: 'var(--text-primary)' }}>
            Feedback
          </h2>
          <p>
            If you encounter a barrier on this website, please email{' '}
            <a href="mailto:hello@nightling.com" style={{ color: 'var(--accent)' }}>hello@nightling.com</a>{' '}
            and we will do our best to help and to improve the experience.
          </p>
        </section>
      </div>
    </main>
  );
}
