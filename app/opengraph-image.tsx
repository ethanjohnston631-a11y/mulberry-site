import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0c",
          color: "#f4efe6",
        }}
      >
        <svg width="64" height="64" viewBox="0 0 80 80" fill="none" style={{ marginBottom: 28 }}>
          <path d="M18 20 Q22 12 28 16" stroke="#cdab78" strokeWidth="5" strokeLinecap="round" />
          <circle cx="24" cy="30" r="11" stroke="#cdab78" strokeWidth="5" />
          <circle cx="40" cy="42" r="9" stroke="#cdab78" strokeWidth="5" />
          <circle cx="55" cy="48" r="8" stroke="#cdab78" strokeWidth="5" />
          <circle cx="68" cy="50" r="6" stroke="#cdab78" strokeWidth="5" />
        </svg>
        <div style={{ fontSize: 64, letterSpacing: 8, textTransform: "uppercase" }}>Mulberry</div>
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#cdab78", marginTop: 18 }}>
          Empire of Silk
        </div>
      </div>
    ),
    { ...size }
  );
}
