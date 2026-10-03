'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Copy,
  Check,
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  BarChart3
} from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';
import ToolStructuredData, { FaqItem } from '@/components/ToolStructuredData';
import { calculateInstagramEngagementRate } from '@/lib/instagram-engagement-calculator';

const INSTAGRAM_FAQS: FaqItem[] = [
  {
    question: 'What is a good Instagram engagement rate in 2026?',
    answer: 'The average Instagram engagement rate ranges from 1.5% to 3.5%. Rates between 4% and 7% are considered strong, while rates above 7% are exceptional, often seen on niche micro-influencer accounts with devoted communities.',
  },
  {
    question: 'How is Instagram engagement rate calculated?',
    answer: 'The standard calculation formula is: ((Total Likes + Comments + (Shares × 2)) ÷ Total Followers) × 100. Shares receive a 2x weighting because they represent active peer-to-peer distribution.',
  },
  {
    question: 'Why do shares and saves matter more than likes?',
    answer: 'Instagram’s recommendation algorithm prioritizes direct message shares and bookmark saves over passive double-tap likes because they indicate genuine value, utility, and emotional resonance.',
  },
  {
    question: 'How can creators and brands boost their engagement rate?',
    answer: 'Host interactive Story polls and Q&As, ask specific discussion prompts in captions, respond to all comments within the first 60 minutes of posting, and publish educational multi-slide carousels.',
  },
];

export default function InstagramEngagementRateTool() {
  const [followers, setFollowers] = useState<number>(35000);
  const [avgLikes, setAvgLikes] = useState<number>(620);
  const [avgComments, setAvgComments] = useState<number>(90);
  const [avgShares, setAvgShares] = useState<number>(60);
  const [postsPerMonth, setPostsPerMonth] = useState<number>(16);
  const [copied, setCopied] = useState(false);

  const calculation = useMemo(() => calculateInstagramEngagementRate({
    followers,
    avgLikes,
    avgComments,
    avgShares,
    postsPerMonth,
  }), [followers, avgLikes, avgComments, avgShares, postsPerMonth]);

  const handleCopy = () => {
    const text = `Instagram Engagement Snapshot\nEngagement rate: ${calculation.engagementRate}%\nQuality score: ${calculation.qualityScore}/100\nMonthly engagements: ${calculation.monthlyEngagements.toLocaleString()}\nAudience tier: ${calculation.audienceTier}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 sm:py-12">
      <ToolStructuredData faqs={INSTAGRAM_FAQS} slug="/tools/instagram-engagement-rate-tool" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-[var(--accent-1)] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/#categories" className="hover:text-[var(--accent-1)] transition-colors">Social Media</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">Instagram Engagement Rate Tool</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-4 h-4 text-pink-600" />
            Audience Quality Score
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Instagram <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-orange-500">Engagement Rate Tool</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Measure how engaged your audience is by combining likes, comments, and shares into a single engagement snapshot.
          </p>
        </div>

        <AdPlaceholder slot="leaderboard" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-5">
                <Heart className="w-5 h-5 text-pink-600" />
                Engagement Data
              </h2>

              <div className="space-y-5">
                <div>
                  <label htmlFor="instagram-followers" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Followers</label>
                  <input
                    id="instagram-followers"
                    type="number"
                    min="0"
                    step="100"
                    value={followers}
                    onChange={(e) => setFollowers(Number(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="instagram-average-likes" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Avg. likes per post</label>
                  <input
                    id="instagram-average-likes"
                    type="number"
                    min="0"
                    step="10"
                    value={avgLikes}
                    onChange={(e) => setAvgLikes(Number(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="instagram-average-comments" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Avg. comments per post</label>
                  <input
                    id="instagram-average-comments"
                    type="number"
                    min="0"
                    step="5"
                    value={avgComments}
                    onChange={(e) => setAvgComments(Number(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="instagram-average-shares" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Avg. shares per post</label>
                  <input
                    id="instagram-average-shares"
                    type="number"
                    min="0"
                    step="5"
                    value={avgShares}
                    onChange={(e) => setAvgShares(Number(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="instagram-posts-per-month" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Posts per month</label>
                  <input
                    id="instagram-posts-per-month"
                    type="number"
                    min="1"
                    max="60"
                    value={postsPerMonth}
                    onChange={(e) => setPostsPerMonth(Number(e.target.value) || 1)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Engagement Snapshot
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Report'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Engagement Rate</p>
                  <p className="text-2xl font-black text-pink-300 mt-2">{calculation.engagementRate}%</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Audience Tier</p>
                  <p className="text-xl font-black text-emerald-400 mt-2">{calculation.audienceTier}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Per Post Engagements</p>
                  <p className="text-2xl font-black text-cyan-300 mt-2">{calculation.totalEngagementsPerPost.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Monthly Engagements</p>
                  <p className="text-2xl font-black text-amber-300 mt-2">{calculation.monthlyEngagements.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-slate-800 p-4 border border-slate-700">
                <p className="text-xs text-slate-400">Quality score</p>
                <div className="mt-3 h-2.5 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 rounded-full" style={{ width: `${calculation.qualityScore}%` }} />
                </div>
                <p className="mt-2 text-sm font-bold text-white">{calculation.qualityScore}/100</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-pink-600" />
                Interpretation
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <li>• Engagement rate above 5% usually signals a highly active, relevant audience.</li>
                <li>• Shares and comments often matter more than likes for brand partnerships and algorithm reach.</li>
                <li>• Higher engagement with a smaller audience usually beats a larger but passive following.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEO FAQ Section */}
        <section className="mt-12 pt-10 border-t border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Frequently Asked Questions About Instagram Engagement
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Benchmarks, formulas, and actionable tactics to improve feed interactions.
              </p>
            </div>

            <div className="space-y-4">
              {INSTAGRAM_FAQS.map((faq, idx) => (
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

      </div>
    </div>
  );
}
