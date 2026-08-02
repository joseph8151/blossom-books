import Link from "next/link";
import { MessageCircle, Mail, PenLine } from "lucide-react";
import { siteConfig } from "@/data/site";

// 개인 수신 메일(gmail)은 노출하지 않고, 공개용 브랜드 이메일로 문의를 받습니다.
const mailtoHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  "[블러섬북스] 교재 문의"
)}&body=${encodeURIComponent(
  "아래 내용을 편하게 남겨주세요.\n\n· 학생 학년: \n· 과목/시험: \n· 필요한 교재(개념서/문제집/해설집/모의고사 등): \n· 희망 분량(예: 100p, 200p): \n· 사용 목적: \n· 연락처: \n"
)}`;

export default function MissingBookCTA() {
  return (
    <section className="relative overflow-hidden border border-navy-800/15 bg-navy-950 p-8 text-ivory-100 shadow-card lg:p-11">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(173,138,78,0.22),transparent_55%)]" />
      <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <span className="eyebrow eyebrow--light">Can&apos;t find it?</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-snug sm:text-[30px]">
            찾으시는 교재가 목록에 없나요?
          </h2>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ivory-200/80">
            미국 교과서·AP·레벨테스트 등 필요한 과목과 구성(개념서·문제집·해설집·모의고사,
            100p·200p 분량까지)으로 바로 제작 상담해 드립니다. 목록에 없어도 편하게 문의하세요.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-brass-500 px-6 py-3.5 text-[14px] font-medium text-navy-950 shadow-gold transition-all hover:-translate-y-0.5 hover:bg-brass-400"
          >
            <MessageCircle size={16} />
            카카오톡 바로 상담
          </a>
          <Link
            href="/custom-order"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap border border-ivory-100/25 px-6 py-3.5 text-[14px] font-medium text-ivory-100 transition-all hover:-translate-y-0.5 hover:border-ivory-100/60"
          >
            <PenLine size={16} />
            주문 제작 상담
          </Link>
          <a
            href={mailtoHref}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap border border-ivory-100/25 px-6 py-3.5 text-[14px] font-medium text-ivory-100 transition-all hover:-translate-y-0.5 hover:border-ivory-100/60"
          >
            <Mail size={16} />
            이메일로 문의
          </a>
        </div>
      </div>
    </section>
  );
}
