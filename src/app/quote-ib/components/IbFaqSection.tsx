import { IB_FAQ } from "../ibContent";

export default function IbFaqSection() {
  return (
    <section className="mt-16 border-t border-ivory-300 pt-12">
      <h2 className="text-center font-display text-[22px] font-semibold text-navy-950 sm:text-[26px]">자주 묻는 질문</h2>
      <div className="mx-auto mt-8 max-w-[640px] divide-y divide-ivory-300 border-t border-ivory-300">
        {IB_FAQ.map((f) => (
          <div key={f.q} className="py-5">
            <p className="text-[14px] font-medium text-navy-950">Q. {f.q}</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-charcoal-600">A. {f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
