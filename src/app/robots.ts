import type { MetadataRoute } from "next";

// 정적 export(output: "export")에서 라우트 핸들러가 빌드 타임에 고정되도록 명시.
export const dynamic = "force-static";

// 네이버(Yeti)·구글 등 모든 검색엔진 크롤러에게 전 페이지 수집을 허용하고,
// sitemap.xml 위치를 알려줍니다. 결제/개인 페이지만 제외합니다.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/wishlist"],
    },
    sitemap: "https://blossombooks.org/sitemap.xml",
  };
}
