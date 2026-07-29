import FAQSection from "@/components/home/FAQSection";

export const metadata = { title: "자주 묻는 질문" };

export default function FAQPage() {
  return (
    <div>
      <section className="border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Support</p>
          <h1 className="mt-3 font-display text-[34px] font-semibold text-navy-950 sm:text-[40px]">
            자주 묻는 질문
          </h1>
        </div>
      </section>
      <FAQSection />
    </div>
  );
}
