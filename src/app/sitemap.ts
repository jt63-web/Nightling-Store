import type { MetadataRoute } from 'next';
import { lights } from '@/lib/products';
import { moods } from '@/lib/moods';
import { journalPosts } from '@/lib/journal';

const BASE = 'https://nightling.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/collection`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/our-story`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/safety`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/journal`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/accessibility`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const lightRoutes: MetadataRoute.Sitemap = lights.map((l) => ({
    url: `${BASE}/collection/light/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const moodRoutes: MetadataRoute.Sitemap = moods.map((m) => ({
    url: `${BASE}/collection/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const journalRoutes: MetadataRoute.Sitemap = journalPosts.map((p) => ({
    url: `${BASE}/journal/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  return [...staticRoutes, ...lightRoutes, ...moodRoutes, ...journalRoutes];
}
