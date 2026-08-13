export const siteConfig = {
  brandNameEn: "JOHN EDUCATION GROUP",
  brandNameShort: "JOHN",
  brandNameKo: "존 에듀케이션 그룹",
  tagline: "One Education Brand. Multiple Business Models.",
  kakaoChannelUrl: "https://pf.kakao.com/_lbMqX",
  email: "franchise@johneducationgroup.com",
  // 사업자 정보 (상호·대표자명은 표기하지 않음)
  businessRegistrationNumber: "654-60-00645",
  addressKo: "서울특별시 서초구 강남대로8길 39-26, 2층 A9호",
  addressShort: "서울 서초구 강남대로8길 39-26",
  // 가맹 문의 접수용 Web3Forms 공개 access key. (수신 메일 주소는 Web3Forms에만 저장되어 화면엔 노출되지 않음)
  // Cloudflare 환경변수 NEXT_PUBLIC_WEB3FORMS_KEY 가 있으면 그 값을 우선 사용합니다.
  web3formsAccessKey:
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "d9731ac4-cebd-4fdc-94be-ce0191935a6b",
};

export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Business Models", href: "/business-models" },
  { label: "Why JOHN", href: "/#why-john" },
  { label: "Curriculum", href: "/#curriculum" },
  { label: "Owner Support", href: "/#owner-support" },
  { label: "Franchise", href: "/#franchise-process" },
  { label: "FAQ", href: "/faq" },
];
