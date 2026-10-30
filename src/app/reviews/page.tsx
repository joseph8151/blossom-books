import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "후기 모음 — 실제 고객님들의 이야기",
  description:
    "블러섬북스로 레벨테스트·국제학교 입학시험·공인영어시험을 준비하신 고객님들이 카카오톡으로 직접 남겨주신 실제 후기 모음입니다.",
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
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
      <span className="eyebrow">Real Reviews</span>
      <h1 className="mt-3 font-display text-[32px] font-semibold text-navy-950 sm:text-[40px]">
        후기 모음
      </h1>
      <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-charcoal-600">
        블러섬북스로 레벨테스트·국제학교 입학시험·공인영어시험을 준비하신 고객님들이 카카오톡으로 직접
        남겨주신 실제 후기입니다. 과장이나 각색 없이, 받은 그대로 모았습니다.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <div
            key={img.src}
            className="lift-sm relative aspect-[1080/2340] overflow-hidden border border-ivory-300 bg-ivory-200/40 shadow-card"
          >
            <Image src={img.src} alt={img.alt} fill className="object-contain" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-ivory-300 pt-10 text-center">
        <p className="text-[14px] text-charcoal-600">우리 아이·나에게 맞는 구성이 궁금하신가요?</p>
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 상담하기
        </a>
      </div>
    </div>
  );
}
