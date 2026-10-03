import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { ALL_TOOLS } from '@/data/youtube-data';
import { CATEGORIES, getCategoryBySlug } from '@/data/categories';
import ToolCard from '@/components/ToolCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: cat.heading,
    description: cat.metaDescription,
    alternates: { canonical: `/category/${cat.slug}` },
    openGraph: { title: `${cat.heading} | ${SITE_NAME}`, description: cat.metaDescription, url: `${SITE_URL}/category/${cat.slug}`, type: 'website' },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const tools = ALL_TOOLS.filter((t) => t.category === cat.name && t.isLive);
  const others = CATEGORIES.filter((c) => c.slug !== cat.slug && ALL_TOOLS.some((t) => t.category === c.name));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: cat.heading,
        description: cat.metaDescription,
        url: `${SITE_URL}/category/${cat.slug}`,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: tools.map((t, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE_URL}${t.slug}`,
            name: t.name,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: cat.name, item: `${SITE_URL}/category/${cat.slug}` },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-3)' }}>
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium" style={{ color: 'var(--text-2)' }}>{cat.name}</span>
      </nav>

      <header className="max-w-3xl">
        <h1 className="text-3xl font-black leading-tight sm:text-5xl" style={{ color: 'var(--text-1)' }}>{cat.heading}</h1>
        <div className="mt-4 space-y-3 text-sm leading-7 sm:text-base" style={{ color: 'var(--text-2)' }}>
          {cat.intro.map((p) => <p key={p}>{p}</p>)}
        </div>
      </header>

      <AdPlaceholder slot="leaderboard" />

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => <ToolCard key={t.id} tool={t} />)}
      </div>

      <section className="mt-16 border-t pt-10" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>More calculator categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {others.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="btn-secondary !px-4 !py-2 !text-sm">{c.short}</Link>
          ))}
        </div>
      </section>
    </div>
  );
}
