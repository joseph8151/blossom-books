import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import ConsultationForm from "./ConsultationForm";

export default function FinalConsultSection() {
  return (
    <section id="consult" className="scroll-mt-16 bg-navy-950 py-20 text-center sm:py-28">
      <div className="mx-auto max-w-[680px] px-5 sm:px-8">
        <h2 className="font-display text-[26px] font-semibold text-ivory-100 sm:text-[30px]">
          지원 학교를 알려주세요.
        </h2>
        <p className="mt-4 text-[14.5px] leading-[1.9] text-ivory-200/80">
          학교명과 지원 학년만 알려주셔도
          <br />
          어떤 평가를 준비해야 하는지부터 확인해드립니다.
        </p>
        <ConsultationForm />

        <div className="mt-10 border-t border-ivory-100/10 pt-8">
          <p className="text-[13px] text-ivory-200/70">폼 작성이 번거로우신가요?</p>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 border border-ivory-100/25 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:border-ivory-100/50"
          >
            <MessageCircle size={15} />
            카카오톡으로 바로 상담하기
          </a>
        </div>
      </div>
    </section>
  );
}
