import ContactEmailCopy from '@/components/contact/contact-email-copy';
import ContactForm from '@/components/contact/contact-form';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/lib/constants';

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl py-12 md:py-16">
      <Badge>Contact</Badge>
      <h1 className="mt-4 text-[28px] leading-9 font-semibold tracking-tight text-stone-950 md:text-[32px] md:leading-10 dark:text-stone-50">
        작업 제안이나 문의가 있다면 편하게 연락 주세요.
      </h1>
      <Card className="mt-8 py-2 md:py-4">
        <CardContent className="space-y-5 px-6 py-4 md:px-8 md:py-4">
          <p className="text-base leading-7 text-stone-600 dark:text-stone-300">
            간단한 소개나 협업 제안, 제품 관련 문의가 있다면 아래 폼으로 남겨
            주세요. 확인 후 메일로 답변드리겠습니다.
          </p>
          <Card className="border-stone-200 py-0 dark:border-stone-800">
            <CardContent className="space-y-1 px-4 py-3">
              <p className="text-xs font-medium tracking-wide text-stone-500 uppercase dark:text-stone-400">
                Email
              </p>
              <ContactEmailCopy email={siteConfig.author.email} />
            </CardContent>
          </Card>
          <ContactForm />
        </CardContent>
      </Card>
    </section>
  );
}
