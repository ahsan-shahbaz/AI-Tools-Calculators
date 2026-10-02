'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sparkles, Calculator, Flame, Menu, X, Zap, ChevronDown, Sun, Moon, Leaf, Waves, Gamepad2 } from 'lucide-react';
import { useTheme, THEMES } from './ThemeProvider';
import { useQuickGames } from './StayAndPlay';

const THEME_ICONS: Record<string, typeof Sun> = { sun: Sun, moon: Moon, leaf: Leaf, waves: Waves };

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const openQuickGames = useQuickGames();

  const currentTheme = THEMES.find((t) => t.id === theme) || THEMES[0];
  const CurrentThemeIcon = THEME_ICONS[currentTheme.icon];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close theme dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setThemeOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-200"
      style={{ backgroundColor: 'color-mix(in srgb, var(--bg-surface) 92%, transparent)', borderBottomColor: 'var(--border)', boxShadow: scrolled ? '0 8px 24px rgba(14,36,27,0.08)' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* ── Logo ─────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative w-9 h-9">
              <div
                className="absolute inset-0 rounded-xl blur-[3px] opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ background: 'var(--accent-1)' }}
              />
              <div
                className="relative w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                style={{ background: 'var(--accent-1)' }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[17px] font-bold tracking-tight transition-colors duration-300"
                style={{ color: 'var(--text-1)' }}>
                Tool<span style={{ color: 'var(--accent-1)' }}>Calculators</span>
              </span>
              <span
                className="hidden sm:block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border"
                style={{
                  background: 'var(--accent-glow)',
                  color: 'var(--accent-1)',
                  borderColor: 'var(--border-accent)',
                }}
              >
                Free
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ───────────────────────────── */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {[
              { href: '/#categories', label: 'Browse Tools', icon: <Calculator className="w-3.5 h-3.5" /> },
              { href: '/tools/youtube-money-calculator', label: 'YouTube RPM', icon: <Flame className="w-3.5 h-3.5" style={{ color: 'var(--accent-1)' }} /> },
              { href: '/#about', label: 'About', icon: null },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ color: 'var(--text-2)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-1)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ── Right actions ─────────────────────────── */}
          <div className="flex items-center gap-2 flex-shrink-0">

            <button
              type="button"
              onClick={openQuickGames}
              aria-label="Play a quick game"
              title="Play a quick game"
              className="inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-sm font-semibold transition-colors hover:bg-[var(--bg-card-hover)]"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-2)' }}
            >
              <Gamepad2 className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Play</span>
            </button>

            {/* Theme switcher */}
            <div className="relative" ref={themeRef}>
              <button
                type="button"
                aria-label={`Theme: ${currentTheme.label}`}
                aria-expanded={themeOpen}
                onClick={() => setThemeOpen(!themeOpen)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 border"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: themeOpen ? 'var(--border-accent)' : 'var(--border)',
                  color: 'var(--text-2)',
                }}
              >
                <CurrentThemeIcon className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:block text-xs font-semibold">{currentTheme.label}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${themeOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Theme dropdown */}
              {themeOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-56 rounded-xl border overflow-hidden z-50 shadow-xl"
                  role="group"
                  aria-label="Choose a color theme"
                  style={{
                    background: 'var(--bg-surface)',
                    borderColor: 'var(--border)',
                    boxShadow: '0 16px 40px rgba(14,36,27,0.16)',
                  }}
                >
                  <div className="p-1.5">
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 mb-0.5"
                      style={{ color: 'var(--text-3)' }}
                    >
                      Select Theme
                    </p>
                    {THEMES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        aria-pressed={theme === t.id}
                        onClick={() => { setTheme(t.id); setThemeOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-150 hover:bg-[var(--bg-card-hover)]"
                        style={{
                          background: theme === t.id ? 'var(--bg-card-hover)' : 'transparent',
                          borderLeft: theme === t.id ? `2px solid var(--accent-1)` : '2px solid transparent',
                        }}
                      >
                        {React.createElement(THEME_ICONS[t.icon], { className: 'w-4 h-4 flex-shrink-0', 'aria-hidden': true })}
                        <div>
                          <div
                            className="text-sm font-semibold"
                            style={{ color: theme === t.id ? 'var(--text-1)' : 'var(--text-2)' }}
                          >
                            {t.label}
                          </div>
                          <div className="text-[11px]" style={{ color: 'var(--text-3)' }}>
                            {t.description}
                          </div>
                        </div>
                        {theme === t.id && (
                          <div
                            className="ml-auto w-1.5 h-1.5 rounded-full pulse-dot"
                            style={{ background: 'var(--accent-1)' }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              href="/tools/youtube-money-calculator"
              className="btn-primary header-cta text-xs px-3 py-2"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="font-bold">Try a Tool</span>
            </Link>

            {/* Mobile burger */}
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg transition-all"
              style={{ color: 'var(--text-2)', background: mobileOpen ? 'var(--bg-card)' : 'transparent' }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────── */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="md:hidden border-b px-4 pt-2 pb-5 space-y-1 backdrop-blur-2xl"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderBottomColor: 'var(--border)',
          }}
        >
          {[
            { href: '/#categories', label: '🧮 Browse all calculators' },
            { href: '/tools/youtube-money-calculator', label: '🔥 YouTube Money & RPM Calculator', accent: true },
            { href: '/#about', label: 'ℹ️ About' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                color: item.accent ? 'var(--accent-1)' : 'var(--text-2)',
                background: item.accent ? 'rgba(139,92,246,0.08)' : 'transparent',
                border: item.accent ? '1px solid var(--border-accent)' : '1px solid transparent',
              }}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile theme picker */}
          <div
            className="rounded-xl p-3 mt-2 border"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-3)' }}>
              Theme
            </p>
            <div className="flex gap-2 flex-wrap">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={theme === t.id}
                  onClick={() => setTheme(t.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
                  style={{
                    background: theme === t.id ? 'var(--accent-1)' : 'var(--bg-card-hover)',
                    borderColor: theme === t.id ? 'var(--accent-1)' : 'var(--border)',
                    color: theme === t.id ? '#fff' : 'var(--text-2)',
                  }}
                >
                  {React.createElement(THEME_ICONS[t.icon], { className: 'w-3.5 h-3.5', 'aria-hidden': true })}
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/tools/youtube-money-calculator"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full justify-center text-sm py-3"
            >
              <Zap className="w-4 h-4" />
              Launch YouTube Calculator
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
