'use client';

import React, { useMemo, useState } from 'react';
import {
  Copy,
  Check,
  Briefcase,
  Wallet,
  Calculator,
} from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';
import ToolShell from '@/components/ToolShell';
import { calculateSalaryTakeHome } from '@/lib/salary-take-home-calculator';

const FAQS = [
  {
    question: 'Why is my hourly take-home so much lower than salary ÷ hours?',
    answer:
      'Because salary ÷ hours only measures gross pay. Taxes, health insurance premiums, and retirement contributions all come out before the money reaches you, so the real hourly value of your time is lower than the headline number suggests.',
  },
  {
    question: 'How should I use this to compare a salaried offer with freelance or contract work?',
    answer:
      'Compare like for like: this tool converts your salary into an after-tax, after-benefits hourly rate. Line that up against a freelance rate that also accounts for your own taxes, insurance, and unpaid time off for an apples-to-apples comparison.',
  },
  {
    question: 'Does this account for my exact tax bracket?',
    answer:
      'No — it uses a flat estimated tax rate you enter, not a bracketed calculation for your specific filing status or location. Treat the result as a planning estimate, not a paycheck-accurate figure.',
  },
];

export default function SalaryToHourlyTakeHome() {
  const [annualSalary, setAnnualSalary] = useState<number>(90000);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(50);
  const [taxRate, setTaxRate] = useState<number>(22);
  const [healthInsurance, setHealthInsurance] = useState<number>(4200);
  const [retirementContribution, setRetirementContribution] = useState<number>(6000);
  const [bonus, setBonus] = useState<number>(5000);
  const [copied, setCopied] = useState(false);

  const calculation = useMemo(() => calculateSalaryTakeHome({
    annualSalary,
    hoursPerWeek,
    weeksPerYear,
    taxRate,
    healthInsurance,
    retirementContribution,
    bonus,
  }), [annualSalary, hoursPerWeek, weeksPerYear, taxRate, healthInsurance, retirementContribution, bonus]);

  const handleCopy = () => {
    const text = `Take-Home Estimate\nAnnual gross: $${calculation.grossAnnualIncome}\nAnnual after-tax: $${calculation.netAnnualIncome}\nMonthly take-home: $${calculation.monthlyTakeHome}\nHourly take-home: $${calculation.hourlyTakeHome}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fields: { id: string; label: string; value: number; setter: (n: number) => void; step: string; max?: string }[] = [
    { id: 'salary-annual', label: 'Annual salary ($)', value: annualSalary, setter: setAnnualSalary, step: '1000' },
    { id: 'salary-hours-per-week', label: 'Hours per week', value: hoursPerWeek, setter: setHoursPerWeek, step: '1' },
    { id: 'salary-weeks-per-year', label: 'Weeks per year', value: weeksPerYear, setter: setWeeksPerYear, step: '1' },
    { id: 'salary-tax-rate', label: 'Estimated tax rate (%)', value: taxRate, setter: setTaxRate, step: '1', max: '100' },
    { id: 'salary-health-insurance', label: 'Health insurance ($ / year)', value: healthInsurance, setter: setHealthInsurance, step: '100' },
    { id: 'salary-retirement', label: 'Retirement contribution ($ / year)', value: retirementContribution, setter: setRetirementContribution, step: '100' },
    { id: 'salary-bonus', label: 'Bonus ($ / year)', value: bonus, setter: setBonus, step: '100' },
  ];

  const results = [
    { label: 'Gross Income', value: `$${calculation.grossAnnualIncome.toLocaleString()}`, accent: 'var(--accent-1)' },
    { label: 'Annual Taxes', value: `$${calculation.annualTaxes.toLocaleString()}`, accent: '#06b6d4' },
    { label: 'Net Annual Income', value: `$${calculation.netAnnualIncome.toLocaleString()}`, accent: '#f59e0b' },
    { label: 'Hourly Take-Home', value: `$${calculation.hourlyTakeHome.toFixed(2)}`, accent: '#a78bfa' },
  ];

  return (
    <ToolShell
      icon="💸"
      badge="Salary Conversion"
      title={<>Salary to <span className="shimmer-text">Hourly Take-Home</span></>}
      subtitle="Convert salary into realistic take-home hourly pay after tax, insurance, and retirement deductions."
      accentColor="emerald"
      breadcrumbs={[{ label: 'Finance & Business', href: '/#categories' }, { label: 'Salary to Hourly Take-Home' }]}
      faqs={FAQS}
    >
      <AdPlaceholder slot="leaderboard" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        {/* Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass rounded-2xl p-5 sm:p-6">
            <h2
              className="text-lg font-bold flex items-center gap-2 border-b pb-3 mb-5"
              style={{ color: 'var(--text-1)', borderColor: 'var(--border)' }}
            >
              <Briefcase className="w-5 h-5" style={{ color: 'var(--accent-1)' }} />
              Salary Details
            </h2>

            <div className="space-y-5">
              {fields.map((f) => (
                <div key={f.id}>
                  <label
                    htmlFor={f.id}
                    className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: 'var(--text-3)' }}
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type="number"
                    min="0"
                    max={f.max}
                    step={f.step}
                    value={f.value}
                    onChange={(e) => f.setter(Number(e.target.value) || 0)}
                    className="form-input"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          <div
            className="rounded-2xl p-5 border"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                style={{ color: 'var(--accent-1)' }}
              >
                <Calculator className="w-4 h-4" />
                Take-Home Estimate
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{ background: 'var(--accent-1)', color: 'var(--btn-text)' }}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Result'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((r) => (
                <div
                  key={r.label}
                  className="rounded-xl p-4 border"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{r.label}</p>
                  <p className="text-2xl font-black mt-2" style={{ color: r.accent }}>{r.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl p-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>Monthly take-home</p>
                <p className="mt-2 text-xl font-bold" style={{ color: 'var(--accent-1)' }}>${calculation.monthlyTakeHome.toFixed(0)}</p>
              </div>
              <div className="rounded-xl p-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>Effective gross hourly</p>
                <p className="mt-2 text-xl font-bold" style={{ color: '#06b6d4' }}>${calculation.effectiveHourlyGross.toFixed(2)}</p>
              </div>
              <div className="rounded-xl p-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>Tax rate</p>
                <p className="mt-2 text-xl font-bold" style={{ color: '#f59e0b' }}>{taxRate}%</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-5 sm:p-6">
            <h3
              className="text-lg font-bold flex items-center gap-2 mb-4"
              style={{ color: 'var(--text-1)' }}
            >
              <Wallet className="w-5 h-5" style={{ color: 'var(--accent-1)' }} />
              Planning Insight
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              <li>• Your effective take-home rate is often much lower than headline salary because taxes and benefits matter.</li>
              <li>• Comparing hourly pay with freelance or contract work requires the same time-based denominator.</li>
              <li>• Retirement contributions and healthcare costs can materially reduce disposable income despite a strong salary.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ — visible content must match the faqs passed to ToolShell above for valid schema */}
      <section className="mt-16 pt-12 border-t" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-1)' }}>
          Frequently asked questions
        </h2>
        <div className="space-y-5">
          {FAQS.map((f) => (
            <div key={f.question} className="glass rounded-2xl p-5">
              <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-1)' }}>{f.question}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{f.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </ToolShell>
  );
}
