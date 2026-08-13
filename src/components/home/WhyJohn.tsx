import { BookOpen, ClipboardCheck, FileText, Sparkles, GraduationCap, Megaphone, Settings2, TrendingUp } from "lucide-react";
import { whyJohnItems } from "@/data/john";

const icons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Curriculum: BookOpen,
  Assessment: ClipboardCheck,
  "Teaching Resources": FileText,
  Branding: Sparkles,
  "Owner Training": GraduationCap,
  Marketing: Megaphone,
  "Operating System": Settings2,
  "Business Growth": TrendingUp,
};

export default function WhyJohn() {
  return (
    <section id="why-john" className="border-b border-navy-900/12 bg-white py-20 lg:py-28 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Why JOHN</span>
          <h2 className="mt-4 text-balance font-display text-[30px] font-extrabold leading-[1.2] text-navy-950 sm:text-[36px]">
            More Than a Name <span className="text-coral-500">on the Door.</span>
          </h2>
          <p className="mt-5 text-[14.5px] leading-relaxed text-charcoal-600">
            JOHN은 이름만 빌려주는 프랜차이즈가 아닙니다. 교육 콘텐츠, 커리큘럼, 학생 진단,
            수업 운영, 학습 관리, 마케팅, 브랜드 운영 시스템까지 제공하여 원장이 자신의
            교육사업을 보다 전문적으로 운영할 수 있도록 돕습니다.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyJohnItems.map((item) => {
            const Icon = icons[item.title];
            return (
              <div key={item.title} className="card-premium p-6">
                <span className="num-badge h-10 w-10">
                  <Icon size={17} strokeWidth={2.2} />
                </span>
                <h3 className="mt-4 font-display text-[17px] font-extrabold text-navy-950">
                  {item.title}
                  <span className="ml-2 text-[12.5px] font-normal text-charcoal-600/60">{item.titleKo}</span>
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-charcoal-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
