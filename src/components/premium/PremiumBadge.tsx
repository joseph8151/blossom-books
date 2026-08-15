// 200P+ 선택이 가능한 상품에 붙는 배지.
// 세일 배지처럼 보이지 않도록 브랜드 브래스 컬러의 얇은 테두리 + 레터스페이싱만 씁니다.

export default function PremiumBadge({ variant = "card" }: { variant?: "card" | "inline" }) {
  if (variant === "inline") {
    return (
      <span className="inline-flex items-center gap-1.5 border border-brass-500/45 px-2 py-0.5 font-label text-[9px] uppercase tracking-[0.14em] text-brass-500">
        200P+ Premium
      </span>
    );
  }
  return (
    <span className="inline-flex flex-col items-end border border-brass-500/45 bg-navy-950/92 px-2.5 py-1.5 text-right">
      <span className="font-label text-[9px] uppercase leading-none tracking-[0.16em] text-brass-500">200P+ Premium</span>
      <span className="mt-1 font-label text-[7.5px] uppercase leading-none tracking-[0.1em] text-ivory-100/70">
        6 Bonus Materials
      </span>
    </span>
  );
}
