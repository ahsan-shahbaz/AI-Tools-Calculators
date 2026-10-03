import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how ToolCalculators handles calculator inputs, browser data, and external links.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--accent-1)]">Trust & privacy</p>
      <h1 className="mt-3 text-3xl font-black text-[color:var(--text-1)] sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-[color:var(--text-3)]">Last updated September 26, 2026</p>

      <div className="mt-8 space-y-7 text-sm leading-7 text-[color:var(--text-2)]">
        <section>
          <h2 className="text-lg font-bold text-[color:var(--text-1)]">Calculator inputs</h2>
          <p className="mt-2">Calculator inputs and results are processed in your browser by the tools on this site. The current tools do not send those values to a ToolCalculators account or save them to a ToolCalculators database. We do not offer user accounts.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[color:var(--text-1)]">Technical information</h2>
          <p className="mt-2">The hosting provider may process technical request information, such as an IP address, browser details, and server logs, to deliver and protect the site. Its handling of that information is governed by the provider's own terms and privacy policy.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[color:var(--text-1)]">Cookies, analytics, and advertising</h2>
          <p className="mt-2">The site can show advertising (for example Google AdSense) and can use anonymous usage analytics (for example Google Analytics). When either is switched on, a consent banner appears on your first visit. No advertising or analytics script loads until you choose Accept; if you choose Decline, none load and every calculator works the same. You can change your choice at any time using Cookie settings in the footer.</p>
          <p className="mt-2">If you accept, those providers may set cookies or use similar technologies to serve and measure ads and, for analytics, to count visits. Their handling of that data is described in Google&apos;s own privacy policy and partner-sites page. Calculator inputs are never shared with advertisers or analytics providers by us.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[color:var(--text-1)]">External links</h2>
          <p className="mt-2">Some tools link to third-party websites. Those sites have their own privacy practices. Recommendation links are plain links unless they are marked Affiliate. Affiliate links may earn us a commission at no extra cost to you, are labelled where they appear, and do not change what a calculator shows. Clicking one sends you to the partner&apos;s site, which has its own privacy practices.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[color:var(--text-1)]">Policy updates</h2>
          <p className="mt-2">This policy may change when site features or service providers change. The date at the top of this page indicates the latest revision.</p>
        </section>
      </div>
    </article>
  );
}
