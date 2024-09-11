'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProgressBar
        height="2px"
        color="#ff0000"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}