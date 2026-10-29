import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "Pricing & Workbook Guide",
    title: "미국교과·AP 구성·가격 안내",
    subtitle: "G1–G12 영어·수학 · Geometry · Algebra · Precalculus · Calculus · AP",
  });
}
