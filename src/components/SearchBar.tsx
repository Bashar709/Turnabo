"use client";

import { useEffect, useRef, useState } from "react";
import { Kommune } from "@/lib/types";

interface SearchBarProps {
  kommuner: Kommune[];
  initialValue: string;
  onSelect: (kommuneNavn: string) => void;
}

export default function SearchBar({
  kommuner,
  initialValue,
  onSelect,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [matches, setMatches] = useState<Kommune[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function updateMatches(value: string) {
    const q = value.trim().toLowerCase();
    if (!q) {
      setMatches([]);
      setOpen(false);
      return;
    }
    const found = kommuner
      .filter((k) => k.kommune.toLowerCase().startsWith(q))
      .slice(0, 8);
    setMatches(found);
    setOpen(found.length > 0);
    setActiveIndex(-1);
  }

  function select(name: string) {
    setQuery(name);
    setOpen(false);
    onSelect(name);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && matches[activeIndex]) {
        select(matches[activeIndex].kommune);
      } else {
        setOpen(false);
        onSelect(query);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative max-w-[520px]" ref={wrapRef}>
      <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-line bg-card py-2 pl-5 pr-2 shadow-[0_10px_30px_-14px_rgba(27,42,36,0.35)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-fog">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M21 21L16.65 16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          autoComplete="off"
          placeholder="Skriv en kommune, f.eks. Hareid ..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            updateMatches(e.target.value);
          }}
          onFocus={() => updateMatches(query)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent py-2.5 font-body text-base text-ink placeholder:text-fog/70 outline-none"
        />
        <button
          onClick={() => {
            setOpen(false);
            onSelect(query);
          }}
          className="rounded-full bg-pine-deep px-5 py-3 font-body text-sm font-bold text-[#f5f2e8] transition-colors hover:bg-fjord active:scale-95"
        >
          Finn turer
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-line bg-card shadow-[0_16px_40px_-16px_rgba(27,42,36,0.4)]">
          {matches.map((k, i) => (
            <div
              key={k.kommune}
              onClick={() => select(k.kommune)}
              className={`flex cursor-pointer items-center justify-between px-[18px] py-2.5 text-sm ${
                i === activeIndex ? "bg-pine/10" : "hover:bg-pine/5"
              }`}
            >
              <span>{k.kommune}</span>
              <span className="font-mono text-xs text-fog">{k.fylke}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
