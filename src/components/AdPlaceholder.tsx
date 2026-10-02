import React from 'react';

interface AdPlaceholderProps {
  slot: 'leaderboard' | 'in-feed' | 'sidebar' | 'rectangle';
  className?: string;
}

export default function AdPlaceholder({ slot, className = '' }: AdPlaceholderProps) {
  if (process.env.NODE_ENV === 'production') return null;

  // Height and style profiles for standard IAB ad dimensions
  const slotStyles = {
    leaderboard: 'min-h-[90px] w-full max-w-[728px] mx-auto',
    'in-feed': 'min-h-[120px] w-full',
    sidebar: 'min-h-[250px] w-full max-w-[300px] mx-auto',
    rectangle: 'min-h-[250px] w-full max-w-[336px] mx-auto',
  };

  return (
    <div
      className={`my-6 rounded-xl border border-dashed p-4 flex flex-col items-center justify-center text-center transition-colors ${slotStyles[slot]} ${className}`}
      style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
    >
      <div
        className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: 'var(--text-3)' }}
      >
        <span>Ad placement preview</span>
      </div>
      <p className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>
        {slot} slot
      </p>
      {/* Ready for live ad insertion: <ins className="adsbygoogle" ... /> */}
    </div>
  );
}
