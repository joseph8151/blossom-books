// ────────────────────────────────────────────────────────────
// 블러섬북스 상품 및 주문 관련 타입 정의
// 실제 상품 데이터는 이 타입을 기반으로 /src/data/products.ts 에서 관리합니다.
// ────────────────────────────────────────────────────────────

export type CurriculumTrack =
  | "us-curriculum" // 미국 교과과정
  | "ap" // AP
  | "admissions" // 국제학교 및 입학시험
  | "level-test" // 학원·어학원 레벨테스트 준비
  | "certified-exam"; // 공인 영어시험 및 전문시험

export type MaterialType = "existing" | "custom"; // 기존 교재 / 주문 제작
export type PaymentRegion = "domestic" | "international";

export interface ProductComponent {
  label: string; // 예: "Student Workbook", "Answer Key"
  descriptionKo: string;
}

export interface Product {
  id: string; // slug
  title: string; // 영문 표기 (표지용)
  titleKo: string; // 한글 표기
  track: CurriculumTrack;
  subject: string; // 과목
  examOrCurriculum: string; // 시험명 또는 교육과정명 (예: "Algebra 1", "CAT4 Level E")
  gradeRange: string; // 대상 학년/연령
  readingLevel?: string; // 권장 Reading Level / SR 범위 (예: "SR 3.0–4.0")
  levelLabel?: string; // 권장 레벨 (예: "중상~상")
  difficulty: 1 | 2 | 3 | 4 | 5;
  materialType: MaterialType;
  includesAnswerKey: boolean;
  includesDetailedExplanations: boolean;
  includesAudio?: boolean; // 리스닝 오디오(MP3) 파일 제공 여부
  fileFormat: "PDF";
  pageCount?: number;
  components: ProductComponent[];
  units: string[]; // 주요 단원
  summaryKo: string; // 카드용 짧은 설명
  descriptionKo: string; // 상세 설명
  recommendedForKo: string; // 추천 대상
  // 가격 — 관리자가 상품별로 개별 설정. 미정인 경우 undefined → "상담 문의" 표시
  priceKRW?: number;
  priceUSD?: number;
  domesticPayment: "bank-transfer";
  internationalPayment: "paypal";
  coverAccent: "navy" | "burgundy" | "brass"; // 표지 목업 강조색
  sampleAvailable: boolean;
}

export type CustomerType =
  | "individual" // 개인
  | "tutor" // 과외 선생님
  | "academy" // 학원
  | "prep-academy" // 프랩학원
  | "institution"; // 교육기관

export type DomesticOrderStatus =
  | "order-requested" // 주문 신청
  | "payment-pending" // 입금 대기
  | "payment-verifying" // 입금 확인 중
  | "payment-confirmed" // 결제 확인
  | "preparing-shipment" // 발송 준비
  | "shipped" // 발송 완료
  | "cancelled"; // 취소

export type InternationalOrderStatus =
  | "payment-pending"
  | "payment-approved"
  | "payment-verification"
  | "preparing-files"
  | "delivered"
  | "refunded"
  | "cancelled";

export interface CustomOrderRequest {
  customerType: CustomerType;
  subject: string;
  examOrCurriculum: string;
  grade: string;
  currentLevel: string;
  materialType: string; // 필요한 교재 종류
  expectedPageCount: string;
  questionTypes: string;
  purpose: string;
  desiredCompletion: string;
  additionalNotes?: string;
  name: string;
  contact: string;
  email: string;
  privacyConsent: boolean;
}
