import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

const cases = ["학교 자체 영어 테스트", "학교 자체 수학 시험", "Writing Assessment", "Interview", "Reading Test", "복합 입학시험"];

export default function CustomQuoteCallout() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-100 py-16 sm:py-20">
      <div className="mx-auto max-w-[640px] px-5 text-center sm:px-8">
        <h2 className="font-display text-[22px] font-semibold leading-snug text-navy-950 sm:text-[25px]">
          목록에 없는 국제학교 시험도 문의할 수 있습니다.
        </h2>

        <ul className="mx-auto mt-7 grid max-w-[440px] gap-2.5 text-left sm:grid-cols-2">
          {cases.map((c) => (
            <li key={c} className="text-[13px] leading-relaxed text-charcoal-700">
              · {c}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[13px] leading-relaxed text-charcoal-600/70">
          이 경우 기본 가격표 대신 시험 구성에 따라 맞춤 견적으로 안내합니다. 시험 성격에 따라 STANDARD와
          ADVANCED 구성으로 나눠 준비하는 것도 상담에서 안내해 드립니다.
        </p>

        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex min-h-[50px] items-center justify-center gap-2 border border-navy-900 px-7 text-[14px] font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-ivory-100"
        >
          <MessageCircle size={16} />
          맞춤 입학시험 견적받기
        </a>
      </div>
    </section>
  );
}
