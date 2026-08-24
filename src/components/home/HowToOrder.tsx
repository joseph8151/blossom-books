import { ListChecks, MessageCircle, FileDown } from "lucide-react";

const steps = [
  { n: "01", icon: ListChecks, en: "교재 선택", ko: "시험, 학년, 레벨에 맞는 교재를 선택합니다." },
  { n: "02", icon: MessageCircle, en: "카카오톡 주문", ko: "상품명을 확인한 후 카카오톡으로 주문 요청을 보내주세요." },
  { n: "03", icon: FileDown, en: "결제 후 PDF 수령", ko: "결제 방법 안내와 확인을 거쳐 PDF 교재를 전달해드립니다." },
];

export default function HowToOrder() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">How to order</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            주문은 이렇게 진행됩니다
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
            홈페이지에서 교재와 가격을 확인하신 뒤, 공식 카카오톡으로 주문 요청을 보내주세요. 결제 방법을
            안내해 드리고, 결제 확인 후 교재(PDF)를 보내드립니다.
          </p>
        </div>

        {/* 3단계 */}
        <div className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-3">
          {steps.map(({ n, icon: Icon, en, ko }) => (
            <div key={n} className="border-t border-navy-800/20 pt-5">
              <div className="flex items-center justify-between">
                <span className="font-label text-[12px] tracking-[0.1em] text-brass-500">{n}</span>
                <Icon size={18} className="text-navy-800/50" strokeWidth={1.7} />
              </div>
              <p className="mt-3 font-display text-[18px] font-semibold text-navy-950">{en}</p>
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
