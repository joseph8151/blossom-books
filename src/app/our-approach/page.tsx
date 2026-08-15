import Link from "next/link";
import { GraduationCap, Database, Users, ClipboardCheck, ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "교재 제작 방식 — 미국 명문대·프렙 교육 경험",
  description:
    "Blossom Books 교재는 미국 현지 학업 경험과 명문대 출신 교육진, 실제 학생 티칭 경험, 프렙 센터의 현장 피드백을 바탕으로 설계됩니다.",
};

const pillars = [
  {
    icon: GraduationCap,
    en: "U.S. Academic Experience",
    ko: "미국 현지 학업 경험",
    desc: "미국에서 실제로 수년간 학업을 이수한 교육진이 미국 교육과정의 눈높이로 교재를 설계합니다.",
  },
  {
    icon: Users,
    en: "Prep Teaching Experience",
    ko: "실제 학생 티칭 경험",
    desc: "다양한 수준의 학생을 직접 지도하며 확인한 자주 틀리는 유형·어려워하는 개념을 반영합니다.",
  },
  {
    icon: Database,
    en: "Center Learning Data",
    ko: "프렙 센터의 학습 데이터",
    desc: "프렙 티칭 센터에서 축적되는 학생 학습 데이터와 학년별 실력 차이를 문항 구성에 활용합니다.",
  },
  {
    icon: ClipboardCheck,
    en: "On-site Feedback",
    ko: "수업 현장의 피드백",
    desc: "수업 현장에서 나오는 실제 피드백으로 난이도와 문제 유형을 지속적으로 다듬습니다.",
  },
];

export default function OurApproachPage() {
  return (
    <div>
      {/* 히어로 */}
      <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">How our materials are made</p>
          <h1 className="mt-4 font-display text-[30px] font-semibold leading-tight text-navy-950 sm:text-[40px]">
            미국 명문대·프렙 교육 경험을
            <br />
            <span className="text-brass-500">바탕으로 만든 교재</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.9] text-charcoal-600">
            블러섬북스 교재는 단순히 문제를 모아 구성하지 않습니다. 미국에서 실제로 수년간 학업을 이수한
            미국 명문대 출신 선생님들과 프렙 티칭 경험을 갖춘 교육진이 교재 제작에 참여합니다.
          </p>
        </div>
      </section>

      {/* 4개 기둥 */}
      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <p className="max-w-2xl font-display text-[19px] font-medium leading-snug text-navy-950 sm:text-[22px]">
            미국 학업 경험 · 명문대 출신 교육진 · 실제 학생 티칭 경험 · 프렙 센터의 현장 피드백
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
            이 네 가지를 바탕으로, 학생이 실제로 풀면서 실력을 높일 수 있는 교재를 제작합니다.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden border border-navy-800/12 bg-navy-800/10 sm:grid-cols-2">
            {pillars.map(({ icon: Icon, en, ko, desc }) => (
              <div key={en} className="bg-ivory-100 p-7">
                <Icon size={22} className="text-brass-500" strokeWidth={1.7} />
                <p className="mt-4 font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">{en}</p>
                <h3 className="mt-1.5 font-display text-[19px] font-semibold text-navy-950">{ko}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-charcoal-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 설계 철학 */}
      <section className="border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="space-y-6 text-[15px] leading-[1.95] text-charcoal-600">
            <p>
              프렙 티칭 센터에서 축적되는 <span className="font-medium text-navy-900">학생들의 학습 데이터와 수업
              현장의 피드백</span>, 다양한 수준의 학생들을 직접 지도하며 확인한{" "}
              <span className="font-medium text-navy-900">자주 틀리는 유형·어려워하는 개념·학년별 실력 차이</span>를
              바탕으로 문제를 구성합니다.
            </p>
            <p>
              또한 미국 교육과정을 직접 경험한 선생님들의 시각을 반영하여 단순 암기형 문제가 아니라{" "}
              <span className="font-medium text-navy-900">미국식 사고력, Reading Comprehension, Writing, Math
              Reasoning</span> 등 실제 학업에서 요구되는 능력을 자연스럽게 연습할 수 있도록 설계합니다.
            </p>
          </div>

          <blockquote className="mt-10 border-l-2 border-brass-500 pl-6 font-display text-[19px] font-medium italic leading-snug text-navy-950 sm:text-[22px]">
            문제 수가 아니라, 학생이 실제로 풀면서 실력이 오르는 구성을 설계합니다.
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ivory-200/50 py-14 lg:py-16">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <p className="font-display text-[20px] font-semibold text-navy-950 sm:text-[23px]">
            교재의 구성과 난이도를 샘플로 직접 확인해보세요.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/books"
              className="group inline-flex items-center gap-2 bg-navy-900 px-6 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
            >
              교재 · 무료 샘플 보기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={siteConfig.kakaoChatUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3.5 text-[14px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              <MessageCircle size={16} /> 카카오톡 문의
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
