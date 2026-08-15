import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import HowToOrder from "@/components/home/HowToOrder";

export const metadata = {
  title: "구매 안내",
  description:
    "Blossom Books는 홈페이지에서 교재와 가격을 확인한 뒤 공식 카카오톡 상담원을 통해 결제를 안내합니다.",
};

export default function CheckoutPage() {
  return (
    <div>
      <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">How to order</p>
          <h1 className="mt-3 font-display text-[28px] font-semibold text-navy-950 sm:text-[34px]">
            구매 안내
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-[1.85] text-charcoal-600">
            Blossom Books는 홈페이지에서 직접 결제하지 않습니다. 교재와 가격(40P ₩130,000 · 60P ₩150,000 ·
            100P ₩190,000)을 확인하신 뒤, 공식 카카오톡으로 선택한 상품을 보내주세요. 상담원이 학생에게
            적합한지 간단히 확인한 후 계좌이체 또는 카드 결제를 안내해 드리고, 결제 확인 후 교재(PDF)를
            이메일로 보내드립니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3.5 text-[14px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              교재 찾기 <ArrowRight size={16} />
            </Link>
            <a
              href={siteConfig.kakaoChatUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
            >
              <MessageCircle size={16} /> 공식 카카오톡으로 구매
            </a>
          </div>
        </div>
      </section>
      <HowToOrder />
    </div>
  );
}
