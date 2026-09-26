import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BackToLevelTest() {
  return (
    <section className="bg-ivory-200/30 py-14 sm:py-16">
      <div className="mx-auto max-w-[560px] px-5 text-center sm:px-8">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">
          학원 레벨테스트를 찾고 계신가요?
        </h2>
        <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">
          영어·국어·수학, 학원·학교 반 배정 및 레벨테스트 문제집은 별도 구성·가격 페이지에서 확인하세요.
        </p>
        <Link
          href="/quote"
          className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 border border-navy-900/30 px-7 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-900"
        >
          레벨테스트 문제집 보기
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
