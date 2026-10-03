'use client';

import React, { useMemo } from 'react';
import { Coins, TrendingUp } from 'lucide-react';
import ToolShell from '@/components/ToolShell';
import AdPlaceholder from '@/components/AdPlaceholder';
import { Notice, NumberField, Panel, ResultTile, SelectField, money } from '@/components/CalcKit';
import { calculateCompoundInterest, type CompoundFrequency } from '@/lib/compound-interest-calculator';
import { useUrlState } from '@/lib/use-url-state';

const DEFAULTS = { initial: 10000, monthly: 500, rate: 7, years: 20, freq: 12, inflation: 3 };

const FREQUENCIES: { value: CompoundFrequency; label: string }[] = [
  { value: 1, label: 'Annually' },
  { value: 2, label: 'Semi-annually' },
  { value: 4, label: 'Quarterly' },
  { value: 12, label: 'Monthly' },
  { value: 365, label: 'Daily' },
];

export default function CompoundInterestPage() {
  const [s, set] = useUrlState(DEFAULTS);

  const r = useMemo(
    () =>
      calculateCompoundInterest({
        initialDeposit: s.initial,
        monthlyContribution: s.monthly,
        annualRate: s.rate,
        years: s.years,
        compoundsPerYear: s.freq as CompoundFrequency,
        inflationRate: s.inflation,
      }),
    [s],
  );

  const maxBalance = Math.max(...r.yearly.map((y) => y.balance), 1);
  const interestShare = r.finalBalance > 0 ? Math.round((r.totalInterest / r.finalBalance) * 100) : 0;

  return (
    <ToolShell
      icon="📈"
      badge="Personal Finance"
      title={<>Compound Interest <span className="shimmer-text">Calculator</span></>}
      subtitle="See how savings or investments could grow with compounding and regular monthly deposits, in nominal and inflation-adjusted terms."
      accentColor="emerald"
      breadcrumbs={[{ label: 'Personal Finance', href: '/category/personal-finance' }, { label: 'Compound Interest Calculator' }]}
    >
      <AdPlaceholder slot="leaderboard" />

      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Panel title="Your numbers" icon={<Coins className="h-5 w-5" />}>
            <div className="space-y-5">
              <NumberField id="c-initial" label="Starting amount" prefix="$" step={500} value={s.initial} onChange={(v) => set({ initial: v })} />
              <NumberField id="c-monthly" label="Monthly contribution" prefix="$" suffix="/mo" step={50} value={s.monthly} onChange={(v) => set({ monthly: v })} />
              <div className="grid grid-cols-2 gap-4">
                <NumberField id="c-rate" label="Annual return" suffix="%" step={0.1} value={s.rate} onChange={(v) => set({ rate: v })} max={100} />
                <NumberField id="c-years" label="Years" suffix="yrs" step={1} min={1} value={s.years} onChange={(v) => set({ years: v })} max={60} />
              </div>
              <SelectField id="c-freq" label="Compounding" value={s.freq} onChange={(v) => set({ freq: v })} options={FREQUENCIES} />
              <NumberField id="c-inflation" label="Expected inflation" suffix="%" step={0.1} value={s.inflation} onChange={(v) => set({ inflation: v })} max={50} hint="Used only for the today's-money figure." />
            </div>
          </Panel>
        </div>

        <div className="space-y-6 lg:col-span-7" aria-live="polite">
          <div className="rounded-2xl border p-5 sm:p-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-accent)' }}>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent-1)' }}>
              Balance after {s.years} {s.years === 1 ? 'year' : 'years'}
            </p>
            <p className="mt-1 text-4xl font-black sm:text-5xl" style={{ color: 'var(--text-1)' }}>{money(r.finalBalance)}</p>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-3)' }}>
              About {money(r.inflationAdjustedBalance)} in today&apos;s money at {s.inflation}% inflation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ResultTile label="You contribute" value={money(r.totalContributions)} />
            <ResultTile label="Interest earned" value={money(r.totalInterest)} sub={`${interestShare}% of the final balance`} />
            <ResultTile label="Final balance" value={money(r.finalBalance)} />
          </div>

          <Panel title="Growth by year" icon={<TrendingUp className="h-5 w-5" />}>
            <div className="flex h-44 items-end gap-1" role="img" aria-label="Bar chart of the balance at the end of each year, split into contributions and interest">
              {r.yearly.map((y) => {
                const h = (y.balance / maxBalance) * 100;
                const contribShare = y.balance > 0 ? (y.contributions / y.balance) * 100 : 100;
                return (
                  <div key={y.year} className="flex h-full flex-1 flex-col justify-end" title={`Year ${y.year}: ${money(y.balance)}`}>
                    <div className="flex w-full flex-col overflow-hidden rounded-t" style={{ height: `${h}%` }}>
                      <div style={{ height: `${100 - contribShare}%`, background: 'var(--accent-1)' }} />
                      <div style={{ height: `${contribShare}%`, background: 'var(--accent-glow)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-xs" style={{ color: 'var(--text-3)' }}>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: 'var(--accent-1)' }} /> Interest</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: 'var(--accent-glow)' }} /> Contributions</span>
            </div>

            <details className="mt-5">
              <summary className="cursor-pointer text-sm font-bold" style={{ color: 'var(--text-1)' }}>Year-by-year table</summary>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-xs sm:text-sm">
                  <thead>
                    <tr style={{ color: 'var(--text-3)' }}>
                      <th className="py-2 pr-4 font-semibold">Year</th>
                      <th className="py-2 pr-4 font-semibold">Contributions</th>
                      <th className="py-2 pr-4 font-semibold">Interest</th>
                      <th className="py-2 font-semibold">Balance</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: 'var(--text-2)' }}>
                    {r.yearly.map((y) => (
                      <tr key={y.year} className="border-t" style={{ borderColor: 'var(--border)' }}>
                        <td className="py-2 pr-4">{y.year}</td>
                        <td className="py-2 pr-4">{money(y.contributions)}</td>
                        <td className="py-2 pr-4">{money(y.interest)}</td>
                        <td className="py-2">{money(y.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </Panel>

          <Notice>
            A fixed return is a planning assumption, not a prediction. Real investments fluctuate and can lose value. Fees and taxes are not included.
          </Notice>
        </div>
      </div>
    </ToolShell>
  );
}
