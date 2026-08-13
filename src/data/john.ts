// ────────────────────────────────────────────────────────────
// JOHN EDUCATION GROUP — 프랜차이즈 본사 홈페이지 콘텐츠 데이터
// 이 사이트는 학생 모집용이 아니라, 원장·예비 창업자를 가맹 상담으로
// 전환시키기 위한 B2B 콘텐츠로 구성됩니다. (숫자·통계는 임의 생성 금지)
// ────────────────────────────────────────────────────────────

export type BusinessModelId =
  | "kids"
  | "prep"
  | "study"
  | "private"
  | "language"
  | "hybrid";

export interface BusinessModel {
  id: BusinessModelId;
  code: string; // JOHN KIDS 등
  name: string; // Kids English Academy 등
  nameKo: string;
  tagline: string;
  description: string;
  programs: string[];
  recommendedFor: string;
  studentType: string;
  businessFormat: string;
  teachingFormat: string;
  spaceType: string;
  expansionPotential: string;
  operationStyle: string;
  spaceLevel: 1 | 2 | 3; // 공간 규모 — 1: 소형, 2: 중소형, 3: 중대형
  teamLevel: 1 | 2 | 3; // 운영 인력 규모 — 1: 원장 단독, 2: 원장+소수, 3: 강사진 팀
}

