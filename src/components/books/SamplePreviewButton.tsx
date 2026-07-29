"use client";

import { useState } from "react";
import { X, FileSearch } from "lucide-react";

export default function SamplePreviewButton({ available }: { available: boolean }) {
  const [open, setOpen] = useState(false);

  if (!available) {
    return (
      <button
        disabled
        className="inline-flex cursor-not-allowed items-center gap-2 border border-navy-800/15 px-6 py-3 text-[13.5px] font-medium text-charcoal-600/50"
      >
        <FileSearch size={16} />
        샘플 준비 중
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
      >
        <FileSearch size={16} />
        샘플 페이지 미리보기
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/60 p-6"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-ivory-100 p-8 shadow-xl"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="닫기"
              className="absolute right-5 top-5 text-charcoal-600"
            >
              <X size={20} />
            </button>
            <p className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">Sample Preview</p>
            <h3 className="mt-2 font-display text-[22px] font-semibold text-navy-950">샘플 페이지</h3>
            <p className="mt-4 text-[13.5px] leading-relaxed text-charcoal-600">
              {/* TODO: 실제 배포 시 샘플 페이지 이미지 또는 PDF 미리보기를 이 영역에 연결하세요. */}
              해당 교재의 샘플 페이지 이미지가 이 영역에 표시됩니다. 실제 서비스에서는 문제집 1~2페이지
              분량의 미리보기 이미지가 제공됩니다.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
