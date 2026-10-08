import LinkList from "./LinkList";

// 매니저가 카카오톡 상담 중 고객 유형에 맞는 견적 링크를 빠르게 복사해
// 붙여넣기 위한 내부 참고용 페이지입니다. 고객에게 보내는 페이지가 아니며
// 홈/헤더/푸터/사이트맵 어디에도 연결하지 않고, 검색 노출도 막아둡니다.
export const metadata = {
  title: "견적 링크 모음 (관리용)",
  description: "고객 유형별 견적 링크 관리용 내부 페이지입니다.",
  robots: { index: false, follow: false },
};

export default function QuoteLinksPage() {
  return (
    <div className="mx-auto max-w-[720px] px-5 py-14 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Internal — Manager Only</p>
      <h1 className="mt-3 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
        견적 링크 모음
      </h1>
      <p className="mt-3 text-[13.5px] leading-relaxed text-charcoal-600">
        고객 문의 유형에 맞는 링크를 복사해서 카카오톡에 붙여넣으세요. 고객에게 이 페이지 자체를 보내지
        않습니다.
      </p>

      <LinkList />
    </div>
  );
}
