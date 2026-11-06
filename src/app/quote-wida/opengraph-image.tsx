import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "Pricing & Workbook Guide",
    title: "WIDA ACCESS 구성·가격 안내",
    subtitle: "Listening · Reading · Writing · Speaking · 100P / 200P / 300P",
  });
}
