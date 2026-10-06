import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import LevelTestConfigurator from "./LevelTestConfigurator";

// 중요한 상품 정책: 페이지 수(60/100/200/300P)는 "문제량"이고,
// STANDARD/ADVANCED는 "난이도·학습 단계"입니다. 서로 다른 축이므로
// 200P가 곧 Advanced라거나 100P가 곧 Standard라는 식으로 고정하지 않습니다.
// 60P/100P/200P/300P 모두 Standard·Advanced를 각각 선택할 수 있습니다.
//
// 이 섹션은 한 번 크게 압축했습니다(2026-09). CASE 예시, STEP01→02 흐름도,
// Premium Card, 구매 옵션 3칸을 모두 제거하고 배너·카드·비교표·상담 CTA만
// 남겨 페이지 길이를 줄였습니다. 이후(2026-10) 압축이 과했다는 피드백으로
// CASE 예시("이렇게 선택합니다"), STEP01→02 흐름도, 구매 옵션 3칸을 다시
// 추가했습니다. Premium Card(특정 분량 조합을 고정 가격으로 보여주는 카드)는
// 과거 가격 표기 오류를 일으킨 적이 있어 복원하지 않고, 대신
// LevelTestConfigurator로 모든 조합의 정확한 가격을 바로 확인하도록 합니다.

const buyingSteps = [
  { n: "STEP 1", title: "얼마나 많은 문제를 풀 것인가?", body: "60P / 100P / 200P / 300P" },
  { n: "STEP 2", title: "어느 난이도로 준비할 것인가?", body: "STANDARD / ADVANCED" },
  { n: "STEP 3", title: "한 단계 더 준비할 것인가?", body: "STANDARD + ADVANCED" },
];

const standardPoints = ["본시험 대비", "핵심 유형", "학생 수준에 맞춘 일반 난이도", "충분한 실전 연습"];
const advancedPoints = ["고난도 문제", "변형 유형", "상위 난이도 대비", "추가적인 사고력과 응용 문제"];

const recommendedFor = [
  "레벨테스트를 충분한 문제량으로 준비하고 싶은 경우",
  "상위반 또는 높은 레벨 배정을 목표로 하는 경우",
  "기본 문제뿐 아니라 심화 문제까지 연습하고 싶은 경우",
  "첫 시험 이후 다음 레벨테스트까지 이어서 준비하는 경우",
  "한 번의 문제집으로 끝내기보다 단계적으로 준비하고 싶은 경우",
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

const cases: { need: string; result: string }[] = [
  { need: "레벨테스트가 처음이에요.", result: "60P 또는 100P STANDARD" },
  { need: "학원에서 상위반 배정을 목표로 하고 있어요.", result: "100P STANDARD + 100P ADVANCED" },
  { need: "기본 유형은 이미 풀어봤고, 어려운 문제만 더 풀고 싶어요.", result: "100P ADVANCED" },
  { need: "재응시인데 지난번보다 확실하게 준비하고 싶어요.", result: "200P STANDARD + 200P ADVANCED" },
];

const purchaseOptions: { n: string; title: string; desc: string }[] = [
  { n: "①", title: "STANDARD만 구매", desc: "현재 시험을 제대로 준비하는 본시험 대비 구성" },
  { n: "②", title: "ADVANCED만 구매", desc: "기본 유형은 충분히 연습한 상태에서 심화 문제만" },
  { n: "③", title: "STANDARD + ADVANCED", desc: "기본부터 심화까지 한 번에 이어서 준비" },
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

        {/* CHOOSE YOUR LEVEL */}
        <div className="mx-auto mt-16 max-w-[680px] text-center sm:mt-20">
          <p className="font-label text-[11px] uppercase tracking-[0.2em] text-brass-500">Choose Your Level</p>
          <h2 className="mt-4 font-display text-[28px] font-semibold leading-tight text-navy-950 sm:text-[33px]">
            같은 분량도, 난이도는 다르게.
          </h2>
          <p className="mt-4 text-[14.5px] leading-[1.9] text-charcoal-600">
            필요한 문제량을 선택한 뒤, 학생의 현재 수준과 준비 목적에 따라 Standard 또는 Advanced를 선택할
            수 있습니다. 두 교재는 서로 다른 문제로 구성됩니다.
          </p>
        </div>

        {/* LEVEL TEST 2-STEP 흐름도 */}
        <div className="mx-auto mt-10 max-w-[620px] sm:mt-12">
          <p className="text-center font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">
            Level Test 2-Step
          </p>
          <div className="mt-5 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <div className="border-t-2 border-navy-900/70 bg-white p-5">
              <p className="font-label text-[11px] tracking-[0.12em] text-brass-500">STEP 01</p>
              <p className="mt-1.5 font-display text-[16px] font-semibold text-navy-950">STANDARD</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600">
                현재 시험을 제대로 준비하는 정규 버전
              </p>
            </div>
            <div className="flex items-center justify-center text-navy-800/40">
              <span className="hidden font-display text-[20px] leading-none sm:inline">→</span>
              <span className="font-display text-[20px] leading-none sm:hidden">↓</span>
            </div>
            <div className="border-t-2 border-navy-900/70 bg-navy-950 p-5">
              <p className="font-label text-[11px] tracking-[0.12em] text-brass-400">STEP 02</p>
              <p className="mt-1.5 font-display text-[16px] font-semibold text-ivory-100">ADVANCED</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ivory-100/75">
                Standard보다 한 단계 높은 심화 문제
              </p>
            </div>
          </div>
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
              Standard는 &ldquo;현재 시험을 제대로 준비하는 정규 버전&rdquo;이라는 의미입니다.
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
              Advanced는 Standard보다 한 단계 높은, 별도로 제작된 심화 문제 구성입니다.
            </p>
          </div>
        </div>

        {/* 이렇게 선택합니다 — 상황별 예시 */}
        <div className="mx-auto mt-14 max-w-[900px] sm:mt-16">
          <h3 className="text-center font-display text-[20px] font-semibold text-navy-950 sm:text-[22px]">
            이렇게 선택합니다
          </h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {cases.map((c) => (
              <div key={c.need} className="border border-ivory-300 bg-white p-4">
                <p className="text-[13px] leading-relaxed text-charcoal-700">&ldquo;{c.need}&rdquo;</p>
                <p className="mt-2.5 border-t border-ivory-300 pt-2.5 font-display text-[14px] font-semibold text-navy-950">
                  → {c.result}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 구매 선택 구조 */}
        <div className="mx-auto mt-14 max-w-[900px] sm:mt-16">
          <h3 className="text-center font-display text-[20px] font-semibold text-navy-950 sm:text-[22px]">
            구매 선택 구조
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {purchaseOptions.map((o) => (
              <div key={o.n} className="border border-ivory-300 bg-white p-5">
                <p className="font-display text-[20px] font-semibold text-brass-500">{o.n}</p>
                <p className="mt-2 font-display text-[15px] font-semibold text-navy-950">{o.title}</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 직접 선택해보는 configurator — STANDARD만/ADVANCED만/두 단계 모두를
            여기서 바로 조합하고 가격까지 확인할 수 있습니다. */}
        <LevelTestConfigurator />
        <div className="mx-auto mt-5 max-w-[620px] space-y-1.5 text-center text-[12.5px] leading-relaxed text-charcoal-600/70">
          <p>STANDARD만 구매해도 완전한 본시험 대비 상품입니다.</p>
          <p>이미 기본 유형을 충분히 연습했다면 Advanced만 선택할 수도 있습니다.</p>
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
