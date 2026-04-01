'use client';

import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md border text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'border-border bg-background text-foreground hover:bg-muted',
        outline: 'border-border bg-background text-foreground hover:bg-muted',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/70',
        ghost:
          'border-transparent bg-transparent text-foreground hover:bg-muted',
        destructive:
          'border-destructive bg-destructive text-white hover:bg-destructive/90',
        link: 'border-transparent p-0 text-foreground underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-7 rounded-md px-2.5 text-xs',
        sm: 'h-9 rounded-md px-3 text-sm',
        lg: 'h-11 rounded-md px-6 text-sm',
        icon: 'size-10',
        'icon-xs': "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-9 rounded-md',
        'icon-lg': 'size-11 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

function ButtonLink({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: React.ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>) {
  return (
    <Link
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, ButtonLink, buttonVariants };
