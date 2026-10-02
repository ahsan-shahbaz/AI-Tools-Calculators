'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ALL_TOOLS } from '@/data/youtube-data';

/**
 * Renders 3 other tools from the same category as the current page.
 * Falls back to filling from the wider catalog if the category has
 * fewer than 3 other live tools. Self-locating via usePathname, so
 * dropping <RelatedTools /> once into ToolShell wires it into every
 * tool page automatically — no per-page props needed.
 */
export default function RelatedTools() {
  const pathname = usePathname();
  const current = ALL_TOOLS.find((t) => t.slug === pathname);

  if (!current) return null;

  const sameCategory = ALL_TOOLS.filter(
    (t) => t.slug !== current.slug && t.category === current.category && t.isLive
  );
  const others = ALL_TOOLS.filter(
    (t) => t.slug !== current.slug && t.category !== current.category && t.isLive
  );
  const picks = [...sameCategory, ...others].slice(0, 3);

  if (picks.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-4 h-4" style={{ color: 'var(--accent-1)' }} />
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>
          Related tools
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {picks.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.slug}
            className="glass glass-hover rounded-2xl p-5 flex flex-col group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{tool.icon}</span>
              <ArrowRight
                className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200"
                style={{ color: 'var(--text-2)' }}
              />
            </div>
            <h3
              className="text-sm font-bold mb-1.5 leading-snug"
              style={{ color: 'var(--text-1)' }}
            >
              {tool.name}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
