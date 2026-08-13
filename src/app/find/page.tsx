"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Sparkles, ArrowRight, Copy, Check } from "lucide-react";
import { siteConfig } from "@/data/site";
import { products, trackLabels } from "@/data/products";
import { isFourSkill } from "@/lib/productMeta";
import { blossomLevel } from "@/lib/utils";
import { Product } from "@/lib/types";

// 입력값을 실제 교재와 매칭해 적합도와 이유를 계산합니다.
function gradeRange(str: string): [number, number] {
  const n = (str.match(/\d+/g) || []).map(Number);
  if (/K|Preschool|유아/i.test(str) && !n.length) return [0, 0];
  if (!n.length) return [0, 12];
  return [Math.min(...n), Math.max(...n)];
}
function overlaps(a: [number, number], b: [number, number]): boolean {
  return Math.max(a[0], b[0]) <= Math.min(a[1], b[1]);
}
function recommendProduct(
  f: { grade: string; level: string; areas: string[] },
  track: string
): { product: Product; score: number; reasons: string[] } | null {
  const pool = products.filter((p) => p.materialType === "existing" && p.sampleAvailable);
  const want = f.level.includes("상위") ? 4 : f.level.includes("기초") ? 2 : 3;
  const g = gradeRange(f.grade);
  let best: Product | null = null;
  let bestScore = -1;
  let bestReasons: string[] = [];
  for (const p of pool) {
    let s = 50;
    const reasons: string[] = [];
    if (track && p.track === track) {
      s += 20;
      reasons.push(`준비 시험에 맞는 ${trackLabels[p.track]} 구성`);
    }
    if (overlaps(g, gradeRange(p.gradeRange))) {
      s += 15;
      reasons.push(`학년 범위 ${p.gradeRange} 에 적합`);
    }
    if (f.areas.length) {
      const u = p.units.join(" ");
      if (isFourSkill(p) || f.areas.some((a) => u.includes(a))) {
        s += 10;
        reasons.push(`집중 영역(${f.areas.join(" · ")}) 연습 포함`);
      }
    }
    s += 5 - Math.min(5, Math.abs(p.difficulty - want));
    reasons.push(`난이도 ${blossomLevel(p.difficulty)} 수준`);
    if (s > bestScore) {
      bestScore = s;
      best = p;
      bestReasons = reasons;
    }
  }
  if (!best) return null;
  return { product: best, score: Math.max(62, Math.min(95, bestScore)), reasons: bestReasons };
}

const grades = ["Preschool / K", "Grade 1–2", "Grade 3–4", "Grade 5–6", "Grade 7–8", "Grade 9–12"];
const levels = ["기초 (쉬운 편)", "보통 (학년 수준)", "상위 (앞서가는 편)", "잘 모르겠어요"];
const exams = [
  { v: "영어학원 / 학교 레벨테스트", track: "level-test" },
  { v: "국제학교 입학/편입 시험", track: "admissions" },
  { v: "SR / STAR Reading", track: "level-test" },
  { v: "MAP Growth", track: "admissions" },
  { v: "CAT4", track: "admissions" },
  { v: "ISEE", track: "admissions" },
  { v: "SSAT", track: "admissions" },
  { v: "WIDA", track: "certified-exam" },
  { v: "TOEFL Junior", track: "certified-exam" },
  { v: "UKiset", track: "admissions" },
  { v: "ISEB Common Pre-Test", track: "admissions" },
  { v: "Digital SAT", track: "certified-exam" },
  { v: "AP", track: "ap" },
  { v: "IGCSE", track: "us-curriculum" },
  { v: "GRE", track: "certified-exam" },
  { v: "LSAT", track: "certified-exam" },
  { v: "PTE", track: "certified-exam" },
  { v: "IELTS", track: "certified-exam" },
  { v: "OET", track: "certified-exam" },
  { v: "미국 교과과정 (보충/선행)", track: "us-curriculum" },
  { v: "기타 / 잘 모르겠어요", track: "" },
];
const periods = [
  { v: "2주 이내", vol: "40P" },
  { v: "약 1개월", vol: "60P" },
  { v: "2~3개월", vol: "100P" },
  { v: "아직 미정", vol: "60P" },
];
const areas = ["Reading", "Vocabulary", "Grammar", "Writing", "Math"];

