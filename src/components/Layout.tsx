import { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-bone text-ink font-sans antialiased min-h-screen flex flex-col paper-texture">
      {children}
    </div>
  );
}
