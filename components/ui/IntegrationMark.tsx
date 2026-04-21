// Simplified brand marks for integration tiles. Uses first-letter
// monograms on a branded colored square — production would swap in
// real SVG logos (which we avoid here for licensing/IP reasons).
export function IntegrationMark({
  name,
  color,
  size = 28,
}: {
  name: string;
  color: string;
  size?: number;
}) {
  const letter = name[0];
  return (
    <span
      className="inline-flex items-center justify-center rounded-md font-semibold text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.45,
        fontFamily: "var(--font-sans)",
      }}
      aria-hidden="true"
    >
      {letter}
    </span>
  );
}
