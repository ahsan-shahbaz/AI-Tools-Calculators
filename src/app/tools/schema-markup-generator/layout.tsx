import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/schema-markup-generator');

export default function SchemaMarkupGeneratorLayout({ children }: { children: ReactNode }) {
  return children;
}
