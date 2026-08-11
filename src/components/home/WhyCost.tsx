import { Check, Minus } from "lucide-react";

const general = [
  "학년 중심",
  "정해진 한 가지 난이도",
  "일반적인 문제 구성",
  "간단한 정답",
  "대량 판매 중심",
];

const blossom = [
  "Grade + Current Level",
  "Target Test Based",
  "Skill-Based Question Structure",
  "Detailed Answer & Explanation",
  "40P / 60P / 100P 선택",
  "Extended Prep Available",
];

export default function WhyCost() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Why does it cost more?</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            13만원짜리 문제집, 무엇이 다른가요?
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.85] text-charcoal-600">
            Blossom Books의 가격은 단순히 PDF 페이지 수를 기준으로 책정되지 않습니다. 학생의 목표 시험과
            수준에 맞춘 문항 구성, 난이도 조절, 영역별 문제, 해설, 검수까지 포함한 전문 Prep 콘텐츠의 구성
            비용을 반영합니다.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* General workbook */}
          <div className="border border-navy-800/12 bg-ivory-100 p-7">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-charcoal-600/70">
              General Workbook
            </p>
            <p className="mt-1 font-display text-[19px] font-semibold text-charcoal-900">일반 문제집</p>
            <ul className="mt-5 space-y-3">
              {general.map((g) => (
                <li key={g} className="flex items-start gap-2.5 text-[13.5px] text-charcoal-600">
                  <Minus size={15} className="mt-0.5 shrink-0 text-charcoal-600/40" />
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* Blossom Books */}
          <div className="border border-brass-500/50 bg-navy-950 p-7 text-ivory-100 shadow-card">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-400">Blossom Books</p>
            <p className="mt-1 font-display text-[19px] font-semibold text-ivory-100">전문 Prep 콘텐츠</p>
            <ul className="mt-5 space-y-3">
              {blossom.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[13.5px] text-ivory-100">
                  <Check size={15} className="mt-0.5 shrink-0 text-brass-400" strokeWidth={2.4} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 border-l-2 border-brass-500 pl-5 text-[14px] leading-relaxed text-charcoal-900">
          필요하지 않은 분량까지 구매할 필요는 없습니다. 학생의 목표와 준비 기간에 따라 필요한 만큼
          선택하세요.
        </p>
      </div>
    </section>
  );
}
