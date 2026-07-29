import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "교재 찾기",
  description:
    "미국 교과과정, AP, 국제학교 입학시험, 레벨테스트, 공인 영어시험 교재를 교육과정별·시험별로 찾아보세요. 문제집과 정답·상세 해설집을 함께 제공합니다.",
};

export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
