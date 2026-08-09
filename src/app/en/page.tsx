import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Mail,
  FileCheck2,
  Microscope,
  ShieldCheck,
  Globe2,
  CreditCard,
} from "lucide-react";
import { products, trackLabels } from "@/data/products";
import { siteConfig } from "@/data/site";
import { coverToneFor } from "@/lib/utils";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";

export const metadata: Metadata = {
  title: "Blossom Books — Premium Study Materials for International Students",
  description:
    "English-language study workbooks and answer keys for US curriculum, AP, SAT, international school admissions and certified exams. Pay securely from anywhere with PayPal.",
  alternates: { canonical: "/en" },
  openGraph: {
    title: "Blossom Books — Premium Study Materials",
    description:
      "Workbooks and detailed answer keys for US curriculum, AP, SAT and international exams. Secure PayPal checkout for international customers.",
    locale: "en_US",
    type: "website",
  },
};

const trackLabelEn: Record<string, string> = {
  "us-curriculum": "US Curriculum",
  ap: "AP",
  admissions: "Admissions & Entrance Exams",
  "level-test": "Level-Test Prep",
  "certified-exam": "Certified & Professional Exams",
};

const whyItems = [
  {
    icon: Microscope,
    title: "Built from exam analysis",
    body: "Every workbook is structured around the actual scope and question styles of the target curriculum or exam — not generic practice.",
  },
  {
    icon: FileCheck2,
    title: "Workbook + detailed answer key",
    body: "All titles ship with full solutions and explanations, including the mistakes students most commonly make.",
  },
  {
    icon: ShieldCheck,
    title: "Made for tutors & academies too",
    body: "Existing titles are ready to buy; if the material you need doesn't exist yet, we produce it to order.",
  },
  {
    icon: Globe2,
    title: "Delivered worldwide as PDF",
    body: "Materials are delivered digitally, so students anywhere — overseas Korean families and international learners alike — get them instantly.",
  },
];

