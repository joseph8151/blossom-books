import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, formatKRW } from "@/data/pricing";

// 가격은 100P/200P 두 가지만 보여줍니다. 300P 등 다른 분량은 이 페이지에서
// 다루지 않습니다 — SL·HL 구분 없이 동일 가격입니다.
const p100 = flexibleVolumes.find((v) => v.pages === 100)!;
const p200 = flexibleVolumes.find((v) => v.pages === 200)!;

export default function Hero() {
  return (
    <section className="pb-2">
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음
      </span>

      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        IB 교재 구성·가격 안내
      </h1>

      <p className="mt-4 max-w-[620px] text-[14.5px] leading-[1.9] text-charcoal-600">
        IB 과목은 같은 페이지 수라도 과목과 학생 수준에 따라 필요한 문제가 다릅니다.
      </p>
      <p className="mt-3 max-w-[620px] text-[14.5px] leading-[1.9] text-charcoal-600">
        Blossom Books에서는 과목, SL·HL, 현재 진도, 취약 단원, 원하는 문제 유형을 확인한 뒤 학생에게 필요한
        문제와 해설을 구성합니다.
      </p>
      <p className="mt-3 font-label text-[11px] uppercase tracking-[0.1em] text-charcoal-600/60">
        Unofficial · Independently Created by Blossom Books
      </p>

      {/* A. IB 맞춤 문제집 — 메인 상품 가격, 바로 보이게 */}
      <p className="mt-8 font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">A. IB 맞춤 문제집</p>
      <div className="mt-3 grid max-w-[520px] gap-3 sm:grid-cols-2">
        <div className="border border-ivory-300 bg-white p-6">
          <p className="font-display text-[22px] font-semibold text-navy-950">{p100.label}</p>
          <p className="mt-1.5 font-display text-[26px] font-semibold text-navy-950">{formatKRW(p100.priceKRW)}</p>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-navy-900 px-5 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            <MessageCircle size={14} /> 100P 문의
          </a>
        </div>
        <div className="border border-navy-900 bg-ivory-200/50 p-6">
          <p className="font-display text-[22px] font-semibold text-navy-950">{p200.label}</p>
          <p className="mt-1.5 font-display text-[26px] font-semibold text-navy-950">{formatKRW(p200.priceKRW)}</p>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-navy-900 px-5 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            <MessageCircle size={14} /> 200P 문의
          </a>
        </div>
      </div>
      <p className="mt-3 max-w-[520px] text-[12px] leading-relaxed text-charcoal-600/70">
        모든 주요 과목에 동일 가격이 적용되며, SL·HL에 따라 가격을 다르게 받지 않습니다.
      </p>

      {/* 100P / 200P 차이 — 간단히, 우열이 아니라 범위의 차이로 설명 */}
      <div className="mt-6 grid max-w-[620px] gap-3 sm:grid-cols-2">
        <p className="text-[12.5px] leading-relaxed text-charcoal-700">
          <span className="font-medium text-navy-950">{p100.label}</span> — 특정 단원·취약 영역에 집중해야 하는
          학생에게 추천합니다.
        </p>
        <p className="text-[12.5px] leading-relaxed text-charcoal-700">
          <span className="font-medium text-navy-950">{p200.label}</span> — 여러 단원을 함께, 혹은 누적 복습까지
          넓게 준비하려는 학생에게 추천합니다.
        </p>
      </div>
    </section>
  );
}
