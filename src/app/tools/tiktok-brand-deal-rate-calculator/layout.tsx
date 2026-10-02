import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/tiktok-brand-deal-rate-calculator');

export default function TikTokBrandDealLayout({ children }: { children: ReactNode }) {
  return children;
}
