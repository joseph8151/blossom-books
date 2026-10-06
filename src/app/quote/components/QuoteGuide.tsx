import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, formatKRW } from "../data";

// 첫 화면: 무엇을 사야 하는지 네 줄로 정리합니다.
const decisionRows = [
  { label: "학원", text: "학원 이름을 모르면 일반 레테로 고르세요." },
  { label: "분량", text: "시험까지 2주 안이면 60P, 한 달이면 100P, 두 달 이상이면 200P." },
  { label: "수준", text: "처음이면 기본, 한 번 떨어졌거나 상위반이면 심화." },
  { label: "가격", text: "바로 아래 표 하나에 있습니다." },
];

// 가격표는 이 한 곳에만 둡니다. 300P는 공용 단가표에 없는 이 페이지 전용 분량입니다.
const priceOf = (pages: number) => flexibleVolumes.find((v) => v.pages === pages)?.priceKRW ?? 0;
const priceRows = [
  { pages: "60P", price: priceOf(60), use: "기본 한 바퀴" },
  { pages: "100P", price: priceOf(100), use: "유형을 넉넉히" },
  { pages: "200P", price: priceOf(200), use: "틀린 유형을 다시" },
  { pages: "300P", price: 390000, use: "같은 유형을 다른 지문으로 한 번 더" },
];

const askList = ["학원 이름", "학년", "과목", "시험일"];

export default function QuoteGuide() {
  return (
    <>
      <section className="border-b border-ivory-300 bg-ivory-100 pb-14 pt-14 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-[720px] px-5 sm:px-8">
          <h1 className="font-display text-[28px] font-semibold leading-tight text-navy-950 sm:text-[36px]">
            레벨테스트 문제집, 이렇게 고르세요.
          </h1>

          <dl className="mt-8 border-t-2 border-navy-900">
            {decisionRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-ivory-300 py-4 sm:grid-cols-[5rem_1fr]"
              >
                <dt className="text-[13px] font-medium text-charcoal-600">{row.label}</dt>
                <dd className="text-[15px] leading-relaxed text-navy-950">{row.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="price" className="border-b border-ivory-300 bg-ivory-100 py-14 sm:py-20">
        <div className="mx-auto max-w-[720px] px-5 sm:px-8">
          <h2 className="font-display text-[22px] font-semibold text-navy-950 sm:text-[26px]">가격</h2>

          <table className="mt-6 w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-navy-900 text-[12.5px] text-charcoal-600">
                <th scope="col" className="py-3 pr-3 font-medium">분량</th>
                <th scope="col" className="py-3 pr-3 font-medium">가격</th>
                <th scope="col" className="py-3 font-medium">쓰임</th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map((row) => (
                <tr key={row.pages} className="border-b border-ivory-300 align-top">
                  <th scope="row" className="py-4 pr-3 text-[15px] font-semibold text-navy-950">
                    {row.pages}
                  </th>
                  <td className="whitespace-nowrap py-4 pr-3 text-[15px] font-semibold text-navy-950">
                    {formatKRW(row.price)}
                  </td>
                  <td className="py-4 text-[14px] leading-relaxed text-charcoal-600">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-4 text-[13px] leading-relaxed text-charcoal-600">
            분량마다 기본과 심화 중 하나를 고릅니다. 더 긴 분량은 상담으로 안내합니다.
          </p>
        </div>
      </section>

      <section className="border-b border-ivory-300 bg-ivory-200/40 py-14 sm:py-20">
        <div className="mx-auto max-w-[720px] px-5 sm:px-8">
          <h2 className="font-display text-[22px] font-semibold text-navy-950 sm:text-[26px]">
            상담 때 알려 주세요
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-navy-950 sm:grid-cols-4">
            {askList.map((item) => (
              <li key={item} className="border-t border-navy-900/20 pt-3">
                {item}
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-navy-900 px-8 text-[15px] font-medium text-ivory-100 transition-colors hover:bg-navy-800 sm:w-auto"
          >
            <MessageCircle size={17} />
            카카오톡으로 상담하기
          </a>
        </div>
      </section>

      <section className="bg-ivory-100 py-10">
        <div className="mx-auto max-w-[720px] px-5 sm:px-8">
          <Link
            href="/quote-international-school"
            className="group inline-flex items-center gap-1.5 text-[14px] text-charcoal-600 underline decoration-navy-900/20 underline-offset-4 hover:text-navy-900"
          >
            국제학교 입학시험은 별도 페이지
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
