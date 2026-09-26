import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

const items = [
  { n: "01", label: "시험명 또는 학원·학교명" },
  { n: "02", label: "학생 학년 또는 나이" },
  { n: "03", label: "필요한 과목 / 영역" },
  { n: "04", label: "시험 예정일" },
];

export default function BeforeYouChat() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-100 py-16 sm:py-24">
      <div className="mx-auto max-w-[680px] px-5 text-center sm:px-8">
        <h2 className="font-display text-[24px] font-semibold leading-snug text-navy-950 sm:text-[27px]">
          빠른 견적을 위해
          <br className="sm:hidden" /> 네 가지만 알려주세요.
        </h2>

        <div className="mx-auto mt-10 grid max-w-[480px] gap-6 text-left sm:grid-cols-2">
          {items.map((i) => (
            <div key={i.n}>
              <span className="font-label text-[12px] tracking-[0.1em] text-brass-500">{i.n}</span>
              <p className="mt-1.5 text-[14px] font-medium text-navy-950">{i.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[12.5px] leading-relaxed text-charcoal-600/70">
          Optional — 현재 수준이나 최근 시험 점수가 있다면 함께 알려주세요.
        </p>

        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 문의하기
        </a>

        <div className="mx-auto mt-7 max-w-[420px] border border-ivory-300 bg-ivory-200/30 p-5 text-left">
          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">문의 예시</p>
          <p className="mt-2 text-[13px] leading-[1.8] text-charcoal-700">
            MAP Growth / Grade 5
            <br />
            English + Math
            <br />
            시험까지 약 6주
            <br />
            Reading이 약한 편입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
