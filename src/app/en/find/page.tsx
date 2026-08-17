"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, Sparkles, ArrowRight, Check, FileSearch } from "lucide-react";
import { siteConfig } from "@/data/site";
import { recommendProduct, RecReason, SubjectDomain, FOCUS_AREAS } from "@/lib/recommend";

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
const periods = [
  { v: "Within 2 weeks", vol: "40P" },
  { v: "About a month", vol: "60P" },
  { v: "2–3 months", vol: "100P" },
  { v: "Not decided", vol: "60P" },
];
const areas = [...FOCUS_AREAS];

// Wording for each reason — the scoring itself lives in @/lib/recommend.
function reasonText(r: RecReason): string {
  switch (r.code) {
    case "track":
      return `Matches your ${trackLabelEn[r.value] ?? r.value} goal`;
    case "grade":
      return `Fits the ${r.value} range`;
    case "focus":
      return `Covers your focus (${r.value})`;
    case "reading":
      return `Matches reading level ${r.value}`;
    case "difficulty":
      return `${r.value} level`;
  }
}

export default function EnFindPage() {
  const [f, setF] = useState({ grade: "", level: "", sr: "", exam: "", period: "", areas: [] as string[] });
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const teamSent = useRef(false);

  const recVolume = periods.find((p) => p.v === f.period)?.vol ?? "60P";
  const selectedExam = exams.find((e) => e.v === f.exam);
  const rec = done ? recommendProduct(f, selectedExam?.track ?? "", selectedExam?.domain ?? "mixed") : null;
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
      "",
      "- Why:",
      ...(rec ? rec.reasons.map((r) => `  · ${reasonText(r)}`) : ["  · No close match — propose a custom workbook."]),
      ...(rec?.suggestCustom ? ["", "* Low fit — a custom workbook may be needed."] : []),
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

          {rec && (
            <div className="mt-3 border border-navy-800/15 bg-ivory-100 p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-[18px] font-semibold leading-snug text-navy-950">{rec.product.title.split(" — ")[0]}</p>
                  <p className="mt-1 text-[12.5px] text-charcoal-600">{trackLabelEn[rec.product.track]} · {rec.product.gradeRange} · {recVolume}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-[24px] font-semibold leading-none text-brass-500">{rec.score}%</p>
                  <p className="font-label text-[8.5px] uppercase tracking-[0.1em] text-navy-800/55">Fit</p>
                </div>
              </div>
              <div className="mt-4 border-t border-navy-800/10 pt-3">
                <p className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-800/55">Why this one?</p>
                <ul className="mt-2 space-y-1.5">
                  {rec.reasons.map((r) => (
                    <li key={r.code} className="flex items-start gap-2 text-[12.5px] leading-snug text-charcoal-900">
                      <Check size={13} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} /> {reasonText(r)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/en/books/${rec.product.id}#sample`} className="inline-flex items-center gap-1.5 border border-navy-800/25 px-5 py-2.5 text-[13px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"><FileSearch size={14} /> View free sample</Link>
                <Link href={`/en/books/${rec.product.id}`} className="inline-flex items-center gap-1.5 bg-navy-900 px-5 py-2.5 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800">Details <ArrowRight size={14} /></Link>
              </div>
            </div>
          )}

          <div className="mt-3 flex items-center gap-3 border border-navy-800/12 bg-ivory-100 p-4">
            <span className="font-display text-[20px] font-semibold text-navy-950">{recVolume}</span>
            <span className="text-[12.5px] leading-snug text-charcoal-600">{volumeReason}</span>
          </div>

          <p className="mt-4 text-[13px] leading-relaxed text-charcoal-600">
            This is a guided suggestion. If information is missing, we can refine it during consultation. We recommend the right
            amount for the student, not the most expensive option.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button onClick={goKakao} className="inline-flex items-center gap-2 bg-navy-900 px-5 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"><MessageCircle size={15} /> Get help on KakaoTalk</button>
            <Link href="/en/books" className="inline-flex items-center gap-2 border border-navy-800/25 px-5 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50">Browse all books <ArrowRight size={15} /></Link>
          </div>
          {copied && <p className="mt-3 text-[12px] text-brass-500">Summary copied — paste it into the KakaoTalk chat.</p>}
        </div>
      )}
    </div>
  );
}
