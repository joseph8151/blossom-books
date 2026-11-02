import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

// SR TEST는 Blossom Books의 주력 상품 — 홈페이지에서 가장 화려하게 다루는 단독 섹션.
// SR 1.0~12.0 전 레벨을 커버하며 100·200·300P 중 선택할 수 있습니다.
// 실제 SR 독해 문제집(sr-reading-prep-g2-3/g4-5/g6-8)의 units 10종을 그대로 노출해
// "실제 시험 유형을 다 넣었다"는 메시지를 과장 없이 데이터에 기반해 전달합니다.
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
    <section className="relative overflow-hidden border-b border-navy-800/12 bg-navy-950 py-20 text-ivory-100 lg:py-28">
      {/* 배경 장식 — 브랜드 골드 라이트 + 레벨 숫자 워터마크 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(173,138,78,0.28),transparent_65%)]" />
        <div className="absolute bottom-[-20%] left-[-5%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(176,106,60,0.18),transparent_65%)]" />
        <p className="absolute -top-6 left-1/2 -translate-x-1/2 select-none font-display text-[220px] font-bold leading-none text-ivory-100/[0.03] sm:text-[280px]">
          SR
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 bg-brass-500 px-3 py-1.5 font-label text-[10.5px] uppercase tracking-[0.16em] text-navy-950">
            <Sparkles size={12} strokeWidth={2.4} /> Flagship Product
          </span>
          <span className="font-label text-[11px] uppercase tracking-[0.16em] text-ivory-100/50">
            Blossom Books 주력 상품
          </span>
        </div>

        <div className="mt-6 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* 좌측 — 카피 + 레벨 바 + CTA */}
          <div>
            <h2 className="max-w-xl font-display text-[30px] font-semibold leading-[1.2] sm:text-[38px]">
              SR 테스트 리딩 문제집,
              <br />
              <span className="text-brass-500">SR 1.0부터 12.0까지</span> 전 구간 준비
            </h2>
            <p className="mt-5 max-w-lg text-[14.5px] leading-[1.9] text-ivory-100/75">
              가장 많은 학생이 찾는 SR(Reading Level) 대비 교재입니다. 낮은 레벨부터 상위 레벨까지
              전 구간을 다루며, 실제 SR 독해에서 요구되는 10가지 문제 유형을 지문마다 반복 연습할 수
              있도록 구성했습니다.
            </p>

            {/* SR 레벨 바 — 1.0 ~ 12.0 */}
            <div className="mt-9">
              <div className="flex items-baseline justify-between">
                <span className="font-label text-[10px] uppercase tracking-[0.14em] text-ivory-100/45">SR 1.0</span>
                <span className="font-label text-[10px] uppercase tracking-[0.14em] text-ivory-100/45">SR 12.0</span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-ivory-100/10">
                <div
                  className="h-full w-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #7d8a6a 0%, #ad8a4e 50%, #b06a3c 100%)" }}
                />
              </div>
              <p className="mt-2.5 text-[12.5px] text-ivory-100/55">
                초등 저학년부터 고등 상위 레벨까지 — 현재 SR 점수에 맞춰 바로 시작할 수 있습니다.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/books?q=SR"
                className="group inline-flex items-center gap-2 bg-brass-500 px-7 py-3.5 text-[14.5px] font-medium text-navy-950 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brass-400"
              >
                SR 테스트 문제집 보기
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://pf.kakao.com/_lbMqX"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-ivory-100/25 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 transition-all hover:-translate-y-0.5 hover:border-ivory-100/50"
              >
                <MessageCircle size={16} /> 레벨 상담하기
              </a>
            </div>
          </div>

          {/* 우측 — 실제 유형 태그 + 페이지 옵션 */}
          <div className="space-y-6">
            <div className="border border-ivory-100/15 bg-ivory-100/[0.04] p-6 backdrop-blur-sm">
              <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
                실제 SR 시험 유형 10종을 모두 반영
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {realTestTypes.map((t) => (
                  <span
                    key={t}
                    className="border border-ivory-100/15 bg-ivory-100/5 px-3 py-1.5 text-[12px] font-medium text-ivory-100/85"
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
                  className="border border-ivory-100/15 bg-ivory-100/[0.04] p-5 text-center transition-colors hover:border-brass-500/50"
                >
                  <p className="font-display text-[24px] font-semibold leading-none text-ivory-100">{p.pages}</p>
                  <p className="mt-2 font-label text-[9.5px] uppercase tracking-[0.12em] text-brass-500">{p.tag}</p>
                  <p className="mt-1.5 text-[11.5px] leading-snug text-ivory-100/60">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
