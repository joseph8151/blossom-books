import Link from "next/link";
import { Check, FileSearch, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

// 영어 레벨테스트 상세페이지용 — 가격을 소프트하게 노출하고 구성 가치를 함께 보여주는 섹션.
// 정확한 분량별 가격은 구매 박스에, 여기서는 범위·구성 중심으로 차분하게 안내합니다.
const includes = [
  ["문제집", "실전 유형 예상문제"],
  ["정답 및 한글 상세해설", "왜 정답인지·왜 오답인지 한국어로 설명"],
  ["리스닝 스크립트", "듣기 문항 대본 (선생님용)"],
  ["스터디 가이드", "학습 순서·활용법 안내"],
];

export default function SmartPricing() {
  return (
    <section className="mt-10 border border-navy-800/12 bg-ivory-200/40 p-6 lg:p-8">
      <span className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">Price &amp; contents</span>
      <h2 className="mt-2 font-display text-[20px] font-semibold text-navy-950 sm:text-[23px]">
        구성을 먼저 보시고, 가격을 판단하세요.
      </h2>

      {/* 가격 — 소프트 범위 */}
      <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-[26px] font-semibold text-navy-950">13만원대부터</span>
        <span className="text-[14px] text-charcoal-600">분량(40·60·100P)에 따라 13만원대 ~ 19만원대</span>
      </div>
      <p className="mt-1.5 text-[12.5px] text-charcoal-600">
        정확한 분량별 가격은 위 구매 영역에서 확인하실 수 있습니다.
      </p>

      {/* 포함 구성 */}
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {includes.map(([k, v]) => (
          <div key={k} className="flex items-start gap-2.5 border border-navy-800/10 bg-ivory-100 p-3">
            <Check size={15} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} />
            <span>
              <span className="text-[13.5px] font-medium text-navy-950">{k}</span>
              <span className="mt-0.5 block text-[12px] text-charcoal-600">{v}</span>
            </span>
          </div>
        ))}
      </div>

      {/* 학부모 포인트 */}
      <p className="mt-5 text-[13.5px] leading-relaxed text-charcoal-600">
        한글 해설이 있어 집에서 채점하고 설명해 주기 편합니다. 스터디 가이드로 학습 순서를 잡을 수 있어,
        아이 혼자 풀거나 부모님과 함께 학습할 때 모두 활용하기 좋습니다.
      </p>

      {/* 단체 안내 */}
      <p className="mt-3 border-l-2 border-brass-500 pl-4 text-[13px] leading-relaxed text-charcoal-600">
        학원·단체 구매는 별도로 안내해 드립니다. 필요하신 수량과 구성을 알려주시면 확인 후 연락드립니다.
      </p>

      {/* CTA */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href="#sample"
          className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50"
        >
          <FileSearch size={15} /> 무료 샘플 보기
        </a>
        <a
          href={siteConfig.kakaoChatUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-all hover:-translate-y-0.5 hover:bg-navy-800"
        >
          <MessageCircle size={15} /> 구성·가격 문의
        </a>
      </div>

      {/* 신뢰 문구 */}
      <p className="mt-4 text-[11.5px] leading-relaxed text-charcoal-600/80">
        블러섬북스 자체 제작 · 한글 상세해설 포함 · 결제 확인 후 PDF 발송 · 발송 후 환불 불가
      </p>
    </section>
  );
}
