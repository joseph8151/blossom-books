import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "가맹 상담 신청",
  description:
    "JOHN EDUCATION GROUP 가맹 상담 신청 — 희망 지역, 관심 사업 모델, 현재 운영 형태를 알려주시면 나에게 맞는 JOHN 사업 모델을 상담해드립니다.",
};

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
