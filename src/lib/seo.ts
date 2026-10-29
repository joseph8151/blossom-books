import { Product } from "./types";

// 상품 페이지 전용 검색결과 <title>/설명문 자동 생성.
//
// product.seoTitle / product.seoDescription이 채워져 있으면 그 값을 그대로
// 씁니다(노출이 많은 핵심 상품만 수동으로 다듬는 override 통로). 없으면 이
// 함수가 titleKo·examOrCurriculum·gradeRange·subject·units 같은 실제 상품
// 데이터로부터 매번 다시 생성합니다 — 상품이 추가돼도 손대지 않아도 됩니다.
//
// 네이버 서치어드바이저 권장: 제목 40자·설명 80자 이내(layout.tsx 상단 주석
// 참고). 실제 시험명이 길면(AP Comparative Government and Politics 등) 억지로
// 줄여 부정확한 이름을 만들지 않고, 권장 길이를 다소 넘기더라도 정확한 이름을
// 그대로 씁니다.

const BRAND = "블러섬북스";

// titleKo에서 "(G6–8)"·"(Elementary)" 같은 꼬리 설명과 "개념+문제집"·
// "실전 문제집" 같은 상품유형 접미어를 떼어내, 시험/과목의 짧은 이름만 남깁니다.
function shortExamName(product: Product): string {
  let s = product.titleKo;
  s = s.replace(/\s*\([^)]*\)\s*$/, "");
  s = s.replace(/개념\+?\s*문제집/g, " ").replace(/문제집/g, " ");
  s = s.replace(/\s*(대비|실전|종합|예상)\s*$/, "");
  return s.replace(/\s+/g, " ").trim();
}

// "Grade 8–9" → "G8-9", "Grade 1" → "G1". 숫자로 깔끔히 안 떨어지는 범위
// (만 9–10세, 성인, G2 – G9 (학년별 제공) 등)는 제목에서 생략합니다 —
// 틀리게 단순화하는 것보다 아예 안 쓰는 편이 정확합니다.
function shortGrade(gradeRange: string): string | null {
  const m = gradeRange.match(/^Grade\s+(\d+)(?:[–-](\d+))?$/);
  if (!m) return null;
  return m[2] ? `G${m[1]}-${m[2]}` : `G${m[1]}`;
}

// "Math & Reading & Language" → "Math·Reading" (앞 2개만, 너무 길어지지 않도록)
function shortSubject(subject: string): string {
  return subject
    .split(/\s*&\s*/)
    .filter(Boolean)
    .slice(0, 2)
    .join("·");
}

export interface ProductSeo {
  title: string;
  description: string;
}

export function buildProductSeo(product: Product): ProductSeo {
  if (product.seoTitle || product.seoDescription) {
    return {
      title: product.seoTitle ?? product.titleKo,
      description: product.seoDescription ?? product.summaryKo,
    };
  }

  const exam = shortExamName(product);
  const grade = shortGrade(product.gradeRange);
  const subjectPart = shortSubject(product.subject);
  // 과목명이 시험명에 이미 들어있으면("AP US History" vs "History") 다시
  // 적지 않습니다 — 키워드 나열처럼 보이는 것을 피하기 위해서입니다.
  const redundant = exam.toLowerCase().includes(subjectPart.toLowerCase().split("·")[0].toLowerCase());

  const gradeSeg = grade ? ` ${grade}` : "";
  const title = redundant
    ? `${exam} 문제집${gradeSeg} 실전 대비 - ${BRAND}`
    : `${exam} 문제집${gradeSeg} | ${subjectPart} 실전 대비 - ${BRAND}`;

  const firstUnit = product.units[0] ?? "";
  const description = `${exam}${grade ? ` ${grade}` : ""} 대비 문제집. ${firstUnit} 실전 연습 + 상세 해설.`;

  return { title, description };
}
