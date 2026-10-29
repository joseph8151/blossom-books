import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

const trustLine = ["Sample available before purchase", "Digital PDF", "Answer & Explanation included"];

export default function QuoteFinalCTA() {
  return (
    <section className="bg-ivory-200/30 py-16 sm:py-24">
      <div className="mx-auto max-w-[680px] px-5 text-center sm:px-8">
        <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">
          Not Sure What to Choose?
        </p>
        <h2 className="mt-4 font-display text-[24px] font-semibold leading-snug text-navy-950 sm:text-[27px]">
          어떤 구성이 필요한지 모르셔도 괜찮습니다.
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[14px] leading-relaxed text-charcoal-600">
          시험명, 학년, 준비 기간을 알려주시면 필요 이상의 분량을 권하지 않고 학생에게 맞는 구성부터 안내해
          드립니다.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800 sm:w-auto"
          >
            <MessageCircle size={16} />
            카카오톡으로 구성 상담
          </a>
          <Link
            href="/books"
            className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 border border-navy-900/25 px-7 text-[14px] font-medium text-navy-900 transition-colors hover:border-navy-900 sm:w-auto"
          >
            교재 전체 보기
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mx-auto mt-8 flex max-w-[520px] flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {trustLine.map((t) => (
            <span key={t} className="font-label text-[10px] uppercase tracking-[0.08em] text-charcoal-600/60">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
