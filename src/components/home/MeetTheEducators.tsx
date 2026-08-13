import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, ClipboardCheck } from "lucide-react";

// 실명 공개 대신 역할 기반 카드 — "명문대 출신" 문구를 광고가 아닌 브랜드 근거로 전환.
const educators = [
  {
    icon: BookOpen,
    role: "Curriculum Editor",
    field: "U.S. Education",
    points: [
      "미국 대학 학업 이수",
      "미국 교육과정 및 국제학교 학생 지도",
      "Reading · Writing · Standardized Test Prep",
      "다년간 학생 티칭 경험",
    ],
  },
  {
    icon: Calculator,
    role: "Math Content Editor",
    field: "U.S. College Graduate",
    points: [
      "Algebra · Geometry · SAT Math",
      "사고력·개념 중심 문항 설계",
      "G6–G12 학생 지도 경험",
      "학년별 난이도 밸런스 조정",
    ],
  },
  {
    icon: ClipboardCheck,
    role: "Assessment & Review Editor",
    field: "Level Test / Placement",
    points: [
      "레벨테스트·진단 문항 설계",
      "정답·해설 정확성 검수",
      "난이도 스펙트럼 검토",
      "최종 편집 검수",
    ],
  },
];

export default function MeetTheEducators() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Meet the educators</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            교재를 만드는 사람들
          </h2>
          <p className="mt-4 text-[14.5px] leading-[1.85] text-charcoal-600">
            블러섬북스의 제작진은 단순한 콘텐츠 작성자가 아닙니다. 미국에서 실제 학업을 이수하고, 다양한
            수준의 학생을 직접 지도해 온 선생님들이 교재 제작에 참여합니다.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border border-navy-800/12 bg-navy-800/10 lg:grid-cols-3">
          {educators.map(({ icon: Icon, role, field, points }) => (
            <div key={role} className="bg-ivory-100 p-7">
              <div className="flex h-11 w-11 items-center justify-center border border-brass-500/40 bg-brass-500/[0.07] text-brass-500">
                <Icon size={20} strokeWidth={1.7} />
              </div>
              <p className="mt-5 font-display text-[18px] font-semibold text-navy-950">{role}</p>
              <p className="mt-0.5 font-label text-[10px] uppercase tracking-[0.12em] text-brass-500">{field}</p>
              <ul className="mt-4 space-y-2">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[13px] leading-snug text-charcoal-600">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brass-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 border-t border-navy-800/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[18px] font-medium italic text-navy-950 sm:text-[21px]">
            Our workbooks are built by educators who teach.
          </p>
          <Link
            href="/our-approach"
            className="group inline-flex shrink-0 items-center gap-2 border border-navy-800/25 px-5 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
          >
            제작 방식 자세히 보기
            <ArrowRight size={15} className="text-brass-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
