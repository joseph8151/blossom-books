"use client";

import { useState } from "react";
import { MessageCircle, Copy, AlertTriangle } from "lucide-react";
import { siteConfig } from "@/data/site";

// 오류 신고 — 백엔드 폼 대신, 필요한 정보를 담은 카카오톡 메시지를 복사해 공식 채널로 연결합니다.
export default function ErrorReport({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function report() {
    const msg = [
      "[오류 신고] Blossom Books",
      `상품 코드: ${code}`,
      "페이지 번호: ",
      "문항 번호: ",
      "오류 유형: (문항 / 정답 / 해설 / 오탈자 / 페이지 누락 / 파일 문제)",
      "설명: ",
      "(가능하면 해당 부분 스크린샷을 함께 보내주세요)",
    ].join("\n");
    try {
      navigator.clipboard?.writeText(msg);
      setCopied(true);
    } catch {}
    window.open(siteConfig.kakaoChatUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="border border-navy-800/12 bg-ivory-200/40 p-6">
      <div className="flex items-center gap-2.5">
        <AlertTriangle size={18} className="text-brass-500" />
        <h2 className="font-display text-[18px] font-semibold text-navy-950">오류를 발견하셨나요?</h2>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-charcoal-600">
        상품 코드·페이지 번호·문항을 (가능하면 스크린샷과 함께) 보내주시면, Blossom Books 측의 명확한 오류로
        확인되는 경우 구매 건당 최대 2회까지 교정·수정된 파일을 안내해 드립니다.
      </p>
      <button
        onClick={report}
        className="mt-4 inline-flex items-center gap-2 bg-navy-900 px-5 py-2.5 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
      >
        <MessageCircle size={15} /> 오류 신고하기
      </button>
      {copied && (
        <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-brass-500">
          <Copy size={12} /> 신고 양식이 복사되었습니다. 카카오톡에 붙여넣어 내용을 채워주세요.
        </p>
      )}
    </div>
  );
}