export default function EnHomePage() {
  const catalog = products.slice(0, 6);

  return (
    // html lang은 루트에서 "ko"이므로, 영문 콘텐츠에는 lang="en"을 명시해 접근성/번역 힌트를 제공합니다.
    <div lang="en">
      {/* ── Hero ── */}
      <section className="paper-rule relative overflow-hidden border-b border-navy-800/12 bg-ivory-100">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 border border-navy-800/20 px-3.5 py-1.5 font-label text-[11px] uppercase tracking-[0.16em] text-navy-800">
              Educational Content Studio
            </span>

            <h1 className="mt-7 font-display text-[26px] font-semibold leading-[1.18] text-navy-950 text-balance min-[400px]:text-[33px] sm:text-[39px] lg:text-[44px]">
              Premium study materials,
              <br />
              <span className="italic text-burgundy-700">purpose-built for the exam</span>
            </h1>

            <p className="mt-7 max-w-xl text-[16.5px] leading-relaxed text-charcoal-600">
              Blossom Books creates student workbooks with detailed answer keys for the US
              curriculum, AP, the Digital SAT, international-school admissions and certified
              exams. Buy an existing title, or commission one made to your needs.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#samples"
                className="group inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
              >
                Browse sample books
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={siteConfig.kakaoChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-navy-800/25 px-7 py-3.5 text-[14.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
              >
                <MessageCircle size={16} />
                Chat on KakaoTalk
              </a>
            </div>

            <dl className="mt-14 grid max-w-md grid-cols-3 gap-4 border-t border-navy-800/12 pt-7 sm:gap-6">
              {[
                ["12+", "Curriculum & exam tracks"],
                ["Workbook + Key", "In every title"],
                ["PayPal", "Secure global checkout"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-[19px] font-semibold text-navy-900">{value}</dt>
                  <dd className="mt-1 text-[12px] leading-snug text-charcoal-600">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center lg:h-[480px]">
            <BookCoverMockup
              eyebrow="Practice Test Series"
              title="Mock Exam"
              subtitle="Two full practice tests"
              tone="ivory"
              tabLabel="03"
              className="absolute left-2 top-2 -rotate-[9deg]"
            />
            <BookCoverMockup
              eyebrow="Answer Key"
              title="Explanations"
              subtitle="Full worked solutions"
              tone="ivory"
              tabLabel="02"
              className="absolute right-0 top-6 rotate-[7deg]"
            />
            <BookCoverMockup
              eyebrow="Student Workbook"
              title="Algebra 1"
              subtitle="US curriculum · 12 units"
              tone="navy"
              tabLabel="01"
              className="relative z-10 -rotate-[2deg]"
            />
          </div>
        </div>
      </section>

      {/* ── Why Blossom Books ── */}
      <section id="why" className="scroll-mt-24 border-b border-navy-800/12 bg-ivory-200/40">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">
            Why Blossom Books
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[30px] font-semibold leading-tight text-navy-950 sm:text-[30px]">
            Materials that match the test — and the student
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyItems.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border border-navy-800/12 bg-ivory-100 p-6">
                <Icon size={22} className="text-navy-800" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-[19px] font-semibold text-navy-950">{title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-charcoal-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample catalog ── */}
      <section id="samples" className="scroll-mt-24 border-b border-navy-800/12 bg-ivory-100">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">
            Sample catalog
          </p>
          <h2 className="mt-3 font-display text-[30px] font-semibold leading-tight text-navy-950 sm:text-[30px]">
            A few of our ready-to-buy titles
          </h2>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-charcoal-600">
            Each title includes the student workbook and a detailed answer key, delivered
            as PDF. Pricing and grade-level options are shared on request.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col border border-navy-800/12 bg-ivory-100 transition-shadow hover:shadow-[0_16px_40px_-20px_rgba(13,22,38,0.35)]"
              >
                <div className="flex items-center justify-center bg-ivory-200/70 py-8">
                  <BookCoverMockup
                    eyebrow={product.materialType === "existing" ? "Student Workbook" : "Custom Order"}
                    title={product.title.split(" — ")[0]}
                    subtitle={product.examOrCurriculum}
                    tone={coverToneFor(product.id)}
                    className="max-w-[150px] scale-90"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
                    {trackLabelEn[product.track] ?? trackLabels[product.track]}
                  </span>
                  <h3 className="mt-3 font-display text-[20px] font-semibold leading-snug text-navy-950">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-[12.5px] text-charcoal-600">
                    {product.subject} · {product.gradeRange}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-charcoal-600">
                    {product.includesAnswerKey && (
                      <span className="inline-flex items-center gap-1">
                        <FileCheck2 size={13} className="text-navy-800" /> Answer key included
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-navy-800/10 pt-4">
                    <span className="text-[12.5px] font-medium text-charcoal-600">Price on request</span>
                    <Link
                      href="/en#contact"
                      className="inline-flex items-center gap-1 text-[13px] font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4"
                    >
                      Inquire <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Payment ── */}
      <section id="payment" className="scroll-mt-24 border-b border-navy-800/12 bg-ivory-200/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Payment</p>
            <h2 className="mt-3 font-display text-[30px] font-semibold leading-tight text-navy-950 sm:text-[30px]">
              Pay securely with PayPal
            </h2>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-charcoal-600">
              International customers check out with PayPal in USD — no bank transfer
              required. After your payment is verified, your PDF materials are sent to the
              email linked to your PayPal account.
            </p>
            <ul className="mt-6 space-y-3 text-[14px] text-charcoal-600">
              {[
                "Pricing shared on request — tailored to grade, level and length",
                "Secure USD payment via PayPal (card or PayPal balance)",
                "Digital delivery — no shipping fees, no waiting",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <CreditCard size={16} className="mt-0.5 shrink-0 text-navy-800" />
                  {line}
                </li>
              ))}
            </ul>
            <Link
              href="/en#contact"
              className="mt-8 inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
            >
              Request a quote
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex items-center justify-center border border-navy-800/12 bg-ivory-100 p-8">
            <div className="w-full max-w-sm">
              <BookCoverMockup
                eyebrow="Digital SAT"
                title="SAT Math"
                subtitle="Full practice · USD checkout"
                tone="navy"
                tabLabel="$"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="scroll-mt-24 bg-ivory-100">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-8 lg:py-24">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Contact</p>
          <h2 className="mt-3 font-display text-[30px] font-semibold leading-tight text-navy-950 sm:text-[30px]">
            Questions? We&apos;re happy to help.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-charcoal-600">
            Ask about a specific exam, request a title we don&apos;t list yet, or get help
            with international payment. We usually reply within one business day.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-navy-900 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
            >
              <MessageCircle size={16} /> Chat on KakaoTalk
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center gap-2 border border-navy-800/25 px-7 py-3.5 text-[14.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              <Mail size={16} /> Email us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
