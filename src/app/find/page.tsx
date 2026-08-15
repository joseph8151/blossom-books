"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, Sparkles, ArrowRight, Copy, Check, Mail, FileSearch, ClipboardList, CalendarClock, Users, PlusCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { trackLabels } from "@/data/products";
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
  type ExtraDiagnosis,
  type FindInput,
  type FitTone,
} from "@/lib/recommendation";

const FIT_TONE: Record<FitTone, string> = {
  good: "border-brass-500/45 bg-brass-500/[0.07] text-brass-500",
  fair: "border-navy-800/20 bg-ivory-100 text-navy-900",
  check: "border-burgundy-700/30 bg-burgundy-700/[0.05] text-burgundy-700",
};

export default function FindPage() {
  const [f, setF] = useState({ grade: "", level: "", sr: "", exam: "", period: "", areas: [] as string[] });
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

  const input: FindInput = { ...f, extra: applied };
  const a = done ? analyze(input) : null;

  function toggleArea(area: string) {
    setF((prev) => ({ ...prev, areas: prev.areas.includes(area) ? prev.areas.filter((x) => x !== area) : [...prev.areas, area] }));
  }

  // 팀에게 자동 전송할 추천 요약
  function recSummary(): string {
    if (!a) return "";
    return [
      "새로운 교재 추천이 생성되었습니다.",
      "",
      "■ 기본 정보",
      `- 학년: ${f.grade || "-"}`,
      `- 현재 수준: ${f.level || "-"}`,
      `- SR / Reading Level: ${f.sr || "모름"}`,
      `- 준비 시험: ${f.exam || "-"}`,
      `- 남은 기간: ${f.period || "-"}`,
      `- 집중 영역: ${f.areas.join(", ") || "-"}`,
      "",
      ...(a.refined && applied
        ? [
            "■ 추가 진단",
            `- 최근 시험 결과: ${applied.recentScore || "-"}`,
            `- 해외 거주: ${applied.abroad || "-"}`,
            `- 영어유치원/국제학교: ${applied.englishSchool || "-"}`,
            `- Reading 취약점: ${applied.readingWeak || "-"}`,
            "",
          ]
        : []),
      "■ 추천 결과",
      `- 교재: ${a.product ? a.product.titleKo : "커스텀 제작 제안"}`,
      `- 분량: ${a.volume}`,
      `- 학습 계획: 약 ${a.plan.weeksMin}~${a.plan.weeksMax}주 · 주 ${a.plan.sessionsPerWeek}회 · 1회 ${a.plan.pagesPerSessionMin}~${a.plan.pagesPerSessionMax}P`,
      `- 기간 전략: ${a.strategy.headline}`,
      ...(a.plan.tight ? ["- ⚠ 남은 기간 대비 분량이 빠듯합니다. 상담에서 조정 필요."] : []),
      "",
      "■ 적합도",
      ...a.fit.map((x) => `- ${x.label}: ${x.verdict} (${x.why})`),
      "",
      "■ 추천 이유",
      ...a.rationale.map((r) => `- ${r}`),
      "",
      "■ 함께 준비하면 좋은 영역",
      ...(a.companions.length ? a.companions.map((c) => `- ${c.label}: ${c.reason}`) : ["- 없음"]),
      "",
      "이 추천은 자동 생성되었습니다. 상담 시 학생 상황을 한 번 더 확인해 주세요.",
    ].join("\n");
  }

  // 카카오 상담 시 자동 복사되는 메시지
  const kakaoRecMessage = !a
    ? ""
    : [
        "안녕하세요.",
        "자동 추천 결과를 전문가 검토 요청드립니다.",
        "",
        `추천 교재: ${a.product ? a.product.titleKo : "맞춤 제작 제안"}`,
        `추천 분량: ${a.volume}`,
        `학습 계획: 약 ${a.plan.weeksMin}~${a.plan.weeksMax}주 · 주 ${a.plan.sessionsPerWeek}회 · 1회 ${a.plan.pagesPerSessionMin}~${a.plan.pagesPerSessionMax}P`,
        "",
        `학년: ${f.grade || "-"}`,
        `현재 수준: ${f.level || "-"}`,
        `시험: ${f.exam || "-"}`,
        `남은 기간: ${f.period || "-"}`,
        `집중 영역: ${f.areas.join(", ") || "-"}`,
        ...(a.companions.length ? ["", `함께 준비 제안: ${a.companions.map((c) => c.area).join(", ")}`] : []),
        "",
        "이 구성이 학생에게 적합한지 검토 부탁드립니다.",
      ].join("\n");

  async function sendTeam(subjectSuffix: string, extraFields?: Record<string, string>): Promise<boolean> {
    const key = siteConfig.web3formsAccessKey;
    if (!key || !a) return false;
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          from_name: "Blossom 추천 시스템",
          subject: `[Blossom 추천] ${f.grade || "-"} · ${f.exam || "-"} · ${a.volume}${subjectSuffix}`,
          message: recSummary() + `\n\n기기/경로: ${ua} · ${path}`,
          ...extraFields,
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
    teamSent.current = false;
    setCopyState("idle");
    setDone(true);
  }

  // 추가 진단을 반영해 추천을 다시 계산합니다.
  function applyExtra() {
    teamSent.current = false;
    setApplied({ ...extra });
    setExtraOpen(false);
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // 추천 생성 시 팀 이메일로 자동 전송 (재계산되면 갱신본을 다시 보냅니다)
  useEffect(() => {
    if (!done || teamSent.current) return;
    teamSent.current = true;
    void sendTeam(applied ? " · 추가 진단 반영" : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, applied]);

  function goKakao(label: string) {
    // 복사는 클릭 제스처 안에서 바로 시작하고, 창 열기도 await 이전에 해야
    // 사파리에서 팝업이 차단되지 않습니다.
    const copying = copyText(kakaoRecMessage);
    window.open(siteConfig.kakaoChatUrl, "_blank", "noopener,noreferrer");
    void sendTeam(" · 카카오 클릭", { 이벤트: label });
    void copying.then((ok) => setCopyState(ok ? "copied" : "manual"));
  }

  async function sendToParent() {
    if (!parentEmail.trim()) return;
    await sendTeam(" · 이메일 요청", { 학부모_이메일: parentEmail.trim(), 이벤트: "이메일로 추천 받기" });
    setEmailSent(true);
  }

  const selectCls = "w-full border border-navy-800/20 bg-ivory-100 px-3 py-2.5 text-[13.5px] text-charcoal-900 outline-none focus:border-navy-800/50";
  const sectionLabel = "font-label text-[10px] uppercase tracking-[0.14em] text-navy-800/55";

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Free workbook fit check</p>
      <h1 className="mt-3 font-display text-[30px] font-semibold text-navy-950 sm:text-[36px]">
        어떤 교재가 필요할까요?
      </h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
        몇 가지만 알려주시면 학생에게 맞는 교재와 학습 계획을 분석해 드립니다. 가장 비싼 교재가 아니라, 학생에게
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
              {periods.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
        </div>

        <div>
          <span className="mb-2 block text-[13px] font-medium text-navy-950">집중하고 싶은 영역 <span className="font-normal text-charcoal-600">(복수 선택)</span></span>
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
          <Sparkles size={16} /> 추천 결과 보기
        </button>
      </form>

      {/* ── 학생 분석 리포트 ─────────────────────────────── */}
      {a && (
        <div ref={resultRef} className="mt-10 border border-navy-800/15 bg-ivory-100 shadow-card">
          {/* 리포트 헤더 */}
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
                ["학년", f.grade],
                ["준비 시험", f.exam],
                ["현재 수준", f.level],
                ["남은 기간", f.period],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="font-label text-[9px] uppercase tracking-[0.1em] text-ivory-100/50">{k}</p>
                  <p className="mt-0.5 text-[12.5px] font-medium leading-snug text-ivory-100">{v || "-"}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-7 px-6 py-7 lg:px-8">
            {/* 1. 추천 교재 */}
            {a.product && (
              <section>
                <p className={sectionLabel}>01 · 추천 교재</p>
                <div className="mt-2.5 border border-navy-800/15 bg-ivory-200/60 p-5">
                  <p className="font-display text-[19px] font-semibold leading-snug text-navy-950">{a.product.titleKo}</p>
                  <p className="mt-1 text-[12.5px] text-charcoal-600">
                    {trackLabels[a.product.track]} · {a.product.gradeRange}
                    {a.product.readingLevel ? ` · ${a.product.readingLevel}` : ""} · 추천 분량 {a.volume}
                  </p>

                  {/* 적합도 — 근거 없는 % 대신 정성 판정 */}
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
                      href={`/books/${a.product.id}`}
                      className="group inline-flex items-center gap-1.5 bg-navy-900 px-5 py-2.5 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
                    >
                      교재 상세 보기
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      href={`/books/${a.product.id}#sample`}
                      className="inline-flex items-center gap-1.5 border border-navy-800/25 px-5 py-2.5 text-[13px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                    >
                      <FileSearch size={14} /> 무료 샘플
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* 2. 추천 이유 */}
            <section>
              <p className={sectionLabel}>02 · 추천 이유</p>
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

            {/* 추가 진단 */}
            <section className="border border-navy-800/12 bg-ivory-200/50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[13.5px] font-medium text-navy-950">추천을 더 정확하게 받고 싶으신가요?</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">
                    4가지만 더 알려주시면 난이도와 우선 영역을 다시 계산합니다. {a.refined && "현재 결과에 반영되어 있습니다."}
                  </p>
                </div>
                <button
                  onClick={() => setExtraOpen((v) => !v)}
                  className="inline-flex shrink-0 items-center gap-1.5 border border-navy-800/25 px-4 py-2.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                >
                  <PlusCircle size={14} /> {extraOpen ? "닫기" : a.refined ? "다시 입력하기" : "추가 진단하기"}
                </button>
              </div>

              {extraOpen && (
                <div className="mt-4 grid gap-4 border-t border-navy-800/10 pt-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] font-medium text-navy-950">최근 영어시험 점수·결과</span>
                    <input
                      value={extra.recentScore}
                      onChange={(e) => setExtra({ ...extra, recentScore: e.target.value })}
                      placeholder="예: MAP 210 / 학원 레벨 3반"
                      className={selectCls}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] font-medium text-navy-950">해외 거주 경험</span>
                    <select value={extra.abroad} onChange={(e) => setExtra({ ...extra, abroad: e.target.value })} className={selectCls}>
                      <option value="">선택</option>
                      {extraOptions.abroad.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] font-medium text-navy-950">영어유치원 / 국제학교 경험</span>
                    <select value={extra.englishSchool} onChange={(e) => setExtra({ ...extra, englishSchool: e.target.value })} className={selectCls}>
                      <option value="">선택</option>
                      {extraOptions.englishSchool.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] font-medium text-navy-950">Reading 에서 어려운 부분</span>
                    <select value={extra.readingWeak} onChange={(e) => setExtra({ ...extra, readingWeak: e.target.value })} className={selectCls}>
                      <option value="">선택</option>
                      {extraOptions.readingWeak.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                  <div className="sm:col-span-2">
                    <button
                      onClick={applyExtra}
                      className="inline-flex items-center gap-2 bg-navy-900 px-5 py-2.5 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
                    >
                      <Sparkles size={14} /> 추천 다시 계산하기
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* 3. 예상 학습 기간 */}
            <section>
              <p className={sectionLabel}>03 · 예상 학습 계획</p>
              <div className="mt-2.5 border border-navy-800/12">
                <div className="grid grid-cols-3 divide-x divide-navy-800/10 border-b border-navy-800/10">
                  {[
                    ["예상 학습기간", `약 ${a.plan.weeksMin}~${a.plan.weeksMax}주`],
                    ["권장 학습", `주 ${a.plan.sessionsPerWeek}회`],
                    ["1회 권장 분량", `${a.plan.pagesPerSessionMin}~${a.plan.pagesPerSessionMax}P`],
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
                    <p className="text-[12.5px] font-medium text-navy-950">{a.volume} · {a.strategy.headline}</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">{a.strategy.detail}</p>
                  </div>
                </div>
                {a.plan.tight && (
                  <p className="border-t border-burgundy-700/20 bg-burgundy-700/[0.04] px-4 py-3 text-[12.5px] leading-relaxed text-burgundy-700">
                    남은 기간 안에 이 분량을 끝내려면 일정이 빠듯합니다. 주 회차를 늘리거나 분량을 줄이는 조정이 필요하며,
                    상담에서 학생 일정에 맞춰 다시 잡아 드립니다.
                  </p>
                )}
              </div>
            </section>

            {/* 4. 교재 미리보기 */}
            {a.product && (
              <section>
                <p className={sectionLabel}>04 · 교재 미리보기</p>
                <div className="mt-2.5">
                  <WorkbookPreview product={a.product} />
                </div>
              </section>
            )}

            {/* 5. 이런 학생에게 추천합니다 */}
            {a.goodFor.length > 0 && (
              <section>
                <p className={sectionLabel}>05 · 이 교재가 잘 맞는 학생</p>
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

            {/* 6. 함께 준비하면 좋은 영역 */}
            {a.companions.length > 0 && (
              <section>
                <p className={sectionLabel}>06 · 함께 준비하면 좋은 영역</p>
                <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                  {a.companions.map((c) => (
                    <div key={c.area} className="border border-navy-800/12 bg-ivory-200/50 p-4">
                      <p className="text-[13px] font-medium text-navy-950">{c.label}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">{c.reason}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => goKakao("추가 교재 확인 클릭")}
                  className="mt-3 inline-flex items-center gap-1.5 border border-navy-800/25 px-5 py-2.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                >
                  <MessageCircle size={13} /> 내게 필요한 추가 교재 확인하기
                </button>
              </section>
            )}

            {/* 맞춤 제작 제안 */}
            {a.suggestCustom && (
              <section className="border border-burgundy-700/25 bg-burgundy-700/[0.04] p-4">
                <p className="text-[13px] font-medium text-burgundy-700">기존 교재로 딱 맞추기 어려운 조합일 수 있어요.</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">
                  학생의 목적과 수준에 맞춰 <Link href="/custom-order" className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2">맞춤 제작</Link>으로
                  구성해 드릴 수 있습니다. 상담에서 더 정확하게 맞춰 드립니다.
                </p>
              </section>
            )}

            {/* 7. 전문가 검토 CTA */}
            <section className="border border-brass-500/40 bg-brass-500/[0.06] p-6 text-center">
              <ClipboardList size={20} className="mx-auto text-brass-500" />
              <p className="mt-3 font-display text-[18px] font-semibold text-navy-950">
                전문가에게 추천 결과 무료 검토받기
              </p>
              <p className="mx-auto mt-2 max-w-lg text-[13px] leading-relaxed text-charcoal-600">
                자동 추천 결과를 바탕으로 학생에게 적합한 난이도와 교재 구성을 한 번 더 확인해 드립니다.
              </p>
              <button
                onClick={() => goKakao("전문가 검토 요청 클릭")}
                className="mt-4 inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
              >
                <MessageCircle size={16} /> 카카오톡으로 무료 검토받기
              </button>
              <p className="mt-2.5 text-[11.5px] leading-relaxed text-charcoal-600/80">
                상담 후 학생 수준과 준비 기간을 확인하여 최종 교재와 분량을 안내드립니다.
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-brass-500/25 pt-4">
                <Link
                  href={a.product ? `/books/${a.product.id}#sample` : "/books"}
                  className="inline-flex items-center gap-1.5 border border-navy-800/25 bg-ivory-100 px-4 py-2.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                >
                  <FileSearch size={14} /> 무료 샘플 보기
                </Link>
                <button
                  onClick={() => setEmailOpen((v) => !v)}
                  className="inline-flex items-center gap-1.5 border border-navy-800/25 bg-ivory-100 px-4 py-2.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                >
                  <Mail size={14} /> 이메일로 결과 받기
                </button>
              </div>
            </section>

            {/* 카카오 상담 클릭 후: 복사 성공 여부와 무관하게 보낼 내용을 그대로 보여줍니다. */}
            {copyState !== "idle" && (
              <section className="border border-navy-800/12 bg-ivory-200/50 p-4">
                <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-navy-950">
                  {copyState === "copied" ? (
                    <>
                      <Check size={13} className="text-brass-500" strokeWidth={2.4} />
                      분석 요약이 복사되었습니다. 카카오톡 채팅창에 붙여넣어 주세요.
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
                  rows={8}
                  value={kakaoRecMessage}
                  onFocus={(e) => e.currentTarget.select()}
                  className="mt-2.5 w-full resize-none border border-navy-800/15 bg-ivory-100 p-3 text-[12.5px] leading-relaxed text-charcoal-900 outline-none focus:border-navy-800/40"
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
                </div>
              </section>
            )}

            {/* 이메일로 받기 (선택) */}
            {emailOpen && (
              <section className="border border-navy-800/12 bg-ivory-200/50 p-5">
                {emailSent ? (
                  <p className="flex items-center gap-2 text-[13px] text-navy-900">
                    <Check size={15} className="text-brass-500" strokeWidth={2.4} />
                    접수되었습니다. 입력하신 이메일로 분석 결과를 안내해 드리겠습니다.
                  </p>
                ) : (
                  <>
                    <p className="text-[13px] font-medium text-navy-950">분석 결과를 이메일로도 받아보시겠어요? <span className="font-normal text-charcoal-600">(선택사항)</span></p>
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
                        결과 보내기
                      </button>
                    </div>
                    <p className="mt-2 text-[11.5px] text-charcoal-600/80">
                      개인정보는 추천 안내 목적에만 사용됩니다.
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
