import type { Metadata } from 'next';
import { ALL_TOOLS } from '@/data/youtube-data';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function createToolMetadata(slug: string): Metadata {
  const tool = ALL_TOOLS.find((item) => item.slug === slug);

  if (!tool) {
    return {};
  }

  // Open Graph / Twitter images come from the opengraph-image file in each tool folder.
  return {
    title: tool.name,
    description: tool.description,
    alternates: { canonical: slug },
    openGraph: {
      title: `${tool.name} | ${SITE_NAME}`,
      description: tool.description,
      url: `${SITE_URL}${slug}`,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} | ${SITE_NAME}`,
      description: tool.description,
    },
  };
}
