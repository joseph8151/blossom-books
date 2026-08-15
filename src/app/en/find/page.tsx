"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, Sparkles, ArrowRight, Copy, Check, Mail, FileSearch, ClipboardList, CalendarClock, Users, PlusCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { copyText } from "@/lib/consultation";
import WorkbookPreview from "@/components/find/WorkbookPreview";
import {
  analyze,
  grades,
  levels,
  exams,
  periods,
  focusAreas,
  extraOptions,
  emptyExtra,
  displayLevel,
  displayPeriod,
  trackLabelEn,
  gradeEn,
  type ExtraDiagnosis,
  type FindInput,
  type FitTone,
} from "@/lib/recommendation/en";
import type { LevelKey, PeriodKey, AbroadKey, SchoolKey, WeakKey } from "@/lib/recommendation/core";

const FIT_TONE: Record<FitTone, string> = {
  good: "border-brass-500/45 bg-brass-500/[0.07] text-brass-500",
  fair: "border-navy-800/20 bg-ivory-100 text-navy-900",
  check: "border-burgundy-700/30 bg-burgundy-700/[0.05] text-burgundy-700",
};

export default function EnFindPage() {
  const [f, setF] = useState({ grade: "", level: "" as LevelKey | "", sr: "", exam: "", period: "" as PeriodKey | "", areas: [] as string[] });
  const [extra, setExtra] = useState<ExtraDiagnosis>(emptyExtra);
  const [extraOpen, setExtraOpen] = useState(false);
  const [applied, setApplied] = useState<ExtraDiagnosis | undefined>(undefined);
  const [done, setDone] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const [emailOpen, setEmailOpen] = useState(false);
  const [parentEmail, setParentEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const teamSent = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const input: FindInput = {
    ...f,
    level: (f.level || "unknown") as LevelKey,
    period: (f.period || "undecided") as PeriodKey,
    track: exams.find((e) => e.v === f.exam)?.track ?? "",
    extra: applied,
  };
  const a = done ? analyze(input) : null;

  function toggleArea(area: string) {
    setF((prev) => ({ ...prev, areas: prev.areas.includes(area) ? prev.areas.filter((x) => x !== area) : [...prev.areas, area] }));
  }

  function recSummary(): string {
    if (!a) return "";
    return [
      "A new workbook recommendation was generated (EN).",
      "",
      "■ Basics",
      `- Grade: ${f.grade || "-"}`,
      `- Level: ${displayLevel(f.level) || "-"}`,
      `- SR / Reading Level: ${f.sr || "unknown"}`,
      `- Exam: ${f.exam || "-"}`,
      `- Time left: ${displayPeriod(f.period) || "-"}`,
      `- Focus: ${f.areas.join(", ") || "-"}`,
      "",
      ...(a.refined && applied
        ? [
            "■ Extra diagnosis",
            `- Recent result: ${applied.recentScore || "-"}`,
            `- Time abroad: ${applied.abroad || "-"}`,
            `- English kindergarten / international school: ${applied.school || "-"}`,
            `- Reading difficulty: ${applied.weak || "-"}`,
            "",
          ]
        : []),
      "■ Result",
      `- Workbook: ${a.product ? a.product.title.split(" — ")[0] : "custom proposal"}`,
      `- Volume: ${a.volume}`,
      `- Study plan: about ${a.plan.weeksMin}–${a.plan.weeksMax} weeks · ${a.plan.sessionsPerWeek}x per week · ${a.plan.pagesPerSessionMin}–${a.plan.pagesPerSessionMax}P per session`,
      `- Strategy: ${a.strategyHeadline}`,
      ...(a.plan.tight ? ["- ⚠ Tight against the remaining time. Needs adjusting in consultation."] : []),
      "",
      "■ Fit",
      ...a.fit.map((x) => `- ${x.label}: ${x.verdict} (${x.why})`),
      "",
      "■ Why this recommendation",
      ...a.rationale.map((r) => `- ${r}`),
      "",
      "■ Worth preparing alongside",
      ...(a.companions.length ? a.companions.map((c) => `- ${c.label}: ${c.reason}`) : ["- none"]),
      "",
      "Auto-generated. Please re-check the student's situation during consultation.",
    ].join("\n");
  }

  const kakaoMsg = !a
    ? ""
    : [
        "Hello — I'd like an expert review of my recommendation.",
        "",
        `Workbook: ${a.product ? a.product.title.split(" — ")[0] : "custom proposal"}`,
        `Volume: ${a.volume}`,
        `Study plan: about ${a.plan.weeksMin}–${a.plan.weeksMax} weeks · ${a.plan.sessionsPerWeek}x per week · ${a.plan.pagesPerSessionMin}–${a.plan.pagesPerSessionMax}P per session`,
        "",
        `Grade: ${f.grade || "-"}`,
        `Level: ${displayLevel(f.level) || "-"}`,
        `Exam: ${f.exam || "-"}`,
        `Time left: ${displayPeriod(f.period) || "-"}`,
        `Focus: ${f.areas.join(", ") || "-"}`,
        ...(a.companions.length ? ["", `Suggested alongside: ${a.companions.map((c) => c.area).join(", ")}`] : []),
        "",
        "Could you confirm whether this fits the student?",
      ].join("\n");

  async function sendTeam(suffix: string, extraFields?: Record<string, string>) {
    const key = siteConfig.web3formsAccessKey;
    if (!key || !a) return;
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          from_name: "Blossom Recommender (EN)",
          subject: `[Blossom Rec] ${f.grade || "-"} · ${f.exam || "-"} · ${a.volume}${suffix}`,
          message: recSummary(),
          ...extraFields,
        }),
      });
    } catch {}
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    teamSent.current = false;
    setCopyState("idle");
    setDone(true);
  }

  function applyExtra() {
    teamSent.current = false;
    setApplied({ ...extra });
    setExtraOpen(false);
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    if (!done || teamSent.current) return;
    teamSent.current = true;
    void sendTeam(applied ? " · refined" : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, applied]);

  function goKakao(label: string) {
    // Start the copy inside the click gesture and open the window before any await,
    // otherwise Safari blocks the popup.
    const copying = copyText(kakaoMsg);
    window.open(siteConfig.kakaoChatUrl, "_blank", "noopener,noreferrer");
    void sendTeam(" · kakao click", { event: label });
    void copying.then((ok) => setCopyState(ok ? "copied" : "manual"));
  }

  async function sendToParent() {
    if (!parentEmail.trim()) return;
    await sendTeam(" · email request", { parent_email: parentEmail.trim(), event: "email the result" });
    setEmailSent(true);
  }

  const sel = "w-full border border-navy-800/20 bg-ivory-100 px-3 py-2.5 text-[13.5px] text-charcoal-900 outline-none focus:border-navy-800/50";
  const sectionLabel = "font-label text-[10px] uppercase tracking-[0.14em] text-navy-800/55";

  return (
    <div lang="en" className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Find my workbook</p>
      <h1 className="mt-3 font-display text-[30px] font-semibold text-navy-950 sm:text-[36px]">Which workbook fits your child?</h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
        Tell us a few things and we&apos;ll analyse a fitting title and a study plan — the right option, not the biggest.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5 border border-navy-800/12 bg-ivory-100 p-6 shadow-card lg:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-navy-950">Grade</span>
            <select required value={f.grade} onChange={(e) => setF({ ...f, grade: e.target.value })} className={sel}>
              <option value="">Select</option>
              {grades.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-navy-950">Current level</span>
            <select required value={f.level} onChange={(e) => setF({ ...f, level: e.target.value as LevelKey })} className={sel}>
              <option value="">Select</option>
              {levels.map((l) => <option key={l.key} value={l.key}>{l.v}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-navy-950">SR / Reading Level <span className="font-normal text-charcoal-600">(if known)</span></span>
            <input value={f.sr} onChange={(e) => setF({ ...f, sr: e.target.value })} placeholder="e.g., SR 3.8" className={sel} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-navy-950">Exam</span>
            <select required value={f.exam} onChange={(e) => setF({ ...f, exam: e.target.value })} className={sel}>
              <option value="">Select</option>
              {exams.map((x) => <option key={x.v} value={x.v}>{x.v}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-navy-950">Time until the test</span>
            <select required value={f.period} onChange={(e) => setF({ ...f, period: e.target.value as PeriodKey })} className={sel}>
              <option value="">Select</option>
              {periods.map((p) => <option key={p.key} value={p.key}>{p.v}</option>)}
            </select>
          </label>
        </div>

        <div>
          <span className="mb-2 block text-[13px] font-medium text-navy-950">Focus areas <span className="font-normal text-charcoal-600">(multiple)</span></span>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <button
                type="button"
                key={area}
                onClick={() => toggleArea(area)}
                className={`border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                  f.areas.includes(area) ? "border-navy-900 bg-navy-900 text-ivory-100" : "border-navy-800/20 text-charcoal-600 hover:border-navy-800/40"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800">
          <Sparkles size={16} /> See my recommendation
        </button>
      </form>

      {/* ── Student analysis report ─────────────────────── */}
      {a && (
        <div ref={resultRef} className="mt-10 border border-navy-800/15 bg-ivory-100 shadow-card">
          <div className="border-b border-navy-800/12 bg-navy-950 px-6 py-6 lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <p className="font-label text-[10.5px] uppercase tracking-[0.2em] text-brass-500">Blossom Books</p>
              {a.refined && (
                <span className="border border-brass-500/40 px-2 py-0.5 font-label text-[9px] uppercase tracking-[0.1em] text-brass-500">
                  Refined
                </span>
              )}
            </div>
            <h2 className="mt-1.5 font-display text-[22px] font-semibold text-ivory-100 sm:text-[26px]">Student Analysis</h2>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ivory-100/15 pt-4 sm:grid-cols-4">
              {[
                ["Grade", f.grade],
                ["Exam", f.exam],
                ["Current level", displayLevel(f.level)],
                ["Time left", displayPeriod(f.period)],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="font-label text-[9px] uppercase tracking-[0.1em] text-ivory-100/50">{k}</p>
                  <p className="mt-0.5 text-[12.5px] font-medium leading-snug text-ivory-100">{v || "-"}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-7 px-6 py-7 lg:px-8">
            {/* 01 Recommended workbook */}
            {a.product && (
              <section>
                <p className={sectionLabel}>01 · Recommended workbook</p>
                <div className="mt-2.5 border border-navy-800/15 bg-ivory-200/60 p-5">
                  <p className="font-display text-[19px] font-semibold leading-snug text-navy-950">{a.product.title.split(" — ")[0]}</p>
                  <p className="mt-1 text-[12.5px] text-charcoal-600">
                    {trackLabelEn[a.product.track]} · {gradeEn(a.product)}
                    {a.product.readingLevel ? ` · ${a.product.readingLevel}` : ""} · {a.volume}
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {a.fit.map((x) => (
                      <div key={x.label} className={`border p-3 ${FIT_TONE[x.tone]}`}>
                        <p className="font-label text-[9px] uppercase tracking-[0.1em] opacity-70">{x.label}</p>
                        <p className="mt-1 text-[14px] font-semibold">{x.verdict}</p>
                        <p className="mt-1.5 text-[11.5px] leading-snug text-charcoal-600">{x.why}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/en/books/${a.product.id}`}
                      className="group inline-flex items-center gap-1.5 bg-navy-900 px-5 py-2.5 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
                    >
                      Workbook details
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      href={`/en/books/${a.product.id}#sample`}
                      className="inline-flex items-center gap-1.5 border border-navy-800/25 px-5 py-2.5 text-[13px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                    >
                      <FileSearch size={14} /> Free sample
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* 02 Why this recommendation */}
            <section>
              <p className={sectionLabel}>02 · Why this recommendation</p>
              <div className="mt-2.5 border-l-2 border-brass-500/50 pl-4">
                {a.rationale.map((r) => (
                  <p key={r} className="mt-1.5 text-[13.5px] leading-relaxed text-charcoal-900 first:mt-0">{r}</p>
                ))}
              </div>
              {a.reasons.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {a.reasons.map((r) => (
                    <li key={r} className="flex items-center gap-1.5 text-[12px] text-charcoal-600">
                      <Check size={12} className="shrink-0 text-brass-500" strokeWidth={2.4} />
                      {r}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Extra diagnosis */}
            <section className="border border-navy-800/12 bg-ivory-200/50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[13.5px] font-medium text-navy-950">Want a more precise recommendation?</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">
                    Four more answers and we&apos;ll recalculate the difficulty and priority areas. {a.refined && "Currently reflected in this result."}
                  </p>
                </div>
                <button
                  onClick={() => setExtraOpen((v) => !v)}
                  className="inline-flex shrink-0 items-center gap-1.5 border border-navy-800/25 px-4 py-2.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                >
                  <PlusCircle size={14} /> {extraOpen ? "Close" : a.refined ? "Edit answers" : "Add details"}
                </button>
              </div>

              {extraOpen && (
                <div className="mt-4 grid gap-4 border-t border-navy-800/10 pt-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] font-medium text-navy-950">Recent English test result</span>
                    <input
                      value={extra.recentScore}
                      onChange={(e) => setExtra({ ...extra, recentScore: e.target.value })}
                      placeholder="e.g., MAP 210 / academy level 3"
                      className={sel}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] font-medium text-navy-950">Time living abroad</span>
                    <select value={extra.abroad} onChange={(e) => setExtra({ ...extra, abroad: e.target.value as AbroadKey })} className={sel}>
                      <option value="">Select</option>
                      {extraOptions.abroad.map((o) => <option key={o.key} value={o.key}>{o.v}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] font-medium text-navy-950">English kindergarten / international school</span>
                    <select value={extra.school} onChange={(e) => setExtra({ ...extra, school: e.target.value as SchoolKey })} className={sel}>
                      <option value="">Select</option>
                      {extraOptions.school.map((o) => <option key={o.key} value={o.key}>{o.v}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] font-medium text-navy-950">Hardest part of reading</span>
                    <select value={extra.weak} onChange={(e) => setExtra({ ...extra, weak: e.target.value as WeakKey })} className={sel}>
                      <option value="">Select</option>
                      {extraOptions.weak.map((o) => <option key={o.key} value={o.key}>{o.v}</option>)}
                    </select>
                  </label>
                  <div className="sm:col-span-2">
                    <button
                      onClick={applyExtra}
                      className="inline-flex items-center gap-2 bg-navy-900 px-5 py-2.5 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
                    >
                      <Sparkles size={14} /> Recalculate
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* 03 Study plan */}
            <section>
              <p className={sectionLabel}>03 · Estimated study plan</p>
              <div className="mt-2.5 border border-navy-800/12">
                <div className="grid grid-cols-3 divide-x divide-navy-800/10 border-b border-navy-800/10">
                  {[
                    ["Study period", `${a.plan.weeksMin}–${a.plan.weeksMax} weeks`],
                    ["Sessions", `${a.plan.sessionsPerWeek}x / week`],
                    ["Per session", `${a.plan.pagesPerSessionMin}–${a.plan.pagesPerSessionMax}P`],
                  ].map(([k, v]) => (
                    <div key={k} className="px-4 py-4 text-center">
                      <p className="font-label text-[9px] uppercase tracking-[0.08em] text-navy-800/50">{k}</p>
                      <p className="mt-1.5 font-display text-[17px] font-semibold text-navy-950">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2.5 px-4 py-3.5">
                  <CalendarClock size={15} className="mt-0.5 shrink-0 text-brass-500" />
                  <div>
                    <p className="text-[12.5px] font-medium text-navy-950">{a.volume} · {a.strategyHeadline}</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">{a.strategyDetail}</p>
                  </div>
                </div>
                {a.plan.tight && (
                  <p className="border-t border-burgundy-700/20 bg-burgundy-700/[0.04] px-4 py-3 text-[12.5px] leading-relaxed text-burgundy-700">
                    Finishing this volume before the test date would be tight. It needs either more sessions per week or a smaller
                    volume — we can re-fit it to the student&apos;s schedule in a consultation.
                  </p>
                )}
              </div>
            </section>

            {/* 04 Workbook preview */}
            {a.product && (
              <section>
                <p className={sectionLabel}>04 · Workbook preview</p>
                <div className="mt-2.5">
                  <WorkbookPreview product={a.product} locale="en" />
                </div>
              </section>
            )}

            {/* 05 Who it suits */}
            {a.goodFor.length > 0 && (
              <section>
                <p className={sectionLabel}>05 · Who this workbook suits</p>
                <ul className="mt-2.5 space-y-2">
                  {a.goodFor.map((g) => (
                    <li key={g} className="flex items-start gap-2 text-[13px] leading-relaxed text-charcoal-900">
                      <Users size={13} className="mt-1 shrink-0 text-brass-500" />
                      {g}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 06 Worth preparing alongside */}
            {a.companions.length > 0 && (
              <section>
                <p className={sectionLabel}>06 · Worth preparing alongside</p>
                <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                  {a.companions.map((c) => (
                    <div key={c.area} className="border border-navy-800/12 bg-ivory-200/50 p-4">
                      <p className="text-[13px] font-medium text-navy-950">{c.label}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">{c.reason}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => goKakao("companion check clicked")}
                  className="mt-3 inline-flex items-center gap-1.5 border border-navy-800/25 px-5 py-2.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                >
                  <MessageCircle size={13} /> Check which extras you actually need
                </button>
              </section>
            )}

            {a.suggestCustom && (
              <section className="border border-burgundy-700/25 bg-burgundy-700/[0.04] p-4">
                <p className="text-[13px] font-medium text-burgundy-700">This combination may be hard to match with an existing title.</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">
                  We can build a workbook around the student&apos;s goal and level. A consultation lets us fit it more precisely.
                </p>
              </section>
            )}

            {/* 07 Expert review CTA */}
            <section className="border border-brass-500/40 bg-brass-500/[0.06] p-6 text-center">
              <ClipboardList size={20} className="mx-auto text-brass-500" />
              <p className="mt-3 font-display text-[18px] font-semibold text-navy-950">
                Get a free expert review of this recommendation
              </p>
              <p className="mx-auto mt-2 max-w-lg text-[13px] leading-relaxed text-charcoal-600">
                We&apos;ll double-check the difficulty and the workbook build against what the student actually needs.
              </p>
              <button
                onClick={() => goKakao("expert review clicked")}
                className="mt-4 inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
              >
                <MessageCircle size={16} /> Free review on KakaoTalk
              </button>
              <p className="mt-2.5 text-[11.5px] leading-relaxed text-charcoal-600/80">
                After the consultation we confirm the student&apos;s level and timeline, then advise on the final workbook and volume.
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-brass-500/25 pt-4">
                <Link
                  href={a.product ? `/en/books/${a.product.id}#sample` : "/en/books"}
                  className="inline-flex items-center gap-1.5 border border-navy-800/25 bg-ivory-100 px-4 py-2.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                >
                  <FileSearch size={14} /> View free sample
                </Link>
                <button
                  onClick={() => setEmailOpen((v) => !v)}
                  className="inline-flex items-center gap-1.5 border border-navy-800/25 bg-ivory-100 px-4 py-2.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                >
                  <Mail size={14} /> Email me the result
                </button>
              </div>
            </section>

            {/* After the consult click: show the message either way, so a failed copy is not a dead end. */}
            {copyState !== "idle" && (
              <section className="border border-navy-800/12 bg-ivory-200/50 p-4">
                <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-navy-950">
                  {copyState === "copied" ? (
                    <><Check size={13} className="text-brass-500" strokeWidth={2.4} /> Summary copied — paste it into the KakaoTalk chat.</>
                  ) : (
                    <><Copy size={13} className="text-brass-500" /> Copy the text below and paste it into the KakaoTalk chat.</>
                  )}
                </p>
                <textarea
                  readOnly
                  rows={8}
                  value={kakaoMsg}
                  onFocus={(e) => e.currentTarget.select()}
                  className="mt-2.5 w-full resize-none border border-navy-800/15 bg-ivory-100 p-3 text-[12.5px] leading-relaxed text-charcoal-900 outline-none focus:border-navy-800/40"
                />
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => void copyText(kakaoMsg).then((ok) => setCopyState(ok ? "copied" : "manual"))}
                    className="inline-flex items-center gap-1.5 border border-navy-800/25 px-4 py-2 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                  >
                    <Copy size={13} /> Copy again
                  </button>
                  <a
                    href={siteConfig.kakaoChatUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 border border-navy-800/25 px-4 py-2 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                  >
                    <MessageCircle size={13} /> Reopen the chat
                  </a>
                </div>
              </section>
            )}

            {emailOpen && (
              <section className="border border-navy-800/12 bg-ivory-200/50 p-5">
                {emailSent ? (
                  <p className="flex items-center gap-2 text-[13px] text-navy-900">
                    <Check size={15} className="text-brass-500" strokeWidth={2.4} />
                    Received. We&apos;ll send the analysis to the address you entered.
                  </p>
                ) : (
                  <>
                    <p className="text-[13px] font-medium text-navy-950">Would you like the analysis by email too? <span className="font-normal text-charcoal-600">(optional)</span></p>
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                      <input
                        type="email"
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        placeholder="Email address"
                        className="flex-1 border border-navy-800/20 bg-ivory-100 px-3 py-2.5 text-[13.5px] text-charcoal-900 outline-none focus:border-navy-800/50"
                      />
                      <button
                        onClick={sendToParent}
                        disabled={!parentEmail.trim()}
                        className="inline-flex items-center justify-center gap-1.5 bg-navy-900 px-5 py-2.5 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800 disabled:opacity-40"
                      >
                        Send the result
                      </button>
                    </div>
                    <p className="mt-2 text-[11.5px] text-charcoal-600/80">
                      Your details are used only to follow up on this recommendation.
                    </p>
                  </>
                )}
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
