import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, formatKRW } from "../data";

const cards = [
  {
    en: "English",
    ko: "영어 레벨테스트",
    areas: ["Reading", "Vocabulary", "Grammar", "Writing"],
    note: "등 시험 유형에 맞춰 구성",
  },
  {
    en: "Korean",
    ko: "국어 문해력 레벨테스트",
    areas: ["독해", "문해력", "어휘", "추론"],
    note: "등",
  },
  {
    en: "Mathematics",
    ko: "사고력 수학 레벨테스트",
    areas: ["연산", "문제 해결", "사고력", "학년별 수학"],
    note: "등",
  },
];

export default function LevelTestCards() {
  const from = flexibleVolumes[0]; // 40P

  return (
    <section className="border-b border-ivory-300 bg-ivory-200/30 py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
            학원·학교 레벨테스트
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
            학원 및 학교의 입학·반 배정 시험은 기관마다 문제 유형과 난도가 다를 수 있습니다. 시험 유형이
            확인되면 해당 유형에 맞춰 구성하고, 유형이 확실하지 않은 경우 일반 레벨테스트 구성으로 안내합니다.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-3">
          {cards.map((c) => (
            <div key={c.en} className="flex flex-col border border-ivory-300 bg-white p-6 sm:p-7">
              <p className="font-display text-[19px] font-semibold text-navy-950">{c.en}</p>
              <p className="mt-1 text-[12.5px] text-charcoal-600/70">{c.ko}</p>
              <p className="mt-4 text-[13px] leading-relaxed text-charcoal-600">
                {c.areas.join(" · ")} {c.note}
              </p>
              <p className="mt-5 border-t border-ivory-300 pt-4 text-[14px] font-medium text-navy-950">
                {from.label}부터 {formatKRW(from.priceKRW)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            <MessageCircle size={16} />
            레벨테스트 구성 상담
          </a>
          <p className="mt-4 text-[12.5px] leading-relaxed text-charcoal-600/70">
            영어·국어·수학을 함께 준비하는 경우 통합 견적을 안내해 드립니다.
          </p>
        </div>
      </div>
    </section>
  );
}
