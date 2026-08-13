"use client";

import Link from "next/link";
import { Heart, ArrowRight, MessageCircle } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/books/ProductCard";
import { useWishlistIds } from "@/components/books/WishlistButton";
import { siteConfig } from "@/data/site";

export default function WishlistPage() {
  const ids = useWishlistIds();
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">My wishlist</p>
      <h1 className="mt-3 font-display text-[30px] font-semibold text-navy-950 sm:text-[36px]">관심 교재</h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
        하트로 담아 둔 교재를 한곳에서 확인하고, 바로 상담으로 이어가세요. (로그인 없이 이 브라우저에 저장됩니다.)
      </p>

      {saved.length === 0 ? (
        <div className="mt-14 border border-dashed border-navy-800/20 py-16 text-center">
          <Heart size={26} className="mx-auto text-navy-800/25" />
          <p className="mt-4 text-[14px] text-charcoal-600">아직 담은 교재가 없습니다.</p>
          <p className="mt-1.5 text-[13px] text-charcoal-600">
            교재 카드의 하트(♡)를 눌러 관심 교재에 담아보세요.
          </p>
          <Link
            href="/books"
            className="group mt-6 inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            교재 둘러보기
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-8 text-[12.5px] text-charcoal-600">담은 교재 {saved.length}개</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {saved.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center gap-3 border-t border-navy-800/12 pt-10 text-center">
            <p className="text-[13.5px] text-charcoal-600">담아 둔 교재 중 어떤 구성이 맞을지 함께 골라 드립니다.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={siteConfig.kakaoChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
              >
                <MessageCircle size={15} /> 카카오톡 상담
              </a>
              <Link
                href="/find"
                className="inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
              >
                교재 추천받기 <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
