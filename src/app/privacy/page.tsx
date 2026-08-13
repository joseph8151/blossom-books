import { siteConfig } from "@/data/site";

export const metadata = { title: "개인정보처리방침" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
      <span className="eyebrow">Policy</span>
      <h1 className="mt-4 font-display text-[26px] font-extrabold text-navy-950">개인정보처리방침</h1>
      <p className="mt-4 text-[12.5px] text-charcoal-600">
        본 방침은 초안이며, 실제 서비스 적용 전 법률 전문가의 검토를 받는 것을 권장합니다.
      </p>

      <div className="mt-10 space-y-8 text-[14px] leading-relaxed text-charcoal-900">
        <div>
          <h2 className="font-display text-[19px] font-extrabold text-navy-950">1. 수집하는 개인정보 항목</h2>
          <p className="mt-2 text-charcoal-600">
            가맹 상담 신청 시: 이름, 연락처, 이메일, 희망 지역, 현재 직업, 교육 경력, 현재 교육사업
            운영 여부 및 운영 형태, 관심 사업 모델, 희망 시작 시기, 문의 내용
          </p>
        </div>
        <div>
          <h2 className="font-display text-[19px] font-extrabold text-navy-950">2. 수집 목적</h2>
          <p className="mt-2 text-charcoal-600">
            가맹 상담 응대, 사업 모델 안내, 지역별 운영 가능 여부 확인 및 상담 이력 관리를 위해
            개인정보를 수집합니다.
          </p>
        </div>
        <div>
          <h2 className="font-display text-[19px] font-extrabold text-navy-950">3. 보유 및 이용 기간</h2>
          <p className="mt-2 text-charcoal-600">
            수집한 개인정보는 목적 달성 후 지체 없이 파기하며, 관계 법령에 따라 보존이
            필요한 경우 해당 기간 동안 보관합니다.
          </p>
        </div>
        <div>
          <h2 className="font-display text-[19px] font-extrabold text-navy-950">4. 문의</h2>
          <p className="mt-2 text-charcoal-600">개인정보 관련 문의는 {siteConfig.email}로 연락해주세요.</p>
        </div>
      </div>
    </div>
  );
}
