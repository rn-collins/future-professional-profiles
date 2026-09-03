import { ImageResponse } from "next/og";

export const alt = "A professional authority system for Mark H. Young, prepared by RN Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#f8f5ec", color: "#102b34", fontFamily: "Georgia, serif", padding: "70px 78px" }}>
      <div style={{ position: "absolute", width: 520, height: 520, borderRadius: 520, right: -110, top: -190, background: "#f0cf99" }} />
      <div style={{ position: "absolute", width: 350, height: 820, right: 90, top: -80, borderLeft: "3px solid rgba(15,106,85,.35)", transform: "rotate(24deg)" }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 900, zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "Arial, sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#0f6a55" }}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 56, color: "white", background: "#102b34", fontFamily: "Georgia, serif", fontSize: 18 }}>RN</span>
          Private strategic demonstration
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, lineHeight: 1.02, letterSpacing: -2 }}>A professional authority system for Mark H. Young.</div>
          <div style={{ marginTop: 30, fontFamily: "Arial, sans-serif", fontSize: 25, color: "#36535c" }}>Make the judgment beneath consequential property decisions visible.</div>
        </div>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>Prepared by RN Studio</div>
      </div>
    </div>,
    size,
  );
}
