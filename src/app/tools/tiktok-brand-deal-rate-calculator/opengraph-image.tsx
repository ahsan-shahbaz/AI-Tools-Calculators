import { createToolOgImage } from '@/lib/og';

export const alt = 'tiktok-brand-deal-rate-calculator on ToolCalculators';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return createToolOgImage('/tools/tiktok-brand-deal-rate-calculator');
}
