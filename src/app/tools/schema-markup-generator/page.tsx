'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Code2,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  HelpCircle,
  ExternalLink,
  Plus,
  Trash2,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Layers,
  Globe,
  Tag
} from 'lucide-react';
import { SchemaType, SchemaFormData, FAQItem, HowToStep } from '@/types/schema';
import { generateJsonLd, extractSchemaFromText } from '@/lib/schema-generator';
import AdPlaceholder from '@/components/AdPlaceholder';

const INITIAL_FORM: SchemaFormData = {
  type: 'FAQPage',
  faqs: [
    { question: 'What is JSON-LD Schema Markup?', answer: 'JSON-LD is a structured data format recommended by Google to annotate page content for search engines.' },
    { question: 'Does Schema Markup improve Google rankings?', answer: 'Yes, schema markup helps you win Google Rich Snippets (star ratings, FAQ accordions, pricing) which significantly boosts search CTR.' }
  ],
  headline: 'How to Build an AI Website in 2026',
  authorName: 'Alex Rivera',
  publisherName: 'ToolCalculators',
  datePublished: new Date().toISOString().split('T')[0],
  articleDescription: 'A complete step-by-step tutorial on building and monetizing free online calculators and tools.',
  articleImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
  productName: 'Ergonomic Standing Desk Converter',
  productImage: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800',
  productDescription: 'Heavy-duty adjustable standing desk riser with dual-monitor support.',
  brand: 'FlexiDesk',
  sku: 'FD-STAND-01',
  price: 149.99,
  currency: 'USD',
  availability: 'InStock',
  ratingValue: 4.8,
  reviewCount: 94,
  businessName: 'Downtown Dental Care',
  businessType: 'Dentist',
  streetAddress: '123 Main Street, Suite 400',
  addressLocality: 'Austin',
  addressRegion: 'TX',
  postalCode: '78701',
  addressCountry: 'US',
  telephone: '+1-512-555-0199',
  businessUrl: 'https://exampledental.com',
  priceRange: '$$',
  howToName: 'How to Reset Your Router',
  howToDescription: 'Fix slow internet in 3 simple steps.',
  totalTime: 'PT5M',
  steps: [
    { name: 'Unplug Power Cable', text: 'Unplug the power cord from the back of the modem and wait 30 seconds.' },
    { name: 'Reconnect Power', text: 'Plug the power cord back in and wait for the status lights to turn solid green.' }
  ]
};

