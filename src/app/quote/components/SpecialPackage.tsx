import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, formatKRW, SPECIAL_KRW } from "../data";

const includes = [
  "200P Student Workbook",
  "Answer & Explanation Guide",
  "학생별 학습 순서",
  "Mock Test 2회",
  "시간 배분 가이드",
  "오답 기록지",
  "카카오톡 텍스트 시작 상담 30분",
];

const bestFor = [
  "8–12주 이상 준비하는 학생",
  "어디부터 시작해야 할지 어려운 경우",
  "학습 순서를 직접 구성하기 어려운 가정",
];

export default function SpecialPackage() {
  const p200 = flexibleVolumes[flexibleVolumes.length - 1];

  return (
    <section className="border-b border-ivory-300 bg-navy-950 py-16 sm:py-24">
      <div className="mx-auto max-w-[760px] px-5 sm:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-sm bg-brass-500 px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.16em] text-navy-950">
            Guided Prep
          </span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-ivory-100 sm:text-[30px]">
            Special Package
          </h2>
          <p className="mt-3 font-display text-[34px] font-semibold text-ivory-100">{formatKRW(SPECIAL_KRW)}</p>
          <p className="mx-auto mt-4 max-w-[520px] text-[14px] leading-relaxed text-ivory-100/80">
            200P 문제집에 학생별 학습 순서와 시작 전략을 더한 구성입니다.
          </p>
        </div>

        <div className="mt-8 border-t border-ivory-100/15 pt-6">
          <p className="text-[13.5px] leading-[1.9] text-ivory-100/85">
            Special Package는 &ldquo;200P보다 문제가 더 많은 상품&rdquo;이 아닙니다. 200P와 동일한 문항
            Pool을 사용하며, 학생의 시험·학년·취약 영역을 기준으로 풀이 순서와 시작 방법을 재구성합니다.
          </p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-label text-[11px] uppercase tracking-[0.12em] text-ivory-100/50">Includes</p>
            <ul className="mt-3 space-y-1.5 text-[13.5px] leading-relaxed text-ivory-100/90">
              {includes.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-label text-[11px] uppercase tracking-[0.12em] text-ivory-100/50">Best For</p>
            <ul className="mt-3 space-y-1.5 text-[13.5px] leading-relaxed text-ivory-100/90">
              {bestFor.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border border-ivory-100/20 p-5">
          <p className="font-label text-[11px] uppercase tracking-[0.12em] text-ivory-100/50">
            Not Necessary If
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-ivory-100/80">
            문제만 충분히 필요하다면 200P 기본 구성 {formatKRW(p200.priceKRW)}을 권장합니다.
          </p>
        </div>

        <div className="mt-10 text-center">
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[50px] items-center justify-center gap-2 bg-brass-500 px-7 text-[14px] font-medium text-navy-950 transition-colors hover:bg-brass-400"
          >
            <MessageCircle size={16} />
            Special 구성 상담
          </a>
        </div>
      </div>
    </section>
  );
}
