import QuoteGuide from "./components/QuoteGuide";

// 카카오톡 상담사가 고객에게 "가격 물어볼 때" 직접 링크로만 전달하는 비공개
// Workbook Selection & Pricing Guide입니다. 홈/메뉴/푸터/사이트맵/교재 찾기
// 어디에도 연결하지 않으며, 검색 노출도 막아둡니다(아래 robots 설정).
export const metadata = {
  title: "구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 구성표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.blossombooks.org/quote/" },
  openGraph: {
    title: "Blossom Books 구성 안내",
    description: "카카오톡 상담에서 안내하는 구성표입니다.",
    url: "https://www.blossombooks.org/quote/",
    images: ["https://www.blossombooks.org/quote/opengraph-image"],
  },
};

// 학부모가 "무엇을 사면 되는지"를 먼저 보고, 가격은 표 하나로만 확인하도록
// 한 화면 흐름으로 정리했습니다. 상담 버튼은 페이지에 하나만 둡니다.
// 국제학교 입학시험(MAP·CAT4·ISEE 등)은 /quote-international-school 링크 한 줄로만 연결합니다.
export default function QuotePage() {
  return <QuoteGuide />;
}
