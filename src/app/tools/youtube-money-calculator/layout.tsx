import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/youtube-money-calculator');

export default function YouTubeMoneyCalculatorLayout({ children }: { children: ReactNode }) {
  return children;
}