export const businessModels: BusinessModel[] = [
  {
    id: "kids",
    code: "JOHN KIDS",
    name: "Kids English Academy",
    nameKo: "어린이 영어학원",
    tagline: "유아 및 초등 중심 영어교육",
    description:
      "파닉스부터 리딩, 스피킹, 라이팅까지 유아·초등 학생의 영어 기초를 체계적으로 쌓는 프로그램입니다. 어린이 영어학원, 영어교습소, 공부방을 운영하고 싶은 원장에게 적합합니다.",
    programs: ["Phonics", "Reading", "Speaking", "Writing", "Vocabulary", "Foundation English"],
    recommendedFor: "어린이 영어학원·교습소·공부방을 운영하고 싶은 원장",
    studentType: "유아 · 초등",
    businessFormat: "학원 · 교습소 · 공부방",
    teachingFormat: "그룹 수업 중심",
    spaceType: "중소형 학습 공간",
    expansionPotential: "JOHN PREP · JOHN HYBRID로 확장 가능",
    operationStyle: "원장 운영 또는 강사 채용",
    spaceLevel: 2,
    teamLevel: 2,
  },
  {
    id: "prep",
    code: "JOHN PREP",
    name: "Academic & Test Prep Academy",
    nameKo: "학업·시험 대비 아카데미",
    tagline: "Academic English 및 국제학교·시험 대비 프리미엄 프로그램",
    description:
      "국제학교 입학 및 표준화 시험을 준비하는 학생을 위한 Academic Reading, Writing, Vocabulary 중심의 프리미엄 프로그램입니다. 프리미엄 Academic Center를 운영하고 싶은 원장에게 적합합니다.",
    programs: [
      "Academic Reading",
      "Academic Writing",
      "Vocabulary",
      "International School Prep",
      "Standardized Test Prep",
      "Level Assessment",
    ],
    recommendedFor: "프리미엄 Academic Center를 운영하고 싶은 원장",
    studentType: "초등 고학년 · 중고등",
    businessFormat: "프리미엄 학원",
    teachingFormat: "소수정예 그룹 · 레벨별 반편성",
    spaceType: "중형 학습 공간",
    expansionPotential: "JOHN HYBRID로 프로그램 확장",
    operationStyle: "전문 강사진 운영",
    spaceLevel: 2,
    teamLevel: 3,
  },
  {
    id: "study",
    code: "JOHN STUDY",
    name: "Small Learning Center",
    nameKo: "소규모 공부방·교습소",
    tagline: "작은 공간에서도 운영할 수 있는 공부방 · 교습소 모델",
    description:
      "Start Small. Build Something Bigger. 작은 공간, 낮은 운영 복잡도로 시작해 학생 수가 늘면 교습소, 학원으로 단계적으로 확장할 수 있는 모델입니다.",
    programs: ["Small Space", "Owner Operated", "Community Based", "Lower Operational Complexity", "Expandable"],
    recommendedFor: "작게 시작해 단계적으로 키우고 싶은 예비 창업자",
    studentType: "유아 · 초등 중심",
    businessFormat: "공부방 · 교습소",
    teachingFormat: "1인 원장 운영 · 소규모 그룹",
    spaceType: "소형 공간 · 주거지 인근",
    expansionPotential: "JOHN KIDS · JOHN HYBRID로 성장 가능",
    operationStyle: "원장 단독 운영",
    spaceLevel: 1,
    teamLevel: 1,
  },
  {
    id: "private",
    code: "JOHN 1:1",
    name: "Private Language Studio",
    nameKo: "성인 1:1 어학원",
    tagline: "성인 대상 1:1 영어 및 외국어 스튜디오",
    description:
      "회화, 비즈니스 영어, 인터뷰 영어 등 성인 학습자의 목적에 맞춘 1:1 맞춤 수업을 운영하는 모델입니다. 성인영어 창업 및 1:1 어학원 창업을 희망하는 분에게 적합합니다.",
    programs: [
      "Conversation",
      "Business English",
      "Interview English",
      "Travel English",
      "Professional English",
      "Customized Lessons",
    ],
    recommendedFor: "1:1 어학원 창업을 희망하는 원장",
    studentType: "성인",
    businessFormat: "프라이빗 스튜디오",
    teachingFormat: "1:1 맞춤 수업",
    spaceType: "소형 스튜디오",
    expansionPotential: "JOHN LANGUAGE로 그룹 수업 확장",
    operationStyle: "원장 단독 또는 소수 강사",
    spaceLevel: 1,
    teamLevel: 1,
  },
  {
    id: "language",
    code: "JOHN LANGUAGE",
    name: "Group Language Academy",
    nameKo: "성인 그룹 어학원",
    tagline: "성인 소규모 그룹 어학원",
    description:
      "회화, 비즈니스 영어, 기업 출강 등 소규모 그룹 형태로 성인 학습자를 대상으로 운영하는 그룹 어학원 모델입니다.",
    programs: ["Conversation", "Business English", "Small Group", "Corporate Language", "Topic-Based Classes"],
    recommendedFor: "그룹 어학원 운영을 희망하는 원장",
    studentType: "성인",
    businessFormat: "그룹 어학원",
    teachingFormat: "소규모 그룹 수업",
    spaceType: "중소형 학습 공간",
    expansionPotential: "기업 출강 · 다지점으로 확장",
    operationStyle: "원장 운영 또는 소규모 팀",
    spaceLevel: 2,
    teamLevel: 2,
  },
  {
    id: "hybrid",
    code: "JOHN HYBRID",
    name: "Multi-Program Education Center",
    nameKo: "복합형 교육센터",
    tagline: "Kids + Prep + Adult를 한 공간에서 운영하는 복합형 모델",
    description:
      "어린이 영어, Academic Prep, 성인 프로그램 등을 하나의 공간에서 함께 운영하는 복합형 모델입니다. 기존 학원 원장이 프로그램을 확장하거나 교육 대상을 넓힐 때 적합합니다.",
    programs: ["Kids Programs", "Prep Programs", "Adult Programs", "Shared Space Operation", "Program Expansion"],
    recommendedFor: "프로그램을 확장하고 싶은 기존 학원 원장",
    studentType: "유아부터 성인까지",
    businessFormat: "복합형 교육센터",
    teachingFormat: "대상별 그룹 · 1:1 병행",
    spaceType: "중대형 학습 공간",
    expansionPotential: "다지점 확장의 기준 모델",
    operationStyle: "원장 + 강사진 팀 운영",
    spaceLevel: 3,
    teamLevel: 3,
  },
];

