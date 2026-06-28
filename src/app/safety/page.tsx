import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safety — Nightling',
  description: 'Full safety information for Nightling silicone night lights.',
};

const sections = [
  {
    title: 'Materials',
    content: `All Nightling lights are made using food-grade silicone — the same material widely used in baby teethers and feeding equipment around the world. The internal housing is made from ABS plastic and is fully enclosed within the silicone shell.`,
  },
  {
    title: 'LED safety',
    content: `Nightling lights use warm-white LEDs chosen for their low-intensity, gentle output. Warmer, dimmer settings are generally considered more sleep-friendly for use at bedtime and overnight, and the ultra-low mode is designed with this in mind.`,
  },
  {
    title: 'Electrical safety',
    content: `The built-in lithium-ion battery is protected by an over-charge and over-discharge circuit. Charging via USB-C (5V/1A) takes approximately 2 hours. Do not charge with a power adapter exceeding 5V/2A.`,
  },
  {
    title: 'Age suitability',
    content: `Nightling lights are suitable for children aged 3 and above as standalone products. For nurseries (children under 3), Nightling lights must be placed out of reach — on a shelf or dresser — and not used as a co-sleeping object. The silicone body is soft and flexible, but the internal electronics are not designed for chewing.`,
  },
  {
    title: 'Care and cleaning',
    content: `Wipe the exterior with a damp cloth. Do not submerge in water. Do not use abrasive cleaners or solvents. Store at room temperature. Avoid prolonged exposure to direct sunlight, which may cause colour fading over time.`,
  },
  {
    title: 'Warnings',
    items: [
      'Not suitable as a sole sleeping companion for children under 3.',
      'Keep out of reach of very young children and infants.',
      'Do not charge overnight or leave unattended while charging.',
      'Do not use if the silicone is torn, the USB-C port is damaged, or the light shows signs of swelling.',
      'If swallowed or if a child shows signs of distress, seek medical attention immediately.',
    ],
  },
];

export default function SafetyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <p
        className="font-body text-xs tracking-widest uppercase mb-6 mode-transition"
        style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
      >
        Safety information
      </p>
      <h1
        className="font-display text-5xl mb-12 mode-transition"
        style={{ color: 'var(--text-primary)' }}
      >
        Safe by design.
      </h1>

      <div className="space-y-12">
        {sections.map((s) => (
          <section key={s.title}>
            <h2
              className="font-display text-2xl mb-4 mode-transition"
              style={{ color: 'var(--text-primary)' }}
            >
              {s.title}
            </h2>
            {s.content && (
              <p className="font-body leading-relaxed mode-transition" style={{ color: 'var(--text-secondary)' }}>
                {s.content}
              </p>
            )}
            {s.items && (
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-body text-sm mode-transition" style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }}>⚠</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div
        className="mt-16 p-6 rounded-2xl mode-transition"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <p className="font-body text-sm leading-relaxed mode-transition" style={{ color: 'var(--text-secondary)' }}>
          If you have a safety concern about a Nightling product, please contact us at{' '}
          <a href="mailto:safety@nightling.com" style={{ color: 'var(--accent)' }}>safety@nightling.com</a>.
          We take every report seriously and respond within 1 business day.
        </p>
      </div>
    </main>
  );
}
