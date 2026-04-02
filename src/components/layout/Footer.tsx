import { getCloudflareVisitorMetrics } from '@/lib/cloudflare-analytics';
import { siteConfig } from '@/lib/constants';
import { Rss } from 'lucide-react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

const numberFormatter = new Intl.NumberFormat('ko-KR');
const showVisitorMetrics = false;

export default async function Footer() {
  const visitorMetrics = showVisitorMetrics
    ? await getCloudflareVisitorMetrics()
    : null;

  return (
    <footer className="border-t border-stone-200 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm text-stone-500 md:flex-row md:items-center md:justify-between">
        <p>© 2026 흔들리는 코드 숲에서</p>
        <div className="flex flex-wrap items-center gap-2">
          {visitorMetrics ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-stone-500 backdrop-blur-sm">
              <span className="text-stone-400">Visitors</span>
              <span className="text-stone-600">
                Today {numberFormatter.format(visitorMetrics.today)}
              </span>
            </div>
          ) : null}
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
