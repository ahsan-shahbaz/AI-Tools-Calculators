import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/mortgage-payment-calculator');

export default function MortgageCalculatorLayout({ children }: { children: ReactNode }) {
  return children;
}
