import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "문해원 국어학원 전용 · Pricing & Workbook Guide",
    title: "국어 문해력 레벨테스트 구성·가격 안내",
    subtitle: "어휘 · 핵심 요지 · 내용 파악 · 문맥 · 구조 · 추론 · 60P / 100P / 200P / 300P",
  });
}
