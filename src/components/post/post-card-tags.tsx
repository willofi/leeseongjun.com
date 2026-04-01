'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

type Props = {
  tags: string[];
  className?: string;
};

const maxVisibleTags = 2;

export default function PostCardTags({ tags, className }: Props) {
  const measurementRef = useRef<HTMLDivElement | null>(null);
  const [shouldCollapse, setShouldCollapse] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const canCollapse = tags.length > maxVisibleTags;

  useEffect(() => {
    const measurementElement = measurementRef.current;

    if (!measurementElement || !canCollapse) {
      return;
    }

    const updateCollapsedState = () => {
      const tagElements = Array.from(
        measurementElement.querySelectorAll<HTMLElement>('[data-tag-item]'),
      );

      if (tagElements.length <= 1) {
        setShouldCollapse(false);
        return;
      }

      const firstRowTop = tagElements[0]?.offsetTop ?? 0;
      const hasWrappedTag = tagElements.some(
        (element) => element.offsetTop > firstRowTop,
      );

      setShouldCollapse(hasWrappedTag);
    };

    updateCollapsedState();

    const resizeObserver = new ResizeObserver(updateCollapsedState);
    resizeObserver.observe(measurementElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [canCollapse, tags]);

  const visibleTags =
    canCollapse && shouldCollapse ? tags.slice(0, maxVisibleTags) : tags;
  const hiddenTags =
    canCollapse && shouldCollapse ? tags.slice(maxVisibleTags) : [];

  return (
    <>
      <div className={cn('relative flex min-h-5 flex-wrap gap-2', className)}>
        {visibleTags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
        {hiddenTags.length > 0 ? (
          <div
            className="relative"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            <Badge
              variant="outline"
              className="relative z-10 cursor-default"
              aria-label={`숨겨진 태그 ${hiddenTags.length}개`}
              title={hiddenTags.map((tag) => `#${tag}`).join(', ')}
            >
              +{hiddenTags.length}
            </Badge>
            <div className="pointer-events-none absolute bottom-[calc(100%+0.35rem)] left-0 z-20 flex flex-col-reverse items-start gap-1">
              <div className="flex flex-col-reverse items-start gap-1">
                {hiddenTags.map((tag, index) => (
                  <span
                    key={tag}
                    className="rounded-full border border-stone-200/90 bg-white px-2 py-0.5 text-[10px] leading-4 font-medium whitespace-nowrap text-stone-600 shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition-[opacity,transform] duration-200 ease-out dark:border-stone-800/90 dark:bg-stone-950 dark:text-stone-300"
                    style={{
                      opacity: isExpanded ? 1 : 0,
                      transform: isExpanded
                        ? `translateY(-${index * 2}px)`
                        : 'translateY(6px)',
                      transitionDelay: isExpanded
                        ? `${index * 45}ms`
                        : `${(hiddenTags.length - 1 - index) * 45}ms`,
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div
        ref={measurementRef}
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 flex flex-wrap gap-2 opacity-0"
      >
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" data-tag-item>
            {tag}
          </Badge>
        ))}
      </div>
    </>
  );
}
