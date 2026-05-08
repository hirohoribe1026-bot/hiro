import { ImageResponse } from "next/og";
import { getSoulType } from "@/data/soulTypes";

export const runtime = "edge";

interface Params {
  params: { type: string };
}

export async function GET(_req: Request, { params }: Params) {
  const type = getSoulType(params.type);
  if (!type) {
    return new Response("Not found", { status: 404 });
  }

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
          background:
            "radial-gradient(ellipse at top, #2a2566 0%, #1E1B4B 45%, #0c0a2a 100%)",
          color: "#FAF7F2",
          fontFamily: "serif",
          padding: 80,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 40,
            border: "1px solid rgba(212,175,55,0.5)",
            borderRadius: 32,
          }}
        />
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.5em",
            color: "#D4AF37",
            display: "flex",
          }}
        >
          SOUL MISSION
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 96,
            color: "#FAF7F2",
            letterSpacing: "0.05em",
            display: "flex",
          }}
        >
          {type.name}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 28,
            letterSpacing: "0.3em",
            color: "#F5E9C8",
            display: "flex",
          }}
        >
          {type.subtitle}
        </div>
        <div
          style={{
            marginTop: 36,
            width: 180,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)",
          }}
        />
        <div
          style={{
            marginTop: 36,
            fontSize: 36,
            color: "#D4AF37",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.6,
            display: "flex",
          }}
        >
          {type.essence}
        </div>
        <div
          style={{
            marginTop: 60,
            fontSize: 18,
            letterSpacing: "0.4em",
            color: "rgba(245,233,200,0.6)",
            display: "flex",
          }}
        >
          #ソウルミッション診断 / 穴口恵子
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
