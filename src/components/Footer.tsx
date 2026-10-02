import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const NAV_COLS = [
  {
    heading: 'Creator & Social',
    links: [
      { href: '/tools/youtube-money-calculator',         label: 'YouTube Money & RPM Calculator' },
      { href: '/tools/youtube-shorts-earnings-estimator', label: 'YouTube Shorts Earnings Estimator' },
      { href: '/tools/tiktok-brand-deal-rate-calculator', label: 'TikTok Brand Deal Rate Calculator' },
      { href: '/tools/instagram-engagement-rate-tool',   label: 'Instagram Engagement Rate Tool' },
      { href: '/tools/patreon-earnings-estimator',        label: 'Patreon Earnings Estimator' },
    ],
  },
  {
    heading: 'Business & Finance',
    links: [
      { href: '/tools/freelance-rate-calculator',         label: 'Freelance Rate & Quote Generator' },
      { href: '/tools/break-even-roas-calculator',        label: 'Break-Even ROAS & Profit Calc' },
      { href: '/tools/amazon-fba-net-profit-calculator',  label: 'Amazon FBA Net Profit Calculator' },
      { href: '/tools/salary-to-hourly-take-home',        label: 'Salary to Hourly Take-Home' },
    ],
  },
  {
    heading: 'Developer Tools',
    links: [
      { href: '/tools/regex-generator',         label: 'Plain English → Regex Generator' },
      { href: '/tools/schema-markup-generator', label: 'JSON-LD Schema Generator' },
    ],
  },
  {
    heading: 'Health & Lifestyle',
    links: [
      { href: '/tools/macro-tdee-calculator', label: 'Macro & TDEE Calorie Planner' },
    ],
  },
  {
    heading: 'Date & Time',
    links: [
      { href: '/tools/date-time-calculators', label: 'Date & Time Calculators' },
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">

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
