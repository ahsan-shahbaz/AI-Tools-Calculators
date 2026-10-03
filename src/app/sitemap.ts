import type { MetadataRoute } from 'next';
import { ALL_TOOLS } from '@/data/youtube-data';
import { CATEGORIES } from '@/data/categories';
import { CONTENT_UPDATED, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  // A stable date (not "now") so crawlers only see a change when content really changed.
  const lastModified = new Date(`${CONTENT_UPDATED}T00:00:00Z`);

  return [
    { url: SITE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
    ...ALL_TOOLS.filter((t) => t.isLive).map((tool) => ({
      url: `${SITE_URL}${tool.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...CATEGORIES.map((c) => ({
      url: `${SITE_URL}/category/${c.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...['/about', '/contact'].map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    })),
    ...['/privacy-policy', '/terms-of-use', '/disclaimer'].map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];
}
