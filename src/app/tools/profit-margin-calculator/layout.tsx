import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/profit-margin-calculator');

export default function ProfitMarginLayout({ children }: { children: ReactNode }) {
  return children;
}
