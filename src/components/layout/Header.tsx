'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navigationItems } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 left-0 z-50 w-full border-b border-stone-200/80 bg-white/72 backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-950/72">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="min-w-0">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/profile/eden.jpeg"
              className="rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-800"
              width={34}
              height={34}
              alt="이성준 프로필 이미지"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-stone-950 dark:text-stone-50">
                Developer leeseongjun
              </p>
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navigationItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100/80 hover:text-stone-950 dark:text-stone-400 dark:hover:bg-stone-900/80 dark:hover:text-stone-50',
                  isActive &&
                    'bg-stone-100 text-stone-950 dark:bg-stone-900 dark:text-stone-100',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon-sm" aria-label="메뉴 열기">
                  <Menu className="size-4" />
                </Button>
              }
            />
            <DropdownMenuContent
              align="end"
              sideOffset={10}
              className="min-w-40 rounded-xl border-stone-200/80 bg-white/95 p-1 shadow-lg backdrop-blur dark:border-stone-800/80 dark:bg-stone-950/95"
            >
              {navigationItems.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <DropdownMenuItem
                    key={item.href}
                    render={
                      <Link
                        href={item.href}
                        className={cn(
                          'rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-900 dark:hover:text-stone-50',
                          isActive &&
                            'bg-stone-100 text-stone-950 dark:bg-stone-900 dark:text-stone-100',
                        )}
                      >
                        {item.label}
                      </Link>
                    }
                  />
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
