import { FileText } from "lucide-react";
import { deliveryFiles, premiumExtraFiles, signatureExtraFiles } from "../data";

export default function DeliveryFiles() {
  return (
    <section className="border-b border-navy-800/10 bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-[760px] px-5 sm:px-8">
        <div className="mx-auto max-w-[560px] text-center">
          <span className="font-label text-[11px] uppercase tracking-[0.18em] text-[#5f6f52]">Deliverables</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            납품 파일 예시
          </h2>
        </div>

        <div className="mt-10 divide-y divide-navy-800/10 border-y border-navy-800/10">
          {deliveryFiles.map((f) => (
            <div key={f.n} className="flex items-center gap-4 py-3.5">
              <span className="font-label text-[12px] text-[#5f6f52]">{f.n}</span>
              <FileText size={15} className="text-navy-800/40" />
              <span className="text-[13.5px] text-navy-900">{f.title}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1 text-center text-[12.5px] leading-relaxed text-charcoal-600/90">
          <p>Premium 이상은 {premiumExtraFiles.join(", ")}를 추가로 포함합니다.</p>
          <p>Signature는 {signatureExtraFiles.join(", ")}를 추가로 포함합니다.</p>
        </div>
      </div>
    </section>
  );
}
