import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/percentage-calculator');

export default function PercentageCalculatorLayout({ children }: { children: ReactNode }) {
  return children;
}
