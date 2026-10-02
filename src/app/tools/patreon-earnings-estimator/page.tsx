'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BadgeDollarSign,
  BarChart3,
  Check,
  ChevronRight,
  Copy,
  Users,
  Wallet,
} from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';
import ToolStructuredData, { FaqItem } from '@/components/ToolStructuredData';
import RelatedTools from '@/components/RelatedTools';
import { calculatePatreonEarnings } from '@/lib/patreon-calculator';

function formatUsd(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const PATREON_FAQS: FaqItem[] = [
  {
    question: 'How much does Patreon take from creator earnings?',
    answer: 'Patreon platform fees range from 5% (Lite), 8% (Pro), to 12% (Premium), in addition to industry-standard payment processing fees (typically 2.9% + $0.30 per pledge transaction).',
  },
  {
    question: 'How is net Patreon income calculated?',
    answer: 'Net monthly earnings equal: (Paid Members × Average Pledge) − (Patreon Platform Fee + Payment Processing Fees + Direct Production Costs).',
  },
  {
    question: 'What is the average pledge amount per Patreon supporter?',
    answer: 'Across creator categories, the average pledge per paid member is approximately $5 to $10 per month, with $7 to $8 being the most common tier price.',
  },
  {
    question: 'What percentage of social media followers join Patreon?',
    answer: 'A healthy conversion benchmark is 1% to 3% of an engaged following. Offering exclusive community access (Discord), behind-the-scenes content, and early releases maximizes conversion.',
  },
];

export default function PatreonEarningsEstimator() {
  const [paidMembers, setPaidMembers] = useState(150);
  const [averageMonthlyPledge, setAverageMonthlyPledge] = useState(5);
  const [estimatedFeePercent, setEstimatedFeePercent] = useState(10);
  const [otherMonthlyCosts, setOtherMonthlyCosts] = useState(0);
  const [copied, setCopied] = useState(false);

  const inputs = useMemo(() => ({
    paidMembers,
    averageMonthlyPledge,
    estimatedFeePercent,
    otherMonthlyCosts,
  }), [paidMembers, averageMonthlyPledge, estimatedFeePercent, otherMonthlyCosts]);

  const calculation = useMemo(() => calculatePatreonEarnings(inputs), [inputs]);

  const handleCopy = () => {
    const summary = `Patreon Earnings Estimate\nPaid members: ${calculation.paidMembers.toLocaleString()}\nGross monthly pledges: ${formatUsd(calculation.grossMonthlyPledges)}\nEstimated fees: ${formatUsd(calculation.estimatedFees)}\nEstimated monthly net: ${formatUsd(calculation.estimatedMonthlyNet)}\nProjected annual net: ${formatUsd(calculation.projectedAnnualNet)}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 sm:py-12">
      <ToolStructuredData faqs={PATREON_FAQS} slug="/tools/patreon-earnings-estimator" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-[var(--accent-1)] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/#categories" className="hover:text-[var(--accent-1)] transition-colors">Social Media</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">Patreon Earnings Estimator</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BadgeDollarSign className="w-4 h-4 text-rose-700" />
            Membership income estimate
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Patreon <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-700 via-pink-600 to-orange-500">Earnings Estimator</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Estimate monthly and annual creator income from paid members, average pledges, fees, and monthly costs.
          </p>
        </div>

        <AdPlaceholder slot="leaderboard" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm" aria-labelledby="patreon-inputs-heading">
              <h2 id="patreon-inputs-heading" className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-5">
                <Users className="w-5 h-5 text-rose-700" />
                Membership assumptions
              </h2>

              <div className="space-y-5">
                <div>
                  <label htmlFor="patreon-paid-members" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Paid members</label>
                  <input
                    id="patreon-paid-members"
                    type="number"
                    min="0"
                    step="1"
                    value={paidMembers}
                    onChange={(event) => setPaidMembers(Number(event.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label htmlFor="patreon-average-pledge" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Average monthly pledge ($)</label>
                  <input
                    id="patreon-average-pledge"
                    type="number"
                    min="0"
                    step="0.25"
                    value={averageMonthlyPledge}
                    onChange={(event) => setAverageMonthlyPledge(Number(event.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                  <p className="mt-1.5 text-xs text-slate-500">Use an average across your active paid tiers.</p>
                </div>

                <div>
                  <label htmlFor="patreon-fee-percent" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Estimated platform + processing fees (%)</label>
                  <input
                    id="patreon-fee-percent"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={estimatedFeePercent}
                    onChange={(event) => setEstimatedFeePercent(Number(event.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                  <p className="mt-1.5 text-xs text-slate-500">The 10% starting value is an editable planning assumption, not a quoted Patreon rate.</p>
                </div>

                <div>
                  <label htmlFor="patreon-other-costs" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Other monthly costs ($)</label>
                  <input
                    id="patreon-other-costs"
                    type="number"
                    min="0"
                    step="1"
                    value={otherMonthlyCosts}
                    onChange={(event) => setOtherMonthlyCosts(Number(event.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <section className="bg-slate-900 rounded-2xl border border-slate-800 p-5 text-white shadow-lg" aria-labelledby="patreon-results-heading">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 id="patreon-results-heading" className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Earnings projection
                </h2>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy summary'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Gross monthly pledges</p>
                  <p className="text-2xl font-black text-white mt-2">{formatUsd(calculation.grossMonthlyPledges)}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Estimated fees</p>
                  <p className="text-2xl font-black text-amber-300 mt-2">-{formatUsd(calculation.estimatedFees)}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Estimated monthly net</p>
                  <p className="text-2xl font-black text-emerald-300 mt-2">{formatUsd(calculation.estimatedMonthlyNet)}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Projected annual net</p>
                  <p className="text-2xl font-black text-cyan-300 mt-2">{formatUsd(calculation.projectedAnnualNet)}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-slate-800 p-4 border border-slate-700">
                  <p className="text-xs text-slate-400">Paid members</p>
                  <p className="mt-2 text-xl font-bold text-white">{calculation.paidMembers.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-slate-800 p-4 border border-slate-700">
                  <p className="text-xs text-slate-400">Net per member</p>
                  <p className="mt-2 text-xl font-bold text-pink-300">{formatUsd(calculation.estimatedNetPerMember)}</p>
                </div>
                <div className="rounded-xl bg-slate-800 p-4 border border-slate-700">
                  <p className="text-xs text-slate-400">Net margin</p>
                  <p className="mt-2 text-xl font-bold text-violet-300">{calculation.netMarginPercent.toFixed(1)}%</p>
                </div>
              </div>
            </section>

            <details className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <summary className="cursor-pointer text-base font-bold text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700">
                How this estimate works
              </summary>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed list-disc pl-5">
                <li>Gross monthly pledges equal paid members multiplied by average monthly pledge. The average pledge is used to represent your paid tier mix.</li>
                <li>Estimated fees equal gross monthly pledges multiplied by the fee percentage you enter. The default 10% is illustrative; Patreon platform and payment processing costs can vary.</li>
                <li>Estimated monthly net subtracts estimated fees and other monthly costs from gross monthly pledges.</li>
                <li>Projected annual net multiplies estimated monthly net by 12, assuming member count, pledges, fee rate, and costs stay unchanged.</li>
                <li>Estimated net per member divides monthly net by paid members; it is zero when the member count is zero. Net margin is monthly net divided by gross pledges.</li>
              </ul>
              <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
                This is a planning estimate, not a payout statement. It does not model taxes, currency conversion, refunds, failed payments, cancellations, tier changes, or Patreon-specific fee schedules. Check your account statements and current plan terms for actual amounts.
              </p>
            </details>

          </div>
        </div>

        {/* SEO FAQ Section */}
        <section className="mt-12 pt-10 border-t border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Frequently Asked Questions About Patreon Monetization
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Learn about platform fees, realistic conversion rates, and member retention.
              </p>
            </div>

            <div className="space-y-4">
              {PATREON_FAQS.map((faq, idx) => (
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
