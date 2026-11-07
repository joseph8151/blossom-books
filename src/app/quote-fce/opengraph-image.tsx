import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "FCE(Cambridge English: First) 전용 · Pricing & Workbook Guide",
    title: "FCE 구성·가격 안내",
    subtitle: "Use of English · Reading · Listening · Writing · 100P / 200P",
  });
}
