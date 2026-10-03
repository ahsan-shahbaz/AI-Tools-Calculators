import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/compound-interest-calculator');

export default function CompoundInterestLayout({ children }: { children: ReactNode }) {
  return children;
}
