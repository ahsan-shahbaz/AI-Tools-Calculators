import { ADSENSE_CLIENT } from '@/lib/site';

export const dynamic = 'force-static';

/** AdSense requires /ads.txt. Empty (but valid) until NEXT_PUBLIC_ADSENSE_CLIENT is set. */
export function GET() {
  const publisher = ADSENSE_CLIENT.replace(/^ca-/, '');
  const body = publisher ? `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n` : '# No ad networks configured.\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
