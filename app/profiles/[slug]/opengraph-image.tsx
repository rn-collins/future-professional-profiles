import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { profiles } from "../../data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in profiles)) notFound();
  const profile = profiles[slug as keyof typeof profiles];
  const isMark = profile.slug === "mark";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px", background: isMark ? "linear-gradient(125deg,#082f43,#176886 58%,#f1d2ad 58%)" : "linear-gradient(125deg,#123b2c,#467761 58%,#edc45f 58%)", color: "white", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", fontSize: 22, letterSpacing: "0.18em", fontWeight: 700 }}>RN STUDIO · EVIDENCE-LED PROFILE</div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
        <div style={{ fontSize: 76, lineHeight: 1, fontWeight: 800 }}>{profile.name}</div>
        <div style={{ marginTop: 26, fontSize: 35, lineHeight: 1.15 }}>{profile.editorialPosition.thesis}</div>
      </div>
      <div style={{ display: "flex", fontSize: 22 }}>Professional presence · content strategy · public evidence</div>
    </div>,
    size,
  );
}
