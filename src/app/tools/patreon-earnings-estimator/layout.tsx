import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/patreon-earnings-estimator');

export default function PatreonEarningsEstimatorLayout({ children }: { children: ReactNode }) {
  return children;
}
