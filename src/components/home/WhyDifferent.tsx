const points = [
  { title: "시험 유형 그대로", body: "출제 영역·문항 형식을 시험별로 맞춤" },
  { title: "학년·레벨로 묶음", body: "같은 시험도 학생 수준이 다르면 구성이 다름" },
  { title: "분량을 고름", body: "단기 40P부터 심화 200P까지" },
];

export default function WhyDifferent() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/40 py-14 lg:py-20">
      <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
        <p className="font-display text-[19px] font-medium leading-snug text-navy-950 sm:text-[22px]">
          수업에서 막힌 문항을 교재 문항으로 옮깁니다. 해설은 한국어.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="border border-navy-800/12 bg-ivory-100 p-6 text-left shadow-card">
              <p className="font-display text-[16px] font-semibold text-navy-950">{p.title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-charcoal-600">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
