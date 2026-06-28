import Link from 'next/link';
import { AmbientPlayer } from './AmbientPlayer';
import { CloudLogo } from '@/components/shared/CloudLogo';

const links = {
  Shop: [
    { href: '/collection', label: 'All lights' },
    { href: '/collection/light/honey-the-bear', label: 'Honey the Bear' },
    { href: '/collection/light/nimbus-the-cloud', label: 'Nimbus the Cloud' },
    { href: '/collection/light/cooper-the-puppy', label: 'Cooper the Puppy' },
  ],
  Learn: [
    { href: '/journal', label: 'Sleep Journal' },
    { href: '/safety', label: 'Safety & materials' },
    { href: '/our-story', label: 'Our story' },
  ],
  Help: [
    { href: '/privacy', label: 'Privacy policy' },
    { href: '/terms', label: 'Terms of service' },
    { href: '/accessibility', label: 'Accessibility' },
  ],
};

export function Footer() {
  return (
    <footer
      className="border-t mode-transition pt-16 pb-10"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-page)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <CloudLogo size={32} />
              <span className="font-display text-lg mode-transition" style={{ color: 'var(--text-primary)' }}>
                nightling
              </span>
            </div>
            <p className="font-body text-sm leading-relaxed mode-transition" style={{ color: 'var(--text-secondary)' }}>
              Soft silicone night lights made for little dreamers. Rechargeable, gentle, and wonderfully quiet.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="font-body text-xs font-semibold uppercase tracking-widest mb-4 mode-transition" style={{ color: 'var(--text-secondary)' }}>
                {section}
              </h3>
              <ul className="space-y-2.5">
                {items.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-body text-sm hover:opacity-70 transition-opacity mode-transition"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t mode-transition"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="font-body text-xs mode-transition" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
            © {new Date().getFullYear()} Nightling. All rights reserved.
          </p>
          <AmbientPlayer />
        </div>
      </div>
    </footer>
  );
}
