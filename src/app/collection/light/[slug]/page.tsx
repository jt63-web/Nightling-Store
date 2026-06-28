import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { lights, getLightBySlug, getRelatedLights } from '@/lib/products';
import { LightDetail } from '@/components/product/LightDetail';

export function generateStaticParams() {
  return lights.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const light = getLightBySlug(params.slug);
  if (!light) return {};
  return {
    title: `${light.name} — Nightling`,
    description: light.tagline,
    openGraph: {
      title: light.name,
      description: light.tagline,
      images: [{ url: light.images.off }],
    },
  };
}

export default function LightPage({ params }: { params: { slug: string } }) {
  const light = getLightBySlug(params.slug);
  if (!light) notFound();
  const related = getRelatedLights(light.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: light.name,
            description: light.description,
            brand: { '@type': 'Brand', name: 'Nightling' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'AUD',
              lowPrice: (light.variants[0].price / 100).toFixed(2),
              offerCount: light.variants.length,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: light.rating,
              reviewCount: light.reviewCount,
            },
          }),
        }}
      />
      <LightDetail light={light} related={related} />
    </>
  );
}
