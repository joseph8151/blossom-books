import { PREMIUM_BONUS_COUNT } from "@/data/premiumBonus";

// 200P+ 상품 배지. 세일 배지처럼 보이지 않도록 브랜드 브래스 컬러의 얇은 테두리와
// 레터스페이싱만 사용하고, 위치·크기에 따라 문구를 1~2개만 노출합니다.

type Variant = "card" | "inline" | "edition" | "compact";

export default function PremiumBadge({ variant = "card" }: { variant?: Variant }) {
  if (variant === "compact") {
    return (
      <span className="inline-flex items-center border border-brass-500/45 px-1.5 py-0.5 font-label text-[8.5px] uppercase tracking-[0.12em] text-brass-500">
        Premium
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <span className="inline-flex items-center gap-1.5 border border-brass-500/45 px-2 py-0.5 font-label text-[9px] uppercase tracking-[0.14em] text-brass-500">
        200P+ Premium
      </span>
    );
  }

  // 상세페이지 상단 — 등급을 크게 보여주는 형태
  if (variant === "edition") {
    return (
      <span className="inline-flex flex-col border-l-2 border-brass-500 py-0.5 pl-3">
        <span className="font-display text-[15px] font-semibold leading-none text-navy-950">200P+</span>
        <span className="mt-1 font-label text-[9px] uppercase leading-none tracking-[0.16em] text-brass-500">
          Premium Edition
        </span>
      </span>
    );
  }

  // 상품 카드 — 표지 위에 얹히는 작은 배지
  return (
    <span className="inline-flex flex-col items-end border border-brass-500/45 bg-navy-950/92 px-2.5 py-1.5 text-right">
      <span className="font-label text-[9px] uppercase leading-none tracking-[0.16em] text-brass-500">200P+ Premium</span>
      <span className="mt-1 font-label text-[7.5px] uppercase leading-none tracking-[0.1em] text-ivory-100/70">
        {PREMIUM_BONUS_COUNT} Bonus Materials
      </span>
    </span>
  );
}
