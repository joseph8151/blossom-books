import { notFound } from "next/navigation";
import Link from "next/link";
import { FileCheck2, FileText, Headphones, Check, ArrowRight, HelpCircle, MessageCircle } from "lucide-react";
import { products, trackLabels } from "@/data/products";
import { coverToneFor, difficultyLabel, blossomLevel, BLOSSOM_LEVEL_KO } from "@/lib/utils";
import {
  offersVolumes as productOffersVolumes,
  isDirectPurchase,
  insideTheWorkbook,
  productCode,
  hasStarter,
} from "@/lib/productMeta";
import { seriesFor, seriesInfo } from "@/data/series";
import { formatKRW, fromPriceKRW } from "@/data/pricing";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";
import ProductCard from "@/components/books/ProductCard";
import SamplePreviewButton from "@/components/books/SamplePreviewButton";
import PurchasePanel from "@/components/books/PurchasePanel";
import StudyGuidance from "@/components/books/StudyGuidance";
import WorkbookSpecification from "@/components/books/WorkbookSpecification";
import ErrorReport from "@/components/books/ErrorReport";
import SmartPricing from "@/components/books/SmartPricing";
import VolumeGuide from "@/components/common/VolumeGuide";
import PrepComparison from "@/components/common/PrepComparison";
import { siteConfig } from "@/data/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

// Next.js 16: params는 Promise이므로 await 후 사용해야 합니다.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) return {};
  return { title: product.titleKo, description: product.summaryKo };
}

