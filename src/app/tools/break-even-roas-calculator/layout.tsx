import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/break-even-roas-calculator');

export default function BreakEvenRoasCalculatorLayout({ children }: { children: ReactNode }) {
  return children;
}
