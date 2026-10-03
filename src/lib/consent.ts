'use client';

import { useSyncExternalStore } from 'react';

export type ConsentState = 'unknown' | 'granted' | 'denied';

const STORAGE_KEY = 'tc-consent';
const EVENT = 'tc-consent-change';

function read(): ConsentState {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : 'unknown';
  } catch {
    return 'unknown';
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export function setConsent(value: 'granted' | 'denied' | 'unknown') {
  try {
    if (value === 'unknown') window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage blocked: the choice simply will not persist */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Returns 'unknown' on the server and during hydration, then the stored choice. */
export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, read, () => 'unknown' as ConsentState);
}
