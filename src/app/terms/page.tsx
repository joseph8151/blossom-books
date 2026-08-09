export const metadata = { title: "이용약관" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Policy</p>
      <h1 className="mt-3 font-display text-[26px] font-semibold text-navy-950">이용약관</h1>
      <p className="mt-4 text-[12.5px] text-charcoal-600">
        본 약관은 초안이며, 실제 서비스 적용 전 법률 전문가의 검토를 받는 것을 권장합니다.
      </p>

      <div className="mt-10 space-y-8 text-[14px] leading-relaxed text-charcoal-900">
        <div>
          <h2 className="font-display text-[19px] font-semibold text-navy-950">제1조 (목적)</h2>
          <p className="mt-2 text-charcoal-600">
            본 약관은 블러섬북스(이하 &quot;회사&quot;)가 제공하는 교육 콘텐츠 및 관련 서비스의
            이용 조건과 절차에 관한 사항을 규정함을 목적으로 합니다.
          </p>
        </div>
        <div>
          <h2 className="font-display text-[19px] font-semibold text-navy-950">제2조 (서비스의 내용)</h2>
          <p className="mt-2 text-charcoal-600">
            회사는 기존 제작 교재 판매, 주문 제작 교재 제공, 모의고사 제작 등의 서비스를
            제공합니다. 교재는 PDF 형태의 디지털 콘텐츠로 제공됩니다.
          </p>
        </div>
        <div>
          <h2 className="font-display text-[19px] font-semibold text-navy-950">제3조 (구매 및 결제)</h2>
          <p className="mt-2 text-charcoal-600">
            국내 이용자는 계좌이체, 해외 이용자는 PayPal을 통해 결제할 수 있습니다. 결제 확인
            절차 및 교재 발송 방법은 각 결제 안내 페이지를 따릅니다.
          </p>
        </div>
        <div>
          <h2 className="font-display text-[19px] font-semibold text-navy-950">제4조 (이용 범위 및 제한)</h2>
          <p className="mt-2 text-charcoal-600">
            구매한 교재의 이용 범위는 개인용, 수업용, 기관용에 따라 달라질 수 있습니다. 무단
            복제, 재판매, 온라인 공유 및 배포는 제한됩니다. 자세한 내용은{" "}
            <a href="/copyright" className="text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4">
              교재 이용 및 저작권 안내
            </a>
            를 참고해주세요.
          </p>
        </div>
        <div>
          <h2 className="font-display text-[19px] font-semibold text-navy-950">제5조 (환불)</h2>
          <p className="mt-2 text-charcoal-600">
            디지털 콘텐츠의 특성상 파일 발송 이후에는 환불이 제한될 수 있으며, 구체적인 기준은
            상담을 통해 안내드립니다.
          </p>
        </div>
      </div>
    </div>
  );
}
