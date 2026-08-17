"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { recommend, studyPlan, FitFactor, SubjectDomain, FOCUS_AREAS } from "@/lib/recommend";
import { pagesLabel, priceDisplay, explanationLanguage } from "@/lib/productMeta";
import { packageOption } from "@/data/pricing";
import RecommendationDetail, { FindCopy } from "@/components/find/RecommendationDetail";

const trackLabelEn: Record<string, string> = {
  "us-curriculum": "US Curriculum",
  ap: "AP",
  admissions: "Admissions & Entrance",
  "level-test": "Level-Test Prep",
  "certified-exam": "Certified & Professional",
};

const grades = ["Preschool / K", "Grade 1–2", "Grade 3–4", "Grade 5–6", "Grade 7–8", "Grade 9–12"];
const levels = ["Beginner", "On grade level", "Advanced", "Not sure"];
// domain — the subject side of the exam, so an English goal never returns a math workbook.
const exams: { v: string; track: string; domain: SubjectDomain }[] = [
  { v: "Academy / School Level Test", track: "level-test", domain: "english" },
  { v: "International School Admission", track: "admissions", domain: "mixed" },
  { v: "SR / STAR Reading", track: "level-test", domain: "english" },
  { v: "MAP Growth", track: "admissions", domain: "mixed" },
  { v: "CAT4", track: "admissions", domain: "mixed" },
  { v: "SSAT", track: "admissions", domain: "mixed" },
  { v: "ISEE", track: "admissions", domain: "mixed" },
  { v: "Digital SAT", track: "certified-exam", domain: "mixed" },
  { v: "AP", track: "ap", domain: "mixed" },
  { v: "IELTS / TOEFL", track: "certified-exam", domain: "english" },
  { v: "OET", track: "certified-exam", domain: "english" },
  { v: "US Curriculum (catch-up / ahead)", track: "us-curriculum", domain: "mixed" },
  { v: "Other / Not sure", track: "", domain: "mixed" },
];
// weeks — used to turn the volume into a weekly study plan. Undefined skips the plan.
const periods = [
  { v: "Within 2 weeks", vol: "40P", weeks: 2 },
  { v: "About a month", vol: "60P", weeks: 4 },
  { v: "2–3 months", vol: "100P", weeks: 10 },
  { v: "Not decided", vol: "60P", weeks: undefined },
];
const areas = [...FOCUS_AREAS];

// Wording for each factor — the scoring itself lives in @/lib/recommend.
function factorText(f: FitFactor): string {
  const track = trackLabelEn[f.value] ?? f.value;
  switch (f.code) {
    case "track":
      return f.status === "match"
        ? `Matches your ${track} goal`
        : `This is a ${track} workbook (different from your goal)`;
    case "grade":
      if (f.status === "match") return `${f.value} — matches the student's grade`;
      return `${f.value} — student is ${f.student}${f.status === "partial" ? " (one step apart)" : ""}`;
    case "focus":
      if (f.status === "match") return `Covers ${f.value}`;
      if (f.status === "partial") return `Covers ${f.value} · does not cover ${f.missing}`;
      return `Does not cover ${f.missing}`;
    case "reading":
      if (f.status === "match") return `${f.value} — matches the SR you entered`;
      return `${f.value} — differs from the SR you entered (${f.student})`;
    case "difficulty":
      if (f.status === "match") return `${f.value} — matches the level you asked for`;
      return `${f.value} — ${f.status === "partial" ? "one step" : "two or more steps"} from ${f.student}`;
  }
}

