"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { primaryNav } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const base = href.split("#")[0].split("?")[0];
    if (base === "" || base === "/") return pathname === "/";
    return pathname?.startsWith(base) ?? false;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-navy-900/12 bg-ivory-100/95 shadow-soft"
          : "border-navy-900/8 bg-ivory-100/85"
      )}
    >
      <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between gap-4 px-5 lg:px-10">
        {/* 로고 — 성장하는 막대(여러 사업 모델 → 하나의 브랜드)를 형상화한 마크 */}
        <Link href="/" className="group flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <span className="flex h-8 shrink-0 items-end gap-[3px]" aria-hidden>
            <span className="h-[14px] w-[6px] rounded-full bg-navy-700 transition-all group-hover:h-[16px]" />
            <span className="h-[22px] w-[6px] rounded-full bg-navy-900 transition-all group-hover:h-[24px]" />
            <span className="h-[32px] w-[6px] rounded-full bg-coral-500 transition-all group-hover:h-[34px]" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[19px] font-extrabold tracking-[-0.01em] text-navy-900">
              JOHN <span className="font-semibold text-charcoal-900/60">EDUCATION GROUP</span>
            </span>
            <span className="mt-1 hidden font-label text-[8.5px] font-medium uppercase tracking-[0.22em] text-coral-500 sm:inline">
              Education Franchise Company
            </span>
          </span>
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden items-center gap-1 lg:flex xl:gap-1.5">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-3.5 py-2 text-[14px] transition-colors",
                  active ? "bg-navy-900 text-ivory-100" : "text-charcoal-900/80 hover:bg-navy-900/6 hover:text-navy-900"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/business-models"
            className="hidden items-center gap-1.5 rounded-full border border-navy-900/25 px-4 py-2.5 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-900/50 lg:inline-flex"
          >
            사업 모델 찾기
          </Link>

          <Link
            href="/consultation"
            className="hidden items-center gap-1.5 rounded-full bg-coral-500 px-5 py-2.5 text-[13.5px] font-semibold text-navy-950 shadow-coral transition-all hover:-translate-y-0.5 hover:bg-coral-400 lg:inline-flex"
          >
            가맹 상담 신청
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>

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
          "grid overflow-hidden border-t border-navy-900/10 bg-ivory-100 transition-[grid-template-rows] duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col px-5 py-2">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between border-b border-navy-900/8 py-3.5 text-[15px] transition-colors",
                  isActive(item.href) ? "text-navy-900" : "text-charcoal-900 hover:text-navy-900"
                )}
              >
                {item.label}
                {isActive(item.href) && <span className="h-1.5 w-1.5 rounded-full bg-coral-500" />}
              </Link>
            ))}
            <Link
              href="/consultation"
              onClick={() => setOpen(false)}
              className="mt-4 mb-3 inline-flex items-center justify-center gap-2 rounded-full bg-coral-500 py-3.5 text-[14px] font-semibold text-navy-950"
            >
              가맹 상담 신청
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
