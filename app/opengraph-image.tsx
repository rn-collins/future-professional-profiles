import { ImageResponse } from "next/og";

export const alt = "Future Professional Profiles by RN Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px 78px",
        color: "#ffffff",
        background: "linear-gradient(125deg, #0c3444 0%, #123b4c 58%, #b6812b 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 25, letterSpacing: "0.12em" }}>
        <b>RN STUDIO</b><span style={{ color: "#f0d88e" }}>EVIDENCE-LED</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 86, lineHeight: 0.98, letterSpacing: "-0.045em" }}>Future professional profiles</div>
        <div style={{ marginTop: 28, fontSize: 31, color: "#dce9ec" }}>Research, positioning, editorial systems, and digital experiences for consequential work.</div>
      </div>
      <div style={{ display: "flex", gap: 18, fontSize: 23 }}>
        <span>MARK H. YOUNG</span><span style={{ color: "#e6c86c" }}>•</span><span>SAMUEL “SAM” WOLFF</span>
      </div>
    </div>,
    size,
  );
}
