"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Landmark, CreditCard, Mail } from "lucide-react";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { Product } from "@/lib/types";
import PayPalCheckout from "@/components/checkout/PayPalCheckout";

type Region = "domestic" | "international";

export default function CheckoutFlow() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const product = useMemo(() => products.find((p) => p.id === productId), [productId]);

  // 영문(/en) 페이지 등에서 ?region=international 로 진입하면 해외 결제(PayPal) 탭을 기본 선택합니다.
  const initialRegion: Region =
    searchParams.get("region") === "international" ? "international" : "domestic";
  const [region, setRegion] = useState<Region>(initialRegion);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", email: "" });

  function handleDomesticSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: 서버 API 연동 필요 — 주문 정보를 저장하고 상태를 "입금 대기"로 생성합니다.
    // 예: await fetch("/api/orders", { method: "POST", body: JSON.stringify({ productId, region, form }) })
    setOrderSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Checkout</p>
      <h1 className="mt-3 font-display text-[32px] font-semibold text-navy-950 sm:text-[38px]">주문 / 결제</h1>

      {product ? (
        <div className="mt-6 flex items-center justify-between border border-navy-800/15 bg-ivory-200/40 p-5">
          <div>
            <p className="font-display text-[18px] font-semibold text-navy-950">{product.titleKo}</p>
            <p className="mt-1 text-[12.5px] text-charcoal-600">
              {product.examOrCurriculum} · {product.gradeRange}
            </p>
          </div>
          <p className="font-display text-[18px] font-semibold text-navy-950">
            {region === "domestic"
              ? product.priceKRW
                ? `${product.priceKRW.toLocaleString("ko-KR")}원`
                : "상담 문의"
              : product.priceUSD
                ? `USD $${product.priceUSD}`
                : "상담 문의"}
          </p>
        </div>
      ) : (
        <p className="mt-6 text-[13.5px] text-charcoal-600">
          선택된 교재가 없습니다. 교재 상세 페이지에서 구매하기 버튼을 통해 진입해주세요.
        </p>
      )}

      {/* 지역 선택 */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => setRegion("domestic")}
          className={`flex items-center gap-3 border p-5 text-left transition-colors ${
            region === "domestic" ? "border-navy-900 bg-ivory-200/50" : "border-navy-800/15"
          }`}
        >
          <Landmark size={20} className="text-navy-800" />
          <div>
            <p className="text-[14px] font-medium text-navy-950">Korea: Bank Transfer</p>
            <p className="text-[12px] text-charcoal-600">국내 결제 — 계좌이체</p>
          </div>
        </button>
        <button
          onClick={() => setRegion("international")}
          className={`flex items-center gap-3 border p-5 text-left transition-colors ${
            region === "international" ? "border-navy-900 bg-ivory-200/50" : "border-navy-800/15"
          }`}
        >
          <CreditCard size={20} className="text-navy-800" />
          <div>
            <p className="text-[14px] font-medium text-navy-950">International: PayPal</p>
            <p className="text-[12px] text-charcoal-600">해외 결제 — PayPal</p>
          </div>
        </button>
      </div>

      {region === "domestic" ? (
        <DomesticFlow submitted={orderSubmitted} form={form} setForm={setForm} onSubmit={handleDomesticSubmit} />
      ) : (
        <InternationalFlow product={product} />
      )}

      <div className="mt-12 border-t border-navy-800/12 pt-8 text-center">
        <p className="text-[13px] text-charcoal-600">결제 전 교재 구성이나 이용 범위가 궁금하신가요?</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
          >
            <MessageCircle size={15} />
            카카오톡 상담
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50"
          >
            <Mail size={15} />
            이메일 문의
          </a>
        </div>
      </div>
    </div>
  );
}

function DomesticFlow({
  submitted,
  form,
  setForm,
  onSubmit,
}: {
  submitted: boolean;
  form: { name: string; contact: string; email: string };
  setForm: (f: { name: string; contact: string; email: string }) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  if (submitted) {
    return (
      <div className="mt-10 border border-navy-800/15 bg-ivory-200/40 p-8">
        <p className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">주문 상태: 입금 대기</p>
        <h2 className="mt-2 font-display text-[22px] font-semibold text-navy-950">주문이 접수되었습니다.</h2>
        <p className="mt-3 text-[13.5px] leading-relaxed text-charcoal-600">
          국내 결제는 계좌이체로 진행됩니다. 입금 계좌 정보는 카카오톡 채널로
          바로 안내드리며, 입금 확인 후 PDF 교재를 이메일로 보내드립니다.
        </p>
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={15} />
          카카오톡에서 입금 계좌 안내받기
        </a>
        <p className="mt-4 text-[12.5px] text-charcoal-600">
          입금자명은 주문 시 입력하신 이름과 동일하게 해주세요.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-5">
      <p className="text-[13.5px] leading-relaxed text-charcoal-600">
        국내 결제는 계좌이체로 진행됩니다. 주문 신청 후 입금 계좌와 구매 절차를 안내드립니다.
      </p>
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-navy-950">주문자명</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-navy-800/20 bg-ivory-100 px-4 py-3 text-[14px] outline-none focus:border-navy-800/50"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-navy-950">연락처</label>
          <input
            required
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="w-full border border-navy-800/20 bg-ivory-100 px-4 py-3 text-[14px] outline-none focus:border-navy-800/50"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-navy-950">이메일</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-navy-800/20 bg-ivory-100 px-4 py-3 text-[14px] outline-none focus:border-navy-800/50"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-navy-900 px-8 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
      >
        국내 주문 신청 · 계좌이체 안내받기
      </button>
    </form>
  );
}

function InternationalFlow({ product }: { product?: Product }) {
  return (
    <div className="mt-10 space-y-5">
      <p className="text-[13.5px] leading-relaxed text-charcoal-600">
        International customers can complete payment securely through PayPal. Digital
        materials will be delivered to the email address linked to your PayPal account
        after payment verification.
      </p>

      <div className="border border-navy-800/15 bg-ivory-200/40 p-6">
        <p className="font-label text-[11px] uppercase tracking-[0.14em] text-navy-800/70">PayPal Checkout</p>

        {!product ? (
          <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">
            No item selected. Please open a book&apos;s detail page and start checkout from there.
          </p>
        ) : product.priceUSD ? (
          <div className="mt-4">
            <div className="mb-4 flex items-center justify-between border-b border-navy-800/12 pb-4">
              <span className="text-[13.5px] text-charcoal-600">{product.title}</span>
              <span className="font-display text-[18px] font-semibold text-navy-950">
                USD ${product.priceUSD.toFixed(2)}
              </span>
            </div>
            <PayPalCheckout amountUSD={product.priceUSD} productTitle={product.title} />
          </div>
        ) : (
          <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">
            Pricing for this title is provided on request. Please contact us via KakaoTalk
            or email for an international quote and PayPal invoice.
          </p>
        )}
      </div>
    </div>
  );
}
