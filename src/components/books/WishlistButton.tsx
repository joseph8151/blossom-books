"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// 로그인 없이 localStorage에 관심 교재를 저장합니다.
const KEY = "blossom_wishlist";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function write(ids: string[]) {
  localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("wishlist-change"));
}

export function getWishlist(): string[] {
  return read();
}
export function toggleWishlist(id: string): boolean {
  const ids = read();
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  write(next);
  return next.includes(id);
}

// 공유 훅 — 컴포넌트 간 동기화
function useWishlistState(id?: string) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setIds(read());
    sync();
    window.addEventListener("wishlist-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("wishlist-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, [id]);
  return ids;
}

export function useWishlistIds() {
  return useWishlistState();
}

export default function WishlistButton({ productId, className }: { productId: string; className?: string }) {
  const ids = useWishlistState(productId);
  const on = ids.includes(productId);
  return (
    <button
      type="button"
      aria-label={on ? "관심 교재에서 빼기" : "관심 교재에 담기"}
      title={on ? "관심 교재에서 빼기" : "관심 교재에 담기"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className={cn(
        "flex h-8 w-8 items-center justify-center border bg-ivory-100/90 backdrop-blur transition-colors",
        on ? "border-burgundy-700/40" : "border-navy-800/15 hover:border-navy-800/35",
        className
      )}
    >
      <Heart size={15} className={on ? "fill-burgundy-700 text-burgundy-700" : "text-navy-800/55"} strokeWidth={2} />
    </button>
  );
}
