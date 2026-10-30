import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "Sample — Level Test",
    title: "학원 레벨테스트 샘플 문제",
    subtitle: "영어 레벨테스트 G1–G6 · Reading · Vocabulary · Grammar · Writing",
  });
}
