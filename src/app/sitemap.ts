import type { MetadataRoute } from 'next';
import { profile as P } from '@/data/profile';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: P.siteUrl, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${P.siteUrl}/classic`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];
}
