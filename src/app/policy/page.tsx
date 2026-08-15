import Link from "next/link";
import { AlertTriangle, Check, X, MessageCircle, FileText, Wrench, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "PDF 디지털 교재 구매·환불·수정 정책",
  description:
    "Blossom Books 디지털 PDF 교재의 구매, 환불, 오류 수정 및 추가 제작 정책을 명확하게 안내합니다.",
};

const correctionYes = [
  "정답 오류",
  "문항상의 명백한 오류",
  "문제 이해에 영향을 주는 오탈자",
  "페이지 누락",
  "파일 오류",
  "해설 내용의 명백한 오류",
  "편집 과정의 중복 또는 누락",
];

const correctionNo = [
  "학생에게 난이도가 어렵거나 쉬운 경우",
  "구매 후 다른 학년·다른 시험으로 변경 요청",
  "개인적인 문제 스타일 선호",
  "문제 유형 신규 추가 요청",
  "새로운 Reading Passage / 추가 문제 제작",
  "페이지 수 증가, 영역(Writing·Vocabulary·Grammar) 추가",
  "기존 구성과 다른 형태의 재제작",
];

const confirmChecklist = [
  "Digital PDF 상품임을 확인했습니다.",
  "선택한 시험 및 교재를 확인했습니다.",
  "선택한 페이지 수와 가격을 확인했습니다.",
  "PDF 파일 발송 완료 후 환불이 불가함을 확인했습니다.",
  "Blossom Books 측 오류 확인 시 교정·수정은 최대 2회까지 가능함을 확인했습니다.",
  "새로운 문제 추가·난이도 변경·구성 변경은 오류 수정에 포함되지 않음을 확인했습니다.",
];

