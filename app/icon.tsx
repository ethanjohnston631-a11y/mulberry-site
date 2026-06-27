import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0c",
          borderRadius: "50%",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 80 80" fill="none">
          <path
            d="M18 20 Q22 12 28 16"
            stroke="#cdab78"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="24" cy="30" r="11" stroke="#cdab78" strokeWidth="5" />
          <circle cx="40" cy="42" r="9" stroke="#cdab78" strokeWidth="5" />
          <circle cx="55" cy="48" r="8" stroke="#cdab78" strokeWidth="5" />
          <circle cx="68" cy="50" r="6" stroke="#cdab78" strokeWidth="5" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
