"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, Heart } from "lucide-react";
import { primaryNav, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { useWishlistIds } from "@/components/books/WishlistButton";

// 데스크톱 상단 바에 노출할 핵심 메뉴 (과밀 방지를 위해 엄선). 전체 메뉴는 모바일 패널에 유지됩니다.
const koDesktopNav = [
  { label: "교재 찾기", href: "/books" },
  { label: "레벨 진단", href: "/level-assessment" },
  { label: "교재 시리즈", href: "/series" },
  { label: "주문 제작", href: "/custom-order" },
  { label: "기관·학원", href: "/institutions" },
  { label: "블러섬북스 소개", href: "/about" },
];

// 영문(/en) 페이지 네비게이션 — 한 장짜리 랜딩이므로 페이지 내 앵커로 이동합니다.
const enNav = [
  { label: "Home", href: "/en" },
  { label: "Why Blossom Books", href: "/en#why" },
  { label: "Sample Books", href: "/en#samples" },
  { label: "Payment", href: "/en#payment" },
  { label: "Contact", href: "/en#contact" },
];

/** KO / EN 언어 스위처 */
function LanguageSwitcher({ isEn }: { isEn: boolean }) {
  return (
    <div className="flex items-center overflow-hidden border border-navy-800/20 text-[12px] font-medium shadow-soft">
      <Link
        href="/"
        aria-current={!isEn ? "page" : undefined}
        className={cn(
          "px-3 py-1.5 transition-colors",
          !isEn ? "bg-navy-900 text-ivory-100" : "text-charcoal-900/70 hover:text-navy-900"
        )}
      >
        KO
      </Link>
      <Link
        href="/en"
        aria-current={isEn ? "page" : undefined}
        className={cn(
          "px-3 py-1.5 transition-colors",
          isEn ? "bg-navy-900 text-ivory-100" : "text-charcoal-900/70 hover:text-navy-900"
        )}
      >
        EN
      </Link>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en") ?? false;
  const wishCount = useWishlistIds().length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const desktopNav = isEn ? enNav : koDesktopNav;
  const mobileNav = isEn ? enNav : primaryNav;
  const kakaoLabel = isEn ? "Chat on KakaoTalk" : "카카오톡 상담";

  const isActive = (href: string) => {
    const base = href.split("#")[0].split("?")[0];
    if (base === "/" || base === "/en") return pathname === base;
    return pathname?.startsWith(base) ?? false;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-navy-800/15 bg-ivory-100/90 shadow-soft"
          : "border-navy-800/10 bg-ivory-100/80"
      )}
    >
      {/* 상단 브래스 액센트 라인 — 브랜드 시그니처 */}
      <div className="h-[3px] w-full bg-gradient-to-r from-brass-500/0 via-brass-500 to-brass-500/0" />

      <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between gap-4 px-5 lg:px-10">
        {/* 로고 — 모노그램 + 워드마크 */}
        <Link
          href={isEn ? "/en" : "/"}
          className="group flex items-center gap-2.5 shrink-0"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-brass-500/55 bg-brass-500/[0.06] transition-colors group-hover:border-brass-500">
            <span className="font-display text-[19px] font-semibold italic leading-none text-brass-500">B</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[23px] font-semibold tracking-[-0.01em] text-navy-900">Blossom Books</span>
            <span className="mt-1 hidden font-label text-[8.5px] uppercase tracking-[0.22em] text-brass-500 sm:inline">
              Educational Workbook Publisher
            </span>
          </span>
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {desktopNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative whitespace-nowrap py-2 text-[14px] transition-colors",
                  active ? "text-navy-900" : "text-charcoal-900/80 hover:text-navy-900"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px bg-brass-500 transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {!isEn && (
            <Link
              href="/wishlist"
              aria-label="관심 교재"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-900/5 lg:flex"
            >
              <Heart size={18} className={wishCount > 0 ? "fill-burgundy-700 text-burgundy-700" : ""} />
              {wishCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy-700 px-1 font-label text-[9px] font-semibold text-ivory-100">
                  {wishCount}
                </span>
              )}
            </Link>
          )}

          <LanguageSwitcher isEn={isEn} />

          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 bg-navy-900 px-5 py-2.5 text-[13.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift lg:inline-flex"
          >
            <MessageCircle size={15} strokeWidth={2} />
            {kakaoLabel}
          </a>

          {/* 모바일 메뉴 버튼 */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-900/5 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 패널 */}
      <div
        className={cn(
          "grid overflow-hidden border-t border-navy-800/10 bg-ivory-100 transition-[grid-template-rows] duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col px-5 py-2">
            {mobileNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between border-b border-navy-800/8 py-3.5 text-[15px] transition-colors",
                  isActive(item.href) ? "text-navy-900" : "text-charcoal-900 hover:text-navy-900"
                )}
              >
                {item.label}
                {isActive(item.href) && <span className="h-1.5 w-1.5 rounded-full bg-brass-500" />}
              </Link>
            ))}
            {!isEn && (
              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-navy-800/8 py-3.5 text-[15px] text-charcoal-900 hover:text-navy-900"
              >
                <span className="inline-flex items-center gap-2">
                  <Heart size={16} className={wishCount > 0 ? "fill-burgundy-700 text-burgundy-700" : ""} /> 관심 교재
                </span>
                {wishCount > 0 && <span className="font-label text-[12px] text-burgundy-700">{wishCount}</span>}
              </Link>
            )}
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 mb-3 inline-flex items-center justify-center gap-2 bg-navy-900 py-3.5 text-[14px] font-medium text-ivory-100"
            >
              <MessageCircle size={16} />
              {kakaoLabel}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
