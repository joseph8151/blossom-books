import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

const items = [
  { n: "01", label: "지원 학교명" },
  { n: "02", label: "학생 현재 학년" },
  { n: "03", label: "시험명 (MAP / CAT4 / OOPT / 기타)" },
  { n: "04", label: "시험 예정일" },
];

export default function BeforeConsult() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-200/30 py-16 sm:py-20">
      <div className="mx-auto max-w-[680px] px-5 text-center sm:px-8">
        <h2 className="font-display text-[22px] font-semibold text-navy-950 sm:text-[25px]">
          상담 전에 네 가지만 알려주세요.
        </h2>

        <div className="mx-auto mt-9 grid max-w-[480px] gap-6 text-left sm:grid-cols-2">
          {items.map((i) => (
            <div key={i.n}>
              <span className="font-label text-[12px] tracking-[0.1em] text-brass-500">{i.n}</span>
              <p className="mt-1.5 text-[14px] font-medium text-navy-950">{i.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[12.5px] leading-relaxed text-charcoal-600/70">
          선택 — 현재 시험 점수 또는 최근 성적이 있다면 함께 알려주세요.
        </p>

        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          국제학교 입학시험 상담하기
        </a>
      </div>
    </section>
  );
}
