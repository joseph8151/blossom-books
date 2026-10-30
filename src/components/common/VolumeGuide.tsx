import { Check } from "lucide-react";

// 60·100·200·300페이지 선택 가이드. 가이드 페이지와 레벨테스트 상세에서 공통 사용합니다.
export const volumeOptions = [
  {
    pages: "60P",
    title: "빠른 핵심 점검",
    summary: "시험 직전, 가장 짧게 핵심만 점검",
    detail: "시험이 며칠 앞으로 다가왔거나, 본 교재 전에 맛보기로 짧게 시작하고 싶을 때 적합한 분량입니다.",
    duration: "약 1주 이내",
    best: "초단기 점검 · 시험 직전",
  },
  {
    pages: "100P",
    title: "핵심 유형 빠르게",
    summary: "핵심 유형만 압축해 단기간에 점검",
    detail: "시험이 얼마 남지 않았거나, 중요한 유형만 빠르게 훑고 싶을 때. 짧은 기간 집중 학습에 적합합니다.",
    duration: "약 1~2주",
    best: "단기 점검 · 시험 직전",
  },
  {
    pages: "200P",
    title: "충분한 실전 대비",
    summary: "반복 연습과 응용까지 충분하게",
    detail: "개념을 충분히 반복하고 응용 문제까지 다루고 싶을 때. 실력을 한 단계 끌어올리기에 좋은 분량입니다.",
    duration: "약 4~6주",
    best: "실력 향상 · 응용 연습",
    highlight: true,
  },
  {
    pages: "300P",
    title: "집중 반복 · 심화",
    summary: "장기 커리큘럼과 심화까지 폭넓게",
    detail: "한 학기 이상 꾸준히 학습하거나, 심화까지 폭넓게 다루고 싶을 때. 가장 충실한 구성입니다.",
    duration: "약 2~3개월+",
    best: "장기 학습 · 심화 대비",
  },
];

export default function VolumeGuide({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {volumeOptions.map((v) => (
        <div
          key={v.pages}
          className={`relative flex flex-col border p-6 ${
            v.highlight
              ? "border-brass-500/60 bg-brass-500/[0.05] shadow-card"
              : "border-navy-800/12 bg-ivory-100"
          }`}
        >
          {v.highlight && (
            <span className="absolute right-4 top-4 font-label text-[9px] uppercase tracking-[0.14em] text-brass-500">
              인기
            </span>
          )}
          <p className="font-display text-[30px] font-semibold leading-none text-navy-950">{v.pages}</p>
          <p className="mt-2 text-[14px] font-semibold text-burgundy-700">{v.title}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">
            {compact ? v.summary : v.detail}
          </p>
          <div className="mt-auto space-y-2 pt-5">
            <p className="flex items-center gap-2 text-[12.5px] text-charcoal-900">
              <Check size={14} className="shrink-0 text-brass-500" strokeWidth={2.4} />
              추천 학습 기간 · {v.duration}
            </p>
            <p className="flex items-center gap-2 text-[12.5px] text-charcoal-900">
              <Check size={14} className="shrink-0 text-brass-500" strokeWidth={2.4} />
              {v.best}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
