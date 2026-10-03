import { createToolOgImage } from '@/lib/og';

export const alt = 'macro-tdee-calculator on ToolCalculators';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return createToolOgImage('/tools/macro-tdee-calculator');
}
