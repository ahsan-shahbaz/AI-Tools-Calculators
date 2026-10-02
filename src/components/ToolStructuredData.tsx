'use client';

import { usePathname } from 'next/navigation';
import { ALL_TOOLS } from '@/data/youtube-data';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export interface FaqItem {
  question: string;
  answer: string;
}

interface ToolStructuredDataProps {
  /** Pass this only from pages that already render a visible FAQ section with the same Q&A. */
  faqs?: FaqItem[];
  /** Optional explicit slug override (defaults to current path) */
  slug?: string;
}

/**
 * Emits SoftwareApplication/WebApplication, BreadcrumbList, and FAQPage JSON-LD
 * schemas for Google and AI Search engines (ChatGPT, Perplexity, Gemini).
 */
export default function ToolStructuredData({ faqs, slug }: ToolStructuredDataProps) {
  const pathname = usePathname();
  const currentSlug = slug || pathname;
  const tool = ALL_TOOLS.find((t) => t.slug === currentSlug);

  if (!tool) return null;

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'WebApplication'],
    name: tool.name,
    description: tool.description,
    url: `${SITE_URL}${tool.slug}`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: tool.category,
    operatingSystem: 'Any (runs in modern web browser)',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tool.category,
        item: `${SITE_URL}/#categories`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `${SITE_URL}${tool.slug}`,
      },
    ],
  };

  const faqSchema = faqs && faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
