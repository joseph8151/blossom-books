export interface Review {
  quote: string; // 후기 내용
  author: string; // 예: "학부모 K님", "○○ 어학원 원장"
  context: string; // 예: "국제학교 편입 대비", "AP Biology"
}

// ⚠️ 실제 고객 후기만 등록하세요. 가짜 후기는 신뢰에 오히려 해가 되고 위험합니다.
// 아래 배열에 후기를 추가하면 홈페이지에 후기 섹션이 자동으로 나타납니다.
//
// 예시)
// { quote: "정답만이 아니라 오답 이유까지 설명돼 있어 혼자 복습하기 좋았어요.",
//   author: "학부모 K님", context: "Algebra 1 · 국제학교 편입 대비" },
export const reviews: Review[] = [];
