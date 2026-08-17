// ────────────────────────────────────────────────────────────
// Blossom Books — 하루 방문자 수 이메일 리포트 Worker
//
// 매일 아침(KST 08:00)에 Cloudflare Web Analytics 데이터를 조회해
// "어제 방문자 수 / 페이지뷰 / 최근 7일 합계"를 이메일로 보냅니다.
//
// 필요한 값(배포 시 설정):
//   - CF_ACCOUNT_ID  : Cloudflare 계정 ID (wrangler.jsonc vars)
//   - CF_SITE_TAG    : Web Analytics 사이트 태그(beacon token) (wrangler.jsonc vars)
//   - CF_API_TOKEN   : "Account Analytics: Read" 권한 API 토큰 (secret)
//   - RESEND_API_KEY : Resend 이메일 발송 API 키 (secret)
//   - REPORT_TO      : 받을 이메일 주소 (secret, 기본값 yorkboy@gmail.com)
//   - REPORT_FROM    : 보내는 주소 (wrangler.jsonc vars, 예: report@blossombooks.org)
// ────────────────────────────────────────────────────────────

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(sendReport(env));
  },
  // 브라우저에서 <worker-url>/run 으로 접속하면 즉시 테스트 발송합니다.
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === "/run") {
      try {
        const msg = await sendReport(env);
        return new Response(msg, { status: 200 });
      } catch (e) {
        return new Response("Error: " + (e && e.message ? e.message : String(e)), { status: 500 });
      }
    }
    return new Response("Blossom Books visitor report worker is running. Visit /run to send a test email.", {
      status: 200,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};

// KST 기준 날짜(YYYY-MM-DD). offsetDays=-1 이면 어제.
function kstDate(offsetDays = 0) {
  const t = Date.now() + 9 * 3600 * 1000 + offsetDays * 86400000;
  return new Date(t).toISOString().slice(0, 10);
}

// Cloudflare GraphQL Analytics — 기간 내 방문(visits)·페이지뷰(count) 합계
async function fetchRange(env, geq, leq) {
  const query = `{
    viewer {
      accounts(filter: { accountTag: "${env.CF_ACCOUNT_ID}" }) {
        rumPageloadEventsAdaptiveGroups(
          filter: { date_geq: "${geq}", date_leq: "${leq}", siteTag: "${env.CF_SITE_TAG}" },
          limit: 1
        ) {
          count
          sum { visits }
        }
      }
    }
  }`;

  const res = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.CF_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  if (json.errors && json.errors.length) {
    throw new Error("Cloudflare API: " + JSON.stringify(json.errors));
  }
  const groups = json?.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups ?? [];
  const g = groups[0];
  return { visits: g?.sum?.visits ?? 0, pageviews: g?.count ?? 0 };
}

async function sendReport(env) {
  const yesterday = kstDate(-1);
  const weekAgo = kstDate(-7);

  const day = await fetchRange(env, yesterday, yesterday);
  const week = await fetchRange(env, weekAgo, yesterday);

  const subject = `[Blossom Books] ${yesterday} 방문자 ${day.visits}명`;
  const html = `
    <div style="font-family:-apple-system,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;color:#1c2c4c">
      <div style="border-bottom:2px solid #ad8a4e;padding-bottom:12px;margin-bottom:20px">
        <div style="font-size:12px;letter-spacing:1px;color:#ad8a4e;text-transform:uppercase">Blossom Books · Daily Report</div>
        <div style="font-size:20px;font-weight:700;margin-top:4px">${yesterday} 방문 리포트</div>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:14px;background:#f5efe2;border:1px solid #e2d8c2">
            <div style="font-size:12px;color:#524f45">어제 방문자(Visits)</div>
            <div style="font-size:28px;font-weight:700;color:#131f38">${day.visits.toLocaleString()}명</div>
          </td>
          <td style="width:12px"></td>
          <td style="padding:14px;background:#f5efe2;border:1px solid #e2d8c2">
            <div style="font-size:12px;color:#524f45">어제 페이지뷰</div>
            <div style="font-size:28px;font-weight:700;color:#131f38">${day.pageviews.toLocaleString()}</div>
          </td>
        </tr>
      </table>
      <div style="margin-top:16px;padding:14px;background:#131f38;color:#faf7f0;border-radius:4px">
        <div style="font-size:12px;color:#c4a568">최근 7일 (${weekAgo} ~ ${yesterday})</div>
        <div style="font-size:15px;margin-top:4px">방문자 ${week.visits.toLocaleString()}명 · 페이지뷰 ${week.pageviews.toLocaleString()}</div>
      </div>
      <p style="font-size:11px;color:#8a8577;margin-top:20px">
        Cloudflare Web Analytics 기준(쿠키·개인정보 없이 집계). 더 자세한 통계는 Cloudflare 대시보드 > Web Analytics 에서 확인하세요.
      </p>
    </div>`;

  const emailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.REPORT_FROM,
      to: env.REPORT_TO || "yorkboy@gmail.com",
      subject,
      html,
    }),
  });

  if (!emailRes.ok) {
    const err = await emailRes.text();
    throw new Error("Resend send failed: " + err);
  }
  return `sent: ${subject}`;
}
