import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "Real Reviews",
    title: "후기 모음",
    subtitle: "레벨테스트·국제학교 입학시험·공인영어시험, 실제 고객님들이 카카오톡으로 남겨주신 이야기",
  });
}
