'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  TrendingUp,
  DollarSign,
  Tv,
  Globe,
  Award,
  HelpCircle,
  Copy,
  Check,
  Zap,
  Layers,
  ChevronRight,
  Flame,
  Lightbulb,
  Share2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { YOUTUBE_NICHES, COUNTRY_TIERS } from '@/data/youtube-data';
import { calculateYouTubeEarnings, calculateViewsForMilestone } from '@/lib/youtube-calculator';
import { generateViralTopics } from '@/lib/ai-generator';
import { VideoFormat, NicheInfo, CountryTier, AIStrategyResponse } from '@/types';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCard from '@/components/AffiliateCard';
import ToolStructuredData, { FaqItem } from '@/components/ToolStructuredData';
import RelatedTools from '@/components/RelatedTools';

const YOUTUBE_FAQS: FaqItem[] = [
  {
    question: 'What is the difference between CPM and RPM?',
    answer: "CPM (Cost Per Mille) is the cost an advertiser pays for every 1,000 ad impressions before YouTube takes its 45% revenue cut. RPM (Revenue Per Mille) is your true take-home earning per 1,000 video views after YouTube's cut, and it factors in views that did not show an ad. RPM is the only metric you should use to forecast realistic earnings.",
  },
  {
    question: 'Which YouTube niches have the highest RPM in 2026?',
    answer: 'Financial niches (Investing, Crypto, Credit Cards, Real Estate) consistently command the highest RPMs—often between $12.00 and $25.00+ per 1,000 views. Tech, SaaS software reviews, and business tutorials rank second ($8.00 - $18.00). Gaming and comedy entertainment have lower RPMs ($1.50 - $4.00) but compensate with much higher viral view volumes.',
  },
  {
    question: 'Why do YouTube Shorts earn so much less than Long-form videos?',
    answer: 'YouTube Shorts monetize via a pooled revenue sharing model rather than dedicated pre-roll/mid-roll ad auctions. While long-form videos earn $3.00 to $15.00+ RPM, YouTube Shorts typically yield between $0.03 and $0.09 per 1,000 views. However, Shorts can gain millions of views much faster and serve as a prime funnel for channel subscribers and affiliate links.',
  },
  {
    question: "How can I increase my channel's RPM?",
    answer: 'To significantly boost your RPM: Create videos longer than 8 minutes and manually insert natural mid-roll ad breaks; Target high-intent search keywords; Attract viewers from Tier 1 countries (US, UK, Canada, Australia); Avoid copyright strikes and demonetized profanity in the first 30 seconds of the video.',
  },
];