export function findBusinessModel(id: BusinessModelId): BusinessModel {
  return businessModels.find((m) => m.id === id)!;
}

// ── Start Small — Growth Roadmap ──────────────────────────────
export const growthRoadmap = [
  { step: "01", label: "HOME STUDY", labelKo: "공부방" },
  { step: "02", label: "LEARNING STUDIO", labelKo: "교습소" },
  { step: "03", label: "ACADEMY", labelKo: "학원" },
  { step: "04", label: "MULTI-PROGRAM CENTER", labelKo: "복합형 교육센터" },
  { step: "05", label: "MULTIPLE LOCATIONS", labelKo: "다지점 확장" },
];

// ── Why JOHN ───────────────────────────────────────────────────
export const whyJohnItems = [
  {
    title: "Curriculum",
    titleKo: "커리큘럼",
    description: "수업 콘텐츠와 커리큘럼을 매번 처음부터 설계하지 않아도 됩니다.",
  },
  {
    title: "Assessment",
    titleKo: "레벨 진단",
    description: "학생 수준을 파악하고 적절한 프로그램을 안내할 수 있는 진단 시스템을 제공합니다.",
  },
  {
    title: "Teaching Resources",
    titleKo: "수업 자료",
    description: "Lesson Guide, Teaching Resources, Practice Materials 등 실제 수업에 바로 쓸 수 있는 자료를 지원합니다.",
  },
  {
    title: "Branding",
    titleKo: "브랜딩",
    description: "개인 공부방도 전문적인 교육 브랜드로 운영할 수 있도록 브랜드 자산을 지원합니다.",
  },
  {
    title: "Owner Training",
    titleKo: "원장 교육",
    description: "오픈 전 교육 및 지속적인 운영 가이드를 제공합니다.",
  },
  {
    title: "Marketing",
    titleKo: "마케팅",
    description: "지역 기반 학생 모집과 브랜드 마케팅을 지원합니다.",
  },
  {
    title: "Operating System",
    titleKo: "운영 시스템",
    description: "상담부터 재등록까지 이어지는 일관된 운영 프로세스를 제공합니다.",
  },
  {
    title: "Business Growth",
    titleKo: "사업 확장",
    description: "작은 센터에서 더 큰 사업으로 성장할 수 있는 확장 구조를 지원합니다.",
  },
];

// ── JOHN Operating System — Customer Journey ────────────────────
export const operatingSystemSteps = [
  { step: "01", title: "Student Inquiry", titleKo: "학생 문의", support: "지역 기반 마케팅으로 유입된 문의를 체계적으로 관리합니다." },
  { step: "02", title: "Consultation", titleKo: "상담", support: "표준화된 상담 스크립트와 안내 자료를 제공합니다." },
  { step: "03", title: "Level Assessment", titleKo: "레벨 진단", support: "JOHN의 진단 시스템으로 학생 수준을 정확히 파악합니다." },
  { step: "04", title: "Program Recommendation", titleKo: "프로그램 추천", support: "진단 결과에 맞는 프로그램을 안내하는 기준을 제공합니다." },
  { step: "05", title: "Learning Management", titleKo: "학습 관리", support: "커리큘럼과 진도 관리 체계로 수업 품질을 유지합니다." },
  { step: "06", title: "Progress Review", titleKo: "학습 점검", support: "정기적인 점검 프로세스와 리포트 양식을 제공합니다." },
  { step: "07", title: "Re-enrollment", titleKo: "재등록", support: "재등록 전환을 위한 상담 시점과 커뮤니케이션 가이드를 제공합니다." },
  { step: "08", title: "Program Expansion", titleKo: "프로그램 확장", support: "학생 성장에 맞춰 상위 프로그램으로 자연스럽게 연결합니다." },
];

