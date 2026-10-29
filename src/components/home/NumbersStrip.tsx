// 히어로 바로 아래 풀폭 스트립 — 숫자만 크게, 설명은 한 줄. 제목 없음.
const items = [
  { n: "200P", d: "장기 심화 최대 구성" },
  { n: "한국어 해설", d: "오답까지 한 줄로" },
  { n: "40·60·100·200P", d: "분량 선택" },
];

export default function NumbersStrip() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100">
      <div className="mx-auto grid max-w-7xl divide-y divide-navy-800/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
        {items.map((it) => (
          <div key={it.n} className="flex flex-col items-center gap-1.5 py-8 text-center sm:px-6">
            <p className="font-display text-[26px] font-semibold leading-none text-navy-950 sm:text-[28px]">{it.n}</p>
            <p className="text-[12.5px] text-charcoal-600">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
