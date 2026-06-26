import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { NightModeProvider } from "@/components/nav/NightModeProvider";
import { Navbar } from "@/components/nav/Navbar";
import { WhisperCart } from "@/components/cart/WhisperCart";
import { Footer } from "@/components/footer/Footer";
import { StarsBackground } from "@/components/shared/StarsBackground";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nightling — Silicone Night Lights for Kids",
    template: "%s · Nightling",
  },
  description:
    "Soft silicone night lights designed for children's bedrooms and nurseries. Rechargeable, dimmable, and wonderfully gentle.",
  keywords: [
    "silicone night light",
    "kids night light",
    "nursery night light",
    "rechargeable baby lamp",
    "dimmable night light for toddlers",
  ],
  openGraph: {
    siteName: "Nightling",
    images: [{ url: "/og-image.png", width: 1200, height: 1200 }],
  },
};

const modeScript = `(function(){try{var s=JSON.parse(localStorage.getItem('nightling-mode')||'{}');if(s&&s.state&&s.state.mode==='night')document.documentElement.setAttribute('data-mode','night')}catch(e){}})();`;

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nightling',
  url: 'https://nightling.com',
  logo: 'https://nightling.com/og-image.png',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@nightling.com',
    contactType: 'customer support',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className={`${fraunces.variable} ${inter.variable}`}>
        <NightModeProvider>
          <StarsBackground />
          <Navbar />
          <WhisperCart />
          <div className="pt-16">
            {children}
          </div>
          <Footer />
        </NightModeProvider>
      </body>
    </html>
  );
}
