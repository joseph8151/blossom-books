"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const links = [
  {
    title: "학원·학교 레벨테스트",
    who: "영어 · 국어 · 수학 레벨테스트/반 배정 문의 고객",
    url: "https://www.blossombooks.org/quote/",
  },
  {
    title: "시험 대비 (공인시험·사내영어)",
    who: "OET · MET · CELBAN · PTE · 부산외대 FLAT · SPA · SAT · ESPT 등 문의 고객",
    url: "https://www.blossombooks.org/quote-exam/",
  },
  {
    title: "미국교과·AP",
    who: "G1–G12 영어·수학, Geometry·Algebra·Precalculus·Calculus·AP 문의 고객",
    url: "https://www.blossombooks.org/quote-us/",
  },
  {
    title: "영국 교과·입학시험",
    who: "Year 1–11 · GCSE · A-level · 11+ · ISEB · UKiset 문의 고객",
    url: "https://www.blossombooks.org/quote-uk/",
  },
  {
    title: "캐나다 교과",
    who: "Grade 1–12 English·Math, 주(province)별 상급 수학 스트림 문의 고객",
    url: "https://www.blossombooks.org/quote-ca/",
  },
  {
    title: "호주 교과",
    who: "Foundation–Year 12 English·Maths, Methods/Specialist 문의 고객",
    url: "https://www.blossombooks.org/quote-au/",
  },
  {
    title: "국제학교 입학시험",
    who: "MAP Growth · CAT4 · ISEE · Oxford Online Placement Test 문의 고객",
    url: "https://www.blossombooks.org/quote-international-school/",
  },
];

function LinkRow({ title, who, url }: { title: string; who: string; url: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    try {
      navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="border border-ivory-300 bg-white p-5 sm:p-6">
      <p className="font-display text-[16px] font-semibold text-navy-950">{title}</p>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600">{who}</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <code className="flex-1 break-all border border-ivory-300 bg-ivory-200/40 px-3 py-2.5 text-[12.5px] text-charcoal-700">
          {url}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-[42px] shrink-0 items-center justify-center gap-1.5 bg-navy-900 px-4 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "복사됨" : "복사"}
        </button>
      </div>
    </div>
  );
}

export default function LinkList() {
  return (
    <div className="mt-8 grid gap-4">
      {links.map((l) => (
        <LinkRow key={l.url} {...l} />
      ))}
    </div>
  );
}
