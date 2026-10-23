import { MessageCircle, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";

// CoreCategories의 3개 핵심 카드가 전체 상품을 의미하는 건 아닙니다. 방문자가
// "내가 찾는 시험은 메뉴에 없으니 여기선 안 하나 보다"라고 오해하지 않도록,
// 대표 예시만 가볍게 보여주고 전부 상담으로 안내합니다(카탈로그로 보내지
// 않음 — 목록에 없는 시험은 애초에 카탈로그에 페이지가 없습니다).
interface Group {
  label: string;
  items: string[];
}

const groups: Group[] = [
  { label: "수학 · 경시", items: ["AMC", "성대경시", "KMC", "Math Kangaroo", "SASMO", "영재원", "사고력수학"] },
  { label: "영어 · 입학시험", items: ["TOEFL Junior", "SSAT", "ISEE", "DET", "PTE", "MET", "CELPIP"] },
  { label: "AP · IB", items: ["AP Calculus", "AP Biology", "AP Chemistry", "IB Math", "IB Biology", "IB Economics"] },
  {
    label: "학원 · 학교별 맞춤",
    items: ["영어학원 레벨테스트", "국어 레벨테스트", "수학 레벨테스트", "국제학교 입학시험", "학교별 Placement Test"],
  },
  { label: "기타", items: ["직무시험", "자격시험", "성인 영어시험", "맞춤 모의고사", "문제은행 제작"] },
];

export default function MoreCategories() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="border border-brass-500/20 bg-brass-500/[0.045] p-7 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">
              <Sparkles size={13} /> Beyond the 3 categories
            </span>
            <h2 className="mt-3 font-display text-[22px] font-semibold leading-snug text-navy-950 sm:text-[26px]">
              찾으시는 시험이 여기에 없나요?
            </h2>
            <p className="mt-3 text-[13.5px] leading-[1.85] text-charcoal-600">
              Blossom Books는 위 3개 영역 외에도 다양한 시험과 학습 목적에 맞는 교재를 제작하고 있습니다.
              홈페이지에 표시되지 않은 시험이나 학원, 특정 학년·과목·경시대회·자격시험도 상담을 통해 제작
              가능 여부와 구성을 확인할 수 있습니다. 원하는 시험명이나 학원명, 학년과 필요한 영역을
              알려주시면 가능한 구성과 난이도를 안내해 드립니다.
            </p>
          </div>

          <div className="mx-auto mt-9 grid max-w-4xl gap-5 sm:grid-cols-2">
            {groups.map((g) => (
              <div key={g.label}>
                <p className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-800/60">{g.label}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="border border-navy-800/12 bg-ivory-100 px-2.5 py-1 text-[12px] text-charcoal-700"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-7 max-w-2xl text-center text-[11.5px] leading-relaxed text-charcoal-600/75">
            일부 예시입니다. 표시되지 않은 시험도 상담 가능합니다.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 bg-navy-900 px-6 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
            >
              <MessageCircle size={15} />
              찾는 시험 상담하기
            </a>
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 border border-navy-800/25 px-6 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              맞춤 교재 제작 문의
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
