'use client';

import React, { useEffect, useRef } from 'react';
import { useConsent } from '@/lib/consent';
import { ADSENSE_CLIENT, ADSENSE_SLOTS } from '@/lib/site';

type Slot = 'leaderboard' | 'in-feed' | 'sidebar' | 'rectangle';

interface AdPlaceholderProps {
  slot: Slot;
  className?: string;
}

// Reserved heights stop the page jumping when an ad loads.
const slotStyles: Record<Slot, string> = {
  leaderboard: 'min-h-[90px] w-full max-w-[728px] mx-auto',
  'in-feed': 'min-h-[120px] w-full',
  sidebar: 'min-h-[250px] w-full max-w-[300px] mx-auto',
  rectangle: 'min-h-[250px] w-full max-w-[336px] mx-auto',
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Ad slot used across the site.
 * - Development: dashed preview box so you can see placement.
 * - Production without NEXT_PUBLIC_ADSENSE_CLIENT: renders nothing.
 * - Production with AdSense configured: renders a labelled ad unit once the visitor has accepted cookies.
 *   If no slot ID is set for this placement, nothing is rendered here (AdSense Auto ads can still run).
 */
export default function AdPlaceholder({ slot, className = '' }: AdPlaceholderProps) {
  const consent = useConsent();
  const pushed = useRef(false);
  const slotId = ADSENSE_SLOTS[slot];
  const live = Boolean(ADSENSE_CLIENT && slotId) && consent === 'granted';

  useEffect(() => {
    if (!live || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blockers or a not-yet-loaded script must never break the page */
    }
  }, [live]);

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div
        className={`my-6 rounded-xl border border-dashed p-4 flex flex-col items-center justify-center text-center ${slotStyles[slot]} ${className}`}
        style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
      >
        <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
          Ad placement preview
        </div>
        <p className="mt-1 text-xs" style={{ color: 'var(--text-3)' }}>
          {slot} slot
        </p>
      </div>
    );
  }

  if (!live) return null;

  return (
    <aside aria-label="Advertisement" className={`my-6 ${slotStyles[slot]} ${className}`}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
        Advertisement
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
