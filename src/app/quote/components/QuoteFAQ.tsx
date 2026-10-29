const faqs = [
  {
    q: "40P, 60P, 100P의 난이도가 다른가요?",
    a: "기본적으로 페이지 수는 학습량의 차이이며, 실제 난이도는 학생 학년·시험·현재 수준에 맞춰 구성됩니다.",
  },
  {
    q: "가장 많이 선택하는 분량은 무엇인가요?",
    a: "준비 기간과 시험에 따라 다르지만, 60P 또는 100P를 기본 구성으로 검토할 수 있습니다. 정확한 구성은 학생 상황에 따라 달라질 수 있습니다.",
  },
  {
    q: "구매 전에 내용을 볼 수 있나요?",
    a: "가능한 교재는 구매 전 Sample을 확인할 수 있습니다.",
  },
  {
    q: "200P와 Special Package의 차이는 무엇인가요?",
    a: "문항 수를 늘리는 상품이 아니라, 동일한 200P 문항을 기반으로 학생별 학습 순서, Mock Test, 오답 기록지, 시작 상담을 추가한 구성입니다.",
  },
  {
    q: "원하는 시험이 목록에 없습니다.",
    a: "표에 없는 시험과 특수 구성은 맞춤 제작 상담으로 문의할 수 있습니다.",
  },
  {
    q: "해외에서도 구매할 수 있나요?",
    a: "네, PDF 교재이므로 해외에서도 구매하실 수 있습니다. 해외 결제는 PayPal(USD 기준)로 안내해 드립니다.",
  },
];

export default function QuoteFAQ() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-100 py-16 sm:py-24">
      <div className="mx-auto max-w-[680px] px-5 sm:px-8">
        <h2 className="text-center font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          자주 묻는 질문
        </h2>

        <div className="mt-10 divide-y divide-ivory-300 border-t border-ivory-300">
          {faqs.map((f) => (
            <div key={f.q} className="py-5">
              <p className="text-[14px] font-medium text-navy-950">Q. {f.q}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-charcoal-600">A. {f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
