import Link from "next/link";
import { ShieldCheck, Building2, BadgeCheck, XCircle, MessageCircle, FileText } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Quality & Transparency — 품질·투명성 안내",
  description:
    "Blossom Books의 사업자 정보, 공식 구매 채널, 제작·검수 방식, 공식 시험과의 관계, 환불·수정 정책을 한곳에서 투명하게 안내합니다.",
};

const dontPromise = [
  "점수 상승을 보장하지 않습니다.",
  "합격을 보장하지 않습니다.",
  "특정 학교·학원의 실제 시험문제(기출·유출)를 제공한다고 주장하지 않습니다.",
  "학생에게 필요하지 않은 분량을 무조건 권하지 않습니다.",
];

export default function TransparencyPage() {
  return (
    <div>
      {/* 히어로 */}
      <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Quality &amp; Transparency</p>
          <h1 className="mt-3 font-display text-[30px] font-semibold leading-tight text-navy-950 sm:text-[38px]">
            품질과 정책을 투명하게 공개합니다
          </h1>
          <p className="mt-5 max-w-2xl text-[14.5px] leading-[1.9] text-charcoal-600">
            누가 운영하는지, 어떻게 만들고 검수하는지, 구매 전후 정책은 어떤지 — 고객이 확인하고 싶은
            내용을 한곳에 모았습니다.
          </p>
        </div>
      </section>

      {/* Publisher Information */}
      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="flex items-center gap-2.5">
            <Building2 size={20} className="text-brass-500" />
            <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">Publisher Information</h2>
          </div>
          <dl className="mt-6 grid gap-px overflow-hidden border border-navy-800/12 bg-navy-800/10 sm:grid-cols-2">
            {[
              ["브랜드", "Blossom Books · Educational Workbook Publisher"],
              ["사업자등록번호", siteConfig.businessRegistrationNumber],
              ["사업장 소재지", siteConfig.addressKo],
              ["공식 카카오톡", "Blossom Books 공식 채널 (구매·상담)"],
              ["이메일 문의", "홈페이지 문의 폼 / 이메일로 접수"],
              ["결제 방식", "카카오톡 상담 후 계좌이체 또는 카드 결제"],
              ["제공 방식", "결제 확인 후 Digital PDF를 이메일로 발송"],
              ["상담 운영", "카카오톡 채널로 순차 응대"],
            ].map(([k, v]) => (
              <div key={k} className="bg-ivory-100 p-4">
                <dt className="font-label text-[10px] uppercase tracking-[0.1em] text-brass-500">{k}</dt>
                <dd className="mt-1.5 text-[13px] text-charcoal-900">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[12px] leading-relaxed text-charcoal-600/80">
            사업자등록번호로 국세청 등에서 사업자 정보를 조회하실 수 있습니다. 결제는 홈페이지 직접 결제가
            아니라 공식 카카오톡 상담원을 통해 진행됩니다.
          </p>
        </div>
      </section>

      {/* Official Purchase Channels */}
      <section className="border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="flex items-center gap-2.5">
            <BadgeCheck size={20} className="text-brass-500" />
            <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">Official Purchase Channels</h2>
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-charcoal-600">
            정식 Blossom Books 교재는 아래 공식 채널을 통해서만 제공됩니다. 비공식 재판매 파일이나 개인
            거래로 구매하지 않도록 주의해 주세요.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {["blossombooks.org (공식 홈페이지)", "Official Kakao Purchase Support (공식 카카오톡)"].map((c) => (
              <div key={c} className="flex items-center gap-2 border border-navy-800/12 bg-ivory-200/40 p-4 text-[13.5px] text-charcoal-900">
                <ShieldCheck size={16} className="shrink-0 text-brass-500" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment + Exam relationship */}
      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">Our Quality Commitment</h2>
          <p className="mt-4 text-[14px] leading-[1.9] text-charcoal-600">
            We review our materials carefully before publication. If a clear Blossom Books error is
            confirmed, we provide corrections according to our correction policy. 저희는 “오류가 전혀 없다”고
            보장하지 않습니다. 대신 오류가 확인되면 책임 있게 대응합니다.
          </p>

          <div className="mt-8 border border-navy-800/12 bg-ivory-100 p-6">
            <p className="font-label text-[11px] uppercase tracking-[0.12em] text-brass-500">
              공식 시험과의 관계
            </p>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-charcoal-600">
              Blossom Books는 독립 교육 출판사입니다. 모든 교재는 학습·연습을 목적으로 독립적으로 제작되며,
              언급된 시험을 주관하는 기관과 제휴·보증·공식 후원 관계가 없습니다. 실제 기출문제나 유출문제를
              제공하지 않으며, 시험에서 평가하는 Skill과 문제 유형에 익숙해지도록 돕는 것을 목표로 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* What We Don't Promise */}
      <section className="border-b border-navy-800/12 bg-navy-950 py-16 text-ivory-100 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <h2 className="font-display text-[24px] font-semibold sm:text-[27px]">What We Don&apos;t Promise</h2>
          <ul className="mt-6 space-y-3">
            {dontPromise.map((d) => (
              <li key={d} className="flex items-start gap-3 text-[14px] leading-relaxed text-ivory-200/85">
                <XCircle size={17} className="mt-0.5 shrink-0 text-brass-400" />
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-l-2 border-brass-400 pl-5 font-display text-[19px] font-medium italic leading-snug sm:text-[22px]">
            Good preparation does not begin with more questions. It begins with the right questions.
          </p>
          <p className="mt-2 pl-5 text-[13px] text-ivory-200/70">
            좋은 시험 준비는 많은 문제에서 시작하는 것이 아니라, 학생에게 필요한 문제에서 시작합니다.
          </p>
        </div>
      </section>

      {/* 정책 링크 */}
      <section className="bg-ivory-100 py-14 lg:py-16">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <div className="flex items-center justify-center gap-2.5">
            <FileText size={18} className="text-brass-500" />
            <h2 className="font-display text-[20px] font-semibold text-navy-950">정책 자세히 보기</h2>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[13.5px]">
            <Link href="/policy" className="border border-navy-800/25 px-5 py-2.5 font-medium text-navy-900 transition-colors hover:border-navy-800/50">
              구매·환불·수정 정책
            </Link>
            <Link href="/terms" className="border border-navy-800/25 px-5 py-2.5 font-medium text-navy-900 transition-colors hover:border-navy-800/50">
              이용약관
            </Link>
            <Link href="/privacy" className="border border-navy-800/25 px-5 py-2.5 font-medium text-navy-900 transition-colors hover:border-navy-800/50">
              개인정보처리방침
            </Link>
            <Link href="/copyright" className="border border-navy-800/25 px-5 py-2.5 font-medium text-navy-900 transition-colors hover:border-navy-800/50">
              저작권 안내
            </Link>
          </div>
          <div className="mt-8">
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
            >
              <MessageCircle size={15} /> 공식 카카오톡 문의
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
