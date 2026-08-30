const PLACEHOLDER_STYLES = [
  "bg-gradient-to-br from-[#3a5a4a] to-[#1b3a4b]",
  "bg-gradient-to-br from-[#e8a33d] to-[#2f4a3c]",
  "bg-gradient-to-br from-[#5c7c72] to-[#1d3129]",
  "bg-gradient-to-br from-[#1b3a4b] to-[#3a5a4a]",
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
              Google Places
            </span>
          </div>
        ))}
      </div>
      <p className="text-sm text-fog">
        I den ferdige appen: ekte bilder hentet live via Google Places Photos
        API (krever GOOGLE_PLACES_API_KEY, se .env.example).
      </p>
    </div>
  );
}
