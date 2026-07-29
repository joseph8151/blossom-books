import { Suspense } from "react";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutFlow />
    </Suspense>
  );
}
