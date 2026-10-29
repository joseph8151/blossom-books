const rows = [
  {
    name: "STANDARD",
    desc: "시험 전체 주요 유형을 준비하는 완전한 기본 구성",
    exams: "모든 시험 공통",
  },
  {
    name: "ADVANCED PRACTICE",
    desc: "같은 시험·Level에서 문제 난이도를 높인 별도 심화 교재",
    exams: "MAP · CAT4 · ISEE · SSAT · UKiset · ISEB · NGRT",
  },
  {
    name: "INTENSIVE",
    desc: "특정 시험을 더 많은 실전 문제와 집중 훈련으로 준비하는 구성",
    exams: "OOPT · TOEFL Junior",
  },
  {
    name: "EXTENSION PRACTICE",
    desc: "동일 Test Level 안에서 추가 응용·심화 문제를 연습하는 구성",
    exams: "PTE · PTM · PTS (GL Progress Test Series)",
  },
  {
    name: "SPECIAL",
    desc: "학생 수준과 요청사항에 맞춘 맞춤 제작 및 추가 서비스(모의고사·목차 재배열·상담 등)",
    exams: "MAP · CAT4 · ISEE · OOPT 등",
  },
];

export default function StageExplainerSection() {
  return (
    <section className="border-b border-ivory-300 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[980px] px-5 sm:px-8">
        <h2 className="text-center font-display text-[22px] font-semibold text-navy-950 sm:text-[25px]">
          Standard · Advanced · Intensive는 무엇이 다른가요?
        </h2>
        <p className="mx-auto mt-3 max-w-[680px] text-center text-[13.5px] leading-relaxed text-charcoal-600">
          Standard는 저가형·하위 버전이 아니라 완전한 기본 구성입니다. Advanced는 공식 시험 Level이 아니고,
          Intensive도 공식 시험 단계가 아닙니다. 모두 Blossom Books의 교재 구성 명칭입니다. Special은
          Advanced·Intensive와 완전히 다른 개념으로, 난이도가 아니라 학생별 학습 설계·부가 서비스를
          의미합니다 — 예를 들어 MAP Advanced Practice에 Special을 더하거나, ISEE Standard에 Special을
          더할 수도 있습니다.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {rows.map((r) => (
            <div key={r.name} className="border border-ivory-300 bg-ivory-100 p-5">
              <p className="font-label text-[11px] uppercase tracking-[0.12em] text-brass-500">{r.name}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-700">{r.desc}</p>
              <p className="mt-3 border-t border-ivory-300 pt-3 text-[11px] leading-relaxed text-charcoal-600/70">
                {r.exams}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
