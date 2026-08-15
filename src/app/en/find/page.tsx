"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, Sparkles, ArrowRight, Check, Copy, FileSearch } from "lucide-react";
import { siteConfig } from "@/data/site";
import { makeInquiryCode, copyText } from "@/lib/consultation";
import { products } from "@/data/products";
import { isFourSkill } from "@/lib/productMeta";
import { blossomLevel } from "@/lib/utils";
import { Product } from "@/lib/types";

const trackLabelEn: Record<string, string> = {
  "us-curriculum": "US Curriculum",
  ap: "AP",
  admissions: "Admissions & Entrance",
  "level-test": "Level-Test Prep",
  "certified-exam": "Certified & Professional",
};

const grades = ["Preschool / K", "Grade 1–2", "Grade 3–4", "Grade 5–6", "Grade 7–8", "Grade 9–12"];
const levels = ["Beginner", "On grade level", "Advanced", "Not sure"];
const exams = [
  { v: "Academy / School Level Test", track: "level-test" },
  { v: "International School Admission", track: "admissions" },
  { v: "SR / STAR Reading", track: "level-test" },
  { v: "MAP Growth", track: "admissions" },
  { v: "CAT4", track: "admissions" },
  { v: "SSAT", track: "admissions" },
  { v: "ISEE", track: "admissions" },
  { v: "Digital SAT", track: "certified-exam" },
  { v: "AP", track: "ap" },
  { v: "IELTS / TOEFL", track: "certified-exam" },
  { v: "OET", track: "certified-exam" },
  { v: "US Curriculum (catch-up / ahead)", track: "us-curriculum" },
  { v: "Other / Not sure", track: "" },
];
const periods = [
  { v: "Within 2 weeks", vol: "40P" },
  { v: "About a month", vol: "60P" },
  { v: "2–3 months", vol: "100P" },
  { v: "Not decided", vol: "60P" },
];
const areas = ["Reading", "Vocabulary", "Grammar", "Writing", "Math"];

function gradeRange(str: string): [number, number] {
  const n = (str.match(/\d+/g) || []).map(Number);
  if (/K|Preschool/i.test(str) && !n.length) return [0, 0];
  if (!n.length) return [0, 12];
  return [Math.min(...n), Math.max(...n)];
}
function overlaps(a: [number, number], b: [number, number]) {
  return Math.max(a[0], b[0]) <= Math.min(a[1], b[1]);
}
function recommend(f: { grade: string; level: string; areas: string[] }, track: string) {
  const pool = products.filter((p) => p.materialType === "existing" && p.sampleAvailable);
  const want = f.level.includes("Advanced") ? 4 : f.level.includes("Beginner") ? 2 : 3;
  const g = gradeRange(f.grade);
  let best: Product | null = null;
  let bestScore = -1;
  let reasons: string[] = [];
  for (const p of pool) {
    let s = 50;
    const r: string[] = [];
    if (track && p.track === track) { s += 20; r.push(`Matches your ${trackLabelEn[p.track]} goal`); }
    if (overlaps(g, gradeRange(p.gradeRange))) { s += 15; r.push(`Fits the ${p.gradeRange} range`); }
    if (f.areas.length) {
      const u = p.units.join(" ");
      if (isFourSkill(p) || f.areas.some((a) => u.includes(a))) { s += 10; r.push(`Covers your focus (${f.areas.join(" · ")})`); }
    }
    s += 5 - Math.min(5, Math.abs(p.difficulty - want));
    r.push(`${blossomLevel(p.difficulty)} level`);
    if (s > bestScore) { bestScore = s; best = p; reasons = r; }
  }
  if (!best) return null;
  return { product: best, score: Math.max(62, Math.min(95, bestScore)), reasons };
}

