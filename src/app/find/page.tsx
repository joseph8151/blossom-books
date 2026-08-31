"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Sparkles, Copy, Check, FileSearch } from "lucide-react";
import { siteConfig } from "@/data/site";
import { products } from "@/data/products";
import { isFourSkill, offersVolumes, offersSrVolumes, nextWorkbooks } from "@/lib/productMeta";
import { flexibleVolumes, srVolumes, volumeByPages, formatKRW } from "@/data/pricing";
import { Product } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

// 입력값을 실제 교재와 매칭해 1안(primary)을 고릅니다.
// 목표는 "가장 비싼 교재"가 아니라 학년·시험·남은 기간에 맞는 구성 1개를
// 결정하는 것 — 결과 화면에는 이 1안만 강조해서 보여줍니다.
function gradeRange(str: string): [number, number] {
  const n = (str.match(/\d+/g) || []).map(Number);
  if (/K|Preschool|유아/i.test(str) && !n.length) return [0, 0];
  if (!n.length) return [0, 12];
  return [Math.min(...n), Math.max(...n)];
}
function overlaps(a: [number, number], b: [number, number]): boolean {
  return Math.max(a[0], b[0]) <= Math.min(a[1], b[1]);
}

// 입력창에 "3.8"만 입력하든 "SR 3.8"까지 입력하든 "SR 3.8"로 통일합니다.
function srLabel(sr: string): string {
  const t = sr.trim();
  if (!t) return "";
  return /^sr\b/i.test(t) ? t.replace(/^sr\b\s*/i, "SR ").trim() : `SR ${t}`;
}

// 특정 시험을 선택하면 같은 track 안의 다른 교재가 아니라 반드시 그 시험의
// 실제 교재가 매칭되도록 하는 맵입니다. (예: CAT4 선택 시 MAP 교재가 나오는
// 것을 방지) 여기 없는 시험은 미국교과/레벨테스트 track일 때만 학년·SR·
// 영역 기준으로 대체 매칭하고, 그 외(SSAT·UKiset·ISEB·TOEFL Junior 등
// 실제 대응 교재가 없는 시험)는 엉뚱한 교재를 끼워맞추지 않고 주문 제작으로
// 넘깁니다.
const examToProductId: Record<string, string> = {
  "MAP Growth": "map-growth-workbook",
  "CAT4": "cat4-level-e",
  "ISEE": "isee-workbook",
  "WIDA": "wida-workbook",
  "Digital SAT": "sat-math-workbook",
  "IELTS": "ielts-workbook",
  "OET": "oet-nursing-workbook",
};

interface FindForm {
  grade: string;
  level: string;
  sr: string;
  exam: string;
  period: string;
  areas: string[];
  phone: string;
}

interface PrimaryRec {
  product: Product;
  pages: number;
  pagesLabel: string;
  priceLabel: string;
  why: string;
  focusUsed: string[];
  fixed: boolean;
}

interface AltRec {
  title: string;
  slug: string;
  note: string;
}

interface RecommendResult {
  matchType: "catalog" | "custom";
  primary?: PrimaryRec;
  alternatives: AltRec[];
  deferredAreas: string[];
  fallbackProduct?: Product;
}

