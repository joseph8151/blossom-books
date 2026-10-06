import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "구성·가격 안내",
    title: "학원·학교 레벨테스트 문제집",
    subtitle: "시험까지 남은 기간으로 분량을 고르세요 · 60P부터",
  });
}
