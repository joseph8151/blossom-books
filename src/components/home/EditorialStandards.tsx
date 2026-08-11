import { ShieldCheck, Layers3, ClipboardCheck, SearchCheck, Target, FileCheck2 } from "lucide-react";
import { BLOSSOM_LEVELS, BLOSSOM_LEVEL_KO } from "@/lib/utils";

const standards = [
  { icon: ShieldCheck, title: "학년 적합성 검토", body: "학년과 학습 단계에 맞는 개념·지문·어휘 수준인지 확인합니다." },
  { icon: Layers3, title: "난이도 단계화", body: "기초 문제에서 응용까지 난이도가 자연스럽게 이어지도록 배치합니다." },
  { icon: ClipboardCheck, title: "문제·해설 검수", body: "문항과 정답, 해설의 일치 여부와 정확성을 검토합니다." },
  { icon: SearchCheck, title: "반복 표현 및 오류 점검", body: "중복 문항, 표현 오류, 오타 등을 점검하여 완성도를 높입니다." },
  { icon: Target, title: "실제 학습 목적에 맞춘 구성", body: "문제 수보다 학생이 연습해야 할 능력을 기준으로 구성합니다." },
];

const levelDesc: Record<string, string> = {
  Foundation: "개념·기초 다지기",
  Standard: "학년 표준 연습",
  Advanced: "응용·상급 대비",
  Challenge: "심화·고난도",
};

export default function EditorialStandards() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Editorial standards</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[30px]">
            교재는 이렇게 검토되어 제작됩니다
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
            모든 Blossom Books 교재는 아래 제작 기준을 거쳐 완성됩니다. 문제를 많이 넣기보다, 학생이 실제로
            이해하고 풀 수 있도록 검토합니다.
          </p>
        </div>

        {/* 제작 기준 5개 */}
        <div className="mt-12 grid gap-px overflow-hidden border border-navy-800/12 bg-navy-800/12 shadow-card sm:grid-cols-2 lg:grid-cols-5">
          {standards.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col bg-ivory-100 p-6">
              <div className="flex h-10 w-10 items-center justify-center border border-brass-500/30 bg-brass-500/[0.07] text-brass-500">
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <p className="mt-4 font-display text-[16px] font-semibold leading-snug text-navy-950">{title}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          {/* 상세 해설 강조 */}
          <div className="border border-navy-800/15 bg-navy-950 p-8 text-ivory-100 lg:p-10">
            <FileCheck2 size={24} className="text-brass-400" strokeWidth={1.8} />
            <p className="mt-4 font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">
              Detailed Answer &amp; Explanation
            </p>
            <h3 className="mt-2 font-display text-[22px] font-semibold">단순한 정답지가 아닙니다</h3>
            <ul className="mt-5 space-y-3 text-[13.5px] leading-relaxed text-ivory-200/85">
              {[
                "왜 이 답이 정답인지 설명합니다.",
                "오답은 왜 틀렸는지 짚어 줍니다.",
                "어떤 개념을 다시 확인해야 하는지 안내합니다.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Blossom Level System */}
          <div className="border border-navy-800/12 bg-ivory-200/50 p-8 lg:p-10">
            <p className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">
              Blossom Level System
            </p>
            <h3 className="mt-2 font-display text-[22px] font-semibold text-navy-950">자체 난이도 체계</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">
              모든 교재에는 Blossom 고유의 4단계 레벨이 표시됩니다.
            </p>
            <div className="mt-6 space-y-2.5">
              {BLOSSOM_LEVELS.map((lv, i) => (
                <div key={lv} className="flex items-center gap-3">
                  <span className="font-label text-[11px] text-brass-500">{String(i + 1).padStart(2, "0")}</span>
                  <span className="w-24 font-display text-[16px] font-semibold text-navy-950">{lv}</span>
                  <span className="text-[12.5px] text-charcoal-600">
                    {BLOSSOM_LEVEL_KO[lv]} · {levelDesc[lv]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 브랜드 메시지 */}
        <div className="mt-14 border-t border-navy-800/12 pt-10 text-center">
          <p className="font-display text-[22px] font-medium italic leading-snug text-navy-900 sm:text-[26px]">
            “One grade doesn&apos;t mean one level.”
          </p>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-charcoal-600">
            학년이 아니라 학생을 기준으로 교재를 만듭니다. We create learning materials around the
            student, not just the grade.
          </p>
        </div>
      </div>
    </section>
  );
}
