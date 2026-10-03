'use client';

import React, { useMemo } from 'react';
import { Calculator } from 'lucide-react';
import ToolShell from '@/components/ToolShell';
import AdPlaceholder from '@/components/AdPlaceholder';
import { Notice, NumberField, Panel, ResultTile, Segmented, money, num } from '@/components/CalcKit';
import { calculateProfitMargin, type MarginMode } from '@/lib/profit-margin-calculator';
import { useUrlState } from '@/lib/use-url-state';

const DEFAULTS = { mode: 'from-price', cost: 60, price: 100, margin: 40, markup: 50, units: 100 };

export default function ProfitMarginPage() {
  const [s, set] = useUrlState(DEFAULTS);
  const mode = (['from-price', 'target-margin', 'target-markup'].includes(s.mode) ? s.mode : 'from-price') as MarginMode;

  const r = useMemo(
    () =>
      calculateProfitMargin({
        mode,
        cost: s.cost,
        sellingPrice: s.price,
        targetMarginPercent: s.margin,
        targetMarkupPercent: s.markup,
        units: s.units,
      }),
    [mode, s],
  );

  return (
    <ToolShell
      icon="🧮"
      badge="Business Pricing"
      title={<>Profit Margin &amp; <span className="shimmer-text">Markup Calculator</span></>}
      subtitle="Find margin, markup and profit per unit, or work backwards from a target margin or markup to the price you need to charge."
      accentColor="emerald"
      breadcrumbs={[{ label: 'Finance & Business', href: '/category/finance-business' }, { label: 'Profit Margin Calculator' }]}
    >
      <AdPlaceholder slot="leaderboard" />

      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Panel title="Inputs" icon={<Calculator className="h-5 w-5" />}>
            <div className="space-y-5">
              <Segmented
                label="I want to"
                value={mode}
                onChange={(v) => set({ mode: v })}
                options={[
                  { value: 'from-price', label: 'Find my margin' },
                  { value: 'target-margin', label: 'Price for a margin' },
                  { value: 'target-markup', label: 'Price for a markup' },
                ]}
              />
              <NumberField id="p-cost" label="Cost per unit" prefix="$" step={1} value={s.cost} onChange={(v) => set({ cost: v })} hint="Include shipping, fees and anything else it costs you to sell one." />
              {mode === 'from-price' && <NumberField id="p-price" label="Selling price per unit" prefix="$" step={1} value={s.price} onChange={(v) => set({ price: v })} />}
              {mode === 'target-margin' && <NumberField id="p-margin" label="Target margin" suffix="%" step={1} value={s.margin} onChange={(v) => set({ margin: v })} max={99.99} />}
              {mode === 'target-markup' && <NumberField id="p-markup" label="Target markup" suffix="%" step={1} value={s.markup} onChange={(v) => set({ markup: v })} />}
              <NumberField id="p-units" label="Units sold" step={1} min={1} value={s.units} onChange={(v) => set({ units: v })} />
            </div>
          </Panel>
        </div>

        <div className="space-y-6 lg:col-span-7" aria-live="polite">
          {r.error ? (
            <Notice>{r.error}</Notice>
          ) : (
            <>
              <div className="rounded-2xl border p-5 sm:p-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-accent)' }}>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent-1)' }}>
                  {mode === 'from-price' ? 'Profit margin' : 'Price to charge'}
                </p>
                <p className="mt-1 text-4xl font-black sm:text-5xl" style={{ color: 'var(--text-1)' }}>
                  {mode === 'from-price' ? `${num(r.marginPercent, 2)}%` : money(r.sellingPrice, 2)}
                </p>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-3)' }}>
                  {mode === 'from-price'
                    ? `Markup on cost is ${num(r.markupPercent, 2)}%.`
                    : `That gives a ${num(r.marginPercent, 2)}% margin and ${num(r.markupPercent, 2)}% markup.`}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <ResultTile label="Selling price" value={money(r.sellingPrice, 2)} />
                <ResultTile label="Profit / unit" value={money(r.profitPerUnit, 2)} />
                <ResultTile label="Revenue" value={money(r.totalRevenue)} sub={`${num(s.units)} units`} />
                <ResultTile label="Total profit" value={money(r.totalProfit)} />
              </div>
              {r.marginPercent < 0 && <Notice>You are selling below cost. Every unit loses {money(Math.abs(r.profitPerUnit), 2)}.</Notice>}
              <Notice>
                Margin = profit ÷ price. Markup = profit ÷ cost. A 50% markup is only a 33.3% margin, so quote targets as margin if you think in terms of how much of each sale you keep.
              </Notice>
            </>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
