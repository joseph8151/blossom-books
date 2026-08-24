// Lightweight event tracking shim.
//
// No GA4/analytics account is wired up yet — calling trackEvent() now is
// free (it's a no-op besides a dev console log) and means every funnel
// step already fires the moment gtag.js is added to layout.tsx, with no
// other code changes needed.
//
// Funnel this is meant to support:
//   view_product_list → select_product → view_product → click_sample
//   → click_order → click_kakao / click_recommendation → select_page_option

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: EventParams): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
    return;
  }
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", name, params);
  }
}
