// 학교 데이터 — 배열 기반 구조로, 학교를 추가할 때는 이 배열에 객체 하나만
// 더하면 됩니다. 평가 영역(assessmentAreas)은 학교 공식 입학 안내가 개별
// 확인되기 전까지 "학교별 확인 필요"로 둡니다 — 틀린 시험 정보를 단정적으로
// 적지 않기 위한 의도적인 기본값입니다(schoolDataCaveat 참고). 실제로 확인된
// 학교는 assessmentAreas에 구체적인 평가명을 넣고 confirmed를 true로
// 바꿔주세요.

export type RegionTag =
  | "Korea"
  | "Jeju"
  | "Seoul"
  | "Asia"
  | "USA"
  | "Canada"
  | "UK"
  | "Europe"
  | "Middle East"
  | "Southeast Asia"
  | "Boarding School";

export const regionFilters: RegionTag[] = [
  "Korea",
  "Jeju",
  "Seoul",
  "Asia",
  "USA",
  "Canada",
  "UK",
  "Europe",
  "Middle East",
  "Southeast Asia",
  "Boarding School",
];

export const assessmentFilters = [
  "MAP",
  "CAT4",
  "WIDA",
  "SSAT",
  "ISEE",
  "Math Placement",
  "Writing Test",
  "Interview",
  "School-specific Assessment",
];

export interface School {
  id: string;
  name: string;
  city: string;
  regions: RegionTag[];
  grades: string;
  assessmentAreas: string[];
  confirmed: boolean;
  recommendedPackage: "Standard" | "Premium" | "Signature" | "상담 후 결정";
}

const UNCONFIRMED = ["School-specific Assessment"];

function kr(name: string, city: string, regions: RegionTag[]): School {
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    city,
    regions,
    grades: "학교별 확인 필요",
    assessmentAreas: UNCONFIRMED,
    confirmed: false,
    recommendedPackage: "상담 후 결정",
  };
}

// ── 국내 · 제주 (우선 등록) ──────────────────────────────
export const koreaSchools: School[] = [
  kr("KIS Pangyo", "Seongnam, Gyeonggi", ["Korea"]),
  kr("KIS Jeju", "Jeju", ["Korea", "Jeju", "Boarding School"]),
  kr("SFS (Seoul Foreign School)", "Seoul", ["Korea", "Seoul"]),
  kr("YISS (Yongin International School)", "Yongin, Gyeonggi", ["Korea"]),
  kr("GSIS", "Gyeonggi", ["Korea"]),
  kr("Chadwick International", "Songdo, Incheon", ["Korea"]),
  kr("Seoul Foreign British School", "Seoul", ["Korea", "Seoul"]),
  kr("Dwight School Seoul", "Seoul", ["Korea", "Seoul"]),
  kr("Dulwich College Seoul", "Seoul", ["Korea", "Seoul"]),
  kr("TCIS (Taejon Christian International School)", "Daejeon", ["Korea"]),
  kr("Branksome Hall Asia", "Jeju", ["Korea", "Jeju", "Boarding School"]),
  kr("St. Johnsbury Academy Jeju", "Jeju", ["Korea", "Jeju", "Boarding School"]),
  kr("NLCS Jeju", "Jeju", ["Korea", "Jeju", "Boarding School"]),
  kr("Korea International School Jeju", "Jeju", ["Korea", "Jeju", "Boarding School"]),
  kr("Daegu International School", "Daegu", ["Korea"]),
  kr("Busan Foreign School", "Busan", ["Korea"]),
  kr("Busan International Foreign School", "Busan", ["Korea"]),
  kr("Cheongna Dalton School", "Incheon", ["Korea"]),
  kr("Gyeonggi Suwon International School", "Suwon, Gyeonggi", ["Korea"]),
  kr("International Christian School Pyeongtaek", "Pyeongtaek, Gyeonggi", ["Korea"]),
  kr("International School of Busan", "Busan", ["Korea"]),
];

// ── 해외 — 지역별로 계속 확장 가능 ───────────────────────
export const internationalSchools: School[] = [
  // Singapore
  kr("UWCSEA", "Singapore", ["Asia", "Southeast Asia"]),
  kr("Tanglin Trust School", "Singapore", ["Asia", "Southeast Asia"]),
  kr("Dulwich College Singapore", "Singapore", ["Asia", "Southeast Asia"]),
  kr("Stamford American International School", "Singapore", ["Asia", "Southeast Asia"]),
  kr("Singapore American School", "Singapore", ["Asia", "Southeast Asia"]),
  // Hong Kong
  kr("Hong Kong International School", "Hong Kong", ["Asia"]),
  kr("Canadian International School of Hong Kong", "Hong Kong", ["Asia"]),
  kr("Harrow International School Hong Kong", "Hong Kong", ["Asia"]),
  kr("Kellett School", "Hong Kong", ["Asia"]),
  // Japan
  kr("American School in Japan", "Tokyo", ["Asia"]),
  kr("British School in Tokyo", "Tokyo", ["Asia"]),
  kr("Yokohama International School", "Yokohama", ["Asia"]),
  // China
  kr("Shanghai American School", "Shanghai", ["Asia"]),
  kr("Concordia International School Shanghai", "Shanghai", ["Asia"]),
  kr("Dulwich College Shanghai", "Shanghai", ["Asia"]),
  kr("Western International School of Shanghai", "Shanghai", ["Asia"]),
  // UAE
  kr("Dubai College", "Dubai, UAE", ["Middle East"]),
  kr("GEMS Wellington", "Dubai, UAE", ["Middle East"]),
  kr("Nord Anglia Dubai", "Dubai, UAE", ["Middle East"]),
  kr("American School of Dubai", "Dubai, UAE", ["Middle East"]),
  // Europe
  kr("International School of Milan", "Milan, Italy", ["Europe"]),
  kr("International School of Geneva", "Geneva, Switzerland", ["Europe"]),
  kr("Frankfurt International School", "Frankfurt, Germany", ["Europe"]),
  kr("Munich International School", "Munich, Germany", ["Europe"]),
];

export const allSchools: School[] = [...koreaSchools, ...internationalSchools];

// USA / Canada / UK는 사용자가 특정 학교명을 알려주지 않아 임의로 학교를
// 만들지 않습니다. 대신 지역 카테고리만 안내하고 상담으로 연결합니다.
export const inquireOnlyRegions: { region: RegionTag; categories: string[] }[] = [
  { region: "USA", categories: ["International schools", "Private schools", "Boarding schools"] },
  { region: "UK", categories: ["British international schools", "Independent schools"] },
  { region: "Canada", categories: ["International schools", "Private schools"] },
];
