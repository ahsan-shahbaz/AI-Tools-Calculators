import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StayAndPlay from '@/components/StayAndPlay';
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
    default: 'Free Online Calculators for Creators & Businesses | ToolCalculators',
    template: '%s | ToolCalculators — Free Online Tools',
  },
  description:
    'Free online calculators for creator earnings, freelance rates, ecommerce profit, YouTube RPM, TikTok brand deals, SEO, developer tools, and everyday planning. Instant results, no account required.',
  keywords: [
    'free online calculators',
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
  openGraph: {
    title: 'Free Online Calculators for Creators & Businesses | ToolCalculators',
    description: 'Free, practical calculators for creators, businesses, developers, and everyday planning. Instant results, no account.',
    type: 'website',
    siteName: 'ToolCalculators',
    url: '/',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'ToolCalculators — Free Online Calculators' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Calculators | ToolCalculators',
    description: 'Practical free calculators for creators, businesses, developers, and everyday planning.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
        </ThemeProvider>
      </body>
    </html>
  );
}
