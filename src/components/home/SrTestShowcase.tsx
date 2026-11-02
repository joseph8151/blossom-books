import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

// SR TEST는 Blossom Books의 주력 상품 — 홈페이지에서 단독으로 다루는 쇼케이스 섹션.
// SR 1.0~12.0 전 레벨을 커버하며 100·200·300P 중 선택할 수 있습니다.
// 실제 SR 독해 문제집(sr-reading-prep-g2-3/g4-5/g6-8)의 units 10종을 그대로 노출해
// "실제 시험 유형을 다 넣었다"는 메시지를 과장 없이 데이터에 기반해 전달합니다.
// 다른 섹션(CollectionShowcase·AdmissionPackagePromo 등)과 같은 에디토리얼 톤
// (각진 헤어라인 보더 + eyebrow + gold-rule)을 따라, 둥근 알약형 카드 대신
// 얇은 테두리와 여백 중심의 차분하고 세련된 레이아웃으로 구성합니다.
const realTestTypes = [
  "Main Idea",
  "Supporting Details",
  "Inference",
  "Vocabulary in Context",
  "Author's Purpose",
  "Text Structure",
  "Sequence",
  "Cause & Effect",
  "Compare & Contrast",
  "Summarizing",
];

const pageOptions = [
  { pages: "100P", tag: "Starter", desc: "유형을 처음 익히는 단계" },
  { pages: "200P", tag: "Complete", desc: "균형 있는 표준 대비", recommended: true },
  { pages: "300P", tag: "Intensive", desc: "반복·심화까지 충분한 분량" },
];

export default function SrTestShowcase() {
  return (
    <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="eyebrow">Flagship Product · Blossom Books 주력 상품</span>
        </div>

        <div className="mt-6 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          {/* 좌측 — 카피 + 레벨 바 + CTA */}
          <div>
            <h2 className="max-w-xl font-display text-[30px] font-semibold leading-[1.2] text-navy-950 sm:text-[38px]">
              SR 테스트 리딩 문제집,
              <br />
              <span className="italic text-burgundy-700">SR 1.0부터 12.0까지</span> 전 구간 준비
            </h2>
            <p className="mt-5 max-w-lg text-[14.5px] leading-[1.9] text-charcoal-600">
              가장 많은 학생이 찾는 SR(Reading Level) 대비 교재입니다. 낮은 레벨부터 상위 레벨까지
              전 구간을 다루며, 실제 SR 독해에서 요구되는 10가지 문제 유형을 지문마다 반복 연습할 수
              있도록 구성했습니다.
            </p>

            {/* SR 레벨 바 — 1.0 ~ 12.0, 12단 눈금으로 "12권"을 암시 */}
            <div className="mt-10 border-t border-navy-800/12 pt-6">
              <div className="flex items-baseline justify-between">
                <span className="font-label text-[10.5px] uppercase tracking-[0.14em] text-navy-800/55">SR 1.0</span>
                <span className="font-label text-[10.5px] uppercase tracking-[0.14em] text-navy-800/55">SR 12.0 · 12 Levels</span>
              </div>
              <div className="mt-3 flex gap-[3px]">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((lv) => (
                  <span
                    key={lv}
                    className="h-1 flex-1"
                    style={{ background: lv <= 4 ? "#9db085" : lv <= 8 ? "#d2ae6e" : "#d98f61" }}
                  />
                ))}
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-charcoal-600">
                초등 저학년부터 고등 상위 레벨까지 — 현재 SR 점수에 맞춰 바로 시작할 수 있습니다.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/books?q=SR"
                className="group inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
              >
                SR 테스트 문제집 보기
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://pf.kakao.com/_lbMqX"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-navy-800/25 px-7 py-3.5 text-[14.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50"
              >
                <MessageCircle size={16} /> 레벨 상담하기
              </a>
            </div>
          </div>

          {/* 우측 — 실제 유형 태그 + 페이지 옵션 */}
          <div>
            <div className="border border-navy-800/12 bg-ivory-100 p-7">
              <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
                실제 SR 시험 유형 10종을 모두 반영
              </p>
              <div className="gold-rule mt-3 w-10" />
              <div className="mt-5 flex flex-wrap gap-2">
                {realTestTypes.map((t) => (
                  <span
                    key={t}
                    className="border border-navy-800/15 px-3 py-1.5 font-label text-[11px] tracking-wide text-navy-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* 분량 — 헤어라인으로 구분된 단일 패널 (낱개 카드 대신) */}
            <div className="mt-6 grid divide-y divide-navy-800/12 border border-navy-800/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {pageOptions.map((p) => (
                <div key={p.pages} className={`p-6 text-center ${p.recommended ? "bg-ivory-200/50" : ""}`}>
                  <span className="block h-3 font-label text-[9px] uppercase tracking-[0.14em] text-burgundy-700">
                    {p.recommended ? "Recommended" : ""}
                  </span>
                  <p className="mt-1.5 font-display text-[26px] font-semibold leading-none text-navy-950">
                    {p.pages}
                  </p>
                  <p className="mt-2 font-label text-[9.5px] uppercase tracking-[0.12em] text-brass-500">{p.tag}</p>
                  <p className="mt-1.5 text-[11.5px] leading-snug text-charcoal-600">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