// ── Curriculum Ecosystem ────────────────────────────────────────
export const curriculumEcosystem = [
  { label: "Early Learning", labelKo: "유아 영어" },
  { label: "Kids English", labelKo: "어린이 영어" },
  { label: "Academic English", labelKo: "Academic English" },
  { label: "International School Prep", labelKo: "국제학교 입학 대비" },
  { label: "Test Preparation", labelKo: "시험 대비" },
  { label: "Adult Language", labelKo: "성인 어학" },
];

// ── Existing Academy Owners — 전환 지원 ──────────────────────────
export const conversionSupportItems = [
  "Brand Conversion",
  "Curriculum Upgrade",
  "Prep Program Addition",
  "Kids Program Addition",
  "Adult Program Addition",
  "Assessment System",
  "Marketing Upgrade",
  "Operational Upgrade",
];

// ── Owner Support ────────────────────────────────────────────────
export const ownerSupportItems = [
  { title: "Brand", titleKo: "브랜드", description: "개인 교육사업을 전문적인 교육 브랜드로 운영할 수 있도록 브랜드 자산과 가이드를 제공합니다." },
  { title: "Curriculum", titleKo: "커리큘럼", description: "학생 대상과 목적에 맞는 커리큘럼 체계를 제공합니다." },
  { title: "Teaching Resources", titleKo: "수업 자료", description: "Lesson Guide와 실제 수업 자료를 지속적으로 제공합니다." },
  { title: "Student Assessment", titleKo: "학생 진단", description: "학생 수준을 파악하고 적절한 프로그램을 안내하는 진단 시스템을 제공합니다." },
  { title: "Marketing", titleKo: "마케팅", description: "지역 기반 학생 모집과 브랜드 마케팅을 지원합니다." },
  { title: "Opening Support", titleKo: "오픈 지원", description: "센터 오픈 전 준비 과정을 함께 점검합니다." },
  { title: "Owner Training", titleKo: "원장 교육", description: "오픈 전 교육 프로그램과 지속적인 운영 교육을 제공합니다." },
  { title: "Operations Guide", titleKo: "운영 가이드", description: "상담부터 재등록까지의 표준 운영 프로세스를 제공합니다." },
  { title: "Learning Materials", titleKo: "학습 교재", description: "프로그램별 학습 교재와 진단 도구를 제공합니다." },
  { title: "Business Growth", titleKo: "사업 성장", description: "작은 센터에서 더 큰 사업으로 성장할 수 있는 확장 구조를 지원합니다." },
];

// ── Who is JOHN for ──────────────────────────────────────────────
export const whoIsJohnFor = [
  "영어 선생님",
  "과외 강사",
  "공부방 원장",
  "교습소 원장",
  "기존 영어학원 원장",
  "교육사업 예비 창업자",
  "성인영어 창업 희망자",
  "새로운 프로그램이 필요한 기존 학원",
  "개인 교육사업을 브랜드화하고 싶은 사람",
];

// ── Franchise Process ─────────────────────────────────────────────
export const franchiseProcessSteps = [
  { step: "01", title: "상담 신청", description: "현재 상황과 원하는 교육사업에 대해 알려주세요." },
  { step: "02", title: "Business Consultation", description: "희망 지역, 교육 대상, 운영 규모를 상담합니다." },
  { step: "03", title: "Model Selection", description: "나에게 적합한 JOHN Business Model을 선택합니다." },
  { step: "04", title: "Agreement", description: "계약 및 오픈 준비를 진행합니다." },
  { step: "05", title: "Training", description: "교육 프로그램과 운영 시스템 교육을 받습니다." },
  { step: "06", title: "Setup", description: "브랜딩, 커리큘럼, 운영 환경을 준비합니다." },
  { step: "07", title: "Opening", description: "JOHN EDUCATION GROUP 파트너 센터로 운영을 시작합니다." },
];

// ── Franchise Economics — 변수 (실제 금액 표시 금지) ────────────
export const economicsFactors = [
  "Business Model",
  "Location",
  "Space",
  "Number of Programs",
  "Existing Facility",
  "New Opening",
];

