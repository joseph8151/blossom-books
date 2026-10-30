import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { products } from "@/data/products";
import SamplePreviewButton from "@/components/books/SamplePreviewButton";

// 학원·학교 레벨테스트(영어 레벨테스트 G1–G6) 샘플만 모아 보여주는 비공개
// 링크입니다. 카카오톡 상담에서 학원에 공유할 때만 쓰며, 홈/헤더/푸터/
// 사이트맵 어디와도 연결하지 않고 검색 노출도 막아둡니다(아래 robots 설정).
export const metadata = {
  title: "학원 레벨테스트 샘플",
  description: "카카오톡 상담에서 공유하는 학원·학교 레벨테스트(영어 G1–G6) 샘플 문제입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-level-test-sample/" },
  openGraph: {
    title: "Blossom Books 학원 레벨테스트 샘플",
    description: "카카오톡 상담에서 공유하는 학원·학교 레벨테스트(영어 G1–G6) 샘플 문제입니다.",
    url: "https://blossombooks.org/quote-level-test-sample/",
    images: ["https://blossombooks.org/quote-level-test-sample/opengraph-image"],
  },
};

const GRADE_IDS = [
  "english-level-test-g1",
  "english-level-test-g2",
  "english-level-test-g3",
  "english-level-test-g4",
  "english-level-test-g5",
  "english-level-test-g6",
];

const gradeProducts = GRADE_IDS.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

export default function QuoteLevelTestSamplePage() {
  return (
    <div className="mx-auto max-w-[880px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 샘플 링크 · 홈 메뉴에 없음
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        학원 레벨테스트 샘플 문제
      </h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
        학원·학교 자체 영어 레벨테스트 대비 문제집(G1–G6)의 실제 샘플 페이지입니다. 학년을 골라 바로
        확인하실 수 있습니다. Reading·Vocabulary·Grammar·Writing 4개 영역, 정답 및 한글 상세해설 포함.
      </p>

      {/* 2. 학년별 샘플 */}
      <div className="mt-9 grid gap-4 sm:grid-cols-2">
        {gradeProducts.map((p) => (
          <div key={p.id} className="border border-ivory-300 bg-white p-5">
            <p className="font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">{p.gradeRange}</p>
            <p className="mt-1.5 font-display text-[16px] font-semibold text-navy-950">{p.titleKo}</p>
            <div className="mt-4">
              <SamplePreviewButton product={p} />
            </div>
          </div>
        ))}
      </div>

      {/* 3. 안내 */}
      <p className="mt-8 text-[12.5px] leading-relaxed text-charcoal-600/80">
        학년별 난이도는 학원 기준에 맞춰 조정 가능합니다. 지원 학원·학교명을 알려주시면 해당 학원 유형에
        맞춰 구성을 안내해 드립니다.
      </p>

      {/* 4. CTA */}
      <div className="mt-10 border-t border-ivory-300 pt-10 text-center">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 학원 레벨테스트 문의하기
        </a>
      </div>
    </div>
  );
}
