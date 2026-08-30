export default function Header() {
  return (
    <header className="relative z-10 flex items-center justify-between px-[5vw] pt-7">
      <div className="flex items-center gap-2.5 font-display text-2xl font-semibold text-pine-deep">
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <path
            d="M3 18L9 7L13 14L16 9L21 18H3Z"
            stroke="#2f4a3c"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        Turnabo
      </div>
      <nav className="rounded-full border border-line bg-card px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-fog">
        v0.3 &middot; under utvikling
      </nav>
    </header>
  );
}
