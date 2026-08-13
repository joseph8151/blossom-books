import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { conversionSupportItems } from "@/data/john";

export default function ExistingAcademyOwners() {
  return (
    <section id="existing-owners" className="border-b border-navy-900/12 bg-paleblue-100 py-20 lg:py-28 scroll-mt-20">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-8">
        <div>
          <span className="eyebrow">Already Running an Academy?</span>
          <h2 className="mt-5 text-balance font-display text-[28px] font-extrabold leading-[1.2] text-navy-950 sm:text-[34px]">
            You Don&rsquo;t Have to <span className="text-coral-500">Start Over.</span>
          </h2>
          <p className="mt-6 max-w-lg text-[14.5px] leading-relaxed text-charcoal-600">
            이미 영어학원, 교습소 또는 공부방을 운영하고 있다면 처음부터 다시 시작할 필요는
            없습니다. JOHN EDUCATION GROUP의 프로그램과 운영 시스템을 기존 사업에 도입할 수
            있습니다.
          </p>
          <Link
            href="/consultation"
            className="group mt-8 inline-flex w-fit items-center gap-2.5 rounded-full bg-navy-900 px-7 py-3.5 text-[14px] font-semibold text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
          >
            기존 학원 전환 상담
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-card sm:p-10">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-navy-900/60">지원 내용</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {conversionSupportItems.map((item, i) => (
              <li key={item} className="flex items-center gap-3 text-[13.5px] leading-relaxed text-charcoal-600">
                <span className="num-badge h-6 w-6 shrink-0 text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
