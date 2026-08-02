import Link from "next/link";
import { MessageCircle, Check } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "학원·기관 전용 교재 제작",
  description:
    "학원, 프랩학원, 교육기관을 위한 레벨별 문제집, 반별 숙제, 단원 테스트, 실전 모의고사 등 기관 전용 교육 콘텐츠를 제작합니다.",
};

const offerings = [
  "레벨별 문제집",
  "반별 숙제 자료",
  "단원 테스트",
  "월말 평가",
  "실전 모의고사",
  "방학 특강 교재",
  "입학시험 대비 자료",
  "기관 전용 표지",
  "자체 커리큘럼 반영",
  "정답 및 교사용 해설",
  "반복 제작과 시리즈화 상담",
];

export default function InstitutionsPage() {
  return (
    <div>
      <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">For institutions</p>
          <h1 className="mt-3 font-display text-[36px] font-semibold leading-tight text-navy-950 sm:text-[44px]">
            수업의 방향을 반영한
            <br />
            기관 전용 교육 콘텐츠
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[14.5px] leading-relaxed text-charcoal-600">
            기관에서 사용 중인 커리큘럼과 수업 흐름을 검토한 뒤, 필요한 문제 유형과 평가
            방식을 반영하여 교재를 구성합니다.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
            >
              <MessageCircle size={16} />
              기관 전용 상담
            </a>
            <Link
              href="/custom-order"
              className="inline-flex items-center gap-2 border border-navy-800/25 px-7 py-3.5 text-[14px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              제작 문의 폼 작성
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <h2 className="font-display text-[28px] font-semibold text-navy-950">제공 가능한 자료</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item) => (
              <div key={item} className="flex items-center gap-3 border border-navy-800/12 bg-ivory-100 p-4">
                <Check size={16} className="shrink-0 text-navy-800" />
                <span className="text-[13.5px] text-charcoal-900">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-20 text-ivory-100 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h2 className="font-display text-[30px] font-semibold">기관 전용 상담이 필요하신가요?</h2>
          <p className="mx-auto mt-4 max-w-lg text-[14.5px] leading-relaxed text-ivory-200/80">
            기관명, 커리큘럼, 레벨 체계를 알려주시면 전용 문제집과 평가 자료 제작 가능
            여부를 안내해드립니다.
          </p>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-brass-500 px-7 py-3.5 text-[14px] font-medium text-navy-950 transition-colors hover:bg-brass-400"
          >
            <MessageCircle size={16} />
            기관·학원 카카오톡 상담
          </a>
        </div>
      </section>
    </div>
  );
}
