import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, formatKRW } from "@/data/pricing";

// 카카오톡 상담사가 고객에게 "가격 물어볼 때" 직접 링크로만 전달하는 비공개
// 구성·가격표입니다. 홈/메뉴/푸터/사이트맵/교재 찾기 어디에도 연결하지
// 않으며, 검색 노출도 막아둡니다(아래 robots 설정).
export const metadata = {
  title: "구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 구성표입니다.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Blossom Books 구성 안내",
    description: "카카오톡 상담에서 안내하는 구성표입니다.",
  },
};

const cellCls = "border border-navy-800/12 px-4 py-3 text-[13.5px]";
const headCellCls = "border border-navy-800/12 bg-ivory-200/60 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

const subjects = [
  { name: "영어", note: "영어 레벨테스트" },
  { name: "국어", note: "국어 문해력 레벨테스트" },
  { name: "수학", note: "사고력 수학 레벨테스트" },
];

// Special Package는 해당 구성 금액 + ₩100,000 (구성은 공통 Special과 동일, 금액만 다름)
const SPECIAL_ADD = 100000;

// 세트 3종 — 시험 2개 이상 / 과목 3개 / 형제 2명일 때만 안내하는 묶음 구성.
// 객단가·강조 위계: Special 2종(₩780,000) > 형제 Special(₩780,000) > 200P 3과목(₩870,000, 상담 없이 교재만이라 3등)
const specialTwoBundle = {
  badge: "BEST SET",
  title: "Special 2종",
  priceKRW: 780000,
  lead: "시험이 두 개일 때 한 결제.",
  items: ["시험마다 200P + 해설", "이 학생용 목차", "모의고사 2회", "오답지", "카톡 글 상담 30분"],
  example: "예: ISEE + MAP, SAT 영어 + SAT 수학, 레테 영어 + MAP 영어",
  note: "음성·줌 없음.",
};

const siblingBundle = {
  title: "형제 Special",
  priceKRW: 780000,
  lead: "아이 두 명일 때 한 결제.",
  items: ["아이마다 목차 재배열", "아이마다 모의고사 2회", "아이마다 카톡 글 상담 30분"],
  example: undefined,
  note: "같은 시험을 봐도 목차는 아이별로 따로 짭니다.",
};

const threeSubjectBundle = {
  title: "200P 3과목",
  priceKRW: 870000,
  lead: "200P 문제집 + 해설집 3권.",
  items: ["200P 워크북 + 해설집 × 3권"],
  example: "예: 영어·국어·수학, 또는 레테 영어 + MAP 영어 + MAP 수학",
  note: "교재 3권 · 상담 없음",
};