const findCopy: FindCopy = {
  fit: "Fit",
  fitDetailTitle: "Fit breakdown",
  insideTitle: "Inside the workbook",
  includedTitle: "Included",
  planTitle: "Study plan",
  altTitle: "Also worth comparing",
  altNote: "We'll compare these with you during the consultation before finalising.",
  viewBook: "View workbook · free sample",
  viewSample: "See the sample first",
  packageTitle: "Preparing longer? — the 200P long-term package",
  packageSummary: packageOption.summaryEn,
  packageCta: "Ask about the 200P package",
  packagePriceAsk: "Price on request (shared during consultation)",
  consultTitle: "A specialist prep teacher will walk you through it",
  consultBody:
    "The recommendation above is calculated automatically from what you entered. A specialist prep teacher will go through the workbook, volume and level in detail against the student's actual level and test date.",
  consultPhone: "Call",
  consultKakao: "KakaoTalk",
  consultEmail: "Email us",
  factorLabel: {
    track: "Exam goal",
    grade: "Grade",
    focus: "Focus",
    reading: "Reading",
    difficulty: "Level",
  },
  productTitle: (p) => p.title.split(" — ")[0],
  productMeta: (p) => [trackLabelEn[p.track], p.gradeRange, p.readingLevel].filter(Boolean).join(" · "),
  priceLabel: (p) => `${pagesLabel(p)} · ${priceDisplay(p)}`,
  included: (p) => {
    const out = [`${p.fileFormat} file`];
    if (p.includesAnswerKey) out.push("Answer key");
    if (p.includesDetailedExplanations) out.push(explanationLanguage(p).labelEn);
    if (p.includesAudio) out.push("Listening audio (MP3)");
    return out;
  },
  factorText,
  planText: (plan) =>
    `${plan.pages}P over ${plan.weeks} weeks — about ${plan.perWeek}p a week (${plan.perDay}p a day, 5 days a week).`,
};