// ── FAQ ─────────────────────────────────────────────────────────
export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "교육업 경험이 없어도 시작할 수 있나요?",
    a: "네. JOHN EDUCATION GROUP은 커리큘럼, 진단 시스템, 수업 자료, 운영 프로세스까지 하나의 시스템으로 제공하므로 교육업 경험이 없어도 오픈 전 교육과 운영 가이드를 통해 시작할 수 있습니다.",
  },
  {
    q: "과외 강사도 JOHN 센터를 시작할 수 있나요?",
    a: "네. 개인 과외나 개인 수업을 하던 강사도 JOHN이라는 전문 교육 브랜드 아래에서 정식 교육센터를 운영할 수 있습니다.",
  },
  {
    q: "공부방으로 시작할 수 있나요?",
    a: "네. JOHN STUDY 모델은 작은 공간에서 원장이 단독으로 운영할 수 있도록 설계되어 있으며, 학생이 늘어나면 교습소, 학원으로 단계적으로 확장할 수 있습니다.",
  },
  {
    q: "교습소 형태도 가능한가요?",
    a: "네. 교습소 규모에 맞는 운영 구조와 프로그램을 상담을 통해 안내해드립니다.",
  },
  {
    q: "기존 학원을 JOHN으로 전환할 수 있나요?",
    a: "네. 기존에 운영 중인 영어학원, 교습소, 공부방을 JOHN 브랜드와 시스템으로 전환하는 Brand Conversion을 지원합니다. 처음부터 다시 시작할 필요가 없습니다.",
  },
  {
    q: "현재 학원에 JOHN 프로그램만 추가할 수 있나요?",
    a: "네. 전체 브랜드 전환 없이 Kids Program Addition, Prep Program Addition, Adult Program Addition 등 필요한 프로그램만 도입하는 것도 가능합니다.",
  },
  {
    q: "어린이 영어와 Prep을 같이 운영할 수 있나요?",
    a: "네. JOHN HYBRID 모델을 통해 어린이 영어(JOHN KIDS)와 Academic Prep(JOHN PREP)을 하나의 공간에서 함께 운영할 수 있습니다.",
  },
  {
    q: "어린이와 성인 프로그램을 함께 운영할 수 있나요?",
    a: "네. JOHN HYBRID 모델은 Kids, Prep, Adult 프로그램을 한 공간에서 운영할 수 있도록 설계된 복합형 모델입니다.",
  },
  {
    q: "혼자 운영할 수 있는 모델도 있나요?",
    a: "네. JOHN STUDY와 JOHN 1:1은 원장이 단독으로 운영할 수 있는 모델로 설계되어 있습니다.",
  },
  {
    q: "본사에서는 어떤 지원을 제공하나요?",
    a: "커리큘럼, 학생 진단 시스템, 수업 자료, 브랜딩, 오픈 지원, 원장 교육, 마케팅, 운영 가이드까지 교육사업 운영에 필요한 시스템 전반을 지원합니다. 자세한 내용은 Owner Support를 참고해 주세요.",
  },
  {
    q: "교재와 Curriculum도 제공되나요?",
    a: "네. 각 Business Model에 맞는 커리큘럼과 학습 교재, Lesson Guide, Teaching Resources를 제공합니다.",
  },
  {
    q: "가맹비와 초기비용은 얼마인가요?",
    a: "가맹비와 초기 비용은 선택하시는 Business Model, 지역, 공간, 프로그램 수, 기존 시설 활용 여부, 신규 오픈 여부에 따라 달라져 상담 후 안내해드립니다.",
  },
  {
    q: "어느 지역에서 운영할 수 있나요?",
    a: "희망 지역을 상담을 통해 확인한 뒤 해당 지역에서의 운영 가능 여부와 조건을 함께 안내해드립니다.",
  },
];
