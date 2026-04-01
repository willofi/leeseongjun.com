export const siteConfig = {
  name: '흔들리는 코드 숲에서',
  title: '흔들리는 코드 숲에서 | 이성준 개발 블로그',
  description:
    '이성준의 개발 기록을 담는 블로그입니다. 구현 과정에서의 선택과 고민, 그리고 그 안에서 배운 것들을 기록합니다.',
  url: 'https://leeseongjun.com',
  author: {
    name: '이성준',
    email: 'willo.fide@gmail.com',
  },
  social: {
    github: 'https://github.com/willofi',
  },
  keywords: [
    '개발 블로그',
    'Next.js 블로그',
    'React 블로그',
    'TypeScript 블로그',
    '웹 개발',
    '프론트엔드',
    '백엔드',
    '인프라',
    '이성준',
  ],
};

export const navigationItems = [
  { href: '/', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
] as const;
