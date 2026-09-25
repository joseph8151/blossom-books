import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, formatKRW } from "@/data/pricing";

// 카카오톡 상담사가 고객에게 "가격 물어볼 때" 직접 링크로만 전달하는 비공개
// 구성·가격표입니다. 홈/메뉴/푸터/사이트맵/교재 찾기 어디에도 연결하지
// 않으며, 검색 노출도 막아둡니다(아래 robots 설정).
export const metadata = {
  title: "구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 구성표입니다.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Blossom Books 구성 안내",
    description: "카카오톡 상담에서 안내하는 구성표입니다.",
  },
};

const cellCls = "border border-navy-800/12 px-4 py-3 text-[13.5px]";
const headCellCls = "border border-navy-800/12 bg-ivory-200/60 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

export default function QuotePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Quote Sheet</p>
      <h1 className="mt-3 font-display text-[28px] font-semibold text-navy-950 sm:text-[33px]">구성·가격 안내</h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
        카카오톡 상담에서 안내하는 구성표입니다. 홈 메뉴에는 없습니다.
      </p>
      <p className="mt-1.5 text-[12.5px] text-charcoal-600/80">
        문의 전에 분량과 시험을 고르시면 바로 맞춰 드립니다.
      </p>

      {/* 1. 레벨테스트 */}
      <section className="mt-10">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">
          1. 레벨테스트 문제집 <span className="font-normal text-charcoal-600">(학원·학교 입학/반 배정)</span>
        </h2>
        <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">
          학원마다 레벨테스트 유형이 다릅니다.
          <br />
          해당 학원 유형에 맞춰 구매하셔도 되고,
          <br />
          유형이 확실하지 않으면 일반 레벨테스트(레테 전용)로 문의 주셔도 됩니다.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>분량</th>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              {flexibleVolumes.map((v) => (
                <tr key={v.pages}>
                  <td className={cellCls}>{v.label}</td>
                  <td className={cellCls}>문제집 + 해설집</td>
                  <td className={cellCls}>{formatKRW(v.priceKRW)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          샘플은 구매 전 확인 가능합니다. 학년·레벨·시험이 다르면 구성이 달라질 수 있습니다.
        </p>
      </section>

      {/* 2. Special Package — 표가 아니라 단독 카드로 강조 (배너처럼 번쩍이지 않게, 네이비·아이보리 톤만 한 단계 진하게) */}
      <section className="mt-12 border-2 border-navy-900/80 bg-ivory-200/70 p-6 sm:p-8">
        <span className="inline-flex items-center border border-navy-900/30 bg-navy-950 px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.14em] text-ivory-100">
          Special Package
        </span>
        <p className="mt-4 font-display text-[17px] font-semibold leading-snug text-navy-950">
          200P와 문항은 같고, 순서·모의·시작만 다릅니다.
        </p>
        <p className="mt-3 font-display text-[30px] font-semibold text-navy-950">{formatKRW(390000)}</p>

        <p className="mt-5 text-[12.5px] font-medium text-navy-800/70">포함</p>
        <ul className="mt-1.5 space-y-1.5 text-[13.5px] leading-relaxed text-charcoal-900">
          <li>· 200P 워크북 + 정답·해설 PDF (200P와 같은 문항 풀)</li>
          <li>· 이 학생용 목차 (시험·학년/레벨·약한 영역 접수 후 푸는 순서만 재배열)</li>
          <li>· Mock 2회 (시간·답지·시간 배분 1장)</li>
          <li>· 오답 기록지 (문항 번호 미리 인쇄)</li>
          <li>· 시작 상담 30분 × 1회 (카카오톡 음성 또는 줌). 이후 무제한 질문 없음.</li>
        </ul>
        <div className="mt-4 space-y-1 text-[12.5px] leading-relaxed text-charcoal-600">
          <p>대상: 8–12주, 목차를 못 짜는 집</p>
          <p>비추천: 문제만 필요하면 200P({formatKRW(flexibleVolumes[flexibleVolumes.length - 1].priceKRW)}) / 시험 3주 안이면 200P가 과할 수 있음</p>
        </div>
      </section>

      {/* 3. MAP */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">
          3. 국제학교 입시 — MAP Growth <span className="font-normal text-charcoal-600">(학년별)</span>
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cellCls}>MAP 영어 100P 문제집 + 해설집</td>
                <td className={cellCls}>{formatKRW(190000)}</td>
              </tr>
              <tr>
                <td className={cellCls}>MAP 수학 60P 문제집 + 해설집</td>
                <td className={cellCls}>{formatKRW(150000)}</td>
              </tr>
              <tr>
                <td className={cellCls}>영어 + 수학 함께</td>
                <td className={cellCls}>{formatKRW(340000)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">학년별로 구매 가능합니다.</p>
      </section>

      {/* 4. CAT4 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">
          4. 국제학교 입시 — CAT4 <span className="font-normal text-charcoal-600">(레벨별)</span>
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cellCls}>레벨 1개</td>
                <td className={cellCls}>{formatKRW(150000)}</td>
              </tr>
              <tr>
                <td className={cellCls}>레벨 2개 (정가 {formatKRW(300000)})</td>
                <td className={cellCls}>{formatKRW(270000)} (10% 할인)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          2개 레벨 동시 구매 시 10% 할인됩니다.
        </p>
      </section>

      {/* CTA */}
      <div className="mt-14 border-t border-navy-800/12 pt-10 text-center">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 이 구성으로 문의하기
        </a>
        <p className="mx-auto mt-5 max-w-lg text-[12px] leading-relaxed text-charcoal-600/80">
          문항 구성은 시험·학년에 따라 달라질 수 있습니다. Special Package는 200P와 문항이 같고 순서와
          시작 방법만 다릅니다.
        </p>
      </div>
    </div>
  );
}
