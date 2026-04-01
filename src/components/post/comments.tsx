'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const giscusConfig = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
};

function hasGiscusConfig() {
  return Object.values(giscusConfig).every(Boolean);
}

export default function Comments() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current || !hasGiscusConfig()) {
      return;
    }

    const existingFrame = containerRef.current.querySelector(
      'iframe.giscus-frame',
    );

    if (existingFrame) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', giscusConfig.repo!);
    script.setAttribute('data-repo-id', giscusConfig.repoId!);
    script.setAttribute('data-category', giscusConfig.category!);
    script.setAttribute('data-category-id', giscusConfig.categoryId!);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('data-loading', 'lazy');

    containerRef.current.appendChild(script);
  }, [pathname]);

  if (!hasGiscusConfig()) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
        Comments
      </h2>
      <div ref={containerRef} className="giscus" />
    </section>
  );
}
