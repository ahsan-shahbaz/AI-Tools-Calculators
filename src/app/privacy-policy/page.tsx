import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how ToolCalculators handles calculator inputs, browser data, and external links.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-bold uppercase tracking-wider text-red-700">Trust & privacy</p>
      <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated September 26, 2026</p>

      <div className="mt-8 space-y-7 text-sm leading-7 text-slate-700">
        <section>
          <h2 className="text-lg font-bold text-slate-900">Calculator inputs</h2>
          <p className="mt-2">Calculator inputs and results are processed in your browser by the tools on this site. The current tools do not send those values to a ToolCalculators account or save them to a ToolCalculators database. We do not offer user accounts.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">Technical information</h2>
          <p className="mt-2">The hosting provider may process technical request information, such as an IP address, browser details, and server logs, to deliver and protect the site. Its handling of that information is governed by the provider's own terms and privacy policy.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">Cookies, analytics, and advertising</h2>
          <p className="mt-2">The current site code does not install analytics or advertising cookies. Advertising placements are not active in production. If analytics, advertising, or other tracking services are added, this policy will be updated and any required consent controls will be provided before those services are enabled.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">External links</h2>
          <p className="mt-2">Some tools link to third-party websites. Those sites have their own privacy practices. Current recommendation links are direct links without affiliate tracking. If compensated links are introduced, they will be clearly disclosed.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-slate-900">Policy updates</h2>
          <p className="mt-2">This policy may change when site features or service providers change. The date at the top of this page indicates the latest revision.</p>
        </section>
      </div>
    </article>
  );
}
