import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StayAndPlay from '@/components/StayAndPlay';
import ConsentBanner from '@/components/ConsentBanner';
import ThirdPartyScripts from '@/components/ThirdPartyScripts';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SITE_URL } from '@/lib/site';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#087f6e' },
    { media: '(prefers-color-scheme: dark)',  color: '#141816' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Free Online Calculators: Mortgage, Savings, Business & Creator Tools | ToolCalculators',
    template: '%s | ToolCalculators',
  },
  description:
    'Free online calculators for mortgage payments, compound interest, freelance rates, profit margins, YouTube earnings, BMI and more. Instant results, clear assumptions, no sign-up.',
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  applicationName: 'ToolCalculators',
  keywords: [
    'free online calculators',
    'mortgage payment calculator',
    'compound interest calculator',
    'percentage calculator',
    'profit margin calculator',
    'bmi calculator',
    'youtube money calculator',
    'youtube rpm calculator',
    'youtube earnings estimator',
    'freelance rate calculator',
    'tiktok brand deal calculator',
    'instagram engagement rate',
    'amazon fba profit calculator',
    'break even roas calculator',
    'salary to hourly calculator',
    'patreon earnings estimator',
    'macro calorie calculator',
    'regex generator',
    'schema markup generator',
  ],
  authors: [{ name: 'ToolCalculators' }],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  // The og:image and twitter:image come from app/opengraph-image.tsx.
  openGraph: {
    title: 'Free Online Calculators for Money, Business & Creators | ToolCalculators',
    description: 'Free, practical calculators with clear assumptions. Instant results, private, no sign-up.',
    type: 'website',
    siteName: 'ToolCalculators',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Calculators | ToolCalculators',
    description: 'Practical free calculators for money, business, creators and everyday decisions.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
        />
        {/* Apply the saved palette before paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('tc-theme') || 'light';
                var allowed = ['light', 'dark', 'midnight', 'aurora'];
                document.documentElement.setAttribute('data-theme', allowed.indexOf(theme) >= 0 ? theme : 'light');
              } catch(e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ToolCalculators',
              alternateName: 'Tool Calculators',
              url: SITE_URL,
              description: 'Free online calculators for creators, businesses, developers, and everyday planning.',
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ToolCalculators',
              url: SITE_URL,
              logo: `${SITE_URL}/apple-icon`,
            }),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <a href="#main-content" className="skip-nav">Skip to main content</a>
        <ThemeProvider>
          <StayAndPlay>
            <Header />
            <main id="main-content" className="flex-1 relative z-10" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </StayAndPlay>
          <ConsentBanner />
          <ThirdPartyScripts />
        </ThemeProvider>
      </body>
    </html>
  );
}
