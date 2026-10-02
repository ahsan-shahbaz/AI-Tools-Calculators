import type { MetadataRoute } from 'next';
import { ALL_TOOLS } from '@/data/youtube-data';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = ['', '/privacy-policy', '/terms-of-use', '/disclaimer'];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: route ? 'yearly' as const : 'weekly' as const,
      priority: route ? 0.3 : 1,
    })),
    ...ALL_TOOLS.map((tool) => ({
      url: `${SITE_URL}${tool.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
