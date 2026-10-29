import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

const constructTypes = ["English Placement", "Math Placement", "Reading", "Writing", "Interview", "Reasoning"];

const consultInfo = [
  "학교명",
  "지원 학년",
  "시험명",
  "시험 예정일",
  "시험 과목",
  "알고 있는 시험 유형",
  "기존 Sample 또는 안내문 보유 여부",
];

export default function CustomQuoteCallout() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-100 py-16 sm:py-20">
      <div className="mx-auto max-w-[900px] px-5 sm:px-8">
        {/* School-Specific Test — 기타 문의가 아니라 별도 상품 카테고리로 노출 */}
        <div className="border border-ivory-300 bg-white p-7 sm:p-9">
          <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
            School-Specific Test
          </p>
          <h2 className="mt-2.5 font-display text-[22px] font-semibold leading-snug text-navy-950 sm:text-[25px]">
            찾는 시험이 목록에 없나요?
          </h2>
          <p className="mt-4 text-[13.5px] leading-relaxed text-charcoal-600">
            국제학교와 외국인학교는 학교별로 자체 입학시험, Placement Test, English Assessment, Math
            Assessment, Writing Test, Interview 등을 운영하는 경우가 있습니다. 목록에 없는 시험도 학교명과
            시험 정보를 알려주시면 가능 여부와 구성 방법을 확인해드립니다.
          </p>

          <p className="mt-5 text-[12.5px] font-medium text-navy-950">학교별 구성에 따라 맞춤 제작</p>
          <ul className="mx-auto mt-3 grid max-w-[520px] gap-2.5 text-left sm:grid-cols-2">
            {constructTypes.map((c) => (
              <li key={c} className="text-[13px] leading-relaxed text-charcoal-700">
                · {c}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[12px] leading-relaxed text-charcoal-600/70">
            해당 학교의 실제 시험을 확보하지 않은 구성이며, &ldquo;기출문제&rdquo;·&ldquo;실제 시험 동일&rdquo;
            등으로 표현하지 않습니다. 기본 가격표 대신 시험 구성에 따라 맞춤 견적으로 안내합니다.
          </p>

          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex min-h-[50px] items-center justify-center gap-2 border border-navy-900 px-7 text-[14px] font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-ivory-100"
          >
            <MessageCircle size={16} />
            학교별 시험 구성 상담
          </a>
        </div>

        {/* 시험명을 모르겠다면 — 학교명 + 지원 학년만으로도 상담 가능 */}
        <div className="mt-6 border-2 border-navy-900 bg-white p-7 sm:p-8">
          <h3 className="font-display text-[18px] font-semibold text-navy-950">시험명을 모르겠다면</h3>
          <p className="mt-3 text-[13.5px] leading-relaxed text-charcoal-600">
            시험명이 정확하지 않아도 괜찮습니다. 학교명과 지원 학년만 알려주세요. 확인 가능한 범위에서 필요한
            시험 유형과 교재 구성을 안내합니다.
          </p>

          <p className="mt-5 text-[11.5px] font-medium uppercase tracking-[0.08em] text-charcoal-600/60">
            상담 시 알려주시면 좋은 정보
          </p>
          <ul className="mt-2.5 grid max-w-[480px] grid-cols-2 gap-x-4 gap-y-1.5 text-[12.5px] text-charcoal-600">
            {consultInfo.map((i) => (
              <li key={i}>· {i}</li>
            ))}
          </ul>

          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            <MessageCircle size={16} />
            학교별 시험 문의
          </a>
        </div>
      </div>
    </section>
  );
}
