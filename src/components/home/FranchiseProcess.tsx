import { franchiseProcessSteps } from "@/data/john";

export default function FranchiseProcess() {
  return (
    <section id="franchise-process" className="border-b border-navy-900/12 bg-ivory-100 py-20 lg:py-28 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <span className="eyebrow eyebrow--center">Franchise Process</span>
          <h2 className="mt-4 font-display text-[30px] font-extrabold text-navy-950 sm:text-[36px]">
            From Idea to <span className="text-coral-500">Opening.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {franchiseProcessSteps.map((step) => (
            <div key={step.step} className="card-premium p-6">
              <span className="num-badge h-9 w-9 text-[13px]">{step.step}</span>
              <h3 className="mt-4 font-display text-[16px] font-bold text-navy-950">{step.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-charcoal-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
