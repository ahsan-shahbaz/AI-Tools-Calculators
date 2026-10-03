import type { ReactNode } from 'react';
import ToolExtras from '@/components/ToolExtras';

/** Shared wrapper for every calculator: adds the explanation, FAQ, sharing and related-tool sections. */
export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToolExtras />
    </>
  );
}
