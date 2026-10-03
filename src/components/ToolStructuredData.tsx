'use client';

import { usePathname } from 'next/navigation';
import { ALL_TOOLS } from '@/data/youtube-data';
import { getCategoryByName } from '@/data/categories';
import { CONTENT_UPDATED, SITE_NAME, SITE_URL } from '@/lib/site';

export interface FaqItem {
  question: string;
  answer: string;
}

interface ToolStructuredDataProps {
  /** Pass this only from pages that already render a visible FAQ section with the same Q&A. */
  faqs?: FaqItem[];
  /** Optional explicit slug override (defaults to current path) */
  slug?: string;
  /**
   * Also emit the WebApplication and BreadcrumbList schemas. The shared tool layout sets this once
   * per page; individual pages only need to pass `faqs`.
   */
  includeApp?: boolean;
}

const APP_CATEGORY: Record<string, string> = {
  'Personal Finance': 'FinanceApplication',
  'Finance & Business': 'BusinessApplication',
  'Social Media': 'MultimediaApplication',
  Lifestyle: 'HealthApplication',
  Developer: 'DeveloperApplication',
  'SEO & Webmaster': 'DeveloperApplication',
  'Everyday Math': 'UtilitiesApplication',
  'Date & Time': 'UtilitiesApplication',
};

/**
 * Emits WebApplication, BreadcrumbList, and FAQPage JSON-LD for Google and AI search engines.
 */
export default function ToolStructuredData({ faqs, slug, includeApp = false }: ToolStructuredDataProps) {
  const pathname = usePathname();
  const currentSlug = slug || pathname;
  const tool = ALL_TOOLS.find((t) => t.slug === currentSlug);

  if (!tool) return null;

  const category = getCategoryByName(tool.category);
  const categoryUrl = category ? `${SITE_URL}/category/${category.slug}` : `${SITE_URL}/#categories`;

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': ['WebApplication'],
    name: tool.name,
    description: tool.description,
    url: `${SITE_URL}${tool.slug}`,
    applicationCategory: APP_CATEGORY[tool.category] ?? 'UtilitiesApplication',
    applicationSubCategory: tool.category,
    operatingSystem: 'Any (runs in modern web browser)',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    inLanguage: 'en',
    isAccessibleForFree: true,
    dateModified: CONTENT_UPDATED,
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: tool.category, item: categoryUrl },
      { '@type': 'ListItem', position: 3, name: tool.name, item: `${SITE_URL}${tool.slug}` },
    ],
  };

  const faqSchema = faqs && faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  return (
    <>
      {includeApp && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        </>
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
    </>
  );
}
