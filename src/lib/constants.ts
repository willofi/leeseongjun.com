export const siteConfig = {
  name: '흔들리는 코드 숲에서',
  title: '흔들리는 코드 숲에서 | 이성준 개발 블로그',
  description:
    '프론트엔드, 백엔드, 인프라를 넘나들며 제품을 만드는 이성준의 개발 블로그입니다. Next.js, React, TypeScript, UI 구현과 설계의 과정을 차분히 기록합니다.',
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
