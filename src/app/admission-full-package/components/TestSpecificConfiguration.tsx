import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { baseAreas, testConfigurations, configExamples, studentConfigExamples } from "../data";

// "시험을 추가하는 서비스"가 아니라 "지원 학교 평가 방식에 맞춰 영역 자체를
// 교체·재구성하는 서비스"라는 메시지를 전달하는 섹션. 모든 학생에게 6영역 +
// MAP + CAT4 + PTE + PTM을 전부 제공하는 것처럼 보이지 않도록, Before→After
// 예시와 "대체되는 영역"을 항상 함께 보여줍니다.
export default function TestSpecificConfiguration() {
  return (
    <section className="border-b border-navy-800/10 bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="font-label text-[11px] uppercase tracking-[0.18em] text-[#5f6f52]">
            Test-Specific Configuration
          </span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            지원 학교의 시험에 맞춰 패키지 구성이 달라집니다
          </h2>
          <p className="mt-5 text-[13.5px] leading-[1.9] text-charcoal-600">
            모든 학생이 동일한 6개 영역을 준비하지 않습니다. 지원 학교가 MAP, CAT4, PTE, PTM 또는 자체
            평가를 요구하는 경우, 기본 Reading·Vocabulary·Math 등의 영역을 해당 시험 방식에 맞게
            교체하거나 확장합니다. 시험을 기본 패키지 위에 계속 추가하는 것이 아니라, 지원 학교에 맞춰
            패키지 자체가 달라지는 구조입니다.
          </p>
          <p className="mx-auto mt-6 max-w-[460px] font-display text-[18px] font-semibold italic leading-snug text-navy-950">
            Add more tests가 아니라, <span className="text-[#5f6f52]">Replace &amp; Reconfigure.</span>
          </p>
        </div>

        {/* Before → After 대표 예시 */}
        <div className="mt-12 space-y-4">
          {configExamples.map((ex) => (
            <div key={ex.label} className="border border-navy-800/12 bg-white p-6 sm:p-7">
              <div className="grid items-start gap-4 lg:grid-cols-[1fr_auto_1.2fr]">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.12em] text-charcoal-600/60">기본 구성</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {baseAreas.map((a) => (
                      <span key={a} className="border border-navy-800/12 bg-ivory-200/50 px-2 py-1 text-[11.5px] text-charcoal-600 line-through decoration-navy-800/30">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight size={18} className="mt-6 hidden shrink-0 text-[#5f6f52]/60 lg:block" />
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.12em] text-[#5f6f52]">{ex.label}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {ex.after.map((a) => (
                      <span key={a} className="border border-[#5f6f52]/30 bg-[#eef1e8]/60 px-2 py-1 text-[11.5px] font-medium text-navy-900">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {ex.note && <p className="mt-4 text-[12px] leading-relaxed text-charcoal-600/80">{ex.note}</p>}
            </div>
          ))}
        </div>

        {/* 시험별 구성 카드 — 시험명 / 대체되는 영역 / 구성을 빠르게 이해하도록 */}
        <div className="mt-14 border-t border-navy-800/10 pt-12">
          <div className="mx-auto mt-8 grid max-w-[1040px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testConfigurations.map((t) => (
              <div key={t.test} className="border border-[#5f6f52]/25 bg-[#eef1e8]/40 p-5">
                <p className="font-display text-[15px] font-semibold text-navy-950">{t.test}</p>
                <p className="mt-1.5 font-label text-[10px] uppercase tracking-[0.08em] text-[#5f6f52]">
                  {t.replaces}
                </p>
                <p className="mt-2.5 text-[11.5px] leading-relaxed text-charcoal-600/80">{t.note}</p>
                {t.items.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-[12.5px] leading-relaxed text-charcoal-700">
                    {t.items.map((item) => (
                      <li key={item} className="flex gap-1.5">
                        <span className="text-[#5f6f52]">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-[12.5px] text-charcoal-600">
            지원 학교가 어떤 시험을 요구하는지 모르시나요?{" "}
            <Link
              href="#schools"
              className="font-medium text-navy-900 underline decoration-[#5f6f52] decoration-2 underline-offset-2"
            >
              School Finder에서 확인하기
            </Link>
          </p>
        </div>

        {/* 같은 학년, 다른 구성 — 학생별 비교 */}
        <div className="mt-14 border-t border-navy-800/10 pt-12">
          <p className="text-center font-display text-[18px] font-semibold text-navy-950">
            같은 Grade 5 지원이라도 준비 구성은 달라질 수 있습니다.
          </p>
          <div className="mx-auto mt-8 grid max-w-[1040px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {studentConfigExamples.map((s) => (
              <div key={s.label} className="border border-navy-800/12 bg-white p-5">
                <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">{s.label}</p>
                <p className="mt-1.5 text-[12px] text-charcoal-600">{s.requirement}</p>
                <p className="mt-3 border-t border-navy-800/10 pt-3 text-[12.5px] font-medium leading-relaxed text-navy-900">
                  {s.config}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
