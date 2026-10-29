import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "Quote Sheet — Exam",
    title: "시험 구성·가격 안내",
    subtitle: "OET · MET · CELBAN · PTE · SAT · ESPT 등 성인·공인시험 대비",
  });
}
