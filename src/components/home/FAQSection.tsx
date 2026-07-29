"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "기존에 제작된 교재를 바로 구매할 수 있나요?", a: "네. 이미 제작이 완료된 교재는 상담 후 바로 구매하실 수 있습니다. 원하시는 과목과 시험을 말씀해주시면 현재 구매 가능한 교재를 안내드립니다." },
  { q: "교재는 어떤 파일로 제공되나요?", a: "모든 교재는 PDF 파일로 제공됩니다. 결제 확인 후 이메일로 발송해드립니다." },
  { q: "문제집과 해설집이 함께 제공되나요?", a: "대부분의 교재는 학생용 문제집과 정답·상세 해설집이 세트로 구성되어 있습니다. 상세 페이지에서 포함 여부를 확인하실 수 있습니다." },
  { q: "원하는 교재가 없는 경우 제작할 수 있나요?", a: "네. 학년, 실력, 시험 목적에 맞춰 별도로 주문 제작이 가능합니다. 주문 제작 페이지에서 필요한 내용을 알려주시면 상담해드립니다." },
  { q: "학생 수준에 맞춰 난이도를 조정할 수 있나요?", a: "네. 주문 제작의 경우 학생의 현재 실력과 목표에 맞춰 난이도와 문제 유형을 조정할 수 있습니다." },
  { q: "학원이나 기관용 교재도 제작할 수 있나요?", a: "네. 학원·프랩학원·교육기관의 커리큘럼과 수업 방식을 반영한 전용 교재 제작을 상담해드립니다. 기관·학원 페이지를 참고해주세요." },
  { q: "개인 과외 선생님도 주문할 수 있나요?", a: "네. 개인 과외 선생님을 위한 수업용 문제, 과제, 복습 자료, 단원별 테스트 제작도 가능합니다." },
  { q: "교재 제작 기간은 얼마나 걸리나요?", a: "제작 범위와 분량에 따라 기간이 달라집니다. 상담 시 희망 완료 시기를 알려주시면 가능 여부와 예상 일정을 안내드립니다." },
  { q: "수정 요청은 어떻게 진행되나요?", a: "제작 완료 후 수정이 필요한 부분이 있으면 카카오톡 또는 이메일로 요청해주세요. 요청 범위에 따라 안내드립니다." },
  { q: "에세이, 리딩, 그래머, 보카 영역도 추가할 수 있나요?", a: "네. 메인 교재 구매 고객을 대상으로 리딩·그래머·보카·에세이 등 추가 영역 제작도 가능합니다." },
  { q: "교재를 인쇄본으로 받을 수 있나요?", a: "기본 제공 형식은 PDF이며, 인쇄본 관련 문의는 상담을 통해 별도로 확인해드립니다." },
  { q: "여러 학생이 함께 사용해도 되나요?", a: "구매한 교재의 이용 범위는 개인용, 수업용, 기관용에 따라 달라질 수 있습니다. 다수의 학생이 함께 사용하는 경우 상담을 통해 이용 범위를 확인해주시기 바랍니다." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <p className="text-center font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">FAQ</p>
        <h2 className="mt-3 text-center font-display text-[32px] font-semibold text-navy-950 sm:text-[38px]">
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

        <p className="mt-10 text-[12.5px] leading-relaxed text-charcoal-600">
          구매한 교재의 이용 범위는 개인용, 수업용, 기관용에 따라 달라질 수 있습니다. 무단 복제,
          재판매, 온라인 공유 및 배포는 제한됩니다. 학원이나 기관에서 다수의 학생이 사용할 경우
          상담을 통해 이용 범위를 확인해주시기 바랍니다.
        </p>
      </div>
    </section>
  );
}