export default function EnFindPage() {
  const [f, setF] = useState({ grade: "", level: "", sr: "", exam: "", period: "", areas: [] as string[] });
  const [done, setDone] = useState(false);
  const [code, setCode] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const teamSent = useRef(false);

  const recVolume = periods.find((p) => p.v === f.period)?.vol ?? "60P";
  const recTrack = exams.find((e) => e.v === f.exam)?.track ?? "";
  const rec = done ? recommend(f, recTrack) : null;
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
      `■ Inquiry code: ${code}`,
      "Match the incoming KakaoTalk chat against this code.",
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
      "Auto-generated. Please re-check the student's situation during consultation.",
    ].join("\n");
  }
  const kakaoMsg = [
    "Hello. I'd like to consult about a recommendation.",
    "",
    `Inquiry code: ${code}`,
    `Recommended: ${rec ? `${rec.product.title.split(" — ")[0]} (Fit ${rec.score}%)` : "custom proposal"}`,
    `Recommended volume: ${recVolume}`,
    "",
    `Grade: ${f.grade || "-"}`,
    `Level: ${f.level || "-"}`,
    `Exam: ${f.exam || "-"}`,
    `Time left: ${f.period || "-"}`,
    `Focus: ${f.areas.join(", ") || "-"}`,
  ].join("\n");
  async function sendTeam(suffix: string, extra?: Record<string, string>) {
    const key = siteConfig.web3formsAccessKey;
    if (!key) return;
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: key, from_name: "Blossom Recommender (EN)", subject: `[Blossom Rec ${code}] ${f.grade || "-"} · ${f.exam || "-"} · ${recVolume}${suffix}`, message: summary(), ...extra }),
      });
    } catch {}
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    teamSent.current = false;
    setCopyState("idle");
    setCode(makeInquiryCode());
    setDone(true);
  }

  useEffect(() => {
    if (!done || !code || teamSent.current) return;
    teamSent.current = true;
    void sendTeam("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, code]);

  function goKakao() {
    // Start the copy inside the click gesture and open the window before any await,
    // otherwise Safari blocks the popup.
    const copying = copyText(kakaoMsg);
    window.open(siteConfig.kakaoChatUrl, "_blank", "noopener,noreferrer");
    void sendTeam(" · kakao click", { inquiry_code: code, event: "kakao clicked" });
    void copying.then((ok) => setCopyState(ok ? "copied" : "manual"));
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
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">Recommended for you</p>
            <p className="font-label text-[10.5px] tracking-[0.08em] text-navy-800/60">
              Inquiry code <span className="font-medium text-navy-900">{code}</span>
            </p>
          </div>

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
                    <li key={r} className="flex items-start gap-2 text-[12.5px] leading-snug text-charcoal-900">
                      <Check size={13} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} /> {r}
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
            <button onClick={goKakao} className="inline-flex items-center gap-2 bg-navy-900 px-5 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"><MessageCircle size={15} /> Consult on KakaoTalk about this result</button>
            <Link href="/en/books" className="inline-flex items-center gap-2 border border-navy-800/25 px-5 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50">Browse all books <ArrowRight size={15} /></Link>
          </div>

          {/* After the consult click: show the message either way, so a failed copy is not a dead end. */}
          {copyState !== "idle" && (
            <div className="mt-4 border border-navy-800/12 bg-ivory-100 p-4">
              <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-navy-950">
                {copyState === "copied" ? (
                  <><Check size={13} className="text-brass-500" strokeWidth={2.4} /> Summary copied — paste it into the KakaoTalk chat.</>
                ) : (
                  <><Copy size={13} className="text-brass-500" /> Copy the text below and paste it into the KakaoTalk chat.</>
                )}
              </p>
              <textarea
                readOnly
                rows={7}
                value={kakaoMsg}
                onFocus={(e) => e.currentTarget.select()}
                className="mt-2.5 w-full resize-none border border-navy-800/15 bg-ivory-200 p-3 text-[12.5px] leading-relaxed text-charcoal-900 outline-none focus:border-navy-800/40"
              />
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => void copyText(kakaoMsg).then((ok) => setCopyState(ok ? "copied" : "manual"))}
                  className="inline-flex items-center gap-1.5 border border-navy-800/25 px-4 py-2 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                >
                  <Copy size={13} /> Copy again
                </button>
                <a href={siteConfig.kakaoChatUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-navy-800/25 px-4 py-2 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50">
                  <MessageCircle size={13} /> Reopen the chat
                </a>
                <span className="text-[11.5px] text-charcoal-600/80">Inquiry code {code} is already in the message.</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
