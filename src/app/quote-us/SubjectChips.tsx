"use client";

import { useState } from "react";

const EXTRA_200P = ["Extra practice", "Mixed review"];

const ENGLISH_TOC: Record<string, string[]> = {
  G1: ["Letter sounds & phonics", "Sight words", "Simple sentences", "Picture captions", "Basic punctuation"],
  G2: ["Short vowels/blends", "High-frequency words", "Two-sentence texts", "Who/what/where", "Capitalization"],
  G3: ["Paragraph reading", "Main idea", "Context clues", "Nouns/verbs/adjectives", "Complete sentences"],
  G4: [
    "Multi-paragraph texts",
    "Main idea & details",
    "Inference basics",
    "Grammar conventions",
    "Short constructed response",
  ],
  G5: ["Informational texts", "Inference", "Vocabulary in context", "Sentence combining", "Opinion paragraph"],
  G6: ["Literary & informational passages", "Evidence", "Academic vocabulary", "Clauses", "Structured paragraph"],
  G7: ["Longer passages", "Argument claims", "Vocabulary in context", "Conventions", "Short essay outline"],
  G8: ["Complex texts", "Author's purpose", "Precise vocabulary", "Grammar accuracy", "Multi-paragraph writing"],
  G9: ["High-school passages", "Rhetoric basics", "Academic vocabulary", "Conventions", "Thesis + support"],
  G10: ["Close reading", "Claims & counterclaims", "Tone/word choice", "Advanced conventions", "Essay structure"],
  G11: [
    "Rhetorical analysis",
    "Synthesis of details",
    "College-ready vocabulary",
    "Editing",
    "Timed writing outline",
  ],
  G12: [
    "College-prep passages",
    "Argument & analysis",
    "Precise diction",
    "Editing for clarity",
    "Extended writing outline",
  ],
};

const MATH_TOC: Record<string, string[]> = {
  G1: ["Counting", "Addition within 20", "Subtraction within 20", "Place value to 100", "Shapes", "Word problems"],
  G2: [
    "Place value to 1000",
    "Add/subtract within 100",
    "Intro multiplication ideas",
    "Measurement",
    "Data",
    "Word problems",
  ],
  G3: ["Multiplication", "Division", "Fractions intro", "Area", "Two-step word problems"],
  G4: ["Multi-digit operations", "Equivalent fractions", "Decimals intro", "Angle basics", "Multi-step word problems"],
  G5: ["Fraction operations", "Decimals", "Volume", "Coordinate plane intro", "Expression basics"],
  G6: ["Ratios", "Fractions/decimals/percent", "Integers", "Intro equations", "Area/volume", "Statistics intro"],
  G7: ["Proportional relationships", "Rational numbers", "Expressions & equations", "Geometry", "Probability"],
  G8: ["Linear equations", "Functions intro", "Systems intro", "Pythagorean theorem", "Volume"],
  G9: ["Algebra 1 bridge — linear equations", "Inequalities", "Functions", "Systems", "Word problems"],
  G10: ["Geometry bridge — angles", "Triangles", "Similarity", "Area/volume", "Coordinate geometry"],
  G11: ["Algebra 2 bridge — quadratics", "Exponentials", "Functions", "Sequences"],
  G12: ["Precalculus bridge — functions", "Trigonometry", "Exponential/log", "Graphs"],
};

interface FixedPanel {
  key: string;
  title: string;
  p100: string[];
  kakaoLine: string;
  isAP?: boolean;
}

const FIXED_PANELS: FixedPanel[] = [
  {
    key: "Geometry",
    title: "Geometry",
    p100: ["Lines & angles", "Triangles", "Congruence & similarity", "Area & perimeter", "Circles", "Coordinate geometry"],
    kakaoLine: "카톡에 적을 말: Geometry · 100P/200P/Special",
  },
  {
    key: "Algebra 1",
    title: "Algebra 1",
    p100: ["Real numbers", "Linear equations", "Inequalities", "Systems", "Linear functions", "Word problems"],
    kakaoLine: "카톡에 적을 말: Algebra 1 · 100P/200P/Special",
  },
  {
    key: "Algebra 2",
    title: "Algebra 2",
    p100: ["Quadratics", "Polynomials", "Rational expressions", "Exponential & log", "Sequences"],
    kakaoLine: "카톡에 적을 말: Algebra 2 · 100P/200P/Special",
  },
  {
    key: "Precalculus",
    title: "Precalculus",
    p100: ["Functions", "Trigonometry", "Exponential & log", "Sequences", "Graphs"],
    kakaoLine: "카톡에 적을 말: Precalculus · 100P/200P/Special",
  },
  {
    key: "Calculus",
    title: "Calculus",
    p100: ["Limits & continuity", "Derivatives", "Applications of derivatives", "Integrals"],
    kakaoLine: "카톡에 적을 말: Calculus · 100P/200P/Special",
  },
  {
    key: "AP",
    title: "AP",
    p100: [],
    kakaoLine: "카톡에 적을 말: AP · 과목명 · 100P/200P/Special",
    isAP: true,
  },
];

