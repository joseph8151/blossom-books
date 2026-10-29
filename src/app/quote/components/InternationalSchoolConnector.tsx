import Link from "next/link";
import { ArrowRight } from "lucide-react";

// MAP Growth·CAT4·ISEE·Oxford Online Placement Test는 /quote-international-school로
// 분리되었습니다. 여기서는 완전히 끊지 않고 작은 연결 섹션만 남깁니다.
export default function InternationalSchoolConnector() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-200/30 py-12 sm:py-16">
      <div className="mx-auto max-w-[640px] px-5 text-center sm:px-8">
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
          International School
        </p>
        <h2 className="mt-3 font-display text-[20px] font-semibold leading-snug text-navy-950 sm:text-[22px]">
          국제학교 입학시험은 별도로 준비해 주세요.
        </h2>
        <p className="mx-auto mt-3 max-w-[520px] text-[13.5px] leading-relaxed text-charcoal-600">
          MAP Growth, CAT4, ISEE, Oxford Online Placement Test 등 국제학교·외국인학교 입학 및 배치 시험은
          별도 페이지에서 시험별 구성과 가격을 확인할 수 있습니다.
        </p>
        <Link
          href="/quote-international-school"
          className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 border border-navy-900 px-7 text-[14px] font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-ivory-100"
        >
          국제학교 입학시험 보기
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
