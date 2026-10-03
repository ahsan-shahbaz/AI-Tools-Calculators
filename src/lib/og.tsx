import { ImageResponse } from 'next/og';
import { ALL_TOOLS } from '@/data/youtube-data';
import { SITE_NAME } from '@/lib/site';

const SIZE = { width: 1200, height: 630 };

function Card({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        background: 'linear-gradient(135deg, #064e43 0%, #087f6e 55%, #0fa58f 100%)',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 700 }}>
        <div
          style={{
            width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30,
          }}
        >
          +
        </div>
        {SITE_NAME}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: 26, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.8 }}>{eyebrow}</div>
        <div style={{ fontSize: title.length > 40 ? 64 : 80, fontWeight: 800, lineHeight: 1.05 }}>{title}</div>
        <div style={{ fontSize: 30, opacity: 0.9, maxWidth: 980 }}>{subtitle}</div>
      </div>
      <div style={{ display: 'flex', gap: 28, fontSize: 24, opacity: 0.85 }}>
        <span>Free</span><span>No sign-up</span><span>Private: runs in your browser</span>
      </div>
    </div>
  );
}

export function createToolOgImage(slug: string) {
  const tool = ALL_TOOLS.find((t) => t.slug === slug);
  return new ImageResponse(
    (
      <Card
        eyebrow={tool?.category ?? 'Free calculator'}
        title={tool?.name ?? SITE_NAME}
        subtitle={tool?.description ?? 'Free online calculators'}
      />
    ),
    SIZE,
  );
}

export function createSiteOgImage() {
  return new ImageResponse(
    (
      <Card
        eyebrow="Free online calculators"
        title="Calculators for money, business & creators"
        subtitle="Mortgage, compound interest, freelance rates, YouTube RPM, margins and more. Instant, private, no sign-up."
      />
    ),
    SIZE,
  );
}
