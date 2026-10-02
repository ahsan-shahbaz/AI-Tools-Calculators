'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Copy,
  Check,
  Sparkles,
  Play,
  TrendingUp,
  CircleDollarSign,
  BarChart3,
  Video
} from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';
import ToolStructuredData, { FaqItem } from '@/components/ToolStructuredData';
import RelatedTools from '@/components/RelatedTools';
import { calculateYouTubeShortsEarnings } from '@/lib/youtube-shorts-calculator';

const SHORTS_FAQS: FaqItem[] = [
  {
    question: 'How much does YouTube pay for 1 million Shorts views?',
    answer: 'YouTube Shorts typically pay between $30 and $90 per 1,000,000 views (an effective RPM of $0.03 to $0.09). Payouts depend on your viewers’ geographic location, the niche, and whether copyrighted commercial music was used in the video.',
  },
  {
    question: 'How does the YouTube Shorts revenue share model work?',
    answer: 'YouTube pools ad revenue generated between Shorts in the feed. After deducting music licensing costs, 45% of the allocated Creator Pool is distributed to creators based on their proportion of total platform views in each country.',
  },
  {
    question: 'How does viewer retention impact Shorts earnings?',
    answer: 'Shorts that maintain over 80–100% average percentage viewed (APV) trigger algorithmic velocity, exposing the video to higher-bidding advertiser inventory and dramatically increasing aggregate monthly earnings.',
  },
  {
    question: 'What is the ideal upload frequency for YouTube Shorts?',
    answer: 'Most successful creators post 1 to 2 high-quality Shorts per day (7 to 14 per week). Consistent posting gives the algorithm sufficient signals to find your target viewer avatar.',
  },
];

