import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, FileText, Headphones, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { coverToneFor, blossomLevel, BLOSSOM_LEVEL_KO } from "@/lib/utils";
import { offersVolumes as productOffersVolumes, isDirectPurchase, insideTheWorkbook, productCode } from "@/lib/productMeta";
import { flexibleVolumes, extendedOption } from "@/data/pricing";
import { siteConfig } from "@/data/site";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";
import SamplePreviewButton from "@/components/books/SamplePreviewButton";

const trackLabelEn: Record<string, string> = {
  "us-curriculum": "US Curriculum",
  ap: "AP",
  admissions: "Admissions & Entrance",
  "level-test": "Level-Test Prep",
  "certified-exam": "Certified & Professional",
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.id === slug);
  if (!p) return {};
  const title = p.title.split(" — ")[0];
  return {
    title: `${title} — Blossom Books`,
    description: `${p.subject} workbook for ${p.examOrCurriculum} (${p.gradeRange}). Student workbook + detailed answer key, delivered as PDF.`,
    alternates: { canonical: `/en/books/${p.id}` },
  };
}

const usd = (n: number) => `$${n}`;

export default async function EnProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();

  const title = product.title.split(" — ")[0];
  const offersVolumes = productOffersVolumes(product);
  const direct = isDirectPurchase(product);
  const inside = insideTheWorkbook(product);
  const level = blossomLevel(product.difficulty);

  const receive = [
    "Student Workbook",
    product.includesAnswerKey ? "Answer & Explanation Guide" : null,
    "Digital PDF Delivery",
    product.includesAudio ? "Listening Audio (MP3)" : null,
  ].filter(Boolean) as string[];

  const whoFor = [
    `Students in ${product.gradeRange}`,
    product.readingLevel ? `Around ${product.readingLevel}` : null,
    inside.length > 1 ? "Learners preparing Reading · Vocabulary · Grammar · Writing together" : null,
  ].filter(Boolean) as string[];

  const faqs = [
    { q: "Are the questions similar to the actual test?", a: "We analyze the exam's skill areas and question types and build practice around them. We do not provide real or leaked questions." },
    { q: "Is the answer key detailed?", a: "Yes — every title ships with full answers and explanations, including common mistakes." },
    { q: "How is it delivered?", a: "As a printable digital PDF by email after payment is confirmed." },
    { q: "What if I need a different grade or focus?", a: "We can produce a custom workbook. Ask us through our official channel." },
  ];

  return (
    <div lang="en" className="mx-auto max-w-6xl px-5 py-12 pb-24 lg:px-8 lg:py-16">
      <nav className="text-[12.5px] text-charcoal-600">
        <Link href="/en/books" className="hover:text-navy-900">Catalog</Link>
        <span className="mx-2">/</span>
        <span>{trackLabelEn[product.track]}</span>
      </nav>

      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">{trackLabelEn[product.track]}</span>
          <span className="inline-flex items-center gap-1.5 border border-navy-800/20 bg-ivory-200/50 px-2.5 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-navy-800/80">
            {level} · {BLOSSOM_LEVEL_KO[level]}
          </span>
        </div>
        <h1 className="mt-3 font-display text-[30px] font-semibold leading-tight text-navy-950 sm:text-[36px]">{title}</h1>
        <p className="mt-2 text-[14px] text-charcoal-600">
          {product.examOrCurriculum} · {product.subject} · {product.gradeRange}
          {product.readingLevel ? ` · ${product.readingLevel}` : ""}
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <div className="flex items-start justify-center bg-ivory-200/50 py-14">
            <BookCoverMockup
              eyebrow={product.materialType === "existing" ? "Student Workbook" : "Custom Order"}
              title={title}
              subtitle={product.examOrCurriculum}
              tone={coverToneFor(product.id)}
              className="max-w-[240px]"
            />
          </div>

          <p className="mt-8 text-[14.5px] leading-relaxed text-charcoal-600">
            A {product.subject} workbook for {product.examOrCurriculum}, built for {product.gradeRange}. It practices{" "}
            {product.units.slice(0, 5).join(", ")}, and ships with a detailed answer key so students can review on their own.
          </p>

          {/* Who this is for */}
          <div className="mt-10 border-l-2 border-brass-500 pl-5">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-navy-800/70">Who this is for</p>
            <ul className="mt-3 space-y-2">
              {whoFor.map((w) => (
                <li key={w} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-charcoal-900">
                  <Check size={15} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} /> {w}
                </li>
              ))}
            </ul>
          </div>

          {/* What you'll practice */}
          <div className="mt-10">
            <h2 className="font-display text-[20px] font-semibold text-navy-950">What you&apos;ll practice</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {inside.map((g) => (
                <div key={g.area} className="border border-navy-800/12 bg-ivory-200/40 p-5">
                  <p className="font-label text-[11px] uppercase tracking-[0.1em] text-brass-500">{g.area}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <span key={it} className="border border-navy-800/12 bg-ivory-100 px-2 py-1 text-[12px] text-charcoal-900">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample */}
          <div id="sample" className="mt-10 scroll-mt-24 border border-navy-800/12 bg-ivory-100 p-6 shadow-card lg:p-7">
            <span className="eyebrow">See before you buy</span>
            <h2 className="mt-3 font-display text-[20px] font-semibold text-navy-950">Don&apos;t judge it by the cover.</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-charcoal-600">
              Check the real difficulty, question types, and explanation style first.
            </p>
            <div className="mt-4">
              <SamplePreviewButton product={product} />
            </div>
          </div>

          {/* What's included */}
          <div className="mt-10">
            <h2 className="font-display text-[20px] font-semibold text-navy-950">What&apos;s included</h2>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {receive.map((r, i) => (
                <span key={r} className="inline-flex items-center gap-2">
                  {i > 0 && <span className="text-navy-800/25">+</span>}
                  <span className="inline-flex items-center gap-1.5 border border-navy-800/15 bg-ivory-200/50 px-3 py-2 text-[13px] font-medium text-navy-900">
                    <Check size={14} className="text-brass-500" strokeWidth={2.4} /> {r}
                  </span>
                </span>
              ))}
            </div>
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12.5px] text-charcoal-600">
              <span className="inline-flex items-center gap-1.5"><FileText size={14} className="text-navy-800" /> Printable PDF</span>
              {product.includesAudio && <span className="inline-flex items-center gap-1.5"><Headphones size={14} className="text-navy-800" /> Listening audio</span>}
            </p>
          </div>

          {/* FAQ */}
          <div className="mt-10">
            <h2 className="font-display text-[20px] font-semibold text-navy-950">FAQ</h2>
            <div className="mt-4 divide-y divide-navy-800/10 border-y border-navy-800/10">
              {faqs.map((f) => (
                <div key={f.q} className="py-4">
                  <p className="flex items-start gap-2 text-[14px] font-medium text-navy-950">
                    <HelpCircle size={16} className="mt-0.5 shrink-0 text-brass-500" /> {f.q}
                  </p>
                  <p className="mt-1.5 pl-6 text-[13px] leading-relaxed text-charcoal-600">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky purchase */}
        <div>
          <div className="lg:sticky lg:top-24 border border-navy-800/15 bg-ivory-100 p-6 shadow-card">
            <p className="font-display text-[18px] font-semibold text-navy-950">{title}</p>
            <p className="mt-1.5 text-[12.5px] text-charcoal-600">{product.units.slice(0, 4).join(" · ")}</p>

            {direct ? (
              <>
                {offersVolumes ? (
                  <div className="mt-5">
                    <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">Choose your volume</p>
                    <div className="mt-3 space-y-2">
                      {flexibleVolumes.map((v) => (
                        <div key={v.pages} className="flex items-center justify-between border border-navy-800/15 px-3 py-2.5">
                          <span className="text-[13px] text-charcoal-900">{v.label} · {v.tier}</span>
                          <span className="font-display text-[15px] font-semibold text-navy-950">{usd(v.priceUSD)}</span>
                        </div>
                      ))}
                      <p className="text-[11.5px] text-charcoal-600/80">{extendedOption.label}+ · price on request</p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-5 font-display text-[24px] font-semibold text-navy-950">
                    {product.pageCount ? (flexibleVolumes.find((v) => v.pages === product.pageCount)?.priceUSD ? usd(flexibleVolumes.find((v) => v.pages === product.pageCount)!.priceUSD) : "Price on request") : "Price on request"}
                  </p>
                )}
              </>
            ) : (
              <p className="mt-5 font-display text-[20px] font-semibold text-burgundy-700">Custom / Price on request</p>
            )}

            <a
              href={siteConfig.kakaoChatUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 bg-navy-900 px-6 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
            >
              <MessageCircle size={16} /> Order via KakaoTalk
            </a>
            <a href="#sample" className="mt-2.5 flex items-center justify-center gap-2 border border-navy-800/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50">
              View free sample
            </a>
            <p className="mt-3 text-[11.5px] leading-relaxed text-charcoal-600">
              International customers pay via PayPal after the order is confirmed. The PDF is sent by email after payment.
              Non-refundable after delivery — please review the free sample first.
            </p>
            <div className="mt-4 border-t border-navy-800/12 pt-3 font-label text-[9px] uppercase tracking-[0.14em] text-navy-800/55">
              Blossom Books · {productCode(product)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-3 border-t border-navy-800/12 pt-10 text-center">
        <p className="text-[13.5px] text-charcoal-600">Not sure which option fits your child?</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href={siteConfig.kakaoChatUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800">
            <MessageCircle size={15} /> Chat on KakaoTalk
          </a>
          <Link href="/en/books" className="inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50">
            Back to catalog <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
