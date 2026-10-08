"use client";

import { useState } from "react";
import { Check, MessageCircle, Send } from "lucide-react";
import { siteConfig } from "@/data/site";

const packageOptions = ["Standard", "Premium", "Signature", "상담 후 결정"];

// 이 폼은 짙은 navy 배경(FinalConsultSection) 위에서만 쓰이므로 라벨은 밝은
// 톤, 입력창은 밝은 배경으로 대비를 유지합니다.
const fieldCls =
  "w-full border border-ivory-100/20 bg-ivory-100 px-4 py-3 text-[13.5px] text-charcoal-900 outline-none focus:border-ivory-100/50";
const labelCls = "text-[12px] font-medium text-ivory-200/80";

// Formspree 엔드포인트가 아직 발급되지 않은 동안에는(siteConfig.admissionPackageFormspreeUrl
// 가 빈 문자열) 폼 구조와 항목은 그대로 제공하면서 제출만 막고, 카카오톡 상담으로
// 안내합니다. 실제 Formspree 폼 ID가 생기면 Cloudflare 환경변수
// NEXT_PUBLIC_FORMSPREE_ADMISSION_URL에 "https://formspree.io/f/xxxxxxx" 형태로
// 넣기만 하면 바로 연결됩니다.
export default function ConsultationForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const endpoint = siteConfig.admissionPackageFormspreeUrl;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint) {
      setError(true);
      return;
    }
    setSending(true);
    setError(false);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-2 py-10 text-center">
        <Check size={22} className="text-[#aab79c]" strokeWidth={2.4} />
        <p className="text-[14.5px] font-medium text-ivory-100">상담 요청이 접수되었습니다.</p>
        <p className="text-[13px] text-ivory-200/85">지원 학교와 학년을 확인한 뒤 안내드리겠습니다.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 grid max-w-[640px] gap-4 text-left sm:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>학부모 이름</label>
        <input required name="parentName" type="text" className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>연락처</label>
        <input required name="phone" type="tel" className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className={labelCls}>이메일</label>
        <input required name="email" type="email" className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>지원 학교</label>
        <input name="targetSchool" type="text" className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>지원 국가</label>
        <input name="targetCountry" type="text" className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>지원 학년</label>
        <input name="targetGrade" type="text" className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>현재 학년</label>
        <input name="currentGrade" type="text" className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>현재 학교</label>
        <input name="currentSchool" type="text" className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>시험 예정일</label>
        <input name="examDate" type="text" placeholder="예: 2027년 1월" className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>SR 또는 Reading Level</label>
        <input name="readingLevel" type="text" className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>Math 진도</label>
        <input name="mathProgress" type="text" className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>Writing 수준</label>
        <input name="writingLevel" type="text" className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>Interview 경험</label>
        <input name="interviewExperience" type="text" className={fieldCls} />
      </div>
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className={labelCls}>희망 패키지</label>
        <select name="desiredPackage" defaultValue="상담 후 결정" className={fieldCls}>
          {packageOptions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className={labelCls}>기타 요청사항</label>
        <textarea name="notes" rows={4} className={`${fieldCls} resize-none`} />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex w-full items-center justify-center gap-2 bg-navy-950 px-7 py-4 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-900 disabled:opacity-50 sm:w-auto"
        >
          <Send size={15} />
          {sending ? "전송 중..." : "학교별 Admission Package 상담하기"}
        </button>
        {error && (
          <p className="mt-3 text-[12.5px] leading-relaxed text-ivory-200/80">
            {endpoint
              ? "전송 중 문제가 발생했습니다. 다시 시도하시거나 아래 카카오톡으로 문의해 주세요."
              : "폼 연결 준비 중입니다. 아래 카카오톡으로 문의해 주시면 바로 안내드립니다."}
            {" "}
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-ivory-100 underline decoration-[#aab79c] decoration-2 underline-offset-4"
            >
              <MessageCircle size={13} />
              카카오톡 상담
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
