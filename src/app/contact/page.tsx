import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact ToolCalculators',
  description: 'Report a calculation error, suggest a new calculator, or ask about advertising and partnerships.',
  alternates: { canonical: '/contact' },
};

const topics = [
  { title: 'Report an error', body: 'Tell us which calculator, what you entered, and what you expected. A link from the Copy link button reproduces your inputs.' },
  { title: 'Suggest a calculator', body: 'Describe the question you are trying to answer and who it is for. Popular requests get built first.' },
  { title: 'Advertising & partnerships', body: 'Questions about sponsorships, partnerships or press are welcome. Sponsored content is always labelled.' },
];

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent-1)' }}>Contact</p>
      <h1 className="mt-3 text-3xl font-black sm:text-4xl" style={{ color: 'var(--text-1)' }}>Contact us</h1>
      <p className="mt-4 text-sm leading-7" style={{ color: 'var(--text-2)' }}>
        The quickest way to reach us is email. We read every message, though we cannot give personal financial, tax, legal or medical advice.
      </p>

      <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary mt-6">
        <Mail className="h-4 w-4" /> {CONTACT_EMAIL}
      </a>

      <div className="mt-10 grid grid-cols-1 gap-4">
        {topics.map((t) => (
          <div key={t.title} className="glass rounded-2xl p-5">
            <h2 className="text-base font-bold" style={{ color: 'var(--text-1)' }}>{t.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{t.body}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