const purchaseFaq = [
  { q: "PDF인가요?", a: "네. 모든 교재는 Digital PDF 형태로 제공됩니다. 인쇄하여 사용하실 수 있습니다." },
  { q: "구매 후 언제 받을 수 있나요?", a: "결제가 확인되면 카카오톡 또는 이메일로 PDF 파일을 보내드립니다." },
  { q: "정답과 해설이 포함되나요?", a: "네. 정답과 함께 풀이 과정·오답 포인트를 설명하는 상세 해설집이 포함됩니다." },
  { q: "40P와 60P 차이는 무엇인가요?", a: "40P는 핵심 유형을 빠르게 점검하는 Essential Prep, 60P는 여러 유형을 균형 있게 연습하는 Complete Prep입니다." },
  { q: "어떤 수준을 선택해야 하나요?", a: "시험까지 남은 기간과 현재 실력에 따라 다릅니다. 확실하지 않으시면 구매 전 상담으로 편하게 안내받으실 수 있습니다." },
  { q: "100P 이상도 가능한가요?", a: "네. 150P 이상, 추가 영역, 특수 구성은 별도 문의(Price on Request)로 안내해 드립니다." },
  { q: "해외에서도 구매할 수 있나요?", a: "네. 해외 고객은 PayPal로 결제하실 수 있습니다." },
  { q: "환불 정책은 어떻게 되나요?", a: "디지털 상품 특성상 파일 발송 후에는 환불이 제한될 수 있습니다. 구매 전 무료 샘플로 내용을 확인하시길 권장하며, 자세한 정책은 상담으로 안내해 드립니다." },
];

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.track === product.track && p.id !== product.id).slice(0, 3);
  const offersVolumes = productOffersVolumes(product);
  const direct = isDirectPurchase(product);
  const inside = insideTheWorkbook(product);

  const receive = [
    "Student Workbook",
    product.includesAnswerKey ? "Answer & Explanation Guide" : null,
    "Digital PDF Delivery",
    product.includesAudio ? "Listening Audio (MP3)" : null,
  ].filter(Boolean) as string[];

  const whoFor = [
    `${product.gradeRange} 학생`,
    product.readingLevel ? `Reading Level 약 ${product.readingLevel.replace("SR ", "")}` : null,
    product.recommendedForKo,
    inside.length > 1 ? "Reading · Vocabulary · Grammar · Writing를 함께 준비해야 하는 학생" : null,
  ].filter(Boolean) as string[];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 pb-24 lg:px-8 lg:py-16 lg:pb-16">
      <nav className="text-[12.5px] text-charcoal-600">
        <Link href="/books" className="hover:text-navy-900">교재 찾기</Link>
        <span className="mx-2">/</span>
        <span>{trackLabels[product.track]}</span>
      </nav>

      {/* 헤더 */}
      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">
            {trackLabels[product.track]}
          </span>
          <Link
            href={`/series#${seriesFor(product)}`}
            className="inline-flex items-center gap-1.5 border border-brass-500/35 bg-brass-500/[0.06] px-2.5 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-brass-500 transition-colors hover:border-brass-500/70"
          >
            {seriesInfo[seriesFor(product)].name}
          </Link>
          <span className="inline-flex items-center gap-1.5 border border-navy-800/20 bg-ivory-200/50 px-2.5 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-navy-800/80">
            {blossomLevel(product.difficulty)} · {BLOSSOM_LEVEL_KO[blossomLevel(product.difficulty)]}
          </span>
          <span
            className={`font-label text-[9.5px] uppercase tracking-[0.1em] ${
              direct ? "text-brass-500" : "text-burgundy-700"
            }`}
          >
            {direct ? "Direct Purchase" : "Custom / Extended"}
          </span>
          <span className="inline-flex items-center border border-navy-800/15 bg-ivory-200/50 px-2 py-0.5 font-label text-[9px] uppercase tracking-[0.1em] text-navy-800/65">
            Reviewed 2026
          </span>
        </div>
        <h1 className="mt-3 font-display text-[28px] font-semibold leading-tight text-navy-950 sm:text-[34px]">
          {product.titleKo}
        </h1>
        <p className="mt-2 text-[14px] text-charcoal-600">
          {product.examOrCurriculum} · {product.gradeRange} · 난이도 {difficultyLabel(product.difficulty)}
          {product.readingLevel ? ` · ${product.readingLevel}` : ""}
        </p>
      </div>

      {/* 본문 2단: 좌 콘텐츠 / 우 구매 박스(sticky) */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* 좌측 — 상세 구조 통일: Who → Practice → Alignment → Difficulty → Sample → Included → Pages → Price → Which → FAQ */}
        <div className="min-w-0">
          <div className="flex items-start justify-center bg-ivory-200/50 py-14">
            <BookCoverMockup
              eyebrow={product.materialType === "existing" ? "Student Workbook" : "Custom Order"}
              title={product.title.split(" — ")[0]}
              subtitle={product.examOrCurriculum}
              tone={coverToneFor(product.id)}
              tabLabel="01"
              className="max-w-[240px]"
            />
          </div>

          <p className="mt-8 text-[14.5px] leading-relaxed text-charcoal-600">{product.descriptionKo}</p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-charcoal-600">
            {product.includesAnswerKey && (
              <span className="inline-flex items-center gap-1.5">
                <FileCheck2 size={15} className="text-navy-800" /> 정답·상세 해설집 포함
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <FileText size={15} className="text-navy-800" /> Digital PDF 제공
            </span>
            {product.includesAudio && (
              <span className="inline-flex items-center gap-1.5">
                <Headphones size={15} className="text-navy-800" /> 리스닝 오디오(MP3)
              </span>
            )}
          </div>

          {/* 03 · Who This Is For */}
          <div className="mt-10 border-l-2 border-brass-500 pl-5">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-navy-800/70">Who this is for</p>
            <ul className="mt-3 space-y-2">
              {whoFor.map((w) => (
                <li key={w} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-charcoal-900">
                  <Check size={15} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} />
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12.5px] text-charcoal-600">
              학생에게 적합한지 모르시나요?{" "}
              <a href={siteConfig.kakaoChannelUrl} target="_blank" rel="noreferrer" className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2">
                카카오톡으로 확인하기
              </a>
            </p>
          </div>

          {/* 04 · What You'll Practice */}
          <div className="mt-10">
            <h2 className="font-display text-[20px] font-semibold text-navy-950">What You&apos;ll Practice</h2>
            <p className="mt-1.5 text-[13px] text-charcoal-600">이 교재에서 연습하는 영역입니다.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {inside.map((g) => (
                <div key={g.area} className="border border-navy-800/12 bg-ivory-200/40 p-5">
                  <p className="font-label text-[11px] uppercase tracking-[0.1em] text-brass-500">{g.area}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <span key={it} className="border border-navy-800/12 bg-ivory-100 px-2 py-1 text-[12px] text-charcoal-900">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 05 · How closely does it reflect the actual test? (실제 시험과의 유사성 — 눈에 띄게) */}
          <div className="mt-10 border border-navy-800/15 bg-navy-950 p-6 text-ivory-100 lg:p-7">
            <p className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">
              How closely does it reflect the actual test?
            </p>
            <h2 className="mt-3 font-display text-[20px] font-semibold text-ivory-100 sm:text-[22px]">
              실제 시험과 얼마나 비슷한가요?
            </h2>
            <p className="mt-3 text-[13.5px] leading-[1.85] text-ivory-200/85">
              Blossom Books 교재는 공개된 시험 구조, 평가 영역, 문항 유형, 학년별 학습 범위를 참고하여 시험
              대비에 필요한 유형을 충분히 연습할 수 있도록 설계됩니다. 학생이 시험에서 마주하는 문제 형식과
              사고 과정에 익숙해지는 것을 목표로 합니다.
            </p>
            <p className="mt-3 border-t border-ivory-100/12 pt-3 text-[12px] leading-relaxed text-ivory-200/60">
              단, 실제 기출문제나 유출문제를 제공하지 않으며 “시험에 그대로 출제” “100% 동일”과 같은 표현은
              사용하지 않습니다. Blossom Books는 언급된 시험을 주관하는 기관과 공식 제휴·보증·후원 관계가
              없습니다.
            </p>
          </div>

          {/* 06 · Difficulty / Structure — Specification · Test Alignment · Difficulty · Quality */}
          <div className="mt-10">
            <WorkbookSpecification product={product} />
          </div>

          {/* 07 · Sample Preview — 반드시 가격보다 먼저 */}
          <div id="sample" className="mt-10 scroll-mt-24 border border-navy-800/12 bg-ivory-100 p-6 shadow-card lg:p-7">
            <span className="eyebrow">See before you buy</span>
            <h2 className="mt-3 font-display text-[20px] font-semibold text-navy-950">표지만 보고 구매하지 마세요.</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-charcoal-600">
              실제 문제의 난이도, 지문 구성, 문제 유형, 해설 방식을 확인한 뒤 결정하세요.
            </p>
            <div className="mt-4">
              <SamplePreviewButton product={product} />
            </div>
          </div>

          {/* 08 · What's Included */}
          <div className="mt-10">
            <h2 className="font-display text-[20px] font-semibold text-navy-950">What&apos;s Included</h2>
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
            <p className="mt-3 text-[12.5px] text-charcoal-600">
              완성된 Prep Package로 제공됩니다 · <span className="font-label uppercase tracking-[0.08em]">Digital PDF Format</span>
            </p>

            {/* 해설 언어(Value) + 권장 학습 방식 */}
            <StudyGuidance product={product} />

            {/* 교재 구성 */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {product.components.map((c) => (
                <div key={c.label} className="border border-navy-800/12 bg-ivory-200/40 p-4">
                  <p className="font-label text-[11px] uppercase tracking-[0.1em] text-brass-500">{c.label}</p>
                  <p className="mt-1.5 text-[13px] text-charcoal-600">{c.descriptionKo}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 09 · 페이지 옵션 + 구성 비교 */}
          {offersVolumes && (
            <div className="mt-10">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-[20px] font-semibold text-navy-950">페이지 옵션 (40·60·100·200P)</h2>
                <Link href="/guide" className="shrink-0 text-[12.5px] font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4">
                  선택 가이드
                </Link>
              </div>
              <div className="mt-5">
                <VolumeGuide compact />
              </div>
              <div className="mt-6">
                <PrepComparison />
              </div>
            </div>
          )}

          {/* 10 · Smart Pricing (영어 레벨테스트 상품) */}
          {hasStarter(product) && <SmartPricing />}

          {/* 11 · Which Option Should I Choose? */}
          <div className="mt-10 border border-navy-800/12 bg-ivory-200/40 p-6">
            <h2 className="font-display text-[18px] font-semibold text-navy-950">
              Which Option Should I Choose?
            </h2>
            <p className="mt-1.5 text-[13px] text-charcoal-600">어떤 구성이 맞는지 아래를 참고하세요.</p>
            <ul className="mt-3 space-y-1.5 text-[13px] text-charcoal-600">
              <li>· 시험이 매우 가까운 경우 → <span className="font-medium text-navy-900">40P</span></li>
              <li>· 기본적인 Prep을 원하는 경우 → <span className="font-medium text-navy-900">60P</span></li>
              <li>· 충분한 반복이 필요한 경우 → <span className="font-medium text-navy-900">100P</span></li>
              <li>· 100P 이상 / 추가 영역이 필요한 경우 → <span className="font-medium text-navy-900">별도 문의</span></li>
              <li>· 현재 수준을 모르겠다면 → <Link href="/find" className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2">교재 추천받기</Link> 또는 <Link href="/consultation" className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2">구매 전 상담</Link></li>
            </ul>
          </div>

          {/* Before You Decide — 가격 이탈 방지 */}
          <div className="mt-6 border-l-2 border-brass-500 bg-ivory-200/40 p-6">
            <p className="font-display text-[16px] font-semibold text-navy-950">Before You Decide</p>
            <p className="mt-2 text-[13px] leading-relaxed text-charcoal-600">
              페이지 수가 많다고 항상 더 좋은 선택은 아닙니다. 짧게 준비하는 학생은 작은 구성으로도 충분할 수
              있고, 시험까지 시간이 충분하거나 반복 연습이 필요한 학생은 더 큰 구성이 적합할 수 있습니다. 어떤
              구성이 적합한지 모르겠다면 구매 전에 먼저 문의하세요.
            </p>
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-5 py-2.5 text-[13px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              <MessageCircle size={14} /> 내게 맞는 구성 문의하기
            </a>
          </div>

          {/* 12 · FAQ */}
          <div className="mt-10">
            <h2 className="font-display text-[20px] font-semibold text-navy-950">구매 전 자주 묻는 질문</h2>
            <div className="mt-4 divide-y divide-navy-800/10 border-y border-navy-800/10">
              {purchaseFaq.map((f) => (
                <div key={f.q} className="py-4">
                  <p className="flex items-start gap-2 text-[14px] font-medium text-navy-950">
                    <HelpCircle size={16} className="mt-0.5 shrink-0 text-brass-500" />
                    {f.q}
                  </p>
                  <p className="mt-1.5 pl-6 text-[13px] leading-relaxed text-charcoal-600">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12.5px] text-charcoal-600">
              <Link href="/terms" className="underline decoration-brass-500 decoration-2 underline-offset-2">구매 및 이용약관</Link>
              {" · "}
              <Link href="/privacy" className="underline decoration-brass-500 decoration-2 underline-offset-2">개인정보처리방침</Link>
              {" · "}
              <Link href="/copyright" className="underline decoration-brass-500 decoration-2 underline-offset-2">교재 이용·저작권 안내</Link>
            </p>
          </div>

          {/* 독립 제작 고지 (Test Format Transparency) */}
          <div className="mt-10 border border-navy-800/12 bg-ivory-200/40 p-5">
            <p className="font-label text-[10.5px] uppercase tracking-[0.1em] text-navy-800/60">Important Notice</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">
              Blossom Books is an independent educational publisher. Our preparation materials are
              independently developed for educational and practice purposes, and are not affiliated with,
              endorsed by, or officially sponsored by the organizations that administer the referenced
              examinations, unless explicitly stated otherwise.
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">
              Blossom Books는 독립 교육 출판사이며, 모든 교재는 학습·연습을 목적으로 독립적으로 제작됩니다.
              언급된 시험을 주관하는 기관과 제휴·보증·공식 후원 관계가 없으며, 실제 기출문제나 유출문제를
              제공하지 않습니다.
            </p>
          </div>

          {/* Revision History + 오류 신고 */}
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="border border-navy-800/12 bg-ivory-100 p-6">
              <h2 className="font-display text-[18px] font-semibold text-navy-950">Revision History</h2>
              <ul className="mt-4 space-y-2.5 text-[13px] text-charcoal-600">
                <li className="flex gap-2">
                  <span className="font-label text-[10px] uppercase tracking-[0.1em] text-brass-500">2026 Edition</span>
                  <span>현행 버전</span>
                </li>
                <li className="border-t border-navy-800/8 pt-2.5">Reviewed · 문항 및 정답·해설 검토</li>
                <li className="border-t border-navy-800/8 pt-2.5">Checked · 오탈자·중복·레이아웃 최종 점검</li>
                <li className="border-t border-navy-800/8 pt-2.5">Format · 현행 학습 구성 기준 반영</li>
              </ul>
            </div>
            <ErrorReport code={productCode(product)} />
          </div>
        </div>

        {/* 우측 sticky 구매 박스 */}
        <div>
          <div className="lg:sticky lg:top-24">
            <PurchasePanel product={product} isDirect={direct} />
            {direct && (
              <p className="mt-3 text-center text-[12px] text-charcoal-600">
                {formatKRW(fromPriceKRW)}부터 · 40 / 60 / 100P 바로 구매
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 관련 교재 */}
      {related.length > 0 && (
        <div className="mt-20 border-t border-navy-800/12 pt-14">
          <h2 className="font-display text-[24px] font-semibold text-navy-950">관련 교재</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* 하단 고정 상담 (관련 교재 아래) */}
      <div className="mt-16 flex flex-col items-center gap-3 border-t border-navy-800/12 pt-10 text-center">
        <p className="text-[13.5px] text-charcoal-600">어떤 구성을 선택해야 할지 모르시나요?</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            <MessageCircle size={15} /> 공식 카카오톡 구매 상담
          </a>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
          >
            구매 전 상담 <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
