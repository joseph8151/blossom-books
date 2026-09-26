import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { formatKRW, LEVEL_TEST_BUNDLES } from "../data";

const standardPoints = ["기본 유형", "핵심 문제", "시험 구조 적응", "기본 난이도 대비"];
const advancedPoints = ["심화 유형", "고난도 문제", "상위 레벨 대비", "추가 실전 연습"];

const recommendedFor = [
  "레벨테스트를 충분한 문제량으로 준비하고 싶은 경우",
  "상위반 또는 높은 레벨 배정을 목표로 하는 경우",
  "기본 문제뿐 아니라 심화 문제까지 연습하고 싶은 경우",
  "첫 시험 이후 다음 레벨테스트까지 이어서 준비하는 경우",
  "한 번의 문제집으로 끝내기보다 단계적으로 준비하고 싶은 경우",
];

const stepFlow = [
  {
    label: "STEP 01",
    title: "STANDARD",
    items: ["시험 유형 이해", "기본 난이도 적응", "핵심 유형 연습"],
  },
  {
    label: "STEP 02",
    title: "ADVANCED",
    items: ["고난도 유형", "변형 문제", "상위 레벨 대비"],
  },
  {
    label: "READY",
    title: "실전 대응력 강화",
    items: [],
  },
];

const comparisonRows: { label: string; standard: string; advanced: string }[] = [
  { label: "목적", standard: "시험 유형 적응", advanced: "심화 및 상위 레벨 대비" },
  { label: "난이도", standard: "기본 ~ 중간", advanced: "중간 ~ 고난도" },
  { label: "문제 유형", standard: "핵심 유형 · 기본 문제", advanced: "심화 유형 · 고난도 문제" },
  {
    label: "추천 학생",
    standard: "첫 준비 · 기본 대비가 필요한 학생",
    advanced: "충분한 연습이 필요하거나 상위반을 목표하는 학생, 재응시 준비생",
  },
  { label: "활용 시점", standard: "시험 준비 초반", advanced: "Standard 이후 또는 다음 레벨 준비 시" },
];

const purchaseOptions = [
  {
    n: "OPTION 1",
    title: "STANDARD만 준비",
    body: "시험 유형과 기본 난이도를 먼저 익히고 싶은 경우",
  },
  {
    n: "OPTION 2",
    title: "ADVANCED만 준비",
    body: "이미 기본 유형에 익숙하고 심화 문제로 바로 연습하고 싶은 경우",
  },
  {
    n: "OPTION 3",
    title: "STANDARD + ADVANCED",
    body: "기본부터 심화까지 두 단계로 준비하는 경우",
    highlight: true,
  },
];

const beforeChat = ["시험명", "현재 학습 수준", "지원 학원", "최근 사용 교재 또는 Reading Level"];

function KakaoLink({ label, className }: { label: string; className: string }) {
  return (
    <a href={siteConfig.kakaoChannelUrl} target="_blank" rel="noreferrer" className={className}>
      <MessageCircle size={15} />
      {label}
    </a>
  );
}

