import { Search, SlidersHorizontal, FileSearch, FileDown } from "lucide-react";

const steps = [
  { n: "01", icon: Search, en: "시험을 고릅니다", ko: "CAT4, MAP, ISEE 등 준비할 시험을 선택합니다." },
  { n: "02", icon: SlidersHorizontal, en: "학년·목표 레벨을 고릅니다", ko: "같은 시험도 학년과 목표 레벨에 따라 구성이 달라집니다." },
  { n: "03", icon: FileSearch, en: "샘플로 문항 퀄리티를 봅니다", ko: "구매 전 실제 문항과 해설 방식을 직접 확인하세요." },
  { n: "04", icon: FileDown, en: "결제 확인 후 PDF를 받습니다", ko: "카카오톡 주문 요청 → 결제 방법 안내 → 결제 확인 → PDF 발송." },
];

export default function HowToOrder() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">How to order</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            고르고, 확인하고, 받습니다
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
            시험과 학년에 맞는 교재를 고르고, 샘플로 퀄리티를 확인한 뒤 카카오톡으로 주문하시면 결제 확인
            후 PDF를 보내드립니다.
          </p>
        </div>

        {/* 4단계 */}
        <div className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ n, icon: Icon, en, ko }) => (
            <div key={n} className="border-t border-navy-800/20 pt-5">
              <div className="flex items-center justify-between">
                <span className="font-label text-[12px] tracking-[0.1em] text-brass-500">{n}</span>
                <Icon size={18} className="text-navy-800/50" strokeWidth={1.7} />
              </div>
              <p className="mt-3 font-display text-[16.5px] font-semibold leading-snug text-navy-950">{en}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal-600">{ko}</p>
            </div>
          ))}
        </div>

        {/* Why We Confirm Before Purchase */}
        <div className="mt-14 grid gap-6 border-t border-navy-800/12 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h3 className="font-display text-[20px] font-semibold text-navy-950 sm:text-[23px]">
              주문 전 한 번 더 확인해드립니다
            </h3>
            <p className="mt-3 text-[14px] leading-[1.85] text-charcoal-600">
              Blossom Books는 모든 학생에게 동일한 교재를 권하지 않습니다. 같은 학년이라도 현재 영어 수준,
              준비하는 시험, 시험일까지 남은 기간, 필요한 영역이 다를 수 있습니다. 그래서 결제 전 상담원이
              선택하신 교재가 학생에게 적합한지 간단히 확인해 드립니다.
            </p>
          </div>
          <div className="border border-brass-500/40 bg-brass-500/[0.05] p-6">
            <p className="font-display text-[18px] font-semibold text-navy-950">
              No complicated consultation.
              <br />
              <span className="text-brass-500">Just a quick fit check before you order.</span>
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">
              복잡한 상담이 아닙니다. 선택하신 교재와 구성이 학생에게 적합한지 확인하는 간단한 주문 전
              체크입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
