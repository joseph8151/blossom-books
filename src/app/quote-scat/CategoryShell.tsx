"use client";

import { useState } from "react";
import ExamSelector from "./ExamSelector";

type Category = "all" | "cognitive" | "competition";

const tabCls =
  "shrink-0 whitespace-nowrap rounded-full border border-ivory-300 bg-white px-4 py-2 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const tabActiveCls =
  "shrink-0 whitespace-nowrap rounded-full border border-navy-900 bg-navy-950 px-4 py-2 text-[12.5px] font-medium text-ivory-100 transition-colors";

const GRADES = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

export default function CategoryShell() {
  const [category, setCategory] = useState<Category>("all");

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        <button type="button" onClick={() => setCategory("all")} className={category === "all" ? tabActiveCls : tabCls}>
          전체
        </button>
        <button
          type="button"
          onClick={() => setCategory("cognitive")}
          className={category === "cognitive" ? tabActiveCls : tabCls}
        >
          사고력·영재 검사
        </button>
        <button
          type="button"
          onClick={() => setCategory("competition")}
          className={category === "competition" ? tabActiveCls : tabCls}
        >
          수학 경시대회
        </button>
      </div>

      {/* 사고력·영재 검사 — 공식 Level/학년 구분만 있고, Blossom Books의 난이도 단계는 없습니다 */}
      <div className={category === "all" || category === "cognitive" ? "mt-8" : "hidden"}>
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
          Gifted & Cognitive Assessment
        </p>
        <h2 className="mt-2 font-display text-[20px] font-semibold text-navy-950">사고력·영재 검사</h2>
        <p className="mt-2 max-w-[680px] text-[13px] leading-relaxed text-charcoal-600">
          영재 프로그램(GT) 진단·선발 및 학교 배치에 활용되는 사고력 검사입니다. 아래 Level·학년 구분은 각
          시험의 공식 구분이며, Blossom Books가 임의로 만든 난이도 단계가 아닙니다. 별도의 심화(Advanced)
          구성은 제공하지 않고 기본 구성만 판매합니다.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <ExamSelector
            id="scat"
            title="SCAT"
            levels={["Elementary", "Intermediate", "Advanced"]}
            levelLabel="Level (공식 구분)"
            standardDesc="SCAT(School and College Ability Test)는 영재 프로그램 진단에 활용되는 사고력 검사로, Verbal과 Quantitative 두 영역의 추론 능력을 연습합니다. 여기서 Advanced는 SCAT 자체의 공식 Level 이름이며, Blossom Books가 추가한 난이도 단계가 아닙니다."
            ctaLabel="SCAT 구성 상담"
          />
          <ExamSelector
            id="cogat"
            title="CogAT"
            levels={GRADES}
            levelLabel="Grade"
            standardDesc="Cognitive Abilities Test 유형에 맞춘 Verbal · Quantitative · Nonverbal 영역 연습 구성입니다. 학년에 맞는 Level로 구성하며, 정확한 공식 Level 번호는 상담에서 확인합니다."
            ctaLabel="CogAT 구성 상담"
          />
          <ExamSelector
            id="nnat"
            title="NNAT"
            levels={GRADES}
            levelLabel="Grade"
            standardDesc="Naglieri Nonverbal Ability Test 유형에 맞춘 비언어적 추론 연습 구성입니다. 학년에 맞는 Level로 구성하며, 정확한 공식 Level(A~G)은 상담에서 확인합니다."
            ctaLabel="NNAT 구성 상담"
          />
          <ExamSelector
            id="olsat"
            title="OLSAT"
            levels={GRADES}
            levelLabel="Grade"
            standardDesc="Otis-Lennon School Ability Test 유형에 맞춘 언어·비언어 학업적성 연습 구성입니다. 학년에 맞는 Level로 구성하며, 정확한 공식 Level(A~G)은 상담에서 확인합니다."
            ctaLabel="OLSAT 구성 상담"
          />
        </div>
      </div>

      {/* 수학 경시대회 — Standard/Advanced Practice로 난이도를 나눕니다 */}
      <div className={category === "all" || category === "competition" ? "mt-14" : "hidden"}>
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">Math Competition</p>
        <h2 className="mt-2 font-display text-[20px] font-semibold text-navy-950">수학 경시대회</h2>
        <p className="mt-2 max-w-[680px] text-[13px] leading-relaxed text-charcoal-600">
          미국 수학 경시대회 대비 문제집입니다. STANDARD는 대회 전체 유형을 준비하는 기본 구성이고, ADVANCED
          PRACTICE는 같은 대회 안에서 더 높은 난이도의 문제를 추가로 연습하는 Blossom Books의 구성입니다 —
          대회 자체의 공식 등급이 아닙니다.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <ExamSelector
            id="amc"
            title="AMC"
            levels={["8", "10", "12"]}
            levelLabel="Division (공식 구분: AMC 8 / AMC 10 / AMC 12)"
            hasStage
            standardDesc="American Mathematics Competitions 전체 문제 유형을 대비하는 기본 구성입니다."
            advancedDesc="같은 Division 안에서 더 높은 난이도의 문제와 변형 문제를 추가로 연습합니다."
            advancedNote="Advanced Practice는 AMC의 공식 등급이 아니라 Blossom Books의 심화 연습 구성입니다."
            ctaLabel="AMC 구성 상담"
          />
          <ExamSelector
            id="mathcounts"
            title="MATHCOUNTS"
            hasStage
            standardDesc="중학생 대상 MATHCOUNTS 대회 전체 유형을 대비하는 기본 구성입니다."
            advancedDesc="더 높은 난이도의 문제와 변형 문제를 추가로 연습합니다."
            advancedNote="Advanced Practice는 MATHCOUNTS의 공식 등급이 아니라 Blossom Books의 심화 연습 구성입니다."
            ctaLabel="MATHCOUNTS 구성 상담"
          />
          <ExamSelector
            id="moems"
            title="MOEMS"
            levels={["Division E", "Division M"]}
            levelLabel="Division (공식 구분)"
            hasStage
            standardDesc="Math Olympiads for Elementary and Middle Schools 전체 유형을 대비하는 기본 구성입니다."
            advancedDesc="같은 Division 안에서 더 높은 난이도의 문제를 추가로 연습합니다."
            advancedNote="Advanced Practice는 MOEMS의 공식 등급이 아니라 Blossom Books의 심화 연습 구성입니다."
            ctaLabel="MOEMS 구성 상담"
          />
        </div>
      </div>
    </div>
  );
}
