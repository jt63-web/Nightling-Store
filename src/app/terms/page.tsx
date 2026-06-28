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
            body: 'By placing an order, you confirm that all information provided is accurate and complete. Nightling reserves the right to cancel any order at its discretion, in which case a full refund will be issued promptly.',
          },
          {
            heading: 'Pricing',
            body: 'All prices are listed in United States Dollars (USD) unless otherwise stated. Prices displayed in other currencies are indicative only and may vary based on exchange rates at the time of settlement. Shipping is always free — no minimum order and no code required.',
          },
          {
            heading: 'Shipping',
            body: 'We dispatch orders within 1 business day of payment confirmation. Standard shipping takes 4–10 business days depending on your location. Shipping is always free with no minimum order. Nightling is not responsible or liable for shipping delays caused by carriers, weather events, customs processing, or any other factors outside our control. Once an order has been dispatched, delivery timeframes are estimates only.',
          },
          {
            heading: 'Returns and refunds',
            body: 'We accept returns within 30 days of delivery for items that arrive faulty or damaged. We do not accept returns for change of mind. To initiate a return, contact us at returns@nightling.com with your order number and clear photos of the fault or damage. Return shipping costs for faulty or damaged items will be covered by Nightling. Refunds are processed to the original payment method within 5–10 business days of receiving the returned item.',
          },
          {
            heading: 'Product use',
            body: 'Nightling lights are designed for indoor domestic use only. Do not submerge in water or use outdoors. Follow all safety guidance on the Safety page. Nightling is not liable for damage or injury resulting from misuse of the product.',
          },
          {
            heading: 'Intellectual property',
            body: 'All content on this website — including product designs, photography, copy, and graphics — is the property of Nightling and may not be reproduced without written permission.',
          },
          {
            heading: 'Limitation of liability',
            body: 'To the maximum extent permitted by applicable law, Nightling shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our liability is limited to the value of the order in question.',
          },
          {
            heading: 'Governing law',
            body: 'These terms are governed by applicable law in the jurisdiction where Nightling operates. Any disputes will be resolved in good faith. If a resolution cannot be reached, disputes will be subject to binding arbitration or the courts of the applicable jurisdiction.',
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
