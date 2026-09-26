import { COMBO_PRICES, formatKRW } from "../data";

const cards = [
  {
    badge: "Dual Prep",
    title: "Special 2종",
    price: COMBO_PRICES.specialTwo,
    lead: "시험 2개를 한 번에 준비",
    items: ["시험별 200P + 해설", "학생별 학습 순서", "시험별 Mock Test 2회", "오답 기록지", "카카오톡 시작 상담"],
    example: "예: ISEE + MAP · SAT English + SAT Math · Level Test + MAP",
  },
  {
    badge: "Sibling Prep",
    title: "형제 Special",
    price: COMBO_PRICES.sibling,
    lead: "학생 두 명을 각각 구성",
    items: ["학생별 목차 구성", "학생별 Mock Test", "학생별 시작 상담"],
    example: "같은 시험을 준비하더라도 학생별 수준과 약한 영역을 기준으로 학습 순서를 각각 구성합니다.",
  },
  {
    badge: "Multi Subject",
    title: "200P × 3과목",
    price: COMBO_PRICES.threeSubject,
    lead: "200P Workbook + Explanation Guide × 3",
    items: [],
    example: "예: English + Korean + Mathematics, 또는 Level Test English + MAP English + MAP Math",
    footnote: "상담은 포함하지 않습니다.",
  },
];

export default function ComboPackages() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-200/30 py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
            한 번에 준비해야 할 것이 많다면
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
            아래 구성은 시험이 두 개이거나, 여러 과목을 동시에 준비하거나, 형제·자매가 함께 준비하는 경우에
            적합합니다. 단일 시험·단일 과목이라면 위의 기본 구성을 선택하는 것이 더 합리적입니다.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="flex flex-col border border-ivory-300 bg-white p-6">
              <span className="w-fit font-label text-[10px] uppercase tracking-[0.12em] text-brass-500">
                {c.badge}
              </span>
              <p className="mt-2 font-display text-[18px] font-semibold text-navy-950">{c.title}</p>
              <p className="mt-2 font-display text-[24px] font-semibold text-navy-950">{formatKRW(c.price)}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-charcoal-900">{c.lead}</p>

              {c.items.length > 0 && (
                <ul className="mt-4 space-y-1 text-[12.5px] leading-relaxed text-charcoal-600">
                  {c.items.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              )}

              <p className="mt-4 text-[11.5px] leading-relaxed text-charcoal-600/70">{c.example}</p>
              {c.footnote && (
                <p className="mt-2 text-[11.5px] leading-relaxed text-charcoal-600/60">{c.footnote}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
