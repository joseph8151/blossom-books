import { Check, Minus } from "lucide-react";

// 일반 문제집 vs Blossom Books 비교 (경쟁사 비방 없이, 구성 방식의 차이만)
const rows: [string, string][] = [
  ["학년 중심 선택", "학년 + 현재 수준 + 목표 고려"],
  ["정해진 구성", "40P / 60P / 100P 선택"],
  ["일반적인 문제 유형", "목표 시험·Skill에 맞춘 구성"],
  ["정답 위주", "정답 + 상세 해설"],
  ["동일 난이도 중심", "Foundation → Challenge Level"],
  ["구매 후 내용 확인", "구매 전 Sample 확인"],
  ["대량 판매형", "목적형 Prep Workbook"],
  ["추가 문의 어려움", "공식 카카오톡 Purchase Support"],
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

        {/* 비교표 */}
        <div className="mt-12 overflow-hidden border border-navy-800/12 shadow-card">
          <div className="grid grid-cols-2">
            <div className="bg-ivory-100 px-5 py-4">
              <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-charcoal-600/70">
                General Workbook
              </p>
              <p className="mt-0.5 font-display text-[16px] font-semibold text-charcoal-900">일반적인 문제집</p>
            </div>
            <div className="bg-navy-950 px-5 py-4">
              <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-400">Blossom Books</p>
              <p className="mt-0.5 font-display text-[16px] font-semibold text-ivory-100">전문 Prep Workbook</p>
            </div>
          </div>
          {rows.map(([g, b], i) => (
            <div key={i} className="grid grid-cols-2 border-t border-navy-800/10">
              <div className="flex items-start gap-2 bg-ivory-100 px-5 py-3.5 text-[13px] text-charcoal-600">
                <Minus size={14} className="mt-0.5 shrink-0 text-charcoal-600/40" />
                {g}
              </div>
              <div className="flex items-start gap-2 bg-navy-950/[0.97] px-5 py-3.5 text-[13px] text-ivory-100">
                <Check size={14} className="mt-0.5 shrink-0 text-brass-400" strokeWidth={2.4} />
                {b}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="font-display text-[20px] font-semibold text-navy-950 sm:text-[24px]">
            Same Grade. Different Level. <span className="text-brass-500">Different Preparation.</span>
          </p>
          <p className="mt-2 text-[13.5px] text-charcoal-600">
            같은 학년이라고 같은 교재가 필요한 것은 아닙니다.
          </p>
        </div>

        <p className="mt-8 border-l-2 border-brass-500 pl-5 text-[14px] leading-relaxed text-charcoal-900">
          필요하지 않은 분량까지 구매할 필요는 없습니다. 학생의 목표와 준비 기간에 따라 필요한 만큼
          선택하세요.
        </p>
      </div>
    </section>
  );
}
