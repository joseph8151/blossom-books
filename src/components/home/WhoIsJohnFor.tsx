import { whoIsJohnFor } from "@/data/john";

export default function WhoIsJohnFor() {
  return (
    <section className="border-b border-navy-900/12 bg-ivory-200 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="text-center">
          <span className="eyebrow eyebrow--center">Who Is JOHN For</span>
          <h2 className="mt-4 font-display text-[28px] font-extrabold text-navy-950 sm:text-[34px]">
            JOHN Could Be <span className="text-coral-500">Your Next Step.</span>
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {whoIsJohnFor.map((label) => (
            <span
              key={label}
              className="rounded-full bg-white px-5 py-3 text-[13.5px] font-medium text-navy-900 shadow-card"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
