"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, formatKRW } from "@/data/pricing";

interface IbProduct {
  id: string;
  title: string;
  titleKo: string;
  priced: boolean; // 100/200/300P 단가 적용 여부 — false면 상담 문의
  note?: string;
}

interface IbCategory {
  key: string;
  label: string;
  labelKo: string;
  items: IbProduct[];
}

const CATEGORIES: IbCategory[] = [
  {
    key: "A",
    label: "Subject Topic Workbooks",
    labelKo: "과목별 토픽 문제집",
    items: [
      { id: "aa-sl", title: "Math AA SL Topic Question Bank for IB Students", titleKo: "Math AA SL 토픽 문제집", priced: true },
      { id: "aa-hl", title: "Math AA HL Practice Book (IB-style)", titleKo: "Math AA HL 토픽 문제집", priced: true, note: "해설은 M1/A1 등 채점 표기 방식으로 제공합니다." },
      { id: "ai", title: "Math AI Practice Workbook for IB Students", titleKo: "Math AI SL/HL 문제집", priced: true },
      { id: "chem", title: "Chemistry Topic Questions for IB Students", titleKo: "Chemistry SL/HL 문제집", priced: true },
      { id: "bio", title: "Biology Question Bank (IB-style)", titleKo: "Biology SL/HL 문제집", priced: true },
      { id: "phys", title: "Physics Practice Workbook for IB Students", titleKo: "Physics SL/HL 문제집", priced: true },
      { id: "econ", title: "Economics Short & Data Response Questions", titleKo: "Economics 문제집", priced: true },
      { id: "busi", title: "Business Management Case Study Practice", titleKo: "Business Management 문제집", priced: true },
    ],
  },
  {
    key: "B",
    label: "Mock Exams",
    labelKo: "모의고사",
    items: [
      { id: "aa-mock", title: "Math AA HL Mock Exams, Paper 1 & 2 (IB-style)", titleKo: "Math AA Paper 1·2 모의고사", priced: false },
      { id: "sci-mock", title: "Chemistry SL Paper 2 Mock Exams", titleKo: "이과 과목 Paper 2 모의고사 (Chem/Bio/Phys)", priced: false },
      { id: "enga-mock", title: "English A Paper 1 Practice Passages", titleKo: "English A Paper 1 (Textual Analysis) 연습", priced: false },
    ],
  },
  {
    key: "C",
    label: "Core Guides",
    labelKo: "코어 과제 가이드",
    items: [
      { id: "ia-guide", title: "Math IA Guide: Topic Ideas & Checklist", titleKo: "IA 가이드 (과목별)", priced: false, note: "30~40페이지" },
      { id: "ee-guide", title: "Extended Essay Planner & Topic Ideas", titleKo: "EE(Extended Essay) 가이드", priced: false },
      { id: "tok-guide", title: "TOK Essay & Exhibition Guide", titleKo: "TOK 에세이·전시(Exhibition) 가이드", priced: false },
      { id: "cas-guide", title: "CAS Reflection Journal & Planner", titleKo: "CAS 포트폴리오 템플릿", priced: false },
    ],
  },
  {
    key: "D",
    label: "Starter & Companion",
    labelKo: "저가 입문·보조 상품",
    items: [
      { id: "command-terms", title: "IB Command Terms Cheat Sheet with Examples", titleKo: "Command Terms 가이드", priced: false, note: "15페이지 내외 · 무료 샘플용" },
      { id: "formula-summary", title: "Math AA Formula & Concept Summary", titleKo: "과목별 공식·개념 요약", priced: false },
      { id: "flashcards", title: "Biology Key Terms Flashcards (PDF)", titleKo: "단어·용어 플래시카드 (과목별)", priced: false },
    ],
  },
  {
    key: "E",
    label: "Extended Line",
    labelKo: "확장 라인",
    items: [
      { id: "myp", title: "MYP Math / Science Practice Book", titleKo: "MYP 대비 문제집 (Grade 6–10)", priced: false },
      { id: "bridge", title: "Bridge Workbook for Students Entering IB DP", titleKo: "DP 입학 준비·브리지 북 (G10→G11)", priced: false },
    ],
  },
];

