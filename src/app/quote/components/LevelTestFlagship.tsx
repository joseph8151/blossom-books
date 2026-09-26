import Link from "next/link";
import { MessageCircle, Eye } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, formatKRW } from "../data";

const trustPoints = ["학원별 유형 대응", "영어·국어·수학 선택", "구매 전 Sample 확인", "맞춤 유형 제작 가능"];

const volumeCopy: Record<number, string> = {
  40: "짧은 기간 또는 특정 영역 집중",
  60: "기본 준비",
  100: "충분한 유형 연습",
  200: "장기·집중 준비",
};

const subjects = [
  {
    en: "English",
    ko: "영어 레벨테스트",
    areas: ["Reading", "Vocabulary", "Grammar", "Writing", "Comprehension"],
    desc: "학생의 학년과 시험 유형에 맞춰 영어 레벨테스트 대비 문제를 구성합니다.",
    cta: "영어 레벨테스트 상담",
  },
  {
    en: "Korean",
    ko: "국어 문해력 레벨테스트",
    areas: ["독해", "어휘", "문해력", "추론", "서술형"],
    desc: "학년과 시험 목적에 따라 국어 문해력 중심으로 구성합니다.",
    cta: "국어 레벨테스트 상담",
  },
  {
    en: "Mathematics",
    ko: "사고력 수학 레벨테스트",
    areas: ["연산", "문제 해결", "사고력", "응용", "학년별 수학"],
    desc: "학원 및 학교 시험 수준에 맞춰 사고력과 학년별 수학을 구성합니다.",
    cta: "수학 레벨테스트 상담",
  },
];

const pageGuide = [
  { label: "40P", body: "시험까지 시간이 짧거나 취약 영역만 빠르게 보완할 때" },
  { label: "60P", body: "기본적인 레벨테스트 준비" },
  { label: "100P", body: "다양한 유형을 충분히 연습할 때" },
  { label: "200P", body: "장기간 준비하거나 충분한 반복 연습이 필요할 때" },
];

const beforeChat = ["지원 학원 또는 학교", "학생 학년", "필요 과목", "시험 예정일"];

