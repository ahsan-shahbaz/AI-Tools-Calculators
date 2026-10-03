import { createToolOgImage } from '@/lib/og';

export const alt = 'youtube-money-calculator on ToolCalculators';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return createToolOgImage('/tools/youtube-money-calculator');
}
