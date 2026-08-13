import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "JOHN EDUCATION GROUP 가맹 상담 전 자주 묻는 질문 — 창업 비용, 운영 형태, 기존 학원 전환, 프로그램 추가 등.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
