import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "영어 레벨테스트 전용 · Pricing & Workbook Guide",
    title: "영어 레벨테스트 구성·가격 안내",
    subtitle: "Reading · Vocabulary · Grammar · Writing · G1–G6 · 60P / 100P / 200P / 300P",
  });
}
