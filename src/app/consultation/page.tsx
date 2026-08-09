import ConsultationCTA from "@/components/home/ConsultationCTA";

export const metadata = { title: "상담하기" };

export default function ConsultationPage() {
  return (
    <div>
      <section className="border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Consultation</p>
          <h1 className="mt-3 font-display text-[28px] font-semibold text-navy-950 sm:text-[33px]">
            상담하기
          </h1>
          <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
            학생 학년과 준비하는 시험을 알려주시면 현재 구매 가능한 교재부터 확인해드립니다.
          </p>
        </div>
      </section>
      <ConsultationCTA />
    </div>
  );
}
