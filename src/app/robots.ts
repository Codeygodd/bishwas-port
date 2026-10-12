import type { MetadataRoute } from 'next';
import { profile as P } from '@/data/profile';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: `${P.siteUrl}/sitemap.xml` };
}
