import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-stone-950 md:text-[32px] md:leading-10 dark:text-stone-50">
      {children}
    </h1>
  );
}
