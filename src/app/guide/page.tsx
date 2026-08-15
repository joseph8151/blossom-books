import Link from "next/link";
import { MessageCircle, HelpCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import VolumeGuide from "@/components/common/VolumeGuide";

export const metadata = {
  title: "페이지 수 선택 가이드 (40·60·100·200P)",
  description:
    "블러섬북스 교재의 40·60·100·200페이지 차이를 학습 목적과 기간에 맞춰 쉽게 선택할 수 있도록 안내합니다.",
};

const faqs = [
  {
    q: "학년보다 쉬운 교재를 골라도 괜찮나요?",
    a: "네. 개념이 부족하다고 느낄 때는 현재 학년보다 한 단계 쉬운 분량(40·60P)으로 자신감을 먼저 쌓는 편이 효과적입니다. 기초가 탄탄해지면 자연스럽게 다음 단계로 넘어갈 수 있습니다.",
  },
  {
    q: "하루에 몇 페이지가 적당한가요?",
    a: "무리한 분량보다 매일 꾸준히 이어가는 것이 중요합니다. 보통 하루 2~4페이지 정도로 시작해, 학생의 집중 시간과 학습 흐름에 맞춰 조절하시길 권합니다.",
  },
  {
    q: "분량이 많을수록 더 좋은 교재인가요?",
    a: "그렇지 않습니다. 좋은 교재는 문제 수가 많은 책이 아니라, 지금 학생에게 필요한 문제를 알맞게 담은 책입니다. 목적과 학습 기간에 맞는 분량을 선택하시는 것이 가장 좋습니다.",
  },
];

export default function GuidePage() {
  return (
    <div>
      {/* 히어로 */}
      <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Selection guide</p>
          <h1 className="mt-3 font-display text-[32px] font-semibold leading-tight text-navy-950 sm:text-[40px]">
            40·60·100·200P,
            <br />
            어떤 분량을 골라야 할까요?
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.9] text-charcoal-600">
            블러섬북스의 여러 교재는 학습 목적과 기간에 맞춰 분량을 선택하실 수 있습니다. 아래 기준을 참고해
            지금 학생에게 필요한 분량을 고르세요. 어떤 분량이 맞을지 고민되시면 상담으로 편하게 안내해 드립니다.
          </p>
        </div>
      </section>

      {/* 분량 비교 */}
      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[28px]">
            한눈에 보는 분량별 특징
          </h2>
          <p className="mt-2 text-[14px] text-charcoal-600">학습 목적 · 추천 기간을 기준으로 비교했습니다.</p>
          <div className="mt-10">
            <VolumeGuide />
          </div>
          <p className="mt-8 text-[13px] leading-relaxed text-charcoal-600">
            * 추천 학습 기간은 하루 2~4페이지 기준의 예시이며, 학생의 학년과 수준에 따라 달라질 수 있습니다.
            정확한 구성과 난이도는 상담 시 안내해 드립니다.
          </p>
        </div>
      </section>

      {/* 학부모 가이드 FAQ */}
      <section className="border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[28px]">
            학부모님이 자주 묻는 질문
          </h2>
          <div className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-l-2 border-brass-500 pl-5">
                <p className="flex items-start gap-2 font-display text-[17px] font-semibold text-navy-950">
                  <HelpCircle size={18} className="mt-1 shrink-0 text-brass-500" />
                  {f.q}
                </p>
                <p className="mt-2 text-[14px] leading-[1.9] text-charcoal-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 py-16 text-ivory-100 lg:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center lg:px-8">
          <h2 className="font-display text-[26px] font-semibold sm:text-[30px]">
            우리 아이에게 맞는 분량이 궁금하세요?
          </h2>
          <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-ivory-200/80">
            학년과 현재 수준, 학습 목적을 알려주시면 알맞은 분량과 교재를 안내해 드립니다.
          </p>
          <a
            href={siteConfig.kakaoChatUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-brass-500 px-7 py-3.5 text-[14px] font-medium text-navy-950 transition-colors hover:bg-brass-400"
          >
            <MessageCircle size={16} />
            카카오톡으로 상담하기
          </a>
          <Link href="/books" className="mt-4 text-[13px] text-ivory-200/70 underline underline-offset-4 hover:text-ivory-100">
            먼저 교재 둘러보기
          </Link>
        </div>
      </section>
    </div>
  );
}
