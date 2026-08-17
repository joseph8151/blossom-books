"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Copy, Check, Mail, FileSearch } from "lucide-react";
import { siteConfig } from "@/data/site";
import { trackLabels } from "@/data/products";
import { recommend, studyPlan, FitFactor, SubjectDomain, FOCUS_AREAS } from "@/lib/recommend";
import { pagesLabel, priceDisplay, explanationLanguage } from "@/lib/productMeta";
import { packageOption } from "@/data/pricing";
import RecommendationDetail, { FindCopy } from "@/components/find/RecommendationDetail";

const trackName = (t: string) => trackLabels[t as keyof typeof trackLabels] ?? t;

// 항목별 판정 문구 — 계산은 @/lib/recommend 에서 하고 여기서는 표시만 합니다.
function factorText(f: FitFactor): string {
  switch (f.code) {
    case "track":
      return f.status === "match"
        ? `준비 시험에 맞는 ${trackName(f.value)} 구성`
        : `${trackName(f.value)} 교재입니다 (준비 시험과 다른 계열)`;
    case "grade":
      if (f.status === "match") return `${f.value} — 학생 학년과 일치`;
      return `${f.value} — 학생은 ${f.student}${f.status === "partial" ? " (한 단계 차이)" : ""}`;
    case "focus":
      if (f.status === "match") return `${f.value} 연습 포함`;
      if (f.status === "partial") return `${f.value} 포함 · ${f.missing} 는 다루지 않음`;
      return `${f.missing} 를 다루지 않음`;
    case "reading":
      if (f.status === "match") return `${f.value} — 입력하신 SR 과 일치`;
      return `${f.value} — 입력하신 SR ${f.student} 와 차이 있음`;
    case "difficulty":
      if (f.status === "match") return `${f.value} — 요청하신 수준과 일치`;
      return `${f.value} — 요청 수준(${f.student})과 ${f.status === "partial" ? "한 단계" : "두 단계 이상"} 차이`;
  }
}

const findCopy: FindCopy = {
  fit: "Fit",
  fitDetailTitle: "항목별 적합도",
  insideTitle: "교재 구성",
  includedTitle: "포함 사항",
  planTitle: "학습 계획",
  altTitle: "함께 검토해 볼 교재",
  altNote: "상담에서 아래 교재와 비교해 최종 구성을 잡아 드립니다.",
  viewBook: "교재 보기 · 무료 샘플",
  viewSample: "샘플 먼저 보기",
  handmadeTitle: "교재는 선생님이 수기로 일일이 만듭니다",
  handmadeBody:
    "문항을 자동으로 찍어내지 않습니다. 학생을 직접 지도해 온 선생님이 문제를 하나하나 손으로 만들고, 정답과 해설까지 사람이 검수한 뒤에야 교재로 나갑니다.",
  packageTitle: "길게 준비한다면 — 200P 장기·심화 패키지",
  packageSummary: packageOption.summaryKo,
  packageCta: "200P 구성 상담받기",
  packagePriceAsk: "가격 문의 (상담 시 안내)",
  consultTitle: "전문 프랩 선생님이 자세하게 상담해 드립니다",
  consultBody:
    "위 교재 추천은 입력하신 정보로 자동 계산한 참고 결과입니다. 교재 자체는 선생님이 수기로 만든 것이며, 학생의 실제 수준과 시험 일정에 맞춰 프랩 전문 선생님이 교재 구성·분량·난이도를 하나씩 짚어 상담해 드립니다.",
  consultPhone: "전화 상담",
  consultKakao: "카카오톡 상담",
  consultEmail: "이메일 문의",
  factorLabel: {
    track: "준비 시험",
    grade: "학년",
    focus: "집중 영역",
    reading: "리딩 레벨",
    difficulty: "난이도",
  },
  productTitle: (p) => p.titleKo,
  productMeta: (p) =>
    [trackName(p.track), p.gradeRange, p.readingLevel].filter(Boolean).join(" · "),
  priceLabel: (p) => `${pagesLabel(p)} · ${priceDisplay(p)}`,
  included: (p) => {
    const out = ["선생님 수기 제작", `${p.fileFormat} 파일`];
    if (p.includesAnswerKey) out.push("정답 포함");
    if (p.includesDetailedExplanations) out.push(explanationLanguage(p).labelKo);
    if (p.includesAudio) out.push("리스닝 오디오(MP3)");
    return out;
  },
  factorText,
  planText: (plan) =>
    `${plan.pages}P 를 ${plan.weeks}주에 나누면 주 ${plan.perWeek}p · 하루 약 ${plan.perDay}p (주 5일 기준)입니다.`,
};

