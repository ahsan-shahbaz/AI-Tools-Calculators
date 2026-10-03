import { createSiteOgImage } from '@/lib/og';

export const alt = 'ToolCalculators: free online calculators';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return createSiteOgImage();
}
