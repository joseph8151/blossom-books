import { Check, BookOpen, Users, GraduationCap } from "lucide-react";
import { Product } from "@/lib/types";
import { explanationLanguage, studyModes, StudyMode } from "@/lib/productMeta";

// 해설 언어를 Value로, 권장 학습 방식을 학부모 판단 근거로 제시합니다. (브리프 #11·#16)
const modeIcon: Record<StudyMode, typeof BookOpen> = {
  "Self Study": BookOpen,
  "Parent Guided": Users,
  "Tutor Guided": GraduationCap,
};

export default function StudyGuidance({ product }: { product: Product }) {
  const lang = explanationLanguage(product);
  const modes = studyModes(product);

  return (
    <div className="mt-6 space-y-6">
      {/* 해설 언어 = Value */}
      <div className="border border-brass-500/40 bg-brass-500/[0.05] p-5 lg:p-6">
        <p className="font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">
          {lang.labelEn} Edition · {lang.labelKo} 포함
        </p>
        <p className="mt-1.5 text-[13.5px] font-medium text-navy-950">
          문제를 푸는 것에서 끝나지 않습니다.
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal-600">{lang.note}</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {["정답 확인", "핵심 풀이", "문제 접근 방법", "주요 개념 이해", "자기주도 복습"].map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5 text-[12.5px] text-charcoal-900">
              <Check size={12} className="text-brass-500" strokeWidth={2.4} />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* 권장 학습 방식 */}
      <div>
        <p className="font-label text-[11px] uppercase tracking-[0.12em] text-navy-800/60">Recommended study mode</p>
        <p className="mt-1 text-[13px] text-charcoal-600">
          아이가 혼자 풀 수 있는지, 부모님이 도와주면 좋은지 미리 확인하세요.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {modes.map(({ mode, ko, recommended, note }) => {
            const Icon = modeIcon[mode];
            return (
              <div
                key={mode}
                className={`border p-4 ${
                  recommended ? "border-navy-900/50 bg-ivory-100" : "border-navy-800/12 bg-ivory-200/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon size={17} className={recommended ? "text-navy-900" : "text-navy-800/40"} strokeWidth={1.8} />
                  {recommended && (
                    <span className="font-label text-[8.5px] uppercase tracking-[0.1em] text-brass-500">권장</span>
                  )}
                </div>
                <p className={`mt-2.5 font-display text-[15px] font-semibold ${recommended ? "text-navy-950" : "text-navy-800/55"}`}>
                  {mode}
                </p>
                <p className={`text-[11.5px] ${recommended ? "text-charcoal-600" : "text-charcoal-600/60"}`}>{ko}</p>
                <p className={`mt-2 text-[11.5px] leading-relaxed ${recommended ? "text-charcoal-600" : "text-charcoal-600/55"}`}>
                  {note}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
