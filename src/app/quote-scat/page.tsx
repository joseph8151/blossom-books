import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import CategoryShell from "./CategoryShell";

// 카카오톡 상담사가 고객에게 사고력·영재 검사(SCAT·CogAT·NNAT·OLSAT) 및 미국 수학
// 경시대회(AMC·MATHCOUNTS·MOEMS) 구성을 안내할 때 링크로만 전달하는 비공개
// 구성·가격표입니다. /quote 계열과 동일하게 홈/헤더/푸터/사이트맵 어디에도
// 연결하지 않으며, 검색 노출도 막아둡니다(아래 robots 설정). 가격은 사이트
// 공통 분량별 단가를 그대로 사용하며, 시험별 특가는 확인된 바 없어 만들지
// 않았습니다.
export const metadata = {
  title: "사고력·영재 검사 · 경시대회 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 SCAT·CogAT·NNAT·OLSAT·AMC·MATHCOUNTS·MOEMS 구성표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.blossombooks.org/quote-scat/" },
  openGraph: {
    title: "Blossom Books 사고력·영재 검사 · 경시대회 구성 안내",
    description: "카카오톡 상담에서 안내하는 SCAT·CogAT·NNAT·OLSAT·AMC·MATHCOUNTS·MOEMS 구성표입니다.",
    url: "https://www.blossombooks.org/quote-scat/",
    images: ["https://www.blossombooks.org/quote-scat/opengraph-image"],
  },
};

export default function QuoteScatPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음
      </span>

      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        사고력·영재 검사 · 경시대회 구성·가격 안내
      </h1>
      <p className="mt-3 max-w-[760px] text-[14.5px] leading-relaxed text-charcoal-600">
        영재 프로그램(GT) 진단·선발에 활용되는 사고력 검사(SCAT·CogAT·NNAT·OLSAT)와 미국 수학 경시대회(AMC·
        MATHCOUNTS·MOEMS) 대비 문제집입니다. 시험마다 공식 Level·Division 구분과 Blossom Books의 구성
        방식이 다르므로, 공식 구분과 난이도 구성을 섞지 않고 각각 표시합니다.
      </p>

      <div className="mt-8">
        <CategoryShell />
      </div>

      {/* 작은 안내 */}
      <div className="mt-14 max-w-[680px] border border-ivory-300 bg-ivory-100 p-6">
        <p className="text-[13px] font-medium text-navy-950">가격 안내</p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">
          가격은 사이트 공통 분량별 단가(40P/60P/100P/200P)를 그대로 적용합니다. 시험별로 확인된 별도
          특가는 없으며, Standard + Advanced Practice 조합 가격은 각 분량 단가의 합으로 계산합니다(별도
          할인 없음).
        </p>
      </div>

      <div className="mt-6 max-w-[680px] text-[12.5px] leading-relaxed text-charcoal-600/80">
        목록에 없는 사고력 검사나 경시대회도 문의해 주세요. 시험명과 학년을 알려주시면 가능 여부와 구성
        방법을 확인해드립니다.
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
