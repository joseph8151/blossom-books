import { renderQuoteOgImage } from "@/lib/ogTemplate";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderQuoteOgImage({
    eyebrow: "International School Admission Prep",
    title: "국제학교 입학시험 준비",
    subtitle: "MAP Growth · CAT4 · ISEE · Oxford Online Placement Test",
  });
}
