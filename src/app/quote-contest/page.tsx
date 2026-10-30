import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { volumeOptions, formatKRW } from "@/data/pricing";

// 경시대회·영재 검사·리딩/문해력 관련 문의에만 카카오톡으로 직접 전달하는
// 비공개 구성·가격표입니다. /quote-links의 "경시·영재·시험 대비" 항목에서만
// 연결되며, 홈/헤더/푸터/사이트맵 어디에도 연결하지 않고 검색 노출도 막아둡니다
// (아래 robots 설정). 시험마다 확인된 별도 특가는 없어 공통 분량 단가를
// 그대로 적용합니다(quote-scat과 동일한 원칙).
export const metadata = {
  title: "경시·영재·시험 대비 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 경시대회·영재원·리딩/문해력 구성표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-contest/" },
  openGraph: {
    title: "Blossom Books 경시·영재·시험 대비 구성 안내",
    description: "카카오톡 상담에서 안내하는 경시대회·영재원·리딩/문해력 구성표입니다.",
    url: "https://blossombooks.org/quote-contest/",
  },
};

interface Category {
  label: string;
  title: string;
  items: string[];
  desc: string;
}

const CATEGORIES: Category[] = [
  {
    label: "Math Competition & Gifted Program",
    title: "경시대회 · 수학영재원",
    items: ["성대 경시", "교육청 수학경시", "KMO (한국수학올림피아드)", "수학영재원 대비"],
    desc: "대회·영재원마다 출제 범위와 난이도가 다릅니다. 학년과 목표 대회(또는 지원 영재원)를 알려주시면 범위를 확인해 구성합니다.",
  },
  {
    label: "TOEFL Junior / Primary & Reading",
    title: "TOEFL Junior·Primary · 리딩 레벨테스트",
    items: ["TOEFL Junior", "TOEFL Primary", "리딩 레벨테스트 대비"],
    desc: "현재 리딩 레벨과 응시 예정 시험(Junior/Primary)을 확인한 뒤 영역별 문제를 구성합니다.",
  },
  {
    label: "Korean Literacy",
    title: "초등 문해력 · 국어",
    items: ["초등 문해력", "초등 국어"],
    desc: "학년과 현재 독해 수준에 맞춰 어휘·독해·쓰기 영역을 구성합니다.",
  },
  {
    label: "Science Olympiad & Gifted Program",
    title: "과학영재원 · 과학경시",
    items: ["과학영재원 대비", "과학경시 대비"],
    desc: "지원하는 영재원 또는 대회와 학년을 알려주시면 범위를 확인해 구성합니다.",
  },
];

export default function QuoteContestPage() {
  return (
    <div className="mx-auto max-w-[880px] px-5 py-14 lg:px-8 lg:py-20">
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음
      </span>

      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        경시·영재·시험 대비 구성·가격 안내
      </h1>
      <p className="mt-3 max-w-[700px] text-[14.5px] leading-relaxed text-charcoal-600">
        경시대회·영재원 대비부터 TOEFL Junior/Primary, 리딩 레벨테스트, 초등 문해력·국어, 과학영재원·과학경시까지
        — 학년과 목표 시험(또는 영재원)을 확인한 뒤 맞춤 문제집으로 구성합니다.
      </p>

      <div className="mt-10 space-y-10">
        {CATEGORIES.map((c) => (
          <div key={c.title}>
            <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">{c.label}</p>
            <h2 className="mt-2 font-display text-[20px] font-semibold text-navy-950">{c.title}</h2>
            <p className="mt-2 max-w-[680px] text-[13px] leading-relaxed text-charcoal-600">{c.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.items.map((it) => (
                <span
                  key={it}
                  className="border border-ivory-300 bg-ivory-100 px-3 py-1.5 text-[12.5px] text-charcoal-700"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 공통 분량·가격 */}
      <section className="mt-[72px]">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">공통 분량·가격</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70">
                  구성
                </th>
                <th className="border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70">
                  가격
                </th>
              </tr>
            </thead>
            <tbody>
              {volumeOptions.map((v) => (
                <tr key={v.pages}>
                  <td className="border border-ivory-300 px-4 py-3 text-[13.5px]">{v.label} 문제집 + 해설집</td>
                  <td className="border border-ivory-300 px-4 py-3 text-[13.5px]">{formatKRW(v.priceKRW)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          대회·시험·과목마다 문항만 다릅니다. 분량 단가는 같습니다. 시험별로 확인된 별도 특가는 없습니다.
        </p>
      </section>

      <div className="mt-6 max-w-[680px] text-[12.5px] leading-relaxed text-charcoal-600/80">
        목록에 없는 대회·영재원·시험도 문의해 주세요. 시험명(또는 영재원명)과 학년을 알려주시면 가능 여부와
        구성 방법을 확인해드립니다.
      </div>

      <div className="mt-10 border-t border-ivory-300 pt-10 text-center">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 시험·학년 문의하기
        </a>
      </div>
    </div>
  );
}
