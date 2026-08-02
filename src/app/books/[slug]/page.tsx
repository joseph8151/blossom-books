import { notFound } from "next/navigation";
import Link from "next/link";
import { FileCheck2, FileText, MessageCircle, ShoppingBag, Headphones } from "lucide-react";
import { products, trackLabels } from "@/data/products";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";
import ProductCard from "@/components/books/ProductCard";
import SamplePreviewButton from "@/components/books/SamplePreviewButton";
import { siteConfig } from "@/data/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

// Next.js 16: params는 Promise이므로 await 후 사용해야 합니다.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) return {};
  return {
    title: product.titleKo,
    description: product.summaryKo,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.track === product.track && p.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
      <nav className="text-[12.5px] text-charcoal-600">
        <Link href="/books" className="hover:text-navy-900">교재 찾기</Link>
        <span className="mx-2">/</span>
        <span>{trackLabels[product.track]}</span>
      </nav>

      <div className="mt-8 grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        {/* 표지 목업 */}
        <div className="flex items-start justify-center bg-ivory-200/50 py-16">
          <BookCoverMockup
            eyebrow={product.materialType === "existing" ? "Student Workbook" : "Custom Order"}
            title={product.title.split(" — ")[0]}
            subtitle={product.examOrCurriculum}
            tone={product.coverAccent === "navy" ? "navy" : "ivory"}
            tabLabel="01"
            className="max-w-[260px]"
          />
        </div>

        {/* 정보 */}
        <div>
          <span className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">
            {trackLabels[product.track]}
          </span>
          <h1 className="mt-3 font-display text-[34px] font-semibold leading-tight text-navy-950 sm:text-[40px]">
            {product.titleKo}
          </h1>
          <p className="mt-2 text-[14px] text-charcoal-600">
            {product.examOrCurriculum} · {product.gradeRange}
            {product.levelLabel ? ` · ${product.levelLabel}` : ""}
          </p>

          <p className="mt-6 max-w-xl text-[14.5px] leading-relaxed text-charcoal-600">
            {product.descriptionKo}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-charcoal-600">
            {product.includesAnswerKey && (
              <span className="inline-flex items-center gap-1.5">
                <FileCheck2 size={15} className="text-navy-800" /> 정답·상세 해설집 포함
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <FileText size={15} className="text-navy-800" /> {product.fileFormat} 파일 제공
            </span>
            {product.includesAudio && (
              <span className="inline-flex items-center gap-1.5">
                <Headphones size={15} className="text-navy-800" /> 리스닝 오디오(MP3) 제공
              </span>
            )}
            {product.pageCount && <span>{product.pageCount}페이지</span>}
          </div>

          <div className="mt-8 border-y border-navy-800/12 py-6">
            <p className="font-display text-[20px] font-semibold text-navy-950">가격·구성 상담 안내</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-charcoal-600">
              교재 구성과 이용 목적(개인·수업·기관)에 맞춰 카카오톡으로 편하게 안내해 드립니다.
              구매 전 무료 샘플도 확인하실 수 있습니다.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
            >
              <MessageCircle size={16} />
              카카오톡 상담하기
            </a>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-7 py-3.5 text-[14px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
            >
              <ShoppingBag size={16} />
              구매·주문 상담
            </Link>
            <SamplePreviewButton available={product.sampleAvailable} />
          </div>

          {/* 교재 구성 */}
          <div className="mt-12">
            <h2 className="font-display text-[19px] font-semibold text-navy-950">교재 구성</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.components.map((c) => (
                <div key={c.label} className="border border-navy-800/12 bg-ivory-200/40 p-4">
                  <p className="font-label text-[11px] uppercase tracking-[0.1em] text-brass-500">{c.label}</p>
                  <p className="mt-1.5 text-[13px] text-charcoal-600">{c.descriptionKo}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 주요 단원 */}
          <div className="mt-10">
            <h2 className="font-display text-[19px] font-semibold text-navy-950">주요 단원</h2>
            <ol className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[13.5px] text-charcoal-600">
              {product.units.map((u, i) => (
                <li key={u} className="flex gap-2">
                  <span className="font-label text-[11px] text-brass-500">{String(i + 1).padStart(2, "0")}</span>
                  {u}
                </li>
              ))}
            </ol>
          </div>

          {/* 추천 대상 */}
          <div className="mt-10 border-l-2 border-brass-500 pl-5">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-navy-800/70">추천 대상</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-charcoal-600">{product.recommendedForKo}</p>
          </div>
        </div>
      </div>

      {/* 관련 교재 */}
      {related.length > 0 && (
        <div className="mt-24 border-t border-navy-800/12 pt-14">
          <h2 className="font-display text-[24px] font-semibold text-navy-950">관련 교재</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
