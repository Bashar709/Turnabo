const NAV = [
  { label: "Om oss", href: "#om" },
  { label: "Datakilder", href: "#datakilder" },
  { label: "GitHub", href: "https://github.com/Bashar709/Turnabo", ekstern: true },
];

export default function Header() {
  return (
    <header
      id="topp"
      className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-[5vw] pt-7"
    >
      <a
        href="#topp"
        className="flex items-center gap-2.5 font-display text-2xl font-semibold text-pine-deep"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <path
            d="M3 18L9 7L13 14L16 9L21 18H3Z"
            stroke="#2f4a3c"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        Turnabo
      </a>

      <nav className="flex items-center gap-1 rounded-full border border-line bg-card p-1 font-mono text-xs uppercase tracking-wider text-fog">
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target={item.ekstern ? "_blank" : undefined}
            rel={item.ekstern ? "noreferrer" : undefined}
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-pine/5 hover:text-pine-deep"
          >
            {item.label}
            {item.ekstern && <span aria-hidden> ↗</span>}
          </a>
        ))}
      </nav>
    </header>
  );
}
