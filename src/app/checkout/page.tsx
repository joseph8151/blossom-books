import { Suspense } from "react";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";

export const metadata = {
  title: "주문 / 결제",
  description: "국내 계좌이체 또는 해외 PayPal로 블러섬북스 교재를 결제할 수 있습니다.",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutFlow />
    </Suspense>
  );
}
