import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/macro-tdee-calculator');

export default function MacroTdeeCalculatorLayout({ children }: { children: ReactNode }) {
  return children;
}
