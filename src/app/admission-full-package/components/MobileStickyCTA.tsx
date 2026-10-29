"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-800/15 bg-ivory-100/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <Link
        href="#consult"
        className="flex min-h-[48px] items-center justify-center gap-2 bg-navy-950 text-[14px] font-medium text-ivory-100"
      >
        Admission Package 상담
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
