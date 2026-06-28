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
            heading: 'Overview',
            body: 'Nightling is committed to protecting your privacy. This policy explains what personal information we collect, how we use it, and the choices you have. By using this website or placing an order, you agree to the practices described here.',
          },
          {
            heading: 'Information we collect',
            body: 'When you place an order, we collect your name, email address, shipping address, and payment details. Payment information is processed securely by our payment provider — we do not store your full card number. When you subscribe to our mailing list, we collect your email address only. We may also collect anonymised usage data (such as pages visited and browser type) to help improve the site.',
          },
          {
            heading: 'How we use your information',
            body: 'We use your information to process and fulfil your order, send order confirmations and shipping updates, respond to customer service enquiries, and (if you opt in) send occasional product updates and promotions. We do not sell, rent, or share your personal information with third parties for their marketing purposes.',
          },
          {
            heading: 'Cookies',
            body: 'We use essential cookies to maintain your shopping cart and currency preference between sessions. We may also use anonymised analytics cookies to understand how visitors use our site. You can disable cookies in your browser settings at any time, though some features (such as cart persistence) may not function correctly.',
          },
          {
            heading: 'Data security',
            body: 'We take reasonable technical and organisational measures to protect your personal information against unauthorised access, loss, or disclosure. All transactions are transmitted over secure encrypted connections (HTTPS).',
          },
          {
            heading: 'Data retention',
            body: 'We retain your order information for as long as necessary to fulfil our legal and business obligations, including tax and accounting requirements. You may request deletion of your personal data at any time (see below), subject to any legal retention requirements.',
          },
          {
            heading: 'Your rights',
            body: 'You have the right to access, correct, or request deletion of your personal information at any time. To exercise these rights, email us at privacy@nightling.com. We will respond within 30 days. You may also unsubscribe from marketing emails at any time using the link at the bottom of any email.',
          },
          {
            heading: 'Contact',
            body: 'If you have questions about this policy or how we handle your data, please contact us at privacy@nightling.com.',
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
