import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { volumeOptions, formatKRW } from "@/data/pricing";
import FceSamples from "./FceSamples";

// FCE(Cambridge English: First / B2 First) 문의에만 카카오톡으로 직접
// 전달하는 비공개 구성·가격표입니다. 홈/헤더/푸터/사이트맵/다른
// /quote-* 페이지 어디와도 연결하지 않으며, 검색 노출도 막아둡니다
// (아래 robots 설정). 매칭되는 실제 상품이 없어 가격은 100P/200P
// 2단계만 제공하며, 공용 volumeOptions 단가를 그대로 사용합니다.
// 실제 4개 Paper(Reading and Use of English·Writing·Listening·
// Speaking) 중 Speaking을 제외한 3개 Paper의 대표 유형별 샘플을
// 별도로 제작해 함께 제공합니다(fceBank).
export const metadata = {
  title: "FCE(Cambridge English: First) 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 FCE(Cambridge English: First) 실전 문제집 구성·가격표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-fce/" },
  openGraph: {
    title: "Blossom Books FCE(Cambridge English: First) 구성 안내",
    description: "카카오톡 상담에서 안내하는 FCE(Cambridge English: First) 실전 문제집 구성·가격표입니다.",
    url: "https://blossombooks.org/quote-fce/",
    images: ["https://blossombooks.org/quote-fce/opengraph-image"],
  },
};

const cellCls = "border border-ivory-300 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

const fceVolumes = volumeOptions.filter((v) => v.pages === 100 || v.pages === 200);

export default function QuoteFcePage() {
  return (
    <div className="mx-auto max-w-[980px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        FCE(Cambridge English: First) 구성·가격 안내
      </h1>
      <p className="mt-3 max-w-[720px] text-[14.5px] leading-relaxed text-charcoal-600">
        Cambridge English: First(FCE, B2 First)는 B2 수준의 영어 실력을 공식 인증하는 케임브리지 공인시험입니다.
        Reading and Use of English · Writing · Listening 세 Paper의 대표 유형(Multiple Choice Cloze, Word
        Formation, Key Word Transformation, Reading Multiple Choice, Listening Multiple Choice, Essay Writing)을
        중심으로 구성했습니다.
      </p>

      {/* 2. 가격표 */}
      <section className="mt-10">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">분량·가격</h2>
        <p className="mt-1.5 text-[12.5px] text-charcoal-600">100P / 200P 중 선택하실 수 있습니다.</p>
        <div className="mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              {fceVolumes.map((v) => (
                <tr key={v.pages}>
                  <td className={cellCls}>{v.label} 문제집 + 해설집</td>
                  <td className={cellCls}>{formatKRW(v.priceKRW)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          정답과 함께 한글 상세 해설, Listening 음원(MP3), Writing 모범 답안 및 채점 기준이 포함됩니다.
        </p>
      </section>

      {/* 3. 샘플 문항 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">FCE 샘플 문항</h2>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">
          Use of English 3유형 · Reading 1유형 · Listening 1유형 · Writing 1유형, 총 6문항입니다. Speaking은
          1:1 구술 평가 특성상 샘플 문항에는 포함하지 않았습니다.
        </p>
        <FceSamples />
      </section>

      {/* 4. 안내 */}
      <p className="mt-10 max-w-[680px] text-[12.5px] leading-relaxed text-charcoal-600/80">
        학생 목표 점수나 준비 기간에 맞춰 영역별 비중을 조정해드릴 수 있습니다. 필요한 구성을 카카오톡으로
        편하게 문의해 주세요.
      </p>

      {/* 5. CTA */}
      <div className="mt-10 border-t border-ivory-300 pt-10 text-center">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 문의하기
        </a>
      </div>
    </div>
  );
}
