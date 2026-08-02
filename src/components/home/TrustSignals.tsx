import { SearchCheck, FileCheck2, BookOpen, ShieldCheck, FileDown, FileText } from "lucide-react";

const signals = [
  {
    icon: SearchCheck,
    title: "시험·교육과정 분석 기반",
    body: "모든 교재는 실제 출제 범위와 평가 기준을 분석하는 데서 출발합니다. 문제 수를 늘리는 방식으로 만들지 않습니다.",
  },
  {
    icon: FileCheck2,
    title: "전 문항 정답·상세 해설",
    body: "정답만 제시하지 않고 풀이 과정과 자주 틀리는 지점까지 설명하는 해설집을 함께 제공합니다.",
  },
  {
    icon: BookOpen,
    title: "구매 전 무료 샘플 확인",
    body: "실제 지면 구성과 문제 수준을 미리 확인하고 결정하실 수 있습니다. 표지만 보고 구매하지 않아도 됩니다.",
  },
  {
    icon: ShieldCheck,
    title: "안전한 결제 수단",
    body: "국내는 계좌이체, 해외는 PayPal 안전 결제를 지원합니다. 입금·결제 확인 절차를 명확히 안내드립니다.",
  },
  {
    icon: FileDown,
    title: "결제 후 PDF 즉시 발송",
    body: "결제 확인 후 교재 PDF를 이메일로 바로 보내드립니다. 배송을 기다릴 필요가 없습니다.",
  },
  {
    icon: FileText,
    title: "저작권·이용 범위 명확 안내",
    body: "개인용·수업용·기관용에 따른 이용 범위를 투명하게 안내하여 안심하고 사용하실 수 있습니다.",
  },
];

export default function TrustSignals() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Why trust us</span>
          <h2 className="mt-4 font-display text-[32px] font-semibold leading-tight text-navy-950 sm:text-[38px]">
            후기가 아니라,
            <br />
            <span className="italic text-burgundy-700">기준</span>으로 증명합니다.
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
            블러섬북스는 아직 화려한 후기 대신, 교재를 만드는 원칙과 구매 전후의
            약속으로 신뢰를 드립니다. 아래 여섯 가지는 모든 교재에 예외 없이 적용됩니다.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {signals.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="lift group flex flex-col border border-navy-800/12 bg-ivory-100 p-7 shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center border border-brass-500/30 bg-ivory-200/60 text-navy-800 transition-colors group-hover:border-brass-500/60">
                <Icon size={22} strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 font-display text-[19px] font-semibold text-navy-950">{title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-charcoal-600">{body}</p>
            </div>
          ))}
        </div>

        {/* 품질 약속 배너 */}
        <div className="relative mt-8 overflow-hidden border border-navy-800/15 bg-navy-950 p-9 text-ivory-100 shadow-card lg:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(173,138,78,0.22),transparent_55%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="eyebrow eyebrow--light">Our promise</span>
              <p className="mt-4 max-w-2xl font-display text-[24px] font-semibold leading-snug sm:text-[28px]">
                정답을 알려주는 데서 멈추지 않고,
                <span className="text-brass-400"> 틀린 이유를 이해하는 순간까지</span> 책임집니다.
              </p>
              <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-ivory-200/75">
                구매 후 교재 구성이나 해설에 대해 궁금한 점이 있으면 언제든 문의해 주세요.
                교재를 만든 사람이 직접 답변드립니다.
              </p>
            </div>
            <div className="shrink-0 border-l-2 border-brass-500 pl-5 lg:pl-6">
              <p className="font-display text-[15px] italic text-ivory-100/90">Blossom Books</p>
              <p className="mt-1 font-label text-[10px] uppercase tracking-[0.18em] text-brass-400">
                Editorial Studio
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
