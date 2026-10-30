import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "후기 모음 — 실제 고객님들의 이야기",
  description:
    "블러섬북스로 레벨테스트·국제학교 입학시험·공인영어시험을 준비하신 고객님들이 카카오톡으로 직접 남겨주신 실제 후기 모음입니다.",
  openGraph: {
    title: "블러섬북스 후기 모음",
    description:
      "레벨테스트·국제학교 입학시험·공인영어시험을 준비하신 고객님들이 카카오톡으로 직접 남겨주신 실제 후기입니다.",
    url: "https://blossombooks.org/reviews/",
    images: ["https://blossombooks.org/reviews/opengraph-image"],
  },
};

const images = [
  { src: "/images/reviews/01-oet.jpg", alt: "OET Nursing 문제집 후기" },
  { src: "/images/reviews/02-academy-pass.jpg", alt: "학원 레벨테스트 합격 후기" },
  { src: "/images/reviews/03-formative-test.jpg", alt: "어학원 형성평가 후기" },
  { src: "/images/reviews/04-passed.jpg", alt: "레벨테스트 합격 후기" },
  { src: "/images/reviews/05-leveltest-pass.jpg", alt: "레벨테스트 합격 후기" },
  { src: "/images/reviews/06-admission-pass.jpg", alt: "국제학교 입학 합격 후기" },
  { src: "/images/reviews/07-multi-academy.jpg", alt: "영어학원 입학시험 합격 후기" },
  { src: "/images/reviews/08-four-schools.jpg", alt: "국제학교 입학시험 합격 후기" },
  { src: "/images/reviews/09-writing-topics.jpg", alt: "라이팅 자료 후기" },
  { src: "/images/reviews/10-korean-literacy.jpg", alt: "국어 문해력 레벨테스트 합격 후기" },
  { src: "/images/reviews/11-top-class.jpg", alt: "학원 레벨테스트 반배치 후기" },
  { src: "/images/reviews/12-exam-well.jpg", alt: "시험 합격 후기" },
  { src: "/images/reviews/13-academy-pass2.jpg", alt: "학원 레벨테스트 합격 후기" },
];

export default function ReviewsPage() {
  return (
    <div>
      {/* 히어로 — 다른 에디토리얼 섹션과 동일한 톤 */}
      <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
          <span className="eyebrow eyebrow--center">Real Reviews</span>
          <h1 className="mt-4 font-display text-[32px] font-semibold leading-tight text-navy-950 sm:text-[42px]">
            받은 그대로, <span className="text-brass-500">가감 없이</span>
          </h1>
          <span className="gold-rule mx-auto mt-6 block w-16" />
          <p className="mx-auto mt-6 max-w-xl text-[14.5px] leading-[1.9] text-charcoal-600">
            블러섬북스로 레벨테스트·국제학교 입학시험·공인영어시험을 준비하신 고객님들이 카카오톡으로
            직접 남겨주신 실제 후기입니다. 과장이나 각색 없이, 받은 그대로 모았습니다.
          </p>
        </div>
      </section>

      <section className="bg-ivory-100 py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {images.map((img, i) => (
              <figure
                key={img.src}
                className="lift group relative border border-navy-800/10 bg-white shadow-card transition-colors hover:border-brass-500/40"
              >
                <span className="absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-brass-500 via-brass-400 to-brass-500/30" />
                <span className="absolute left-2.5 top-2.5 z-10 font-label text-[9.5px] tracking-[0.14em] text-brass-500/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative aspect-[1080/2255] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <figcaption className="border-t border-navy-800/10 px-3 py-2.5 text-center font-label text-[10px] uppercase tracking-[0.08em] text-charcoal-600/70">
                  {img.alt}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-16 border-t border-ivory-300 pt-10 text-center">
            <span className="eyebrow eyebrow--center">Get Started</span>
            <p className="mt-4 text-[15px] text-charcoal-700">우리 아이·나에게 맞는 구성이 궁금하신가요?</p>
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
            >
              <MessageCircle size={16} />
              카카오톡으로 상담하기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
