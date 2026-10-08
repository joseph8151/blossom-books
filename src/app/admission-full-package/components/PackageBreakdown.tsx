import Link from "next/link";
import { BookOpen, Languages, Calculator, PenLine, MessageCircle, ClipboardCheck } from "lucide-react";
import { packageCategories, testAdaptations } from "../data";

const categoryIcons: Record<string, typeof BookOpen> = {
  Reading: BookOpen,
  Vocabulary: Languages,
  Math: Calculator,
  Writing: PenLine,
  Interview: MessageCircle,
  "Mock Test": ClipboardCheck,
};

export default function PackageBreakdown() {
  return (
    <section className="border-b border-navy-800/10 bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8">
        <div className="mx-auto max-w-[640px] text-center">
          <span className="font-label text-[11px] uppercase tracking-[0.18em] text-[#5f6f52]">Structure</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            Admission Full Package 구성
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packageCategories.map((c) => {
            const Icon = categoryIcons[c.title] ?? BookOpen;
            return (
            <div key={c.title} className="border border-navy-800/10 bg-white p-6 transition-shadow hover:shadow-card">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef1e8] text-[#5f6f52]">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <span className="font-display text-[26px] font-semibold leading-none text-[#5f6f52]/25">
                  {c.n}
                </span>
              </div>
              <p className="mt-4 font-display text-[18px] font-semibold text-navy-950">{c.title}</p>
              <ul className="mt-4 space-y-1.5 text-[12.5px] leading-relaxed text-charcoal-600">
                {c.items.map((item) => (
                  <li key={item} className="flex gap-1.5">
                    <span className="text-[#5f6f52]">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            );
          })}
        </div>

        {/* 시험 유형별 추가 구성 — 학교가 요구하는 시험(MAP/CAT4/자체 시험)에 따라
            기본 6영역 위에 추가되는 구성을 보여줍니다. School Finder와 연결됩니다. */}
        <div className="mt-14 border-t border-navy-800/10 pt-12">
          <div className="mx-auto max-w-[640px] text-center">
            <span className="font-label text-[11px] uppercase tracking-[0.18em] text-[#5f6f52]">
              Test-Specific Add-ons
            </span>
            <h3 className="mt-3 font-display text-[20px] font-semibold text-navy-950">
              지원 학교가 요구하는 시험 유형에 따라 추가됩니다
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">
              학교마다 MAP, CAT4, 또는 자체 시험(School-specific Assessment) 중 요구하는 유형이
              다릅니다. 기본 6영역 위에 아래 구성이 더해집니다.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-[1040px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testAdaptations.map((t) => (
              <div key={t.test} className="border border-[#5f6f52]/25 bg-[#eef1e8]/40 p-5">
                <p className="font-display text-[15px] font-semibold text-navy-950">{t.test}</p>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-charcoal-600/80">{t.note}</p>
                <ul className="mt-3 space-y-1.5 text-[12.5px] leading-relaxed text-charcoal-700">
                  {t.items.map((item) => (
                    <li key={item} className="flex gap-1.5">
                      <span className="text-[#5f6f52]">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-[12.5px] text-charcoal-600">
            지원 학교가 어떤 시험을 요구하는지 모르시나요?{" "}
            <Link
              href="#schools"
              className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2"
            >
              School Finder에서 확인하기
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
