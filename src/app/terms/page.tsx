export const metadata = { title: "이용약관" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
      <span className="eyebrow">Policy</span>
      <h1 className="mt-4 font-display text-[26px] font-extrabold text-navy-950">이용약관</h1>
      <p className="mt-4 text-[12.5px] text-charcoal-600">
        본 약관은 초안이며, 실제 서비스 적용 전 법률 전문가의 검토를 받는 것을 권장합니다.
      </p>

      <div className="mt-10 space-y-8 text-[14px] leading-relaxed text-charcoal-900">
        <div>
          <h2 className="font-display text-[19px] font-extrabold text-navy-950">제1조 (목적)</h2>
          <p className="mt-2 text-charcoal-600">
            본 약관은 JOHN EDUCATION GROUP(이하 &quot;회사&quot;)이 제공하는 교육 프랜차이즈 정보
            제공 및 가맹 상담 서비스의 이용 조건과 절차에 관한 사항을 규정함을 목적으로 합니다.
          </p>
        </div>
        <div>
          <h2 className="font-display text-[19px] font-extrabold text-navy-950">제2조 (서비스의 내용)</h2>
          <p className="mt-2 text-charcoal-600">
            회사는 웹사이트를 통해 JOHN KIDS, JOHN PREP, JOHN STUDY, JOHN 1:1, JOHN LANGUAGE,
            JOHN HYBRID 등 교육 사업 모델에 관한 정보를 제공하며, 이용자의 가맹 상담 신청을
            접수하여 상담을 진행합니다.
          </p>
        </div>
        <div>
          <h2 className="font-display text-[19px] font-extrabold text-navy-950">제3조 (가맹 상담 및 계약)</h2>
          <p className="mt-2 text-charcoal-600">
            웹사이트를 통한 상담 신청은 가맹 계약의 성립을 의미하지 않으며, 가맹비·초기비용·계약
            조건 등 구체적인 사항은 별도의 상담과 계약 절차를 통해 확정됩니다.
          </p>
        </div>
        <div>
          <h2 className="font-display text-[19px] font-extrabold text-navy-950">제4조 (콘텐츠 이용 제한)</h2>
          <p className="mt-2 text-charcoal-600">
            웹사이트에 게재된 브랜드 자산, 커리큘럼, 운영 시스템 관련 정보는 회사의 자산이며,
            사전 동의 없는 복제, 재배포, 영리적 이용을 제한합니다.
          </p>
        </div>
        <div>
          <h2 className="font-display text-[19px] font-extrabold text-navy-950">제5조 (문의)</h2>
          <p className="mt-2 text-charcoal-600">
            서비스 이용과 관련한 문의는 가맹 상담 페이지 또는 이메일을 통해 접수하실 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
