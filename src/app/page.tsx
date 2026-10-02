'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles, Search, Flame, ArrowRight,
  ShieldCheck, Zap, CheckCircle2, Clock,
  Cpu, Globe, TrendingUp,
} from 'lucide-react';
import { ALL_TOOLS } from '@/data/youtube-data';
import AdPlaceholder from '@/components/AdPlaceholder';

/* ── Per-category accent config ─────────────────────── */
const CAT_META: Record<string, { color: string; bg: string; dot: string; glow: string }> = {
  'Social Media':        { color: '#f43f5e', bg: 'rgba(244,63,94,0.12)',  dot: '#f43f5e', glow: 'rgba(244,63,94,0.15)' },
  'Finance & Business':  { color: '#10b981', bg: 'rgba(16,185,129,0.12)', dot: '#10b981', glow: 'rgba(16,185,129,0.15)' },
  'SEO & Webmaster':     { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', dot: '#f59e0b', glow: 'rgba(245,158,11,0.15)' },
  'Developer':           { color: '#06b6d4', bg: 'rgba(6,182,212,0.12)',  dot: '#06b6d4', glow: 'rgba(6,182,212,0.15)' },
  'Lifestyle':           { color: '#d97706', bg: 'rgba(217,119,6,0.12)', dot: '#d97706', glow: 'rgba(217,119,6,0.15)' },
  'Date & Time':         { color: '#2563eb', bg: 'rgba(37,99,235,0.12)', dot: '#2563eb', glow: 'rgba(37,99,235,0.15)' },
};

const STATS = [
  { value: '13+', label: 'Free Tools',        icon: <Cpu className="w-4 h-4" /> },
  { value: '100%', label: 'Browser-local',    icon: <ShieldCheck className="w-4 h-4" /> },
  { value: '0',    label: 'Sign-ups needed',  icon: <Zap className="w-4 h-4" /> },
  { value: '6',    label: 'Categories',       icon: <Globe className="w-4 h-4" /> },
];

export default function HomePage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  const categories = ['All', 'Social Media', 'Finance & Business', 'SEO & Webmaster', 'Developer', 'Lifestyle', 'Date & Time'];

  const filtered = ALL_TOOLS.filter((t) => {
    const mq = t.name.toLowerCase().includes(q.toLowerCase()) || t.description.toLowerCase().includes(q.toLowerCase());
    const mc = cat === 'All' || t.category === cat;
    return mq && mc;
  });

  return (
    <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══ HERO ═══════════════════════════════════════════ */}
        <section className="relative pt-14 pb-20 text-center">
          {/* grid bg */}
          <div className="absolute inset-0 grid-bg opacity-40 rounded-3xl pointer-events-none" />
          {/* orbs */}
          <div className="orb w-[520px] h-[520px] -top-32 left-1/2 -translate-x-1/2" style={{ background: 'var(--orb-1)' }} />
          <div className="orb w-80 h-80 top-20 -right-20" style={{ background: 'var(--orb-2)' }} />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Pill badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase mb-6 fade-up"
              style={{
                background: 'rgba(139,92,246,0.1)',
                borderColor: 'var(--border-accent)',
                color: 'var(--accent-1)',
              }}
            >
              <span className="pulse-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--accent-1)' }} />
              Practical tools for work, business, and everyday decisions
            </div>

            {/* H1 */}
            <h1
              className="text-4xl sm:text-6xl font-bold leading-[1.08] mb-6 fade-up stagger-1"
              style={{ color: 'var(--text-1)' }}
            >
              Free online calculators for{' '}
              <span className="shimmer-text">creators, freelancers, and small businesses</span>
            </h1>

            <p
              className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10 fade-up stagger-2"
              style={{ color: 'var(--text-2)' }}
            >
              Estimate creator income, price your freelance work, check business margins, and build useful web tools. Get a result in your browser without creating an account.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10 fade-up stagger-3">
              {STATS.map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-sm">
                  <span style={{ color: 'var(--accent-1)' }}>{s.icon}</span>
                  <span className="font-bold" style={{ color: 'var(--text-1)' }}>{s.value}</span>
                  <span style={{ color: 'var(--text-3)' }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="max-w-xl mx-auto relative group fade-up stagger-4">
              <div
                className="absolute inset-0 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'var(--accent-glow)' }}
              />
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 pointer-events-none" style={{ color: 'var(--text-3)' }} />
                <input
                  type="search"
                  id="hero-search"
                  aria-label="Search calculators and tools"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search 13+ free tools..."
                  className="form-input form-input-with-icon"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══ AD SLOT ════════════════════════════════════════ */}
        <AdPlaceholder slot="leaderboard" />

        {/* ══ FLAGSHIP BANNER ════════════════════════════════ */}
        <div
          className="mb-16 relative overflow-hidden rounded-3xl"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 28px rgba(25,55,39,0.06)',
          }}
        >
          <div className="absolute inset-0 grid-bg opacity-25" />
          <div className="orb w-80 h-80 -top-16 -right-16" style={{ background: 'var(--orb-1)' }} />
          <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,var(--accent-1),transparent)' }} />

          <div className="relative z-10 p-7 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-widest mb-4"
                style={{ background: 'rgba(244,63,94,0.1)', borderColor: 'rgba(244,63,94,0.3)', color: '#f43f5e' }}
              >
                <Flame className="w-3.5 h-3.5 fill-current" />
                Featured Flagship Tool
              </div>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-3" style={{ color: 'var(--text-1)' }}>
                YouTube Money &amp;{' '}
                <span className="shimmer-text">RPM Calculator</span>
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: 'var(--text-2)' }}>
                Explore estimated ad revenue across 12 niches and audience regions, then browse topic prompts generated from built-in patterns.
              </p>
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-2)' }}>
                {['Long-form & Shorts', 'Brand Sponsorship Predictor', 'No account required'].map((f) => (
                  <span key={f} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#10b981' }} /> {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href="/tools/youtube-money-calculator" className="btn-primary text-base px-8 py-4">
                <Zap className="w-5 h-5" />
                Launch Calculator
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ══ CATEGORY FILTER ════════════════════════════════ */}
        <div id="categories" className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Browse All Tools</h2>
            <span className="text-xs font-medium" style={{ color: 'var(--text-3)' }} aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'tool' : 'tools'}
            </span>
          </div>
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 ${cat === c ? 'pill-active' : ''}`}
                style={cat !== c ? {
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-3)',
                } : {}}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* ══ TOOLS GRID ═════════════════════════════════════ */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {filtered.map((tool, i) => {
              const meta = CAT_META[tool.category];
              return (
                <div
                  key={tool.id}
                  className={`glass glass-hover rounded-2xl p-6 flex flex-col justify-between group fade-up ${!tool.isLive ? 'opacity-50 pointer-events-none' : ''}`}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {/* Card top */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                        style={{ background: meta?.bg || 'var(--bg-card)', border: `1px solid ${meta?.color || 'var(--border)'}22` }}
                      >
                        {tool.icon}
                      </div>
                      {/* Status badge */}
                      {tool.isLive ? (
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border"
                          style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.25)', color: '#10b981' }}
                        >
                          <span className="pulse-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#10b981' }} />
                          Live
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border"
                          style={{ background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}
                        >
                          <Clock className="w-3 h-3" /> Soon
                        </span>
                      )}
                    </div>

                    {/* Category chip */}
                    <span className="chip mb-2 inline-block" style={{ color: meta?.color || 'var(--text-3)' }}>
                      {tool.category}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-base font-bold mb-2 leading-snug transition-colors duration-200"
                      style={{ color: 'var(--text-1)' }}
                    >
                      {tool.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                      {tool.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="pt-5">
                    {tool.isLive ? (
                      <Link
                        href={tool.slug}
                        className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold border transition-all duration-300"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border)',
                          color: 'var(--text-2)',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = 'var(--accent-1)';
                          el.style.borderColor = 'var(--accent-1)';
                          el.style.color = '#fff';
                          el.style.boxShadow = '0 0 20px var(--accent-glow)';
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = 'var(--bg-card)';
                          el.style.borderColor = 'var(--border)';
                          el.style.color = 'var(--text-2)';
                          el.style.boxShadow = 'none';
                        }}
                      >
                        <span>Open Calculator</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div
                        className="w-full py-3 text-center text-xs font-semibold rounded-xl"
                        style={{ background: 'var(--bg-card)', color: 'var(--text-3)' }}
                      >
                        In Development
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass rounded-2xl px-6 py-14 text-center mb-20">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>No tools match that search</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-3)' }}>Try another phrase or clear your filters.</p>
            <button
              type="button"
              onClick={() => { setQ(''); setCat('All'); }}
              className="btn-primary mx-auto"
            >
              <Sparkles className="w-4 h-4" /> Show all tools
            </button>
          </div>
        )}

        {/* ══ WHY IT'S FREE ══════════════════════════════════ */}
        <section id="about" className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ background: 'rgba(6,182,212,0.1)', borderColor: 'rgba(6,182,212,0.3)', color: '#06b6d4' }}
            >
              <TrendingUp className="w-3.5 h-3.5" /> Why it's free
            </div>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-3" style={{ color: 'var(--text-1)' }}>
              Built for creators,<br />
              <span className="shimmer-text">not paywalls</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              We believe creators, freelancers, and builders shouldn't pay $30/month subscriptions just to calculate their revenue and metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Zap className="w-5 h-5" />,
                accent: '#8b5cf6',
                title: 'Instant browser calculations',
                body: 'Calculations execute in milliseconds right inside your browser — no server round-trips, no loading spinners.',
              },
              {
                icon: <Sparkles className="w-5 h-5" />,
                accent: '#f59e0b',
                title: 'Useful next steps',
                body: 'Some tools pair results with locally generated prompts or practical summaries, not just a number.',
              },
              {
                icon: <ShieldCheck className="w-5 h-5" />,
                accent: '#10b981',
                title: 'Your data stays local',
                body: 'All calculator inputs are processed entirely on your device and never sent to our servers.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="glass rounded-2xl p-7 transition-all duration-300 group hover:scale-[1.02]"
                style={{ boxShadow: `0 0 40px ${card.accent}15` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ background: `${card.accent}18`, color: card.accent }}
                >
                  {card.icon}
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-1)' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CLOSING CTA STRIP ══════════════════════════════ */}
        <div
          className="mb-20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.05))',
            border: '1px solid var(--border)',
          }}
        >
          <div>
            <p className="font-bold" style={{ color: 'var(--text-1)' }}>Free, instant, no account required</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>
              No sign-ups. Just quick estimates and practical results you can use to plan your next step.
            </p>
          </div>
          <Link href="/#categories" className="btn-primary flex-shrink-0">
            Browse All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
