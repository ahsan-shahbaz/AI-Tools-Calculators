'use client';

import Link from 'next/link';
import { Cookie } from 'lucide-react';
import { setConsent, useConsent } from '@/lib/consent';
import { CONSENT_REQUIRED } from '@/lib/site';

/**
 * Renders only when advertising or analytics is configured (see lib/site.ts).
 * Nothing third-party loads until the visitor accepts; "Decline" keeps the site fully usable.
 */
export default function ConsentBanner() {
  const consent = useConsent();
  if (!CONSENT_REQUIRED || consent !== 'unknown') return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie and privacy choices"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border p-4 shadow-2xl sm:p-5"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-accent)' }}
    >
      <div className="flex items-start gap-3">
        <Cookie className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: 'var(--accent-1)' }} />
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
            Help keep these calculators free
          </p>
          <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
            We use cookies for advertising and anonymous usage statistics. Your calculator inputs never leave your
            browser. You can change your choice at any time from the footer.{' '}
            <Link href="/privacy-policy" className="underline" style={{ color: 'var(--accent-1)' }}>
              Privacy policy
            </Link>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn-primary !px-4 !py-2 !text-xs" onClick={() => setConsent('granted')}>
              Accept
            </button>
            <button type="button" className="btn-secondary !px-4 !py-2 !text-xs" onClick={() => setConsent('denied')}>
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
