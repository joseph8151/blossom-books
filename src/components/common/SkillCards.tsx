import { BookOpen, Type, PencilRuler, PenLine, LucideIcon } from "lucide-react";
import { coreSkills, SkillIcon } from "@/data/levelAssessment";

const icons: Record<SkillIcon, LucideIcon> = {
  reading: BookOpen,
  vocabulary: Type,
  grammar: PencilRuler,
  writing: PenLine,
};

export default function SkillCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {coreSkills.map((s) => {
        const Icon = icons[s.key];
        return (
          <div
            key={s.key}
            className="flex flex-col border border-navy-800/12 bg-ivory-100 p-6 shadow-card transition-colors hover:border-brass-500/45"
          >
            <div className="flex h-11 w-11 items-center justify-center border border-brass-500/30 bg-brass-500/[0.07] text-brass-500">
              <Icon size={20} strokeWidth={1.8} />
            </div>
            <p className="mt-4 font-display text-[19px] font-semibold text-navy-950">{s.name}</p>
            <p className="mt-3 flex-1 text-[13px] leading-relaxed text-charcoal-600">{s.body}</p>
            <p className="mt-4 border-t border-navy-800/10 pt-3 font-label text-[10px] uppercase tracking-[0.08em] text-navy-800/55">
              {s.tags}
            </p>
          </div>
        );
      })}
    </div>
  );
}
