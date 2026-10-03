'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Sparkles, Search, ArrowRight, ShieldCheck, Zap, Cpu, Globe, TrendingUp, Lock, ChevronDown,
} from 'lucide-react';
import { ALL_TOOLS } from '@/data/youtube-data';
import { CATEGORIES, getCategoryByName } from '@/data/categories';
import AdPlaceholder from '@/components/AdPlaceholder';
import ToolCard from '@/components/ToolCard';
import { SITE_URL } from '@/lib/site';

const POPULAR_SLUGS = [
  '/tools/mortgage-payment-calculator',
  '/tools/compound-interest-calculator',
  '/tools/percentage-calculator',
  '/tools/freelance-rate-calculator',
  '/tools/youtube-money-calculator',
  '/tools/bmi-calculator',
];

const HOME_FAQS = [
  {
    question: 'Are these calculators really free?',
    answer: 'Yes. Every calculator is free to use with no account, no sign-up and no paywall. The site may show ads or labelled affiliate links to cover running costs.',
  },
  {
    question: 'Is my data private?',
    answer: 'Calculator inputs are processed in your browser and are not sent to our servers or stored in a database. When you copy a result link, your numbers are contained in that link.',
  },
  {
    question: 'How accurate are the results?',
    answer: 'Each calculator uses a standard or clearly stated formula and shows its assumptions so you can check and change them. Results are estimates for planning, not financial, tax, legal or medical advice, and real outcomes will differ.',
  },
  {
    question: 'Can I share or save my result?',
    answer: 'Yes. On calculators with shareable results the page address updates as you type, so copying the link or using the share buttons sends the same numbers to someone else or lets you bookmark them.',
  },
  {
    question: 'What calculators can I use here?',
    answer: `There are ${ALL_TOOLS.length} calculators covering mortgages and savings, freelance and business pricing, creator earnings, health, dates and developer tools. New calculators are added regularly.`,
  },
];

const STATS = [
  { value: `${ALL_TOOLS.length}`, label: 'Free calculators', icon: <Cpu className="w-4 h-4" /> },
  { value: '100%', label: 'Private, in your browser', icon: <ShieldCheck className="w-4 h-4" /> },
  { value: '0', label: 'Sign-ups needed', icon: <Zap className="w-4 h-4" /> },
  { value: `${CATEGORIES.length}`, label: 'Categories', icon: <Globe className="w-4 h-4" /> },
];

