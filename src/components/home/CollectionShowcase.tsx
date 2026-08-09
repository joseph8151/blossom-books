import Link from "next/link";
import { ArrowRight, SearchCheck, FileCheck2, BookOpen, Headphones } from "lucide-react";

const points = [
  { icon: SearchCheck, label: "시험·교육과정 분석 기반 제작" },
  { icon: FileCheck2, label: "문제집 + 정답·상세 해설집 기본 구성" },
  { icon: BookOpen, label: "구매 전 무료 샘플 확인" },
  { icon: Headphones, label: "리스닝 시험은 오디오 파일 제공" },
];

export default function CollectionShowcase() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/40 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <span className="eyebrow">Our collection</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[30px]">
            다양한 시험과 과목,
            <br />
            <span className="italic text-burgundy-700">하나의 품질 기준</span>으로
          </h2>
          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-charcoal-600">
            미국 교과과정·AP·SAT·국제학교 입학시험·공인 영어시험까지, 여러 시험과 과목의
            교재를 같은 원칙으로 제작합니다. 미국 명문대·프랩 출신 선생님들이 실제 출제
            경향을 분석해 만들며, 구매 전 무료 샘플로 직접 확인하실 수 있습니다.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {points.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-charcoal-900">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-brass-500/30 bg-ivory-100 text-navy-800">
                  <Icon size={13} strokeWidth={1.9} />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <Link
            href="/books"
            className="mt-8 inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
          >
            교재 둘러보기
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 -z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(173,138,78,0.16),transparent_66%)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/collection.png"
            alt="블러섬북스 교재 컬렉션 — 미국 교과과정·AP·SAT·문법 등 다양한 과목의 프리미엄 교재"
            width={1200}
            height={840}
            loading="lazy"
            className="relative w-full rounded-md border border-navy-800/15 shadow-card"
          />
        </div>
      </div>
    </section>
  );
}
