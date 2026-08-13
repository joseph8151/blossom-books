import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TeacherToOwner() {
  return (
    <section className="border-b border-navy-900/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <div>
          <span className="eyebrow">From Teacher to Business Owner</span>
          <h2 className="mt-5 text-balance font-display text-[30px] font-extrabold leading-[1.2] text-navy-950 sm:text-[36px]">
            선생님에서
            <br />
            교육사업가로.
          </h2>
        </div>

        <div className="flex flex-col justify-center">
          <p className="max-w-xl text-[15px] leading-relaxed text-charcoal-600">
            좋은 수업을 하는 것과 좋은 교육사업을 운영하는 것은 다릅니다. JOHN EDUCATION GROUP은
            강사와 원장이 수업만 잘하는 것을 넘어 자신의 교육사업을 구축할 수 있도록 지원합니다.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-charcoal-600">
            과외 또는 개인수업을 하던 선생님도 자신의 이름이 아닌 전문적인 교육 브랜드 아래에서
            교육센터를 운영할 수 있습니다.
          </p>
          <p className="mt-8 font-display text-[19px] font-semibold text-navy-950 sm:text-[22px]">
            Teach well. Operate better. <span className="text-coral-500">Grow smarter.</span>
          </p>
          <Link
            href="/consultation"
            className="group mt-8 inline-flex w-fit items-center gap-2.5 rounded-full bg-navy-900 px-7 py-3.5 text-[14px] font-semibold text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
          >
            나의 교육사업 시작하기
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
