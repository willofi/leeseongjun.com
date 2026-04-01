import { siteConfig } from '@/lib/constants';
import { Rss } from 'lucide-react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 text-sm text-stone-500">
        <p>© 2026 흔들리는 코드 숲에서</p>
        <div className="flex items-center gap-2">
          <Link
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-950"
          >
            <FaGithub className="size-3" />
            GitHub
          </Link>
          <Link
            href="/rss.xml"
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-950"
          >
            <Rss className="size-3" />
            RSS
          </Link>
        </div>
      </div>
    </footer>
  );
}
