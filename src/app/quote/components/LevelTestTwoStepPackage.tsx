import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, formatKRW, LEVEL_TEST_BUNDLES } from "../data";

// 중요한 상품 정책: 페이지 수(40/60/100/200P)는 "문제량"이고,
// STANDARD/ADVANCED는 "난이도·학습 단계"입니다. 서로 다른 축이므로
// 200P가 곧 Advanced라거나 100P가 곧 Standard라는 식으로 고정하지 않습니다.

const buyingSteps = [
  { n: "STEP 1", title: "얼마나 많은 문제를 풀 것인가?", body: "40P / 60P / 100P / 200P" },
  { n: "STEP 2", title: "어느 단계로 준비할 것인가?", body: "STANDARD / ADVANCED" },
  { n: "STEP 3", title: "두 단계가 모두 필요한가?", body: "STANDARD + ADVANCED" },
];

const standardPoints = ["현재 시험 대비", "기본·주요 유형", "학생 수준에 맞춘 일반 난이도", "충분한 실전 연습"];
const advancedPoints = ["심화 문제", "고난도·변형 유형", "상위 레벨 대비", "추가적인 난이도 훈련"];

const standard200Includes = [
  "200P Student Workbook",
  "Answer & Explanation Guide",
  "현재 시험 수준 중심",
  "충분한 반복 및 실전 연습",
];

