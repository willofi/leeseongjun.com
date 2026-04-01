import { PropsWithChildren } from 'react';

export default function Main({ children }: PropsWithChildren) {
  return (
    <main className="relative mx-auto min-h-[calc(100vh-140px)] max-w-7xl px-4">
      {children}
    </main>
  );
}
