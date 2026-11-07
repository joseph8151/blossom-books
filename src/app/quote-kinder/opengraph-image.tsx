import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "킨더(유치원) 5세·6세 전용 · Pricing & Workbook Guide",
    title: "킨더 5세·6세 레벨테스트 구성·가격 안내",
    subtitle: "Alphabet · Phonics · Numbers · Shapes · 60P / 100P / 200P",
  });
}
