import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight, MessageCircle, HelpCircle } from "lucide-react";
import { prepTracks } from "@/data/prepTracks";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import ProductCard from "@/components/books/ProductCard";
import PrepVolumePricing from "@/components/common/PrepVolumePricing";

export function generateStaticParams() {
  return prepTracks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = prepTracks.find((x) => x.slug === slug);
  if (!t) return {};
  return { title: `${t.name} — ${t.ko}`, description: t.intro.slice(0, 150) };
}

export default async function PrepLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = prepTracks.find((x) => x.slug === slug);
  if (!t) notFound();

  const related = products.filter(t.match).slice(0, 6);

  return (
    <div>
      {/* 히어로 */}
      <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Exam prep</p>
          <h1 className="mt-3 font-display text-[32px] font-semibold leading-tight text-navy-950 sm:text-[42px]">
            {t.name}
          </h1>
          <p className="mt-1 font-display text-[18px] text-burgundy-700">{t.ko}</p>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.9] text-charcoal-600">{t.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {t.booksTrack && (
              <Link href={`/books?track=${t.booksTrack}`} className="lift-sm inline-flex items-center gap-2 bg-navy-900 px-6 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-colors hover:bg-navy-800">
                교재 보기 <ArrowRight size={16} />
              </Link>
            )}
            <a href={siteConfig.kakaoChannelUrl} target="_blank" rel="noreferrer" className="lift-sm inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3.5 text-[14px] font-medium text-navy-900 transition-colors hover:border-navy-800/50">
              <MessageCircle size={16} /> 카카오톡 문의
            </a>
          </div>
        </div>
      </section>

      {/* 어떤 학생에게 + 평가 영역 */}
      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-[22px] font-semibold text-navy-950">이런 학생에게 필요합니다</h2>
              <ul className="mt-5 space-y-2.5">
                {t.forWhom.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-charcoal-900">
                    <Check size={16} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} /> {w}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-[22px] font-semibold text-navy-950">평가하는 영역</h2>
              <div className="mt-5 divide-y divide-navy-800/10 border-y border-navy-800/10">
                {t.areas.map((a, i) => (
                  <div key={a.area} className="py-4">
                    <p className="flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.1em] text-navy-900">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: ["#7d8a6a", "#ad8a4e", "#b06a3c"][i % 3] }}
                      />
                      {a.area}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-charcoal-600">{a.items.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 border-l-2 border-brass-500 pl-5">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-navy-800/70">어떻게 준비시키나요</p>
            <p className="mt-2 max-w-2xl text-[14px] leading-[1.9] text-charcoal-600">{t.howWePrepare}</p>
          </div>
        </div>
      </section>

      {/* 준비 순서 */}
      {t.steps.length > 0 && (
        <section className="border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <span className="eyebrow">Where to start</span>
              <h2 className="mt-4 font-display text-[24px] font-semibold text-navy-950 sm:text-[28px]">준비 순서</h2>
              <p className="mt-2 text-[14px] text-charcoal-600">{t.name}를 처음 시작한다면 이 순서를 참고하세요.</p>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
              {t.steps.map((s, i) => (
                <div key={s} className="border-t border-navy-800/20 pt-5">
                  <span className="font-label text-[12px] tracking-[0.1em] text-brass-500">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-charcoal-600">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 관련 교재 */}
      {related.length > 0 && (
        <section className="border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-display text-[24px] font-semibold text-navy-950">{t.name} 관련 교재</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* 가격 */}
      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-display text-[24px] font-semibold text-navy-950">분량과 가격</h2>
          <p className="mt-2 text-[14px] text-charcoal-600">필요한 만큼 선택하세요. 결제는 공식 카카오톡을 통해 진행됩니다.</p>
          <div className="mt-8"><PrepVolumePricing /></div>
        </div>
      </section>

      {/* FAQ */}
      {t.faq.length > 0 && (
        <section className="border-b border-navy-800/12 bg-ivory-200/50 py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <h2 className="font-display text-[24px] font-semibold text-navy-950">자주 묻는 질문</h2>
            <div className="mt-6 space-y-3">
              {t.faq.map((f) => (
                <div key={f.q} className="border border-navy-800/12 bg-ivory-100 p-5 shadow-card">
                  <p className="flex items-start gap-2 text-[14.5px] font-medium text-navy-950">
                    <HelpCircle size={16} className="mt-0.5 shrink-0 text-brass-500" /> {f.q}
                  </p>
                  <p className="mt-1.5 pl-6 text-[13.5px] leading-relaxed text-charcoal-600">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy-950 py-16 text-ivory-100 lg:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center lg:px-8">
          <h2 className="font-display text-[26px] font-semibold sm:text-[30px]">{t.name}를 준비하고 계신가요?</h2>
          <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-ivory-200/80">
            학생의 학년과 현재 수준을 알려주시면 적합한 교재와 구성을 안내해 드립니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/find" className="inline-flex items-center gap-2 bg-brass-500 px-6 py-3.5 text-[14px] font-medium text-navy-950 transition-colors hover:bg-brass-400">
              교재 추천받기 <ArrowRight size={16} />
            </Link>
            <a href={siteConfig.kakaoChannelUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-ivory-100/30 px-6 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:border-ivory-100/60">
              <MessageCircle size={16} /> 카카오톡으로 구매
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
