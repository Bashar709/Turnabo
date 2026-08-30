const PLACEHOLDER_STYLES = [
  "bg-gradient-to-br from-[#3a5a4a] to-[#194b63]",
  "bg-gradient-to-br from-[#e29a2e] to-[#2c4739]",
  "bg-gradient-to-br from-[#5c7c72] to-[#1d3129]",
  "bg-gradient-to-br from-[#194b63] to-[#3a5a4a]",
];

export default function PhotoGrid() {
  return (
    <div>
      <div className="mb-2.5 grid grid-cols-4 gap-3 max-[640px]:grid-cols-2">
        {PLACEHOLDER_STYLES.map((style, i) => (
          <div
            key={i}
            className={`flex aspect-[4/5] items-end rounded-card p-2.5 ${style}`}
          >
            <span className="rounded-full bg-black/30 px-2 py-1 font-mono text-[0.65rem] text-white/85">
              På vei
            </span>
          </div>
        ))}
      </div>
      <p className="text-sm text-fog">
        Bilder fra området kobles på via Google Places.
      </p>
    </div>
  );
}
