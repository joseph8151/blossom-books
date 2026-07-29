import Link from "next/link";
import { GraduationCap, School, UserRound, Building2, ArrowUpRight } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    tag: "학생·학부모",
    title: "필요한 학년, 실력, 시험에 맞는 교재를",
    body: "학년, 현재 실력, 준비하는 시험에 맞는 교재를 안내하고 기존 교재 또는 맞춤 제작 교재를 제공합니다.",
    href: "/books",
    cta: "자세히 보기",
  },
  {
    icon: School,
    tag: "학원·프랩학원",
    title: "수업 진도와 반 구성에 맞춘 교재를",
    body: "수업 진도, 반 구성, 시험 일정에 맞춘 문제집과 모의고사를 제작할 수 있습니다.",
    href: "/institutions",
    cta: "상담하기",
  },
  {
    icon: UserRound,
    tag: "개인 과외 선생님",
    title: "학생별 맞춤 수업 자료를",
    body: "수업용 문제, 과제, 복습 자료, 단원별 테스트를 체계적으로 구성할 수 있습니다.",
    href: "/custom-order",
    cta: "상담하기",
  },
  {
    icon: Building2,
    tag: "교육기관·브랜드",
    title: "기관 전용 커리큘럼 교재를",
    body: "기관 전용 표지, 자체 커리큘럼, 레벨별 교재, 평가 자료 제작을 상담할 수 있습니다.",
    href: "/institutions",
    cta: "상담하기",
  },
];

export default function AudienceCards() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-xl">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Who it&apos;s for</p>
          <h2 className="mt-3 font-display text-[32px] font-semibold text-navy-950 sm:text-[38px]">
            네 종류의 고객, 각자 다른 방식으로
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-navy-800/12 bg-navy-800/12 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ icon: Icon, tag, title, body, href, cta }) => (
            <div key={tag} className="group flex flex-col bg-ivory-100 p-7 transition-colors hover:bg-ivory-200">
              <Icon size={22} strokeWidth={1.5} className="text-burgundy-700" />
              <p className="mt-5 font-label text-[11px] uppercase tracking-[0.14em] text-navy-800/70">{tag}</p>
              <h3 className="mt-2.5 font-display text-[19px] font-semibold leading-snug text-navy-950">
                {title}
              </h3>
              <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-charcoal-600">{body}</p>
              <Link
                href={href}
                className="mt-6 inline-flex items-center gap-1 text-[13px] font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4"
              >
                {cta}
                <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
