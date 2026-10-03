import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_TOOLS } from '@/data/youtube-data';
import { CONTENT_UPDATED, CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About ToolCalculators',
  description: 'Why ToolCalculators exists, how the calculators work, how we keep results honest, and how the site is funded.',
  alternates: { canonical: '/about' },
};

const sections = [
  {
    heading: 'What this site is',
    body: [
      `ToolCalculators is a free collection of ${ALL_TOOLS.length} calculators for money, business, creators and everyday decisions. Each one runs in your browser, needs no account, and shows its working so you can check the answer instead of taking it on trust.`,
    ],
  },
  {
    heading: 'How we keep results honest',
    body: [
      'Every calculator lists the formula it uses and the assumptions behind it, such as the fee rates, RPM ranges or tax rate, and lets you change them. Where a number is a rule of thumb rather than a standard formula, we say so.',
      'Core calculations are separate from the page layout and covered by automated tests, including checks that bad input never produces NaN or infinity. We review the methodology when formulas, fees or rules change; the date of the latest review appears on each tool page.',
    ],
  },
  {
    heading: 'Privacy by design',
    body: [
      'Calculator inputs are processed on your device. We do not ask for accounts and we do not store what you type. When a result is shareable, the numbers live in the link you copy, not on our servers.',
    ],
  },
  {
    heading: 'How the site is funded',
    body: [
      'The calculators are free. The site may show advertising and may link to products or services we think are relevant. Where a link earns us a commission it is labelled as an affiliate link. Neither advertising nor affiliate relationships change how a calculator works or what it shows.',
    ],
  },
  {
    heading: 'Estimates, not advice',
    body: [
      'Results are planning estimates based on the inputs you provide. They are not financial, tax, legal or medical advice, and real outcomes will differ. Read the full ',
    ],
  },
];

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent-1)' }}>About</p>
      <h1 className="mt-3 text-3xl font-black sm:text-4xl" style={{ color: 'var(--text-1)' }}>About ToolCalculators</h1>
      <p className="mt-3 text-sm" style={{ color: 'var(--text-3)' }}>Last reviewed {CONTENT_UPDATED}</p>

      <div className="mt-8 space-y-8 text-sm leading-7" style={{ color: 'var(--text-2)' }}>
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-2">
                {p}
                {s.heading === 'Estimates, not advice' && (
                  <Link href="/disclaimer" className="underline" style={{ color: 'var(--accent-1)' }}>disclaimer</Link>
                )}
                {s.heading === 'Estimates, not advice' && '.'}
              </p>
            ))}
          </section>
        ))}
        <section>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>Spotted a mistake or want a calculator?</h2>
          <p className="mt-2">
            Corrections and requests are welcome. Write to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline" style={{ color: 'var(--accent-1)' }}>{CONTACT_EMAIL}</a>{' '}
            or see the <Link href="/contact" className="underline" style={{ color: 'var(--accent-1)' }}>contact page</Link>.
          </p>
        </section>
      </div>
    </article>
  );
}
