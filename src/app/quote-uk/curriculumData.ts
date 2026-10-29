// /quote-uk 학년(Year)×과목 목차 데이터. 단원명은 영어만 사용합니다.
// 100P = 핵심 단원 전체, 200P = 100P + "Extra Practice" + "Mixed Review".

export type Year =
  | "Y1" | "Y2" | "Y3" | "Y4" | "Y5" | "Y6" | "Y7" | "Y8" | "Y9" | "Y10" | "Y11"
  | "AS" | "A2" | "11+" | "ISEB" | "UKiset";

export const YEARS: Year[] = ["Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "AS", "A2", "11+", "ISEB", "UKiset"];

// 이 나라에서 등장 가능한 전체 과목 목록(항상 노출, 해당 없는 학년에서는 disabled)
export const ALL_SUBJECTS = [
  "English",
  "Maths",
  "Science",
  "English Language",
  "English Literature",
  "Combined Science",
  "Further Maths",
  "VR",
  "NVR",
  "Verbal",
  "Non-Verbal",
  "Reading",
];

export function enabledSubjectsForYear(year: Year): string[] {
  if (["Y1", "Y2", "Y3", "Y4", "Y5", "Y6"].includes(year)) return ["English", "Maths"];
  if (["Y7", "Y8", "Y9"].includes(year)) return ["English", "Maths", "Science"];
  if (year === "Y10" || year === "Y11") return ["English Language", "English Literature", "Maths", "Combined Science"];
  if (year === "AS" || year === "A2") return ["English Literature", "Maths", "Further Maths"];
  if (year === "11+") return ["English", "Maths", "VR", "NVR"];
  if (year === "ISEB") return ["English", "Maths"];
  return ["Verbal", "Non-Verbal", "Maths", "Reading"]; // UKiset
}

// English (Y1–Y9는 학년마다 다름)
const ENGLISH_Y: Record<string, string[]> = {
  Y1: ["Phonics", "Caption and Sentence Writing", "Simple Stories", "Capital Letters"],
  Y2: ["Decoding Fluency", "Sequencing", "Nouns and Verbs", "Writing Short Narratives"],
  Y3: ["Chapter Extracts", "Inference", "Paragraphs", "Conjunctions"],
  Y4: ["Fronted Adverbials", "Theme", "Non-chronological Reports", "Dialogue"],
  Y5: ["Figurative Language", "Relative Clauses", "Balanced Arguments", "Evidence from Text"],
  Y6: ["SATs-style Comprehension", "SPAG Review", "Formal Writing", "Summary"],
  Y7: ["Fiction and Non-fiction", "Topic Sentences", "Analytical Paragraphs", "Vocabulary in Context"],
  Y8: ["Shakespeare Extract Skills", "Comparison", "Rhetoric Basics", "Creative Writing"],
  Y9: ["Pre-GCSE Analysis", "Unseen Poetry Skills", "Transactional Writing"],
  "11+": ["Comprehension", "Inference", "Creative Writing", "SPAG"],
  ISEB: ["Common Pre-Test / CE Style Drills Matching Year"],
};

const ENGLISH_LANGUAGE_GCSE = ["Paper 1 Fiction Reading/Writing", "Paper 2 Non-fiction", "SPaG Accuracy"];

const ENGLISH_LITERATURE: Record<string, string[]> = {
  GCSE: ["Shakespeare", "19th-Century Novel", "Modern Text", "Poetry Anthology / Unseen"],
  ALEVEL: ["Set-text Analysis", "Comparative Coursework Skills", "Unseen Prose/Poetry", "Academic Essay Structure"],
};

const MATHS_Y: Record<string, string[]> = {
  Y1: ["Number to 20", "Addition/Subtraction", "Shapes", "Measures"],
  Y2: ["Number to 100", "Multiplication as Arrays", "Fractions of Shapes", "Money and Time"],
  Y3: ["Column Addition/Subtraction", "Times Tables", "Unit Fractions", "Perimeter"],
  Y4: ["Up to 4-digit Numbers", "Decimals Intro", "Area", "Coordinates"],
  Y5: ["Multi-step Problems", "Fractions and Decimals", "Prime Numbers", "Volume"],
  Y6: ["SATs Arithmetic and Reasoning", "Ratio Intro", "Algebra Intro", "Statistics"],
  Y7: ["Number and Calculation", "Fractions Decimals Percents", "Expressions", "Angles"],
  Y8: ["Ratio and Proportion", "Linear Graphs", "Probability", "Area and Volume"],
  Y9: ["Foundation/Higher Split Prep", "Quadratics Intro", "Pythagoras", "Standard Form"],
  "11+": ["Number", "Word Problems", "Fractions and Decimals", "Shape and Space", "Data"],
  ISEB: ["Common Pre-Test / CE Style Drills Matching Year"],
};

const MATHS_GCSE = ["Number", "Algebra", "Ratio Proportion Rates", "Geometry and Measures", "Probability", "Statistics"];
const MATHS_ALEVEL = ["Pure (Algebra, Trig, Calculus Intro)", "Statistics", "Mechanics"];
const FURTHER_MATHS = ["Complex Numbers", "Matrices", "Further Calculus", "Further Mechanics/Statistics (Inquire for Option Modules)"];

const SCIENCE_LOWER_SECONDARY = ["Cells and Organisation", "Particles", "Forces and Motion", "Ecosystems", "Earth and Atmosphere"];
const COMBINED_SCIENCE_GCSE = ["Biology: Cells/Infection/Bioenergetics", "Chemistry: Atomic Structure/Bonding/Quantitative", "Physics: Energy/Electricity/Forces (Exam Board on Request)"];

const VR_11PLUS = ["Synonyms and Antonyms", "Analogies", "Codes", "Logic"];
const NVR_11PLUS = ["Sequences", "Matrices", "Odd One Out", "Spatial"];
const UKISET_SHARED = ["Verbal", "Non-verbal", "Quantitative", "Reading Comprehension"];

export function resolveToc(year: Year, subject: string): string[] {
  if (year === "UKiset") return UKISET_SHARED;
  if (subject === "English") return ENGLISH_Y[year] ?? [];
  if (subject === "Maths") {
    if (year === "Y10" || year === "Y11") return MATHS_GCSE;
    if (year === "AS" || year === "A2") return MATHS_ALEVEL;
    return MATHS_Y[year] ?? [];
  }
  if (subject === "Science") return SCIENCE_LOWER_SECONDARY;
  if (subject === "English Language") return ENGLISH_LANGUAGE_GCSE;
  if (subject === "English Literature") {
    return year === "AS" || year === "A2" ? ENGLISH_LITERATURE.ALEVEL : ENGLISH_LITERATURE.GCSE;
  }
  if (subject === "Combined Science") return COMBINED_SCIENCE_GCSE;
  if (subject === "Further Maths") return FURTHER_MATHS;
  if (subject === "VR") return VR_11PLUS;
  if (subject === "NVR") return NVR_11PLUS;
  return [];
}
