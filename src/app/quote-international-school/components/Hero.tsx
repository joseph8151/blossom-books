import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

const trustPoints = ["입학·배치 시험 대비", "학교 내 진단·성취도 평가", "영어 Placement 대비", "학교별 맞춤 제작"];

export default function Hero() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-100 pb-14 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[760px] px-5 text-center sm:px-8">
        <p className="font-label text-[11px] uppercase tracking-[0.2em] text-brass-500">
          International School Admission & Assessment Prep
        </p>
        <h1 className="mt-4 font-display text-[32px] font-semibold leading-tight text-navy-950 sm:text-[40px]">
          국제학교 입학 · 배치 · 교내 Assessment,
          <br />
          시험별로 정확하게 준비하세요.
        </h1>
        <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-[1.85] text-charcoal-600">
          국제학교와 외국인학교, 영국계 학교는 입학·배치·학기 중 진단에 이르기까지 학교마다 서로 다른 평가를
          사용합니다. Blossom Books는 MAP Growth, CAT4, ISEE, SSAT, UKiset, ISEB Common Pre-Test, Oxford
          Online Placement Test, TOEFL Junior, GL Progress Test Series(PTE·PTM·PTS), WIDA, NGRT 등 시험별
          유형과 학생 수준에 맞춘 문제집을 제공하며, 목록에 없는 학교 자체 시험도 상담할 수 있습니다.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#category-selector"
            className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800 sm:w-auto"
          >
            시험별 교재 보기
          </a>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 border border-navy-900/25 px-7 text-[14px] font-medium text-navy-900 transition-colors hover:border-navy-900 sm:w-auto"
          >
            <MessageCircle size={16} />
            입학시험 상담하기
          </a>
        </div>
      </div>

      {/* 신뢰 포인트 */}
      <div className="mx-auto mt-10 grid max-w-[780px] grid-cols-2 gap-4 px-5 sm:grid-cols-4 sm:px-8">
        {trustPoints.map((t) => (
          <div key={t} className="border-t-2 border-navy-900/70 pt-3 text-center">
            <p className="text-[12.5px] font-medium leading-snug text-navy-950">{t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
