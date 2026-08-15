// 추천 결과를 카카오톡 상담으로 넘길 때 쓰는 클립보드 헬퍼.
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
