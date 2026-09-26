import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { volumeOptions, formatKRW } from "@/data/pricing";
import ExamChips from "./ExamChips";

// 성인·취업·유학·대입 영어/수학(OET·MET·CELBAN·CELPIP·PTE·부산외대 FLAT·SPA·SAT) 문의에만
// 카카오톡으로 직접 전달하는 비공개 구성·가격표입니다. 홈/헤더/푸터/사이트맵/
// /quote 어디와도 연결하지 않으며, 검색 노출도 막아둡니다(아래 robots 설정).
// /quote(레벨테스트·MAP·CAT4)와는 URL·레이아웃 모두 분리된 별도 페이지입니다 — 교차 링크 금지.
export const metadata = {
  title: "시험 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 시험별 구성표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.blossombooks.org/quote-exam/" },
  openGraph: {
    title: "Blossom Books 시험 구성 안내",
    description: "카카오톡 상담에서 안내하는 시험별 구성표입니다.",
    url: "https://www.blossombooks.org/quote-exam/",
    images: ["https://www.blossombooks.org/quote-exam/opengraph-image"],
  },
};

const cellCls = "border border-ivory-300 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

const exams = [
  "OET",
  "MET",
  "CELBAN",
  "CELPIP",
  "PTE",
  "부산외대 FLAT",
  "SPA(현대차)",
  "SAT 영어",
  "SAT 수학",
  "ESPT",
];

const p100 = volumeOptions[2]; // 100P
const p200 = volumeOptions[3]; // 200P
const SPECIAL_KRW = 390000;

export default function QuoteExamPage() {
  return (
    <div className="mx-auto max-w-[880px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">시험 구성·가격 안내</h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
        OET · MET · CELBAN · PTE · 부산외대 · SPA(현대차) · SAT 영어 · SAT 수학 · ESPT — 시험을 확인하신 뒤
        카카오톡으로 문의해 주세요.
      </p>

      {/* 2. 시험 칩 — 알약형, 모바일 가로 스크롤. ESPT는 클릭 시 같은 페이지 아래 패널 */}
      <ExamChips exams={exams} />

      {/* 3. 공통 분량 표 */}
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
          시험·과목마다 문항만 다릅니다. 분량 단가는 같습니다.
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600/80">
          ESPT는 이 페이지 분량 단가를 따릅니다. 세부 모듈이 있으면 카톡에 적어 주세요.
        </p>
      </section>

      {/* 4. SAT 영·수 개별 박스 — 테두리만, 390 카드와 같은 무게 금지 */}
      <section className="mt-10 rounded-xl border border-ivory-300 bg-ivory-100 p-6">
        <h2 className="font-display text-[16px] font-semibold text-navy-950">SAT는 영어·수학 개별 주문</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {["SAT 영어", "SAT 수학"].map((name) => (
            <div key={name} className="border border-ivory-300 bg-ivory-200/30 p-4">
              <p className="text-[13.5px] font-medium text-navy-950">{name}</p>
              <div className="mt-2.5 space-y-1.5 text-[12.5px] text-charcoal-600">
                <div className="flex items-center justify-between">
                  <span>{p100.label}</span>
                  <span className="font-medium text-navy-950">{formatKRW(p100.priceKRW)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{p200.label}</span>
                  <span className="font-medium text-navy-950">{formatKRW(p200.priceKRW)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Special</span>
                  <span className="font-medium text-navy-950">{formatKRW(SPECIAL_KRW)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-charcoal-600/80">
          함께 주문하실 경우 단가 × 2이며, 카카오톡에 &ldquo;SAT 영어+수학&rdquo;과 각 분량을 적어 주세요.
        </p>
      </section>

      {/* 5. Special Package — 이 페이지 1등 강조: 네이비 필 + 골드 배지 */}
      <section className="mt-[72px] rounded-xl bg-navy-950 p-7 shadow-[0_20px_44px_-28px_rgba(13,22,38,0.45)] sm:p-9">
        <span className="inline-flex items-center rounded-full bg-brass-500 px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.14em] text-navy-950">
          Special Package
        </span>
        <p className="mt-4 font-display text-[18px] font-semibold leading-snug text-ivory-100">
          200P와 문항은 같고, 순서·모의·시작만 다릅니다.
        </p>
        <p className="mt-3 font-display text-[32px] font-semibold text-ivory-100">{formatKRW(SPECIAL_KRW)}</p>
        <p className="mt-1.5 text-[12px] text-ivory-100/60">시험·과목 1개 기준</p>

        <p className="mt-5 text-[12.5px] font-medium text-ivory-100/70">포함</p>
        <ul className="mt-1.5 space-y-1.5 text-[13.5px] leading-relaxed text-ivory-100/90">
          <li>· 200P 워크북 + 정답·해설 PDF (해당 시험·해당 과목 200P와 같은 문항)</li>
          <li>· 이 응시자용 목차 (푸는 순서만 재배열)</li>
          <li>· 모의 2회 + 시간 배분 1장</li>
          <li>· 번호 찍힌 오답지</li>
          <li>· 카톡 글 상담 30분 (음성·줌 없음)</li>
        </ul>

        <div className="mt-5 grid gap-4 border-t border-ivory-100/15 pt-4 sm:grid-cols-2">
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-ivory-100/50">대상</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ivory-100/75">
              시험일까지 계획을 스스로 못 짜는 응시자
            </p>
          </div>
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-ivory-100/50">비추천</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ivory-100/75">
              문제만 필요하면 200P({formatKRW(p200.priceKRW)})
            </p>
          </div>
        </div>

        <p className="mt-5 text-[12px] leading-relaxed text-ivory-100/60">
          SAT 영어+수학 Special을 원하시면 과목마다 Special을 각각 주문하시면 됩니다.
        </p>
      </section>

      {/* 7. CTA */}
      <div className="mt-[72px] border-t border-ivory-300 pt-10 text-center">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 이 시험 문의하기
        </a>
        <p className="mx-auto mt-5 max-w-lg text-[12px] leading-relaxed text-charcoal-600/80">
          SAT는 영어·수학을 따로 적어 주세요.
        </p>
      </div>
    </div>
  );
}
