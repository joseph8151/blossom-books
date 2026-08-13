"use client";

import { useMemo, useState } from "react";
import { Quote } from "lucide-react";
import { reviews } from "@/data/reviews";

export default function Testimonials() {
  const [tag, setTag] = useState<string>("전체");

  // 후기에 등장하는 태그 목록 (등장 빈도순)
  const tags = useMemo(() => {
    const count = new Map<string, number>();
    reviews.forEach((r) => (r.tags || []).forEach((t) => count.set(t, (count.get(t) || 0) + 1)));
    return ["전체", ...Array.from(count.entries()).sort((a, b) => b[1] - a[1]).map(([t]) => t)];
  }, []);

  const shown = tag === "전체" ? reviews : reviews.filter((r) => (r.tags || []).includes(tag));

  // 등록된 실제 후기가 없으면 섹션을 표시하지 않습니다.
  if (reviews.length === 0) return null;

  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-xl">
          <span className="eyebrow">Reviews</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            먼저 사용해 본 분들의 이야기
          </h2>
        </div>

        {/* 태그 필터 */}
        {tags.length > 1 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                  tag === t ? "bg-navy-900 text-ivory-100" : "border border-navy-800/20 text-charcoal-600 hover:border-navy-800/40"
                }`}
              >
                {t === "전체" ? "전체" : `#${t}`}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r, i) => (
            <figure key={i} className="lift flex flex-col border border-navy-800/12 bg-ivory-100 p-7 shadow-card">
              <Quote size={22} className="text-brass-500" />
              <blockquote className="mt-4 flex-1 text-[13.5px] leading-relaxed text-charcoal-900">{r.quote}</blockquote>
              <figcaption className="mt-6 border-t border-navy-800/10 pt-4">
                <p className="text-[13.5px] font-medium text-navy-950">{r.author}</p>
                <p className="mt-0.5 font-label text-[11px] uppercase tracking-[0.12em] text-brass-500">{r.context}</p>
                {r.tags && r.tags.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {r.tags.map((t) => (
                      <span key={t} className="border border-navy-800/12 bg-ivory-200/50 px-1.5 py-0.5 font-label text-[9px] tracking-wide text-navy-800/60">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
