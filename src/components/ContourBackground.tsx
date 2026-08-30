export default function ContourBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-[460px] overflow-hidden sm:h-[600px]">
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        className="absolute -left-[10%] -top-[10%] h-[120%] w-[120%] opacity-[0.22]"
      >
        <path
          d="M-50,120 C150,60 250,180 450,110 S750,140 900,90"
          fill="none"
          stroke="#2c4739"
          strokeWidth="1.5"
        />
        <path
          d="M-50,220 C170,150 260,280 470,210 S760,240 900,190"
          fill="none"
          stroke="#2c4739"
          strokeWidth="1.5"
        />
        <path
          d="M-50,320 C190,250 270,380 490,310 S770,340 900,290"
          fill="none"
          stroke="#e29a2e"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
