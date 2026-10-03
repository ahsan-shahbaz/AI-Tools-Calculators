import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculator Disclaimer',
  description: 'Important information about the estimates and general guidance provided by ToolCalculators.',
  alternates: { canonical: '/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--accent-1)]">Please read</p>
      <h1 className="mt-3 text-3xl font-black text-[color:var(--text-1)] sm:text-4xl">Calculator Disclaimer</h1>
      <p className="mt-3 text-sm text-[color:var(--text-3)]">Last updated September 26, 2026</p>

      <div className="mt-8 space-y-7 text-sm leading-7 text-[color:var(--text-2)]">
        <section>
          <h2 className="text-lg font-bold text-[color:var(--text-1)]">Estimates, not guarantees</h2>
          <p className="mt-2">All calculator results are estimates based on the assumptions, rates, and values shown or entered. Actual creator revenue, sponsorship rates, marketplace fees, taxes, take-home pay, and business results vary by location, provider, audience, timing, and individual circumstances. Check current rates with the relevant platform or professional before acting.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[color:var(--text-1)]">Not professional advice</h2>
          <p className="mt-2">Content on this site is educational and is not financial, investment, tax, legal, medical, or nutrition advice. Health and calorie estimates are not a diagnosis or treatment plan. Consult a qualified professional for guidance specific to you.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[color:var(--text-1)]">Third-party links and recommendations</h2>
          <p className="mt-2">Third-party products and platforms are independent of ToolCalculators. Recommendation links are currently direct links; any future compensated or affiliate relationships will be identified clearly.</p>
        </section>
      </div>
    </article>
  );
}