function recommend(f: FindForm, examTrack: string, periodPages: number): RecommendResult {
  const pool = products.filter((p) => p.materialType === "existing" && p.sampleAvailable);
  const pinnedId = examToProductId[f.exam];
  const pinned = pinnedId ? pool.find((p) => p.id === pinnedId) : undefined;
  const wantsSR = /SR|STAR/i.test(f.exam);
  const want = f.level.includes("상위") ? 4 : f.level.includes("기초") ? 2 : 3;
  const g = gradeRange(f.grade);

  // 매칭 우선순위: ① exam 전용 교재 → ② (미국교과/레벨테스트일 때만) 학년·SR·
  // 영역 기반 대체 매칭 → ③ 없으면 주문 제작.
  const fallbackAllowed = examTrack === "us-curriculum" || examTrack === "level-test";
  const scorePool = pinned ? [pinned] : fallbackAllowed ? pool.filter((p) => p.track === examTrack) : [];

  let best: Product | null = null;
  let bestScore = -1;
  for (const p of scorePool) {
    let s = pinned ? 100 : 0;
    if (wantsSR && p.examOrCurriculum === "SR Reading Level") s += 80;
    if (overlaps(g, gradeRange(p.gradeRange))) s += 15;
    if (f.areas.length) {
      const covered = f.areas.filter((a) => isFourSkill(p) || p.units.some((u) => u.includes(a)));
      s += covered.length * 6;
    }
    s += 5 - Math.min(5, Math.abs(p.difficulty - want));
    if (s > bestScore) {
      bestScore = s;
      best = p;
    }
  }

  if (!best) {
    const fallbackProduct =
      pool.find((p) => p.track === examTrack) ??
      [...pool].sort((a, b) => Math.abs(a.difficulty - want) - Math.abs(b.difficulty - want))[0];
    return { matchType: "custom", alternatives: [], deferredAreas: f.areas, fallbackProduct };
  }
  const product = best;

  const fixed = !offersVolumes(product) && !offersSrVolumes(product);
  const pages = fixed
    ? product.pageCount ?? periodPages
    : offersSrVolumes(product)
    ? periodPages <= 60
      ? 150
      : periodPages <= 100
      ? 200
      : 300
    : periodPages;
  const priceKRW = volumeByPages(pages)?.priceKRW ?? null;
  const pagesLabel = `${pages}P`;
  const priceLabel = priceKRW ? formatKRW(priceKRW) : "구성 상담 · 견적";

  const covered = f.areas.filter((a) => isFourSkill(product) || product.units.some((u) => u.includes(a)));
  const uncovered = f.areas.filter((a) => !covered.includes(a));
  const focusUsed = covered.slice(0, 2);
  const deferredAreas = [...covered.slice(2), ...uncovered];

  const subject = f.exam && f.exam !== "기타 / 잘 모르겠어요" ? f.exam : f.grade;
  const why = fixed
    ? `${subject} 전용 구성으로 고정 ${pagesLabel}입니다.`
    : `${subject} 대비 · ${f.period} 기준 ${pagesLabel} 구성입니다.`;

  const alternatives: AltRec[] = [];
  if (!fixed) {
    const otherVols = (offersSrVolumes(product) ? srVolumes : flexibleVolumes).filter((v) => v.pages !== pages);
    otherVols.slice(0, 2).forEach((v) => {
      alternatives.push({ title: product.titleKo, slug: `/books/${product.id}`, note: `${v.label} · ${formatKRW(v.priceKRW)}` });
    });
  } else {
    nextWorkbooks(product, products)
      .slice(0, 2)
      .forEach((n) => {
        alternatives.push({ title: n.titleKo, slug: `/books/${n.id}`, note: "다음 단계 교재" });
      });
  }

  return {
    matchType: "catalog",
    primary: { product, pages, pagesLabel, priceLabel, why, focusUsed, fixed },
    alternatives,
    deferredAreas,
  };
}

// 카카오 채널을 열기 전, 채팅창에 붙여넣을 메시지 한 통을 만듭니다.
// 인사말은 한 줄, 질문은 없습니다 — 바로 주문 요청으로 이어지는 메시지입니다.
function buildKakaoMessage(f: FindForm, result: RecommendResult): string {
  const lines: string[] = ["안녕하세요. 교재 추천 결과로 문의드립니다.", ""];
  lines.push(`학생: ${f.grade}`);
  lines.push(`시험: ${f.exam}`);
  lines.push(f.sr.trim() ? `현재 수준: ${f.level} / ${srLabel(f.sr)}` : `현재 수준: ${f.level}`);
  lines.push(`남은 기간: ${f.period}`);
  if (f.areas.length) lines.push(`집중 영역: ${f.areas.join(", ")}`);
  lines.push("");
  if (result.matchType === "catalog" && result.primary) {
    lines.push(`추천 구성: ${result.primary.product.titleKo} · ${result.primary.pagesLabel} · ${result.primary.priceLabel}`);
    lines.push(`이유: ${result.primary.why}`);
    lines.push("");
    lines.push("이 구성으로 주문하고 싶습니다.");
    lines.push("샘플 확인 후 결제 방법 안내 부탁드립니다.");
  } else {
    lines.push("추천 구성: 기존 교재 없음 · 맞춤 제작");
    lines.push("위 조건으로 구성·일정·견적 부탁드립니다.");
  }
  return lines.join("\n");
}