export default function LevelTestTwoStepPackage() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-200/40 py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        {/* 상단 — 섹션 소개 */}
        <div className="mx-auto max-w-[680px] text-center">
          <p className="font-label text-[11px] uppercase tracking-[0.2em] text-brass-500">
            Level Test 2-Step Package
          </p>
          <h2 className="mt-4 font-display text-[28px] font-semibold leading-tight text-navy-950 sm:text-[33px]">
            한 번의 시험보다, 다음 단계까지 준비한다면
          </h2>
          <p className="mt-4 text-[14.5px] leading-[1.9] text-charcoal-600">
            한 번의 레벨테스트만 준비하는 것이 아니라 기본 유형부터 심화 문제까지 충분히 연습하고 싶은 학생을
            위한 2단계 구성입니다.
          </p>
        </div>

        {/* STANDARD → ADVANCED 카드 */}
        <div className="mt-14 grid items-center gap-4 sm:mt-16 lg:grid-cols-[1fr_auto_1fr]">
          <div className="border border-ivory-300 bg-white p-8">
            <p className="font-label text-[11px] uppercase tracking-[0.16em] text-navy-800/60">Standard</p>
            <p className="mt-2 font-display text-[24px] font-semibold text-navy-950">기본을 다집니다</p>
            <ul className="mt-5 space-y-2 text-[13.5px] leading-relaxed text-charcoal-700">
              {standardPoints.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center py-2 text-navy-800/40">
            <span className="font-display text-[26px] leading-none lg:hidden">↓</span>
            <span className="hidden font-display text-[30px] leading-none lg:inline">→</span>
            <span className="sr-only">STANDARD에서 ADVANCED로 이어집니다</span>
          </div>

          <div className="border border-navy-950 bg-navy-950 p-8">
            <p className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">Advanced</p>
            <p className="mt-2 font-display text-[24px] font-semibold text-ivory-100">난이도를 끌어올립니다</p>
            <ul className="mt-5 space-y-2 text-[13.5px] leading-relaxed text-ivory-100/85">
              {advancedPoints.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 문제가 다르다는 점 강조 */}
        <div className="mx-auto mt-8 max-w-[760px] border-2 border-navy-900/70 bg-white p-6 text-center sm:p-7">
          <p className="font-display text-[16px] font-semibold text-navy-950">
            두 교재의 문제는 동일하지 않습니다.
          </p>
          <p className="mt-3 text-[13.5px] leading-[1.9] text-charcoal-600">
            Standard에서 기본 유형과 시험 구조를 익힌 뒤, Advanced에서 난이도를 높여 다시 훈련할 수 있도록
            서로 다른 문제로 구성합니다.
          </p>
        </div>

        {/* 추천 대상 */}
        <div className="mx-auto mt-14 max-w-[760px] sm:mt-16">
          <h3 className="text-center font-display text-[20px] font-semibold text-navy-950 sm:text-[22px]">
            이런 경우에 2단계 구성을 검토해보세요.
          </h3>
          <ul className="mt-6 grid gap-x-8 gap-y-3 text-[13.5px] leading-relaxed text-charcoal-700 sm:grid-cols-2">
            {recommendedFor.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brass-500">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* STEP 01 → STEP 02 → READY 흐름 */}
        <div className="mt-16 sm:mt-20">
          <h3 className="text-center font-display text-[20px] font-semibold text-navy-950 sm:text-[22px]">
            상품이 아니라, 준비 과정입니다.
          </h3>
          <div className="mx-auto mt-8 grid max-w-[980px] items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {stepFlow.map((step, i) => (
              <div key={step.label} className="contents">
                <div className="border-t-2 border-navy-900/70 bg-white p-6">
                  <p className="font-label text-[11px] tracking-[0.14em] text-brass-500">{step.label}</p>
                  <p className="mt-2 font-display text-[17px] font-semibold text-navy-950">{step.title}</p>
                  {step.items.length > 0 && (
                    <ul className="mt-3 space-y-1 text-[12.5px] leading-relaxed text-charcoal-600">
                      {step.items.map((item) => (
                        <li key={item}>· {item}</li>
                      ))}
                    </ul>
                  )}
                </div>
                {i < stepFlow.length - 1 && (
                  <div className="flex items-center justify-center text-navy-800/40">
                    <span className="font-display text-[22px] leading-none">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 비교표 */}
        <div className="mt-16 sm:mt-20">
          <h3 className="text-center font-display text-[20px] font-semibold text-navy-950 sm:text-[22px]">
            STANDARD와 ADVANCED, 무엇이 다른가요?
          </h3>
          <div className="mt-8 overflow-hidden border border-ivory-300">
            <div className="grid grid-cols-[1fr_1.4fr_1.4fr] bg-ivory-200/60 text-center">
              <p className="p-3 text-[11.5px] font-medium text-charcoal-600/70 sm:p-4"> </p>
              <p className="p-3 font-label text-[11px] uppercase tracking-[0.12em] text-navy-900 sm:p-4">
                Standard
              </p>
              <p className="p-3 font-label text-[11px] uppercase tracking-[0.12em] text-navy-900 sm:p-4">
                Advanced
              </p>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_1.4fr_1.4fr] ${i % 2 === 1 ? "bg-ivory-100" : "bg-white"}`}
              >
                <p className="border-t border-ivory-300 p-3 text-[12px] font-medium text-charcoal-600 sm:p-4">
                  {row.label}
                </p>
                <p className="border-t border-ivory-300 p-3 text-[12px] leading-relaxed text-charcoal-700 sm:p-4">
                  {row.standard}
                </p>
                <p className="border-t border-ivory-300 p-3 text-[12px] leading-relaxed text-charcoal-700 sm:p-4">
                  {row.advanced}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* STANDARD + ADVANCED Premium Card */}
        <div className="relative mx-auto mt-16 max-w-[860px] border-2 border-navy-900 bg-white p-8 shadow-card sm:mt-20 sm:p-10">
          <span className="inline-flex items-center rounded-sm bg-brass-500 px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.14em] text-navy-950">
            2-Step Package
          </span>
          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
                STANDARD + ADVANCED
              </p>
              <p className="mt-1.5 text-[14px] font-medium text-navy-800">
                기본부터 심화까지, 2단계 레벨테스트 준비
              </p>
              <p className="mt-4 max-w-[440px] text-[13.5px] leading-[1.9] text-charcoal-600">
                시험 유형을 먼저 익히고, 난이도를 높여 한 번 더 준비합니다. 두 교재는 서로 다른 문제로
                구성되어 같은 문제를 반복하는 방식이 아닙니다.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
                {formatKRW(LEVEL_TEST_BUNDLES.mainPlusAdvanced)}
              </p>
              <p className="mt-1 text-[11.5px] text-charcoal-600/70">100P Standard + 200P Advanced</p>
            </div>
          </div>
          <div className="mt-7">
            <KakaoLink
              label="STANDARD + ADVANCED 구성 문의"
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800 sm:w-auto"
            />
          </div>
        </div>

        {/* 구매 선택 구조 */}
        <div className="mx-auto mt-14 grid max-w-[980px] gap-4 sm:mt-16 sm:grid-cols-3">
          {purchaseOptions.map((o) => (
            <div
              key={o.n}
              className={`border p-6 ${
                o.highlight ? "border-navy-900 bg-white" : "border-ivory-300 bg-white/60"
              }`}
            >
              <p className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500">{o.n}</p>
              <p className="mt-2 font-display text-[16px] font-semibold text-navy-950">{o.title}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{o.body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-[620px] text-center text-[12.5px] leading-relaxed text-charcoal-600/70">
          더 많은 페이지가 아니라 더 넓은 난이도 범위, 단계적인 훈련으로 이해해주세요.
        </p>

        {/* 상담 전환 */}
        <div className="mx-auto mt-16 max-w-[560px] text-center sm:mt-20">
          <h3 className="font-display text-[20px] font-semibold text-navy-950 sm:text-[22px]">
            우리 아이에게 Advanced까지 필요한지 모르겠다면?
          </h3>
          <p className="mt-4 text-[13.5px] leading-relaxed text-charcoal-600">
            아래 내용을 알려주시면 적합한 구성을 안내합니다.
          </p>
          <ul className="mx-auto mt-5 grid max-w-[420px] grid-cols-2 gap-x-4 gap-y-2 text-left text-[12.5px] text-charcoal-600">
            {beforeChat.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
          <div className="mt-7">
            <KakaoLink
              label="2단계 구성 상담하기"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
