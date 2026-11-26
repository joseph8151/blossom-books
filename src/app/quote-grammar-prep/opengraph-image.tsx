import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "초등 고학년 문법 완성(중등 준비) 전용 · Pricing & Workbook Guide",
    title: "초등 고학년 문법 완성 — 중등 준비 구성·가격 안내",
    subtitle: "관계대명사 · 수동태 · 현재완료 · to부정사/동명사 · 40P / 60P / 100P / 200P / 300P",
  });
}
