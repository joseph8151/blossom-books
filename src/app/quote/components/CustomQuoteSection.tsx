import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

const cases = [
  "Interview만 필요한 경우",
  "Reading + Writing처럼 두 영역만 필요한 경우",
  "특정 취약 유형을 집중적으로 구성하는 경우",
  "200P 이상 분량이 필요한 경우",
  "표에 없는 시험 대비",
  "학교·학원 자체 시험 대비",
  "형제·자매 또는 다과목 구성",
  "기관용 대량 제작",
];

export default function CustomQuoteSection() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-200/30 py-16 sm:py-24">
      <div className="mx-auto max-w-[680px] px-5 text-center sm:px-8">
        <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          표에 없는 구성도 가능합니다.
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
          아래와 같은 경우에는 표 가격 대신 맞춤 견적으로 안내합니다.
        </p>

        <ul className="mx-auto mt-8 grid max-w-[520px] gap-2.5 text-left sm:grid-cols-2">
          {cases.map((c) => (
            <li key={c} className="text-[13px] leading-relaxed text-charcoal-700">
              · {c}
            </li>
          ))}
        </ul>

        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-9 inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          맞춤 견적 문의하기
        </a>
      </div>
    </section>
  );
}
