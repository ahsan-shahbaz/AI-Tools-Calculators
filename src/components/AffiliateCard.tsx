import React from 'react';
import { ExternalLink, Zap, Star } from 'lucide-react';

interface AffiliateOffer {
  title: string;
  badge: string;
  description: string;
  ctaText: string;
  link: string;
  icon: string;
}

const CREATOR_OFFERS: AffiliateOffer[] = [
  {
    title: 'VidIQ / TubeBuddy',
    badge: 'Creator Essential',
    description: 'Find untapped high-search, low-competition keywords to double your YouTube views and target high RPMs.',
    ctaText: 'Explore Free SEO Tool',
    link: 'https://vidiq.com',
    icon: '🚀'
  },
  {
    title: 'Epidemic Sound',
    badge: 'Copyright-Safe',
    description: 'Get unlimited royalty-free music and sound effects to prevent demonetization and copyright claims.',
    ctaText: 'Get 30-Day Free Trial',
    link: 'https://epidemicsound.com',
    icon: '🎵'
  },
  {
    title: 'Descript AI Video Editor',
    badge: 'Edit by Text',
    description: 'Cut filler words like "um" and "uh" automatically and create viral Shorts with dynamic animated captions.',
    ctaText: 'Try Free AI Editor',
    link: 'https://descript.com',
    icon: '✂️'
  }
];

export default function AffiliateCard() {
  return (
    <div className="rounded-2xl border p-6 shadow-sm" style={{ borderColor: 'var(--border-accent)', background: 'var(--bg-surface)' }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-red-100 text-red-600">
          <Zap className="h-4 w-4" />
        </span>
        <h3 className="text-base font-bold" style={{ color: 'var(--text-1)' }}>
          Recommended Tools to Scale Your YouTube Income
        </h3>
      </div>
      <p className="text-xs mb-5" style={{ color: 'var(--text-2)' }}>
        Optional tools for keyword research, editing, and music licensing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CREATOR_OFFERS.map((offer, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-xl border p-4 shadow-sm transition-all group"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{offer.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                  {offer.badge}
                </span>
              </div>
              <h4 className="text-sm font-bold group-hover:text-red-500 transition-colors" style={{ color: 'var(--text-1)' }}>
                {offer.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                {offer.description}
              </p>
            </div>

            <a
              href={offer.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-4 inline-flex items-center justify-center gap-1.5 w-full rounded-lg px-3 py-2 text-xs font-semibold transition-colors shadow-sm"
              style={{ background: 'var(--accent-1)', color: 'var(--btn-text)' }}
            >
              <span>{offer.ctaText}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
        These are direct links today. If a recommendation becomes an affiliate link, we will label it and disclose any commission; it will not change your price.
      </p>
    </div>
  );
}
