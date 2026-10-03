import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ToolDirectoryItem } from '@/types';
import { getCategoryByName } from '@/data/categories';

/** Compact tool card used on category hubs and the homepage "popular" row. Server-renderable. */
export default function ToolCard({ tool }: { tool: ToolDirectoryItem }) {
  const cat = getCategoryByName(tool.category);
  return (
    <Link href={tool.slug} className="glass glass-hover group flex flex-col justify-between rounded-2xl p-5">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl"
            style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border)' }}
            aria-hidden="true"
          >
            {tool.icon}
          </span>
          {tool.badge && (
            <span
              className="rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
              style={{ borderColor: 'var(--border-accent)', color: 'var(--accent-1)', background: 'var(--accent-glow)' }}
            >
              {tool.badge}
            </span>
          )}
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: cat?.color ?? 'var(--text-3)' }}>
          {tool.category}
        </p>
        <h3 className="mt-1 text-base font-bold leading-snug" style={{ color: 'var(--text-1)' }}>{tool.name}</h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>{tool.description}</p>
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--accent-1)' }}>
        Open calculator <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
