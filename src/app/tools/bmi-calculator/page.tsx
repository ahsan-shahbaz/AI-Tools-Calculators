'use client';

import React, { useMemo } from 'react';
import { Ruler } from 'lucide-react';
import ToolShell from '@/components/ToolShell';
import AdPlaceholder from '@/components/AdPlaceholder';
import { Notice, NumberField, Panel, ResultTile, Segmented, num } from '@/components/CalcKit';
import { calculateBmi, type UnitSystem } from '@/lib/bmi-calculator';
import { useUrlState } from '@/lib/use-url-state';

const DEFAULTS = { system: 'metric', kg: 70, cm: 175, lb: 154, ft: 5, inch: 9 };

const SCALE_MIN = 15;
const SCALE_MAX = 40;

export default function BmiCalculatorPage() {
  const [s, set] = useUrlState(DEFAULTS);
  const system = (s.system === 'imperial' ? 'imperial' : 'metric') as UnitSystem;

  const r = useMemo(
    () =>
      calculateBmi(
        system === 'metric'
          ? { system, weight: s.kg, height: s.cm }
          : { system, weight: s.lb, height: s.ft * 12 + s.inch },
      ),
    [system, s],
  );

  const pos = Math.min(100, Math.max(0, ((r.bmi - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100));
  const seg = (from: number, to: number) => ((to - from) / (SCALE_MAX - SCALE_MIN)) * 100;

  return (
    <ToolShell
      icon="⚖️"
      badge="Health & Lifestyle"
      title={<>BMI <span className="shimmer-text">Calculator</span></>}
      subtitle="Calculate adult body mass index in metric or imperial units, see the WHO category and the weight range that matches a BMI of 18.5 to 24.9."
      accentColor="amber"
      breadcrumbs={[{ label: 'Lifestyle', href: '/category/lifestyle' }, { label: 'BMI Calculator' }]}
    >
      <AdPlaceholder slot="leaderboard" />

      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Panel title="Your measurements" icon={<Ruler className="h-5 w-5" />}>
            <div className="space-y-5">
              <Segmented
                label="Units"
                value={system}
                onChange={(v) => set({ system: v })}
                options={[{ value: 'metric', label: 'Metric (kg, cm)' }, { value: 'imperial', label: 'Imperial (lb, ft/in)' }]}
              />
              {system === 'metric' ? (
                <>
                  <NumberField id="b-kg" label="Weight" suffix="kg" step={0.5} value={s.kg} onChange={(v) => set({ kg: v })} max={500} />
                  <NumberField id="b-cm" label="Height" suffix="cm" step={1} value={s.cm} onChange={(v) => set({ cm: v })} max={272} />
                </>
              ) : (
                <>
                  <NumberField id="b-lb" label="Weight" suffix="lb" step={1} value={s.lb} onChange={(v) => set({ lb: v })} max={1100} />
                  <div className="grid grid-cols-2 gap-4">
                    <NumberField id="b-ft" label="Height (feet)" suffix="ft" step={1} value={s.ft} onChange={(v) => set({ ft: v })} max={8} />
                    <NumberField id="b-in" label="Inches" suffix="in" step={1} value={s.inch} onChange={(v) => set({ inch: v })} max={11} />
                  </div>
                </>
              )}
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>For adults aged 18 and over. Nothing you enter leaves your device.</p>
            </div>
          </Panel>
        </div>

        <div className="space-y-6 lg:col-span-7" aria-live="polite">
          {r.error ? (
            <Notice>{r.error}</Notice>
          ) : (
            <>
              <div className="rounded-2xl border p-5 sm:p-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-accent)' }}>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent-1)' }}>Your BMI</p>
                <p className="mt-1 text-5xl font-black" style={{ color: 'var(--text-1)' }}>{r.bmi}</p>
                <p className="mt-1 text-base font-semibold" style={{ color: 'var(--accent-1)' }}>{r.category}</p>

                <div className="relative mt-6" role="img" aria-label={`BMI scale. Your BMI of ${r.bmi} is in the ${r.category} range.`}>
                  <div className="flex h-3 w-full overflow-hidden rounded-full">
                    <div style={{ width: `${seg(15, 18.5)}%`, background: '#38bdf8' }} />
                    <div style={{ width: `${seg(18.5, 25)}%`, background: '#10b981' }} />
                    <div style={{ width: `${seg(25, 30)}%`, background: '#f59e0b' }} />
                    <div style={{ width: `${seg(30, 40)}%`, background: '#ef4444' }} />
                  </div>
                  <div className="absolute -top-1 h-5 w-1 -translate-x-1/2 rounded" style={{ left: `${pos}%`, background: 'var(--text-1)' }} />
                  <div className="mt-2 flex justify-between text-[10px]" style={{ color: 'var(--text-3)' }}>
                    <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ResultTile label="Healthy weight range" value={`${num(r.healthyMin, 1)} – ${num(r.healthyMax, 1)} ${r.unit}`} sub="BMI 18.5 to 24.9 at your height" />
                <ResultTile
                  label="Distance from range"
                  value={r.differenceToRange === 0 ? 'Within range' : `${r.differenceToRange > 0 ? '+' : '−'}${num(Math.abs(r.differenceToRange), 1)} ${r.unit}`}
                  sub={r.differenceToRange > 0 ? 'above the top of the range' : r.differenceToRange < 0 ? 'below the bottom of the range' : undefined}
                />
              </div>

              <Notice>
                BMI is a screening number, not a diagnosis. It does not separate muscle from fat or reflect age, sex, ethnicity or health history. Talk to a health professional before making decisions about your health.
              </Notice>
            </>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
