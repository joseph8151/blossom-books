import { ShieldCheck } from "lucide-react";
import { disclaimers } from "../data";

export default function Disclaimers() {
  return (
    <section className="border-b border-navy-800/10 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[680px] px-5 sm:px-8">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-[#5f6f52]" />
          <p className="font-label text-[11px] uppercase tracking-[0.16em] text-charcoal-600/70">
            주의사항
          </p>
        </div>
        <ul className="mt-5 space-y-2.5 text-[12.5px] leading-relaxed text-charcoal-600">
          {disclaimers.map((d) => (
            <li key={d} className="flex gap-2">
              <span className="text-[#5f6f52]">·</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
