import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { volumeOptions, formatKRW } from "@/data/pricing";
import SubjectChips from "./SubjectChips";

// 캐나다 교과과정(Grade 1–12 English/Math) 문의에만 카카오톡으로 직접
// 전달하는 비공개 구성·가격표입니다. /quote-us와 같은 계열로, 홈 메뉴/
// 헤더/푸터/사이트맵에는 연결하지 않고 검색 노출도 막아둡니다. 홈·교재
// 찾기 페이지의 "캐나다" 카드에서만 링크로 연결됩니다.
export const metadata = {
  title: "캐나다 교과 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 캐나다 교과 구성표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.blossombooks.org/quote-ca/" },
  openGraph: {
    title: "Blossom Books 캐나다 교과 구성 안내",
    description: "카카오톡 상담에서 안내하는 캐나다 교과 구성표입니다.",
    url: "https://www.blossombooks.org/quote-ca/",
  },
};

const cellCls = "border border-ivory-300 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

const p100 = volumeOptions[2]; // 100P
const p200 = volumeOptions[3]; // 200P
const SPECIAL_KRW = 390000;

export default function QuoteCaPage() {
  return (
    <div className="mx-auto max-w-[880px] px-5 py-14 lg:px-8 lg:py-20">
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음
      </span>

      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        캐나다 교과 구성·가격 안내
      </h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
        Grade 1–12 English and Math. 주(province) 세부 과목은 카카오톡에 학교·주를 알려 주세요.
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal-600/80">
        온타리오·BC·알버타 등 주마다 코스 이름이 다릅니다. 기본 목차는 Common Topics입니다. 학교 코스코드를
        주시면 단원을 맞춥니다.
      </p>

      <div className="mt-8">
        <SubjectChips />
      </div>

      <section className="mt-[72px]">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">공통 분량·가격</h2>
        <div className="mt-3">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cellCls}>{p100.label} 문제집 + 해설집</td>
                <td className={cellCls}>{formatKRW(p100.priceKRW)}</td>
              </tr>
              <tr>
                <td className={cellCls}>{p200.label} 문제집 + 해설집</td>
                <td className={cellCls}>{formatKRW(p200.priceKRW)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          Grade·과목마다 문항만 다릅니다. 분량 단가는 같습니다.
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600/80">
          유형 1개만 필요하거나 유형 2개를 믹스하고 싶으시면 카카오톡으로 문의해 주세요.
        </p>
      </section>

      <section className="mt-[72px] rounded-xl bg-navy-950 p-7 shadow-[0_20px_44px_-28px_rgba(13,22,38,0.45)] sm:p-9">
        <span className="inline-flex items-center rounded-full bg-brass-500 px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.14em] text-navy-950">
          Special Package
        </span>
        <p className="mt-4 font-display text-[18px] font-semibold leading-snug text-ivory-100">
          200P와 문항은 같고, 순서·모의·시작만 다릅니다.
        </p>
        <p className="mt-3 font-display text-[32px] font-semibold text-ivory-100">{formatKRW(SPECIAL_KRW)}</p>
        <p className="mt-1.5 text-[12px] text-ivory-100/60">Grade·과목 1개 기준</p>

        <p className="mt-5 text-[12.5px] font-medium text-ivory-100/70">포함</p>
        <ul className="mt-1.5 space-y-1.5 text-[13.5px] leading-relaxed text-ivory-100/90">
          <li>· 해당 과목 200P + 정답·해설</li>
          <li>· 이 학생용 목차 (학년·약한 단원 기준 순서)</li>
          <li>· 모의고사 2회 + 시간 배분</li>
          <li>· 번호 찍힌 오답지</li>
          <li>· 카톡 글 상담 30분 (음성·줌 없음)</li>
        </ul>
      </section>

      <p className="mt-6 text-[12.5px] leading-relaxed text-charcoal-600/80">
        학교 교과서 목차와 100% 같지 않을 수 있습니다. 단원 추가·삭제, 주 이름은 카카오톡으로 알려주세요.
      </p>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600/80">인쇄 제본 문의도 카카오톡으로 가능합니다.</p>

      <div className="mt-14 border-t border-ivory-300 pt-10 text-center">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 Grade·과목 문의하기
        </a>
      </div>
    </div>
  );
}
