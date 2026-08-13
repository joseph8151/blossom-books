"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { businessModels } from "@/data/john";

const interestedModelOptions = [...businessModels.map((m) => m.code), "아직 모르겠습니다"];

const timelineOptions = ["가능한 빨리", "1~3개월", "3~6개월", "6개월 이후", "정보 수집 중"];

const operatingOptions = [
  { value: "yes", label: "운영 중" },
  { value: "no", label: "운영하지 않음" },
];

const fieldClass =
  "w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-[14px] text-charcoal-900 outline-none focus:border-coral-500";
const labelClass = "block text-[13.5px] font-medium text-navy-950 mb-2";

export default function ConsultationPage() {
  const [interestedModels, setInterestedModels] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [operating, setOperating] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [viaMail, setViaMail] = useState(false);
  const [consent, setConsent] = useState(false);

  function toggleModel(code: string) {
    setInterestedModels((prev) => (prev.includes(code) ? prev.filter((m) => m !== code) : [...prev, code]));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const val = (k: string) => ((fd.get(k) as string) || "").trim() || "-";

    const fields: Record<string, string> = {
      이름: val("name"),
      연락처: val("contact"),
      이메일: val("email"),
      희망지역: val("region"),
      현재직업: val("occupation"),
      교육경력: val("teachingExperience"),
      현재교육사업운영여부: operating === "yes" ? "운영 중" : operating === "no" ? "운영하지 않음" : "-",
      현재운영형태: val("currentOperationType"),
      관심모델: interestedModels.length ? interestedModels.join(", ") : "-",
      희망시작시기: timeline ?? "-",
      문의내용: val("message"),
    };

    setSubmitting(true);

    const web3Key = siteConfig.web3formsAccessKey;
    if (web3Key) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject: "[JOHN EDUCATION GROUP] 가맹 상담 신청",
            from_name: "JOHN EDUCATION GROUP 웹사이트",
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

    const body = ["■ 가맹 상담 신청", "", ...Object.entries(fields).map(([k, v]) => `· ${k}: ${v}`)].join("\n");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      "[JOHN EDUCATION GROUP] 가맹 상담 신청"
    )}&body=${encodeURIComponent(body)}`;
    setViaMail(true);
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center lg:px-8">
        <span className="eyebrow eyebrow--center">Submitted</span>
        <h1 className="mt-4 font-display text-[28px] font-extrabold text-navy-950 sm:text-[32px]">
          {viaMail ? "신청 내용이 준비되었습니다." : "가맹 상담 신청이 접수되었습니다."}
        </h1>
        <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
          {viaMail
            ? "이메일 작성 창이 열립니다. 내용을 확인하고 그대로 보내주시면 접수됩니다."
            : "전달해주신 내용을 확인한 후 희망 지역과 사업 모델에 맞춰 상담 방법을 안내드립니다."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
      <span className="eyebrow">Consultation</span>
      <h1 className="mt-4 text-balance font-display text-[28px] font-extrabold leading-[1.25] text-navy-950 sm:text-[34px]">
        Find Your JOHN Business Model.
      </h1>
      <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-charcoal-600">
        현재 상황과 희망하는 교육사업 형태를 알려주시면, 나에게 맞는 JOHN Business Model과
        창업 조건을 상담해드립니다.
      </p>

      <form onSubmit={handleSubmit} className="mt-12 space-y-10">
        <div className="rounded-3xl bg-ivory-100 p-6 sm:p-8">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-navy-900/60">연락처</p>
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

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>희망 지역</label>
            <input name="region" className={fieldClass} placeholder="예: 서울 서초구" />
          </div>
          <div>
            <label className={labelClass}>현재 직업</label>
            <input name="occupation" className={fieldClass} placeholder="예: 영어학원 강사, 과외 선생님" />
          </div>
          <div>
            <label className={labelClass}>교육 경력</label>
            <input name="teachingExperience" className={fieldClass} placeholder="예: 5년, 경력 없음" />
          </div>
          <div>
            <label className={labelClass}>현재 운영 형태</label>
            <input name="currentOperationType" className={fieldClass} placeholder="예: 공부방, 교습소, 학원, 없음" />
          </div>
        </div>

        <div>
          <label className={labelClass}>현재 교육사업을 운영하고 계신가요?</label>
          <div className="flex flex-wrap gap-2">
            {operatingOptions.map((o) => (
              <button
                type="button"
                key={o.value}
                onClick={() => setOperating(o.value)}
                className={`rounded-full px-5 py-2.5 text-[13.5px] font-medium border transition-colors ${
                  operating === o.value
                    ? "border-navy-900 bg-navy-900 text-ivory-100"
                    : "border-navy-900/20 text-charcoal-600 hover:border-navy-900/40"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>관심 모델 (복수 선택 가능)</label>
          <div className="flex flex-wrap gap-2">
            {interestedModelOptions.map((code) => (
              <button
                type="button"
                key={code}
                onClick={() => toggleModel(code)}
                className={`rounded-full px-4 py-2.5 text-[13px] font-medium border transition-colors ${
                  interestedModels.includes(code)
                    ? "border-coral-500 bg-coral-500/10 text-navy-900"
                    : "border-navy-900/20 text-charcoal-600 hover:border-navy-900/40"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>희망 시작 시기</label>
          <div className="flex flex-wrap gap-2">
            {timelineOptions.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTimeline(t)}
                className={`rounded-full px-4 py-2.5 text-[13px] font-medium border transition-colors ${
                  timeline === t
                    ? "border-navy-900 bg-navy-900 text-ivory-100"
                    : "border-navy-900/20 text-charcoal-600 hover:border-navy-900/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>문의 내용</label>
          <textarea name="message" rows={4} className={fieldClass} placeholder="자유롭게 작성해주세요" />
        </div>

        <label className="flex items-start gap-3 text-[13px] text-charcoal-600">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          가맹 상담을 위한 개인정보 수집 및 이용에 동의합니다.
        </label>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary group px-8 py-4 text-[15px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "접수 중…" : "무료 가맹 상담 신청"}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
