import {
  Sparkles,
  BookOpen,
  FileText,
  ClipboardCheck,
  Megaphone,
  Rocket,
  GraduationCap,
  Settings2,
  Library,
  TrendingUp,
} from "lucide-react";
import { ownerSupportItems } from "@/data/john";

const icons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Brand: Sparkles,
  Curriculum: BookOpen,
  "Teaching Resources": FileText,
  "Student Assessment": ClipboardCheck,
  Marketing: Megaphone,
  "Opening Support": Rocket,
  "Owner Training": GraduationCap,
  "Operations Guide": Settings2,
  "Learning Materials": Library,
  "Business Growth": TrendingUp,
};

export default function OwnerSupport() {
  return (
    <section id="owner-support" className="border-b border-navy-900/12 bg-white py-20 lg:py-28 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <span className="eyebrow eyebrow--center">Owner Support</span>
          <h2 className="mt-4 text-balance font-display text-[30px] font-extrabold leading-[1.2] text-navy-950 sm:text-[36px]">
            You&rsquo;re in Business for Yourself.
            <br />
            <span className="text-coral-500">Not by Yourself.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ownerSupportItems.map((item) => {
            const Icon = icons[item.title];
            return (
              <div key={item.title} className="card-premium p-6">
                <span className="num-badge h-9 w-9">
                  <Icon size={15} strokeWidth={2.2} />
                </span>
                <h3 className="mt-4 font-display text-[15.5px] font-extrabold text-navy-950">{item.title}</h3>
                <p className="text-[11.5px] text-charcoal-600/70">{item.titleKo}</p>
                <p className="mt-3 text-[12.5px] leading-relaxed text-charcoal-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
