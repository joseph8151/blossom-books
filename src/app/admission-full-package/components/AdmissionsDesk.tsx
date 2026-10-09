import { FileText } from "lucide-react";
import { admissionsDesk } from "../data";

// "Admissions Desk" — Blossom Admissions의 시그니처 섹션. 서류 3장 비유로
// "학교×학생 기준으로 설계한다"는 메시지를 담백하게 전달합니다.
export default function AdmissionsDesk() {
  return (
    <section className="border-b border-navy-800/10 bg-navy-950 py-20 text-center text-ivory-100 sm:py-28">
      <div className="mx-auto max-w-[900px] px-5 sm:px-8">
        <span className="font-label text-[11px] uppercase tracking-[0.18em] text-[#9db38f]">Admissions Desk</span>
        <h2 className="mt-4 font-display text-[26px] font-semibold text-ivory-100 sm:text-[30px]">
          Prepared for Your School
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {admissionsDesk.cards.map((c) => (
            <div key={c.title} className="border border-ivory-100/15 bg-ivory-100/[0.04] p-7 text-left">
              <FileText size={18} className="text-[#9db38f]" strokeWidth={1.7} />
              <p className="mt-4 font-display text-[16px] font-semibold text-ivory-100">{c.title}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ivory-200/70">{c.desc}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[560px] font-display text-[15px] italic leading-relaxed text-ivory-200/80">
          &ldquo;{admissionsDesk.quote}&rdquo;
        </p>
      </div>
    </section>
  );
}
