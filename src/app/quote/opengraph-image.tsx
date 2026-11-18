import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "Pricing & Workbook Guide",
    title: "학원·학교 레벨테스트 문제집",
    subtitle: "영어 · 국어 · 수학 — 40P부터 시험별로 필요한 구성만 선택",
  });
}
