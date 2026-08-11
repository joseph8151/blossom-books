"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Sparkles, ArrowRight, Copy } from "lucide-react";
import { siteConfig } from "@/data/site";

const grades = ["Preschool / K", "Grade 1–2", "Grade 3–4", "Grade 5–6", "Grade 7–8", "Grade 9–12"];
const levels = ["기초 (쉬운 편)", "보통 (학년 수준)", "상위 (앞서가는 편)", "잘 모르겠어요"];
const exams = [
  { v: "영어학원 레벨테스트", track: "level-test" },
  { v: "국제학교 입학/편입", track: "admissions" },
  { v: "SR / Reading Level", track: "level-test" },
  { v: "MAP", track: "admissions" },
  { v: "CAT4", track: "admissions" },
  { v: "미국 교과과정 (학교 보충/선행)", track: "us-curriculum" },
  { v: "SAT", track: "certified-exam" },
  { v: "AP", track: "ap" },
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
          <p className="mt-2 font-display text-[20px] font-semibold text-navy-950">
            추천 분량: {recVolume}
            {f.areas.length > 0 && <span className="text-charcoal-600"> · {f.areas.join(" · ")} 집중</span>}
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-charcoal-600">
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
