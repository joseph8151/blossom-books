import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "Flagship · Pricing & Workbook Guide",
    title: "SR 테스트 리딩 종합 문제집",
    subtitle: "SR 1.0 – 12.0 전 레벨 · 100P / 200P / 300P",
  });
}
