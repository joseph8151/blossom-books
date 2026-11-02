import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "누테 수학(중등) 학원 전용 · Pricing & Workbook Guide",
    title: "중등 수학 심화 구성·가격 안내",
    subtitle: "닮음 · 원주각 · 복합 도형의 넓이 · 연립방정식 · 100P / 200P / 300P",
  });
}
