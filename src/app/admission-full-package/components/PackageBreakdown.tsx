import { packageCategories } from "../data";

export default function PackageBreakdown() {
  return (
    <section className="border-b border-navy-800/10 bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8">
        <div className="mx-auto max-w-[640px] text-center">
          <span className="font-label text-[11px] uppercase tracking-[0.18em] text-[#5f6f52]">Structure</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            Admission Full Package 구성
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packageCategories.map((c) => (
            <div key={c.title} className="border border-navy-800/10 bg-white p-6">
              <span className="font-display text-[26px] font-semibold leading-none text-[#5f6f52]/35">
                {c.n}
              </span>
              <p className="mt-3 font-display text-[18px] font-semibold text-navy-950">{c.title}</p>
              <ul className="mt-4 space-y-1.5 text-[12.5px] leading-relaxed text-charcoal-600">
                {c.items.map((item) => (
                  <li key={item} className="flex gap-1.5">
                    <span className="text-[#5f6f52]">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
