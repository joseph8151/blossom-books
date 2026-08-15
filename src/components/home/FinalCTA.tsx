import Link from "next/link";
import { MessageCircle, FileSearch, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

const trust = [
  { k: "Real Workbooks", v: "실제 Sample을 확인하세요." },
  { k: "Clear Pricing", v: "40P ₩130,000 · 60P ₩150,000 · 100P ₩190,000" },
  { k: "Human Support", v: "구매 전 상담원이 확인합니다." },
  { k: "Transparent Policy", v: "발송 후 환불 불가 · 오류 확인 시 최대 2회 수정" },
  { k: "Editorial Standard", v: "일관된 제작·검수 기준." },
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-ivory-100 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(173,138,78,0.2),transparent_55%)]" />
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        {/* 최종 신뢰 Bar */}
        <div className="grid gap-px overflow-hidden border border-ivory-100/12 bg-ivory-100/10 sm:grid-cols-2 lg:grid-cols-5">
          {trust.map((t) => (
            <div key={t.k} className="bg-navy-950 px-4 py-5 text-center">
              <p className="font-label text-[10px] uppercase tracking-[0.1em] text-brass-400">{t.k}</p>
              <p className="mt-1.5 text-[11.5px] leading-snug text-ivory-200/75">{t.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <span className="eyebrow eyebrow--center eyebrow--light">Ready to choose?</span>
          <h2 className="mt-5 font-display text-[28px] font-semibold leading-tight sm:text-[35px]">
            준비할 시험이 정해졌다면, 필요한 만큼 시작하세요.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-ivory-200/80">
            40P ₩130,000 · 60P ₩150,000 · 100P ₩190,000. 100P 이상 집중 Prep이 필요하시면 별도 문의로
            안내해 드립니다.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 bg-ivory-100 px-7 py-3.5 text-[14px] font-medium text-navy-950 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ivory-200 hover:shadow-lift"
            >
              교재 찾기
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 border border-ivory-100/30 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-all hover:-translate-y-0.5 hover:border-ivory-100/60"
            >
              <FileSearch size={16} />
              무료 Sample 보기
            </Link>
            <a
              href={siteConfig.kakaoChatUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-brass-500 px-7 py-3.5 text-[14px] font-medium text-navy-950 shadow-gold transition-all hover:-translate-y-0.5 hover:bg-brass-400"
            >
              <MessageCircle size={16} />
              공식 카카오톡으로 구매
            </a>
          </div>
          <p className="mt-5 text-[12px] text-ivory-200/55">
            100P 이상의 집중 Prep이 필요하신가요?{" "}
            <Link href="/custom-order" className="underline hover:text-ivory-100">Extended Prep 문의</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