function KakaoButton({ label }: { label: string }) {
  return (
    <a
      href={siteConfig.kakaoChannelUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
    >
      <MessageCircle size={16} />
      {label}
    </a>
  );
}

export default function LevelTestFlagship() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-100 py-20 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        {/* 2. 섹션 상단 */}
        <div className="mx-auto max-w-[720px] text-center">
          <p className="font-label text-[11px] uppercase tracking-[0.2em] text-brass-500">Most Requested</p>
          <h2 className="mt-4 font-display text-[30px] font-semibold leading-tight text-navy-950 sm:text-[36px]">
            학원·학교 레벨테스트 문제집
          </h2>
          <p className="mt-3 text-[16px] font-medium text-navy-800">
            입학시험부터 반 배정 테스트까지, 학생에게 필요한 유형만 골라 준비하세요.
          </p>
          <p className="mt-5 text-[14.5px] leading-[1.9] text-charcoal-600">
            학원과 학교마다 레벨테스트의 유형과 난도가 다릅니다. Blossom Books는 단순한 공통 문제집이 아니라
            학생의 학년, 지원 학원, 시험 유형에 따라 영어·국어·수학 문제를 필요한 구성으로 제작합니다. 시험
            유형이 확실하지 않다면 일반 레벨테스트 구성으로도 준비할 수 있습니다.
          </p>
        </div>

        {/* 3. 핵심 신뢰 포인트 */}
        <div className="mx-auto mt-10 grid max-w-[780px] grid-cols-2 gap-4 sm:mt-12 sm:grid-cols-4">
          {trustPoints.map((t) => (
            <div key={t} className="border-t-2 border-navy-900/70 pt-3 text-center">
              <p className="text-[12.5px] font-medium leading-snug text-navy-950">{t}</p>
            </div>
          ))}
        </div>

        {/* 4~6. 영어/국어/수학 대표 카드 */}
        <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-3">
          {subjects.map((s) => (
            <div key={s.en} className="flex flex-col border border-ivory-300 bg-white p-7 sm:p-8">
              <p className="font-display text-[22px] font-semibold text-navy-950">{s.en}</p>
              <p className="mt-1 text-[13px] text-charcoal-600/70">{s.ko}</p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-charcoal-600">{s.areas.join(" · ")}</p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-charcoal-700">{s.desc}</p>

              <div className="mt-6 divide-y divide-ivory-300 border-y border-ivory-300">
                {flexibleVolumes.map((v) => (
                  <div key={v.pages} className="flex items-baseline justify-between py-3">
                    <span className="flex items-baseline gap-2">
                      <span className="text-[14px] font-medium text-navy-950">{v.label}</span>
                      {v.pages === 60 && (
                        <span className="font-label text-[9px] uppercase tracking-[0.08em] text-brass-500">
                          Most Selected
                        </span>
                      )}
                    </span>
                    <span className="text-right">
                      <span className="block text-[15px] font-semibold text-navy-950">
                        {formatKRW(v.priceKRW)}
                      </span>
                      <span className="block text-[11px] text-charcoal-600/60">{volumeCopy[v.pages]}</span>
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={siteConfig.kakaoChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 border border-navy-900 px-6 text-[13.5px] font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-ivory-100"
              >
                <MessageCircle size={15} />
                {s.cta}
              </a>
            </div>
          ))}
        </div>

        {/* 7. 학원별 맞춤 */}
        <div className="mt-14 border border-ivory-300 bg-ivory-200/40 p-8 sm:mt-16 sm:p-10">
          <div className="mx-auto max-w-[640px] text-center">
            <h3 className="font-display text-[22px] font-semibold leading-snug text-navy-950 sm:text-[25px]">
              학원마다 시험이 다르기 때문에
              <br className="hidden sm:block" /> 문제집도 같을 필요는 없습니다.
            </h3>
            <p className="mt-4 text-[14px] leading-[1.9] text-charcoal-600">
              같은 영어 레벨테스트라도 학원에 따라 Reading 비중이 크거나, Vocabulary·Grammar·Writing이 포함될
              수 있습니다. 지원 학원 또는 학교가 확인되는 경우 해당 시험 유형을 기준으로 구성하고, 유형이
              명확하지 않은 경우에는 일반 레벨테스트 대비 구성으로 제작합니다.
            </p>
            <p className="mt-5 border-t border-navy-800/15 pt-5 text-[13.5px] font-medium text-navy-900">
              지원 학원명 또는 학교명을 알려주시면 가능한 범위에서 시험 유형을 기준으로 안내합니다.
            </p>
            <div className="mt-6">
              <KakaoButton label="지원 학원 기준으로 상담하기" />
            </div>
          </div>
        </div>

        {/* 8. 유형만 따로 구매 */}
        <div className="mt-8 border-2 border-navy-900/70 bg-white p-8 sm:p-10">
          <div className="mx-auto max-w-[640px] text-center">
            <h3 className="font-display text-[20px] font-semibold text-navy-950 sm:text-[22px]">
              전체 문제집이 필요하지 않으신가요?
            </h3>
            <p className="mt-4 text-[13.5px] leading-[1.9] text-charcoal-600">
              Interview · Writing · Reading · Vocabulary · Grammar · Math 중 특정 영역만 필요하거나 Reading +
              Writing, Vocabulary + Grammar처럼 두 영역을 섞어서 구성할 수 있습니다. 이 경우 기본 페이지
              가격이 아닌 맞춤 견적으로 안내합니다.
            </p>
            <div className="mt-6">
              <KakaoButton label="맞춤 구성 견적받기" />
            </div>
          </div>
        </div>

        {/* 9. 과목 조합 주문 */}
        <div className="mx-auto mt-14 max-w-[640px] text-center sm:mt-16">
          <h3 className="font-display text-[20px] font-semibold text-navy-950 sm:text-[22px]">
            영어 + 국어 + 수학, 필요한 과목만 조합하세요.
          </h3>
          <p className="mt-4 text-[13.5px] leading-[1.9] text-charcoal-600">
            세 과목을 모두 구매할 필요는 없습니다. 영어 + 수학 · 영어 + 국어 · 국어 + 수학 · 영어 + 국어 +
            수학 등 필요한 과목만 선택할 수 있습니다. 최종 합계와 페이지 구성은 상담에서 맞춰 안내합니다.
          </p>
        </div>

        {/* 10. Sample 강조 */}
        <div className="mx-auto mt-14 flex max-w-[640px] flex-col items-center border border-ivory-300 bg-ivory-200/30 p-8 text-center sm:mt-16">
          <Eye size={20} className="text-navy-800/50" strokeWidth={1.6} />
          <p className="mt-3 font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">
            Before Purchase
          </p>
          <p className="mt-2 text-[15px] font-medium text-navy-950">구매 전 Sample을 확인할 수 있습니다.</p>
          <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">
            시험과 학년, 학생 수준에 따라 실제 구성은 달라질 수 있으므로 구매 전에 Sample을 확인한 뒤 진행할
            수 있도록 안내합니다.
          </p>
          <Link
            href="/books"
            className="mt-5 inline-flex min-h-[50px] items-center justify-center gap-2 border border-navy-900/30 px-6 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-900"
          >
            Sample 요청하기
          </Link>
        </div>

        {/* 11. 몇 페이지를 선택하면 좋을까요? */}
        <div className="mt-16 sm:mt-20">
          <h3 className="text-center font-display text-[22px] font-semibold text-navy-950 sm:text-[25px]">
            몇 페이지를 선택하면 좋을까요?
          </h3>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pageGuide.map((g) => (
              <div key={g.label} className="border-t-2 border-navy-900/70 pt-4">
                <p className="font-display text-[17px] font-semibold text-navy-950">{g.label}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-charcoal-600">{g.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-[560px] text-center text-[12.5px] leading-relaxed text-charcoal-600/70">
            페이지가 많을수록 항상 좋은 것은 아닙니다. 시험까지 남은 기간과 학생의 현재 수준을 기준으로 필요한
            분량을 선택하는 것을 권장합니다.
          </p>
        </div>

        {/* 12. 레벨테스트 전용 CTA */}
        <div className="mx-auto mt-16 max-w-[560px] text-center sm:mt-20">
          <h3 className="font-display text-[22px] font-semibold text-navy-950 sm:text-[25px]">
            어떤 구성이 맞는지 모르셔도 됩니다.
          </h3>
          <p className="mt-4 text-[13.5px] leading-relaxed text-charcoal-600">
            아래 네 가지만 알려주시면 구성 상담이 훨씬 빨라집니다.
          </p>
          <ul className="mx-auto mt-5 grid max-w-[380px] grid-cols-2 gap-x-4 gap-y-2 text-left text-[12.5px] text-charcoal-600">
            {beforeChat.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
          <div className="mt-7">
            <KakaoButton label="레벨테스트 구성 상담하기" />
          </div>
        </div>
      </div>
    </section>
  );
}
