import Link from "next/link";
import { ArrowRight } from "lucide-react";

const floatingLabels = ["JOHN KIDS", "JOHN PREP", "JOHN 1:1"];

export default function HeroSection() {
  return (
    <section className="border-b border-navy-900/10 bg-ivory-100 pt-14 pb-16 lg:pt-20 lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
        {/* 왼쪽 — 헤드라인 + 카피 + CTA */}
        <div>
          <span className="eyebrow">Education Franchise Company</span>
          <h1 className="mt-5 text-balance font-display text-[38px] font-extrabold leading-[1.12] tracking-[-0.02em] text-navy-950 sm:text-[46px] lg:text-[54px]">
            내 교육사업을 시작하는
            <br />더 나은 <span className="text-coral-500">방법.</span>
          </h1>
          <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-charcoal-600">
            어린이 영어부터 Academic Prep, 공부방, 교습소, 성인 1:1 영어, 그룹 어학원까지.
            JOHN EDUCATION GROUP의 교육 시스템으로 나에게 맞는 교육사업을 시작하세요.
          </p>
          <p className="mt-3 font-label text-[13px] font-semibold uppercase tracking-[0.08em] text-navy-800/70">
            One Education Brand. Multiple Business Models.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/business-models"
              className="group inline-flex items-center gap-2.5 rounded-full bg-navy-900 px-7 py-4 text-[14.5px] font-semibold text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
            >
              나에게 맞는 사업 모델 찾기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 rounded-full border border-navy-900/25 px-7 py-4 text-[14.5px] font-semibold text-navy-900 transition-colors hover:border-navy-900/50"
            >
              가맹 상담 신청
            </Link>
          </div>

          <p className="mt-8 font-label text-[11.5px] uppercase tracking-[0.1em] text-charcoal-600/70">
            Kids English · Academic Prep · Study Room · Private Language · Group Language
          </p>
        </div>

        {/* 오른쪽 — Editorial Composition (교육 공간을 표현하는 타이포그래피 구성) */}
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-navy-900/12 bg-navy-900 sm:aspect-[5/5.5]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(244,123,69,0.18),transparent_45%)]" />
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(248,245,239,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(248,245,239,0.5) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
            <div className="relative flex h-full flex-col justify-between p-8 sm:p-10">
              <div className="flex items-start justify-between">
                <span className="font-label text-[11px] uppercase tracking-[0.2em] text-ivory-100/60">
                  Est. Education System
                </span>
                <span className="h-2 w-2 rounded-full bg-coral-500" />
              </div>
              <div>
                <p className="font-display text-[15px] leading-snug text-ivory-100/85 sm:text-[17px]">
                  Kids English · Academic Prep
                  <br />
                  Study Room · Private Language
                  <br />
                  Group Language
                </p>
                <p className="mt-6 font-display text-[68px] font-extrabold leading-none text-ivory-100 sm:text-[86px]">
                  06
                </p>
                <p className="mt-1 font-label text-[11px] uppercase tracking-[0.18em] text-coral-400">
                  Business Models. One Brand.
                </p>
              </div>
            </div>
          </div>

          {/* Floating program labels */}
          <div className="pointer-events-none absolute -left-4 top-8 hidden flex-col gap-2.5 sm:flex">
            {floatingLabels.map((label, i) => (
              <span
                key={label}
                className="rounded-full border border-navy-900/15 bg-ivory-100 px-4 py-2 font-label text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-900 shadow-card"
                style={{ marginLeft: `${i * 14}px` }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
