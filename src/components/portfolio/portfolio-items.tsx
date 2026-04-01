import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export default function PortfolioItems() {
  return (
    <section className="container mx-auto max-w-5xl py-12 md:py-16">
      <div className="space-y-5">
        <Badge>Portfolio</Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-stone-950 md:text-5xl dark:text-stone-50">
          FractFlow
        </h1>
        <p className="max-w-3xl text-base leading-7 text-stone-600 dark:text-stone-300">
          생각의 흐름을 시각적으로 정리하고, 아이디어를 구조화된 작업 공간
          안에서 확장해 나갈 수 있도록 설계한 에디터 프로젝트입니다.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <Card className="overflow-hidden p-4">
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/assets/portfolio/fractflow-editor.png"
              alt="FractFlow editor preview"
              width={1572}
              height={1260}
              className="h-full w-full object-cover"
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex h-full flex-col gap-5">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Editor</Badge>
                <Badge variant="outline">Framer Motion</Badge>
                <Badge variant="outline">React Flow</Badge>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
                복잡한 작업 흐름을 더 자연스럽게 연결하는 시각적 에디터
              </h2>
              <p className="text-sm leading-6 text-stone-600 dark:text-stone-300">
                FractFlow는 자동 레이아웃, 실시간 연결, 부드러운 인터랙션을 통해
                아이디어와 작업 단계를 하나의 유동적인 공간 안에서 다룰 수 있게
                만든 프로젝트입니다.
              </p>
            </div>

            <div className="space-y-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
              <p>
                구조를 시각적으로 정리하는 데서 끝나지 않고, 실제 편집 경험
                자체가 끊기지 않도록 인터랙션의 속도감과 연결감을 세심하게
                다듬는 데 집중했습니다.
              </p>
              <p>
                Next.js 기반 위에서 화면 전환, 카드 연결, 상태 흐름을 부드럽게
                설계해 프로토타입 이상의 제품 감각을 목표로 만들고 있습니다.
              </p>
            </div>

            <div className="mt-auto pt-2">
              <ButtonLink
                href="https://fract-flow.leeseongjun.com"
                target="_blank"
                rel="noreferrer"
                variant="outline"
              >
                FractFlow 보러가기
              </ButtonLink>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