function buildCustomOrderHref(f: FindForm): string {
  const params = new URLSearchParams();
  if (f.grade) params.set("grade", f.grade);
  if (f.exam) params.set("examOrCurriculum", f.exam);
  const level = f.sr.trim() ? `${f.level} / ${srLabel(f.sr)}` : f.level;
  if (level) params.set("currentLevel", level);
  if (f.areas.length) params.set("purpose", `집중 영역: ${f.areas.join(", ")}`);
  if (f.period) params.set("desiredCompletion", f.period);
  if (f.phone.trim()) params.set("contact", f.phone.trim());
  return `/custom-order?${params.toString()}`;
}

// 팀 내부 전달용 요약 (사용자에게는 노출되지 않습니다)
function buildTeamSummary(f: FindForm, result: RecommendResult): string {
  const lines = [
    "새로운 교재 추천이 생성되었습니다.",
    "",
    "■ 기본 정보",
    `- 학년: ${f.grade || "-"}`,
    `- 현재 수준: ${f.level || "-"}`,
    `- SR / Reading Level: ${f.sr || "모름"}`,
    `- 준비 시험: ${f.exam || "-"}`,
    `- 남은 기간: ${f.period || "-"}`,
    `- 집중 영역: ${f.areas.join(", ") || "-"}`,
    `- 연락처: ${f.phone || "-"}`,
    "",
    "■ 추천 결과",
  ];
  if (result.matchType === "catalog" && result.primary) {
    lines.push(`- 교재: ${result.primary.product.titleKo}`);
    lines.push(`- 분량: ${result.primary.pagesLabel}`);
    lines.push(`- 가격: ${result.primary.priceLabel}`);
    lines.push(`- 이유: ${result.primary.why}`);
  } else {
    lines.push("- 매칭: 기존 교재 없음 → 맞춤 제작 제안");
  }
  lines.push("", "이 추천은 자동 생성되었습니다. 상담 시 학생 상황을 한 번 더 확인해 주세요.");
  return lines.join("\n");
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
  { v: "WIDA", track: "admissions" },
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
  { v: "2주 이내", pages: 40 },
  { v: "2~6주", pages: 60 },
  { v: "6~12주", pages: 100 },
  { v: "12주 이상", pages: 200 },
  { v: "아직 미정", pages: 60 },
];
const areas = ["Reading", "Vocabulary", "Grammar", "Writing", "Math"];

