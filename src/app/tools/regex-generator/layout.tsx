import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/regex-generator');

export default function RegexGeneratorLayout({ children }: { children: ReactNode }) {
  return children;
}
