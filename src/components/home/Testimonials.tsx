import { Quote } from "lucide-react";
import { reviews } from "@/data/reviews";

export default function Testimonials() {
  // 등록된 실제 후기가 없으면 섹션을 표시하지 않습니다.
  if (reviews.length === 0) return null;

  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-xl">
          <span className="eyebrow">Reviews</span>
          <h2 className="mt-4 font-display text-[32px] font-semibold text-navy-950 sm:text-[38px]">
            먼저 사용해 본 분들의 이야기
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="lift flex flex-col border border-navy-800/12 bg-ivory-100 p-7 shadow-card"
            >
              <Quote size={22} className="text-brass-500" />
              <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-charcoal-900">
                {r.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-navy-800/10 pt-4">
                <p className="text-[13.5px] font-medium text-navy-950">{r.author}</p>
                <p className="mt-0.5 font-label text-[11px] uppercase tracking-[0.12em] text-brass-500">
                  {r.context}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
