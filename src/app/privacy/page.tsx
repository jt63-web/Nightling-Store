import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Nightling',
  description: 'How Nightling collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-display text-4xl mb-4 mode-transition" style={{ color: 'var(--text-primary)' }}>
        Privacy Policy
      </h1>
      <p className="font-body text-sm mb-12 mode-transition" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
        Last updated: 1 January 2026
      </p>

      <div className="space-y-10 font-body leading-relaxed mode-transition" style={{ color: 'var(--text-secondary)' }}>
        {[
          {
            heading: 'What we collect',
            body: 'When you place an order, we collect your name, email address, shipping address, and payment details (processed securely by Stripe — we never see your full card number). When you subscribe to our newsletter, we collect your email address only.',
          },
          {
            heading: 'How we use it',
            body: 'We use your information to fulfil orders, send shipping confirmations, and (if you opt in) share occasional updates about new products and journal articles. We do not sell, rent, or share your personal information with third parties for marketing purposes.',
          },
          {
            heading: 'Cookies',
            body: 'We use essential cookies to maintain your cart and currency preference. We may use analytics cookies (anonymised) to understand how visitors use the site. You can disable cookies in your browser settings — your cart will not persist between sessions if you do.',
          },
          {
            heading: 'Third-party services',
            body: 'We use Stripe for payment processing, Vercel for hosting, and Klaviyo for email newsletters. Each has their own privacy policy. We do not use Facebook Pixel, TikTok Pixel, or other behavioural ad-tracking technologies.',
          },
          {
            heading: 'Your rights',
            body: 'You may request access to, correction of, or deletion of your personal information at any time by emailing privacy@nightling.com. We will respond within 30 days.',
          },
          {
            heading: 'Contact',
            body: 'Questions about this policy? Email privacy@nightling.com.',
          },
        ].map(({ heading, body }) => (
          <section key={heading}>
            <h2 className="font-display text-xl mb-3 mode-transition" style={{ color: 'var(--text-primary)' }}>
              {heading}
            </h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
