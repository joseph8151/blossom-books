import {
  LineChart,
  Brain,
  Languages,
  BookOpen,
  Calculator,
  PenLine,
  FileText,
  MessageCircle,
  Users,
  GraduationCap,
  FileCheck2,
  Monitor,
  Globe2,
  ClipboardList,
} from "lucide-react";
import { assessmentTypes } from "../data";

const icons = [
  LineChart,
  Brain,
  Languages,
  BookOpen,
  Calculator,
  PenLine,
  FileText,
  MessageCircle,
  Users,
  GraduationCap,
  FileCheck2,
  Monitor,
  Globe2,
  ClipboardList,
];

export default function WhySchoolSpecific() {
  return (
    <section className="border-b border-navy-800/10 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8">
        <div className="mx-auto max-w-[640px] text-center">
          <span className="font-label text-[11px] uppercase tracking-[0.18em] text-[#5f6f52]">
            Why School-Specific
          </span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            왜 학교별로 준비해야 하나요?
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.9] text-charcoal-600">
            국제학교와 외국인학교는 학교마다 사용하는 평가가 다릅니다. 같은 Grade 5 지원이라도 학교가
            다르면 준비해야 할 시험과 난도가 달라질 수 있습니다.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-[880px] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
          {assessmentTypes.map((a, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={a}
                className="flex flex-col items-center gap-2.5 border border-navy-800/10 bg-ivory-100 px-3 py-6 text-center"
              >
                <Icon size={20} className="text-[#5f6f52]" strokeWidth={1.7} />
                <p className="text-[12.5px] font-medium leading-snug text-navy-900">{a}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
