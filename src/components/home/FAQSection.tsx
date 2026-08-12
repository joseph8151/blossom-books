"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight, FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

// 가격보다 먼저 "이 교재가 우리 아이에게 맞는가"를 판단하도록, 가치·시험·구성 질문을 앞에 둡니다.
const faqs = [
  {
    q: "실제 시험과 문제 유형이 비슷한가요?",
    a: "Blossom Books는 각 시험에서 평가하는 주요 Skill, 문제 유형, 문항 구조를 분석해 독립적으로 문제를 제작합니다. 실제 기출문제나 유출문제를 제공하지 않으며 “시험에 그대로 출제” “100% 동일” 같은 표현은 사용하지 않습니다. 시험에서 요구되는 사고방식과 문제 유형에 익숙해지는 것을 목표로 합니다.",
  },
  {
    q: "학년별로 난이도가 다른가요?",
    a: "네. 학생의 학년과 목표 시험 수준을 기준으로 난이도를 구성하며, 일부 교재는 Foundation부터 Advanced 또는 Challenge까지 단계적으로 난도가 올라가도록 설계됩니다. 실제 체감 난이도는 학생의 현재 수준에 따라 달라질 수 있어, 구매 전 무료 샘플로 확인하시길 권장합니다.",
  },
  {
    q: "몇 페이지를 선택하는 것이 좋나요?",
    a: "정답이 정해져 있지 않습니다. 시험까지 남은 기간과 현재 실력에 따라 달라지며, 더 많은 페이지가 항상 더 좋은 선택은 아닙니다. 시험이 가깝다면 40P(핵심 유형), 표준 대비는 60P, 충분한 반복·심화가 필요하면 100P를 권장합니다. ‘내게 맞는 교재 찾기’에서 몇 가지만 선택하면 적합한 구성을 추천해 드립니다.",
  },
  {
    q: "60페이지와 100페이지의 차이는 무엇인가요?",
    a: "60P(Standard Prep)는 주요 유형을 균형 있게 연습하는 기본 실전 대비 구성이고, 100P(Intensive Prep)는 난이도 확장과 유형별 집중 반복까지 담은 심화 구성입니다. 각 교재 상세페이지의 ‘구성 비교’ 표에서 어떤 학습이 포함되는지 나란히 확인하실 수 있습니다.",
  },
  {
    q: "200페이지(이상)는 어떤 학생에게 추천하나요?",
    a: "장기 집중 준비가 필요하거나, 여러 영역의 반복 실전 연습·고난도 문제까지 준비하려는 학생에게 적합합니다. 100P를 초과하는 대형 구성·추가 영역·특수 시험은 별도 견적으로 안내해 드립니다.",
  },
  {
    q: "구매 전에 샘플을 볼 수 있나요?",
    a: "네. 대부분의 교재는 상세 페이지의 ‘샘플 페이지 미리보기’에서 실제 문제집과 해설집이 어떻게 구성되는지 확인하실 수 있습니다. 정답만 제시하는 것이 아니라 풀이 과정과 오답 포인트까지 담긴 해설 방식을 미리 보고 결정하실 수 있습니다.",
  },
  {
    q: "해설집도 제공되나요?",
    a: "네. 대부분의 교재는 학생용 문제집과 정답·상세 해설집이 세트로 구성됩니다. 해설집은 정답뿐 아니라 풀이 과정과 자주 틀리는 지점, 채점 기준에 맞춘 모범 답안까지 담아 혼자서도 복습하기 좋습니다.",
  },
  {
    q: "한글 해설도 제공되나요?",
    a: "네. 국제학교·레벨테스트·미국 교육과정 교재는 문제집(영어) + 한글 상세해설집으로 구성되어, 학생이 혼자 복습하고 부모님이 채점·설명해 주기에도 좋습니다. SAT·AP·성인 공인시험 등은 실제 시험 언어에 맞춰 영어 해설을 제공하되 핵심 포인트는 한국어로 보완합니다. 각 상세페이지에 해설 언어가 표시됩니다.",
  },
  {
    q: "Reading과 Math를 따로 구매할 수 있나요?",
    a: "네. 과목별로 필요한 교재만 선택하실 수 있습니다. One-size-fits-all 교재가 아니라, 학생에게 필요한 시험·과목·구성만 선택해 불필요한 분량이나 과목까지 구매하지 않으셔도 됩니다.",
  },
  {
    q: "원하는 시험이 사이트에 없으면 제작할 수 있나요?",
    a: "네. 목록에 없는 시험이나 특정 구성(개념서·문제집·해설집·모의고사)도 학년·실력·시험 목적에 맞춰 주문 제작이 가능합니다. 카카오톡이나 주문 제작 페이지에서 편하게 문의해 주세요.",
  },
  {
    q: "PDF는 어떻게 받나요? 인쇄해서 쓸 수 있나요?",
    a: "모든 교재는 PDF 파일로 제공되며 이메일로 발송됩니다. 별도 배송을 기다릴 필요 없이 PC·태블릿·휴대폰에서 학습하거나 인쇄하여 사용하실 수 있습니다.",
  },
  {
    q: "구매 후 교재를 언제 받을 수 있나요?",
    a: "카카오톡 상담 후 계좌이체 또는 카드로 결제하시면, 결제 확인 후 교재(PDF)를 이메일로 보내드립니다. 별도의 배송 대기 시간은 없습니다.",
  },
  {
    q: "가격은 어떻게 확인하나요?",
    a: "가격은 교재 구성에 따라 달라지며, 40페이지 구성부터 시작합니다. 시험·학년·과목·분량을 확인하신 뒤 각 교재 상세페이지에서 정확한 금액을 명확히 확인하실 수 있고, 결제 전 최종 금액을 모두 확인하실 수 있습니다. 100P 초과·추가 영역·특수 구성 등 일부는 별도 견적으로 안내됩니다.",
  },
  {
    q: "PDF 교재 구매 후 환불이 가능한가요?",
    a: "Blossom Books 교재는 디지털 PDF 콘텐츠로 제공되며, 파일 발송이 완료된 이후에는 환불이 불가합니다. 파일 발송 전에는 주문 상태에 따라 취소·변경 가능 여부를 확인하실 수 있습니다. 구매 전 무료 샘플과 상품 구성을 충분히 확인해 주세요. Blossom Books 측의 명확한 오류가 확인되는 경우 구매 건당 최대 2회까지 교정·수정을 지원합니다.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <p className="text-center font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">FAQ</p>
        <h2 className="mt-3 text-center font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
          자주 묻는 질문
        </h2>

        <div className="mt-12 divide-y divide-navy-800/12 border-t border-b border-navy-800/12">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-[15px] font-medium text-navy-950">{item.q}</span>
                  <Plus
                    size={18}
                    className={cn("shrink-0 text-brass-500 transition-transform duration-300", open && "rotate-45")}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden transition-[grid-template-rows] duration-300",
                    open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                  )}
                >
                  <p className="overflow-hidden text-[13.5px] leading-relaxed text-charcoal-600">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 궁금증 해소 후 다음 행동 안내 */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-navy-800/12 pt-10 text-center">
          <p className="font-display text-[17px] font-medium text-navy-950 sm:text-[19px]">
            어떤 교재가 맞는지 아직 고민되시나요?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/find"
              className="group inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
            >
              내게 맞는 교재 찾기
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              <FileSearch size={15} /> 무료 샘플 보기
            </Link>
          </div>
        </div>

        <p className="mt-10 text-[12px] leading-relaxed text-charcoal-600/80">
          구매한 교재의 이용 범위는 개인용, 수업용, 기관용에 따라 달라질 수 있습니다. 무단 복제,
          재판매, 온라인 공유 및 배포는 제한됩니다. 학원이나 기관에서 다수의 학생이 사용할 경우
          상담을 통해 이용 범위를 확인해주시기 바랍니다.
        </p>
      </div>
    </section>
  );
}
