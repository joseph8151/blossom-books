"use client";

import { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { AlertCircle, CheckCircle2, Loader2, MessageCircle, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

// 클라이언트에서 노출되어도 안전한 공개 키. 서버 시크릿(PAYPAL_CLIENT_SECRET)은 별도로 관리합니다.
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

type PayPalCheckoutProps = {
  /** 결제 금액(USD). 상품 데이터의 priceUSD 기준. */
  amountUSD: number;
  /** PayPal 주문 설명에 표시할 상품명(영문). */
  productTitle: string;
};

export default function PayPalCheckout({ amountUSD, productTitle }: PayPalCheckoutProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [orderRef, setOrderRef] = useState<string | null>(null);

  // NEXT_PUBLIC_PAYPAL_CLIENT_ID가 없으면 실제 버튼 대신 안내 문구를 표시합니다.
  if (!PAYPAL_CLIENT_ID) {
    return <MissingClientIdNotice />;
  }

  if (status === "success") {
    return <SuccessNotice orderRef={orderRef} />;
  }

  return (
    <div className="space-y-4">
      <PayPalScriptProvider
        options={{
          clientId: PAYPAL_CLIENT_ID,
          currency: "USD",
          intent: "capture",
          components: "buttons",
        }}
      >
        <ScriptStatus />
        <PayPalButtons
          style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
          // 금액이나 상품이 바뀌면 버튼을 다시 렌더링해 최신 주문 정보를 반영합니다.
          forceReRender={[amountUSD, productTitle]}
          createOrder={(_data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  // PayPal 설명 필드는 127자 제한이 있습니다.
                  description: productTitle.slice(0, 127),
                  amount: {
                    currency_code: "USD",
                    value: amountUSD.toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            // 클라이언트에서 결제를 캡처합니다.
            const details = await actions.order?.capture();

            // ────────────────────────────────────────────────────────────
            // TODO(백엔드 미구축): 결제 승인 후 반드시 서버에서 재검증해야 합니다.
            //   1) 이 시점에는 orderID(data.orderID)만 서버로 전달하고,
            //   2) 서버가 PAYPAL_CLIENT_SECRET로 GET /v2/checkout/orders/{orderID}를
            //      호출해 금액(amount)·통화(currency)·상품·상태(COMPLETED)를 재검증한 뒤,
            //   3) 주문을 확정하고 PDF 교재 발송을 트리거하세요.
            //   클라이언트에서 넘어온 amountUSD 등은 위변조 가능하므로 신뢰하면 안 됩니다.
            //   운영 시 Sandbox / Live 클라이언트 ID를 환경변수로 분리하세요.
            // ────────────────────────────────────────────────────────────

            setOrderRef(details?.id ?? data.orderID ?? null);
            setStatus("success");
          }}
          onError={(err) => {
            console.error("PayPal Checkout error:", err);
            setErrorMsg(
              "There was a problem processing your payment. Please try again or contact us via KakaoTalk / email."
            );
            setStatus("error");
          }}
        />
      </PayPalScriptProvider>

      {status === "error" && errorMsg && (
        <p className="flex items-start gap-2 text-[13px] leading-relaxed text-burgundy-700">
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          {errorMsg}
        </p>
      )}
    </div>
  );
}

/** PayPal 스크립트 로딩 상태 표시 */
function ScriptStatus() {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className="flex items-center gap-2 py-3 text-[13px] text-charcoal-600">
        <Loader2 size={15} className="animate-spin" />
        Loading secure PayPal checkout…
      </div>
    );
  }

  if (isRejected) {
    return (
      <p className="flex items-start gap-2 py-2 text-[13px] leading-relaxed text-burgundy-700">
        <AlertCircle size={15} className="mt-0.5 shrink-0" />
        Could not load PayPal. Please refresh the page or contact us via KakaoTalk / email.
      </p>
    );
  }

  return null;
}

/** 환경변수 미설정 시 안내 */
function MissingClientIdNotice() {
  return (
    <div className="border border-brass-500/40 bg-ivory-200/50 p-5">
      <p className="flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">
        <AlertCircle size={14} /> Card payment setup in progress
      </p>
      <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">
        Online PayPal checkout is being configured. To complete your order right now,
        please reach out and we&apos;ll send you a secure PayPal invoice.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-navy-900 px-5 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={15} /> Chat on KakaoTalk
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="inline-flex items-center justify-center gap-2 border border-navy-800/25 px-5 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
        >
          <Mail size={15} /> Email us
        </a>
      </div>
      {/* 개발자 참고: 실제 결제를 활성화하려면 NEXT_PUBLIC_PAYPAL_CLIENT_ID를 설정하세요. */}
    </div>
  );
}

/** 결제 승인 후 안내 (서버 재검증 전 임시 완료 화면) */
function SuccessNotice({ orderRef }: { orderRef: string | null }) {
  return (
    <div className="border border-navy-800/15 bg-ivory-200/40 p-6">
      <p className="flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">
        <CheckCircle2 size={14} /> Payment received
      </p>
      <h3 className="mt-2 font-display text-[20px] font-semibold text-navy-950">
        Thank you — your payment was approved.
      </h3>
      <p className="mt-3 text-[13.5px] leading-relaxed text-charcoal-600">
        Your PDF materials will be sent to the email address linked to your PayPal
        account after we verify the payment.
        {orderRef ? (
          <>
            {" "}
            Order reference: <span className="font-mono text-charcoal-900">{orderRef}</span>.
          </>
        ) : null}
      </p>
      <p className="mt-3 text-[12.5px] leading-relaxed text-charcoal-600">
        Questions about delivery? Contact us via KakaoTalk or email.
      </p>
    </div>
  );
}
