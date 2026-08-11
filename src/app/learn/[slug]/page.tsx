import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { learnArticles } from "@/data/learnArticles";
import { siteConfig } from "@/data/site";

export function generateStaticParams() {
  return learnArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = learnArticles.find((x) => x.slug === slug);
  if (!a) return {};
  return { title: a.title, description: a.subtitle };
}

export default async function LearnArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = learnArticles.find((x) => x.slug === slug);
  if (!a) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
      <Link href="/learn" className="inline-flex items-center gap-1.5 text-[12.5px] text-charcoal-600 hover:text-navy-900">
        <ArrowLeft size={14} /> 학부모 가이드
      </Link>

      <p className="mt-6 font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">Blossom Learn · {a.readMin}분</p>
      <h1 className="mt-2 font-display text-[30px] font-semibold leading-tight text-navy-950 sm:text-[36px]">{a.title}</h1>
      <p className="mt-2 font-display text-[17px] text-burgundy-700">{a.subtitle}</p>

      <article className="mt-10 space-y-9">
        {a.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-[20px] font-semibold text-navy-950">{s.heading}</h2>
            <div className="mt-3 space-y-3">
              {s.paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.9] text-charcoal-600">{p}</p>
              ))}
            </div>
          </section>
        ))}
      </article>

      {/* CTA */}
      <div className="mt-12 border-t border-navy-800/12 pt-8">
        <div className="flex flex-wrap items-center gap-3">
          <Link href={a.relatedTrack ? `/books?track=${a.relatedTrack}` : "/books"} className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800">
            관련 교재 보기 <ArrowRight size={15} />
          </Link>
          <Link href="/find" className="inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50">
            교재 추천받기
          </Link>
          <a href={siteConfig.kakaoChannelUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[13px] text-charcoal-600 hover:text-navy-900">
            <MessageCircle size={15} /> 카카오톡 문의
          </a>
        </div>
      </div>
    </div>
  );
}
