import { ExternalLink } from 'lucide-react';
import { RESOURCES } from '@/data/affiliates';
import type { ToolCategory } from '@/types';

/** Helpful next-step links for a tool category. Affiliate links are labelled and disclosed. */
export default function Resources({ category }: { category: ToolCategory }) {
  const items = RESOURCES[category];
  if (!items?.length) return null;
  const hasAffiliate = items.some((r) => r.trackedUrl);

  return (
    <section aria-labelledby="resources-heading" className="mt-12">
      <h2 id="resources-heading" className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>
        Useful next steps
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => {
          const affiliate = Boolean(r.trackedUrl);
          return (
            <a
              key={r.name}
              href={r.trackedUrl ?? r.url}
              target="_blank"
              rel={affiliate ? 'sponsored nofollow noopener noreferrer' : 'noopener noreferrer'}
              className="glass glass-hover flex flex-col justify-between rounded-2xl p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>{r.name}</h3>
                  {affiliate && (
                    <span className="rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: 'var(--border)', color: 'var(--text-3)' }}>
                      Affiliate
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{r.blurb}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--accent-1)' }}>
                {r.cta} <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          );
        })}
      </div>
      {hasAffiliate && (
        <p className="mt-3 text-[11px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
          Disclosure: links marked Affiliate may earn us a commission at no extra cost to you. This never changes
          how a calculator works or what it shows.
        </p>
      )}
    </section>
  );
}
