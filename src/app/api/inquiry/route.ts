import { NextResponse } from "next/server";

// 문의 접수 → Web3Forms로 전달(무료). 수신 메일 주소는 Web3Forms에 등록된 주소로 가며,
// 이 코드/클라이언트에는 개인 수신 메일(gmail)이 노출되지 않습니다. 서버 환경변수만 사용합니다.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  // 키가 설정되지 않았으면 클라이언트가 메일 앱(mailto)으로 대체하도록 알립니다.
  if (!accessKey) {
    return NextResponse.json({ ok: false, reason: "not_configured" });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "[블러섬북스] 웹사이트 상담·주문 문의",
        from_name: "블러섬북스 웹사이트",
        ...payload,
      }),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean };
    return NextResponse.json({ ok: res.ok && json.success !== false });
  } catch {
    return NextResponse.json({ ok: false, reason: "network_error" }, { status: 502 });
  }
}