export default function FindPage() {
  const [f, setF] = useState<FindForm>({ grade: "", level: "", sr: "", exam: "", period: "", areas: [], phone: "" });
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [altOpen, setAltOpen] = useState(false);
  const [contactSaved, setContactSaved] = useState(false);

  function toggleArea(a: string) {
    setF((prev) => ({ ...prev, areas: prev.areas.includes(a) ? prev.areas.filter((x) => x !== a) : [...prev.areas, a] }));
  }

  async function sendTeam(result: RecommendResult, subjectSuffix = "", extra?: Record<string, string>): Promise<boolean> {
    const key = siteConfig.web3formsAccessKey;
    if (!key) return false;
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          from_name: "Blossom 추천 시스템",
          subject: `[Blossom 추천] ${f.grade || "-"} · ${f.exam || "-"} · ${result.matchType}${subjectSuffix}`,
          message: buildTeamSummary(f, result),
          ...extra,
        }),
      });
      const json = (await res.json().catch(() => ({ success: false }))) as { success?: boolean };
      return !!json.success;
    } catch {
      return false;
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const periodPages = periods.find((p) => p.v === f.period)?.pages ?? 60;
    const examTrack = exams.find((x) => x.v === f.exam)?.track ?? "";
    const result = recommend(f, examTrack, periodPages);
    setRecommendation(result);
    setDone(true);
    setAltOpen(false);
    trackEvent("find_submit", { exam: f.exam, match_type: result.matchType });
    trackEvent("find_result_view", { match_type: result.matchType });
    void sendTeam(result);
  }

  function goKakao(location: string) {
    if (!recommendation) return;
    try {
      navigator.clipboard?.writeText(buildKakaoMessage(f, recommendation));
      setCopied(true);
    } catch {}
    trackEvent("find_kakao_click", { match_type: recommendation.matchType, location });
    window.open(siteConfig.kakaoChannelUrl, "_blank", "noopener,noreferrer");
  }

  async function submitContact() {
    if (!f.phone.trim() || !consent || !recommendation) return;
    await sendTeam(recommendation, " · 연락처 등록", { 이벤트: "연락처 후속 등록" });
    setContactSaved(true);
  }

  const selectCls = "w-full border border-navy-800/20 bg-ivory-100 px-3 py-2.5 text-[13.5px] text-charcoal-900 outline-none focus:border-navy-800/50";
  const r = recommendation;

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

      {done && r && (
        <div className="mt-8 border border-brass-500/40 bg-brass-500/[0.05] p-6 lg:p-8">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">Free workbook fit check</p>
          <h2 className="mt-3 font-display text-[24px] font-semibold text-navy-950 sm:text-[28px]">
            이 구성이 맞습니다
          </h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-charcoal-600">
            {f.grade} · {f.exam} · 시험까지 {f.period}
            {f.sr.trim() && (
              <>
                <br />· {srLabel(f.sr)} 추가
              </>
            )}
          </p>

          {/* 1안 카드 (catalog 매칭) */}
          {r.matchType === "catalog" && r.primary && (
            <div className="mt-5 border border-navy-800/15 bg-ivory-100 p-5 shadow-card sm:p-6">
              <p className="font-display text-[19px] font-semibold leading-snug text-navy-950">
                {r.primary.product.titleKo}
              </p>
              <p className="mt-1.5 text-[15px] font-medium text-navy-900">
                {r.primary.pagesLabel} · {r.primary.priceLabel}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-charcoal-600">{r.primary.why}</p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => goKakao("primary_card")}
                  className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
                >
                  <MessageCircle size={15} /> 이 구성으로 카톡 주문하기
                </button>
                <Link
                  href={`/books/${r.primary.product.id}#sample`}
                  onClick={() => trackEvent("find_sample_click", { location: "primary_card", product_id: r.primary!.product.id })}
                  className="inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                >
                  <FileSearch size={15} /> 이 교재 샘플 보기
                </Link>
              </div>

              {r.alternatives.length > 0 && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setAltOpen((v) => !v)}
                    className="text-[12.5px] font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2"
                  >
                    {altOpen ? "다른 분량 접기" : "다른 분량 보기"}
                  </button>
                  {altOpen && (
                    <ul className="mt-2.5 space-y-1.5">
                      {r.alternatives.map((a) => (
                        <li key={a.slug + a.note}>
                          <Link href={a.slug} className="text-[12.5px] text-charcoal-600 hover:text-navy-900">
                            {a.title} · {a.note}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

          {r.matchType === "catalog" && (
            <p className="mt-4 text-[12.5px] leading-relaxed text-charcoal-600">
              샘플로 문제·해설 톤을 확인한 뒤 주문하시면 됩니다. 결제 확인 후 PDF를 보내드립니다.
            </p>
          )}

          {/* 다음 구성 (집중 영역이 많거나, 시험이 다루지 않는 영역이 있을 때만) */}
          {r.matchType === "catalog" && r.primary && r.deferredAreas.length > 0 && (
            <div className="mt-4 border-t border-navy-800/10 pt-4">
              <p className="text-[12.5px] leading-relaxed text-charcoal-600">
                {r.primary.focusUsed.length > 0 ? (
                  <>
                    지금은 {r.primary.focusUsed.join(", ")}만 먼저 하세요. {r.deferredAreas.join(", ")}은 이 구성
                    다음에 보시면 됩니다.
                  </>
                ) : (
                  <>
                    {f.exam}는 {r.deferredAreas.join(", ")} 영역을 다루지 않습니다. {r.deferredAreas.join(", ")}은 이
                    구성 다음에 보시면 됩니다.
                  </>
                )}
              </p>
              <ul className="mt-2 space-y-1">
                {r.deferredAreas.slice(0, 2).map((a) => (
                  <li key={a}>
                    <Link
                      href={`/books?q=${encodeURIComponent(a)}`}
                      className="text-[12px] font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2"
                    >
                      {a} 다음 구성 보기 →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 주문 제작 (catalog 매칭이 없을 때) */}
          {r.matchType === "custom" && (
            <div className="mt-5 border border-navy-800/15 bg-ivory-100 p-5 shadow-card sm:p-6">
              <p className="text-[13.5px] leading-relaxed text-charcoal-900">
                기존 교재 대신 학년·시험·기간에 맞춰 구성을 잡아드립니다.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link
                  href={buildCustomOrderHref(f)}
                  onClick={() => trackEvent("find_custom_click", { exam: f.exam })}
                  className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
                >
                  <Sparkles size={15} /> 이 조건으로 맞춤 견적 받기
                </Link>
                {r.fallbackProduct && (
                  <Link
                    href={`/books/${r.fallbackProduct.id}#sample`}
                    onClick={() => trackEvent("find_sample_click", { location: "custom_fallback", product_id: r.fallbackProduct!.id })}
                    className="inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                  >
                    <FileSearch size={15} /> 비슷한 교재 샘플 보기
                  </Link>
                )}
              </div>
            </div>
          )}

          {copied && (
            <p className="mt-3 flex items-center gap-1.5 text-[12px] text-brass-500">
              <Copy size={12} /> 메시지가 복사되었습니다. 카카오톡 채팅창에 붙여넣어 주세요.
            </p>
          )}

          {/* 연락처 후속 — 결과 아래에만, 선택 */}
          <div className="mt-6 border-t border-navy-800/10 pt-5">
            <p className="text-[13.5px] font-medium text-navy-950">이 구성을 카톡으로 받아보시겠어요?</p>
            <p className="mt-1 text-[11.5px] text-charcoal-600/80">입력은 선택입니다. 넣지 않아도 결과는 유지됩니다.</p>
            {contactSaved ? (
              <p className="mt-3 flex items-center gap-2 text-[13px] text-navy-900">
                <Check size={15} className="text-brass-500" strokeWidth={2.4} />
                연락처가 접수되었습니다. 상담원이 카톡으로 안내드립니다.
              </p>
            ) : (
              <div className="mt-3 max-w-sm">
                <input
                  type="tel"
                  inputMode="tel"
                  value={f.phone}
                  onChange={(e) => setF({ ...f, phone: e.target.value })}
                  placeholder="010-1234-5678"
                  className={selectCls}
                />
                {f.phone.trim() && (
                  <label className="mt-2.5 flex items-start gap-2 text-[11.5px] leading-snug text-charcoal-600">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
                    <span>
                      (필수) 상담 연락을 위한 개인정보(연락처) 수집·이용에 동의합니다. 보유기간: 상담 완료 후 즉시 파기.{" "}
                      <Link href="/privacy" className="underline decoration-brass-500 decoration-2 underline-offset-2">
                        자세히 보기
                      </Link>
                    </span>
                  </label>
                )}
                <button
                  type="button"
                  onClick={submitContact}
                  disabled={!f.phone.trim() || !consent}
                  className="mt-3 inline-flex items-center gap-2 border border-navy-800/25 px-5 py-2.5 text-[13px] font-medium text-navy-900 transition-colors hover:border-navy-800/50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  연락처 남기기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
