export const metadata = { title: "교재 이용 및 저작권 안내" };

export default function CopyrightPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Policy</p>
      <h1 className="mt-3 font-display text-[32px] font-semibold text-navy-950">교재 이용 및 저작권 안내</h1>

      <div className="mt-10 space-y-6 text-[14.5px] leading-relaxed text-charcoal-600">
        <p>
          블러섬북스에서 제작한 모든 교재(문제집, 정답·상세 해설집, 모의고사 포함)의
          저작권은 블러섬북스에 있습니다.
        </p>
        <p>
          구매한 교재의 이용 범위는 개인용, 수업용, 기관용에 따라 달라질 수 있습니다.
          무단 복제, 재판매, 온라인 공유 및 배포는 제한됩니다.
        </p>
        <p>
          학원이나 기관에서 다수의 학생이 사용할 경우 상담을 통해 이용 범위를
          확인해주시기 바랍니다.
        </p>
        <p>
          주문 제작 교재의 경우, 별도 계약을 통해 이용 범위와 저작권 관련 사항을
          협의할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
