import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/youtube-shorts-earnings-estimator');

export default function YouTubeShortsEarningsLayout({ children }: { children: ReactNode }) {
  return children;
}
