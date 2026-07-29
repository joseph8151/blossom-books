import Link from "next/link";
import { siteConfig } from "@/data/site";

const linkGroups = [
  {
    title: "블러섬북스",
    links: [
      { label: "블러섬북스 소개", href: "/about" },
      { label: "교재 찾기", href: "/books" },
      { label: "주문 제작", href: "/custom-order" },
      { label: "학원·기관 상담", href: "/institutions" },
    ],
  },
  {
    title: "고객 지원",
    links: [
      { label: "자주 묻는 질문", href: "/faq" },
      { label: "카카오톡 상담", href: siteConfig.kakaoChannelUrl },
      { label: "이메일 문의", href: `mailto:${siteConfig.email}` },
    ],
  },
  {
    title: "정책",
    links: [
      { label: "이용약관", href: "/terms" },
      { label: "개인정보처리방침", href: "/privacy" },
      { label: "교재 이용 및 저작권 안내", href: "/copyright" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-navy-800/15 bg-navy-950 text-ivory-200">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <span className="font-display text-2xl font-semibold text-ivory-100">Blossom Books</span>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-ivory-200/70">
              시험과 교육과정을 연구하여 학생용 문제집과 정답·상세 해설집을 제작하는
              교육 콘텐츠 브랜드입니다.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] text-ivory-200/80 transition-colors hover:text-ivory-100"
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
            {siteConfig.businessName} · 사업자등록번호 {siteConfig.businessRegistrationNumber} · 대표{" "}
            {siteConfig.representativeName} · {siteConfig.email}
          </p>
          <p>© {new Date().getFullYear()} Blossom Books. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
