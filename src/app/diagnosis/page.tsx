import LearningTypeQuiz from "@/components/home/LearningTypeQuiz";

export const metadata = {
  title: "학습 유형 진단",
  description:
    "학년·고민·걱정되는 영역·시험까지 남은 기간·목표 5가지 질문에 답하면 우리 아이의 학습 유형을 바로 확인할 수 있습니다. 결과에 맞는 추천 구성은 카카오톡 상담에서 안내해 드립니다.",
};

export default function DiagnosisPage() {
  return <LearningTypeQuiz />;
}
