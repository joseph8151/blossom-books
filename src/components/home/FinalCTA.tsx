import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-navy-950 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <h2 className="text-balance font-display text-[34px] font-extrabold leading-[1.15] text-ivory-100 sm:text-[46px]">
          Your Education Business
          <br />
          <span className="text-coral-400">Could Start Here.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-ivory-200/75">
          자신만의 교육사업을 JOHN EDUCATION GROUP과 함께 시작해보세요.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/consultation"
            className="group inline-flex items-center gap-2.5 rounded-full bg-coral-500 px-8 py-4 text-[15px] font-semibold text-navy-950 shadow-coral transition-all hover:-translate-y-0.5 hover:bg-coral-400"
          >
            가맹 상담 신청
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/business-models"
            className="inline-flex items-center gap-2 rounded-full border border-ivory-100/30 px-8 py-4 text-[15px] font-medium text-ivory-100 transition-colors hover:border-ivory-100/60"
          >
            사업 모델 살펴보기
          </Link>
        </div>

        <p className="mt-12 font-label text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory-200/50">
          One Education Brand. Multiple Business Models.
        </p>
      </div>
    </section>
  );
}
