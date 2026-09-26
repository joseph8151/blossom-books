import Link from "next/link";
import { BookOpen, CheckCircle2, FileText, Layers, FileDown, Eye } from "lucide-react";

const items = [
  { icon: BookOpen, label: "Student Workbook" },
  { icon: CheckCircle2, label: "Answer Key" },
  { icon: FileText, label: "Detailed Explanation" },
  { icon: Layers, label: "Level-based Difficulty" },
  { icon: FileDown, label: "Digital PDF" },
  { icon: Eye, label: "Sample Before Purchase" },
];

export default function IncludedSection() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-100 py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
            Every Blossom Workbook Includes
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
            가격은 단순한 PDF 페이지 수가 아니라 학생이 실제로 학습할 수 있도록 구성된 전체 콘텐츠를
            기준으로 합니다.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[820px] grid-cols-2 gap-x-6 gap-y-8 sm:mt-12 sm:grid-cols-3">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <Icon size={20} className="text-navy-800/50" strokeWidth={1.6} />
              <p className="mt-3 text-[13px] font-medium text-navy-950">{label}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[620px] text-center text-[12.5px] leading-relaxed text-charcoal-600/70">
          Blossom Books 측 오류가 확인되는 경우 정책 기준에 따라 수정을 지원합니다. 자세한 구매·환불·수정
          기준은{" "}
          <Link href="/policy" className="underline decoration-navy-900/30 underline-offset-4 hover:decoration-navy-900">
            구매·환불·수정 정책
          </Link>
          에서 확인하실 수 있습니다.
        </p>
      </div>
    </section>
  );
}
