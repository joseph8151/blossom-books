import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

const trustLine = ["PDF Workbook", "Answer & Explanation Guide", "Sample Available", "Level-based Configuration"];

export default function QuoteHero() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-100 pb-14 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[760px] px-5 text-center sm:px-8">
        <p className="font-label text-[11px] uppercase tracking-[0.2em] text-brass-500">
          Pricing &amp; Workbook Guide
        </p>
        <h1 className="mt-4 font-display text-[32px] font-semibold leading-tight text-navy-950 sm:text-[40px]">
          학생에게 필요한 만큼,
          <br />
          정확하게 선택하세요.
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.85] text-charcoal-600">
          시험, 학년, 준비 기간에 따라 필요한 문제량은 다릅니다. Blossom Books는 가장 많은 페이지가 아니라
          학생에게 필요한 구성을 기준으로 안내합니다. 40P부터 시작해 시험별·과목별·수준별로 필요한 구성만
          선택할 수 있습니다.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800 sm:w-auto"
          >
            <MessageCircle size={16} />
            내 구성 상담받기
          </a>
          <Link
            href="/books"
            className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 border border-navy-900/25 px-7 text-[14px] font-medium text-navy-900 transition-colors hover:border-navy-900 sm:w-auto"
          >
            교재 먼저 찾아보기
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mx-auto mt-8 flex max-w-[520px] flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {trustLine.map((t) => (
            <span key={t} className="font-label text-[10.5px] uppercase tracking-[0.08em] text-charcoal-600/60">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
