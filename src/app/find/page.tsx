"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, Sparkles, ArrowRight, Copy, Check, Mail, FileSearch } from "lucide-react";
import { siteConfig } from "@/data/site";
import { products, trackLabels } from "@/data/products";
import { isFourSkill } from "@/lib/productMeta";
import { blossomLevel } from "@/lib/utils";
import { makeInquiryCode, copyText } from "@/lib/consultation";
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
  const [code, setCode] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const [emailOpen, setEmailOpen] = useState(false);
  const [parentEmail, setParentEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const teamSent = useRef(false);

  const recVolume = periods.find((p) => p.v === f.period)?.vol ?? "60P";
  const recTrack = exams.find((e) => e.v === f.exam)?.track ?? "";
  const rec = done ? recommendProduct(f, recTrack) : null;
  const suggestCustom = done && (!rec || rec.score < 68);
  const volumeReason =
    recVolume === "40P"
      ? "시험이 가까워 핵심 유형을 빠르게 점검하기 좋은 분량입니다."
      : recVolume === "100P"
      ? "준비 기간이 넉넉해 충분한 반복·심화까지 담기 좋은 분량입니다."
      : "여러 유형을 균형 있게 연습하기 좋은 표준 분량입니다.";

  function toggleArea(a: string) {
    setF((prev) => ({ ...prev, areas: prev.areas.includes(a) ? prev.areas.filter((x) => x !== a) : [...prev.areas, a] }));
  }

  // 팀에게 자동 전송할 추천 요약
  function recSummary(): string {
    return [
      "새로운 교재 추천이 생성되었습니다.",
      "",
      `■ 상담코드: ${code}`,
      "카카오톡 상담이 들어오면 이 코드로 대조해 주세요.",
      "",
      "■ 기본 정보",
      `- 학년: ${f.grade || "-"}`,
      `- 현재 수준: ${f.level || "-"}`,
      `- SR / Reading Level: ${f.sr || "모름"}`,
      `- 준비 시험: ${f.exam || "-"}`,
      `- 남은 기간: ${f.period || "-"}`,
      `- 집중 영역: ${f.areas.join(", ") || "-"}`,
      "",
      "■ 추천 결과",
      `- 교재: ${rec ? rec.product.titleKo : "커스텀 제작 제안"}`,
      `- 분량: ${recVolume}`,
      `- Fit: ${rec ? rec.score + "%" : "-"}`,
      "",
      "■ 추천 이유",
      ...(rec ? rec.reasons.map((r) => `- ${r}`) : ["- 기존 교재로 커버가 어려워 맞춤 제작을 제안합니다."]),
      "",
      "이 추천은 자동 생성되었습니다. 상담 시 학생 상황을 한 번 더 확인해 주세요.",
    ].join("\n");
  }

  // 카카오 상담 시 자동 복사되는 메시지 (담당자가 바로 이어받을 수 있게 추천 결과까지 포함)
  const kakaoRecMessage = [
    "안녕하세요.",
    "추천 결과를 보고 상담 요청드립니다.",
    "",
    `상담코드: ${code}`,
    `추천 교재: ${rec ? `${rec.product.titleKo} (Fit ${rec.score}%)` : "맞춤 제작 제안"}`,
    `추천 분량: ${recVolume}`,
    "",
    `학년: ${f.grade || "-"}`,
    `현재 수준: ${f.level || "-"}`,
    `시험: ${f.exam || "-"}`,
    `남은 기간: ${f.period || "-"}`,
    `집중 영역: ${f.areas.join(", ") || "-"}`,
    "",
    "이 구성으로 진행해도 될지 상담 부탁드립니다.",
  ].join("\n");

  async function sendTeam(subjectSuffix: string, extra?: Record<string, string>): Promise<boolean> {
    const key = siteConfig.web3formsAccessKey;
    if (!key) return false;
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          from_name: "Blossom 추천 시스템",
          subject: `[Blossom 추천 ${code}] ${f.grade || "-"} · ${f.exam || "-"} · ${recVolume}${subjectSuffix}`,
          message: recSummary() + `\n\n기기/경로: ${ua} · ${path}`,
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
    // 답변을 고쳐 다시 제출하면 새 상담코드로 다시 접수합니다.
    teamSent.current = false;
    setCopyState("idle");
    setCode(makeInquiryCode());
    setDone(true);
  }

  // 추천 생성 시 팀 이메일로 1회 자동 전송
  useEffect(() => {
    if (!done || !code || teamSent.current) return;
    teamSent.current = true;
    void sendTeam("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, code]);

  function goKakao() {
    // 복사는 클릭 제스처 안에서 바로 시작하고, 창 열기도 await 이전에 해야
    // 사파리에서 팝업이 차단되지 않습니다.
    const copying = copyText(kakaoRecMessage);
    window.open(siteConfig.kakaoChatUrl, "_blank", "noopener,noreferrer");
    void sendTeam(" · 카카오 클릭", { 상담코드: code, 이벤트: "카카오 상담 클릭됨" });
    void copying.then((ok) => setCopyState(ok ? "copied" : "manual"));
  }

  async function sendToParent() {
    if (!parentEmail.trim()) return;
    await sendTeam(" · 이메일 요청", { 상담코드: code, 학부모_이메일: parentEmail.trim(), 이벤트: "이메일로 추천 받기" });
    setEmailSent(true);
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
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">Recommended for you</p>
            <p className="font-label text-[10.5px] tracking-[0.08em] text-navy-800/60">
              상담코드 <span className="font-medium text-navy-900">{code}</span>
            </p>
          </div>

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

          {/* 추천 분량 + 이유 */}
          <div className="mt-3 flex items-center gap-3 border border-navy-800/12 bg-ivory-100 p-4">
            <span className="font-display text-[20px] font-semibold text-navy-950">{recVolume}</span>
            <span className="text-[12.5px] leading-snug text-charcoal-600">{volumeReason}</span>
          </div>

          {/* 커스텀 제안 (매칭이 약하거나 특이 조합) */}
          {suggestCustom && (
            <div className="mt-3 border border-burgundy-700/25 bg-burgundy-700/[0.04] p-4">
              <p className="text-[13px] font-medium text-burgundy-700">기존 교재로 딱 맞추기 어려운 조합일 수 있어요.</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">
                학생의 목적과 수준에 맞춰 <Link href="/custom-order" className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2">맞춤 제작</Link>으로
                구성해 드릴 수 있습니다. 상담에서 더 정확하게 맞춰 드립니다.
              </p>
              <button onClick={goKakao} className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-burgundy-700 underline decoration-burgundy-700/40 underline-offset-4 hover:decoration-burgundy-700">
                <MessageCircle size={13} /> 카카오톡으로 맞춤 상담 요청하기
              </button>
            </div>
          )}

          <p className="mt-4 text-[13px] leading-relaxed text-charcoal-600">
            정보가 부족하면 상담을 통해 더 정확하게 맞출 수 있습니다. 가장 비싼 구성이 아니라, 학생에게
            필요한 적정 분량을 우선 추천합니다.
          </p>

          {/* 다음 행동 */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={rec ? `/books/${rec.product.id}#sample` : "/books"}
              className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-5 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              <FileSearch size={15} /> 무료 샘플 보기
            </Link>
            <button onClick={goKakao} className="inline-flex items-center gap-2 bg-navy-900 px-5 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800">
              <MessageCircle size={15} /> 이 결과로 카카오톡 상담하기
            </button>
            <button
              onClick={() => setEmailOpen((v) => !v)}
              className="inline-flex items-center gap-2 border border-navy-800/25 px-5 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              <Mail size={15} /> 이메일로 추천 받기
            </button>
          </div>

          {/* 카카오 상담 클릭 후: 복사 성공 여부와 무관하게 보낼 내용을 그대로 보여줍니다. */}
          {copyState !== "idle" && (
            <div className="mt-4 border border-navy-800/12 bg-ivory-100 p-4">
              <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-navy-950">
                {copyState === "copied" ? (
                  <>
                    <Check size={13} className="text-brass-500" strokeWidth={2.4} />
                    추천 요약이 복사되었습니다. 카카오톡 채팅창에 붙여넣어 주세요.
                  </>
                ) : (
                  <>
                    <Copy size={13} className="text-brass-500" />
                    아래 내용을 복사해 카카오톡 채팅창에 붙여넣어 주세요.
                  </>
                )}
              </p>
              <textarea
                readOnly
                rows={7}
                value={kakaoRecMessage}
                onFocus={(e) => e.currentTarget.select()}
                className="mt-2.5 w-full resize-none border border-navy-800/15 bg-ivory-200 p-3 text-[12.5px] leading-relaxed text-charcoal-900 outline-none focus:border-navy-800/40"
              />
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => void copyText(kakaoRecMessage).then((ok) => setCopyState(ok ? "copied" : "manual"))}
                  className="inline-flex items-center gap-1.5 border border-navy-800/25 px-4 py-2 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                >
                  <Copy size={13} /> 다시 복사
                </button>
                <a
                  href={siteConfig.kakaoChatUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 border border-navy-800/25 px-4 py-2 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                >
                  <MessageCircle size={13} /> 채팅창 다시 열기
                </a>
                <span className="text-[11.5px] text-charcoal-600/80">상담코드 {code} 는 이미 메시지에 포함되어 있습니다.</span>
              </div>
            </div>
          )}

          {/* 이메일로 받기 (선택) */}
          {emailOpen && (
            <div className="mt-4 border border-navy-800/12 bg-ivory-100 p-5">
              {emailSent ? (
                <p className="flex items-center gap-2 text-[13px] text-navy-900">
                  <Check size={15} className="text-brass-500" strokeWidth={2.4} />
                  접수되었습니다. 입력하신 이메일로 추천 내용을 안내해 드리겠습니다.
                </p>
              ) : (
                <>
                  <p className="text-[13px] font-medium text-navy-950">추천 내용을 이메일로도 받아보시겠어요? <span className="font-normal text-charcoal-600">(선택사항)</span></p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <input
                      type="email"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="이메일 주소"
                      className="flex-1 border border-navy-800/20 bg-ivory-100 px-3 py-2.5 text-[13.5px] text-charcoal-900 outline-none focus:border-navy-800/50"
                    />
                    <button
                      onClick={sendToParent}
                      disabled={!parentEmail.trim()}
                      className="inline-flex items-center justify-center gap-1.5 bg-navy-900 px-5 py-2.5 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800 disabled:opacity-40"
                    >
                      추천 내용 보내기
                    </button>
                  </div>
                  <p className="mt-2 text-[11.5px] text-charcoal-600/80">
                    개인정보는 추천 안내 목적에만 사용됩니다.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
