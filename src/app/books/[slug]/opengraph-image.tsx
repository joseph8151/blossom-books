import { renderQuoteOgImage } from "@/lib/ogTemplate";
import { products, trackLabels } from "@/data/products";

// 정적 export에서 동적 세그먼트의 OG 이미지도 빌드 타임에 고정되도록
// page.tsx와 동일하게 generateStaticParams가 필요합니다. 교재마다 서로 다른
// 이미지를 만들어, 모든 상품 페이지가 사이트 공통 opengraph-image.png를
// 공유하지 않도록 합니다.
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);

  if (!product) {
    return renderQuoteOgImage({
      eyebrow: "Blossom Books",
      title: "교재를 찾을 수 없습니다",
      subtitle: "",
    });
  }

  return renderQuoteOgImage({
    eyebrow: trackLabels[product.track],
    title: product.titleKo,
    subtitle: `${product.examOrCurriculum} · ${product.gradeRange}`,
  });
}
