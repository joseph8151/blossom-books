// 채널 홈 주소. 화면의 상담 CTA 는 여기가 아니라 아래 kakaoChatUrl 을 씁니다.
const kakaoChannelUrl = "https://pf.kakao.com/_lbMqX";

export const siteConfig = {
  brandNameEn: "Blossom Books",
  brandNameKo: "블러섬북스",
  kakaoChannelUrl,
  // 채널 홈을 한 번 더 거치지 않고 1:1 채팅창으로 바로 진입 (상담 전환용)
  kakaoChatUrl: `${kakaoChannelUrl}/chat`,
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
  { label: "교재 시리즈", href: "/series" },
  { label: "모의고사", href: "/mock-exams" },
  { label: "분량 선택 가이드", href: "/guide" },
  { label: "주문 제작", href: "/custom-order" },
  { label: "기관·학원", href: "/institutions" },
  { label: "블러섬북스 소개", href: "/about" },
  { label: "자주 묻는 질문", href: "/faq" },
  { label: "상담하기", href: "/consultation" },
];
