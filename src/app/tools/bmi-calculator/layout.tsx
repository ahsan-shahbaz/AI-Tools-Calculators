import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/bmi-calculator');

export default function BmiCalculatorLayout({ children }: { children: ReactNode }) {
  return children;
}
