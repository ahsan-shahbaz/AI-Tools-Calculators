import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/amazon-fba-net-profit-calculator');

export default function AmazonFbaProfitLayout({ children }: { children: ReactNode }) {
  return children;
}
