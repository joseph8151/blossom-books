"use client";

import { useState } from "react";
import { FileSearch } from "lucide-react";
import { SUBJECTS, SUBJECT_GROUPS } from "../ibContent";
import { SUBJECT_SAMPLES } from "../ibSampleContent";
import IbSampleModal from "./IbSampleModal";

export default function SubjectGrid() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openSubject = SUBJECTS.find((s) => s.id === openId);

  return (
    <section id="subjects" className="mt-16 scroll-mt-20">
      <h2 className="font-display text-[22px] font-semibold text-navy-950 sm:text-[26px]">판매 과목</h2>
      <p className="mt-2 max-w-[600px] text-[13.5px] leading-relaxed text-charcoal-600">
        주요 과목은 아래에서 구성과 샘플을 바로 확인하실 수 있습니다. 목록에 없는 과목도 카카오톡으로
        문의해 주세요.
      </p>

      <div className="mt-8 space-y-10">
        {SUBJECT_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">{group.label}</p>

            {group.subjectIds.length > 0 && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {group.subjectIds.map((id) => {
                  const s = SUBJECTS.find((x) => x.id === id)!;
                  const hasSample = !!SUBJECT_SAMPLES[id];
                  return (
                    <div key={id} className="border border-ivory-300 bg-white p-5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-display text-[17px] font-semibold text-navy-950">{s.name}</p>
                        <span
                          className="font-label text-[9.5px] uppercase tracking-[0.1em]"
                          style={{ color: s.accent }}
                        >
                          {s.level}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600">{s.tagline}</p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {s.focusAreas.map((f) => (
                          <span
                            key={f}
                            className="px-2 py-1 font-label text-[9.5px] uppercase tracking-[0.04em]"
                            style={{ background: s.accentSoft, color: s.accent }}
                          >
                            {f}
                          </span>
                        ))}
                      </div>

                      <p className="mt-3 text-[12.5px] leading-relaxed text-charcoal-700">{s.description}</p>

                      {hasSample && (
                        <button
                          type="button"
                          onClick={() => setOpenId(id)}
                          className="mt-4 inline-flex items-center gap-1.5 border border-brass-500/40 bg-brass-500/[0.06] px-3 py-1.5 text-[12px] font-medium text-brass-500 transition-colors hover:bg-brass-500/[0.12]"
                        >
                          <FileSearch size={13} /> 교재 샘플 보기
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {group.inquireOnly && (
              <div className="mt-3 flex flex-wrap gap-2">
                {group.inquireOnly.map((name) => (
                  <span
                    key={name}
                    className="border border-ivory-300 bg-ivory-100 px-3 py-1.5 text-[12.5px] text-charcoal-700"
                  >
                    {name} <span className="text-charcoal-600/60">· 문의 가능</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <IbSampleModal
        key={openId ?? "closed"}
        title={openSubject?.name ?? ""}
        sample={openId ? SUBJECT_SAMPLES[openId] : undefined}
        open={!!openId}
        onClose={() => setOpenId(null)}
      />
    </section>
  );
}