const grades = ["Preschool / K", "Grade 1–2", "Grade 3–4", "Grade 5–6", "Grade 7–8", "Grade 9–12"];
const levels = ["기초 (쉬운 편)", "보통 (학년 수준)", "상위 (앞서가는 편)", "잘 모르겠어요"];
// domain — 시험의 과목 계열. 영어 시험에 수학 교재가 추천되지 않도록 사용합니다.
const exams: { v: string; track: string; domain: SubjectDomain }[] = [
  { v: "영어학원 / 학교 레벨테스트", track: "level-test", domain: "english" },
  { v: "국제학교 입학/편입 시험", track: "admissions", domain: "mixed" },
  { v: "SR / STAR Reading", track: "level-test", domain: "english" },
  { v: "MAP Growth", track: "admissions", domain: "mixed" },
  { v: "CAT4", track: "admissions", domain: "mixed" },
  { v: "ISEE", track: "admissions", domain: "mixed" },
  { v: "SSAT", track: "admissions", domain: "mixed" },
  { v: "WIDA", track: "certified-exam", domain: "english" },
  { v: "TOEFL Junior", track: "certified-exam", domain: "english" },
  { v: "UKiset", track: "admissions", domain: "mixed" },
  { v: "ISEB Common Pre-Test", track: "admissions", domain: "mixed" },
  { v: "Digital SAT", track: "certified-exam", domain: "mixed" },
  { v: "AP", track: "ap", domain: "mixed" },
  { v: "IGCSE", track: "us-curriculum", domain: "mixed" },
  { v: "GRE", track: "certified-exam", domain: "mixed" },
  { v: "LSAT", track: "certified-exam", domain: "english" },
  { v: "PTE", track: "certified-exam", domain: "english" },
  { v: "IELTS", track: "certified-exam", domain: "english" },
  { v: "OET", track: "certified-exam", domain: "english" },
  { v: "미국 교과과정 (보충/선행)", track: "us-curriculum", domain: "mixed" },
  { v: "기타 / 잘 모르겠어요", track: "", domain: "mixed" },
];
// weeks — 학습 계획(주당 페이지)을 계산하기 위한 남은 기간. 미정이면 계획을 생략합니다.
const periods = [
  { v: "2주 이내", vol: "40P", weeks: 2 },
  { v: "약 1개월", vol: "60P", weeks: 4 },
  { v: "2~3개월", vol: "100P", weeks: 10 },
  { v: "아직 미정", vol: "60P", weeks: undefined },
];
const areas = [...FOCUS_AREAS];