const DEFAULT_DISCLAIMER = "비공식 대비 교재입니다.";
const AP_DISCLAIMER = "비공식 대비 교재이며, College Board와 무관합니다.";
const SPECIAL_TEXT =
  "해당 과목 200P 목차와 문항은 같습니다. 푸는 순서, 모의 2회, 오답지, 카톡 글 상담 30분을 더합니다.";

const chipCls =
  "shrink-0 whitespace-nowrap rounded-full border border-ivory-300 bg-ivory-100 px-4 py-1.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900 hover:bg-navy-950 hover:text-ivory-100";
const chipActiveCls =
  "shrink-0 whitespace-nowrap rounded-full border border-navy-900 bg-navy-950 px-4 py-1.5 text-[12.5px] font-medium text-ivory-100 transition-colors";

function UnitList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1 text-[12.5px] leading-relaxed text-charcoal-600">
      {items.map((item) => (
        <li key={item}>· {item}</li>
      ))}
    </ul>
  );
}

function PanelShell({
  header,
  p100,
  p200,
  kakaoLine,
  disclaimer,
  isAP,
}: {
  header: string;
  p100: string[];
  p200: string[];
  kakaoLine: string;
  disclaimer: string;
  isAP?: boolean;
}) {
  return (
    <div className="mt-4 rounded-xl border border-ivory-300 bg-ivory-100 p-6">
      <p className="font-display text-[16px] font-semibold text-navy-950">{header}</p>

      {isAP ? (
        <p className="mt-4 text-[12.5px] leading-relaxed text-charcoal-600">
          과목마다 정해진 목차를 미리 만들어 두지 않습니다. 카톡에 AP 과목명을 먼저 적어 주시면 해당 과목
          출제 범위에 맞춰 100P/200P 구성을 안내해 드립니다.
        </p>
      ) : (
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-[12.5px] font-medium text-navy-950">100P TOC</p>
            <UnitList items={p100} />
          </div>
          <div>
            <p className="text-[12.5px] font-medium text-navy-950">200P TOC</p>
            <p className="mt-2 text-[11.5px] italic text-charcoal-600/70">All 100P units above, plus:</p>
            <UnitList items={p200} />
          </div>
        </div>
      )}

      <div className="mt-5 border-t border-ivory-300 pt-4">
        <p className="text-[13.5px] font-medium text-navy-950">Special</p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{SPECIAL_TEXT}</p>
      </div>

      <div className="mt-5 border-t border-ivory-300 pt-4">
        <p className="text-[12.5px] leading-relaxed text-charcoal-600">{kakaoLine}</p>
      </div>

      <p className="mt-4 text-[11.5px] leading-relaxed text-charcoal-600/60">{disclaimer}</p>
    </div>
  );
}

export default function SubjectChips({ grades, subjects }: { grades: string[]; subjects: string[] }) {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [openSubject, setOpenSubject] = useState<string | null>(null);

  const fixedByKey = new Map(FIXED_PANELS.map((p) => [p.key, p]));
  const isGradeSubject = openSubject === "English" || openSubject === "Math";

  return (
    <div>
      {/* 학년 칩 */}
      <div className="mt-4 first:mt-0">
        <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">Grade</p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          {grades.map((g) => {
            const isActive = selectedGrade === g;
            return (
              <button
                key={g}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedGrade((prev) => (prev === g ? null : g))}
                className={isActive ? chipActiveCls : chipCls}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* 과목 칩 */}
      <div className="mt-4">
        <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">Subject</p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          {subjects.map((s) => {
            const isActive = openSubject === s;
            return (
              <button
                key={s}
                type="button"
                aria-expanded={isActive}
                onClick={() => setOpenSubject((prev) => (prev === s ? null : s))}
                className={isActive ? chipActiveCls : chipCls}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* 패널 */}
      {openSubject && isGradeSubject && !selectedGrade && (
        <div className="mt-4 rounded-xl border border-ivory-300 bg-ivory-100 p-6">
          <p className="text-[13.5px] font-medium text-navy-950">Select a grade first (G1–G12)</p>
        </div>
      )}

      {openSubject && isGradeSubject && selectedGrade && (
        <PanelShell
          header={`${openSubject} — ${selectedGrade}`}
          p100={(openSubject === "English" ? ENGLISH_TOC : MATH_TOC)[selectedGrade]}
          p200={EXTRA_200P}
          kakaoLine={`카톡에 적을 말: 미국교과 ${openSubject} · ${selectedGrade} · 100P/200P/Special`}
          disclaimer={DEFAULT_DISCLAIMER}
        />
      )}

      {openSubject && !isGradeSubject && fixedByKey.has(openSubject) && (
        <PanelShell
          header={fixedByKey.get(openSubject)!.title}
          p100={fixedByKey.get(openSubject)!.p100}
          p200={EXTRA_200P}
          kakaoLine={fixedByKey.get(openSubject)!.kakaoLine}
          disclaimer={fixedByKey.get(openSubject)!.isAP ? AP_DISCLAIMER : DEFAULT_DISCLAIMER}
          isAP={fixedByKey.get(openSubject)!.isAP}
        />
      )}
    </div>
  );
}
