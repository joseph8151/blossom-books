import Link from "next/link";
import { FileSearch, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

// 마지막 전환 섹션 — 구매를 밀어붙이지 않고, 확인만 해도 된다는 선택지로 마무리합니다.
export default function NotSureYet() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/40 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <span className="eyebrow eyebrow--center">Not sure yet?</span>
        <h2 className="mt-4 font-display text-[27px] font-semibold leading-tight text-navy-950 sm:text-[32px]">
          아직 결정하지 않으셔도 됩니다.
        </h2>
        <p className="mt-5 text-[14.5px] leading-relaxed text-charcoal-600">
          시험 이름과 학생 학년만 알려주세요.
        </p>
        <p className="mt-2 text-[14.5px] leading-relaxed text-charcoal-600">
          구매를 강요하기보다 현재 학생에게 필요한 교재가 있는지부터 확인해드립니다.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
          >
            <FileSearch size={16} />
            무료 Sample 먼저 보기
          </Link>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-6 py-3.5 text-[14px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
          >
            <MessageCircle size={16} />
            카카오톡으로 간단히 물어보기
          </a>
        </div>

        <p className="mt-5 text-[12.5px] text-charcoal-600">상담 후 구매하지 않으셔도 괜찮습니다.</p>
      </div>
    </section>
  );
}
