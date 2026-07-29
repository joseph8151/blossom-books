import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "주문 제작 상담",
  description:
    "학년, 시험, 수업 목적에 맞춘 맞춤 문제집·모의고사 주문 제작을 상담하세요. 학원, 프랩학원, 개인 과외 선생님, 교육기관 모두 이용 가능합니다.",
};

export default function CustomOrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
