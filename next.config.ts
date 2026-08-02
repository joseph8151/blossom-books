import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 등 정적 호스팅을 위한 완전 정적(static) 빌드 → `out/` 폴더 생성
  output: "export",
  // 정적 호스팅에서 경로를 안정적으로 서빙하기 위해 후행 슬래시 사용 (/books/ → /books/index.html)
  trailingSlash: true,
  images: {
    // next/image 최적화 서버가 없으므로 비활성화 (현재 프로젝트는 next/image 미사용)
    unoptimized: true,
  },
};

export default nextConfig;
