const rows = [
  {
    name: "ADVANCED PRACTICE",
    desc: "같은 시험·Level에서 문제 난이도를 높이는 추가 교재",
    exams: "MAP · CAT4 · ISEE · SSAT · UKiset · ISEB · NGRT",
  },
  {
    name: "INTENSIVE",
    desc: "특정 영역의 문제량과 반복 훈련을 강화하는 추가 교재",
    exams: "OOPT · TOEFL Junior",
  },
  {
    name: "EXTENSION PRACTICE",
    desc: "동일 Test Level 안에서 추가 응용·심화 문제를 연습하는 구성",
    exams: "PTE · PTM · PTS (GL Progress Test Series)",
  },
];

export default function StageExplainerSection() {
  return (
    <section className="border-b border-ivory-300 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[900px] px-5 sm:px-8">
        <h2 className="text-center font-display text-[22px] font-semibold text-navy-950 sm:text-[25px]">
          STANDARD / ADVANCED / INTENSIVE / EXTENSION은 무엇이 다른가요?
        </h2>
        <p className="mx-auto mt-3 max-w-[620px] text-center text-[13.5px] leading-relaxed text-charcoal-600">
          모든 STANDARD는 해당 시험·Level의 전체 유형을 정상적으로 준비하는 완전한 기본 구성입니다. 그 위에
          시험 성격에 맞는 심화·집중 옵션을 선택할 수 있으며, 이 이름들은 Blossom Books의 구성 명칭이지
          시험 기관의 공식 레벨이 아닙니다.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {rows.map((r) => (
            <div key={r.name} className="border border-ivory-300 bg-ivory-100 p-5">
              <p className="font-label text-[11px] uppercase tracking-[0.12em] text-brass-500">{r.name}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-charcoal-700">{r.desc}</p>
              <p className="mt-3 border-t border-ivory-300 pt-3 text-[11.5px] leading-relaxed text-charcoal-600/70">
                {r.exams}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
