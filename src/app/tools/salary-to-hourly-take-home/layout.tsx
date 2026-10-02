import type { ReactNode } from 'react';
import { createToolMetadata } from '@/lib/seo';

export const metadata = createToolMetadata('/tools/salary-to-hourly-take-home');

export default function SalaryTakeHomeLayout({ children }: { children: ReactNode }) {
  return children;
}
