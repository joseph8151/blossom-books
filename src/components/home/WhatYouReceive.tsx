import Link from "next/link";
import { BookOpen, FileCheck2, MessageCircle, Check, FileSearch } from "lucide-react";

// 결제 후 실제로 받는 구성 — 가격을 보기 전에 "무엇을 받는지"를 먼저 확정해 줍니다.
const cards = [
  {
    icon: BookOpen,
    no: "CARD 01",
    title: "STUDENT WORKBOOK",
    subtitle: "문제 풀이용 본 교재",
    items: ["Reading Passage", "Multiple Choice", "Vocabulary", "Grammar", "Writing", "Skill Practice"],
  },
  {
    icon: FileCheck2,
    no: "CARD 02",
    title: "ANSWER & EXPLANATION GUIDE",
    subtitle: "정답 및 상세 해설",
    items: ["Correct Answer", "Why?", "Key Point", "Wrong Answer Analysis", "Skill"],
  },
  {
    icon: MessageCircle,
    no: "CARD 03",
    title: "PURCHASE SUPPORT",
    subtitle: "구매 전후 카카오톡 상담",
    items: ["교재 선택 확인", "학년 및 수준 확인", "분량 선택 도움", "파일 수령 안내"],
  },
];

export default function WhatYouReceive() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">What you actually receive</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            결제 후 받게 되는 구성,
            <br />
            미리 보여드립니다.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {cards.map(({ icon: Icon, no, title, subtitle, items }) => (
            <div key={no} className="flex flex-col border border-navy-800/12 bg-ivory-200/40 p-7 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center border border-brass-500/30 bg-brass-500/[0.07] text-brass-500">
                  <Icon size={19} strokeWidth={1.8} />
                </div>
                <span className="font-label text-[9.5px] uppercase tracking-[0.16em] text-navy-800/45">{no}</span>
              </div>
              <p className="mt-5 font-label text-[11px] uppercase leading-snug tracking-[0.14em] text-brass-500">
                {title}
              </p>
              <p className="mt-1.5 font-display text-[17px] font-semibold text-navy-950">{subtitle}</p>
              <ul className="mt-5 flex-1 space-y-2 border-t border-navy-800/10 pt-4">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-[13px] leading-snug text-charcoal-900">
                    <Check size={13} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-9">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
          >
            <FileSearch size={16} />
            실제 Sample 확인하기
          </Link>
        </div>
      </div>
    </section>
  );
}
