import '@/app/globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Main from '@/components/layout/Main';
import AppToaster from '@/components/ui/toaster';
import { siteConfig } from '@/lib/constants';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  other: {
    'link:alternate': `${siteConfig.url}/rss.xml`,
  },
  icons: {
    icon: '/icon',
    shortcut: '/icon',
    apple: '/apple-icon',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className="font-sans"
      data-scroll-behavior="smooth"
    >
      <body className="antialiased">
        <Header />
        <Main>{children}</Main>
        <Footer />
        <AppToaster />
      </body>
    </html>
  );
}
