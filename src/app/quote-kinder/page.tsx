import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { volumeOptions, formatKRW } from "@/data/pricing";
import { kinderLevelTestBankByAge } from "@/data/sampleBank";
import KinderLevelSamples from "./KinderLevelSamples";

// 유치원(킨더) 5세·6세 레벨테스트 전용으로 카카오톡 상담에서 직접
// 전달하는 비공개 구성·가격표입니다. 홈/헤더/푸터/사이트맵/다른
// /quote-* 페이지 어디와도 연결하지 않으며, 검색 노출도 막아둡니다
// (아래 robots 설정). 매칭되는 실제 상품이 없어 가격은 60P/100P/200P
// 3단계(300P 없음)로 공용 volumeOptions 단가를 그대로 사용하고, 5세
// (Beginner)·6세(Advanced) 각각 4개 영역(Alphabet/Phonics·Vocabulary/
// Sight Words·Numbers·Shapes) 샘플 문항을 별도로 제작해 제공합니다.
export const metadata = {
  title: "킨더(유치원) 5세·6세 레벨테스트 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 킨더(유치원) 5세·6세 레벨테스트 구성·가격표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-kinder/" },
  openGraph: {
    title: "Blossom Books 킨더(유치원) 5세·6세 레벨테스트 구성 안내",
    description: "카카오톡 상담에서 안내하는 킨더(유치원) 5세·6세 레벨테스트 구성·가격표입니다.",
    url: "https://blossombooks.org/quote-kinder/",
    images: ["https://blossombooks.org/quote-kinder/opengraph-image"],
  },
};

const cellCls = "border border-ivory-300 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

const kinderVolumes = volumeOptions.filter((v) => v.pages !== 300);

const ageSections = [
  { key: "5", label: "5세 · Beginner", desc: "알파벳·수세기·도형을 처음 익히는 단계. 짧은 낱말과 그림으로 확인합니다." },
  { key: "6", label: "6세 · Advanced", desc: "파닉스 첫소리, 사이트워드, 20까지의 수, 패턴 완성까지 한 단계 올라간 구성입니다." },
];

export default function QuoteKinderPage() {
  return (
    <div className="mx-auto max-w-[980px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        킨더(유치원) 5세·6세 레벨테스트 구성·가격 안내
      </h1>
      <p className="mt-3 max-w-[720px] text-[14.5px] leading-relaxed text-charcoal-600">
        아직 글을 익히는 중인 유아를 위해 문장은 짧고 쉽게 구성했습니다. 알파벳·수세기·도형 문항은 모두
        그림(SVG)으로 제작해 아이가 직접 손으로 짚으며 확인할 수 있습니다. 5세와 6세는 같은 4개
        영역(Alphabet/Phonics · Vocabulary/Sight Words · Numbers · Shapes)을 난이도만 올려 구성해, 두
        연령의 차이를 바로 비교하실 수 있습니다.
      </p>

      {/* 2. 가격표 */}
      <section className="mt-10">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">분량·가격</h2>
        <p className="mt-1.5 text-[12.5px] text-charcoal-600">60P / 100P / 200P 중 선택하실 수 있습니다.</p>
        <div className="mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              {kinderVolumes.map((v) => (
                <tr key={v.pages}>
                  <td className={cellCls}>{v.label} 문제집 + 해설집</td>
                  <td className={cellCls}>{formatKRW(v.priceKRW)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          정답과 함께 한글 상세 해설이 포함되어 부모님이 채점·설명해 주기에도 좋습니다.
        </p>
      </section>

      {/* 3. 연령별 샘플 문항 */}
      {ageSections.map((s) => (
        <section key={s.key} className="mt-12">
          <h2 className="font-display text-[18px] font-semibold text-navy-950">{s.label} 샘플 문항</h2>
          <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">{s.desc}</p>
          <KinderLevelSamples bank={kinderLevelTestBankByAge[s.key]} idPrefix={s.key} />
        </section>
      ))}

      {/* 4. 안내 */}
      <p className="mt-10 max-w-[680px] text-[12.5px] leading-relaxed text-charcoal-600/80">
        학생 연령이나 반 배정 기준에 맞춰 난이도·영역 비중을 조정해드릴 수 있습니다. 필요한 구성을
        카카오톡으로 편하게 문의해 주세요.
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
