'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Copy,
  Check,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Wallet
} from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';
import { calculateFbaNetProfit } from '@/lib/fba-profit-calculator';

export default function AmazonFbaNetProfitCalculator() {
  const [sellingPrice, setSellingPrice] = useState<number>(39.99);
  const [cogs, setCogs] = useState<number>(16.5);
  const [shippingCost, setShippingCost] = useState<number>(3.75);
  const [amazonReferralFeePercent, setAmazonReferralFeePercent] = useState<number>(8.5);
  const [amazonReferralFeeFixed, setAmazonReferralFeeFixed] = useState<number>(1.2);
  const [fbaFulfillmentFee, setFbaFulfillmentFee] = useState<number>(4.8);
  const [storageFee, setStorageFee] = useState<number>(1.1);
  const [adSpend, setAdSpend] = useState<number>(7.5);
  const [otherFees, setOtherFees] = useState<number>(2.2);
  const [monthlyUnitsSold, setMonthlyUnitsSold] = useState<number>(540);
  const [copied, setCopied] = useState(false);

  const calculation = useMemo(() => calculateFbaNetProfit({
    sellingPrice,
    cogs,
    shippingCost,
    amazonReferralFeePercent,
    amazonReferralFeeFixed,
    fbaFulfillmentFee,
    storageFee,
    adSpend,
    otherFees,
    monthlyUnitsSold,
  }), [sellingPrice, cogs, shippingCost, amazonReferralFeePercent, amazonReferralFeeFixed, fbaFulfillmentFee, storageFee, adSpend, otherFees, monthlyUnitsSold]);

  const handleCopy = () => {
    const text = `Amazon FBA Net Profit Estimate\nGross revenue: $${calculation.grossRevenue}\nMonthly net profit: $${calculation.monthlyProfit}\nNet margin: ${calculation.netMarginPercent}%\nBreak-even price: $${calculation.breakEvenPrice}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/#categories" className="hover:text-red-600 transition-colors">Finance & Business</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">Amazon FBA Net Profit Calculator</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShoppingCart className="w-4 h-4 text-amber-600" />
            Profit & Margins
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Amazon FBA <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600">Net Profit Calculator</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Forecast net margin, break-even pricing, and monthly profit by modeling all the major FBA and ad costs.
          </p>
        </div>

        <AdPlaceholder slot="leaderboard" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-5">
                <Wallet className="w-5 h-5 text-amber-600" />
                Cost Inputs
              </h2>

              <div className="space-y-5">
                <div>
                  <label htmlFor="fba-selling-price" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Selling price ($)</label>
                  <input id="fba-selling-price" type="number" min="0" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800" />
                </div>
                <div>
                  <label htmlFor="fba-cogs" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">COGS ($)</label>
                  <input id="fba-cogs" type="number" min="0" step="0.01" value={cogs} onChange={(e) => setCogs(Number(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800" />
                </div>
                <div>
                  <label htmlFor="fba-shipping-cost" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Shipping cost ($)</label>
                  <input id="fba-shipping-cost" type="number" min="0" step="0.01" value={shippingCost} onChange={(e) => setShippingCost(Number(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800" />
                </div>
                <div>
                  <label htmlFor="fba-referral-percent" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Referral fee %</label>
                  <input id="fba-referral-percent" type="number" min="0" max="100" step="0.1" value={amazonReferralFeePercent} onChange={(e) => setAmazonReferralFeePercent(Number(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800" />
                </div>
                <div>
                  <label htmlFor="fba-referral-fixed" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Referral fee fixed ($)</label>
                  <input id="fba-referral-fixed" type="number" min="0" step="0.01" value={amazonReferralFeeFixed} onChange={(e) => setAmazonReferralFeeFixed(Number(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800" />
                </div>
                <div>
                  <label htmlFor="fba-fulfillment-fee" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">FBA fulfillment fee ($)</label>
                  <input id="fba-fulfillment-fee" type="number" min="0" step="0.01" value={fbaFulfillmentFee} onChange={(e) => setFbaFulfillmentFee(Number(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800" />
                </div>
                <div>
                  <label htmlFor="fba-storage-fee" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Storage fee ($)</label>
                  <input id="fba-storage-fee" type="number" min="0" step="0.01" value={storageFee} onChange={(e) => setStorageFee(Number(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800" />
                </div>
                <div>
                  <label htmlFor="fba-monthly-ad-spend" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Ad spend ($ / month)</label>
                  <input id="fba-monthly-ad-spend" type="number" min="0" step="0.1" value={adSpend} onChange={(e) => setAdSpend(Number(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800" />
                </div>
                <div>
                  <label htmlFor="fba-other-fees" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Other fees ($ per unit)</label>
                  <input id="fba-other-fees" type="number" min="0" step="0.01" value={otherFees} onChange={(e) => setOtherFees(Number(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800" />
                </div>
                <div>
                  <label htmlFor="fba-monthly-units" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Monthly units sold</label>
                  <input id="fba-monthly-units" type="number" min="0" step="1" value={monthlyUnitsSold} onChange={(e) => setMonthlyUnitsSold(Number(e.target.value) || 0)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Business Summary
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Summary'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Gross Revenue</p>
                  <p className="text-2xl font-black text-emerald-400 mt-2">${calculation.grossRevenue.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Net Margin</p>
                  <p className="text-2xl font-black text-cyan-300 mt-2">{calculation.netMarginPercent}%</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Break-Even Price</p>
                  <p className="text-2xl font-black text-amber-300 mt-2">${calculation.breakEvenPrice.toFixed(2)}</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Monthly Profit</p>
                  <p className="text-2xl font-black text-violet-300 mt-2">${calculation.monthlyProfit.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-amber-600" />
                Margin Notes
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <li>• Amazon fees and fulfillment costs can erase a lot of gross margin if the selling price is too low.</li>
                <li>• Scale becomes more profitable when ad spend stays under a healthy return-on-ad-spend threshold.</li>
                <li>• A small price increase often improves net margin more than trying to squeeze variable costs alone.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
