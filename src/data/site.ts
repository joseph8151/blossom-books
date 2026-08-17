export const siteConfig = {
  brandNameEn: "Blossom Books",
  brandNameKo: "블러섬북스",
  kakaoChannelUrl: "https://pf.kakao.com/_lbMqX",
  email: "blossomprep@naver.com",
  // 전화 상담 번호. 값을 넣으면 /find 추천 결과와 팀 알림 메일에 전화 상담 버튼이 노출되고,
  // 비워 두면 전화 항목만 숨기고 카카오톡·이메일 상담으로 안내합니다.
  // 예: "010-1234-5678"
  consultPhone: "",
  consultHours: "평일 10:00–19:00 (주말·공휴일 카카오톡 상담)",
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
  { label: "교재 시리즈", href: "/series" },
  { label: "모의고사", href: "/mock-exams" },
  { label: "분량 선택 가이드", href: "/guide" },
  { label: "주문 제작", href: "/custom-order" },
  { label: "기관·학원", href: "/institutions" },
  { label: "블러섬북스 소개", href: "/about" },
  { label: "자주 묻는 질문", href: "/faq" },
  { label: "상담하기", href: "/consultation" },
];
