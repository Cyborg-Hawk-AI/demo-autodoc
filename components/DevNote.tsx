"use client";

import { useState } from "react";

interface DevNoteProps {
  title: string;
  children: React.ReactNode;
}

export function DevNote({ title, children }: DevNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-600/30 text-[10px] font-bold text-brand-300 ring-1 ring-brand-500/40 transition hover:bg-brand-600/50"
        aria-label={`Developer note: ${title}`}
        title="DEV NOTE"
      >
        i
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-6 z-50 w-72 rounded-lg border border-brand-500/30 bg-surface-800 p-3 text-left text-xs shadow-2xl">
            <div className="mb-1 flex items-center gap-1.5">
              <span className="rounded bg-brand-600/30 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-300">
                DEV NOTE
              </span>
              <span className="font-semibold text-gray-200">{title}</span>
            </div>
            <p className="leading-relaxed text-gray-400">{children}</p>
          </div>
        </>
      )}
    </span>
  );
}
