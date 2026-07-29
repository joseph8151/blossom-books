import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function FinalCTA() {
  return (
    <section className="bg-navy-950 py-20 text-ivory-100 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="font-display text-[34px] font-semibold leading-tight sm:text-[42px]">
          필요한 교재를 찾고 계신가요?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-ivory-200/80">
          현재 구매 가능한 교재부터 확인해드립니다. 원하는 교재가 준비되어 있지 않은
          경우에는 학년, 시험, 수업 목적에 맞춘 제작 가능 여부를 상담해보세요.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/books"
            className="bg-ivory-100 px-7 py-3.5 text-[14px] font-medium text-navy-950 transition-colors hover:bg-ivory-200"
          >
            기존 교재 문의
          </Link>
          <Link
            href="/custom-order"
            className="border border-ivory-100/30 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:border-ivory-100/60"
          >
            주문 제작 상담
          </Link>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-brass-500 px-7 py-3.5 text-[14px] font-medium text-navy-950 transition-colors hover:bg-brass-400"
          >
            <MessageCircle size={16} />
            카카오톡 상담
          </a>
        </div>
      </div>
    </section>
  );
}
