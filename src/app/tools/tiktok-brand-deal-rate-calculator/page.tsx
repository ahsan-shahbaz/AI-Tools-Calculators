'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Copy,
  Check,
  Sparkles,
  BadgeDollarSign,
  TrendingUp,
  Users,
  BriefcaseBusiness
} from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';
import ToolStructuredData, { FaqItem } from '@/components/ToolStructuredData';
import RelatedTools from '@/components/RelatedTools';
import { calculateTikTokBrandDealRate } from '@/lib/tiktok-brand-deal-calculator';

const TIKTOK_FAQS: FaqItem[] = [
  {
    question: 'How do you calculate your TikTok brand deal rate?',
    answer: 'A standard creator pricing formula combines reach and engagement: (Average Video Views ÷ 1,000) × $20–$35 Base CPM × Niche Authority Multiplier × Deliverable Package Tier.',
  },
  {
    question: 'How much should you charge per TikTok video sponsored post?',
    answer: 'Nano-influencers (5k–25k followers) typically charge $50–$250; Micro-influencers (25k–100k) charge $250–$1,000; Mid-tier creators (100k–500k) charge $1,000–$3,500; and Macro-influencers (500k+) charge $3,500–$10,000+ per video.',
  },
  {
    question: 'Which TikTok niches command the highest sponsor pricing?',
    answer: 'Finance, Software & SaaS, Beauty, and E-commerce brands pay premium sponsorship rates (1.5x to 2.2x multipliers) because viewer purchase intent is significantly higher than entertainment or dance content.',
  },
  {
    question: 'Should I charge extra for Spark Ads authorization or whitelisting?',
    answer: 'Yes! Granting 30-day or 60-day Spark Ads advertising authorization rights typically justifies a 30% to 50% licensing surcharge on top of your organic video creation fee.',
  },
];

export default function TikTokBrandDealRateCalculator() {
  const [followers, setFollowers] = useState<number>(250000);
  const [engagementRate, setEngagementRate] = useState<number>(6.5);
  const [avgViewsPerPost, setAvgViewsPerPost] = useState<number>(180000);
  const [nicheMultiplier, setNicheMultiplier] = useState<number>(1.8);
  const [postsPerMonth, setPostsPerMonth] = useState<number>(12);
  const [packageType, setPackageType] = useState<'starter' | 'standard' | 'premium'>('standard');
  const [copied, setCopied] = useState(false);

  const calculation = useMemo(() => calculateTikTokBrandDealRate({
    followers,
    engagementRate,
    avgViewsPerPost,
    nicheMultiplier,
    postsPerMonth,
    packageType,
  }), [followers, engagementRate, avgViewsPerPost, nicheMultiplier, postsPerMonth, packageType]);

  const handleCopy = () => {
    const text = `TikTok Brand Deal Estimate\nPackage: ${calculation.packageLabel}\nEstimated rate: $${calculation.estimatedRate}\nMonthly potential: $${calculation.monthlyPotential}\nEngagement tier: ${calculation.engagementTier}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 sm:py-12">
      <ToolStructuredData faqs={TIKTOK_FAQS} slug="/tools/tiktok-brand-deal-rate-calculator" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-[var(--accent-1)] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/#categories" className="hover:text-[var(--accent-1)] transition-colors">Social Media</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">TikTok Brand Deal Rate Calculator</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BadgeDollarSign className="w-4 h-4 text-cyan-600" />
            Influencer Pricing Estimate
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            TikTok Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600">Deal Rate Calculator</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Model the expected cost of a creator partnership based on reach, engagement quality, and niche demand.
          </p>
        </div>

        <AdPlaceholder slot="leaderboard" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-5">
                <Users className="w-5 h-5 text-cyan-600" />
                Creator Profile
              </h2>

              <div className="space-y-5">
                <div>
                  <label htmlFor="tiktok-followers" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Followers</label>
                  <input
                    id="tiktok-followers"
                    type="number"
                    min="0"
                    step="1000"
                    value={followers}
                    onChange={(e) => setFollowers(Number(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="tiktok-engagement-rate" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Engagement rate (%)</label>
                  <input
                    id="tiktok-engagement-rate"
                    type="number"
                    min="0"
                    max="50"
                    step="0.1"
                    value={engagementRate}
                    onChange={(e) => setEngagementRate(Number(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="tiktok-average-views" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Avg. views per post</label>
                  <input
                    id="tiktok-average-views"
                    type="number"
                    min="0"
                    step="1000"
                    value={avgViewsPerPost}
                    onChange={(e) => setAvgViewsPerPost(Number(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="tiktok-niche-multiplier" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Niche multiplier</label>
                  <input
                    id="tiktok-niche-multiplier"
                    type="number"
                    min="0.5"
                    max="5"
                    step="0.1"
                    value={nicheMultiplier}
                    onChange={(e) => setNicheMultiplier(Number(e.target.value) || 1)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="tiktok-posts-per-month" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Posts per month</label>
                  <input
                    id="tiktok-posts-per-month"
                    type="number"
                    min="1"
                    max="50"
                    value={postsPerMonth}
                    onChange={(e) => setPostsPerMonth(Number(e.target.value) || 1)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Package type</label>
                  <div role="group" aria-label="Package type" className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
                    {(['starter', 'standard', 'premium'] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={packageType === option}
                        onClick={() => setPackageType(option)}
                        className={`py-2 text-[11px] font-bold rounded-lg transition-all ${packageType === option ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <BriefcaseBusiness className="w-4 h-4" />
                  Deal Valuation
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Quote'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Package</p>
                  <p className="text-xl font-black text-white mt-2">{calculation.packageLabel}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Engagement Tier</p>
                  <p className="text-xl font-black text-emerald-400 mt-2">{calculation.engagementTier}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Estimated Rate</p>
                  <p className="text-2xl font-black text-cyan-300 mt-2">${calculation.estimatedRate.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Monthly Potential</p>
                  <p className="text-2xl font-black text-amber-300 mt-2">${calculation.monthlyPotential.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-cyan-600" />
                Pricing Guidance
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <li>• Profiles with strong engagement and niche authority can command premium package pricing.</li>
                <li>• The average TikTok brand deal is often driven by engagement quality more than raw follower count.</li>
                <li>• Premium campaigns usually justify higher rates because they include extra deliverables and exclusivity.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEO FAQ Section */}
        <section className="mt-12 pt-10 border-t border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Frequently Asked Questions About TikTok Sponsorships
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Industry guidelines on pricing, brand negotiations, and usage rights.
              </p>
            </div>

            <div className="space-y-4">
              {TIKTOK_FAQS.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contextual internal links for SEO and discovery */}
        <RelatedTools />

      </div>
    </div>
  );
}
