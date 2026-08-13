import Link from "next/link";
import { MapPin, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

const linkGroups = [
  {
    title: "JOHN",
    links: [
      { label: "About JOHN", href: "/about" },
      { label: "Business Models", href: "/business-models" },
      { label: "Why JOHN", href: "/#why-john" },
      { label: "Curriculum", href: "/#curriculum" },
      { label: "Owner Support", href: "/#owner-support" },
    ],
  },
  {
    title: "Franchise",
    links: [
      { label: "가맹 상담 신청", href: "/consultation" },
      { label: "가맹 절차", href: "/#franchise-process" },
      { label: "기존 학원 전환 상담", href: "/#existing-owners" },
      { label: "사업 모델 비교", href: "/business-models#comparison" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "자주 묻는 질문", href: "/faq" },
      { label: "이메일 문의", href: `mailto:${siteConfig.email}` },
    ],
  },
  {
    title: "정책",
    links: [
      { label: "이용약관", href: "/terms" },
      { label: "개인정보처리방침", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-navy-900/15 bg-navy-950 text-ivory-200">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 shrink-0 items-end gap-[2.5px]" aria-hidden>
                <span className="h-[10px] w-[5px] rounded-full bg-navy-500" />
                <span className="h-[16px] w-[5px] rounded-full bg-ivory-100/70" />
                <span className="h-[24px] w-[5px] rounded-full bg-coral-500" />
              </span>
              <span className="font-display text-xl font-extrabold text-ivory-100">
                JOHN <span className="font-semibold text-ivory-100/60">EDUCATION GROUP</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-ivory-200/70">
              Building Better Education Businesses. 어린이 영어부터 Academic Prep, 공부방, 교습소,
              성인 1:1·그룹 어학원까지, 하나의 브랜드와 시스템 안에서 교육사업을 운영할 수 있도록
              지원하는 Modern Education Franchise Company입니다.
            </p>
            <div className="mt-5 flex items-start gap-2 text-[12.5px] leading-relaxed text-ivory-200/65">
              <MapPin size={15} className="mt-0.5 shrink-0 text-coral-400" />
              <span>{siteConfig.addressKo}</span>
            </div>
            <div className="mt-2 flex items-start gap-2 text-[12.5px] leading-relaxed text-ivory-200/65">
              <Mail size={15} className="mt-0.5 shrink-0 text-coral-400" />
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-coral-400">
                {siteConfig.email}
              </a>
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-coral-400">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-[13.5px] text-ivory-200/80 transition-colors hover:text-coral-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory-100/10 pt-8 text-[12px] leading-relaxed text-ivory-200/55 lg:flex-row lg:items-center lg:justify-between">
          <p>
            사업자등록번호 {siteConfig.businessRegistrationNumber} · {siteConfig.addressShort} ·{" "}
            <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-coral-400">
              이메일 문의
            </a>
          </p>
          <p>© {new Date().getFullYear()} JOHN EDUCATION GROUP. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