const FIRST_TO_BUILD = ["aa-hl", "aa-sl", "ia-guide", "command-terms"];

const volumes = [
  ...flexibleVolumes.filter((v) => v.pages === 100 || v.pages === 200),
  { pages: 300, label: "300P", priceKRW: 390000 },
];

const catTabCls =
  "shrink-0 whitespace-nowrap border border-ivory-300 bg-white px-4 py-2 text-[13px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const catTabActiveCls =
  "shrink-0 whitespace-nowrap border border-navy-900 bg-navy-950 px-4 py-2 text-[13px] font-medium text-ivory-100";

const itemBtnCls =
  "w-full border border-ivory-300 bg-white px-4 py-3 text-left text-[13px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const itemBtnActiveCls =
  "w-full border border-navy-900 bg-ivory-200/60 px-4 py-3 text-left text-[13px] font-medium text-navy-950";

export default function IbChips() {
  const [catKey, setCatKey] = useState(CATEGORIES[0].key);
  const category = CATEGORIES.find((c) => c.key === catKey)!;
  const [selectedId, setSelectedId] = useState(category.items[0].id);

  function selectCategory(key: string) {
    setCatKey(key);
    const cat = CATEGORIES.find((c) => c.key === key)!;
    setSelectedId(cat.items[0].id);
  }

  const item = category.items.find((i) => i.id === selectedId) ?? category.items[0];
  const isFirstToBuild = FIRST_TO_BUILD.includes(item.id);

  return (
    <div className="mt-8">
      {/* 카테고리 탭 */}
      <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={catKey === c.key}
            onClick={() => selectCategory(c.key)}
            className={catKey === c.key ? catTabActiveCls : catTabCls}
          >
            {c.key}. {c.labelKo}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11.5px] text-charcoal-600/70">{category.label}</p>

      {/* 상품 목록 */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {category.items.map((i) => (
          <button
            key={i.id}
            type="button"
            aria-pressed={selectedId === i.id}
            onClick={() => setSelectedId(i.id)}
            className={selectedId === i.id ? itemBtnActiveCls : itemBtnCls}
          >
            {i.titleKo}
            {FIRST_TO_BUILD.includes(i.id) && (
              <span className="ml-2 font-label text-[9px] uppercase tracking-[0.1em] text-brass-500">1순위</span>
            )}
          </button>
        ))}
      </div>

      {/* 선택된 상품 상세 */}
      <div className="mt-5 rounded-xl border border-ivory-300 bg-ivory-100 p-6">
        {isFirstToBuild && (
          <span className="inline-flex items-center gap-1 border border-brass-500/40 bg-brass-500/10 px-2 py-0.5 font-label text-[9.5px] uppercase tracking-[0.1em] text-brass-500">
            먼저 만들 1순위 상품
          </span>
        )}
        <p className="mt-2 font-display text-[17px] font-semibold text-navy-950">{item.titleKo}</p>
        <p className="mt-1 text-[13px] text-charcoal-600">{item.title}</p>
        {item.note && <p className="mt-2 text-[12px] text-charcoal-600/80">{item.note}</p>}

        {item.priced ? (
          <>
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {volumes.map((v) => (
                <div key={v.pages} className="border border-ivory-300 bg-white p-3.5 text-center">
                  <p className="font-display text-[16px] font-semibold text-navy-950">{v.label}</p>
                  <p className="mt-1 text-[13px] font-medium text-navy-950">{formatKRW(v.priceKRW)}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11.5px] leading-relaxed text-charcoal-600/70">
              Unofficial 자체 출제 — 기출문제·공식 Markscheme을 쓰지 않고 전부 새로 출제합니다.
            </p>
          </>
        ) : (
          <p className="mt-4 font-display text-[15px] font-semibold text-burgundy-700">
            별도 구성 상담 (가격 문의)
          </p>
        )}

        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-navy-900 px-6 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={15} /> {item.titleKo} 카톡 문의
        </a>
      </div>
    </div>
  );
}
