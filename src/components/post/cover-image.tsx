import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title: string;
  src: string;
  slug?: string;
  ratio?: 'square' | 'landscape';
};

const CoverImage = ({ title, src, slug, ratio = 'landscape' }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn(
        ratio === 'square' ? 'aspect-square' : 'aspect-[16/10]',
        'w-full rounded-xl object-cover transition duration-200',
        slug && 'hover:opacity-95',
      )}
      width={1024}
      height={630}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
