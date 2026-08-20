import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  FileCheck2,
  Microscope,
  ShieldCheck,
  Globe2,
  CreditCard,
  GraduationCap,
  Eye,
  LineChart,
  PenTool,
} from "lucide-react";
import { products, trackLabels } from "@/data/products";
import { siteConfig } from "@/data/site";
import { coverToneFor } from "@/lib/utils";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";
import { EnContactForm } from "@/components/en/EnContactForm";

export const metadata: Metadata = {
  title: "Blossom Books — Premium Study Materials for International Students",
  description:
    "English-language study workbooks and answer keys for US curriculum, AP, SAT, international school admissions and certified exams. Published pricing by volume; order through our official channel.",
  alternates: { canonical: "/en" },
  openGraph: {
    title: "Blossom Books — Premium Study Materials",
    description:
      "Workbooks and detailed answer keys for US curriculum, AP, SAT and international exams. Published pricing; order through our official channel.",
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
  const catalog = products.filter((p) => p.sampleAvailable).slice(0, 6);

  return (
    // html lang은 루트에서 "ko"이므로, 영문 콘텐츠에는 lang="en"을 명시해 접근성/번역 힌트를 제공합니다.
    <div lang="en">
      {/* ── Hero ── */}
      <section className="paper-rule relative overflow-hidden border-b border-navy-800/12 bg-ivory-100">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 border border-navy-800/20 px-3.5 py-1.5 font-label text-[10.5px] uppercase tracking-[0.16em] text-navy-800">
              International Assessment &amp; Academic Prep
            </span>

            <h1 className="mt-7 font-display text-[28px] font-semibold leading-[1.14] text-navy-950 text-balance min-[400px]:text-[34px] sm:text-[40px] lg:text-[46px]">
              Assessment Prep,
              <br />
              <span className="text-brass-500">Built Around the Student.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[15px] font-medium leading-relaxed text-navy-900">
              International schools · Level tests · US &amp; UK exams
            </p>
            <p className="mt-3 max-w-xl text-[14.5px] leading-[1.9] text-charcoal-600">
              The same exam still calls for different practice depending on a student&apos;s grade,
              current level, and target score. Blossom Books doesn&apos;t choose a workbook by the exam
              name alone — we build the right study plan around the student&apos;s current level and
              purpose, with a detailed answer key in every title.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/en/find"
                className="group inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
              >
                Find my workbook
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/en/books"
                className="inline-flex items-center gap-2 border border-navy-800/25 px-7 py-3.5 text-[14.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
              >
                Browse books
              </Link>
            </div>

            <dl className="mt-14 grid max-w-md grid-cols-3 gap-4 border-t border-navy-800/12 pt-7 sm:gap-6">
              {[
                ["12+", "Curriculum & exam tracks"],
                ["Workbook + Key", "In every title"],
                ["Published", "Pricing by volume"],
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

      {/* ── Assessments strip ── */}
      <section className="border-b border-navy-800/12 bg-ivory-200/40">
        <div className="mx-auto max-w-7xl px-5 py-7 lg:px-8">
          <p className="font-label text-[10.5px] uppercase tracking-[0.16em] text-navy-800/55">Assessments we prepare for</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["MAP Growth", "CAT4", "NGRT", "WIDA", "SSAT", "ISEE", "UKiset", "ISEB", "SAT", "AP", "GRE", "LSAT", "International School Placement"].map((x) => (
              <span key={x} className="border border-navy-800/15 bg-ivory-100 px-2.5 py-1 font-label text-[11.5px] tracking-wide text-navy-800">
                {x}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[12.5px] text-charcoal-600">
            <span className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">Subjects</span>
            {["English", "Reading", "Writing", "Vocabulary", "Grammar", "Math", "Science"].map((s, i) => (
              <span key={s} className="inline-flex items-center gap-2.5">
                {i > 0 && <span className="text-navy-800/25">·</span>}
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we prepare (3 tracks) ── */}
      <section className="border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <span className="eyebrow">What we prepare</span>
          <h2 className="mt-4 font-display text-[27px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            Start with what you&apos;re preparing for
          </h2>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.85] text-charcoal-600">
            Not an international-exam-only shop. We support three preparation goals equally — academy
            and school placement tests, international-school and grade-level academics, and
            standardized exams.
          </p>
          <div className="mt-12 grid gap-px overflow-hidden border border-navy-800/12 bg-navy-800/10 lg:grid-cols-3">
            {[
              { no: "01", title: "International School & Academic Prep", areas: "English · Math · Science · Reading", desc: "For students in — or preparing for — international schools, and for US/UK curriculum learning." },
              { no: "02", title: "Placement & Level Test Prep", areas: "Reading · Vocabulary · Grammar · Writing · Math", desc: "For academy and school placement, streaming, and level checks — built around grade and current reading level." },
              { no: "03", title: "Standardized Test Prep", areas: "Reading · Writing · Math · Reasoning", desc: "For MAP, CAT4, SSAT, ISEE, UKiset, SAT, AP, GRE, LSAT — aligned to each exam's skill areas and question types." },
            ].map(({ no, title, areas, desc }) => (
              <div key={no} className="flex flex-col bg-ivory-100 p-7 lg:p-8">
                <span className="font-display text-[34px] font-semibold leading-none text-navy-800/18">{no}</span>
                <h3 className="mt-6 font-display text-[19px] font-semibold leading-snug text-navy-950">{title}</h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-[1.8] text-charcoal-600">{desc}</p>
                <p className="mt-5 border-t border-navy-800/10 pt-4 font-label text-[10.5px] uppercase tracking-[0.06em] text-navy-800/60">{areas}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── From Classroom to Workbook ── */}
      <section className="border-b border-navy-800/12 bg-navy-950 py-16 text-ivory-100 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <span className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">From classroom to workbook</span>
          <h2 className="mt-4 max-w-2xl font-display text-[27px] font-semibold leading-tight sm:text-[31px]">
            We turn the problems we see in class into the problems in the workbook.
          </h2>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.85] text-ivory-200/80">
            Our materials are built by educators who studied in the US and have taught students of
            many levels. We watch where students get stuck, which explanations click, and where
            difficulty jumps — then design the questions and answer keys around it.
          </p>
          <div className="mt-12 grid gap-px overflow-hidden border border-ivory-100/12 bg-ivory-100/10 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: GraduationCap, en: "Teach", ko: "We teach students directly." },
              { icon: Eye, en: "Observe", ko: "We spot recurring mistakes and weak skills." },
              { icon: LineChart, en: "Analyze", ko: "We analyze feedback from real prep teaching." },
              { icon: PenTool, en: "Design", ko: "We design question types and difficulty." },
              { icon: ShieldCheck, en: "Review", ko: "We re-check answers, explanations, and level." },
            ].map(({ icon: Icon, en, ko }, i) => (
              <div key={en} className="bg-navy-950 p-6">
                <div className="flex items-center justify-between">
                  <Icon size={20} className="text-brass-400" strokeWidth={1.7} />
                  <span className="font-display text-[22px] font-semibold text-ivory-100/15">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-4 font-label text-[11px] uppercase tracking-[0.14em] text-brass-400">{en}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ivory-200/85">{ko}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 border-l-2 border-brass-400 pl-5 font-display text-[18px] font-medium italic sm:text-[21px]">
            We teach. We observe. We build.
          </p>
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
                <div className="relative flex items-center justify-center bg-ivory-200/70 py-8">
                  {product.sampleAvailable && (
                    <span className="absolute left-3.5 top-3.5 z-10 border border-brass-500/40 bg-ivory-100/90 px-2 py-1 font-label text-[9px] uppercase tracking-[0.14em] text-brass-500">
                      Free sample
                    </span>
                  )}
                  <BookCoverMockup
                    eyebrow={product.materialType === "existing" ? "Student Workbook" : "Custom Order"}
                    title={product.title.split(" — ")[0]}
                    subtitle={product.examOrCurriculum}
                    tone={coverToneFor(product.id)}
                    size="sm"
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

                  <div className="mt-6 flex gap-2 border-t border-navy-800/10 pt-4">
                    <Link
                      href={`/books/${product.id}#sample`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-navy-900 px-3.5 py-2 text-[12.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
                    >
                      View free sample
                      <ArrowRight size={13} />
                    </Link>
                    <Link
                      href={`/books/${product.id}`}
                      className="inline-flex items-center justify-center border border-navy-800/25 px-3.5 py-2 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
                    >
                      Details
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
              How to order
            </h2>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-charcoal-600">
              Blossom Books does not take direct online payment on the site. Base prices are
              published — 40P $95 · 60P $110 · 100P $140 (100P+ on request). Confirm your title
              and volume with our team; after your order is confirmed, we arrange payment
              (PayPal for international customers) and send your PDF after confirmation.
            </p>
            <ul className="mt-6 space-y-3 text-[14px] text-charcoal-600">
              {[
                "Published pricing by volume — no need to ask just to see the price",
                "A quick fit check before you order — the right option, not the biggest",
                "Digital PDF delivery after payment confirmation — non-refundable after delivery",
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
              Contact to order
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex items-center justify-center border border-navy-800/12 bg-ivory-100 p-8">
            <div className="w-full max-w-sm">
              <BookCoverMockup
                eyebrow="Digital SAT"
                title="SAT Math"
                subtitle="Full practice workbook"
                tone="navy"
                tabLabel="$"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Compare the levels ── */}
      <section className="border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <span className="eyebrow">Compare the levels</span>
          <h2 className="mt-4 font-display text-[27px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            See difficulty in the questions, not just in words
          </h2>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.85] text-charcoal-600">
            The same reading skill, shown across three Blossom Levels — so you can tell which one
            fits your child.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              { lv: "Foundation", color: "#7d8a6a", q: "What is the main idea of the passage?", note: "Find the central idea stated in the text." },
              { lv: "Standard", color: "#ad8a4e", q: "Which statement best summarizes the whole passage?", note: "Summarize and synthesize several details." },
              { lv: "Advanced", color: "#b06a3c", q: "Which inference is best supported by the author's argument?", note: "Infer what is not stated, using evidence." },
            ].map(({ lv, color, q, note }) => (
              <div key={lv} className="flex flex-col border border-navy-800/12 bg-ivory-100 shadow-card">
                <div className="flex items-center gap-2 border-b border-navy-800/10 px-5 py-3">
                  <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                  <span className="font-label text-[10.5px] uppercase tracking-[0.12em] text-navy-900">{lv}</span>
                </div>
                <div className="flex flex-1 flex-col px-5 py-5">
                  <p className="flex-1 text-[14.5px] font-medium leading-relaxed text-navy-950">{q}</p>
                  <p className="mt-4 border-t border-navy-800/10 pt-3 text-[12.5px] leading-relaxed text-charcoal-600">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-b border-navy-800/12 bg-ivory-200/40 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 font-display text-[27px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-navy-800/10 border-y border-navy-800/10">
            {[
              { q: "Are the questions similar to the actual test?", a: "We analyze each exam's skill areas, question types, and grade-level scope, and build practice around them. We do not provide real or leaked exam questions, and we avoid claims like “100% identical.”" },
              { q: "Does difficulty differ by grade?", a: "Yes. Difficulty is built around the student's grade and target level; some titles progress from Foundation up to Advanced or Challenge." },
              { q: "How do I choose between 40 / 60 / 100 pages?", a: "It depends on how much time is left and current ability. 40P for a quick check, 60P for standard prep, 100P for intensive repetition. Our team can help you pick." },
              { q: "Is an answer key included? Is it in Korean?", a: "Yes — every title ships with a detailed answer key. International-school, level-test and US-curriculum titles include Korean explanations; SAT/AP and professional exams are explained in English with key points in Korean." },
              { q: "How is it delivered?", a: "As a digital PDF by email after payment is confirmed. You can print it and study on any device." },
              { q: "Can you make a title you don't list?", a: "Yes. We produce custom workbooks to a student's grade, level and target exam. Ask us through our official channel." },
            ].map((f) => (
              <div key={f.q} className="py-4">
                <p className="text-[14.5px] font-medium text-navy-950">{f.q}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-charcoal-600">{f.a}</p>
              </div>
            ))}
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
          </div>
          <p className="mx-auto mt-6 max-w-xl text-[13px] text-charcoal-600">
            Most international visitors don&apos;t use KakaoTalk — send us a message below instead
            and we&apos;ll reply to your email.
          </p>
          <EnContactForm />
        </div>
      </section>
    </div>
  );
}
