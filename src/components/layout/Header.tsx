"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { primaryNav, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

// 영문(/en) 페이지에서 노출할 네비게이션 — 현재는 한 장짜리 랜딩이므로 페이지 내 앵커로 이동합니다.
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
    <div className="flex items-center overflow-hidden rounded-full border border-navy-800/20 text-[12px] font-medium">
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
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en") ?? false;

  const nav = isEn ? enNav : primaryNav;
  const kakaoLabel = isEn ? "Chat on KakaoTalk" : "카카오톡 상담";

  return (
    <header className="sticky top-0 z-50 border-b border-navy-800/15 bg-ivory-100/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* 로고 */}
        <Link
          href={isEn ? "/en" : "/"}
          className="flex items-baseline gap-2 shrink-0"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-[26px] font-semibold tracking-tight text-navy-900">
            Blossom Books
          </span>
          <span className="hidden font-label text-[10px] uppercase tracking-[0.18em] text-brass-500 sm:inline">
            Est. Edu Publishing
          </span>
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden items-center gap-7 lg:flex">
          {(isEn ? nav : nav.slice(0, -1)).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-2 text-[14.5px] text-charcoal-900/85 transition-colors hover:text-navy-900"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-brass-500 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher isEn={isEn} />

          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-navy-900 px-5 py-2.5 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800 lg:inline-flex"
          >
            <MessageCircle size={15} strokeWidth={2} />
            {kakaoLabel}
          </a>

          {/* 모바일 메뉴 버튼 */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-navy-900 lg:hidden"
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
          <nav className="flex flex-col px-5 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-navy-800/8 py-3.5 text-[15px] text-charcoal-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
