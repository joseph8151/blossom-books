import Link from "next/link";
import { FileSearch, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

// 가격 카드 바로 위 — 구매를 미룰 수 있게 해 주는 안내(Risk Reversal).
// 가격을 낮춰 보이게 하지 않고, "지금 결제하지 않아도 된다"는 선택지를 줍니다.
export default function PriceRiskReversal() {
  return (
    <div className="border border-navy-800/15 bg-ivory-200/50 p-6 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div>
          <p className="font-display text-[17px] font-semibold text-navy-950 sm:text-[19px]">
            가격이 고민되시나요?
          </p>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-charcoal-600">
            바로 구매하실 필요 없습니다. 먼저 무료 Sample을 확인하고, 학생의 학년·현재 수준·시험일까지 남은
            기간을 알려주세요.
          </p>
          <p className="mt-3 border-l-2 border-brass-500 pl-3 font-display text-[14.5px] font-medium text-navy-950">
            40P로 충분한 학생에게 60P나 100P를 권하지 않습니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 lg:justify-end">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 bg-navy-900 px-5 py-3 text-[13.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
          >
            <FileSearch size={15} />
            무료 Sample 보기
          </Link>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-5 py-3 text-[13.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50"
          >
            <MessageCircle size={15} />
            카카오톡으로 분량 추천받기
          </a>
        </div>
      </div>
    </div>
  );
}
