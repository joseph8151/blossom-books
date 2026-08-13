import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businessModels } from "@/data/john";

export const metadata = {
  title: "Business Models",
  description:
    "JOHN KIDS, JOHN PREP, JOHN STUDY, JOHN 1:1, JOHN LANGUAGE, JOHN HYBRID — 6가지 JOHN EDUCATION GROUP 사업 모델을 비교하고 나에게 맞는 모델을 찾아보세요.",
};

const comparisonRows: { label: string; key: keyof (typeof businessModels)[number] }[] = [
  { label: "Recommended For", key: "recommendedFor" },
  { label: "Student Type", key: "studentType" },
  { label: "Business Format", key: "businessFormat" },
  { label: "Teaching Format", key: "teachingFormat" },
  { label: "Space Type", key: "spaceType" },
  { label: "Expansion Potential", key: "expansionPotential" },
  { label: "Operation Style", key: "operationStyle" },
];

export default function BusinessModelsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-navy-900/12 bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <span className="eyebrow eyebrow--center">Business Models</span>
          <h1 className="mt-4 text-balance font-display text-[32px] font-extrabold leading-[1.2] text-navy-950 sm:text-[42px]">
            One Brand. <span className="text-coral-500">Different Ways to Build.</span>
          </h1>
          <p className="mt-5 text-[14.5px] leading-relaxed text-charcoal-600">
            공간 규모, 교육 대상, 운영 방식에 따라 나에게 맞는 JOHN 사업 모델을 선택할 수
            있습니다. 아래에서 6가지 모델을 자세히 확인하고, 비교표로 한눈에 비교해보세요.
          </p>
        </div>
      </section>

      {/* 6개 모델 상세 */}
      {businessModels.map((model, i) => (
        <section
          key={model.id}
          id={model.id}
          className={`scroll-mt-20 border-b border-navy-900/12 py-16 lg:py-20 ${
            i % 2 === 0 ? "bg-white" : "bg-ivory-100"
          }`}
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
            <div>
              <span className="num-badge h-9 w-9 text-[12px]">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-4 font-display text-[28px] font-extrabold text-navy-950 sm:text-[32px]">
                {model.code}
              </h2>
              <p className="mt-1 text-[14px] font-medium text-charcoal-600">{model.name}</p>
              <p className="mt-4 font-display text-[16px] font-semibold text-navy-800">{model.tagline}</p>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-charcoal-600">{model.description}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/consultation"
                  className="group inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-[13.5px] font-semibold text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
                >
                  {model.code} 상담 신청
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#comparison"
                  className="inline-flex items-center gap-2 rounded-full border border-navy-900/25 px-6 py-3.5 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-900/50"
                >
                  비교표에서 보기
                </a>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-ivory-200/60 p-6">
                <p className="font-label text-[10.5px] uppercase tracking-[0.12em] text-navy-900/60">Programs</p>
                <ul className="mt-3 space-y-2">
                  {model.programs.map((p) => (
                    <li key={p} className="text-[13px] leading-relaxed text-charcoal-600">
                      · {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-ivory-200/60 p-6">
                <p className="font-label text-[10.5px] uppercase tracking-[0.12em] text-navy-900/60">Snapshot</p>
                <dl className="mt-3 space-y-3 text-[13px]">
                  <div>
                    <dt className="text-charcoal-600/60">추천 대상</dt>
                    <dd className="font-medium text-navy-950">{model.recommendedFor}</dd>
                  </div>
                  <div>
                    <dt className="text-charcoal-600/60">운영 형태</dt>
                    <dd className="font-medium text-navy-950">{model.operationStyle}</dd>
                  </div>
                  <div>
                    <dt className="text-charcoal-600/60">확장 가능성</dt>
                    <dd className="font-medium text-navy-950">{model.expansionPotential}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* 비교표 */}
      <section id="comparison" className="scroll-mt-20 border-b border-navy-900/12 bg-navy-950 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <span className="eyebrow eyebrow--center eyebrow--light">Comparison</span>
            <h2 className="mt-4 font-display text-[28px] font-extrabold text-ivory-100 sm:text-[34px]">
              Business Model Comparison
            </h2>
          </div>

          <div className="mt-12 overflow-x-auto rounded-3xl bg-ivory-100/[0.03] p-2">
            <table className="w-full min-w-[880px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-[180px] border-b border-ivory-100/15 py-4 pr-4 font-label text-[11px] uppercase tracking-[0.08em] text-ivory-200/50">
                    &nbsp;
                  </th>
                  {businessModels.map((m) => (
                    <th
                      key={m.id}
                      className="border-b border-ivory-100/15 px-4 py-4 font-display text-[15px] font-extrabold text-ivory-100"
                    >
                      {m.code}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-b border-ivory-100/8">
                    <th className="py-4 pr-4 font-label text-[11.5px] font-semibold uppercase tracking-[0.04em] text-coral-400">
                      {row.label}
                    </th>
                    {businessModels.map((m) => (
                      <td key={m.id} className="px-4 py-4 text-[13px] leading-relaxed text-ivory-200/85">
                        {String(m[row.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ivory-100 py-20 lg:py-24">
        <div className="mx-auto max-w-2xl px-5 text-center lg:px-8">
          <h2 className="font-display text-[24px] font-extrabold text-navy-950 sm:text-[28px]">
            아직 어떤 모델이 맞는지 고민되시나요?
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-charcoal-600">
            현재 상황과 희망하는 규모를 알려주시면 적합한 JOHN 모델을 상담해드립니다.
          </p>
          <Link
            href="/consultation"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-coral-500 px-8 py-4 text-[15px] font-semibold text-navy-950 shadow-coral transition-all hover:-translate-y-0.5 hover:bg-coral-400"
          >
            가맹 상담 신청
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
