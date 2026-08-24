"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// 서버 컴포넌트(페이지)에서 마운트 시점에 한 번 view 이벤트를 보내기 위한
// 얇은 클라이언트 래퍼입니다. 화면에는 아무것도 렌더링하지 않습니다.
export default function TrackView({
  event,
  params,
}: {
  event: string;
  params?: Record<string, string | number | boolean | undefined>;
}) {
  useEffect(() => {
    trackEvent(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
  return null;
}
