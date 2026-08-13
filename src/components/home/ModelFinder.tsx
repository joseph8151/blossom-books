"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { businessModels, type BusinessModelId } from "@/data/john";
import { cn } from "@/lib/utils";

type Target = "kids" | "academic" | "adult" | "multiple";
type Space = "yes" | "no" | "planning";
type Style = "owner" | "team" | "academy";

function resolveModel(target: Target, style: Style): BusinessModelId {
  if (target === "multiple") return "hybrid";
  if (target === "kids") return style === "owner" ? "study" : "kids";
  if (target === "academic") return "prep";
  // adult
  return style === "owner" ? "private" : "language";
}

const q1Options: { value: Target; label: string }[] = [
  { value: "kids", label: "Kids" },
  { value: "academic", label: "Academic" },
  { value: "adult", label: "Adult" },
  { value: "multiple", label: "Multiple Programs" },
];

const q2Options: { value: Space; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "planning", label: "Planning" },
];

const q3Options: { value: Style; label: string }[] = [
  { value: "owner", label: "Owner Operated" },
  { value: "team", label: "Small Team" },
  { value: "academy", label: "Academy" },
];

export default function ModelFinder() {
  const [step, setStep] = useState(0);
  const [target, setTarget] = useState<Target | null>(null);
  const [style, setStyle] = useState<Style | null>(null);

  const result = target && style ? businessModels.find((m) => m.id === resolveModel(target, style)) : null;

  function reset() {
    setStep(0);
    setTarget(null);
    setStyle(null);
  }

  return (
    <section className="border-b border-navy-900/12 bg-paleblue-100 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center">
          <span className="eyebrow eyebrow--center">Model Finder</span>
          <h2 className="mt-4 font-display text-[26px] font-extrabold text-navy-950 sm:text-[30px]">
            Which JOHN Model Fits You?
          </h2>
        </div>

        <div className="mt-12 rounded-3xl border border-navy-900/12 bg-white p-8 shadow-card sm:p-10">
          {!result && (
            <>
              <div className="mb-8 flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={cn("h-1 flex-1 rounded-full", i <= step ? "bg-coral-500" : "bg-navy-900/10")}
                  />
                ))}
              </div>

              {step === 0 && (
                <div>
                  <p className="text-[15px] font-semibold text-navy-950">어떤 형태의 교육사업을 원하시나요?</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {q1Options.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => {
                          setTarget(o.value);
                          setStep(1);
                        }}
                        className="rounded-xl border border-navy-900/15 px-4 py-3.5 text-left text-[13.5px] font-medium text-navy-900 transition-colors hover:border-coral-500 hover:bg-coral-500/5"
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <p className="text-[15px] font-semibold text-navy-950">현재 공간이 있나요?</p>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {q2Options.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => setStep(2)}
                        className="rounded-xl border border-navy-900/15 px-4 py-3.5 text-center text-[13.5px] font-medium text-navy-900 transition-colors hover:border-coral-500 hover:bg-coral-500/5"
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(0)}
                    className="mt-6 text-[12.5px] font-medium text-charcoal-600 underline underline-offset-4"
                  >
                    이전으로
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="text-[15px] font-semibold text-navy-950">어떤 운영 형태를 선호하시나요?</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {q3Options.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => setStyle(o.value)}
                        className="rounded-xl border border-navy-900/15 px-4 py-3.5 text-center text-[13.5px] font-medium text-navy-900 transition-colors hover:border-coral-500 hover:bg-coral-500/5"
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="mt-6 text-[12.5px] font-medium text-charcoal-600 underline underline-offset-4"
                  >
                    이전으로
                  </button>
                </div>
              )}
            </>
          )}

          {result && (
            <div className="text-center">
              <span className="font-label text-[11px] uppercase tracking-[0.16em] text-coral-500">Your Match</span>
              <p className="mt-4 text-[14.5px] text-charcoal-600">
                Based on your answers, <span className="font-semibold text-navy-950">{result.code}</span> may be a
                good fit.
              </p>
              <h3 className="mt-3 font-display text-[26px] font-extrabold text-navy-950">{result.code}</h3>
              <p className="mt-1 text-[13.5px] text-charcoal-600">{result.tagline}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-7 py-3.5 text-[14px] font-semibold text-navy-950 shadow-coral transition-all hover:-translate-y-0.5 hover:bg-coral-400"
                >
                  상담 받아보기
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href={`/business-models#${result.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-navy-900/25 px-7 py-3.5 text-[14px] font-medium text-navy-900 transition-colors hover:border-navy-900/50"
                >
                  {result.code} 자세히 보기
                </Link>
              </div>
              <button
                onClick={reset}
                className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-charcoal-600 underline underline-offset-4"
              >
                <RotateCcw size={12} /> 다시 해보기
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
