import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/freelance-rate-calculator');

export default function FreelanceRateCalculatorLayout({ children }: { children: ReactNode }) {
  return children;
}
