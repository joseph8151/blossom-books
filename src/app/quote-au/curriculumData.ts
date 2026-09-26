// /quote-au 학년(Year)×과목 목차 데이터. 단원명은 영어만 사용합니다.
// 100P = 핵심 단원 전체, 200P = 100P + "Extra Practice" + "Mixed Review".

export type Year = "F" | "Y1" | "Y2" | "Y3" | "Y4" | "Y5" | "Y6" | "Y7" | "Y8" | "Y9" | "Y10" | "Y11" | "Y12";

export const YEARS: Year[] = ["F", "Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12"];

export const ALL_SUBJECTS = [
  "English",
  "Maths",
  "Science",
  "General Mathematics",
  "Mathematical Methods",
  "Specialist Mathematics",
];

export function enabledSubjectsForYear(year: Year): string[] {
  if (year === "Y11" || year === "Y12") {
    return ["English", "General Mathematics", "Mathematical Methods", "Specialist Mathematics"];
  }
  if (["Y7", "Y8", "Y9", "Y10"].includes(year)) return ["English", "Maths", "Science"];
  return ["English", "Maths"]; // F–Y6
}

export const ENGLISH_TOC: Record<string, string[]> = {
  F: ["Sounds and Letters", "Name Writing", "Sharing a Story"],
  Y1: ["Phonics", "Predictable Texts", "Simple Sentences"],
  Y2: ["Fluency", "Narrative Structure", "Punctuation"],
  Y3: ["Informative Texts", "Paragraphs", "Word Families"],
  Y4: ["Text Structure", "Persuasive Devices", "Dialogue"],
  Y5: ["Figurative Language", "Research Notes", "Editing"],
  Y6: ["Interpretation", "Cohesive Writing", "Audience"],
  Y7: ["Literary and Persuasive Texts", "Topic Sentences", "Vocabulary"],
  Y8: ["Representation", "Analytical Paragraphs", "Citation"],
  Y9: ["Evaluation of Texts", "Argument Structure", "Style"],
  Y10: ["Complex Texts", "Persuasive and Imaginative Writing", "Exam-style Response"],
  Y11: ["Creating and Responding", "Comparison", "Oral to Written"],
  Y12: ["Exam-style Analytical and Creative", "Close Reading", "Crafted Responses"],
};

export const MATHS_TOC: Record<string, string[]> = {
  F: ["Number to 20", "Sort and Classify", "Position"],
  Y1: ["Number to 100", "Add/Sub", "Shapes", "Length"],
  Y2: ["Place Value", "Multiplication as Groups", "Fractions of Collections", "Time"],
  Y3: ["Recall Facts", "Fractions", "Metric Units", "Data Displays"],
  Y4: ["Multiplicative Thinking", "Decimals Intro", "Angles", "Maps"],
  Y5: ["Fraction/Decimal Links", "Patterns", "Volume Capacity"],
  Y6: ["Integers Intro", "Percent", "Cartesian Plane Intro", "Chance"],
  Y7: ["Rational Numbers", "Algebraic Expressions", "Linear Equations", "Geometry"],
  Y8: ["Index Laws Intro", "Rates and Ratios", "Measurement", "Data"],
  Y9: ["Financial Math", "Quadratics Intro", "Pythagoras and Trig Intro", "Probability"],
  Y10: ["Linear and Non-linear Relations", "Geometry Proofs Intro", "Statistics"],
};

const SCIENCE_7_10 = ["Biological Sciences", "Chemical Sciences", "Physical Sciences", "Earth and Space (Year-Specific Elaborations)"];

export const GENERAL_MATHS: Record<string, string[]> = {
  Y11: ["Univariate Data", "Algebra and Matrices", "Shape and Measurement", "Applications"],
  Y12: ["Bivariate Data", "Networks", "Time and Finance", "Growth"],
};

export const METHODS_MATHS: Record<string, string[]> = {
  Y11: ["Functions", "Derivatives Intro", "Discrete Probability", "Growth and Decay"],
  Y12: ["Calculus", "Continuous Probability", "Functions Review"],
};

export const SPECIALIST_MATHS: Record<string, string[]> = {
  Y11: ["Combinatorics", "Vectors", "Proof", "Circular Functions"],
  Y12: ["Complex Numbers", "Mechanics / Further Calculus", "Statistical Inference (State Options on Request)"],
};

export function resolveToc(year: Year, subject: string): string[] {
  if (subject === "English") return ENGLISH_TOC[year] ?? [];
  if (subject === "Maths") return MATHS_TOC[year] ?? [];
  if (subject === "Science") return SCIENCE_7_10;
  if (subject === "General Mathematics") return GENERAL_MATHS[year] ?? [];
  if (subject === "Mathematical Methods") return METHODS_MATHS[year] ?? [];
  if (subject === "Specialist Mathematics") return SPECIALIST_MATHS[year] ?? [];
  return [];
}
