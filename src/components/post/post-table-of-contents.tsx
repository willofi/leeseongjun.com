'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TableOfContentsItem } from '@/lib/post-table-of-contents';
import { cn } from '@/lib/utils';

type Props = {
  items: TableOfContentsItem[];
  className?: string;
  compact?: boolean;
};

function getItemClassName(level: TableOfContentsItem['level']) {
  switch (level) {
    case 2:
      return 'pl-5 before:left-2 text-[13px]';
    case 3:
      return 'pl-8 before:left-5 text-[13px]';
    default:
      return 'pl-3 before:left-0.5';
  }
}

export default function PostTableOfContents({
  items,
  className,
  compact = false,
}: Props) {
  const handleMoveToSection = (id: string) => {
    const targetElement = document.getElementById(id);

    if (!targetElement) {
      return;
    }

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <Card
      className={cn(
        'border-stone-200/70 bg-white/86 py-0 shadow-none backdrop-blur-md dark:border-stone-800/70 dark:bg-stone-950/66',
        className,
      )}
    >
      <CardContent
        className={compact ? 'px-3 py-2.5' : 'px-3 py-3 md:px-4 md:py-4'}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={compact ? 'text-[10px]' : ''}>
              On This Page
            </Badge>
          </div>
          <nav aria-label="목차">
            <ol className={compact ? 'space-y-0.5' : 'space-y-1'}>
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleMoveToSection(item.id)}
                    className={cn(
                      'relative block w-full text-left text-sm leading-6 text-stone-500/80 transition-colors before:absolute before:top-1/2 before:left-0 before:size-1 before:-translate-y-1/2 before:rounded-full before:bg-stone-300/90 hover:text-stone-950 dark:text-stone-400/85 dark:before:bg-stone-700/90 dark:hover:text-stone-50',
                      compact && 'text-[13px] leading-5',
                      getItemClassName(item.level),
                    )}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </CardContent>
    </Card>
  );
}
