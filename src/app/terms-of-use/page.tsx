import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Read the terms for using ToolCalculators free online tools and calculators.',
  alternates: { canonical: '/terms-of-use' },
};

export default function TermsOfUsePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-red-700">Site information</p>
      <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Terms of Use</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated September 26, 2026</p>

      <div className="mt-8 space-y-7 text-sm leading-7 text-slate-700">
        <section>
          <h2 className="text-lg font-bold text-slate-900">Using the tools</h2>
          <p className="mt-2">ToolCalculators provides free online calculators and utilities for general informational and planning purposes. You may use the tools for lawful personal or business purposes. Do not misuse the site, interfere with its operation, or rely on it as a substitute for professional review.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">Estimates and professional advice</h2>
          <p className="mt-2">Results depend on the values and assumptions entered and may not reflect real-world outcomes. Financial, tax, business, creator earnings, and health-related results are estimates, not professional financial, tax, legal, medical, or nutrition advice. Verify important decisions with a qualified professional and the relevant provider or authority.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">Third-party services</h2>
          <p className="mt-2">Links to third-party products or services are provided for convenience and do not imply endorsement. Third-party sites have their own terms, availability, prices, and privacy practices.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">Availability and changes</h2>
          <p className="mt-2">Tools and site content may be changed, suspended, or removed. We aim to keep results useful but do not guarantee uninterrupted availability, completeness, or accuracy. To the extent permitted by law, use the site at your own discretion and verify consequential results independently.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">Trademarks</h2>
          <p className="mt-2">Product and platform names belong to their respective owners. ToolCalculators is an independent resource and is not affiliated with or endorsed by those platforms.</p>
        </section>
      </div>
    </article>
  );
}
