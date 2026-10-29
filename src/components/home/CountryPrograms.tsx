import { MessageCircle } from "lucide-react";
import { countryPrograms } from "@/data/countryPrograms";
import { siteConfig } from "@/data/site";

// 미국/영국/캐나다/호주 나라별 교과 안내 카드 4장. countryPrograms의 href는
// 카카오 상담사가 고객에게 직접 전달하는 비공개 /quote-* 구성표(검색 노출
// 차단, 홈 메뉴에도 없음)를 가리키므로, 공개 홈페이지에서는 그 링크를 타지
// 않고 전부 카카오톡 상담으로 보냅니다 — /books 카탈로그는 같은 데이터를
// 쓰지만 이 규칙과 무관하게 그대로 둡니다.
export default function CountryPrograms() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-xl">
          <span className="eyebrow">By Country</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            나라별 교과 과정
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
            학생이 다니는 학교의 교육과정에 맞춰 학년·과목별 문제집을 구성합니다.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {countryPrograms.map((c) => (
            <a
              key={c.title}
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="lift flex flex-col border border-navy-800/12 bg-ivory-100 p-6 shadow-card"
            >
              <p className="font-display text-[17px] font-semibold text-navy-950">{c.title}</p>
              <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-charcoal-600">{c.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-navy-900">
                <MessageCircle size={13} />
                상담하기
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
