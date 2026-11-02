import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

// SR TEST는 Blossom Books의 주력 상품 — 홈페이지에서 가장 화려하게 다루는 단독 섹션.
// SR 1.0~12.0 전 레벨을 커버하며 100·200·300P 중 선택할 수 있습니다.
// 실제 SR 독해 문제집(sr-reading-prep-g2-3/g4-5/g6-8)의 units 10종을 그대로 노출해
// "실제 시험 유형을 다 넣었다"는 메시지를 과장 없이 데이터에 기반해 전달합니다.
// 밝은 톤 + 둥근 카드로 다른 섹션(WhyDifferent 등)과 같은 editorial 톤을 유지하면서도
// 단독 쇼케이스로 눈에 띄게 구성합니다(어두운 네이비 블록은 과하게 딱딱해 보여 제외).
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
  { pages: "200P", tag: "Complete", desc: "균형 있는 표준 대비" },
  { pages: "300P", tag: "Intensive", desc: "반복·심화까지 충분한 분량" },
];

export default function SrTestShowcase() {
  return (
    <section className="relative overflow-hidden border-b border-navy-800/12 bg-gradient-to-b from-[#fbf6ec] to-ivory-100 py-20 lg:py-28">
      {/* 배경 장식 — 부드러운 파스텔 블롭 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-8%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(173,138,78,0.16),transparent_68%)]" />
        <div className="absolute bottom-[-25%] left-[-6%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(125,138,106,0.14),transparent_68%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brass-500 px-3.5 py-1.5 font-label text-[10.5px] uppercase tracking-[0.16em] text-navy-950">
            <Sparkles size={12} strokeWidth={2.4} /> Flagship Product
          </span>
          <span className="font-label text-[11px] uppercase tracking-[0.16em] text-charcoal-600/55">
            Blossom Books 주력 상품
          </span>
        </div>

        <div className="mt-6 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* 좌측 — 카피 + 레벨 바 + CTA */}
          <div>
            <h2 className="max-w-xl font-display text-[30px] font-semibold leading-[1.2] text-navy-950 sm:text-[38px]">
              SR 테스트 리딩 문제집,
              <br />
              <span className="text-brass-500">SR 1.0부터 12.0까지</span> 전 구간 준비
            </h2>
            <p className="mt-5 max-w-lg text-[14.5px] leading-[1.9] text-charcoal-600">
              가장 많은 학생이 찾는 SR(Reading Level) 대비 교재입니다. 낮은 레벨부터 상위 레벨까지
              전 구간을 다루며, 실제 SR 독해에서 요구되는 10가지 문제 유형을 지문마다 반복 연습할 수
              있도록 구성했습니다.
            </p>

            {/* SR 레벨 바 — 1.0 ~ 12.0 */}
            <div className="mt-9 rounded-2xl border border-navy-800/10 bg-white/70 p-5 shadow-soft backdrop-blur-sm">
              <div className="flex items-baseline justify-between">
                <span className="font-label text-[10px] uppercase tracking-[0.14em] text-navy-800/50">SR 1.0</span>
                <span className="font-label text-[10px] uppercase tracking-[0.14em] text-navy-800/50">SR 12.0</span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-navy-800/8">
                <div
                  className="h-full w-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #9db085 0%, #d2ae6e 50%, #d98f61 100%)" }}
                />
              </div>
              <p className="mt-2.5 text-[12.5px] text-charcoal-600/85">
                초등 저학년부터 고등 상위 레벨까지 — 현재 SR 점수에 맞춰 바로 시작할 수 있습니다.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/books?q=SR"
                className="group inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
              >
                SR 테스트 문제집 보기
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://pf.kakao.com/_lbMqX"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-navy-800/20 bg-white/60 px-7 py-3.5 text-[14.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/40"
              >
                <MessageCircle size={16} /> 레벨 상담하기
              </a>
            </div>
          </div>

          {/* 우측 — 실제 유형 태그 + 페이지 옵션 */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-navy-800/10 bg-white p-6 shadow-card">
              <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
                실제 SR 시험 유형 10종을 모두 반영
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {realTestTypes.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-navy-800/10 bg-ivory-200/70 px-3.5 py-1.5 text-[12px] font-medium text-navy-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {pageOptions.map((p) => (
                <div
                  key={p.pages}
                  className="rounded-2xl border border-navy-800/10 bg-white p-5 text-center shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
                >
                  <p className="font-display text-[24px] font-semibold leading-none text-navy-950">{p.pages}</p>
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
