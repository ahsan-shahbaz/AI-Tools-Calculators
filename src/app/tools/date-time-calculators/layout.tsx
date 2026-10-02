import type { Metadata } from 'next';
import { createToolMetadata } from '@/lib/seo';

export const metadata: Metadata = createToolMetadata('/tools/date-time-calculators');

export default function DateTimeCalculatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}