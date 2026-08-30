export default function ContourBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-[640px] overflow-hidden">
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        className="absolute -left-[10%] -top-[10%] h-[120%] w-[120%] opacity-30"
      >
        <path
          d="M-50,120 C150,60 250,180 450,110 S750,140 900,90"
          fill="none"
          stroke="#2f4a3c"
          strokeWidth="1.5"
        />
        <path
          d="M-50,220 C170,150 260,280 470,210 S760,240 900,190"
          fill="none"
          stroke="#2f4a3c"
          strokeWidth="1.5"
        />
        <path
          d="M-50,320 C190,250 270,380 490,310 S770,340 900,290"
          fill="none"
          stroke="#e8a33d"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
