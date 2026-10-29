"use client";

import { useState } from "react";
import { MessageCircle, Copy } from "lucide-react";
import { siteConfig } from "@/data/site";

// 실제 결제·주문은 이 사이트에서 처리하지 않습니다(카카오톡 상담 후 진행).
// 이 폼은 서버로 전송되지 않으며, 입력한 내용을 카카오톡에 붙여넣기 쉬운
// 메시지로 정리해 클립보드에 복사한 뒤 채널을 열어 줍니다.
const VOLUME_OPTIONS = ["100P", "200P", "아직 모르겠어요"] as const;
const LEVEL_OPTIONS = ["SL", "HL", "아직 모르겠어요"] as const;

export default function InquiryForm() {
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState<string>(LEVEL_OPTIONS[2]);
  const [progress, setProgress] = useState("");
  const [weakUnit, setWeakUnit] = useState("");
  const [volume, setVolume] = useState<string>(VOLUME_OPTIONS[2]);
  const [extra, setExtra] = useState("");
  const [copied, setCopied] = useState(false);

  function buildMessage(): string {
    const lines = ["안녕하세요. IB 교재 문의드립니다.", ""];
    if (subject) lines.push(`과목: ${subject}`);
    lines.push(`SL / HL: ${level}`);
    if (progress) lines.push(`현재 진도: ${progress}`);
    if (weakUnit) lines.push(`어려운 Unit: ${weakUnit}`);
    lines.push(`분량: ${volume}`);
    if (extra) lines.push(`추가 요청사항: ${extra}`);
    return lines.join("\n");
  }

  function handleSubmit() {
    try {
      navigator.clipboard?.writeText(buildMessage());
      setCopied(true);
    } catch {
      /* 클립보드 미지원 환경은 무시 */
    }
    window.open(siteConfig.kakaoChannelUrl, "_blank", "noopener,noreferrer");
  }

  const inputCls =
    "mt-1.5 w-full border border-ivory-300 bg-white px-3 py-2.5 text-[13px] text-charcoal-900 outline-none focus:border-navy-800/50";
  const labelCls = "font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60";

  return (
    <section id="inquiry" className="mt-16 scroll-mt-20 border-t border-ivory-300 pt-12">
      <h2 className="font-display text-[22px] font-semibold text-navy-950 sm:text-[26px]">IB 교재 문의하기</h2>
      <p className="mt-2 max-w-[600px] text-[13.5px] leading-relaxed text-charcoal-600">
        아래 내용을 채우시면 카카오톡에 바로 붙여넣을 수 있는 문의 메시지로 정리해 드립니다. 이 페이지에서
        결제가 진행되지는 않습니다.
      </p>

      <div className="mt-6 grid max-w-[640px] gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>과목</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="예: Math AA, Biology"
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className={labelCls}>SL / HL</span>
          <select value={level} onChange={(e) => setLevel(e.target.value)} className={inputCls}>
            {LEVEL_OPTIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>100P / 200P</span>
          <select value={volume} onChange={(e) => setVolume(e.target.value)} className={inputCls}>
            {VOLUME_OPTIONS.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className={labelCls}>현재 진도</span>
          <input
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            placeholder="예: Functions 단원까지 학습"
            className={inputCls}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className={labelCls}>어려운 Unit</span>
          <input
            value={weakUnit}
            onChange={(e) => setWeakUnit(e.target.value)}
            placeholder="예: Calculus, Statistics"
            className={inputCls}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className={labelCls}>추가 요청사항</span>
          <textarea
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            rows={3}
            placeholder="예: Calculus 비중을 높여 주세요"
            className={`${inputCls} resize-none`}
          />
        </label>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
      >
        <MessageCircle size={16} /> IB 교재 문의하기
      </button>
      {copied && (
        <p className="mt-2.5 flex items-center gap-1.5 text-[11.5px] text-brass-500">
          <Copy size={12} /> 문의 내용이 복사되었습니다. 카카오톡 채팅창에 붙여넣어 주세요.
        </p>
      )}
    </section>
  );
}
