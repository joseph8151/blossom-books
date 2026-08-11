import { ShieldCheck, Layers3, ClipboardCheck, SearchCheck, Target, FileCheck2 } from "lucide-react";
import { BLOSSOM_LEVELS, BLOSSOM_LEVEL_KO } from "@/lib/utils";

const standards = [
  { icon: ShieldCheck, title: "학년 적합성 검토", body: "학년과 학습 단계에 맞는 개념·지문·어휘 수준인지 확인합니다." },
  { icon: Layers3, title: "난이도 단계화", body: "기초 문제에서 응용까지 난이도가 자연스럽게 이어지도록 배치합니다." },
  { icon: ClipboardCheck, title: "문제·해설 검수", body: "문항과 정답, 해설의 일치 여부와 정확성을 검토합니다." },
  { icon: SearchCheck, title: "반복 표현 및 오류 점검", body: "중복 문항, 표현 오류, 오타 등을 점검하여 완성도를 높입니다." },
  { icon: Target, title: "실제 학습 목적에 맞춘 구성", body: "문제 수보다 학생이 연습해야 할 능력을 기준으로 구성합니다." },
];

const levelTable: Record<string, { who: string; feature: string }> = {
  Foundation: { who: "기초 보완이 필요한 학생", feature: "핵심 개념 · 기본 유형" },
  Standard: { who: "학년 수준 연습이 필요한 학생", feature: "표준 난도 · 유형 균형" },
  Advanced: { who: "상위 수준을 목표로 하는 학생", feature: "응용 · 복합 문제" },
  Challenge: { who: "고난도 실전을 준비하는 학생", feature: "심화 · 실전형 문제" },
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

        {/* 상세 해설 강조 */}
        <div className="mt-14 border border-navy-800/15 bg-navy-950 p-8 text-ivory-100 lg:p-10">
          <FileCheck2 size={24} className="text-brass-400" strokeWidth={1.8} />
          <p className="mt-4 font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">
            Detailed Answer &amp; Explanation
          </p>
          <h3 className="mt-2 font-display text-[22px] font-semibold">단순한 정답지가 아닙니다</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              "왜 이 답이 정답인지 설명합니다.",
              "오답은 왜 틀렸는지 짚어 줍니다.",
              "어떤 개념을 다시 확인해야 하는지 안내합니다.",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-ivory-200/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-400" />
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Blossom Level System — 비교표 */}
        <div className="mt-8">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">
                Blossom Level System
              </p>
              <h3 className="mt-1.5 font-display text-[22px] font-semibold text-navy-950">자체 난이도 체계</h3>
            </div>
          </div>
          <div className="mt-5 overflow-hidden border border-navy-800/12 shadow-card">
            <div className="grid grid-cols-[1fr_1.3fr_1.3fr] bg-navy-950 text-ivory-100">
              {["Level", "누구에게", "문제 특징"].map((h) => (
                <div key={h} className="px-4 py-3 font-label text-[10.5px] uppercase tracking-[0.1em] text-brass-400">
                  {h}
                </div>
              ))}
            </div>
            {BLOSSOM_LEVELS.map((lv) => (
              <div key={lv} className="grid grid-cols-[1fr_1.3fr_1.3fr] border-t border-navy-800/10 bg-ivory-100">
                <div className="px-4 py-3.5">
                  <p className="font-display text-[15px] font-semibold text-navy-950">{lv}</p>
                  <p className="text-[11px] text-charcoal-600">{BLOSSOM_LEVEL_KO[lv]}</p>
                </div>
                <div className="flex items-center px-4 py-3.5 text-[13px] text-charcoal-600">{levelTable[lv].who}</div>
                <div className="flex items-center px-4 py-3.5 text-[13px] text-charcoal-600">{levelTable[lv].feature}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center font-display text-[19px] font-semibold text-navy-950 sm:text-[22px]">
            Grade 4 <span className="text-brass-500">≠</span> Level 4
          </p>
          <p className="mt-2 text-center text-[13px] text-charcoal-600">
            같은 학년에서도 Foundation · Standard · Advanced 중 다른 교재가 필요할 수 있습니다.
          </p>
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
