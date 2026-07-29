import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

const checklist = [
  "학생 학년 또는 연령",
  "현재 실력과 학습 수준",
  "준비하는 시험 또는 교육과정",
  "필요한 과목",
  "원하는 교재 유형",
  "희망 분량",
  "사용 목적",
  "필요한 시기",
  "개인용, 학원용, 기관용 여부",
];

export default function ConsultationCTA() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Consultation</p>
          <h2 className="mt-3 font-display text-[32px] font-semibold text-navy-950 sm:text-[38px]">
            상담 전 이런 정보를 준비해주세요
          </h2>
          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-charcoal-600">
            원하시는 과목과 시험, 학생의 학년을 알려주시면 현재 구매 가능한 교재부터
            확인해 안내드립니다. 기존 교재가 없는 경우에는 필요한 구성과 제작 가능
            여부를 상담해드립니다.
          </p>

          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 bg-navy-900 px-8 py-4 text-[15px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            <MessageCircle size={18} />
            카카오톡으로 교재 상담하기
          </a>
        </div>

        <div className="border border-navy-800/15 bg-ivory-200/60 p-8">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-navy-800/70">Checklist</p>
          <ul className="mt-5 space-y-3">
            {checklist.map((item, i) => (
              <li key={item} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-charcoal-600">
                <span className="font-label text-[11px] text-brass-500">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