export default function FindPage() {
  const [f, setF] = useState({ grade: "", level: "", sr: "", exam: "", period: "", areas: [] as string[] });
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const recVolume = periods.find((p) => p.v === f.period)?.vol ?? "60P";
  const recTrack = exams.find((e) => e.v === f.exam)?.track ?? "";
  const catalogHref = recTrack ? `/books?track=${recTrack}` : "/books";
  const rec = done ? recommendProduct(f, recTrack) : null;

  function toggleArea(a: string) {
    setF((prev) => ({ ...prev, areas: prev.areas.includes(a) ? prev.areas.filter((x) => x !== a) : [...prev.areas, a] }));
  }

  function message() {
    return [
      "안녕하세요. Blossom Books 교재 추천을 문의드립니다.",
      `학년: ${f.grade || "-"}`,
      `현재 수준: ${f.level || "-"}`,
      f.sr ? `SR / Reading Level: ${f.sr}` : null,
      `준비 시험: ${f.exam || "-"}`,
      `시험일까지: ${f.period || "-"}`,
      f.areas.length ? `집중 영역: ${f.areas.join(", ")}` : null,
      `추천 분량(참고): ${recVolume}`,
      "적합한 교재와 구성을 안내 부탁드립니다.",
    ].filter(Boolean).join("\n");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  function goKakao() {
    try {
      navigator.clipboard?.writeText(message());
      setCopied(true);
    } catch {}
    window.open(siteConfig.kakaoChannelUrl, "_blank", "noopener,noreferrer");
  }

  const selectCls = "w-full border border-navy-800/20 bg-ivory-100 px-3 py-2.5 text-[13.5px] text-charcoal-900 outline-none focus:border-navy-800/50";

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Free workbook fit check</p>
      <h1 className="mt-3 font-display text-[30px] font-semibold text-navy-950 sm:text-[36px]">
        어떤 교재가 필요할까요?
      </h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
        몇 가지만 알려주시면 적합한 시험·구성과 추천 분량을 안내해 드립니다. 가장 비싼 교재가 아니라, 학생에게
        필요한 구성을 안내합니다.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5 border border-navy-800/12 bg-ivory-100 p-6 shadow-card lg:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-navy-950">학생 학년</span>
            <select required value={f.grade} onChange={(e) => setF({ ...f, grade: e.target.value })} className={selectCls}>
              <option value="">선택</option>
              {grades.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-navy-950">현재 영어 수준</span>
            <select required value={f.level} onChange={(e) => setF({ ...f, level: e.target.value })} className={selectCls}>
              <option value="">선택</option>
              {levels.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-navy-950">SR / Reading Level <span className="font-normal text-charcoal-600">(알면)</span></span>
            <input value={f.sr} onChange={(e) => setF({ ...f, sr: e.target.value })} placeholder="예: SR 3.8" className={selectCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-navy-950">준비 시험</span>
            <select required value={f.exam} onChange={(e) => setF({ ...f, exam: e.target.value })} className={selectCls}>
              <option value="">선택</option>
              {exams.map((x) => <option key={x.v} value={x.v}>{x.v}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-navy-950">시험일까지 남은 기간</span>
            <select required value={f.period} onChange={(e) => setF({ ...f, period: e.target.value })} className={selectCls}>
              <option value="">선택</option>
              {periods.map((p) => <option key={p.v} value={p.v}>{p.v}</option>)}
            </select>
          </label>
        </div>

        <div>
          <span className="mb-2 block text-[13px] font-medium text-navy-950">집중하고 싶은 영역 <span className="font-normal text-charcoal-600">(복수 선택)</span></span>
          <div className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => toggleArea(a)}
                className={`border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                  f.areas.includes(a) ? "border-navy-900 bg-navy-900 text-ivory-100" : "border-navy-800/20 text-charcoal-600 hover:border-navy-800/40"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800">
          <Sparkles size={16} /> 추천 결과 보기
        </button>
      </form>

      {done && (
        <div className="mt-8 border border-brass-500/40 bg-brass-500/[0.05] p-6 lg:p-8">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">Recommended for you</p>

          {/* 매칭된 추천 교재 */}
          {rec && (
            <div className="mt-3 border border-navy-800/15 bg-ivory-100 p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-[18px] font-semibold leading-snug text-navy-950">{rec.product.titleKo}</p>
                  <p className="mt-1 text-[12.5px] text-charcoal-600">
                    {trackLabels[rec.product.track]} · {rec.product.gradeRange}
                    {rec.product.readingLevel ? ` · ${rec.product.readingLevel}` : ""} · 추천 분량 {recVolume}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-[24px] font-semibold leading-none text-brass-500">{rec.score}%</p>
                  <p className="font-label text-[8.5px] uppercase tracking-[0.1em] text-navy-800/55">Fit</p>
                </div>
              </div>
              <div className="mt-4 border-t border-navy-800/10 pt-3">
                <p className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-800/55">왜 이 교재를 추천했나요?</p>
                <ul className="mt-2 space-y-1.5">
                  {rec.reasons.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-[12.5px] leading-snug text-charcoal-900">
                      <Check size={13} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/books/${rec.product.id}`}
                  className="group inline-flex items-center gap-1.5 bg-navy-900 px-5 py-2.5 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
                >
                  교재 보기 · 무료 샘플
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={`/books/${rec.product.id}#sample`}
                  className="inline-flex items-center gap-1.5 border border-navy-800/25 px-5 py-2.5 text-[13px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                >
                  샘플 먼저 보기
                </Link>
              </div>
            </div>
          )}

          <p className="mt-4 text-[13px] leading-relaxed text-charcoal-600">
            준비 기간과 목적을 고려한 참고 추천입니다. 정확한 교재와 Level은 상담원이 학생 상황을 확인한 뒤
            안내해 드립니다. (더 많은 페이지가 항상 더 좋은 선택은 아닙니다.)
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button onClick={goKakao} className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800">
              <MessageCircle size={15} /> 카카오톡으로 추천받기
            </button>
            <Link href={catalogHref} className="inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50">
              관련 교재 보기 <ArrowRight size={15} />
            </Link>
          </div>
          {copied && (
            <p className="mt-3 flex items-center gap-1.5 text-[12px] text-brass-500">
              <Copy size={12} /> 입력 내용이 복사되었습니다. 카카오톡 채팅창에 붙여넣어 주세요.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
