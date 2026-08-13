import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0F5C41",
          backgroundImage:
            "radial-gradient(circle at 80% 15%, rgba(245,185,20,0.28), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5 }}>
            <div style={{ width: 8, height: 16, borderRadius: 4, backgroundColor: "#56B78D", display: "flex" }} />
            <div style={{ width: 8, height: 26, borderRadius: 4, backgroundColor: "#F7FBF8", display: "flex" }} />
            <div style={{ width: 8, height: 36, borderRadius: 4, backgroundColor: "#F5B914", display: "flex" }} />
          </div>
          <div style={{ color: "#F5B914", fontSize: 22, letterSpacing: 4, fontWeight: 700 }}>
            EDUCATION FRANCHISE COMPANY
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#F7FBF8", fontSize: 84, fontWeight: 800, lineHeight: 1.05, display: "flex" }}>
            JOHN EDUCATION GROUP
          </div>
          <div style={{ marginTop: 28, color: "#FFD166", fontSize: 32, fontWeight: 700, display: "flex" }}>
            One Education Brand. Multiple Business Models.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["JOHN KIDS", "JOHN PREP", "JOHN STUDY", "JOHN 1:1", "JOHN LANGUAGE", "JOHN HYBRID"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                borderRadius: 999,
                backgroundColor: "rgba(247,251,248,0.12)",
                color: "#F7FBF8",
                fontSize: 18,
                fontWeight: 600,
                padding: "8px 18px",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