export default function FindPage() {
  const [f, setF] = useState({ grade: "", level: "", sr: "", exam: "", period: "", areas: [] as string[] });
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [parentEmail, setParentEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const teamSent = useRef(false);

  const selectedPeriod = periods.find((p) => p.v === f.period);
  const recVolume = selectedPeriod?.vol ?? "60P";
  const selectedExam = exams.find((e) => e.v === f.exam);
  const result = done ? recommend(f, selectedExam?.track ?? "", selectedExam?.domain ?? "mixed") : null;
  const rec = result?.best ?? null;
  const plan = studyPlan(recVolume, selectedPeriod?.weeks);
  const suggestCustom = done && (!rec || rec.suggestCustom);
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
      ...(plan ? [`- 학습 계획: ${plan.weeks}주 · 주 ${plan.perWeek}p · 하루 약 ${plan.perDay}p`] : []),
      "",
      "■ 항목별 적합도",
      ...(rec
        ? rec.factors.map(
            (x) => `- [${{ match: "O", partial: "△", miss: "X" }[x.status]}] ${findCopy.factorLabel[x.code]}: ${factorText(x)}`
          )
        : ["- 기존 교재로 커버가 어려워 맞춤 제작을 제안합니다."]),
      ...(result?.alternatives.length
        ? ["", "■ 대안 교재", ...result.alternatives.map((a) => `- ${a.product.titleKo} (${a.score}%)`)]
        : []),
      ...(suggestCustom ? ["", "※ 적합도가 낮습니다. 맞춤 제작 상담이 필요할 수 있습니다."] : []),
      "",
      "■ 상담 안내",
      "- 전문 프랩 선생님 상담 연결이 필요한 고객입니다.",
      `- 200P 장기·심화 패키지(${packageOption.duration}) 안내 대상인지 함께 확인해 주세요.`,
      ...(siteConfig.consultPhone ? [`- 상담 전화: ${siteConfig.consultPhone}`] : []),
      "",
      "이 추천은 자동 생성되었습니다. 상담 시 학생 상황을 한 번 더 확인해 주세요.",
    ].join("\n");
  }

  // 카카오 상담 시 자동 복사되는 메시지
  function kakaoRecMessage(): string {
    return [
      "안녕하세요.",
      "추천 결과를 보고 상담 요청드립니다.",
      "",
      `학년: ${f.grade || "-"}`,
      `시험: ${f.exam || "-"}`,
      `추천 분량: ${recVolume}`,
      `집중 영역: ${f.areas.join(", ") || "-"}`,
      "",
      "이 구성으로 진행해도 될지 상담 부탁드립니다.",
    ].join("\n");
  }

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
          subject: `[Blossom 추천] ${f.grade || "-"} · ${f.exam || "-"} · ${recVolume}${subjectSuffix}`,
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
    setDone(true);
  }

  // 추천 생성 시 팀 이메일로 1회 자동 전송
  useEffect(() => {
    if (!done || teamSent.current) return;
    teamSent.current = true;
    void sendTeam("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function goKakao() {
    try {
      navigator.clipboard?.writeText(kakaoRecMessage());
      setCopied(true);
    } catch {}
    void sendTeam(" · 카카오 클릭", { 이벤트: "카카오 상담 클릭됨" });
    window.open(siteConfig.kakaoChannelUrl, "_blank", "noopener,noreferrer");
  }

  async function sendToParent() {
    if (!parentEmail.trim()) return;
    await sendTeam(" · 이메일 요청", { 학부모_이메일: parentEmail.trim(), 이벤트: "이메일로 추천 받기" });
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
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">Recommended for you</p>

          {/* 매칭된 추천 교재 — 항목별 적합도·구성·학습 계획·대안·200P·상담 */}
          {rec && result && (
            <RecommendationDetail
              rec={rec}
              alternatives={result.alternatives}
              volume={recVolume}
              plan={plan}
              volumeReason={volumeReason}
              hrefBase="/books"
              copy={findCopy}
              onKakao={goKakao}
            />
          )}

          {/* 커스텀 제안 (매칭이 약하거나 특이 조합) */}
          {suggestCustom && (
            <div className="mt-3 border border-burgundy-700/25 bg-burgundy-700/[0.04] p-4">
              <p className="text-[13px] font-medium text-burgundy-700">기존 교재로 딱 맞추기 어려운 조합일 수 있어요.</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">
                학생의 목적과 수준에 맞춰 <Link href="/custom-order" className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2">맞춤 제작</Link>으로
                구성해 드릴 수 있습니다. 상담에서 더 정확하게 맞춰 드립니다.
              </p>
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
            <button
              onClick={() => setEmailOpen((v) => !v)}
              className="inline-flex items-center gap-2 border border-navy-800/25 px-5 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              <Mail size={15} /> 이메일로 추천 받기
            </button>
          </div>

          {copied && (
            <p className="mt-3 flex items-center gap-1.5 text-[12px] text-brass-500">
              <Copy size={12} /> 추천 요약이 복사되었습니다. 카카오톡 채팅창에 붙여넣어 주세요.
            </p>
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
