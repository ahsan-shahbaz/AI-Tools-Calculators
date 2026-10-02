'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'midnight' | 'aurora';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export const THEMES: { id: Theme; label: string; icon: string; description: string }[] = [
  { id: 'light',    label: 'Light',   icon: 'sun',   description: 'Bright and clear' },
  { id: 'dark',     label: 'Dark',    icon: 'moon',  description: 'Soft charcoal' },
  { id: 'midnight', label: 'Forest',  icon: 'leaf',  description: 'Deep green' },
  { id: 'aurora',   label: 'Ocean',   icon: 'waves', description: 'Deep teal' },
];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [ready, setReady] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tc-theme') as Theme | null;
      if (saved && THEMES.some((item) => item.id === saved)) setThemeState(saved);
    } catch {}
    setReady(true);
  }, []);

  // Keep the server-rendered palette in place until the saved preference is loaded.
  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('tc-theme', theme); } catch {}
  }, [theme, ready]);

  const setTheme = (t: Theme) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
