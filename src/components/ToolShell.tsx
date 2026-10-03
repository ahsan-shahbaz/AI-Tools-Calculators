import React, { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import ToolStructuredData, { FaqItem } from './ToolStructuredData';

interface Crumb {
  label: string;
  href?: string;
}

interface ToolShellProps {
  /** Icon emoji or element shown in the hero */
  icon: string;
  /** Badge text above the title, e.g. "YouTube · Social Media" */
  badge: string;
  /** Page <h1> */
  title: ReactNode;
  /** Sub-heading paragraph */
  subtitle: string;
  /** Optional accent color key for the glow ring – defaults to violet */
  accentColor?: 'violet' | 'cyan' | 'rose' | 'emerald' | 'amber';
  /** Breadcrumb items */
  breadcrumbs?: Crumb[];
  /**
   * Pass the SAME Q&A shown in the page's visible FAQ section (if it has one)
   * so FAQPage schema matches on-page content. Omit if the page has no FAQ.
   */
  faqs?: FaqItem[];
  children: ReactNode;
}

const ACCENT_MAP: Record<string, { glow: string; border: string; color: string }> = {
  violet:  { glow: 'rgba(8,127,110,0.12)', border: 'rgba(8,127,110,0.3)', color: '#087f6e' },
  cyan:    { glow: 'rgba(6,140,150,0.12)', border: 'rgba(6,140,150,0.3)', color: '#068c96' },
  rose:    { glow: 'rgba(190,79,61,0.12)', border: 'rgba(190,79,61,0.3)', color: '#be4f3d' },
  emerald: { glow: 'rgba(27,132,83,0.12)', border: 'rgba(27,132,83,0.3)', color: '#1b8453' },
  amber:   { glow: 'rgba(170,115,23,0.12)', border: 'rgba(170,115,23,0.3)', color: '#aa7317' },
};

export default function ToolShell({
  icon,
  badge,
  title,
  subtitle,
  accentColor = 'violet',
  breadcrumbs = [],
  faqs,
  children,
}: ToolShellProps) {
  const accent = ACCENT_MAP[accentColor];

  return (
    <div className="relative z-10 pt-2 pb-20">
      <ToolStructuredData faqs={faqs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs mb-8 flex-wrap">
          <Link href="/" className="text-[--text-3] hover:text-[--text-2] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            Home
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <ChevronRight className="w-3 h-3 text-[--text-3]" />
              {crumb.href ? (
                <Link href={crumb.href} className="text-[--text-3] hover:text-[--text-2] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[--text-2] font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Hero header */}
        <div className="relative text-center max-w-3xl mx-auto mb-12">
          {/* Ambient glow */}
          <div
            className="absolute inset-0 -top-8 pointer-events-none rounded-2xl"
            style={{ background: accent.glow }}
          />

          {/* Icon */}
          <div
            className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-5 mx-auto"
            style={{
              background: 'var(--bg-card)',
              border: `1px solid ${accent.border}`,
              boxShadow: `0 4px 14px ${accent.glow}`,
            }}
          >
            {icon}
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase mb-4" style={{ color: accent.color, borderColor: accent.border, backgroundColor: accent.glow }}>
            {badge}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-black text-[--text-1] leading-tight tracking-tight mb-4">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-[--text-2] leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Tool content */}
        {children}


      </div>
    </div>
  );
}
