import Link from "next/link";
import { MessageCircle, Clock, FileText } from "lucide-react";
import { siteConfig } from "@/data/site";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";

export const metadata = {
  title: "모의고사",
  description: "레벨테스트(학년별 영어·수학)·MAP·CAT4 실전 모의고사. 실전 형식에 맞춘 1회분 구성.",
};

type MockExam = {
  eyebrow: string;
  coverTitle: string;
  title: string;
  volume: string;
  desc: string;
  areas: string[];
  tone: "navy" | "ivory";
};

const mockExams: MockExam[] = [
  {
    eyebrow: "Level Test",
    coverTitle: "English",
    title: "레벨테스트 모의고사 · 영어",
    volume: "학년별 · 15페이지",
    desc: "각 학년 레벨테스트 형식에 맞춘 영어 실전 모의고사입니다. 학년별로 준비하실 수 있습니다.",
    areas: ["Reading", "Vocabulary", "Grammar", "Writing"],
    tone: "ivory",
  },
  {
    eyebrow: "Level Test",
    coverTitle: "Math",
    title: "레벨테스트 모의고사 · 수학",
    volume: "학년별 · 15페이지",
    desc: "각 학년 레벨테스트 형식에 맞춘 수학 실전 모의고사입니다. 학년별로 준비하실 수 있습니다.",
    areas: ["수와 연산", "도형·측정", "규칙·패턴", "사고력"],
    tone: "navy",
  },
  {
    eyebrow: "Admissions",
    coverTitle: "MAP",
    title: "MAP 모의고사",
    volume: "실전 1회분 · 약 40페이지",
    desc: "MAP Growth 형식을 반영한 실전 모의고사 1회분입니다. 학년 수준에 맞춰 제공합니다.",
    areas: ["Mathematics", "Reading", "Language Usage"],
    tone: "navy",
  },
  {
    eyebrow: "Admissions",
    coverTitle: "CAT4",
    title: "CAT4 모의고사",
    volume: "실전 1회분 · 약 40페이지",
    desc: "CAT4 4개 영역을 균형 있게 구성한 실전 모의고사 1회분입니다.",
    areas: ["Verbal", "Non-verbal", "Quantitative", "Spatial"],
    tone: "ivory",
  },
];

export default function MockExamsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <div className="max-w-2xl">
        <span className="eyebrow">Mock exams</span>
        <h1 className="mt-4 font-display text-[28px] font-semibold text-navy-950 sm:text-[33px]">
          실전 모의고사
        </h1>
        <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
          시험 구조와 출제 비중을 분석해 실전 형식으로 구성한 모의고사입니다. 레벨테스트는
          학년별 영어·수학으로, MAP·CAT4는 실전 1회분으로 준비하실 수 있습니다. 가격과 학년별
          구성은 상담으로 편하게 안내해 드립니다.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {mockExams.map((m) => (
          <div
            key={m.title}
            className="lift group flex flex-col overflow-hidden border border-navy-800/12 bg-ivory-100 shadow-card sm:flex-row"
          >
            <div className="flex items-center justify-center bg-gradient-to-b from-ivory-200/80 to-ivory-200/30 p-7 sm:w-[42%]">
              <BookCoverMockup
                eyebrow={m.eyebrow}
                title={m.coverTitle}
                subtitle="Practice Test"
                tone={m.tone}
                tabLabel="M"
                className="max-w-[150px]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 lg:p-7">
              <h2 className="font-display text-[20px] font-semibold leading-snug text-navy-950">
                {m.title}
              </h2>
              <p className="mt-2 inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-[0.12em] text-brass-500">
                <FileText size={13} /> {m.volume}
              </p>
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-charcoal-600">{m.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {m.areas.map((a) => (
                  <span
                    key={a}
                    className="border border-navy-800/12 bg-ivory-200/50 px-2.5 py-1 text-[11px] text-charcoal-600"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-4 border-t border-navy-800/10 pt-4">
                <a
                  href={siteConfig.kakaoChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-4 py-2 text-[12.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
                >
                  <MessageCircle size={13} />
                  상담·구매
                </a>
                <Link
                  href="/custom-order"
                  className="text-[12.5px] font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4"
                >
                  학년별 문의
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 flex items-start gap-2 text-[12.5px] leading-relaxed text-charcoal-600">
        <Clock size={15} className="mt-0.5 shrink-0 text-brass-500" />
        레벨테스트 모의고사는 학년별(영어·수학)로 15페이지씩 준비되며, MAP·CAT4는 실전 1회분(약
        40페이지)으로 제공됩니다. 정확한 학년·구성은 상담 시 안내해 드립니다.
      </div>

      <div className="mt-10 border border-navy-800/12 bg-ivory-200/40 p-8 text-center shadow-card">
        <p className="text-[14px] text-charcoal-600">
          특정 시험의 자체 모의고사 제작이 필요하신가요?{" "}
          <Link
            href="/custom-order"
            className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4"
          >
            주문 제작 상담하기
          </Link>
        </p>
      </div>
    </div>
  );
}
