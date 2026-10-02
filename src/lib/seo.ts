import type { Metadata } from 'next';
import { ALL_TOOLS } from '@/data/youtube-data';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function createToolMetadata(slug: string): Metadata {
  const tool = ALL_TOOLS.find((item) => item.slug === slug);

  if (!tool) {
    return {};
  }

  return {
    title: tool.name,
    description: tool.description,
    alternates: { canonical: slug },
    openGraph: {
      title: tool.name,
      description: tool.description,
      url: `${SITE_URL}${slug}`,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: tool.name,
      description: tool.description,
    },
  };
}
