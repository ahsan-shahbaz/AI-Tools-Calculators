'use client';

import React, { useMemo } from 'react';
import { Home, PiggyBank, Receipt } from 'lucide-react';
import ToolShell from '@/components/ToolShell';
import AdPlaceholder from '@/components/AdPlaceholder';
import { Notice, NumberField, Panel, ResultTile, SelectField, money, num } from '@/components/CalcKit';
import { calculateMortgage, PMI_ANNUAL_RATE } from '@/lib/mortgage-calculator';
import { useUrlState } from '@/lib/use-url-state';

const DEFAULTS = {
  price: 400000,
  down: 20,
  rate: 6.5,
  term: 30,
  tax: 1.1,
  ins: 1500,
  hoa: 0,
  extra: 0,
};

const TERMS = [10, 15, 20, 25, 30, 40].map((y) => ({ value: y, label: `${y} years` }));

export default function MortgageCalculatorPage() {
  const [s, set] = useUrlState(DEFAULTS);

  const r = useMemo(
    () =>
      calculateMortgage({
        homePrice: s.price,
        downPaymentPercent: s.down,
        interestRate: s.rate,
        termYears: s.term,
        propertyTaxRate: s.tax,
        homeInsurancePerYear: s.ins,
        hoaPerMonth: s.hoa,
        extraMonthlyPayment: s.extra,
      }),
    [s],
  );

  const parts = [
    { label: 'Principal & interest', value: r.principalAndInterest, color: 'var(--accent-1)' },
    { label: 'Property tax', value: r.propertyTax, color: '#06b6d4' },
    { label: 'Home insurance', value: r.insurance, color: '#f59e0b' },
    { label: 'HOA', value: r.hoa, color: '#8b5cf6' },
    { label: 'PMI (est.)', value: r.pmi, color: '#f43f5e' },
    { label: 'Extra principal', value: s.extra > 0 ? s.extra : 0, color: '#10b981' },
  ].filter((p) => p.value > 0);
  const total = parts.reduce((sum, p) => sum + p.value, 0) || 1;

  return (
    <ToolShell
      icon="🏠"
      badge="Personal Finance"
      title={<>Mortgage <span className="shimmer-text">Payment Calculator</span></>}
      subtitle="Estimate your monthly payment with property tax, insurance, HOA and PMI, then see how extra payments cut interest and payoff time."
      accentColor="cyan"
      breadcrumbs={[{ label: 'Personal Finance', href: '/category/personal-finance' }, { label: 'Mortgage Payment Calculator' }]}
    >
      <AdPlaceholder slot="leaderboard" />

      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <Panel title="Loan details" icon={<Home className="h-5 w-5" />}>
            <div className="space-y-5">
              <NumberField id="m-price" label="Home price" prefix="$" step={5000} value={s.price} onChange={(v) => set({ price: v })} max={100000000} />
              <div className="grid grid-cols-2 gap-4">
                <NumberField id="m-down" label="Down payment" suffix="%" step={1} value={s.down} onChange={(v) => set({ down: v })} max={100} hint={`= ${money(r.downPayment)}`} />
                <NumberField id="m-rate" label="Interest rate (APR)" suffix="%" step={0.05} value={s.rate} onChange={(v) => set({ rate: v })} max={30} />
              </div>
              <SelectField id="m-term" label="Loan term" value={s.term} onChange={(v) => set({ term: v })} options={TERMS} />
            </div>
          </Panel>

          <Panel title="Taxes & monthly costs" icon={<Receipt className="h-5 w-5" />}>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <NumberField id="m-tax" label="Property tax rate" suffix="%/yr" step={0.05} value={s.tax} onChange={(v) => set({ tax: v })} max={10} />
                <NumberField id="m-ins" label="Home insurance" prefix="$" suffix="/yr" step={50} value={s.ins} onChange={(v) => set({ ins: v })} />
              </div>
              <NumberField id="m-hoa" label="HOA dues" prefix="$" suffix="/mo" step={10} value={s.hoa} onChange={(v) => set({ hoa: v })} />
            </div>
          </Panel>

          <Panel title="Pay it off faster" icon={<PiggyBank className="h-5 w-5" />}>
            <NumberField id="m-extra" label="Extra payment per month" prefix="$" suffix="/mo" step={25} value={s.extra} onChange={(v) => set({ extra: v })} hint="Applied to principal each month." />
          </Panel>
        </div>

        <div className="space-y-6 lg:col-span-7" aria-live="polite">
          <div className="rounded-2xl border p-5 sm:p-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-accent)' }}>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent-1)' }}>Estimated monthly payment</p>
            <p className="mt-1 text-4xl font-black sm:text-5xl" style={{ color: 'var(--text-1)' }}>{money(r.totalMonthly, 2)}</p>

            <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full" role="img" aria-label="Breakdown of the monthly payment">
              {parts.map((p) => (
                <div key={p.label} style={{ width: `${(p.value / total) * 100}%`, background: p.color }} title={`${p.label}: ${money(p.value, 2)}`} />
              ))}
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {parts.map((p) => (
                <li key={p.label} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2" style={{ color: 'var(--text-2)' }}>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                    {p.label}
                  </span>
                  <span className="font-semibold" style={{ color: 'var(--text-1)' }}>{money(p.value, 2)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <ResultTile label="Loan amount" value={money(r.loanAmount)} />
            <ResultTile label="Total interest" value={money(r.totalInterest)} />
            <ResultTile label="Total paid" value={money(r.totalPaid)} sub="principal + interest" />
            <ResultTile label="Payoff time" value={`${num(r.payoffMonths / 12, 1)} yrs`} sub={`${r.payoffMonths} payments`} />
          </div>

          {s.extra > 0 && (
            <Notice>
              Paying an extra {money(s.extra)} a month saves about <strong>{money(r.interestSavedByExtra)}</strong> in interest and
              pays the loan off <strong>{Math.floor(r.monthsSavedByExtra / 12)} years {r.monthsSavedByExtra % 12} months</strong> sooner.
            </Notice>
          )}
          {s.down < 20 && (
            <Notice>
              With under 20% down, PMI is estimated at {PMI_ANNUAL_RATE * 100}% of the loan per year ({money(r.pmi, 2)}/mo). Your lender&apos;s PMI will differ.
            </Notice>
          )}

          <details className="glass rounded-2xl p-5">
            <summary className="cursor-pointer text-sm font-bold" style={{ color: 'var(--text-1)' }}>Year-by-year amortization table</summary>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-xs sm:text-sm">
                <thead>
                  <tr style={{ color: 'var(--text-3)' }}>
                    <th className="py-2 pr-4 font-semibold">Year</th>
                    <th className="py-2 pr-4 font-semibold">Principal paid</th>
                    <th className="py-2 pr-4 font-semibold">Interest paid</th>
                    <th className="py-2 font-semibold">Ending balance</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--text-2)' }}>
                  {r.yearly.map((row) => (
                    <tr key={row.year} className="border-t" style={{ borderColor: 'var(--border)' }}>
                      <td className="py-2 pr-4">{row.year}</td>
                      <td className="py-2 pr-4">{money(row.principalPaid)}</td>
                      <td className="py-2 pr-4">{money(row.interestPaid)}</td>
                      <td className="py-2">{money(row.endingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          <Notice>
            Estimate only. Rates, taxes, insurance and PMI vary by lender and location. Ask for a Loan Estimate before making decisions.
          </Notice>
        </div>
      </div>
    </ToolShell>
  );
}
