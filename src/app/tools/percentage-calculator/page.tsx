'use client';

import React, { useMemo } from 'react';
import ToolShell from '@/components/ToolShell';
import AdPlaceholder from '@/components/AdPlaceholder';
import { NumberField, Panel } from '@/components/CalcKit';
import { calculatePercentage, type PercentageMode } from '@/lib/percentage-calculator';
import { useUrlState } from '@/lib/use-url-state';

interface ModeConfig {
  id: PercentageMode;
  title: string;
  aLabel: string;
  bLabel: string;
  aSuffix?: string;
  bSuffix?: string;
  a: number;
  b: number;
  unit: '%' | '';
}

const MODES: ModeConfig[] = [
  { id: 'percent-of', title: 'What is X% of Y?', aLabel: 'Percentage', bLabel: 'Of this number', aSuffix: '%', a: 15, b: 200, unit: '' },
  { id: 'what-percent', title: 'X is what % of Y?', aLabel: 'This number (X)', bLabel: 'Is what percent of (Y)', a: 30, b: 120, unit: '%' },
  { id: 'change', title: '% change from A to B', aLabel: 'From (A)', bLabel: 'To (B)', a: 80, b: 100, unit: '%' },
  { id: 'increase', title: 'Increase a number by %', aLabel: 'Number', bLabel: 'Increase by', bSuffix: '%', a: 50, b: 10, unit: '' },
  { id: 'decrease', title: 'Decrease a number by %', aLabel: 'Number', bLabel: 'Decrease by', bSuffix: '%', a: 50, b: 10, unit: '' },
];

type State = Record<string, number>;

function ModeCard({ mode, s, set }: { mode: ModeConfig; s: State; set: (patch: State) => void }) {
  const a = s[`${mode.id}_a`];
  const b = s[`${mode.id}_b`];
  const result = useMemo(() => calculatePercentage(mode.id, a, b), [mode.id, a, b]);

  return (
    <Panel title={mode.title}>
      <div className="grid grid-cols-2 gap-4">
        <NumberField id={`${mode.id}-a`} label={mode.aLabel} suffix={mode.aSuffix} min={-1e12} value={a} onChange={(v) => set({ [`${mode.id}_a`]: v })} />
        <NumberField id={`${mode.id}-b`} label={mode.bLabel} suffix={mode.bSuffix} min={-1e12} value={b} onChange={(v) => set({ [`${mode.id}_b`]: v })} />
      </div>
      <div className="mt-5 rounded-xl border p-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }} aria-live="polite">
        {result.error ? (
          <p className="text-sm" style={{ color: '#be4f3d' }}>{result.error}</p>
        ) : (
          <>
            <p className="text-3xl font-black" style={{ color: 'var(--accent-1)' }}>
              {result.value?.toLocaleString('en-US', { maximumFractionDigits: 4 })}{mode.unit}
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-2)' }}>{result.sentence}</p>
          </>
        )}
      </div>
    </Panel>
  );
}

const DEFAULTS: State = Object.fromEntries(MODES.flatMap((m) => [[`${m.id}_a`, m.a], [`${m.id}_b`, m.b]]));

export default function PercentageCalculatorPage() {
  // One shared state so all five cards read and write the URL together.
  const [s, set] = useUrlState(DEFAULTS);
  return (
    <ToolShell
      icon="%"
      badge="Everyday Math"
      title={<>Percentage <span className="shimmer-text">Calculator</span></>}
      subtitle="Five common percentage questions in one place: X% of Y, what percent, percentage change, and increase or decrease by a percent."
      accentColor="violet"
      breadcrumbs={[{ label: 'Everyday Math', href: '/category/everyday-math' }, { label: 'Percentage Calculator' }]}
    >
      <AdPlaceholder slot="leaderboard" />
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {MODES.map((m) => (
          <ModeCard key={m.id} mode={m} s={s} set={set} />
        ))}
      </div>
    </ToolShell>
  );
}
