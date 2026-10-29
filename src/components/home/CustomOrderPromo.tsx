import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

// 홈페이지 "주문 제작 상담" 진입 섹션. /custom-order 페이지의 헤드라인·설명·
// 고객 유형을 그대로 가져와 미리보기로 보여주고, 실제 입력 폼은 /custom-order
// 페이지에서만 작성합니다(폼 전체를 홈페이지에 옮기지 않음).
const customerTypeLabels = ["개인", "과외 선생님", "학원", "프랩학원", "교육기관"];

export default function CustomOrderPromo() {
  return (
    <section className="border-b border-navy-800/12 bg-navy-950 py-16 text-ivory-100 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">Custom Order</span>
            <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight sm:text-[31px]">
              주문 제작 상담
            </h2>
            <p className="mt-4 max-w-lg text-[14px] leading-[1.85] text-ivory-200/80">
              원하시는 학년, 시험, 수업 목적을 편하게 알려주세요. 확인 후 제작 가능 범위와 일정을
              상담해드립니다.
            </p>

            <div className="mt-7">
              <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-ivory-200/60">고객 유형</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {customerTypeLabels.map((c) => (
                  <span
                    key={c}
                    className="border border-ivory-100/20 px-3.5 py-1.5 text-[13px] font-medium text-ivory-100/90"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/custom-order"
                className="group inline-flex items-center gap-2 bg-brass-500 px-7 py-3.5 text-[14.5px] font-medium text-navy-950 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brass-400"
              >
                주문 제작 상담하기
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={siteConfig.kakaoChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-ivory-100/25 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 transition-colors hover:border-ivory-100/50"
              >
                <MessageCircle size={16} />
                카카오톡으로 바로 상담
              </a>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden border border-ivory-100/12 bg-ivory-100/10 sm:grid-cols-2">
            {[
              { n: "01", title: "원하는 교재가 목록에 없을 때", desc: "기존 목록에 없는 시험·과목·구성도 상담 후 제작 가능합니다." },
              { n: "02", title: "학년·시험·목적 맞춤 구성", desc: "학생 수준과 수업 목적에 맞춰 문제 유형·난이도를 조정합니다." },
              { n: "03", title: "학원·기관 수업 방식 반영", desc: "단원별 문제집, 자체 모의고사 등 운영 방식에 맞춰 제작합니다." },
              { n: "04", title: "제작 범위·일정은 상담 후 안내", desc: "내용을 확인한 뒤 제작 가능 범위와 일정을 정확히 안내해드립니다." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-navy-950 p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-400">{n}</p>
                <p className="mt-2 font-display text-[15px] font-semibold text-ivory-100">{title}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ivory-200/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
