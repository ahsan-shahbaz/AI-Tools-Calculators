'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Primitive = string | number;

/**
 * Keeps calculator inputs in the URL query string so a result can be shared or bookmarked.
 * - First render uses `defaults` (keeps server and client markup identical).
 * - After mount, matching query parameters are applied once, coerced to each default's type.
 * - Later changes are written back with history.replaceState (no navigation, no scroll jump).
 */
export function useUrlState<T extends Record<string, Primitive>>(defaults: T) {
  const [state, setState] = useState<T>(defaults);
  const defaultsRef = useRef(defaults);
  const hydrated = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = { ...defaultsRef.current } as Record<string, Primitive>;
    let changed = false;
    for (const key of Object.keys(defaultsRef.current)) {
      const raw = params.get(key);
      if (raw === null) continue;
      if (typeof defaultsRef.current[key] === 'number') {
        const parsed = Number(raw);
        if (raw.trim() !== '' && Number.isFinite(parsed)) {
          next[key] = parsed;
          changed = true;
        }
      } else {
        next[key] = raw.slice(0, 40);
        changed = true;
      }
    }
    if (changed) setState(next as T);
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(state)) {
      if (value !== defaultsRef.current[key]) params.set(key, String(value));
    }
    const query = params.toString();
    const url = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
    window.history.replaceState(null, '', url);
  }, [state]);

  const update = useCallback((patch: Partial<T>) => setState((prev) => ({ ...prev, ...patch })), []);
  return [state, update] as const;
}
