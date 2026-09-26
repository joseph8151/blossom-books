import { ImageResponse } from "next/og";

const NAVY = "#0d1626";
const IVORY = "#faf7f0";
const BRASS = "#ad8a4e";

export function renderQuoteOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: NAVY,
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              border: `1.5px solid ${BRASS}`,
              color: BRASS,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            B
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: IVORY, letterSpacing: -0.5 }}>
              Blossom Books
            </span>
            <span style={{ fontSize: 13, color: "rgba(250,247,240,0.55)", letterSpacing: 2 }}>
              EDUCATIONAL WORKBOOK PUBLISHER
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: BRASS,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </span>
          <span style={{ fontSize: 56, fontWeight: 700, color: IVORY, lineHeight: 1.25, maxWidth: 980 }}>
            {title}
          </span>
          <span style={{ marginTop: 24, fontSize: 24, color: "rgba(250,247,240,0.7)", maxWidth: 940 }}>
            {subtitle}
          </span>
        </div>

        <div style={{ display: "flex", width: "100%", height: 3, backgroundColor: BRASS }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
