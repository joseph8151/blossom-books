import {
  SearchCheck,
  BarChart3,
  ListChecks,
  FileCheck2,
  LineChart,
  Users,
  Building2,
  FileDown,
} from "lucide-react";

const features = [
  { icon: SearchCheck, label: "시험과 교육과정 분석" },
  { icon: BarChart3, label: "단계별 난이도 설계" },
  { icon: ListChecks, label: "다양한 문제 유형" },
  { icon: FileCheck2, label: "정답과 상세 해설" },
  { icon: LineChart, label: "그래프·표·도형 활용" },
  { icon: Users, label: "학생용과 교사용 자료 구분" },
  { icon: Building2, label: "학원·기관별 구성 상담" },
  { icon: FileDown, label: "디지털 PDF 제공" },
];

export default function QualityFeatures() {
  return (
    <section className="border-b border-navy-800/12 bg-navy-950 py-20 text-ivory-100 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-xl">
          <span className="eyebrow eyebrow--light">What&apos;s included</span>
          <h2 className="mt-4 font-display text-[32px] font-semibold sm:text-[38px]">
            문제를 푸는 시간뿐 아니라,
            <br />틀린 이유를 이해하는 시간까지 설계합니다.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-ivory-100/12 bg-ivory-100/12 sm:grid-cols-4">
          {features.map(({ icon: Icon, label }, i) => (
            <div key={label} className="flex flex-col gap-4 bg-navy-950 p-7">
              <span className="font-label text-[11px] text-brass-400">{String(i + 1).padStart(2, "0")}</span>
              <Icon size={20} strokeWidth={1.5} className="text-ivory-100/85" />
              <p className="text-[13.5px] leading-snug text-ivory-200/85">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
