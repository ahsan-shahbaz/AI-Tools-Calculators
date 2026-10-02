'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Code,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Play,
  Terminal,
  Layers,
  CheckCircle2,
  FileCode2,
  Zap,
  Tag
} from 'lucide-react';
import { REGEX_PRESETS, generateRegexFromQuery } from '@/lib/regex-generator';
import { RegexGenerationResult } from '@/types/regex';
import AdPlaceholder from '@/components/AdPlaceholder';

export default function RegexGenerator() {
  const [query, setQuery] = useState<string>('Valid email address with standard domain');
  const [flags, setFlags] = useState<{ g: boolean; i: boolean; m: boolean }>({ g: true, i: false, m: false });
  const [testString, setTestString] = useState<string>(REGEX_PRESETS[0].sampleTestText);
  const [activeCodeTab, setActiveCodeTab] = useState<'javascript' | 'python' | 'php' | 'golang'>('javascript');

  const [regexResult, setRegexResult] = useState<RegexGenerationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedRegex, setCopiedRegex] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Computed flags string
  const flagsString = useMemo(() => {
    let f = '';
    if (flags.g) f += 'g';
    if (flags.i) f += 'i';
    if (flags.m) f += 'm';
    return f;
  }, [flags]);

  // Initial load
  useEffect(() => {
    generateRegexFromQuery(query, flagsString).then(setRegexResult);
  }, []);

  // Handle generation trigger
  const handleGenerate = async () => {
    if (!query.trim()) return;
    setIsGenerating(true);
    try {
      const res = await generateRegexFromQuery(query, flagsString);
      setRegexResult(res);
    } finally {
      setIsGenerating(false);
    }
  };

  // Preset selection
  const handleSelectPreset = (preset: typeof REGEX_PRESETS[0]) => {
    setQuery(preset.query);
    setTestString(preset.sampleTestText);
    const newFlags = {
      g: preset.flags.includes('g'),
      i: preset.flags.includes('i'),
      m: preset.flags.includes('m'),
    };
    setFlags(newFlags);
    generateRegexFromQuery(preset.query, preset.flags).then(setRegexResult);
  };

  // Perform live matching
  const matchDetails = useMemo(() => {
    if (!regexResult || !regexResult.pattern) return { matches: [], count: 0, isValid: true };
    try {
      const re = new RegExp(regexResult.pattern, flagsString);
      const matches: string[] = [];
      if (flagsString.includes('g')) {
        const found = testString.match(re);
        return { matches: found || [], count: found ? found.length : 0, isValid: true };
      } else {
        const found = testString.match(re);
        return { matches: found ? [found[0]] : [], count: found ? 1 : 0, isValid: true };
      }
    } catch (err) {
      return { matches: [], count: 0, isValid: false };
    }
  }, [regexResult, flagsString, testString]);

  // Copy Regex
  const handleCopyRegex = () => {
    if (!regexResult) return;
    navigator.clipboard.writeText(`/${regexResult.pattern}/${flagsString}`);
    setCopiedRegex(true);
    setTimeout(() => setCopiedRegex(false), 2500);
  };

  // Copy Code
  const handleCopyCode = () => {
    if (!regexResult) return;
    navigator.clipboard.writeText(regexResult.codeSnippets[activeCodeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/#categories" className="hover:text-red-600 transition-colors">Developer Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">Plain English to Regex Generator</span>
        </nav>

        {/* Top Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Code className="w-4 h-4 text-amber-600" />
            Developer Regex Assistant & Live Sandbox
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Plain English to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600">Regex Generator & Tester</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Describe what you need to match in plain words. Get the exact regular expression syntax, token-by-token explanation, and test it in real time.
          </p>
        </div>

        {/* Top AdSlot */}
        <AdPlaceholder slot="leaderboard" />

        {/* PRESET CHIPS */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          <span className="text-slate-400 font-semibold whitespace-nowrap flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Popular Presets:
          </span>
          {REGEX_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-slate-700 font-medium whitespace-nowrap transition-all shadow-sm"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* SEARCH & PROMPT BOX */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Describe What You Want to Match
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Match international phone numbers with optional country code, or match ISO date YYYY-MM-DD..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full sm:w-auto h-[46px] px-6 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 transition-all shadow-md shadow-amber-500/20 disabled:opacity-75 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Compiling...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Regex</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Regex Flags Toggles */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-500 uppercase text-[10px]">Flags:</span>
            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={flags.g}
                onChange={(e) => setFlags({ ...flags, g: e.target.checked })}
                className="w-4 h-4 rounded text-amber-600 accent-amber-600"
              />
              <code>g</code> (global)
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={flags.i}
                onChange={(e) => setFlags({ ...flags, i: e.target.checked })}
                className="w-4 h-4 rounded text-amber-600 accent-amber-600"
              />
              <code>i</code> (case-insensitive)
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={flags.m}
                onChange={(e) => setFlags({ ...flags, m: e.target.checked })}
                className="w-4 h-4 rounded text-amber-600 accent-amber-600"
              />
              <code>m</code> (multiline)
            </label>
          </div>
        </div>

        {/* 2-COLUMN MAIN WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Generated Regex & Token Breakdown (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Generated Pattern Display Card */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" />
                  Regular Expression Pattern
                </span>
                <button
                  type="button"
                  onClick={handleCopyRegex}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-sm"
                >
                  {copiedRegex ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Pattern</span>
                    </>
                  )}
                </button>
              </div>

              {/* Large Monospace Regex */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-emerald-400 break-all leading-relaxed">
                <span className="text-slate-500">/</span>
                <span className="text-amber-300 font-bold">{regexResult?.pattern || '...'}</span>
                <span className="text-slate-500">/</span>
                <span className="text-rose-400 font-bold">{flagsString}</span>
              </div>
            </div>

            {/* Token-by-Token Plain English Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-600" />
                Plain-English Token Explanation
              </h3>
              
              <div className="space-y-2.5">
                {regexResult?.explanation.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-xs">
                    <code className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-bold font-mono text-[11px] inline-block mb-1">
                      {item.token}
                    </code>
                    <p className="text-slate-600 leading-relaxed">
                      {item.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippets (JS, Python, PHP, Go) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                <div className="flex gap-1.5">
                  {(['javascript', 'python', 'php', 'golang'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveCodeTab(lang)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                        activeCodeTab === lang
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {lang === 'golang' ? 'Go' : lang}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono whitespace-pre overflow-x-auto leading-relaxed border border-slate-800">
                {regexResult?.codeSnippets[activeCodeTab]}
              </pre>
            </div>

          </div>

          {/* RIGHT COLUMN: Live Interactive Matcher (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  Live Interactive Tester
                </h3>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  matchDetails.count > 0
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {matchDetails.count} {matchDetails.count === 1 ? 'match' : 'matches'} found
                </span>
              </div>

              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Test String / Input Text
              </label>
              <textarea
                rows={7}
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Type or paste sample text here to test against the generated regular expression..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />

              {/* Extracted Matches List */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Captured Matches ({matchDetails.count})
                </span>

                {matchDetails.count > 0 ? (
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
                    {matchDetails.matches.map((m, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-mono text-xs font-bold"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400">
                    No matching patterns found in the test string.
                  </div>
                )}
              </div>
            </div>

            {/* Regex Cheat Sheet card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-xs space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Quick Regex Cheat Sheet</h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-700">
                <div><code>^</code> Starts with string</div>
                <div><code>$</code> Ends with string</div>
                <div><code>\d</code> Any numerical digit [0-9]</div>
                <div><code>\w</code> Any word character [a-zA-Z0-9_]</div>
                <div><code>+</code> 1 or more times</div>
                <div><code>*</code> 0 or more times</div>
                <div><code>?</code> Optional (0 or 1 time)</div>
                <div><code>{'{n,m}'}</code> Between n and m times</div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom In-Feed Ad Banner */}
        <AdPlaceholder slot="in-feed" className="my-10" />

        {/* SEO & FAQ SECTION */}
        <section className="mt-12 pt-10 border-t border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Frequently Asked Questions About Regular Expressions
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  What is ReDoS (Regular Expression Denial of Service)?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  ReDoS occurs when a regular expression uses nested quantifiers (e.g. <code>(a+)+$</code>) that cause catastrophic backtracking when matched against long non-matching strings, freezing the server CPU. Our generator automatically avoids vulnerable greedy combinations.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  What is the difference between greedy and non-greedy matching?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  By default, quantifiers like <code>*</code> and <code>+</code> are <strong>greedy</strong>, meaning they match as many characters as possible. Adding a <code>?</code> (e.g. <code>.*?</code>) makes the quantifier <strong>lazy / non-greedy</strong>, stopping at the very first occurrence.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
