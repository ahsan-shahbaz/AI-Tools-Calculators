'use client';

import { setConsent } from '@/lib/consent';
import { CONSENT_REQUIRED } from '@/lib/site';

/** Lets visitors reopen the cookie choice. Hidden until ads or analytics are configured. */
export default function CookieSettings() {
  if (!CONSENT_REQUIRED) return null;
  return (
    <button type="button" onClick={() => setConsent('unknown')} className="mt-2 block underline">
      Cookie settings
    </button>
  );
}
