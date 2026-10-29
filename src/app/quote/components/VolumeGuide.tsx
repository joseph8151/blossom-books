const guides = [
  { label: "40P", body: "시험까지 시간이 짧거나, 특정 취약 영역만 집중적으로 연습하고 싶은 경우" },
  { label: "60P", body: "한 과목을 기본부터 실전까지 균형 있게 준비하고 싶은 경우" },
  { label: "100P", body: "여러 유형을 충분히 반복하거나 시험 준비 기간이 비교적 긴 경우" },
  { label: "200P", body: "8–12주 이상 장기적으로 준비하거나 많은 실전 문제와 반복 학습이 필요한 경우" },
];

export default function VolumeGuide() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-100 py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <h2 className="text-center font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          어떤 분량이 맞을까요?
        </h2>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((g) => (
            <div key={g.label} className="border-t-2 border-navy-900/70 pt-4">
              <p className="font-display text-[18px] font-semibold text-navy-950">{g.label}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-charcoal-600">{g.body}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[620px] text-center text-[12.5px] leading-relaxed text-charcoal-600/70">
          페이지 수가 많다고 항상 좋은 것은 아닙니다. 학생의 현재 수준과 시험까지 남은 기간을 기준으로 선택하는
          것을 권장합니다.
        </p>
      </div>
    </section>
  );
}