const twoStepFlow = [
  { label: "STEP 01", title: "STANDARD", body: "현재 시험 유형과 난이도에 맞춰 충분히 연습" },
  { label: "STEP 02", title: "ADVANCED", body: "서로 다른 문제로 난이도를 높여 한 단계 더 연습" },
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
  { n: "①", title: "STANDARD만", body: "현재 시험을 필요한 분량만큼 준비" },
  { n: "②", title: "ADVANCED만", body: "이미 기본 준비가 되어 있고 심화 문제만 필요한 경우" },
  {
    n: "③",
    title: "STANDARD + ADVANCED",
    body: "기본 시험 대비부터 상위 난이도까지 단계적으로 준비",
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
  const p200 = flexibleVolumes.find((v) => v.pages === 200)!;

  return (
    <section className="border-b border-ivory-300 bg-ivory-200/40 py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        {/* 구매 사고방식 — 분량과 난이도는 별개의 선택입니다 */}
        <div className="mx-auto grid max-w-[900px] items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {buyingSteps.map((s, i) => (
            <div key={s.n} className="contents">
              <div className="border-t-2 border-brass-500 bg-white p-5 text-center">
                <p className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500">{s.n}</p>
                <p className="mt-1.5 text-[13px] font-medium leading-snug text-navy-950">{s.title}</p>
                <p className="mt-1.5 text-[12px] text-charcoal-600">{s.body}</p>
              </div>
              {i < buyingSteps.length - 1 && (
                <div className="flex items-center justify-center text-navy-800/40">
                  <span className="hidden font-display text-[20px] leading-none sm:inline">→</span>
                  <span className="font-display text-[20px] leading-none sm:hidden">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* DIFFICULTY OPTIONS */}
        <div className="mx-auto mt-16 max-w-[680px] text-center sm:mt-20">
          <p className="font-label text-[11px] uppercase tracking-[0.2em] text-brass-500">Difficulty Options</p>
          <h2 className="mt-4 font-display text-[28px] font-semibold leading-tight text-navy-950 sm:text-[33px]">
            같은 분량도, 준비 단계는 다르게.
          </h2>
          <p className="mt-4 text-[14.5px] leading-[1.9] text-charcoal-600">
            40P부터 200P까지 필요한 문제량을 선택한 뒤, 학생의 현재 수준과 준비 목적에 따라 Standard 또는
            Advanced 구성이 가능합니다.
          </p>
        </div>

        {/* STANDARD / ADVANCED 카드 */}
        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-2">
          <div className="border border-ivory-300 bg-white p-8">
            <p className="font-label text-[11px] uppercase tracking-[0.16em] text-navy-800/60">Standard</p>
            <ul className="mt-4 space-y-2 text-[13.5px] leading-relaxed text-charcoal-700">
              {standardPoints.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
            <p className="mt-5 border-t border-ivory-300 pt-4 text-[12px] leading-relaxed text-charcoal-600/80">
              Standard는 쉬운 문제집이 아니라, 학생의 시험 수준에 맞춘 &ldquo;기본 본시험 대비 버전&rdquo;입니다.
            </p>
          </div>

          <div className="border border-navy-950 bg-navy-950 p-8">
            <p className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">Advanced</p>
            <ul className="mt-4 space-y-2 text-[13.5px] leading-relaxed text-ivory-100/85">
              {advancedPoints.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
            <p className="mt-5 border-t border-ivory-100/15 pt-4 text-[12px] leading-relaxed text-ivory-100/60">
              Advanced는 Standard보다 한 단계 높은, 별도로 제작된 문제 구성입니다.
            </p>
          </div>
        </div>

        {/* 200P STANDARD — 독립 상품 예시 */}
        <div className="mx-auto mt-10 max-w-[620px] border border-ivory-300 bg-white p-7 sm:p-8">
          <span className="inline-flex items-center rounded-sm bg-navy-900/8 px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.14em] text-navy-900">
            200P Standard 예시
          </span>
          <p className="mt-3 font-display text-[19px] font-semibold text-navy-950">200P STANDARD</p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-charcoal-600">
            현재 준비하는 시험을 한 단계 안에서 충분한 문제량으로 연습합니다.
          </p>
          <ul className="mt-4 space-y-1.5 text-[12.5px] leading-relaxed text-charcoal-700">
            {standard200Includes.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-4 border-t border-ivory-300 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-[22px] font-semibold text-navy-950">{formatKRW(p200.priceKRW)}</p>
            <KakaoLink
              label="200P 기본 구성 상담"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 border border-navy-900 px-6 text-[13px] font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-ivory-100"
            />
          </div>
        </div>

        {/* LEVEL TEST 2-STEP */}
        <div className="mt-16 sm:mt-20">
          <p className="text-center font-label text-[11px] uppercase tracking-[0.2em] text-brass-500">
            Level Test 2-Step
          </p>
          <h3 className="mx-auto mt-3 max-w-[620px] text-center font-display text-[22px] font-semibold leading-snug text-navy-950 sm:text-[25px]">
            기본에서 끝내지 않고, 심화까지 준비한다면
          </h3>

          <div className="mx-auto mt-9 grid max-w-[700px] items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
            {twoStepFlow.map((step, i) => (
              <div key={step.label} className="contents">
                <div className="border-t-2 border-navy-900/70 bg-white p-6">
                  <p className="font-label text-[11px] tracking-[0.14em] text-brass-500">{step.label}</p>
                  <p className="mt-2 font-display text-[17px] font-semibold text-navy-950">{step.title}</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{step.body}</p>
                </div>
                {i < twoStepFlow.length - 1 && (
                  <div className="flex items-center justify-center text-navy-800/40">
                    <span className="hidden font-display text-[22px] leading-none sm:inline">→</span>
                    <span className="font-display text-[22px] leading-none sm:hidden">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-[620px] space-y-2 text-center">
            <p className="font-display text-[15px] font-semibold text-navy-950">
              &ldquo;Advanced는 Standard의 문제를 반복한 교재가 아닙니다.&rdquo;
            </p>
            <p className="text-[13.5px] leading-relaxed text-charcoal-600">
              두 단계는 서로 다른 문제로 구성됩니다.
            </p>
          </div>
        </div>

        {/* 추천 대상 */}
        <div className="mx-auto mt-14 max-w-[760px] sm:mt-16">
          <h3 className="text-center font-display text-[20px] font-semibold text-navy-950 sm:text-[22px]">
            이런 경우에 2단계 구성을 검토해보세요.
          </h3>
          <ul className="mt-6 grid gap-x-8 gap-y-3 text-[13.5px] leading-relaxed text-charcoal-700 sm:grid-cols-2">
            {[
              "레벨테스트를 충분한 문제량으로 준비하고 싶은 경우",
              "상위반 또는 높은 레벨 배정을 목표로 하는 경우",
              "기본 문제뿐 아니라 심화 문제까지 연습하고 싶은 경우",
              "첫 시험 이후 다음 레벨테스트까지 이어서 준비하는 경우",
              "한 번의 문제집으로 끝내기보다 단계적으로 준비하고 싶은 경우",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brass-500">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
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
            Upgrade Path
          </span>
          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
                STANDARD + ADVANCED
              </p>
              <p className="mt-1.5 text-[14px] font-medium text-navy-800">
                기본 단계와 심화 단계를 각각 다른 문제집으로 준비합니다.
              </p>
              <p className="mt-4 max-w-[440px] text-[13.5px] leading-[1.9] text-charcoal-600">
                두 단계 모두 서로 다른 문제로 제작되어 같은 문제를 반복하는 방식이 아닙니다. 이 패키지는
                100P Standard + 200P Advanced로 진행되며, 다른 분량 조합이 필요하면 상담에서 조정합니다.
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
              <p className="font-label text-[13px] tracking-[0.05em] text-brass-500">{o.n}</p>
              <p className="mt-2 font-display text-[16px] font-semibold text-navy-950">{o.title}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{o.body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-[620px] text-center text-[12.5px] leading-relaxed text-charcoal-600/70">
          더 많은 페이지가 아니라 더 넓은 난이도 범위, 단계적인 훈련으로 이해해주세요. 200P Standard만
          선택하셔도 충분한 구성입니다.
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
