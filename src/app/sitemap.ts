import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { learnArticles } from "@/data/learnArticles";
import { prepTracks } from "@/data/prepTracks";

// 정적 export(output: "export")에서 라우트 핸들러가 빌드 타임에 고정되도록 명시.
export const dynamic = "force-static";

const baseUrl = "https://blossombooks.org";

// 검색엔진(네이버·구글 등)이 사이트의 실제 페이지를 빠짐없이 찾도록 하는 목록입니다.
// 결제/개인 페이지(체크아웃, 위시리스트)는 검색 노출 대상이 아니므로 제외합니다.
const staticPaths = [
  { path: "", priority: 1, changeFrequency: "daily" as const },
  { path: "/books", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/find", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/level-assessment", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/guide", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/custom-order", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/institutions", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/our-approach", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/compare", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/mock-exams", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/consultation", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/learn", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/transparency", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/copyright", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/en", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/en/books", priority: 0.5, changeFrequency: "weekly" as const },
  { path: "/en/find", priority: 0.4, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${baseUrl}${path === "" ? "/" : `${path}/`}`;

  const entries: MetadataRoute.Sitemap = staticPaths.map(({ path, priority, changeFrequency }) => ({
    url: url(path),
    lastModified: now,
    changeFrequency,
    priority,
  }));

  for (const p of products) {
    entries.push({ url: url(`/books/${p.id}`), lastModified: now, changeFrequency: "weekly", priority: 0.8 });
    entries.push({ url: url(`/en/books/${p.id}`), lastModified: now, changeFrequency: "weekly", priority: 0.5 });
  }

  for (const a of learnArticles) {
    entries.push({ url: url(`/learn/${a.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.5 });
  }

  for (const t of prepTracks) {
    entries.push({ url: url(`/prep/${t.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  }

  return entries;
}
