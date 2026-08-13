import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whoIsJohnFor } from "@/data/john";

export const metadata = { title: "About JOHN" };

const brandMix = [
  { pct: "40%", label: "Modern American Education Company" },
  { pct: "30%", label: "Premium Franchise Brand" },
  { pct: "20%", label: "Contemporary SaaS / Startup" },
  { pct: "10%", label: "Private Education Institution" },
];

const pillars = [
  {
    title: "One Brand",
    titleKo: "하나의 브랜드",
    body: "어린이 영어부터 Academic Prep, 공부방, 교습소, 성인 1:1·그룹 어학원까지, 서로 다른 형태의 교육사업을 하나의 브랜드와 시스템 안에서 운영할 수 있도록 지원합니다.",
  },
  {
    title: "Multiple Business Models",
    titleKo: "여러 사업 모델",
    body: "공간 규모, 교육 대상, 운영 방식에 따라 JOHN KIDS, JOHN PREP, JOHN STUDY, JOHN 1:1, JOHN LANGUAGE, JOHN HYBRID 중 나에게 맞는 모델을 선택할 수 있습니다.",
  },
  {
    title: "A System, Not Just a Name",
    titleKo: "이름이 아닌 시스템",
    body: "교육 콘텐츠, 커리큘럼, 학생 진단, 수업 운영, 학습 관리, 마케팅, 브랜드 운영 시스템까지 제공하여 원장이 자신의 교육사업을 보다 전문적으로 운영할 수 있도록 돕습니다.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Positioning */}
      <section className="border-b border-navy-900/12 bg-ivory-100 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <span className="eyebrow">About JOHN</span>
          <h1 className="mt-4 text-balance font-display text-[32px] font-extrabold leading-[1.2] text-navy-950 sm:text-[42px]">
            One Education Brand.
            <br />
            <span className="text-coral-500">Multiple Business Models.</span>
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-charcoal-600">
            JOHN EDUCATION GROUP은 단일 영어학원이 아니라, 어린이 영어부터 Academic Prep, 공부방,
            교습소, 성인 1:1 어학원, 성인 그룹 어학원까지 여러 형태의 교육사업을 하나의 브랜드와
            시스템 안에서 운영할 수 있도록 지원하는 Modern Education Franchise Company입니다.
          </p>
          <p className="mt-8 rounded-2xl bg-coral-500/10 px-6 py-4 font-display text-[18px] font-semibold text-navy-900">
            Build Your Education Business with JOHN.
          </p>
        </div>
      </section>

      {/* Brand pillars */}
      <section className="border-b border-navy-900/12 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <span className="eyebrow">What JOHN Is</span>
          <h2 className="mt-4 font-display text-[26px] font-extrabold text-navy-950 sm:text-[30px]">
            단순한 이름 대여가 아닌, 운영 시스템
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <div key={p.title} className="rounded-2xl bg-ivory-100 p-7">
                <span className="num-badge h-8 w-8 text-[12px]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-[18px] font-extrabold text-navy-950">{p.title}</h3>
                <p className="text-[12.5px] font-medium text-coral-600">{p.titleKo}</p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-charcoal-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand feeling / positioning mix */}
      <section className="border-b border-navy-900/12 bg-navy-950 py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <span className="eyebrow eyebrow--light">Brand Feeling</span>
          <h2 className="mt-4 max-w-lg text-balance font-display text-[26px] font-extrabold leading-[1.25] text-ivory-100 sm:text-[30px]">
            미국 교육회사의 세련됨과 한국 프랜차이즈의 신뢰성을 함께.
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brandMix.map((b) => (
              <div key={b.label} className="rounded-2xl bg-ivory-100/6 p-5">
                <p className="font-display text-[36px] font-extrabold text-coral-400">{b.pct}</p>
                <p className="mt-1 text-[13px] leading-snug text-ivory-200/75">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="border-b border-navy-900/12 bg-ivory-100 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <span className="eyebrow eyebrow--center">Who We Work With</span>
          <h2 className="mt-4 font-display text-[26px] font-extrabold text-navy-950 sm:text-[30px]">
            JOHN Could Be Your Next Step.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {whoIsJohnFor.map((label) => (
              <span key={label} className="rounded-full bg-white px-5 py-3 text-[13.5px] font-medium text-navy-900 shadow-card">
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-5 text-center lg:px-8">
          <h2 className="font-display text-[24px] font-extrabold text-navy-950 sm:text-[28px]">
            JOHN과 함께 교육사업을 시작해보세요
          </h2>
          <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-charcoal-600">
            희망하는 사업 모델과 지역을 알려주시면 창업 조건을 상담해드립니다.
          </p>
          <Link
            href="/consultation"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-coral-500 px-7 py-3.5 text-[14px] font-semibold text-navy-950 shadow-coral transition-all hover:-translate-y-0.5 hover:bg-coral-400"
          >
            가맹 상담 신청
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
