import { ImageResponse } from "next/og";
import { site } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Shared OpenGraph card.
 *
 * Rendered with next/og at build time, so every case study and post gets a
 * unique image without anyone opening a design tool. It deliberately uses the
 * renderer's built-in font rather than fetching a webfont: a card that depends
 * on a network call at build time is a card that eventually fails to build.
 */
export function ogImage({
  title,
  kicker,
  tags,
}: {
  title: string;
  kicker: string;
  tags: string[];
}) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: 24,
              color: "#60a5fa",
              letterSpacing: "0.02em",
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "3px",
                background: "#2563eb",
              }}
            />
            {kicker}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? 62 : 76,
              lineHeight: 1.12,
              color: "#fafafa",
              letterSpacing: "-0.03em",
              maxWidth: "980px",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #27272a",
            paddingTop: "32px",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, color: "#fafafa" }}>
            {site.name}
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            {tags.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  border: "1px solid #3f3f46",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: 22,
                  color: "#a1a1aa",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
