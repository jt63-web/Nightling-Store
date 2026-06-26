import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Nightling',
  description: 'Nightling terms of sale, returns, and use.',
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-display text-4xl mb-4 mode-transition" style={{ color: 'var(--text-primary)' }}>
        Terms & Conditions
      </h1>
      <p className="font-body text-sm mb-12 mode-transition" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
        Last updated: 1 January 2026
      </p>

      <div className="space-y-10 font-body leading-relaxed mode-transition" style={{ color: 'var(--text-secondary)' }}>
        {[
          {
            heading: 'Orders',
            body: 'By placing an order, you warrant that you are 18 years of age or older and that all information provided is accurate. Nightling reserves the right to cancel any order at its discretion, in which case a full refund will be issued.',
          },
          {
            heading: 'Pricing',
            body: 'All prices are in Australian Dollars (AUD) unless otherwise stated. Prices displayed in other currencies are indicative only and may vary based on exchange rates at the time of settlement. Shipping is calculated at checkout.',
          },
          {
            heading: 'Shipping',
            body: 'We ship from Melbourne, Australia. Standard domestic shipping takes 3–5 business days. International shipping times vary by destination. We are not responsible for delays caused by customs or postal services.',
          },
          {
            heading: 'Returns and refunds',
            body: 'We accept returns within 30 days of delivery for items in original condition and packaging. Customised or personalised items are not returnable. To initiate a return, email returns@nightling.com with your order number. Return postage is at the customer\'s expense unless the item is faulty.',
          },
          {
            heading: 'Product use',
            body: 'Nightling lights are designed for indoor domestic use only. Do not use in bathrooms, near water, or outdoors. Follow all safety guidance on the Safety page. Nightling is not liable for damage or injury resulting from misuse of the product.',
          },
          {
            heading: 'Intellectual property',
            body: 'All content on this website — including product designs, photography, copy, and graphics — is owned by Nightling Pty Ltd and may not be reproduced without written permission.',
          },
          {
            heading: 'Governing law',
            body: 'These terms are governed by the laws of Victoria, Australia. Any disputes will be subject to the exclusive jurisdiction of the courts of Victoria.',
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
