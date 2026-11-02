import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "사고력 수학학원 전용 · Pricing & Workbook Guide",
    title: "사고력 수학 레벨테스트 구성·가격 안내",
    subtitle: "규칙과 패턴 · 도형·공간 · 수 감각 · 사고력·문제해결 · 60P / 100P / 200P / 300P",
  });
}