export default function EnFindPage() {
  const [f, setF] = useState({ grade: "", level: "", sr: "", exam: "", period: "", areas: [] as string[] });
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const teamSent = useRef(false);

  const selectedPeriod = periods.find((p) => p.v === f.period);
  const recVolume = selectedPeriod?.vol ?? "60P";
  const selectedExam = exams.find((e) => e.v === f.exam);
  const result = done ? recommend(f, selectedExam?.track ?? "", selectedExam?.domain ?? "mixed") : null;
  const rec = result?.best ?? null;
  const plan = studyPlan(recVolume, selectedPeriod?.weeks);
  const volumeReason =
    recVolume === "40P" ? "A quick check of the key question types — good when the test is close."
    : recVolume === "100P" ? "Room for repetition and harder questions — good with more time."
    : "A balanced amount of practice across the main types.";

  function toggleArea(a: string) {
    setF((prev) => ({ ...prev, areas: prev.areas.includes(a) ? prev.areas.filter((x) => x !== a) : [...prev.areas, a] }));
  }

  function summary(): string {
    return [
      "A new workbook recommendation was generated (EN).",
      "",
      `- Grade: ${f.grade || "-"}`,
      `- Level: ${f.level || "-"}`,
      `- SR / Reading Level: ${f.sr || "unknown"}`,
      `- Exam: ${f.exam || "-"}`,
      `- Time left: ${f.period || "-"}`,
      `- Focus: ${f.areas.join(", ") || "-"}`,
      "",
      `- Recommended: ${rec ? rec.product.title.split(" — ")[0] : "custom proposal"}`,
      `- Volume: ${recVolume}`,
      `- Fit: ${rec ? rec.score + "%" : "-"}`,
      ...(plan ? [`- Study plan: ${plan.weeks} weeks · ${plan.perWeek}p/week · ~${plan.perDay}p/day`] : []),
      "",
      "- Fit breakdown:",
      ...(rec
        ? rec.factors.map(
            (x) => `  [${{ match: "O", partial: "△", miss: "X" }[x.status]}] ${findCopy.factorLabel[x.code]}: ${factorText(x)}`
          )
        : ["  · No close match — propose a custom workbook."]),
      ...(result?.alternatives.length
        ? ["", "- Alternatives:", ...result.alternatives.map((a) => `  · ${a.product.title.split(" — ")[0]} (${a.score}%)`)]
        : []),
      ...(rec?.suggestCustom ? ["", "* Low fit — a custom workbook may be needed."] : []),
      "",
      "- Follow-up: connect with a specialist prep teacher.",
      `- Check whether the 200P package (${packageOption.duration}) fits this student.`,
      ...(siteConfig.consultPhone ? [`- Consultation phone: ${siteConfig.consultPhone}`] : []),
      "",
      "Auto-generated. Please re-check the student's situation during consultation.",
    ].join("\n");
  }
  function kakaoMsg(): string {
    return [
      "Hello. I'd like to consult about a recommendation.",
      "",
      `Grade: ${f.grade || "-"}`,
      `Exam: ${f.exam || "-"}`,
      `Recommended volume: ${recVolume}`,
      `Focus: ${f.areas.join(", ") || "-"}`,
    ].join("\n");
  }
  async function sendTeam(suffix: string, extra?: Record<string, string>) {
    const key = siteConfig.web3formsAccessKey;
    if (!key) return;
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: key, from_name: "Blossom Recommender (EN)", subject: `[Blossom Rec] ${f.grade || "-"} · ${f.exam || "-"} · ${recVolume}${suffix}`, message: summary(), ...extra }),
      });
    } catch {}
  }

  function submit(e: React.FormEvent) { e.preventDefault(); setDone(true); }

  useEffect(() => {
    if (!done || teamSent.current) return;
    teamSent.current = true;
    void sendTeam("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function goKakao() {
    try { navigator.clipboard?.writeText(kakaoMsg()); setCopied(true); } catch {}
    void sendTeam(" · kakao click", { event: "kakao clicked" });
    window.open(siteConfig.kakaoChannelUrl, "_blank", "noopener,noreferrer");
  }

  const sel = "w-full border border-navy-800/20 bg-ivory-100 px-3 py-2.5 text-[13.5px] text-charcoal-900 outline-none focus:border-navy-800/50";

  return (
    <div lang="en" className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Find my workbook</p>
      <h1 className="mt-3 font-display text-[30px] font-semibold text-navy-950 sm:text-[36px]">Which workbook fits your child?</h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
        Tell us a few things and we&apos;ll suggest a fitting title and volume — the right option, not the biggest.
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
            <select required value={f.level} onChange={(e) => setF({ ...f, level: e.target.value })} className={sel}>
              <option value="">Select</option>
              {levels.map((l) => <option key={l} value={l}>{l}</option>)}
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
            <select required value={f.period} onChange={(e) => setF({ ...f, period: e.target.value })} className={sel}>
              <option value="">Select</option>
              {periods.map((p) => <option key={p.v} value={p.v}>{p.v}</option>)}
            </select>
          </label>
        </div>

        <div>
          <span className="mb-2 block text-[13px] font-medium text-navy-950">Focus areas <span className="font-normal text-charcoal-600">(multiple)</span></span>
          <div className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <button type="button" key={a} onClick={() => toggleArea(a)} className={`border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${f.areas.includes(a) ? "border-navy-900 bg-navy-900 text-ivory-100" : "border-navy-800/20 text-charcoal-600 hover:border-navy-800/40"}`}>{a}</button>
            ))}
          </div>
        </div>

        <button type="submit" className="inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800">
          <Sparkles size={16} /> See my recommendation
        </button>
      </form>

      {done && (
        <div className="mt-8 border border-brass-500/40 bg-brass-500/[0.05] p-6 lg:p-8">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">Recommended for you</p>

          {rec && result && (
            <RecommendationDetail
              rec={rec}
              alternatives={result.alternatives}
              volume={recVolume}
              plan={plan}
              volumeReason={volumeReason}
              hrefBase="/en/books"
              copy={findCopy}
              onKakao={goKakao}
            />
          )}

          <p className="mt-4 text-[13px] leading-relaxed text-charcoal-600">
            This is a guided suggestion. If information is missing, we can refine it during consultation. We recommend the right
            amount for the student, not the most expensive option.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href="/en/books" className="inline-flex items-center gap-2 border border-navy-800/25 px-5 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50">Browse all books <ArrowRight size={15} /></Link>
          </div>
          {copied && <p className="mt-3 text-[12px] text-brass-500">Summary copied — paste it into the KakaoTalk chat.</p>}
        </div>
      )}
    </div>
  );
}
