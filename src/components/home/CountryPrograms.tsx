import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { countryPrograms } from "@/data/countryPrograms";

// 미국/영국/캐나다/호주 나라별 교과 구성·가격 페이지로 연결하는 카드 4장.
// 각 페이지는 홈 메뉴에는 없고 이 카드로만 연결됩니다.
export default function CountryPrograms() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-xl">
          <span className="eyebrow">By Country</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            나라별 교과 과정
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
            학생이 다니는 학교의 교육과정에 맞춰 학년·과목별 문제집을 구성합니다.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {countryPrograms.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="lift flex flex-col border border-navy-800/12 bg-ivory-100 p-6 shadow-card"
            >
              <p className="font-display text-[17px] font-semibold text-navy-950">{c.title}</p>
              <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-charcoal-600">{c.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-navy-900">
                구성·가격 보기
                <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
