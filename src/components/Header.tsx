import Link from "next/link";

function Logo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
      <path
        d="M3 18L9 7L13 14L16 9L21 18H3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="relative z-20 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 pt-6 md:px-[5vw] md:pt-7">
      <Link
        href="/"
        className="flex items-center gap-2 font-display text-xl font-semibold text-pine-deep sm:text-2xl"
      >
        <Logo />
        Turnabo
      </Link>

      <nav className="flex items-center gap-1 rounded-full border border-line bg-card p-1 font-mono text-[0.7rem] uppercase tracking-wider text-fog sm:text-xs">
        <Link
          href="/om"
          className="rounded-full px-3 py-1.5 transition-colors hover:bg-pine/5 hover:text-pine-deep"
        >
          Om oss
        </Link>
        <a
          href="https://github.com/Bashar709/Turnabo"
          target="_blank"
          rel="noreferrer"
          className="rounded-full px-3 py-1.5 transition-colors hover:bg-pine/5 hover:text-pine-deep"
        >
          GitHub <span aria-hidden>↗</span>
        </a>
      </nav>
    </header>
  );
}