export default function HomePage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  // Supports the ?q= search link advertised in the site's SearchAction schema.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('q');
    if (initial) setQ(initial.slice(0, 80));
  }, []);

  const categories = ['All', ...CATEGORIES.map((c) => c.name as string)];

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ALL_TOOLS.filter((t) => {
      const mq = !needle || t.name.toLowerCase().includes(needle) || t.description.toLowerCase().includes(needle) || t.category.toLowerCase().includes(needle);
      const mc = cat === 'All' || t.category === cat;
      return mq && mc && t.isLive;
    });
  }, [q, cat]);

  const popular = POPULAR_SLUGS.map((s) => ALL_TOOLS.find((t) => t.slug === s)).filter((t): t is NonNullable<typeof t> => Boolean(t));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: 'ToolCalculators free online calculators',
        itemListElement: ALL_TOOLS.filter((t) => t.isLive).map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}${t.slug}`,
          name: t.name,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: HOME_FAQS.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };

  return (
    <div className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══ HERO ═══════════════════════════════════════════ */}
        <section className="relative pt-12 pb-16 text-center">
          <div className="absolute inset-0 grid-bg opacity-40 rounded-3xl pointer-events-none" />
          <div className="orb w-[520px] h-[520px] -top-32 left-1/2 -translate-x-1/2" style={{ background: 'var(--orb-1)' }} />
          <div className="orb w-80 h-80 top-20 -right-20" style={{ background: 'var(--orb-2)' }} />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase mb-6 fade-up"
              style={{ background: 'var(--accent-glow)', borderColor: 'var(--border-accent)', color: 'var(--accent-1)' }}
            >
              <Lock className="w-3 h-3" />
              Private · Free · No sign-up
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold leading-[1.08] mb-6 fade-up stagger-1" style={{ color: 'var(--text-1)' }}>
              Free online calculators for{' '}
              <span className="shimmer-text">money, business &amp; creators</span>
            </h1>

            <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8 fade-up stagger-2" style={{ color: 'var(--text-2)' }}>
              Work out a mortgage payment, plan savings growth, price your freelance work or estimate YouTube income. Every calculator shows its formula, so you can trust and check the answer.
            </p>

            <div className="max-w-xl mx-auto relative group fade-up stagger-3">
              <div
                className="absolute inset-0 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'var(--accent-glow)' }}
              />
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 pointer-events-none" style={{ color: 'var(--text-3)' }} />
                <input
                  type="search"
                  id="hero-search"
                  aria-label="Search calculators"
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    if (e.target.value) document.getElementById('all-tools')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  placeholder={`Search ${ALL_TOOLS.length} calculators: mortgage, BMI, YouTube...`}
                  className="form-input form-input-with-icon"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 fade-up stagger-4">
              {STATS.map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-sm">
                  <span style={{ color: 'var(--accent-1)' }}>{s.icon}</span>
                  <span className="font-bold" style={{ color: 'var(--text-1)' }}>{s.value}</span>
                  <span style={{ color: 'var(--text-3)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AdPlaceholder slot="leaderboard" />

        {/* ══ POPULAR ════════════════════════════════════════ */}
        <section aria-labelledby="popular-heading" className="mb-16">
          <div className="flex items-end justify-between mb-5">
            <h2 id="popular-heading" className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
              Most popular calculators
            </h2>
            <a href="#all-tools" className="text-sm font-semibold hidden sm:inline-flex items-center gap-1" style={{ color: 'var(--accent-1)' }}>
              See all {ALL_TOOLS.length} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {popular.map((t) => <ToolCard key={t.id} tool={t} />)}
          </div>
        </section>

        {/* ══ CATEGORY FILTER ════════════════════════════════ */}
        <div id="all-tools" className="mb-8 scroll-mt-24">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Browse all calculators</h2>
            <span className="text-xs font-medium" style={{ color: 'var(--text-3)' }} aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'tool' : 'tools'}
            </span>
          </div>
          <div id="categories" role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 ${cat === c ? 'pill-active' : ''}`}
                style={cat !== c ? { background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-3)' } : {}}
              >
                {c}
              </button>
            ))}
          </div>
          {cat !== 'All' && getCategoryByName(cat) && (
            <p className="mt-3 text-sm">
              <Link href={`/category/${getCategoryByName(cat)!.slug}`} className="font-semibold inline-flex items-center gap-1" style={{ color: 'var(--accent-1)' }}>
                Open the {cat} page <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          )}
        </div>

        {/* ══ TOOLS GRID ═════════════════════════════════════ */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {filtered.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
          </div>
        ) : (
          <div className="glass rounded-2xl px-6 py-14 text-center mb-20">
            <div className="text-4xl mb-4" aria-hidden="true">🔍</div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>No calculators match that search</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-3)' }}>Try another phrase or clear your filters.</p>
            <button type="button" onClick={() => { setQ(''); setCat('All'); }} className="btn-primary mx-auto">
              <Sparkles className="w-4 h-4" /> Show all calculators
            </button>
          </div>
        )}

        <AdPlaceholder slot="in-feed" className="mb-16" />

        {/* ══ WHY USE US ═════════════════════════════════════ */}
        <section id="about" className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ background: 'var(--accent-glow)', borderColor: 'var(--border-accent)', color: 'var(--accent-1)' }}
            >
              <TrendingUp className="w-3.5 h-3.5" /> Why people use it
            </div>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-3" style={{ color: 'var(--text-1)' }}>
              Answers you can <span className="shimmer-text">check for yourself</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              No black boxes. Each calculator explains the formula, works through an example, and lets you change the assumptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: <Zap className="w-5 h-5" />, accent: '#8b5cf6', title: 'Instant results', body: 'Results update as you type, right in your browser, with no loading screens and no waiting.' },
              { icon: <Sparkles className="w-5 h-5" />, accent: '#f59e0b', title: 'Method and worked example', body: 'Every tool shows how the number is calculated, with an example you can verify by hand.' },
              { icon: <ShieldCheck className="w-5 h-5" />, accent: '#10b981', title: 'Private by design', body: 'Inputs stay on your device. There are no accounts, and shareable links carry your numbers, not us.' },
            ].map((card) => (
              <div key={card.title} className="glass rounded-2xl p-7" style={{ boxShadow: `0 0 40px ${card.accent}15` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${card.accent}18`, color: card.accent }}>
                  {card.icon}
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-1)' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ FAQ ════════════════════════════════════════════ */}
        <section id="faq" aria-labelledby="faq-heading" className="mb-20 max-w-3xl mx-auto scroll-mt-24">
          <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black mb-6 text-center" style={{ color: 'var(--text-1)' }}>
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {HOME_FAQS.map((f) => (
              <details key={f.question} className="glass rounded-2xl p-5 group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold" style={{ color: 'var(--text-1)' }}>
                  {f.question}
                  <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform group-open:rotate-180" style={{ color: 'var(--text-3)' }} />
                </summary>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
