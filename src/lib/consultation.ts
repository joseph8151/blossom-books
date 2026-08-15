// 추천 결과를 카카오톡 상담으로 이어 붙이는 공통 로직.
// 추천마다 짧은 상담코드를 만들어 화면 · 팀 메일 · 카카오 메시지에 함께 실어,
// 상담 담당자가 들어온 채팅을 자동 발송된 추천 요약과 대조할 수 있게 합니다.

// 육안으로 헷갈리는 I·O·0·1 은 제외 (전화·채팅으로 불러줄 수 있어야 함)
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function makeInquiryCode(): string {
  const buf = new Uint8Array(4);
  crypto.getRandomValues(buf);
  return `BL-${Array.from(buf, (b) => CODE_CHARS[b % CODE_CHARS.length]).join("")}`;
}

// 복사 성공 여부를 실제로 돌려줍니다. (실패 시 화면에서 직접 복사할 수 있게 안내)
export async function copyText(text: string): Promise<boolean> {
  try {
    if (!navigator.clipboard?.writeText) return false;
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
