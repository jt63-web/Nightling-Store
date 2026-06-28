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
          Nightling is committed to making its website usable by everyone, including people with disabilities. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA and continuously work to improve the experience for all visitors.
        </p>

        {[
          {
            heading: 'What we have implemented',
            items: [
              'Keyboard navigation is supported throughout the site — all interactive elements are reachable and operable without a mouse',
              'All images and icons include descriptive alt text or appropriate ARIA labels',
              'Colour contrast ratios meet or exceed the WCAG 2.1 AA minimum of 4.5:1 for body text',
              'Font sizes are set in relative units and scale correctly with browser zoom settings',
              'Form fields and interactive controls include visible labels and focus indicators',
              'The site is compatible with commonly used screen readers',
            ],
          },
          {
            heading: 'Ongoing improvements',
            items: [
              'We regularly review and test the site for accessibility issues as part of our development process',
              'We aim to ensure new features and content meet accessibility standards before release',
              'User feedback is actively used to identify and address accessibility gaps',
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
            Contact us
          </h2>
          <p>
            If you experience any difficulty accessing content or completing a task on this website, please contact us at{' '}
            <a href="mailto:hello@nightling.com" style={{ color: 'var(--accent)' }}>hello@nightling.com</a>.
            We take all accessibility feedback seriously and will respond promptly to help you and to improve the experience for future visitors.
          </p>
        </section>
      </div>
    </main>
  );
}
