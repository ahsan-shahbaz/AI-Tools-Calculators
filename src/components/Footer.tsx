import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { ALL_TOOLS } from '@/data/youtube-data';
import { CATEGORIES } from '@/data/categories';
import CookieSettings from './CookieSettings';

const POPULAR = [
  '/tools/mortgage-payment-calculator',
  '/tools/compound-interest-calculator',
  '/tools/percentage-calculator',
  '/tools/freelance-rate-calculator',
  '/tools/youtube-money-calculator',
  '/tools/bmi-calculator',
];

const NAV_COLS = [
  {
    heading: 'Popular calculators',
    links: POPULAR.map((slug) => ({ href: slug, label: ALL_TOOLS.find((t) => t.slug === slug)?.name ?? slug })),
  },
  {
    heading: 'Categories',
    links: CATEGORIES.map((c) => ({ href: `/category/${c.slug}`, label: c.heading.replace(/^Free /, '') })),
  },
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/#faq', label: 'FAQ' },
    ],
  },
  {
    heading: 'Trust & Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-use',   label: 'Terms of Use' },
      { href: '/disclaimer',     label: 'Earnings Disclaimer' },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative mt-8 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, var(--border-accent), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 flex-shrink-0">
                <div
                  className="absolute inset-0 rounded-lg opacity-70 blur-[2px]"
                  style={{ background: 'var(--accent-1)' }}
                />
                <div
                  className="relative w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--accent-1)' }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <span
                className="text-base font-bold tracking-tight transition-colors"
                style={{ color: 'var(--text-1)' }}
              >
                Tool<span style={{ color: 'var(--accent-1)' }}>Calculators</span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
              Free, practical calculators for creators, businesses, developers, and everyday planning.
            </p>

            <div className="text-[11px]" style={{ color: 'var(--text-3)' }}>
              © {new Date().getFullYear()} ToolCalculators.
              <br />All rights reserved.
              <CookieSettings />
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-[11px] font-bold uppercase tracking-widest mb-4"
                style={{ color: 'var(--text-3)' }}
              >
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="footer-link text-sm transition-colors duration-200 inline-flex items-center gap-1 group/link"
                      style={{ color: 'var(--text-2)' }}
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-60 -translate-x-1 group-hover/link:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-[11px] leading-relaxed max-w-3xl" style={{ color: 'var(--text-3)' }}>
            <span className="font-semibold" style={{ color: 'var(--text-2)' }}>Disclaimer:</span>{' '}
            Calculator results are estimates for general information only — not financial, tax, legal, or medical advice.
            Actual outcomes depend on individual circumstances and may differ from estimates.
          </p>
        </div>
      </div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--orb-1), transparent)' }}
      />
    </footer>
  );
}