export default function SchemaMarkupGenerator() {
  const [formData, setFormData] = useState<SchemaFormData>(INITIAL_FORM);
  const [activeTab, setActiveTab] = useState<'form' | 'ai'>('form');
  const [rawText, setRawText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  // Generate output
  const jsonLdString = useMemo(() => {
    return generateJsonLd(formData);
  }, [formData]);

  const scriptTagOutput = `<script type="application/ld+json">\n${jsonLdString}\n</script>`;

  // Handle FAQ item additions
  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData((prev) => {
      const nextFaqs = [...prev.faqs];
      nextFaqs[index][field] = value;
      return { ...prev, faqs: nextFaqs };
    });
  };

  const removeFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, idx) => idx !== index)
    }));
  };

  // AI Extract
  const handleExtract = async () => {
    if (!rawText.trim()) return;
    setIsExtracting(true);
    try {
      const extracted = await extractSchemaFromText(rawText, formData.type);
      setFormData((prev) => ({ ...prev, ...extracted }));
      setActiveTab('form');
    } finally {
      setIsExtracting(false);
    }
  };

  // Copy
  const handleCopy = () => {
    navigator.clipboard.writeText(scriptTagOutput);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/#categories" className="hover:text-red-600 transition-colors">SEO & Webmaster</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">JSON-LD Schema Generator</span>
        </nav>

        {/* Top Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Code2 className="w-4 h-4 text-violet-600" />
            Google Rich Snippets & Structured Data
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            JSON-LD <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">Schema Markup Generator</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Create validated Google-compliant structured data for FAQs, Articles, Products, and Local Businesses to win rich search snippets and higher CTR.
          </p>
        </div>

        {/* Top AdSlot */}
        <AdPlaceholder slot="leaderboard" />

        {/* SCHEMA TYPE SELECTOR TABS */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Select Schema.org Structured Data Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { id: 'FAQPage', name: 'FAQ Page', icon: '❓' },
              { id: 'Article', name: 'Article / Blog', icon: '📰' },
              { id: 'Product', name: 'Product', icon: '🏷️' },
              { id: 'LocalBusiness', name: 'Local Business', icon: '📍' },
              { id: 'HowTo', name: 'How-To Guide', icon: '🛠️' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, type: tab.id as SchemaType }))}
                className={`p-3 rounded-xl border text-left transition-all ${
                  formData.type === tab.id
                    ? 'bg-violet-50 border-violet-500 ring-2 ring-violet-500/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="text-xl block mb-1">{tab.icon}</span>
                <span className="text-xs font-bold text-slate-900 block leading-tight">
                  {tab.name}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  schema.org/{tab.id}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN 2-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Input Form or AI Extractor (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              
              {/* Form vs AI Tab Switcher */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'form'
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Structured Fields
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('ai')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'ai'
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm'
                        : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Auto-Extract
                  </button>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  @{formData.type}
                </span>
              </div>

              {/* AI EXTRACTOR TAB */}
              {activeTab === 'ai' ? (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-violet-50 text-xs text-violet-800 leading-relaxed">
                    💡 Paste your raw blog post, product specs, or FAQ notes below. Our AI will automatically parse and fill the required Schema.org fields.
                  </div>
                  <textarea
                    rows={8}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste your page text here (e.g. Q: How long does shipping take? A: Standard shipping takes 3-5 business days...)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleExtract}
                    disabled={isExtracting || !rawText.trim()}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 transition-all shadow-md shadow-violet-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isExtracting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Extracting Entities...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Extract & Populate Schema</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* STRUCTURED FIELDS FOR SELECTED TYPE */
                <div className="space-y-4">
                  
                  {/* 1. FAQPage */}
                  {formData.type === 'FAQPage' && (
                    <div className="space-y-4">
                      {formData.faqs.map((faq, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 relative group">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold uppercase text-slate-500">
                              Question #{idx + 1}
                            </span>
                            {formData.faqs.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeFaq(idx)}
                                className="text-slate-400 hover:text-rose-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                            placeholder="e.g. What is your return policy?"
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 mb-2 focus:ring-1 focus:ring-violet-500"
                          />
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                            placeholder="e.g. We offer a 30-day money-back guarantee..."
                            className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-violet-500"
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addFaq}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-800 bg-violet-50 hover:bg-violet-100 px-3 py-2 rounded-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Question</span>
                      </button>
                    </div>
                  )}

                  {/* 2. Article */}
                  {formData.type === 'Article' && (
                    <div className="space-y-3.5 text-xs">
                      <div>
                        <label className="font-bold text-slate-600 block mb-1">Article Headline</label>
                        <input
                          type="text"
                          value={formData.headline}
                          onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-600 block mb-1">Author Name</label>
                        <input
                          type="text"
                          value={formData.authorName}
                          onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Publisher</label>
                          <input
                            type="text"
                            value={formData.publisherName}
                            onChange={(e) => setFormData({ ...formData, publisherName: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Date Published</label>
                          <input
                            type="date"
                            value={formData.datePublished}
                            onChange={(e) => setFormData({ ...formData, datePublished: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-bold text-slate-600 block mb-1">Featured Image URL</label>
                        <input
                          type="text"
                          value={formData.articleImage}
                          onChange={(e) => setFormData({ ...formData, articleImage: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>
                  )}

                  {/* 3. Product */}
                  {formData.type === 'Product' && (
                    <div className="space-y-3.5 text-xs">
                      <div>
                        <label className="font-bold text-slate-600 block mb-1">Product Name</label>
                        <input
                          type="text"
                          value={formData.productName}
                          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Price</label>
                          <input
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Currency</label>
                          <input
                            type="text"
                            value={formData.currency}
                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Brand</label>
                          <input
                            type="text"
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Rating (1-5)</label>
                          <input
                            type="number"
                            step="0.1"
                            max="5"
                            value={formData.ratingValue}
                            onChange={(e) => setFormData({ ...formData, ratingValue: Number(e.target.value) })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Review Count</label>
                          <input
                            type="number"
                            value={formData.reviewCount}
                            onChange={(e) => setFormData({ ...formData, reviewCount: Number(e.target.value) })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. LocalBusiness */}
                  {formData.type === 'LocalBusiness' && (
                    <div className="space-y-3.5 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Business Name</label>
                          <input
                            type="text"
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Business Type</label>
                          <input
                            type="text"
                            value={formData.businessType}
                            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                            placeholder="Restaurant, Dentist, LegalService..."
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-bold text-slate-600 block mb-1">Street Address</label>
                        <input
                          type="text"
                          value={formData.streetAddress}
                          onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">City</label>
                          <input
                            type="text"
                            value={formData.addressLocality}
                            onChange={(e) => setFormData({ ...formData, addressLocality: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">State / Region</label>
                          <input
                            type="text"
                            value={formData.addressRegion}
                            onChange={(e) => setFormData({ ...formData, addressRegion: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-600 block mb-1">Postal Code</label>
                          <input
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. HowTo */}
                  {formData.type === 'HowTo' && (
                    <div className="space-y-3.5 text-xs">
                      <div>
                        <label className="font-bold text-slate-600 block mb-1">Guide Title</label>
                        <input
                          type="text"
                          value={formData.howToName}
                          onChange={(e) => setFormData({ ...formData, howToName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-600 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={formData.howToDescription}
                          onChange={(e) => setFormData({ ...formData, howToDescription: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                        />
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>

          {/* RIGHT COLUMN: Output Code Box (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-xs font-mono text-slate-400 ml-2">JSON-LD Output</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://search.google.com/test/rich-results"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    <span>Test on Google</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    {copiedScript ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code viewer */}
              <div className="p-4 overflow-x-auto max-h-[500px]">
                <pre className="text-xs font-mono text-emerald-400 leading-relaxed whitespace-pre">
                  {scriptTagOutput}
                </pre>
              </div>

              <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Format: <code>&lt;script type="application/ld+json"&gt;</code></span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Valid Schema.org
                </span>
              </div>
            </div>

            {/* How to install instructions card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Where do I paste this code?</h4>
              <p>
                Copy the code snippet above and paste it inside the <code>&lt;head&gt;</code> section of your HTML or directly before the closing <code>&lt;/body&gt;</code> tag on the specific page.
              </p>
              <p>
                In WordPress, you can paste it inside an <strong>HTML Block</strong>, or using plugins like <em>Insert Headers and Footers</em>. In Next.js, embed it via <code>&lt;script type="application/ld+json" dangerouslySetInnerHTML=&#123;...&#125; /&gt;</code>.
              </p>
            </div>

          </div>

        </div>

        {/* Bottom In-Feed Ad Banner */}
        <AdPlaceholder slot="in-feed" className="my-10" />

        {/* FAQ Section */}
        <section className="mt-12 pt-10 border-t border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Frequently Asked Questions About Schema Markup
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-violet-600" />
                  Why does Google prefer JSON-LD over Microdata?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  JSON-LD is decoupled from your website's presentation layer. Unlike Microdata, which forces you to inject schema attributes directly into HTML tags, JSON-LD is self-contained inside a clean <code>&lt;script&gt;</code> tag. It reduces code bloat and is much easier to maintain.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-violet-600" />
                  How quickly will Google display my rich snippet?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  After publishing your JSON-LD code and requesting a re-crawl in Google Search Console, Google typically processes rich snippets within <strong>3 to 14 days</strong>, provided your site complies with Google Search Quality Guidelines.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
