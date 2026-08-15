"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { CustomerType } from "@/lib/types";

const customerTypes: { value: CustomerType; label: string }[] = [
  { value: "individual", label: "개인" },
  { value: "tutor", label: "과외 선생님" },
  { value: "academy", label: "학원" },
  { value: "prep-academy", label: "프랩학원" },
  { value: "institution", label: "교육기관" },
];

const fieldClass =
  "w-full border border-navy-800/20 bg-ivory-100 px-4 py-3 text-[14px] text-charcoal-900 outline-none focus:border-navy-800/50";
const labelClass = "block text-[13.5px] font-medium text-navy-950 mb-2";

export default function CustomOrderPage() {
  const [customerType, setCustomerType] = useState<CustomerType>("individual");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [viaMail, setViaMail] = useState(false); // 서버 접수 실패 시 메일 앱으로 대체되었는지
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const val = (k: string) => ((fd.get(k) as string) || "").trim() || "-";
    const typeLabel = customerTypes.find((c) => c.value === customerType)?.label ?? customerType;

    const fields: Record<string, string> = {
      고객유형: typeLabel,
      과목: val("subject"),
      "시험/교육과정": val("examOrCurriculum"),
      학생학년: val("grade"),
      현재레벨: val("currentLevel"),
      필요한교재: val("materialType"),
      예상분량: val("expectedPageCount"),
      문제유형: val("questionTypes"),
      사용목적: val("purpose"),
      희망완료시기: val("desiredCompletion"),
      추가요청: val("additionalNotes"),
      이름: val("name"),
      연락처: val("contact"),
      이메일: val("email"),
    };

    setSubmitting(true);

    // 1) 폼서비스(Web3Forms)로 직접 접수 — 수신 메일 주소는 Web3Forms에만 저장되고 화면엔 노출되지 않습니다.
    //    (정적 배포 환경이라 서버 없이 클라이언트에서 전송합니다. access_key는 공개용 키입니다.)
    const web3Key = siteConfig.web3formsAccessKey;
    if (web3Key) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject: "[블러섬북스] 주문 제작 상담 신청",
            from_name: "블러섬북스 웹사이트",
            ...fields,
          }),
        });
        const json = (await res.json().catch(() => ({ success: false }))) as { success?: boolean };
        if (json.success) {
          setSubmitting(false);
          setSubmitted(true);
          return;
        }
      } catch {
        /* 아래 메일 앱 방식으로 대체 */
      }
    }

    // 2) 대체: 이메일 앱(mailto)으로 접수 내용을 전달(수신: 공개용 브랜드 이메일)
    const body = ["■ 주문 제작 상담 신청", "", ...Object.entries(fields).map(([k, v]) => `· ${k}: ${v}`)].join("\n");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      "[블러섬북스] 주문 제작 상담 신청"
    )}&body=${encodeURIComponent(body)}`;
    setViaMail(true);
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center lg:px-8">
        <p className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">Submitted</p>
        <h1 className="mt-3 font-display text-[30px] font-semibold text-navy-950">
          {viaMail ? "신청 내용이 준비되었습니다." : "문의가 접수되었습니다."}
        </h1>
        <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
          {viaMail
            ? "이메일 작성 창이 열립니다. 내용을 확인하고 그대로 보내주시면 접수됩니다. 창이 열리지 않으면 카카오톡으로 편하게 문의해 주세요."
            : "전달해주신 내용을 확인한 후 제작 가능 범위와 상담 방법을 안내드립니다. 더 빠른 상담은 카카오톡을 이용해 주세요."}
        </p>
        <a
          href={siteConfig.kakaoChatUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 빠르게 상담하기
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Custom order</p>
      <h1 className="mt-3 font-display text-[28px] font-semibold text-navy-950 sm:text-[33px]">
        주문 제작 상담
      </h1>
      <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-charcoal-600">
        원하시는 학년, 시험, 수업 목적을 편하게 알려주세요. 확인 후 제작 가능 범위와 일정을
        상담해드립니다.
      </p>

      <form onSubmit={handleSubmit} className="mt-12 space-y-10">
        {/* 고객 유형 */}
        <div>
          <label className={labelClass}>고객 유형</label>
          <div className="flex flex-wrap gap-2">
            {customerTypes.map((c) => (
              <button
                type="button"
                key={c.value}
                onClick={() => setCustomerType(c.value)}
                className={`px-4 py-2.5 text-[13.5px] font-medium border transition-colors ${
                  customerType === c.value
                    ? "border-navy-900 bg-navy-900 text-ivory-100"
                    : "border-navy-800/20 text-charcoal-600 hover:border-navy-800/40"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>과목</label>
            <input name="subject" className={fieldClass} placeholder="예: 수학, 리딩, 문법" />
          </div>
          <div>
            <label className={labelClass}>시험 또는 교육과정</label>
            <input name="examOrCurriculum" className={fieldClass} placeholder="예: AP Biology, CAT4, 자체 레벨테스트" />
          </div>
          <div>
            <label className={labelClass}>학생 학년</label>
            <input name="grade" className={fieldClass} placeholder="예: 초등 5학년, Grade 9" />
          </div>
          <div>
            <label className={labelClass}>현재 레벨</label>
            <input name="currentLevel" className={fieldClass} placeholder="예: 상위권, SR 5.0" />
          </div>
          <div>
            <label className={labelClass}>필요한 교재 종류</label>
            <input name="materialType" className={fieldClass} placeholder="예: 문제집+해설집, 모의고사" />
          </div>
          <div>
            <label className={labelClass}>예상 분량</label>
            <input name="expectedPageCount" className={fieldClass} placeholder="예: 40페이지" />
          </div>
        </div>

        <div>
          <label className={labelClass}>필요한 문제 유형</label>
          <input name="questionTypes" className={fieldClass} placeholder="예: 객관식 위주, 서술형 포함, 자료 해석형" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>사용 목적</label>
            <input name="purpose" className={fieldClass} placeholder="예: 정규 수업용, 레벨테스트 대비" />
          </div>
          <div>
            <label className={labelClass}>희망 완료 시기</label>
            <input name="desiredCompletion" className={fieldClass} placeholder="예: 2주 이내, 다음 학기 전까지" />
          </div>
        </div>

        <div>
          <label className={labelClass}>추가 요청사항</label>
          <textarea name="additionalNotes" rows={4} className={fieldClass} placeholder="자유롭게 작성해주세요" />
        </div>

        <div className="border-t border-navy-800/12 pt-8">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-navy-800/70">연락처</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            <div>
              <label className={labelClass}>이름</label>
              <input name="name" required className={fieldClass} placeholder="이름" />
            </div>
            <div>
              <label className={labelClass}>연락처</label>
              <input name="contact" required className={fieldClass} placeholder="010-0000-0000" />
            </div>
            <div>
              <label className={labelClass}>이메일</label>
              <input name="email" type="email" required className={fieldClass} placeholder="name@example.com" />
            </div>
          </div>
        </div>

        <label className="flex items-start gap-3 text-[13px] text-charcoal-600">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          문의 상담을 위한 개인정보 수집 및 이용에 동의합니다.
        </label>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-navy-900 px-8 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "접수 중…" : "제작 상담 신청하기"}
          </button>
          <a
            href={siteConfig.kakaoChatUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-navy-800/25 px-8 py-3.5 text-[14px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
          >
            <MessageCircle size={16} />
            카카오톡으로 바로 상담하기
          </a>
        </div>
      </form>
    </div>
  );
}
