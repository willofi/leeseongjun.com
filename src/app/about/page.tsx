import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl py-12 md:py-16">
      <div>
        <Badge>About</Badge>
        <h1 className="mt-4 text-[28px] leading-9 font-semibold tracking-tight text-stone-950 md:text-[32px] md:leading-10 dark:text-stone-50">
          인프라부터 백엔드, 프론트엔드까지 폭넓게 다루는 개발자입니다.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-stone-600 dark:text-stone-300">
          서비스가 실제로 동작하기까지 필요한 전반을 이해하고 설계하는 일을
          좋아합니다. 인프라와 백엔드 구조를 다루는 것부터, 사용자가 직접
          마주하는 프론트엔드 경험을 정리하는 것까지 넓게 관심을 두고
          작업합니다. 이 블로그에는 개발 과정에서 배운 점과 구현하며 고민한
          내용들을 차분히 남겨두고 있습니다.
        </p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="p-2 md:p-4">
          <CardContent className="space-y-3 p-4 md:p-4">
            <CardTitle className="text-xl font-semibold text-stone-950 dark:text-stone-50">
              Focus
            </CardTitle>
            <CardDescription className="text-sm leading-6 text-stone-600 dark:text-stone-300">
              인프라 구성, API 설계, 프론트엔드 구현을 함께 바라보며 제품을
              끝까지 연결하는 개발에 집중하고 있습니다.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="p-2 md:p-4">
          <CardContent className="space-y-3 p-4 md:p-4">
            <CardTitle className="text-xl font-semibold text-stone-950 dark:text-stone-50">
              Writing
            </CardTitle>
            <CardDescription className="text-sm leading-6 text-stone-600 dark:text-stone-300">
              특정 기술 한 가지보다는, 실제 서비스를 만들며 마주친 구조와 선택,
              구현 과정에서의 생각들을 기록하고 있습니다.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
