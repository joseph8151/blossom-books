import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "Pricing & Workbook Guide",
    title: "사고력·영재 검사 · 수학 경시대회 구성·가격 안내",
    subtitle: "SCAT · CogAT · NNAT · OLSAT · AMC · MATHCOUNTS · MOEMS",
  });
}
