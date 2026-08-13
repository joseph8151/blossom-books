import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 3,
          backgroundColor: "#F8F5EF",
          borderRadius: 8,
          padding: 6,
        }}
      >
        <div style={{ width: 5, height: 10, borderRadius: 3, backgroundColor: "#5C7D9C", display: "flex" }} />
        <div style={{ width: 5, height: 16, borderRadius: 3, backgroundColor: "#16324F", display: "flex" }} />
        <div style={{ width: 5, height: 22, borderRadius: 3, backgroundColor: "#F47B45", display: "flex" }} />
      </div>
    ),
    size
  );
}
