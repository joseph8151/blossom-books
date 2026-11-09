import { ENGLISH_GRADE_SAMPLES, algebra1Bank, apCalcBank } from "@/data/sampleBank";
import { SampleCard } from "./ApSampleModal";

// 아래 SubjectChips 설정기(Grade-Based/Course-Based/AP Courses)는 학년·과목·
// 코스를 고를 때마다 "샘플 보기" 버튼으로 해당 구성의 실제 샘플을 보여주지만,
// 클릭 전에는 보이지 않습니다. 설정 전에도 품질을 바로 확인할 수 있도록,
// 세 모드(Grade-Based·Course-Based·AP)를 각각 대표하는 샘플 1문항씩을
// 페이지 상단에 고정으로 보여줍니다.
const PREVIEW_ITEMS = [
  { label: "Grade-Based · G6 English", item: ENGLISH_GRADE_SAMPLES.G6[0] },
  { label: "Course-Based · Algebra 1", item: algebra1Bank[0] },
  { label: "AP Courses · AP Calculus AB", item: apCalcBank[0] },
];

export default function UsSamplePreview() {
  return (
    <section className="mt-9">
      <span className="eyebrow">Sample Preview</span>
      <h2 className="mt-3 font-display text-[22px] font-semibold text-navy-950">실제 샘플 미리보기</h2>
      <p className="mt-2 max-w-[640px] text-[13px] leading-relaxed text-charcoal-600">
        Grade-Based·Course-Based·AP Courses 세 가지 구성을 각각 대표하는 샘플입니다. 아래 설정기에서 원하는
        학년·과목·코스를 고르면 해당 구성의 샘플을 바로 확인하실 수 있습니다.
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {PREVIEW_ITEMS.map(({ label, item }) => (
          <div key={label}>
            <p className="mb-2 font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">{label}</p>
            <SampleCard item={item} index={0} />
          </div>
        ))}
      </div>
    </section>
  );
}
