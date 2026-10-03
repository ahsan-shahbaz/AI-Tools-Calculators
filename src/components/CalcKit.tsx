'use client';

import React, { ReactNode, useEffect, useState } from 'react';

/** Small shared building blocks so every new calculator looks and behaves the same. */

export function Panel({ title, icon, children, className = '' }: { title: string; icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-2xl p-5 sm:p-6 ${className}`}>
      <h2
        className="mb-5 flex items-center gap-2 border-b pb-3 text-lg font-bold"
        style={{ color: 'var(--text-1)', borderColor: 'var(--border)' }}
      >
        {icon && <span style={{ color: 'var(--accent-1)' }}>{icon}</span>}
        {title}
      </h2>
      {children}
    </div>
  );
}

interface NumberFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number | string;
  min?: number;
  max?: number;
  hint?: string;
}

/** Numeric input that lets the user clear the box while typing instead of snapping back to 0. */
export function NumberField({ id, label, value, onChange, prefix, suffix, step = 'any', min = 0, max, hint }: NumberFieldProps) {
  const [text, setText] = useState(String(value));

  useEffect(() => {
    setText((current) => (Number(current) === value && current !== '' ? current : String(value)));
  }, [value]);

  const invalid = max !== undefined && value > max;

  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-3)' }}>
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={text}
          aria-describedby={hint ? `${id}-hint` : undefined}
          aria-invalid={invalid || undefined}
          onChange={(e) => {
            setText(e.target.value);
            const parsed = parseFloat(e.target.value);
            onChange(Number.isFinite(parsed) ? parsed : 0);
          }}
          className="form-input"
          style={{ paddingLeft: prefix ? '2rem' : undefined, paddingRight: suffix ? '2.5rem' : undefined }}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-3)' }}>
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[11px]" style={{ color: invalid ? '#be4f3d' : 'var(--text-3)' }}>
          {hint}
        </p>
      )}
    </div>
  );
}

export function SelectField<T extends string | number>({
  id, label, value, onChange, options,
}: { id: string; label: string; value: T; onChange: (value: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <select
        id={id}
        className="form-select"
        value={value}
        onChange={(e) => {
          const match = options.find((o) => String(o.value) === e.target.value);
          if (match) onChange(match.value);
        }}
      >
        {options.map((o) => (
          <option key={String(o.value)} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export function Segmented<T extends string>({
  label, value, onChange, options,
}: { label: string; value: T; onChange: (value: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div role="group" aria-label={label}>
      <span className="label">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${value === o.value ? 'pill-active' : ''}`}
            style={value !== o.value ? { background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-2)' } : undefined}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ResultTile({ label, value, sub, big = false }: { label: string; value: string; sub?: string; big?: boolean }) {
  return (
    <div className="rounded-xl border p-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{label}</p>
      <p className={`mt-1.5 font-black ${big ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`} style={{ color: 'var(--accent-1)' }}>
        {value}
      </p>
      {sub && <p className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>{sub}</p>}
    </div>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border px-4 py-3 text-xs leading-relaxed" role="status" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)', color: 'var(--text-2)' }}>
      {children}
    </p>
  );
}

export const money = (n: number, digits = 0) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: digits, maximumFractionDigits: digits });

export const num = (n: number, digits = 0) => n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
