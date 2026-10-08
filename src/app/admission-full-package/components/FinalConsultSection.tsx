import ConsultationForm from "./ConsultationForm";

export default function FinalConsultSection() {
  return (
    <section id="consult" className="scroll-mt-16 bg-navy-950 py-20 text-center sm:py-28">
      <div className="mx-auto max-w-[680px] px-5 sm:px-8">
        <h2 className="font-display text-[26px] font-semibold text-ivory-100 sm:text-[30px]">
          지원 학교를 알려주세요.
        </h2>
        <p className="mt-4 text-[14.5px] leading-[1.9] text-ivory-200/80">
          학교명과 학년만 알려주셔도
          <br />
          어떤 영역을 준비해야 하는지 먼저 확인해드립니다.
        </p>
        <ConsultationForm />
      </div>
    </section>
  );
}