export default function YouTubeMoneyCalculator() {
  // Input states
  const [dailyViews, setDailyViews] = useState<number>(25000);
  const [format, setFormat] = useState<VideoFormat>('longform');
  const [selectedNicheId, setSelectedNicheId] = useState<string>('finance');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('tier1_us');
  const [hasMidrolls, setHasMidrolls] = useState<boolean>(true); // >8 mins videos

  // AI generated recommendations state
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiResults, setAiResults] = useState<AIStrategyResponse | null>(null);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  // Active milestone tab ($1k, $5k, $10k)
  const [activeMilestone, setActiveMilestone] = useState<number>(5000);

  // Selected niche & country objects
  const selectedNiche: NicheInfo = useMemo(() => {
    return YOUTUBE_NICHES.find((n) => n.id === selectedNicheId) || YOUTUBE_NICHES[0];
  }, [selectedNicheId]);

  const selectedCountry: CountryTier = useMemo(() => {
    return COUNTRY_TIERS.find((c) => c.id === selectedCountryId) || COUNTRY_TIERS[0];
  }, [selectedCountryId]);

  // Main calculation
  const calculation = useMemo(() => {
    // If longform and hasMidrolls, apply a 1.25x midroll ad frequency boost
    const adjustedCountry = {
      ...selectedCountry,
      multiplier: format === 'longform' && hasMidrolls
        ? selectedCountry.multiplier * 1.25
        : selectedCountry.multiplier,
    };
    return calculateYouTubeEarnings(dailyViews, format, selectedNiche, adjustedCountry);
  }, [dailyViews, format, selectedNiche, selectedCountry, hasMidrolls]);

  // Milestone views
  const milestoneTarget = useMemo(() => {
    return calculateViewsForMilestone(activeMilestone, calculation.effectiveRpm);
  }, [activeMilestone, calculation.effectiveRpm]);

  // Handle AI trigger
  const handleGenerateAi = async () => {
    setIsGeneratingAi(true);
    try {
      // Simulate real-time reasoning delay for great user UX
      await new Promise((r) => setTimeout(r, 600));
      const res = await generateViralTopics(selectedNiche, format, selectedCountry);
      setAiResults(res);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Copy summary report to clipboard
  const handleCopySummary = () => {
    const text = `📊 YouTube Earnings Forecast (${selectedNiche.name})
Format: ${format === 'longform' ? 'Long-form (8+ min with Midrolls)' : 'YouTube Shorts'}
Daily Views: ${dailyViews.toLocaleString()}
Estimated RPM: $${calculation.effectiveRpm.toFixed(2)} / 1,000 views

💰 Estimated AdSense Revenue:
• Daily: $${calculation.dailyEarnings.min.toLocaleString()} - $${calculation.dailyEarnings.max.toLocaleString()} (Avg: $${calculation.dailyEarnings.avg.toLocaleString()})
• Monthly: $${calculation.monthlyEarnings.min.toLocaleString()} - $${calculation.monthlyEarnings.max.toLocaleString()} (Avg: $${calculation.monthlyEarnings.avg.toLocaleString()})
• Yearly: $${calculation.yearlyEarnings.min.toLocaleString()} - $${calculation.yearlyEarnings.max.toLocaleString()} (Avg: $${calculation.yearlyEarnings.avg.toLocaleString()})

🤝 Brand Sponsorship Potential:
• Avg Monthly Brand Deals: $${calculation.sponsorshipEstimate.avg.toLocaleString()}

✨ Total Monthly Creator Potential: $${calculation.totalPotentialMonthly.toLocaleString()}
Generated by ToolCalculators.com`;

    navigator.clipboard.writeText(text);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  return (
    <div className="py-8 sm:py-12">
      <ToolStructuredData faqs={YOUTUBE_FAQS} slug="/tools/youtube-money-calculator" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs mb-6 flex-wrap" style={{ color: 'var(--text-3)' }}>
          <Link href="/" className="hover:text-[var(--accent-1)] transition-colors" style={{ color: 'var(--text-3)' }}>Home</Link>
          <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--text-3)' }} />
          <Link href="/#categories" className="hover:text-[var(--accent-1)] transition-colors" style={{ color: 'var(--text-3)' }}>Social Media Calculators</Link>
          <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--text-3)' }} />
          <span className="font-medium" style={{ color: 'var(--text-1)' }}>YouTube Money &amp; RPM Calculator</span>
        </nav>

        {/* Top Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-4 h-4 fill-red-500 text-red-500" />
            2026 YouTube Monetization Algorithm
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight" style={{ color: 'var(--text-1)' }}>
            AI YouTube Money &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">RPM Calculator</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base" style={{ color: 'var(--text-2)' }}>
            Calculate your actual YouTube AdSense revenue by niche and audience geography. Then generate high-RPM viral video concepts to increase your earnings.
          </p>
        </div>

        {/* Top AdSlot */}
        <AdPlaceholder slot="leaderboard" />

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          
          {/* LEFT COLUMN: Controls & Sliders (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border p-5 sm:p-6 shadow-sm" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-3 mb-5" style={{ color: 'var(--text-1)', borderColor: 'var(--border)' }}>
                <Tv className="w-5 h-5 text-red-600" />
                Configure Channel Parameters
              </h2>

              {/* 1. Format Toggle: Long-form vs Shorts */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-3)' }}>
                  Video Content Format
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl" style={{ background: 'var(--bg-card)' }}>
                  <button
                    type="button"
                    onClick={() => setFormat('longform')}
                    className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      format === 'longform'
                        ? 'shadow-sm'
                        : ''
                    }`}
                    style={format === 'longform' ? { background: 'var(--bg-surface)', color: 'var(--text-1)', border: '1px solid var(--border)' } : { color: 'var(--text-3)' }}
                  >
                    🎬 Long-form (Standard)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat('shorts')}
                    className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      format === 'shorts'
                        ? 'shadow-sm'
                        : ''
                    }`}
                    style={format === 'shorts' ? { background: 'var(--bg-surface)', color: 'var(--text-1)', border: '1px solid var(--border)' } : { color: 'var(--text-3)' }}
                  >
                    ⚡ YouTube Shorts
                  </button>
                </div>
              </div>

              {/* 2. Daily Views Slider + Number Input */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="daily-views" className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
                    Daily Video Views
                  </label>
                  <span className="text-sm font-extrabold bg-red-50 px-2 py-0.5 rounded-md border border-red-100 text-red-600">
                    {dailyViews.toLocaleString()} views/day
                  </span>
                </div>

                <input
                  id="daily-views"
                  type="range"
                  min="500"
                  max="1000000"
                  step="500"
                  value={dailyViews}
                  onChange={(e) => setDailyViews(Number(e.target.value))}
                  className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-red-600"
                  style={{ background: 'var(--bg-card-hover)' }}
                />

                <div className="flex justify-between text-[11px] mt-1" style={{ color: 'var(--text-3)' }}>
                  <span>500</span>
                  <span>50K</span>
                  <span>250K</span>
                  <span>500K</span>
                  <span>1M+</span>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {[5000, 25000, 50000, 100000, 250000, 500000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setDailyViews(val)}
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors ${
                        dailyViews === val
                          ? 'bg-red-600 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {val >= 1000 ? `${val / 1000}k` : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Channel Category / Niche */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="niche-select" className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
                    Channel Niche &amp; Category
                  </label>
                  <span className="text-[11px]" style={{ color: 'var(--text-3)' }}>
                    Avg RPM: ${selectedNiche.avgRpm.toFixed(2)}
                  </span>
                </div>
                <div className="relative">
                  <select
                    id="niche-select"
                    value={selectedNicheId}
                    onChange={(e) => setSelectedNicheId(e.target.value)}
                    className="form-select"
                  >
                    {YOUTUBE_NICHES.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.icon} {n.name}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] mt-1.5 leading-relaxed" style={{ color: 'var(--text-3)' }}>
                  💡 {selectedNiche.description}
                </p>
              </div>

              {/* 4. Audience Geography Tier */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="country-select" className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
                    Primary Audience Location
                  </label>
                  <span className="text-[11px]" style={{ color: 'var(--text-3)' }}>
                    {selectedCountry.multiplier}x Rate
                  </span>
                </div>
                <select
                  id="country-select"
                  value={selectedCountryId}
                  onChange={(e) => setSelectedCountryId(e.target.value)}
                  className="form-select"
                >
                  {COUNTRY_TIERS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] mt-1" style={{ color: 'var(--text-3)' }}>
                  Advertisers pay up to 5x higher rates for viewers located in Tier 1 purchasing countries.
                </p>
              </div>

              {/* 5. Mid-Roll Ads Toggle (Only for Longform) */}
              {format === 'longform' && (
                <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <span className="text-xs font-bold block group-hover:text-red-600 transition-colors" style={{ color: 'var(--text-1)' }}>
                        Videos Longer Than 8 Minutes?
                      </span>
                      <span className="text-[11px] block" style={{ color: 'var(--text-3)' }}>
                        Enables multiple mid-roll video ad breaks (+25% RPM boost)
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasMidrolls}
                      onChange={(e) => setHasMidrolls(e.target.checked)}
                      className="w-5 h-5 rounded text-red-600 focus:ring-red-500 border-slate-300 cursor-pointer accent-red-600"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Target Milestone Calculator Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  Milestone Goal Planner
                </span>
                <span className="text-xs text-slate-400">Target Views</span>
              </div>

              {/* Target selector buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[1000, 5000, 10000].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setActiveMilestone(amount)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                      activeMilestone === amount
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    ${amount.toLocaleString()}/mo
                  </button>
                ))}
              </div>

              <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Monthly Views Required:</span>
                  <span className="font-bold text-amber-400">
                    {milestoneTarget.monthlyViewsNeeded.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Daily Views Required:</span>
                  <span className="font-bold text-white">
                    ~{milestoneTarget.dailyViewsNeeded.toLocaleString()} / day
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Results Display & AI Recommendations (7 cols) */}
          <div className="lg:col-span-7 space-y-6" aria-live="polite" aria-label="Earnings results">
            
            {/* Primary Earnings Highlight Box */}
            <div className="rounded-2xl border-2 shadow-lg p-6 overflow-hidden relative" style={{ background: 'var(--bg-surface)', borderColor: 'rgba(244,63,94,0.2)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none" style={{ background: 'linear-gradient(to bottom-right, rgba(239,68,68,0.08), transparent)' }} />

              <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
                    Calculated RPM Rate
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black" style={{ color: 'var(--text-1)' }}>
                      ${calculation.effectiveRpm.toFixed(2)}
                    </span>
                    <span className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>
                      per 1,000 views
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors shadow-sm"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-2)' }}
                  >
                    {copiedReport ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy Forecast</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Earnings Cards (Daily / Monthly / Yearly) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
                
                {/* Daily */}
                <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
                    Daily Revenue
                  </span>
                  <div className="mt-1 text-2xl font-black" style={{ color: 'var(--text-1)' }}>
                    ${calculation.dailyEarnings.avg.toLocaleString()}
                  </div>
                  <div className="text-[11px] mt-1" style={{ color: 'var(--text-3)' }}>
                    Range: ${calculation.dailyEarnings.min.toLocaleString()} - ${calculation.dailyEarnings.max.toLocaleString()}
                  </div>
                </div>

                {/* Monthly */}
                <div className="bg-red-50/70 border border-red-200 rounded-xl p-4 relative">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-700">
                    Monthly Revenue
                  </span>
                  <div className="mt-1 text-2xl font-black text-red-600">
                    ${calculation.monthlyEarnings.avg.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-red-700/80 mt-1">
                    Range: ${calculation.monthlyEarnings.min.toLocaleString()} - ${calculation.monthlyEarnings.max.toLocaleString()}
                  </div>
                </div>

                {/* Yearly */}
                <div className="rounded-xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
                    Yearly Estimate
                  </span>
                  <div className="mt-1 text-2xl font-black" style={{ color: 'var(--text-1)' }}>
                    ${calculation.yearlyEarnings.avg.toLocaleString()}
                  </div>
                  <div className="text-[11px] mt-1" style={{ color: 'var(--text-3)' }}>
                    Range: ${calculation.yearlyEarnings.min.toLocaleString()} - ${calculation.yearlyEarnings.max.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Secondary Monetization: Brand Deals & Total Creator Potential */}
              <div className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Total Creator Potential (AdSense + Sponsorships)
                    </div>
                    <p className="text-xs text-amber-800 mt-0.5">
                      Estimated brand deals add ~${calculation.sponsorshipEstimate.avg.toLocaleString()}/mo to this view tier.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-amber-900">
                      ~${calculation.totalPotentialMonthly.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-amber-700 font-semibold uppercase">
                      Total Monthly Potential
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI VIRAL TOPIC & STRATEGY GENERATOR */}
            <div className="rounded-2xl border p-5 sm:p-6 shadow-sm" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    AI Viral Video Topic Generator
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                    Generate high-CTR video title hooks tailored to boost RPM in {selectedNiche.name.split(',')[0]}.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateAi}
                  disabled={isGeneratingAi}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 transition-all shadow-md shadow-red-500/20 disabled:opacity-75"
                >
                  {isGeneratingAi ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing Algorithm...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{aiResults ? 'Regenerate Ideas' : 'Generate High-RPM Ideas'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Ideas Display */}
              {aiResults ? (
                <div className="space-y-4 mt-6 animate-fadeIn">
                  <div className="grid grid-cols-1 gap-3.5">
                    {aiResults.ideas.map((idea, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border p-4 transition-all group"
                        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <span className="text-xs font-bold text-red-600 bg-red-100/70 px-2 py-0.5 rounded-md">
                            Idea #{idx + 1}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                            {idea.estimatedPotential}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold transition-colors leading-snug" style={{ color: 'var(--text-1)' }}>
                          "{idea.title}"
                        </h4>

                        <div className="mt-2.5 space-y-1.5 text-xs" style={{ color: 'var(--text-2)' }}>
                          <p>
                            <strong style={{ color: 'var(--text-1)' }}>🎣 Hook (First 5s):</strong> {idea.hook}
                          </p>
                          <p>
                            <strong style={{ color: 'var(--text-1)' }}>🖼️ Thumbnail Concept:</strong> {idea.thumbnailConcept}
                          </p>
                          <p className="text-[11px] italic" style={{ color: 'var(--text-3)' }}>
                            <strong>Why it pays:</strong> {idea.angle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Strategic Monetization Checklist */}
                  <div className="rounded-xl bg-slate-900 text-slate-300 p-4 mt-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Algorithmic RPM Optimization Tips
                    </h5>
                    <ul className="space-y-1.5 text-xs">
                      {aiResults.monetizationTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-400 font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed rounded-xl p-8 text-center" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
                  <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>
                    Unlock Personalized High-RPM Video Titles
                  </h4>
                  <p className="text-xs max-w-sm mx-auto mt-1 mb-4" style={{ color: 'var(--text-3)' }}>
                    Click the button above to generate 4 viral video concepts designed with psychological hooks that attract high-paying advertisers.
                  </p>
                  <button
                    type="button"
                    onClick={handleGenerateAi}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Generate Free Strategy Ideas
                  </button>
                </div>
              )}
            </div>

            {/* Affiliate Monetization Section */}
            <AffiliateCard />

          </div>
        </div>

        {/* Bottom In-Feed Ad Banner */}
        <AdPlaceholder slot="in-feed" className="my-10" />

        {/* COMPREHENSIVE SEO & FAQ SECTION (Crucial for Google Ranking) */}
        <section className="mt-12 pt-10 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--text-1)' }}>
                Frequently Asked Questions About YouTube Earnings &amp; RPM
              </h2>
              <p className="text-sm mt-2" style={{ color: 'var(--text-2)' }}>
                Everything you need to know about monetizing your channel in 2026.
              </p>
            </div>

            <div className="space-y-4">
              
              <div className="rounded-xl border p-5 shadow-sm" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                  <HelpCircle className="w-4 h-4 text-red-500" />
                  What is the difference between CPM and RPM?
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  <strong>CPM (Cost Per Mille)</strong> is the cost an advertiser pays for every 1,000 ad impressions before YouTube takes its 45% revenue cut. 
                  <strong>RPM (Revenue Per Mille)</strong> is your true take-home earning per 1,000 video views after YouTube's cut, and it factors in views that did not show an ad. RPM is the only metric you should use to forecast realistic earnings.
                </p>
              </div>

              <div className="rounded-xl border p-5 shadow-sm" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                  <HelpCircle className="w-4 h-4 text-red-500" />
                  Which YouTube niches have the highest RPM in 2026?
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  Financial niches (Investing, Crypto, Credit Cards, Real Estate) consistently command the highest RPMs—often between <strong>$12.00 and $25.00+</strong> per 1,000 views. Tech, SaaS software reviews, and business tutorials rank second ($8.00 - $18.00). Gaming and comedy entertainment have lower RPMs ($1.50 - $4.00) but compensate with much higher viral view volumes.
                </p>
              </div>

              <div className="rounded-xl border p-5 shadow-sm" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                  <HelpCircle className="w-4 h-4 text-red-500" />
                  Why do YouTube Shorts earn so much less than Long-form videos?
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  YouTube Shorts monetize via a pooled revenue sharing model rather than dedicated pre-roll/mid-roll ad auctions. While long-form videos earn $3.00 to $15.00+ RPM, YouTube Shorts typically yield between <strong>$0.03 and $0.09 per 1,000 views</strong>. However, Shorts can gain millions of views much faster and serve as a prime funnel for channel subscribers and affiliate links.
                </p>
              </div>

              <div className="rounded-xl border p-5 shadow-sm" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                <h3 className="text-base font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                  <HelpCircle className="w-4 h-4 text-red-500" />
                  How can I increase my channel's RPM?
                </h3>
                <div className="text-sm leading-relaxed space-y-1.5" style={{ color: 'var(--text-2)' }}>
                  <p>To significantly boost your RPM:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Create videos longer than 8 minutes and manually insert natural mid-roll ad breaks.</li>
                    <li>Target high-intent search keywords (e.g., "Best tool for X", "How to invest in Y").</li>
                    <li>Attract viewers from Tier 1 countries (United States, United Kingdom, Canada, Australia) by using English titles and universal examples.</li>
                    <li>Avoid copyright strikes and demonetized profanity in the first 30 seconds of the video.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Contextual internal links for SEO and discovery */}
        <RelatedTools />

      </div>
    </div>
  );
}
