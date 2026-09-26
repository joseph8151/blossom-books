import { MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

const trustPoints = ["MAP Growth 대비", "CAT4 Level별 구성", "OOPT Placement 대비", "학년·시험별 맞춤 제작"];

const exams = [
  {
    id: "map",
    title: "MAP Growth",
    desc: "Reading / Language Usage / Math 등 국제학교 학업 성취도 및 입학·배치 과정에서 활용되는 MAP 유형 대비",
    cta: "MAP Growth 보기",
  },
  {
    id: "cat4",
    title: "CAT4",
    desc: "Verbal · Non-Verbal · Quantitative · Spatial Reasoning — 학생 연령과 시험 Level에 따라 문제 구성이 달라지는 인지능력 평가 대비",
    cta: "CAT4 보기",
  },
  {
    id: "isee",
    title: "ISEE",
    desc: "Verbal Reasoning · Reading Comprehension · Quantitative Reasoning · Mathematics Achievement — Lower · Middle · Upper 레벨별 대비",
    cta: "ISEE 보기",
  },
  {
    id: "oopt",
    title: "Oxford Online Placement Test",
    desc: "영어 능력과 Placement를 확인하기 위한 Oxford 기반 온라인 레벨 테스트 대비",
    cta: "OOPT 보기",
  },
];

export default function Hero() {
  return (
    <>
      <section className="border-b border-ivory-300 bg-ivory-100 pb-14 pt-16 sm:pt-20">
        <div className="mx-auto max-w-[760px] px-5 text-center sm:px-8">
          <p className="font-label text-[11px] uppercase tracking-[0.2em] text-brass-500">
            International School Admission Prep
          </p>
          <h1 className="mt-4 font-display text-[32px] font-semibold leading-tight text-navy-950 sm:text-[40px]">
            국제학교 입학시험,
            <br />
            시험별로 정확하게 준비하세요.
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.85] text-charcoal-600">
            국제학교와 외국인학교 입학 및 반 배정 과정에서는 학교와 학년에 따라 서로 다른 평가가 사용됩니다.
            Blossom Books는 MAP Growth, CAT4, ISEE, Oxford Online Placement Test 등 시험별 유형과 학생
            수준에 맞춘 문제집을 제공합니다.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#exams"
              className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800 sm:w-auto"
            >
              시험별 교재 보기
            </a>
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 border border-navy-900/25 px-7 text-[14px] font-medium text-navy-900 transition-colors hover:border-navy-900 sm:w-auto"
            >
              <MessageCircle size={16} />
              입학시험 상담하기
            </a>
          </div>
        </div>

        {/* 4. 신뢰 포인트 */}
        <div className="mx-auto mt-10 grid max-w-[780px] grid-cols-2 gap-4 px-5 sm:grid-cols-4 sm:px-8">
          {trustPoints.map((t) => (
            <div key={t} className="border-t-2 border-navy-900/70 pt-3 text-center">
              <p className="text-[12.5px] font-medium leading-snug text-navy-950">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 시험 선택 영역 */}
      <section id="exams" className="border-b border-ivory-300 bg-ivory-200/30 py-16 sm:py-20">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <h2 className="text-center font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
            어떤 시험을 준비하시나요?
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {exams.map((e) => (
              <div key={e.id} className="flex flex-col border border-ivory-300 bg-white p-6 sm:p-7">
                <p className="font-display text-[18px] font-semibold text-navy-950">{e.title}</p>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-charcoal-600">{e.desc}</p>
                <a
                  href={`#${e.id}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-navy-900 underline decoration-navy-900/30 underline-offset-4 hover:decoration-navy-900"
                >
                  {e.cta}
                  <ArrowRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
