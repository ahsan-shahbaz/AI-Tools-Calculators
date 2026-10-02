import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/instagram-engagement-rate-tool');

export default function InstagramEngagementLayout({ children }: { children: ReactNode }) {
  return children;
}