export default function PolicyPage() {
  return (
    <div>
      {/* 히어로 */}
      <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">
            Digital Product &amp; Refund Policy
          </p>
          <h1 className="mt-3 font-display text-[30px] font-semibold leading-tight text-navy-950 sm:text-[38px]">
            PDF 디지털 교재 구매·환불·수정 안내
          </h1>
          <p className="mt-5 max-w-2xl text-[14.5px] leading-[1.9] text-charcoal-600">
            Blossom Books의 교재는 Digital PDF 형식으로 제공되는 디지털 콘텐츠입니다. 구매 전 조건을 정확히
            확인하실 수 있도록 환불 및 수정 가능 범위를 명확하게 안내합니다.
          </p>
        </div>
      </section>

      {/* 환불 정책 */}
      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="flex items-center gap-2.5">
            <FileText size={20} className="text-brass-500" />
            <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">환불 정책</h2>
          </div>
          <div className="mt-5 space-y-3 text-[14px] leading-[1.9] text-charcoal-600">
            <p>
              교재 파일이 발송되기 전에는 주문 상태와 제작 진행 여부에 따라 취소 또는 변경 가능 여부를
              상담원에게 확인하실 수 있습니다.
            </p>
            <p>
              단, PDF 교재가 이메일·카카오톡·다운로드 링크 또는 기타 방법으로 고객에게 발송된 이후에는
              디지털 콘텐츠의 특성상 환불이 불가합니다.
            </p>
          </div>

          <div className="mt-6 flex items-start gap-3 border border-burgundy-700/30 bg-burgundy-700/[0.05] p-5">
            <AlertTriangle size={20} className="mt-0.5 shrink-0 text-burgundy-700" />
            <div>
              <p className="font-label text-[11px] uppercase tracking-[0.14em] text-burgundy-700">
                Important · PDF files are non-refundable after delivery
              </p>
              <p className="mt-1.5 text-[14px] font-medium text-navy-950">
                PDF 교재는 파일 발송 완료 이후 환불이 불가합니다.
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal-600">
                따라서 구매 전 교재명·학생 학년·시험 유형·페이지 수·구성·무료 Sample을 충분히 확인한 후
                구매해 주시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 수정 정책 */}
      <section className="border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="flex items-center gap-2.5">
            <Wrench size={20} className="text-brass-500" />
            <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">교재 오류 수정 안내</h2>
          </div>
          <p className="mt-5 text-[14px] leading-[1.9] text-charcoal-600">
            Blossom Books는 제작 과정에서 검수 절차를 진행하지만, 오탈자·정답 오류·문항 오류 또는 파일상의
            문제가 발견될 수 있습니다. Blossom Books 측의 명확한 오류가 확인되는 경우, 해당 오류에 대한
            교정 및 수정은 <span className="font-semibold text-navy-950">구매 건당 최대 2회까지</span> 지원됩니다.
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">
            수정은 확인된 오류를 교정하기 위한 것이며, 새로운 문제 제작이나 전체 교재 재구성은 포함되지
            않습니다.
          </p>

          {/* CORRECTION vs CUSTOM */}
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="border border-navy-800/12 bg-ivory-200/40 p-6">
              <p className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">Correction</p>
              <p className="mt-1 font-display text-[17px] font-semibold text-navy-950">오류 수정 (최대 2회)</p>
              <p className="mt-2 text-[12.5px] text-charcoal-600">Blossom Books 측의 명확한 오류를 수정합니다.</p>
              <ul className="mt-4 space-y-2">
                {correctionYes.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[13px] text-charcoal-900">
                    <Check size={14} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-navy-800/12 bg-ivory-200/40 p-6">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-burgundy-700" />
                <p className="font-label text-[11px] uppercase tracking-[0.14em] text-burgundy-700">Custom Revision</p>
              </div>
              <p className="mt-1 font-display text-[17px] font-semibold text-navy-950">추가 제작 (별도 문의)</p>
              <p className="mt-2 text-[12.5px] text-charcoal-600">
                고객 요청에 따라 내용·구성을 변경합니다. 별도 상담 및 추가 비용이 발생할 수 있습니다.
              </p>
              <ul className="mt-4 space-y-2">
                {correctionNo.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[13px] text-charcoal-600">
                    <X size={14} className="mt-0.5 shrink-0 text-charcoal-600/50" strokeWidth={2.4} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 수정 요청 방법 */}
          <div className="mt-8 border-l-2 border-brass-500 pl-5">
            <p className="font-display text-[16px] font-semibold text-navy-950">오류를 발견하셨나요?</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-charcoal-600">
              구매하신 상품명, 페이지 번호, 해당 문항, 오류라고 판단되는 부분을 (가능하면 스크린샷과 함께)
              공식 카카오톡으로 보내주세요. 확인 후 Blossom Books 측 오류로 판단되는 경우 수정된 파일을
              안내해 드립니다.
            </p>
            <a
              href={siteConfig.kakaoChatUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
            >
              <MessageCircle size={15} />
              오류 수정 문의
            </a>
          </div>
        </div>
      </section>

      {/* 구매 전 확인사항 */}
      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">구매 전 확인사항</h2>
          <p className="mt-3 text-[13.5px] text-charcoal-600">
            공식 카카오톡 결제 안내 전, 상담원이 아래 내용을 함께 확인해 드립니다.
          </p>
          <ul className="mt-6 space-y-2.5">
            {confirmChecklist.map((c) => (
              <li key={c} className="flex items-start gap-3 border border-navy-800/12 bg-ivory-100 p-4 text-[13.5px] text-charcoal-900">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border border-brass-500 text-brass-500">
                  <Check size={11} strokeWidth={3} />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 정책 원칙 요약 */}
      <section className="bg-navy-950 py-16 text-ivory-100 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <h2 className="font-display text-[22px] font-semibold sm:text-[26px]">정책 요약</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["PDF 파일 발송 전", "상품과 구성 최종 확인 · 취소/변경 확인 가능"],
              ["PDF 파일 발송 후", "환불 불가"],
              ["Blossom Books 측 명확한 오류", "확인 후 최대 2회 교정·수정"],
              ["고객 취향·수준 차이", "오류 수정 대상 아님"],
              ["새로운 문제·페이지 추가", "추가 제작 / 별도 비용"],
              ["다른 상품·시험으로 변경", "PDF 발송 후 변경 불가"],
            ].map(([k, v]) => (
              <div key={k} className="border border-ivory-100/12 bg-ivory-100/[0.03] p-4">
                <p className="font-label text-[10.5px] uppercase tracking-[0.1em] text-brass-400">{k}</p>
                <p className="mt-1.5 text-[13.5px] text-ivory-100">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[12px] leading-relaxed text-ivory-200/60">
            본 정책은 관련 소비자보호 법규 및 Blossom Books의 실제 운영 정책에 따라 조정될 수 있습니다.
            자세한 사항은{" "}
            <Link href="/terms" className="underline">이용약관</Link> 및 공식 카카오톡 상담을 통해 안내해
            드립니다.
          </p>
        </div>
      </section>
    </div>
  );
}