export default function YouTubeShortsEarningsEstimator() {
  const [dailyShortViews, setDailyShortViews] = useState<number>(25000);
  const [avgCpm, setAvgCpm] = useState<number>(18);
  const [videosPerWeek, setVideosPerWeek] = useState<number>(14);
  const [revenueShare, setRevenueShare] = useState<number>(55);
  const [retentionBonus, setRetentionBonus] = useState<number>(15);
  const [copied, setCopied] = useState(false);

  const inputs = useMemo(() => ({
    dailyShortViews,
    avgCpm,
    videosPerWeek,
    revenueShare,
    retentionBonus,
  }), [dailyShortViews, avgCpm, videosPerWeek, revenueShare, retentionBonus]);

  const calculation = useMemo(() => calculateYouTubeShortsEarnings(inputs), [inputs]);

  const handleCopy = () => {
    const text = `YouTube Shorts Earnings Estimate\nMonthly views: ${calculation.monthlyViews.toLocaleString()}\nEffective CPM: $${calculation.effectiveCpm}\nMonthly earnings: $${calculation.monthlyEarnings}\nAnnual earnings: $${calculation.annualEarnings}\nPer video average: $${calculation.earningsPerVideo}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 sm:py-12">
      <ToolStructuredData faqs={SHORTS_FAQS} slug="/tools/youtube-shorts-earnings-estimator" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-[var(--accent-1)] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/#categories" className="hover:text-[var(--accent-1)] transition-colors">Social Media</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">YouTube Shorts Earnings Estimator</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Video className="w-4 h-4 text-red-600" />
            Shorts Revenue Forecast
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            YouTube Shorts <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-orange-600">Earnings Estimator</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Estimate your monthly shorts revenue using average CPM, retention lift, and short-form volume assumptions.
          </p>
        </div>

        <AdPlaceholder slot="leaderboard" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-5">
                <Play className="w-5 h-5 text-red-600" />
                Shorts Revenue Inputs
              </h2>

              <div className="space-y-5">
                <div>
                  <label htmlFor="shorts-daily-views" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Daily views</label>
                  <input
                    id="shorts-daily-views"
                    type="number"
                    min="0"
                    step="100"
                    value={dailyShortViews}
                    onChange={(e) => setDailyShortViews(Number(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="shorts-average-cpm" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Average CPM ($)</label>
                  <input
                    id="shorts-average-cpm"
                    type="number"
                    min="0"
                    step="0.1"
                    value={avgCpm}
                    onChange={(e) => setAvgCpm(Number(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="shorts-videos-per-week" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Videos per week</label>
                  <input
                    id="shorts-videos-per-week"
                    type="number"
                    min="1"
                    max="100"
                    value={videosPerWeek}
                    onChange={(e) => setVideosPerWeek(Number(e.target.value) || 1)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="shorts-revenue-share" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">AdSense revenue share (%)</label>
                  <input
                    id="shorts-revenue-share"
                    type="number"
                    min="0"
                    max="100"
                    value={revenueShare}
                    onChange={(e) => setRevenueShare(Number(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="shorts-retention-bonus" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Retention bonus uplift (%)</label>
                  <input
                    id="shorts-retention-bonus"
                    type="number"
                    min="0"
                    max="100"
                    value={retentionBonus}
                    onChange={(e) => setRetentionBonus(Number(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Revenue Projection
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Summary'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Monthly Views</p>
                  <p className="text-2xl font-black text-white mt-2">{calculation.monthlyViews.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Daily Earnings</p>
                  <p className="text-2xl font-black text-emerald-400 mt-2">${calculation.dailyEarnings.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Monthly Earnings</p>
                  <p className="text-2xl font-black text-emerald-400 mt-2">${calculation.monthlyEarnings.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Yearly Earnings</p>
                  <p className="text-2xl font-black text-emerald-400 mt-2">${calculation.annualEarnings.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl bg-slate-800 p-4 border border-slate-700">
                  <p className="text-xs text-slate-400">Effective CPM</p>
                  <p className="mt-2 text-xl font-bold text-amber-300">${calculation.effectiveCpm}</p>
                </div>
                <div className="rounded-xl bg-slate-800 p-4 border border-slate-700">
                  <p className="text-xs text-slate-400">Per-Video Avg.</p>
                  <p className="mt-2 text-xl font-bold text-cyan-300">${calculation.earningsPerVideo}</p>
                </div>
                <div className="rounded-xl bg-slate-800 p-4 border border-slate-700">
                  <p className="text-xs text-slate-400">Weekly Uploads</p>
                  <p className="mt-2 text-xl font-bold text-violet-300">{videosPerWeek}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-red-600" />
                Strategic Notes
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <li>• Higher retention and stronger watch-through rates lift CPM dramatically for Shorts creators.</li>
                <li>• A consistent upload cadence compounds monthly view volume faster than sporadic posting.</li>
                <li>• Shorts monetization is highly opportunity-based, so testing 3 to 5 retention hooks can materially change earnings.</li>
              </ul>
            </div>

            <details className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <summary className="cursor-pointer text-base font-bold text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                How this estimate works
              </summary>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed list-disc pl-5">
                <li><strong className="text-slate-800">CPM:</strong> Uses the average CPM you enter (default $18). There is no built-in market CPM range or rate lookup.</li>
                <li><strong className="text-slate-800">Retention uplift:</strong> Multiplies your CPM by 1 plus the entered uplift percentage. It is a direct assumption, not a measurement of actual audience retention. Effective CPM has a $0.01 minimum.</li>
                <li><strong className="text-slate-800">Revenue share:</strong> Multiplies the view-based estimate by your entered share percentage (default 55%). The share is an editable assumption and is not verified against your channel or current YouTube terms.</li>
                <li><strong className="text-slate-800">Time periods:</strong> Monthly views use daily views × 30.41 days. Annual earnings project the monthly estimate across 12 months.</li>
                <li><strong className="text-slate-800">Per-video average:</strong> Divides monthly earnings by weekly uploads × 4.35 weeks, assuming the upload pace stays consistent.</li>
                <li>The displayed monthly view estimate is rounded to a whole view; dollar estimates are rounded to cents.</li>
              </ul>
              <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
                This simplified estimate is for planning, not a YouTube payout forecast. Actual Shorts revenue can vary with eligible views, audience location, music and rights, ad demand, and YouTube&apos;s current revenue rules. Check YouTube Studio for your channel&apos;s reported earnings.
              </p>
            </details>
          </div>
        </div>

        {/* SEO FAQ Section */}
        <section className="mt-12 pt-10 border-t border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Frequently Asked Questions About YouTube Shorts Monetization
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Essential insights into CPM, revenue share pools, and algorithmic distribution.
              </p>
            </div>

            <div className="space-y-4">
              {SHORTS_FAQS.map((faq, idx) => (
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
