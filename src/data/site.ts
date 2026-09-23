export const siteConfig = {
  brandNameEn: "Blossom Books",
  brandNameKo: "블러섬북스",
  kakaoChannelUrl: "https://pf.kakao.com/_lbMqX",
  email: "blossomprep@naver.com",
  // 사업자 정보 (상호·대표자명은 표기하지 않음)
  businessRegistrationNumber: "654-60-00645",
  addressKo: "서울특별시 서초구 강남대로8길 39-26, 2층 A9호",
  addressShort: "서울 서초구 강남대로8길 39-26",
  // 문의 접수용 Web3Forms 공개 access key. (수신 메일 주소는 Web3Forms에만 저장되어 화면엔 노출되지 않음)
  // Cloudflare 환경변수 NEXT_PUBLIC_WEB3FORMS_KEY 가 있으면 그 값을 우선 사용합니다.
  web3formsAccessKey:
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "d9731ac4-cebd-4fdc-94be-ce0191935a6b",
};

export const primaryNav = [
  { label: "홈", href: "/" },
  { label: "교재 찾기", href: "/books" },
  { label: "교재 추천받기", href: "/find" },
  { label: "레벨 진단 교재", href: "/level-assessment" },
  { label: "모의고사", href: "/mock-exams" },
  { label: "분량 선택 가이드", href: "/guide" },
  { label: "주문 제작", href: "/custom-order" },
  { label: "기관·학원", href: "/institutions" },
  { label: "블러섬북스 소개", href: "/about" },
  { label: "자주 묻는 질문", href: "/faq" },
  { label: "상담하기", href: "/consultation" },
];

// 사이트 공통 키워드 — layout.tsx 기본 메타데이터와 상품 상세 페이지(books/[slug])의
// keywords를 합칠 때 함께 사용합니다. 네이버는 Google과 달리 meta keywords를
// 여전히 일부 참고하므로 실제 검색 유입 키워드 위주로 관리합니다.
export const siteKeywords = [
  "국제학교 문제집",
  "미국 교과서 문제집",
  "미국 수학 문제집",
  "국제학교 입학시험 문제집",
  "국제학교 모의고사",
  "학원 교재 제작",
  "학원 문제집 제작",
  "프랩학원 교재",
  "과외 수업 자료",
  "맞춤 문제집 제작",
  "AP 문제집",
  "CAT4 문제집",
  "MAP 테스트 문제집",
  "ISEE SSAT 문제집",
  "OET 문제집",
  "PTE 문제집",
  "영어 레벨테스트 문제집",
  "국어 문해력 문제집",
  "문해력 레벨테스트",
  "레벨테스트 문제집",
  "블러섬북스",
];
