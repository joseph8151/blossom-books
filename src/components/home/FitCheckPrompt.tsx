import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { FOCUS_AREAS } from "@/lib/recommend";

// "좋은 교재"보다 "지금 이 학생에게 맞는 교재"라는 기준으로 옮겨 주는 섹션.
// 확인 항목은 /find 추천 폼이 실제로 묻는 항목과 동일하게 유지합니다.
const questions = [
  { no: "01", q: "현재 학년은?" },
  { no: "02", q: "현재 Reading Level 또는 SR Level은?" },
  { no: "03", q: "어떤 시험을 준비하나요?" },
  { no: "04", q: "시험까지 얼마나 남았나요?" },
];

export default function FitCheckPrompt() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Is it right for your child?</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            좋은 교재보다 중요한 것은
            <br />
            지금 학생에게 맞는 교재입니다.
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-navy-800/12 bg-navy-800/12 sm:grid-cols-2 lg:grid-cols-4">
          {questions.map(({ no, q }) => (
            <div key={no} className="bg-ivory-100 p-6">
              <span className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500">{no}</span>
              <p className="mt-3 font-display text-[15.5px] font-medium leading-snug text-navy-950">{q}</p>
            </div>
          ))}
        </div>

        {/* 가장 부족한 영역 */}
        <div className="mt-5 border border-navy-800/12 bg-ivory-200/40 p-6 sm:p-7">
          <span className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500">05</span>
          <p className="mt-3 font-display text-[15.5px] font-medium text-navy-950">가장 부족한 영역은?</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {FOCUS_AREAS.map((a) => (
              <span
                key={a}
                className="border border-navy-800/20 bg-ivory-100 px-3.5 py-2 text-[13px] font-medium text-charcoal-900"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/find"
            className="group inline-flex items-center gap-2 bg-navy-900 px-6 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
          >
            내 아이 교재 추천받기
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-6 py-3.5 text-[14px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
          >
            <MessageCircle size={16} />
            교재 선택 도와주세요
          </a>
        </div>
      </div>
    </section>
  );
}
