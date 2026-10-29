import {
  SampleItem,
  apCalcBank,
  apPhysicsBank,
  apPhysicsEmBank,
  apStatsBank,
  apBiologyBank,
  apChemistryBank,
  apEconomicsBank,
  apEnglishBank,
  apHistoryBank,
  apPrecalcBank,
  apCsABank,
  apCsPrinciplesBank,
  apEnvSciBank,
  apPsychBank,
  apHumanGeoBank,
  apGovBank,
  apArtHistoryBank,
  apMusicTheoryBank,
  algebra1Bank,
  algebra2Bank,
  geometryBank,
  hsPrecalcBank,
  hsCalcBank,
  hsStatsBank,
  ENGLISH_GRADE_SAMPLES,
  MATH_GRADE_SAMPLES,
} from "@/data/sampleBank";

// AP 과목 id → 샘플 문항(1~2개). 전용 문항이 없는 과목은 같은 성격의
// 공용 뱅크를 재사용합니다(예: Physics 1/2/C 세 과목 모두 apPhysicsBank).
// 목차(toc)가 null인 과목(AP Spanish, AP Cybersecurity)은 공식 유닛 데이터가
// 아직 없어 샘플도 만들지 않고 상담 안내로만 처리합니다.
export const AP_SAMPLES: Record<string, SampleItem[]> = {
  "ap-english-language": apEnglishBank,
  "ap-english-literature": apEnglishBank,
  "ap-precalculus": apPrecalcBank,
  "ap-calculus-ab": apCalcBank,
  "ap-calculus-bc": apCalcBank,
  "ap-statistics": apStatsBank,
  "ap-physics-1": apPhysicsBank,
  "ap-physics-2": apPhysicsEmBank,
  "ap-physics-c-mechanics": apPhysicsBank,
  "ap-physics-c-em": apPhysicsEmBank,
  "ap-biology": apBiologyBank,
  "ap-chemistry": apChemistryBank,
  "ap-environmental-science": apEnvSciBank,
  "ap-us-history": apHistoryBank,
  "ap-world-history": apHistoryBank,
  "ap-european-history": apHistoryBank,
  "ap-human-geography": apHumanGeoBank,
  "ap-us-government": apGovBank,
  "ap-macroeconomics": apEconomicsBank,
  "ap-microeconomics": apEconomicsBank,
  "ap-psychology": apPsychBank,
  "ap-computer-science-a": apCsABank,
  "ap-computer-science-principles": apCsPrinciplesBank,
  "ap-art-history": apArtHistoryBank,
  "ap-music-theory": apMusicTheoryBank,
};

// US Curriculum(Course-Based) 과목 title → 샘플 문항. 실제 목차(HS_MATH_COURSES)가
// 있는 과목 중 샘플까지 준비된 과목만 여기 등록합니다.
export const COURSE_SAMPLES: Record<string, SampleItem[]> = {
  "Algebra 1": algebra1Bank,
  "Algebra 2": algebra2Bank,
  Geometry: geometryBank,
  Precalculus: hsPrecalcBank,
  Calculus: hsCalcBank,
  Statistics: hsStatsBank,
};

// US Curriculum(Grade-Based) 과목(English/Math) × 학년 → 샘플 문항.
export const GRADE_SAMPLES: Record<"English" | "Math", Record<string, SampleItem[]>> = {
  English: ENGLISH_GRADE_SAMPLES,
  Math: MATH_GRADE_SAMPLES,
};
