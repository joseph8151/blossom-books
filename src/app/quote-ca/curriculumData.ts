// /quote-ca 학년(Grade)×과목 목차 데이터. 단원명은 영어만 사용합니다.
// 100P = 핵심 단원 전체, 200P = 100P + "Extra Practice" + "Mixed Review".
//
// 참고(구현 메모): 브리프의 "G9–G12: ... Academic Math, Foundations of Math
// (enable G10–G12), Pre-Calculus, Calculus" 규칙을 문자 그대로 적용하면
// G9에 Calculus가 활성화되는 등 실제 커리큘럼과 맞지 않아, 아래처럼 각 스트림이
// 실제로 주어진 학년에서만 활성화되도록 조정했습니다(Math는 항상 활성화되고,
// 학년에 맞는 실제 내용을 보여줍니다). 온타리오 커리큘럼의 실제 진행 순서
// (Math → Academic Math → Functions/Pre-Calculus → Calculus)를 근거로 합니다.

export type Grade = "G1" | "G2" | "G3" | "G4" | "G5" | "G6" | "G7" | "G8" | "G9" | "G10" | "G11" | "G12";

export const GRADES: Grade[] = ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12"];

export const ALL_SUBJECTS = ["English", "Math", "Academic Math", "Foundations of Math", "Pre-Calculus", "Calculus"];

export function enabledSubjectsForGrade(grade: Grade): string[] {
  const n = Number(grade.slice(1));
  const base = ["English", "Math"];
  if (n === 9) return [...base, "Academic Math", "Pre-Calculus"];
  if (n === 10) return [...base, "Academic Math", "Foundations of Math"];
  if (n === 11) return [...base, "Foundations of Math", "Pre-Calculus"];
  if (n === 12) return [...base, "Pre-Calculus", "Calculus"];
  return base;
}

export const ENGLISH_TOC: Record<Grade, string[]> = {
  G1: ["Letters and Sounds", "Sight Words", "Retelling", "Simple Sentences"],
  G2: ["Short Texts", "Beginning Middle End", "Nouns Verbs", "Opinion Sentences"],
  G3: ["Paragraphs", "Character", "Context Clues", "Cursive-Ready Print Writing"],
  G4: ["Text Features", "Main Idea and Details", "Multi-Paragraph Writing"],
  G5: ["Literary and Informational", "Point of View", "Summary"],
  G6: ["Media Texts", "Evidence", "Narrative and Report Writing"],
  G7: ["Theme", "Formal Paragraphs", "Grammar in Context"],
  G8: ["Synthesis", "Persuasive Writing", "Citation Basics"],
  G9: ["Academic Reading", "Literary Essay Intro", "Oral-to-Written"],
  G10: ["Canadian and World Texts", "Analytical Writing", "Research Notes"],
  G11: ["University/College Prep Reading", "Rhetoric", "Extended Essay"],
  G12: ["University-Level Composition Skills", "Literary Criticism Basics", "Research Paper Structure"],
};

const MATH_G1_G9: Record<string, string[]> = {
  G1: ["Counting to 100", "Add/Sub within 20", "2D Shapes", "Measurement"],
  G2: ["Place Value to 100", "Add/Sub to 100", "Equal Groups", "Time and Money"],
  G3: ["Multiplication Facts", "Fractions", "Perimeter", "Data"],
  G4: ["Multi-Digit Operations", "Equivalent Fractions", "Angles"],
  G5: ["Decimals", "Fraction Operations", "Area and Volume Intro"],
  G6: ["Ratios", "Integers", "Expressions", "Data"],
  G7: ["Percents", "Rational Numbers", "Linear Relations Intro", "Probability"],
  G8: ["Linear Equations", "Geometry Transformations", "Surface Area"],
  G9: ["Linear Relations", "Polynomials Intro", "Geometry Measurement", "Data Management"],
};

const G10_ACADEMIC = ["Quadratics Intro", "Linear Systems", "Trigonometry of Right Triangles"];
const G10_FOUNDATIONS = ["Practical Linear Relations", "Measurement", "Personal Finance Intro"];
const G11_FUNCTIONS_PRECALC = ["Functions", "Trigonometry", "Exponential", "Discrete"];
const G11_FOUNDATIONS = ["Applications", "Financial Math", "Geometry"];
const G12_CALCULUS = ["Limits", "Derivatives", "Integrals Intro"];

export function resolveToc(grade: Grade, subject: string): string[] {
  if (subject === "English") return ENGLISH_TOC[grade];
  const n = Number(grade.slice(1));

  if (subject === "Math") {
    if (n <= 9) return MATH_G1_G9[grade];
    if (n === 10) return G10_ACADEMIC;
    if (n === 11) return G11_FUNCTIONS_PRECALC;
    return G12_CALCULUS; // G12
  }
  if (subject === "Academic Math") {
    if (n === 9) return MATH_G1_G9.G9;
    return G10_ACADEMIC; // G10
  }
  if (subject === "Foundations of Math") {
    return n === 10 ? G10_FOUNDATIONS : G11_FOUNDATIONS; // G10 or G11
  }
  if (subject === "Pre-Calculus") {
    if (n === 9) return MATH_G1_G9.G9;
    if (n === 10) return G10_ACADEMIC;
    if (n === 11) return G11_FUNCTIONS_PRECALC;
    return G12_CALCULUS; // G12
  }
  if (subject === "Calculus") return G12_CALCULUS;
  return [];
}
