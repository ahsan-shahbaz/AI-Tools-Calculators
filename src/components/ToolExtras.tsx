'use client';

import { usePathname } from 'next/navigation';
import { CalendarCheck, FlaskConical, Lightbulb, ListChecks } from 'lucide-react';
import { ALL_TOOLS } from '@/data/youtube-data';
import { TOOL_CONTENT } from '@/data/tool-content';
import { CONTENT_UPDATED, SITE_URL } from '@/lib/site';
import ToolStructuredData from './ToolStructuredData';
import AdPlaceholder from './AdPlaceholder';
import ShareBar from './ShareBar';
import Resources from './Resources';
import RelatedTools from './RelatedTools';

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/**
 * Rendered once for every page under /tools by app/tools/layout.tsx. It adds, below each calculator:
 * share links, a plain-language explanation (method, worked example, tips), an FAQ (when the page does not
 * have its own), useful next steps, an ad slot and related tools, plus the shared structured data.
 */
export default function ToolExtras() {
  const pathname = usePathname();
  const tool = ALL_TOOLS.find((t) => t.slug === pathname);
  if (!tool) return null;
  const content = TOOL_CONTENT[tool.slug];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <ToolStructuredData includeApp faqs={content?.faqs} slug={tool.slug} />

      <ShareBar title={tool.name} url={`${SITE_URL}${tool.slug}`} />

      <AdPlaceholder slot="in-feed" className="my-10" />

      {content && (
        <section aria-labelledby="about-tool" className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 id="about-tool" className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-1)' }}>
              About the {tool.name}
            </h2>
            <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-2)' }}>{content.about}</p>

            <h3 className="mt-8 flex items-center gap-2 text-base font-bold" style={{ color: 'var(--text-1)' }}>
              <FlaskConical className="h-4 w-4" style={{ color: 'var(--accent-1)' }} /> How it is calculated
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm leading-7" style={{ color: 'var(--text-2)' }}>
              {content.method.map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: 'var(--accent-1)' }} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="glass mt-8 rounded-2xl p-5">
              <h3 className="flex items-center gap-2 text-base font-bold" style={{ color: 'var(--text-1)' }}>
                <ListChecks className="h-4 w-4" style={{ color: 'var(--accent-1)' }} /> {content.example.title}
              </h3>
              <p className="mt-2 text-sm leading-7" style={{ color: 'var(--text-2)' }}>{content.example.body}</p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="glass rounded-2xl p-5">
              <h3 className="flex items-center gap-2 text-base font-bold" style={{ color: 'var(--text-1)' }}>
                <Lightbulb className="h-4 w-4" style={{ color: 'var(--accent-1)' }} /> Tips for using the result
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-6" style={{ color: 'var(--text-2)' }}>
                {content.tips.map((tip) => (
                  <li key={tip}>• {tip}</li>
                ))}
              </ul>
            </div>
            <p className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
              <CalendarCheck className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>
                Method reviewed {formatDate(CONTENT_UPDATED)}. Results are estimates for general information, not
                financial, tax, legal or medical advice.
              </span>
            </p>
          </aside>
        </section>
      )}

      {content?.faqs && (
        <section aria-labelledby="tool-faq" className="mt-12 border-t pt-10" style={{ borderColor: 'var(--border)' }}>
          <h2 id="tool-faq" className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>
            Frequently asked questions
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {content.faqs.map((f) => (
              <div key={f.question} className="glass rounded-2xl p-5">
                <h3 className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>{f.question}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Resources category={tool.category} />
      <RelatedTools />
    </div>
  );
}