export default function QuotePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Quote Sheet</p>
      <h1 className="mt-3 font-display text-[28px] font-semibold text-navy-950 sm:text-[33px]">구성·가격 안내</h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
        카카오톡 상담에서 안내하는 구성표입니다. 홈 메뉴에는 없습니다.
      </p>
      <p className="mt-1.5 text-[12.5px] text-charcoal-600/80">
        문의 전에 분량과 시험을 고르시면 바로 맞춰 드립니다.
      </p>
      <p className="mt-1.5 text-[12.5px] text-charcoal-600/80">
        인터뷰·라이팅·리딩 등 한 유형만 필요하시거나 두 유형을 섞어서 원하시면, 표 가격이 아닌 맞춤 견적으로
        카카오톡 문의해 주세요.
      </p>

      {/* 1. 레벨테스트 — 과목(영어/국어/수학) 카드 3장. 모바일은 세로 스택 */}
      <section className="mt-10">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">
          1. 레벨테스트 문제집 <span className="font-normal text-charcoal-600">(학원·학교 입학/반 배정)</span>
        </h2>
        <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">
          학원마다 레벨테스트 유형이 다릅니다.
          <br />
          해당 학원 유형에 맞춰 구매하셔도 되고,
          <br />
          유형이 확실하지 않으면 일반 레벨테스트(레테 전용)로 문의 주셔도 됩니다.
          <br />
          영어·국어·수학 중 필요한 과목만 고르시면 됩니다.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {subjects.map((s) => (
            <div key={s.name} className="border border-navy-800/15 bg-ivory-100 p-4">
              <p className="font-display text-[16px] font-semibold text-navy-950">{s.name}</p>
              <p className="mt-0.5 text-[11.5px] text-charcoal-600/70">{s.note}</p>
              <div className="mt-3 divide-y divide-navy-800/10 border-t border-navy-800/10">
                {flexibleVolumes.map((v) => (
                  <div key={v.pages} className="flex items-center justify-between py-2 text-[13px]">
                    <span className="text-charcoal-600">{v.label}</span>
                    <span className="font-medium text-navy-950">{formatKRW(v.priceKRW)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-3 text-[12px] leading-relaxed text-charcoal-600/80">
          과목을 합쳐 주문할 수 있습니다. 합계는 카톡으로 맞춰 드립니다.
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600/80">
          샘플은 구매 전 확인 가능합니다. 학년·레벨·시험이 다르면 구성이 달라질 수 있습니다.
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600/80">
          인터뷰·라이팅·리딩 등 한 유형만 필요하시거나 두 유형을 섞어서 원하시면, 표 가격이 아닌 맞춤 견적으로
          카카오톡 문의해 주세요.
        </p>
      </section>

      {/* 2. Special Package — 단독 카드지만, "한 번에 맞추는 구성"의 780 세트보다 한 단계 낮은 무게 */}
      <section className="mt-12 border border-navy-900/35 bg-ivory-100 p-6 sm:p-8">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">2. Special Package</h2>
        <span className="mt-3 inline-flex items-center border border-navy-900/40 px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.14em] text-navy-900">
          Special Package
        </span>
        <p className="mt-4 font-display text-[17px] font-semibold leading-snug text-navy-950">
          200P와 문항은 같고, 순서·모의·시작만 다릅니다.
        </p>
        <p className="mt-3 font-display text-[30px] font-semibold text-navy-950">{formatKRW(390000)}</p>

        <p className="mt-5 text-[12.5px] font-medium text-navy-800/70">포함</p>
        <ul className="mt-1.5 space-y-1.5 text-[13.5px] leading-relaxed text-charcoal-900">
          <li>· 200P 워크북 + 정답·해설 PDF (200P와 같은 문항 풀)</li>
          <li>· 이 학생용 목차 (시험·학년/레벨·약한 영역 접수 후 푸는 순서만 재배열)</li>
          <li>· Mock 2회 (시간·답지·시간 배분 1장)</li>
          <li>· 오답 기록지 (문항 번호 미리 인쇄)</li>
          <li>· 시작 상담 30분 × 1회 (카카오톡 텍스트만). 이후 무제한 질문 없음.</li>
        </ul>
        <div className="mt-4 space-y-1 text-[12.5px] leading-relaxed text-charcoal-600">
          <p>대상: 8–12주, 목차를 못 짜는 집</p>
          <p>비추천: 문제만 필요하면 200P({formatKRW(flexibleVolumes[flexibleVolumes.length - 1].priceKRW)})</p>
        </div>
      </section>

      {/* 3. MAP */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">
          3. 국제학교 입시 — MAP Growth <span className="font-normal text-charcoal-600">(학년별)</span>
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
                <th className={headCellCls}>Special</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cellCls}>MAP 영어 100P 문제집 + 해설집</td>
                <td className={cellCls}>{formatKRW(190000)}</td>
                <td className={cellCls}>{formatKRW(190000 + SPECIAL_ADD)}</td>
              </tr>
              <tr>
                <td className={cellCls}>MAP 수학 60P 문제집 + 해설집</td>
                <td className={cellCls}>{formatKRW(150000)}</td>
                <td className={cellCls}>{formatKRW(150000 + SPECIAL_ADD)}</td>
              </tr>
              <tr>
                <td className={cellCls}>영어 + 수학 함께</td>
                <td className={cellCls}>{formatKRW(340000)}</td>
                <td className={cellCls}>{formatKRW(340000 + SPECIAL_ADD)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">학년별로 구매 가능합니다.</p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600/80">
          Special은 각 줄 금액에 +{formatKRW(SPECIAL_ADD)}입니다. 영어+수학 Special은 목차·모의·상담을 한 번에 진행합니다.
        </p>
      </section>

      {/* 4. CAT4 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">
          4. 국제학교 입시 — CAT4 <span className="font-normal text-charcoal-600">(레벨별)</span>
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
                <th className={headCellCls}>Special</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cellCls}>레벨 1개</td>
                <td className={cellCls}>{formatKRW(150000)}</td>
                <td className={cellCls}>{formatKRW(150000 + SPECIAL_ADD)}</td>
              </tr>
              <tr>
                <td className={cellCls}>레벨 2개 (정가 {formatKRW(300000)})</td>
                <td className={cellCls}>{formatKRW(270000)} (10% 할인)</td>
                <td className={cellCls}>{formatKRW(270000 + SPECIAL_ADD)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          2개 레벨 동시 구매 시 10% 할인됩니다.
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600/80">
          Special은 각 줄 금액에 +{formatKRW(SPECIAL_ADD)}입니다.
        </p>
      </section>

      {/* 5. ISEE */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">
          5. 국제학교 입시 — ISEE <span className="font-normal text-charcoal-600">(레벨별 Lower / Middle / Upper)</span>
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>분량</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              {flexibleVolumes.map((v) => (
                <tr key={v.pages}>
                  <td className={cellCls}>{v.label}</td>
                  <td className={cellCls}>{formatKRW(v.priceKRW)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          200P Special: {formatKRW(390000)}
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600/80">
          레벨(Lower/Middle/Upper)을 카톡에 적어 주세요. Verbal·Reading·Quant·Math Achievement 중 필요한
          영역만 고르실 수 있으며, 영역별로 단가가 달라지지 않습니다.
        </p>
      </section>

      {/* 6. OOPT */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">
          6. Oxford Online Placement Test (OOPT)
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cellCls}>100P 문제집 + 해설집</td>
                <td className={cellCls}>{formatKRW(190000)}</td>
              </tr>
              <tr>
                <td className={cellCls}>200P 문제집 + 해설집</td>
                <td className={cellCls}>{formatKRW(290000)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          200P Special: {formatKRW(290000 + SPECIAL_ADD)}
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600/80">
          학원·학교 배치용 Oxford 온라인 플레이스먼트 대비입니다. 일반 레벨테스트와는 별도 구성입니다.
        </p>
      </section>

      {/* 7. 한 번에 맞추는 구성 — 객단가 1위인 780 세트(Special 2종 > 형제 Special) 순으로 강조,
          870(3과목)은 교재만이라 일반 카드, 페이지 맨 아래 */}
      <section className="mt-16 border-2 border-navy-900/70 bg-ivory-200/50 p-6 sm:p-8">
        <h2 className="font-display text-[20px] font-semibold text-navy-950">한 번에 맞추는 구성</h2>
        <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">
          시험이 두 개이거나, 과목이 세 개이거나, 형제가 두 명일 때만 이 구성을 보세요. 한 시험·한 과목이면
          위의 단품이 맞습니다.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {/* 1위: Special 2종 — 네이비 필 배경 + 골드 배지, 세 카드 중 가장 큼 */}
          <div className="flex flex-col border-2 border-navy-950 bg-navy-950 p-6 sm:col-span-1">
            <span className="inline-flex w-fit items-center border border-brass-500 bg-brass-500 px-2 py-1 font-label text-[10px] uppercase tracking-[0.12em] text-navy-950">
              {specialTwoBundle.badge}
            </span>
            <p className="mt-1 text-[11px] text-ivory-100/60">{specialTwoBundle.title}</p>
            <p className="mt-3 font-display text-[32px] font-semibold text-ivory-100">
              {formatKRW(specialTwoBundle.priceKRW)}
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ivory-100">{specialTwoBundle.lead}</p>
            <ul className="mt-3 space-y-1 text-[12.5px] leading-relaxed text-ivory-100/75">
              {specialTwoBundle.items.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
            <p className="mt-3 text-[11.5px] leading-relaxed text-ivory-100/60">{specialTwoBundle.example}</p>
            <p className="mt-2 text-[11.5px] leading-relaxed text-ivory-100/60">{specialTwoBundle.note}</p>
          </div>

          {/* 2위: 형제 Special — 아이보리 + 2px 네이비 테두리 + 골드 아웃라인 배지, 1위보다 반 단계 낮음 */}
          <div className="flex flex-col border-2 border-navy-900 bg-ivory-100 p-5">
            <span className="inline-flex w-fit items-center border border-brass-500 px-2 py-1 font-label text-[10px] uppercase tracking-[0.12em] text-brass-600">
              {siblingBundle.title}
            </span>
            <p className="mt-4 font-display text-[27px] font-semibold text-navy-950">
              {formatKRW(siblingBundle.priceKRW)}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-charcoal-900">{siblingBundle.lead}</p>
            <ul className="mt-3 space-y-1 text-[12.5px] leading-relaxed text-charcoal-600">
              {siblingBundle.items.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
            <p className="mt-3 text-[11.5px] leading-relaxed text-charcoal-600/70">{siblingBundle.note}</p>
          </div>

          {/* 3위: 200P 3과목 — 회색 테두리 일반 카드. 네이비·골드 필 없음 */}
          <div className="flex flex-col border border-navy-800/15 bg-ivory-100 p-5">
            <span className="inline-flex w-fit items-center border border-navy-800/20 px-2 py-1 font-label text-[10px] uppercase tracking-[0.12em] text-charcoal-600">
              {threeSubjectBundle.title}
            </span>
            <p className="mt-4 font-display text-[22px] font-semibold text-navy-950">
              {formatKRW(threeSubjectBundle.priceKRW)}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-charcoal-900">{threeSubjectBundle.lead}</p>
            <ul className="mt-3 space-y-1 text-[12.5px] leading-relaxed text-charcoal-600">
              {threeSubjectBundle.items.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
            <p className="mt-3 text-[11.5px] leading-relaxed text-charcoal-600/80">{threeSubjectBundle.example}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-charcoal-600/60">{threeSubjectBundle.note}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-14 border-t border-navy-800/12 pt-10 text-center">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 이 구성으로 문의하기
        </a>
        <p className="mx-auto mt-5 max-w-lg text-[12px] leading-relaxed text-charcoal-600/80">
          문항 구성은 시험·학년에 따라 달라질 수 있습니다. Special Package는 200P와 문항이 같고 순서와
          시작 방법만 다릅니다.
        </p>
      </div>
    </div>
  );
}
