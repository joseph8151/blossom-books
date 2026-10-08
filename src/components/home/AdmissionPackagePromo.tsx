import Link from "next/link";
import { ArrowRight } from "lucide-react";

// 홈페이지 "Admission Full Package" 진입 섹션. 가격은 홈페이지에 노출하지
// 않고(가격은 /admission-full-package 페이지 안에서만 확인), 카테고리
// 소개 + 진입 CTA만 제공합니다. /admission-full-package 페이지 자체의
// 세이지 그린 톤을 가져와 다른 섹션과 톤을 구분합니다.
const highlights = [
  { n: "01", title: "학교별 맞춤 구성", desc: "지원 학교가 요구하는 MAP · CAT4 · 자체 시험에 맞춰 구성이 달라집니다." },
  { n: "02", title: "School Finder", desc: "국내외 90여 개 학교의 공개된 입학시험 정보를 검색·필터로 확인할 수 있습니다." },
  { n: "03", title: "6개 영역 + α", desc: "Reading · Vocabulary · Math · Writing · Interview · Mock Test에 시험 유형별 구성이 추가됩니다." },
];

export default function AdmissionPackagePromo() {
  return (
    <section className="border-b border-navy-800/12 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="font-label text-[11px] uppercase tracking-[0.16em] text-[#5f6f52]">
              Admission Full Package
            </span>
            <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
              국제학교·해외 학교 입학, 학교별로 다르게 준비하세요
            </h2>
            <p className="mt-4 max-w-lg text-[14px] leading-[1.85] text-charcoal-600">
              같은 Grade 5 지원이라도 학교마다 요구하는 시험과 난도가 다릅니다. 지원 학교·학년·현재 수준에
              맞춰 Reading, Writing, Math, Vocabulary, Interview, Mock Test를 학교별로 맞춤 구성합니다.
            </p>
            <Link
              href="/admission-full-package"
              className="group mt-8 inline-flex items-center gap-2 bg-navy-950 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-900"
            >
              학교별 패키지 알아보기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-px overflow-hidden border border-navy-800/12 bg-navy-800/10 sm:grid-cols-3">
            {highlights.map(({ n, title, desc }) => (
              <div key={n} className="bg-ivory-100 p-6">
                <span className="font-display text-[22px] font-semibold leading-none text-[#5f6f52]/35">{n}</span>
                <p className="mt-3 font-display text-[15px] font-semibold text-navy-950">{title}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
