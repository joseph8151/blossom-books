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
  "TOEFL",
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

// overrides: 학교 공식 입학 안내 페이지에서 직접 확인된 경우에만 채웁니다.
// 각 override 바로 위 주석에 확인한 출처 URL을 남겨, 추후 재확인·감사가 가능하도록 합니다.
type SchoolOverrides = Partial<Pick<School, "grades" | "assessmentAreas" | "confirmed">>;

function kr(name: string, city: string, regions: RegionTag[], overrides: SchoolOverrides = {}): School {
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    city,
    regions,
    grades: "학교별 확인 필요",
    assessmentAreas: UNCONFIRMED,
    confirmed: false,
    recommendedPackage: "상담 후 결정",
    ...overrides,
  };
}

// ── 국내 · 제주 (우선 등록) ──────────────────────────────
export const koreaSchools: School[] = [
  // kis.ac 공식 페이지를 찾았으나 Pangyo/Jeju 캠퍼스 구분이 불명확해(Korea
  // International School Jeju와 동일 도메인) 확정하지 않음 — 확인 필요로 유지.
  kr("KIS Pangyo", "Seongnam, Gyeonggi", ["Korea"]),
  // 출처: https://kis.ac/2026-27-admissions-process/ — 현지 지원자는 교내 입학시험+인터뷰,
  // G8-11은 SAT/SSAT 성적표 제출, 해외 거주 지원자는 Zoom 인터뷰만 진행.
  // ※ "Korea International School Jeju" 항목과 동일 학교로 보임(중복 가능성, 임의 삭제하지 않음).
  kr("KIS Jeju", "Jeju", ["Korea", "Jeju", "Boarding School"], {
    grades: "JK–Grade 12",
    assessmentAreas: ["School-specific Assessment", "Interview", "SSAT"],
    confirmed: true,
  }),
  // 출처: https://www.seoulforeign.org/admissions/apply , .../admissions-policy
  // 만 6-10세는 SFS 자체 입학시험, 11-17세는 Writing Test 추가, 인터뷰는 요청 시 진행.
  kr("SFS (Seoul Foreign School)", "Seoul", ["Korea", "Seoul"], {
    grades: "PK2–Grade 12",
    assessmentAreas: ["School-specific Assessment", "Writing Test", "Interview"],
    confirmed: true,
  }),
  // "Yongin International School"이라는 이름의 공식 학교를 확인하지 못함(Yongsan
  // International School of Seoul과 혼동 가능) — 확인 필요로 유지.
  kr("YISS (Yongin International School)", "Yongin, Gyeonggi", ["Korea"]),
  // "GSIS"가 어느 학교를 지칭하는지 공식 출처로 특정하지 못함 — 확인 필요로 유지.
  kr("GSIS", "Gyeonggi", ["Korea"]),
  // 출처: https://www.chadwickinternational.org/admission/apply-2026-27 — Grade 6-11은
  // "assessment test" 성적 제출 필요하나 구체적 시험명은 공개되어 있지 않음.
  kr("Chadwick International", "Songdo, Incheon", ["Korea"], {
    assessmentAreas: ["School-specific Assessment"],
    confirmed: true,
  }),
  // Seoul Foreign School과 같은 입학 사무실(영국 커리큘럼 섹션)이며, 별도의
  // 입학시험 안내를 공식 페이지에서 확인하지 못함 — 확인 필요로 유지.
  kr("Seoul Foreign British School", "Seoul", ["Korea", "Seoul"]),
  // 공식 입학시험 안내 페이지를 확인하지 못함 — 확인 필요로 유지.
  kr("Dwight School Seoul", "Seoul", ["Korea", "Seoul"]),
  // 출처: https://seoul.dulwich.org/admissions/apply/frequently-asked-questions
  // Year 3-12는 CAT4 + 영어 Writing Assessment + 인터뷰. DUCKS(Nursery-Year2)는
  // CAT4 대신 관찰 평가로 진행.
  kr("Dulwich College Seoul", "Seoul", ["Korea", "Seoul"], {
    grades: "Nursery–Year 13",
    assessmentAreas: ["CAT4", "Writing Test", "Interview"],
    confirmed: true,
  }),
  // 출처: https://www.tcis.or.kr/admissions/admissions-process — Admission Test:
  // English, Writing, Math(Grade 3+) + Interview.
  kr("TCIS (Taejon Christian International School)", "Daejeon", ["Korea"], {
    grades: "K1–Grade 12",
    assessmentAreas: ["Writing Test", "Math Placement", "Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://www.branksome.asia/admissions/admissions-process — 일정 잡힌
  // "Assessment Day"에 대면 평가, 구체적 시험명은 공개되어 있지 않음.
  kr("Branksome Hall Asia", "Jeju", ["Korea", "Jeju", "Boarding School"], {
    grades: "Grade 1–12",
    assessmentAreas: ["School-specific Assessment"],
    confirmed: true,
  }),
  // 공식 입학시험 안내 페이지를 확인하지 못함 — 확인 필요로 유지.
  kr("St. Johnsbury Academy Jeju", "Jeju", ["Korea", "Jeju", "Boarding School"]),
  // 출처: https://www.nlcsjeju.co.kr/admissions/assessment/ (Assessments Information PDF)
  // Year 3-5: CAT4 + Pearson PTE 또는 MAP 중 선택. Year 6-9: CAT4 + Math Placement(PTM)
  // + Pearson GSE(영어) 또는 MAP. 서류 통과자는 화상 인터뷰 진행.
  kr("NLCS Jeju", "Jeju", ["Korea", "Jeju", "Boarding School"], {
    grades: "Nursery–Year 13",
    assessmentAreas: ["CAT4", "MAP", "Math Placement", "Interview"],
    confirmed: true,
  }),
  // 출처: https://kis.ac/2026-27-admissions-process/ — kis.ac 공식 사이트가 스스로를
  // "KIS"/"Korea International School"로 지칭해 위 "KIS Jeju"와 동일 학교로 보임
  // (중복 가능성, 임의 삭제하지 않고 동일 데이터 반영).
  kr("Korea International School Jeju", "Jeju", ["Korea", "Jeju", "Boarding School"], {
    grades: "JK–Grade 12",
    assessmentAreas: ["School-specific Assessment", "Interview", "SSAT"],
    confirmed: true,
  }),
  // 출처: https://www.dis.sc.kr/admissions/faq , .../admissions-calendar-2627 — 3단계
  // 절차(지원서 → Admissions Assessment → 결과) 중 구체적 시험명은 공개되어 있지 않음.
  kr("Daegu International School", "Daegu", ["Korea"], {
    grades: "K–Grade 12",
    assessmentAreas: ["School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://busanforeignschool.org/admissions/ — 서류·인터뷰·"필요 시 레벨
  // 테스트"로 평가, 구체적 시험명은 공개되어 있지 않음.
  kr("Busan Foreign School", "Busan", ["Korea"], {
    assessmentAreas: ["School-specific Assessment", "Interview"],
    confirmed: true,
  }),
  // 부산시 기록상 "International School of Busan"의 이전 명칭(또는 동일 기관)으로
  // 보이나 공식 입학시험 정보는 확인하지 못함 — 확인 필요로 유지(중복 가능성 메모).
  kr("Busan International Foreign School", "Busan", ["Korea"]),
  // 공식 입학시험 안내 페이지를 확인하지 못함 — 확인 필요로 유지.
  kr("Cheongna Dalton School", "Incheon", ["Korea"]),
  // 공식 입학시험 안내 페이지를 확인하지 못함 — 확인 필요로 유지.
  kr("Gyeonggi Suwon International School", "Suwon, Gyeonggi", ["Korea"]),
  // 공식 입학시험 안내 페이지를 확인하지 못함 — 확인 필요로 유지.
  kr("International Christian School Pyeongtaek", "Pyeongtaek, Gyeonggi", ["Korea"]),
  // "Busan International Foreign School"과 동일 기관일 가능성 — 공식 입학시험 정보는
  // 확인하지 못함, 확인 필요로 유지(중복 가능성 메모).
  kr("International School of Busan", "Busan", ["Korea"]),
];

// ── 해외 — 지역별로 계속 확장 가능 ───────────────────────
export const internationalSchools: School[] = [
  // Singapore
  // 출처: https://www.uwcsea.edu.sg/admissions/eligibility/assessments — 전교생 공통
  // 표준화 시험은 없고, EAL/학습지원 필요 시에만 평가. High School·Boarding은 인터뷰 필수.
  kr("UWCSEA", "Singapore", ["Asia", "Southeast Asia"], {
    grades: "K1–Grade 12",
    assessmentAreas: ["Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://www.tts.edu.sg/admissions/admissions-faqs — Year 7 이상은 진단평가
  // 필수(시험명 비공개), 인터뷰는 학년에 따라 진행될 수 있음.
  kr("Tanglin Trust School", "Singapore", ["Asia", "Southeast Asia"], {
    grades: "Nursery–Year 13",
    assessmentAreas: ["School-specific Assessment", "Interview"],
    confirmed: true,
  }),
  // 출처: https://singapore.dulwich.org/admissions/apply/admissions-criteria — 학년별
  // 온라인 테스트/대면 평가 + 30분 Writing Assignment, 인터뷰는 학년에 따라 진행.
  kr("Dulwich College Singapore", "Singapore", ["Asia", "Southeast Asia"], {
    grades: "Toddler–Year 13",
    assessmentAreas: ["School-specific Assessment", "Writing Test", "Interview"],
    confirmed: true,
  }),
  // 출처: https://www.sais.edu.sg/?p=46 — 영어 지원이 필요하다고 판단된 지원자에 한해
  // WIDA(KG2-Grade5) 또는 SLATE(Grade6-10) 영어 평가 진행.
  kr("Stamford American International School", "Singapore", ["Asia", "Southeast Asia"], {
    grades: "Early Years–Grade 12",
    assessmentAreas: ["WIDA", "School-specific Assessment"],
    confirmed: true,
  }),
  // 공식 페이지(sas.edu.sg/admissions/entry-requirements) 접근은 확인했으나 구체적
  // 시험 내용은 확인하지 못함 — 확인 필요로 유지.
  kr("Singapore American School", "Singapore", ["Asia", "Southeast Asia"]),
  // Hong Kong
  // 출처: https://www.hkis.edu.hk/admissions/faq — Grade 3-12 선별 지원자 대상
  // 컴퓨터 기반 적응형 평가(언어·수학) 진행. 공식 페이지는 이를 "MAP"으로 명명하지 않음.
  kr("Hong Kong International School", "Hong Kong", ["Asia"], {
    grades: "Reception One–Grade 12",
    assessmentAreas: ["School-specific Assessment"],
    confirmed: true,
  }),
  // 공식 페이지 상세 내용을 확인하지 못함 — 확인 필요로 유지.
  kr("Canadian International School of Hong Kong", "Hong Kong", ["Asia"]),
  // 출처: https://www.harrowschool.hk/admissions/admissions-process/assessments — 학년별로
  // 상이: Y3-10은 인터뷰+외부 채점 Maths/English/비언어추론 테스트+독립 Writing Task.
  kr("Harrow International School Hong Kong", "Hong Kong", ["Asia"], {
    grades: "Nursery–Year 13",
    assessmentAreas: ["Writing Test", "Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 공식 페이지 상세 내용을 확인하지 못함 — 확인 필요로 유지.
  kr("Kellett School", "Hong Kong", ["Asia"]),
  // Japan
  // 출처: https://www.asij.ac.jp/admissions/admissions-guidelines — SSAT(자체 학교
  // 코드 보유)를 포함해 보유 중인 표준화 시험 성적을 안내에 명시.
  kr("American School in Japan", "Tokyo", ["Asia"], {
    grades: "ELC–Grade 12",
    assessmentAreas: ["SSAT", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://www.bst.ac.jp/admissions/applications — "필요 시 인터뷰 또는 평가"로
  // 안내되어 있으나 구체적 시험명은 공개되어 있지 않음.
  kr("British School in Tokyo", "Tokyo", ["Asia"], {
    grades: "Nursery–Year 13",
    assessmentAreas: ["School-specific Assessment"],
    confirmed: true,
  }),
  // 공식 페이지에서 구체적 시험 내용을 확인하지 못함 — 확인 필요로 유지.
  kr("Yokohama International School", "Yokohama", ["Asia"]),
  // China
  // 공식 페이지는 평가 기준(영어 능력·학업성취 등)만 설명하고 구체적 시험명은
  // 명시하지 않음 — 확인 필요로 유지.
  kr("Shanghai American School", "Shanghai", ["Asia"]),
  // 출처: https://www.concordiashanghai.org/admissions/requirements — Math·Reading·
  // Vocabulary·Listening·Writing 중 일부 + 인터뷰/영어능력평가 가능.
  kr("Concordia International School Shanghai", "Shanghai", ["Asia"], {
    grades: "Pre-K–Grade 12",
    assessmentAreas: ["Math Placement", "Writing Test", "Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://shanghai-puxi.dulwich.org/admissions/apply/admissions-criteria ,
  // https://shanghai-pudong.dulwich.org/admissions/apply/admissions-criteria — 입학
  // 평가+인터뷰 진행, 구체적 표준화 시험명은 공개되어 있지 않음.
  kr("Dulwich College Shanghai", "Shanghai", ["Asia"], {
    grades: "Toddler–Year 13",
    assessmentAreas: ["Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://new.wiss.cn/admissions — Admissions Assessment + Academic
  // Interview + Language Proficiency Test(자체 명칭).
  kr("Western International School of Shanghai", "Shanghai", ["Asia"], {
    grades: "Pre-Nursery–Grade 12",
    assessmentAreas: ["Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // UAE
  // 공식 사이트를 찾지 못함(제3자 출처만 CAT4 언급) — 확인 필요로 유지.
  kr("Dubai College", "Dubai, UAE", ["Middle East"]),
  // 출처: https://www.wellingtoninternationalschool.com/Admissions/Admissions-Process —
  // 성적표 검토 후 "추가 평가 및/또는 인터뷰"가 있을 수 있다고 안내.
  kr("GEMS Wellington", "Dubai, UAE", ["Middle East"], {
    grades: "FS–Year 13",
    assessmentAreas: ["Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://nordangliaeducation.com/nas-dubai/admissions/entry-requirements —
  // Year 5-6: 온라인 CAT4 + 녹화 Reading/Writing 샘플. Year 7-8: Math/English 평가 추가.
  kr("Nord Anglia Dubai", "Dubai, UAE", ["Middle East"], {
    grades: "Early Years–Year 13",
    assessmentAreas: ["CAT4", "Writing Test", "Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 공식 페이지는 일반 원칙만 안내하고 구체적 시험명은 명시하지 않음 — 확인 필요로 유지.
  kr("American School of Dubai", "Dubai, UAE", ["Middle East"]),
  // Europe
  // 출처: https://www.internationalschoolofmilan.it/en/admissions/admissions-process —
  // 약 90분 Math·Language(영어/이탈리아어) 자체 평가, 필요 시 추천서/포트폴리오 요청.
  kr("International School of Milan", "Milan, Italy", ["Europe"], {
    assessmentAreas: ["Math Placement", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://www.ecolint.ch/en/admissions/faqs — 일반 입학은 비선발 서류 중심
  // (학교 성적표·추천서·짧은 작문/그림 샘플)이며 표준화 입학시험은 사용하지 않음.
  // 장학 프로그램 지원자만 별도 인터뷰 절차가 있음(일반 입학과 무관).
  kr("International School of Geneva", "Geneva, Switzerland", ["Europe"], {
    assessmentAreas: ["School-specific Assessment"],
    confirmed: true,
  }),
  // 공식 페이지는 입학 절차만 설명하고 구체적 시험명은 확인하지 못함 — 확인 필요로 유지.
  kr("Frankfurt International School", "Frankfurt, Germany", ["Europe"]),
  // 공식 페이지에서 구체적 시험 내용을 확인하지 못함 — 확인 필요로 유지.
  kr("Munich International School", "Munich, Germany", ["Europe"]),

  // ── USA 보딩스쿨 (한국 학생 다수 지원 학교 위주) ────────
  // 출처: https://www.exeter.edu/admissions-and-financial-aid/application-process/how-apply
  // Grade 9-10: SSAT/ISEE 필수. 인터뷰 필수. TOEFL/IELTS/Duolingo는 "권장"이며 필수는 아님.
  kr("Phillips Exeter Academy", "Exeter, New Hampshire, USA", ["USA", "Boarding School"], {
    grades: "Grade 9–12",
    assessmentAreas: ["SSAT", "ISEE", "Interview"],
    confirmed: true,
  }),
  // 출처: https://www.andover.edu/admission/admission-faqs
  // SSAT/ISEE 또는 PSAT/SAT/ACT 중 선택 제출. 비영어권 학교 출신은 TOEFL/IELTS/Duolingo 필요.
  kr("Phillips Academy Andover", "Andover, Massachusetts, USA", ["USA", "Boarding School"], {
    grades: "Grade 9–12",
    assessmentAreas: ["SSAT", "ISEE", "TOEFL"],
    confirmed: true,
  }),
  // 출처: https://www.hotchkiss.org/admission/standardized-tests — Grade 9-10 SSAT/ISEE
  // (필수 여부는 페이지마다 다르게 안내되어 확인 필요), 비원어민은 TOEFL/Duolingo/IELTS.
  kr("The Hotchkiss School", "Lakeville, Connecticut, USA", ["USA", "Boarding School"], {
    grades: "Grade 9–12, PG",
    assessmentAreas: ["SSAT", "ISEE", "TOEFL"],
    confirmed: true,
  }),
  // 출처: https://deerfield.edu/admission/frequently-asked-questions — Grade 9-10 SSAT/ISEE,
  // 영어가 모국어가 아니거나 영어 수업 경력 3년 미만이면 IELTS/TOEFL iBT/Duolingo, 인터뷰 필수.
  kr("Deerfield Academy", "Deerfield, Massachusetts, USA", ["USA", "Boarding School"], {
    grades: "Grade 9–12",
    assessmentAreas: ["SSAT", "ISEE", "TOEFL", "Interview"],
    confirmed: true,
  }),
  // 출처: https://www.milton.edu/admission/how-to-apply/ — Test-optional(SSAT/ISEE 불필요),
  // 영어 학습자는 TOEFL/IELTS/Duolingo 강력 권장.
  kr("Milton Academy", "Milton, Massachusetts, USA", ["USA", "Boarding School"], {
    grades: "Grade 9–12",
    assessmentAreas: ["TOEFL"],
    confirmed: true,
  }),
  // 출처: https://www.loomischaffee.org/fs/pages/1871 — Test-optional(SSAT/ISEE/SAT/ACT 불필요),
  // 영어권 학교 재학 2년 미만이면 TOEFL 또는 IELTS 필요.
  kr("The Loomis Chaffee School", "Windsor, Connecticut, USA", ["USA", "Boarding School"], {
    grades: "Grade 9–12, PG",
    assessmentAreas: ["TOEFL"],
    confirmed: true,
  }),
  // 출처: https://www.cushing.org/admissions/how-to-apply , .../international-students
  // SSAT 선택, 국제 지원자는 TOEFL iBT 또는 Duolingo 필수.
  kr("Cushing Academy", "Ashburnham, Massachusetts, USA", ["USA", "Boarding School"], {
    grades: "Grade 9–12, PG",
    assessmentAreas: ["TOEFL"],
    confirmed: true,
  }),
  // 출처: https://peddie.org/admission/international-applicants/ — 전원 SSAT 또는 ISEE 필수,
  // 영어권 학교 재학 3년 미만이면 TOEFL/IELTS/Duolingo 필수, 인터뷰 필수.
  kr("The Peddie School", "Hightstown, New Jersey, USA", ["USA", "Boarding School"], {
    grades: "Grade 9–12, PG",
    assessmentAreas: ["SSAT", "ISEE", "TOEFL", "Interview"],
    confirmed: true,
  }),
  // 출처: https://www.thehill.org/admission/how-to-apply — Grade 9-10: SSAT/ISEE/PSAT,
  // Grade 11-12/PG: PSAT/SAT/ACT/SSAT. 비원어민은 TOEFL·Duolingo(영어권 학교 3년 이상 재학 시 면제).
  kr("The Hill School", "Pottstown, Pennsylvania, USA", ["USA", "Boarding School"], {
    grades: "Grade 9–12, PG",
    assessmentAreas: ["SSAT", "ISEE", "TOEFL"],
    confirmed: true,
  }),
  // 출처: https://www.sps.edu/admissions/applying — TOEFL 필요(영어권 학교 3년 이상 재학 시 면제,
  // 코드 2342). SSAT/ISEE·인터뷰 세부 요건은 이번 조사에서 공식 확인하지 못함.
  kr("St. Paul's School", "Concord, New Hampshire, USA", ["USA", "Boarding School"], {
    grades: "Grade 9–12",
    assessmentAreas: ["TOEFL"],
    confirmed: true,
  }),
  // 공식 FAQ에 "국제학생은 영어능력시험이 필요한가?" 질문은 있으나 답변 내용을 확인하지
  // 못함 — 확인 필요로 유지.
  kr("Choate Rosemary Hall", "Wallingford, Connecticut, USA", ["USA", "Boarding School"]),
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함(제3자 출처만 SSAT/TOEFL/인터뷰 언급)
  // — 확인 필요로 유지.
  kr("The Lawrenceville School", "Lawrenceville, New Jersey, USA", ["USA", "Boarding School"]),
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함 — 확인 필요로 유지.
  kr("Suffield Academy", "Suffield, Connecticut, USA", ["USA", "Boarding School"]),

  // ── Canada 보딩스쿨 (한국 학생 다수 지원 학교 위주) ─────
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함(제3자 출처만 SSAT·영어시험 언급)
  // — 확인 필요로 유지.
  kr("Appleby College", "Oakville, Ontario, Canada", ["Canada", "Boarding School"]),
  // 출처: https://ucc.on.ca/admission/apply/applying-to-boarding — 모든 보딩 지원자는
  // UCC 자체 온라인 입학 평가 완료, 영어가 수업언어가 아닌 경우 영어능력시험 필요(시험명 비공개).
  kr("Upper Canada College", "Toronto, Ontario, Canada", ["Canada", "Boarding School"], {
    grades: "Boarding: Grade 9–12",
    assessmentAreas: ["School-specific Assessment"],
    confirmed: true,
  }),
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함(제3자 출처만 SSAT 장학 연계 언급)
  // — 확인 필요로 유지.
  kr("Ridley College", "St. Catharines, Ontario, Canada", ["Canada", "Boarding School"]),
  // 출처: https://www.sac.on.ca/admission/how-to-apply — 대부분의 국제 지원자는 SSAT 필수
  // (학교 코드 6263), 합격 후보자는 인터뷰 필수.
  kr("St. Andrew's College", "Aurora, Ontario, Canada", ["Canada", "Boarding School"], {
    grades: "Boarding: Grade 9–12",
    assessmentAreas: ["SSAT", "Interview"],
    confirmed: true,
  }),
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함 — 확인 필요로 유지.
  kr("Lakefield College School", "Lakefield, Ontario, Canada", ["Canada", "Boarding School"]),
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함(제3자 출처만 "입학시험 없음" 일관 언급)
  // — 확인 필요로 유지.
  kr("Shawnigan Lake School", "Shawnigan Lake, British Columbia, Canada", ["Canada", "Boarding School"]),
  // 출처: https://www.smus.ca/admissions/apply-to-boarding/boarding-9-12 — SSAT 성적을
  // 자체 입학시험 대신 인정(학교 코드 6869), PSAT도 인정. 영어권 학교 재학 3년 미만이면
  // 영어능력시험 필요(시험명 비공개).
  kr("St. Michaels University School", "Victoria, British Columbia, Canada", ["Canada", "Boarding School"], {
    grades: "Boarding: Grade 9–12",
    assessmentAreas: ["SSAT", "Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://www.tcs.on.ca/apply — Senior School(9-12)은 SSAT·TOEFL·CAT·MAP·Duolingo 등
  // 다양한 시험 성적 인정 또는 TCS 자체 시험. Junior School(5-8)은 독해·수학·작문 평가.
  kr("Trinity College School", "Port Hope, Ontario, Canada", ["Canada", "Boarding School"], {
    grades: "Grade 5–12",
    assessmentAreas: ["SSAT", "TOEFL", "MAP", "Writing Test", "Math Placement"],
    confirmed: true,
  }),
  // 출처: https://www.pickeringcollege.on.ca/apply1 — Grade 4-12 지원자는 온라인 에세이+
  // 온라인 인터뷰, 비원어민은 TOEFL/IELTS/CEFR/Duolingo 중 하나 제출(SSAT 요구 없음).
  kr("Pickering College", "Newmarket, Ontario, Canada", ["Canada", "Boarding School"], {
    grades: "Day: JK–12 · Boarding(ESL Academy): Grade 9–10",
    assessmentAreas: ["Writing Test", "Interview", "TOEFL"],
    confirmed: true,
  }),
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함(EAL 프로그램 존재만 확인) — 확인 필요로 유지.
  kr("Rothesay Netherwood School", "Rothesay, New Brunswick, Canada", ["Canada", "Boarding School"]),
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함 — 확인 필요로 유지.
  kr("Columbia International College", "Hamilton, Ontario, Canada", ["Canada", "Boarding School"]),
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함(제3자 출처만 SSAT 대체 가능 언급)
  // — 확인 필요로 유지.
  kr("Brentwood College School", "Mill Bay, British Columbia, Canada", ["Canada", "Boarding School"]),

  // ── Vietnam (Hanoi / Ho Chi Minh City) ──────────────────
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함 — 확인 필요로 유지.
  kr("UNIS Hanoi", "Hanoi, Vietnam", ["Southeast Asia"]),
  // 출처: https://www.nordangliaeducation.com/bis-hanoi/admissions/entry-requirements
  // Year 3-6: Writing Test + CAT4("CAT computer test") + EAL 평가 + 인터뷰. 저학년은 관찰 평가.
  kr("British International School Hanoi", "Hanoi, Vietnam", ["Southeast Asia"], {
    grades: "Nursery/Foundation–Year 13",
    assessmentAreas: ["CAT4", "Writing Test", "Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함 — 확인 필요로 유지.
  kr("Hanoi International School", "Hanoi, Vietnam", ["Southeast Asia"]),
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함(제3자 출처만 MAP 언급) — 확인 필요로 유지.
  kr("Concordia International School Hanoi", "Hanoi, Vietnam", ["Southeast Asia"]),
  // 출처: 학교 공식 수수료 안내 PDF(gamudagardens.sis.edu.vn) — Placement Test 존재 확인,
  // 시험 과목·형식은 비공개.
  kr("Singapore International School Gamuda Gardens", "Hanoi, Vietnam", ["Southeast Asia"], {
    assessmentAreas: ["School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://stpaulhanoi.com/admissions/enrollment-process/ — 영어능력 + 수학
  // 입학시험 합격 필요(시험명 비공개).
  kr("St. Paul American School Hanoi", "Hanoi, Vietnam", ["Southeast Asia"], {
    assessmentAreas: ["Math Placement", "School-specific Assessment"],
    confirmed: true,
  }),
  // 베트남 국가교육과정 기반 + Cambridge/AP 국제 트랙 병행 학교. 공식 사이트에서 구체적
  // 시험 내용은 확인하지 못함 — 확인 필요로 유지.
  kr("Wellspring International Bilingual School Hanoi", "Hanoi, Vietnam", ["Southeast Asia"]),
  // 출처: https://www.ishcmc.com/admission/applying-to-ishcmc/ — KG-Grade12 영어능력평가
  // (듣기·말하기·읽기·쓰기), K-Grade5 EAL 평가 추가, Grade6-12는 과목별 평가+인터뷰.
  kr("International School Ho Chi Minh City", "Ho Chi Minh City, Vietnam", ["Southeast Asia"], {
    grades: "Early Explorers–Grade 12",
    assessmentAreas: ["Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://www.nordangliaeducation.com/bis-hcmc/admissions/entry-requirements
  // 학년별 평가 진행, 비원어민은 EAL 평가(자체 명칭, CAT4 등 특정 시험명 공개되어 있지 않음).
  kr("British International School Ho Chi Minh City", "Ho Chi Minh City, Vietnam", ["Southeast Asia"], {
    grades: "Nursery–Year 13",
    assessmentAreas: ["School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: 학교 공식 2025-26 Admissions Policy PDF(renaissance.edu.vn) — Year2-13: Oxford
  // Online English Test(자체 명칭), Year3-13: CAT4 또는 이에 준하는 인지능력 평가, 전 학년 인터뷰.
  kr("Renaissance International School Saigon", "Ho Chi Minh City, Vietnam", ["Southeast Asia"], {
    grades: "Early Years–Year 13",
    assessmentAreas: ["CAT4", "Interview", "School-specific Assessment"],
    confirmed: true,
  }),

  // ── Malaysia (Kuala Lumpur 지역) ─────────────────────────
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함 — 확인 필요로 유지.
  kr("Garden International School", "Mont Kiara, Kuala Lumpur, Malaysia", ["Southeast Asia"]),
  // 공식 사이트에서 구체적 시험 내용을 확인하지 못함 — 확인 필요로 유지.
  kr("Mont'Kiara International School", "Mont Kiara, Kuala Lumpur, Malaysia", ["Southeast Asia"]),
  // 출처: 학교 공식 Admissions Policy PDF(alice-smith.edu.my) — 비선발 평가(적합한 학년
  // 배정 목적), 영어가 모국어가 아니면 짧은 인터뷰·작문 샘플 추가.
  kr("The Alice Smith School", "Kuala Lumpur, Malaysia", ["Southeast Asia"], {
    grades: "Early Years–Sixth Form",
    assessmentAreas: ["Writing Test", "Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://www.nexus.edu.my/admissions/ , .../assessing-learning/ — 학년별 입학
  // 평가 진행(자체 자료, 비공개), 인터뷰 포함 가능.
  kr("Nexus International School Malaysia", "Kuala Lumpur, Malaysia", ["Southeast Asia"], {
    grades: "Early Years–Year 13",
    assessmentAreas: ["Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://www.epsomcollege.edu.my/admissions/how-to-apply — Cambridge Assessment
  // Baseline Test(수학·IQ·문해력) + Oxford Placement Test(영어) + 에세이 + 인터뷰.
  kr("Epsom College in Malaysia", "Bandar Enstek, Negeri Sembilan, Malaysia", ["Southeast Asia"], {
    grades: "Year 3–Sixth Form",
    assessmentAreas: ["Writing Test", "Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://www.iskl.edu.my/admissions/admissions-essentials , .../frequently-asked-questions
  // 전통적 입학시험 없음. 전 학년 WIDA로 영어능력 평가, High School은 인터뷰 포함.
  kr("The International School of Kuala Lumpur", "Kuala Lumpur, Malaysia", ["Southeast Asia"], {
    grades: "Prep Reception–Grade 12",
    assessmentAreas: ["WIDA", "Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://aism.edu.my/admission/how-to-apply — 필요 시 입학 평가 + 인터뷰 진행(자체
  // 자료, 특정 표준화 시험명 비공개).
  kr("Australian International School Malaysia", "Kuala Lumpur, Malaysia", ["Southeast Asia"], {
    grades: "Early Learning–Year 12",
    assessmentAreas: ["Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: nordangliaeducation.com(BSKL) 공식 입학 안내 — 학년에 맞는 평가(영어 말하기·쓰기·
  // 수학 테스트 포함 가능) + 인터뷰.
  kr("British International School Kuala Lumpur", "Kuala Lumpur, Malaysia", ["Southeast Asia"], {
    grades: "Nursery–Year 13",
    assessmentAreas: ["Writing Test", "Math Placement", "Interview"],
    confirmed: true,
  }),
  // 공식 사이트에 접근하지 못함(제3자 출처만 CAT4 언급, 캠퍼스 간 확인 필요) — 확인 필요로 유지.
  kr("Sri KDU International School", "Selangor, Malaysia", ["Southeast Asia"]),
  // Ipoh·Penang 캠퍼스는 공식 Admissions Policy에서 CAT4(GL Assessment) 사용을 확인했으나,
  // Kuala Lumpur 지역 캠퍼스(Setia Eco Gardens 등)는 공식 확인이 안 되어 혼동 방지를 위해
  // 확인 필요로 유지합니다 — 캠퍼스별로 반드시 재확인하세요.
  kr("Tenby International School", "Setia Eco Park, Klang Valley, Malaysia", ["Southeast Asia"]),
  // 출처: https://fairview.edu.my/school-admission/admission-information — 서류 제출 후
  // 배치고사(Placement Test) + 인터뷰 진행(시험 형식 비공개).
  kr("Fairview International School", "Mont Kiara / Wangsa Maju, Kuala Lumpur, Malaysia", ["Southeast Asia"], {
    grades: "Age 4–19",
    assessmentAreas: ["Interview", "School-specific Assessment"],
    confirmed: true,
  }),
  // 출처: https://his.edu.my/how-to-apply/ — 배치고사(Placement Assessment) 결과와 학업
  // 기록에 따라 입학 결정(시험 형식 비공개).
  kr("HELP International School", "Subang Bestari, Shah Alam, Selangor, Malaysia", ["Southeast Asia"], {
    assessmentAreas: ["School-specific Assessment"],
    confirmed: true,
  }),
  // 공식 사이트를 확인하지 못함(제3자 출처만 존재) — 확인 필요로 유지.
  kr("Sri Kuala Lumpur International School", "Subang Jaya, Selangor, Malaysia", ["Southeast Asia"]),
];

export const allSchools: School[] = [...koreaSchools, ...internationalSchools];

// UK는 사용자가 특정 학교명을 알려주지 않아 임의로 학교를 만들지 않습니다.
// 대신 지역 카테고리만 안내하고 상담으로 연결합니다. (USA·Canada는 보딩스쿨
// 위주로 실제 학교명이 추가되어 더 이상 이 목록에 없습니다.)
export const inquireOnlyRegions: { region: RegionTag; categories: string[] }[] = [
  { region: "UK", categories: ["British international schools", "Independent schools"] },
];
