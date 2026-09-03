import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const routePath = new URL("../app/for-mark/page.tsx", import.meta.url);
const dataPath = new URL("../app/for-mark/mark-private-data.ts", import.meta.url);
const cssPath = new URL("../app/for-mark/for-mark.module.css", import.meta.url);
const socialImagePath = new URL("../app/for-mark/opengraph-image.tsx", import.meta.url);
const correctionsPath = new URL("../app/for-mark/corrections/page.tsx", import.meta.url);
const telemetryPath = new URL("../app/components/SiteTelemetry.tsx", import.meta.url);
const [route, data, css, socialImage, corrections, telemetry] = await Promise.all([
  readFile(routePath, "utf8"),
  readFile(dataPath, "utf8"),
  readFile(cssPath, "utf8"),
  readFile(socialImagePath, "utf8"),
  readFile(correctionsPath, "utf8"),
  readFile(telemetryPath, "utf8"),
]);

assert.doesNotMatch(route, /from\s+["']\.\.\/data["']/, "private route must not import the shared profile corpus");
assert.doesNotMatch(route, /profiles\.(?:sam|mark)/i, "private route must not depend on the shared profile record");
assert.doesNotMatch(route + data, /Samuel|Wolff|sam-wolff|profiles\/sam/i, "private Mark experience contains a cross-profile reference");
assert.match(route, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false,\s*nocache:\s*true\s*\}/, "route must remain noindex, nofollow, and nocache");
assert.match(route, /canonical:\s*["']\/for-mark["']/, "route needs a stable canonical URL");
assert.match(route, /keywords:\s*\[/, "route must override cross-profile root keywords");
assert.match(route, /twitter:\s*\{/, "route must override inherited social metadata");
assert.doesNotMatch(route.match(/openGraph:[\s\S]*?twitter:/)?.[0] ?? "", /mark-young\.jpg/, "social metadata must not reuse the unresolved portrait");
assert.doesNotMatch(route.match(/twitter:[\s\S]*?\n\s*},/)?.[0] ?? "", /mark-young\.jpg/, "Twitter metadata must not reuse the unresolved portrait");
assert.match(route, /License number listed by HBR/, "license identifier must not be described as a salesperson number");
assert.match(route, /An Oʻahu broker with a long local record/, "public-signal framing must avoid unsupported success language");
assert.match(route, /Founder of True Real Estate Hawaiʻi/, "founder proof must avoid an unnecessary start-year claim");
assert.match(route, /What I would ask Mark to show/, "unobserved decision method must remain a proposal");
assert.match(route, /made this without being asked/, "subject relationship boundary must be explicit");
assert.match(route, /Working example · Written by RN Studio/, "sample copy must be visibly labeled");
assert.match(route, /Why this example fits/, "content example must state its factual basis");
assert.match(route, /How much of my time would this take\?/, "time and participation objection must be answered");
assert.match(route, /I wanted to show the work instead of describing it/, "the experience must make RN Studio's demonstrated value explicit");
assert.match(route, /rel=["']noreferrer["']/, "external evidence links need referrer protection");
assert.match(css, /@media\(max-width:520px\)/, "small mobile layout is required");
assert.match(css, /\.page\s*\{[^}]*display:block/, "route must neutralize the legacy global main grid");
assert.match(css, /@media\(prefers-reduced-motion:reduce\)/, "reduced-motion handling is required");
assert.match(css, /@media print/, "print/PDF treatment is required");
assert.match(css, /\.proofStrip,\.sample,\.darkCard,\.finalCta,\.footer\{color:var\(--ink\);background:white!important/, "print must not leave light copy dependent on background graphics");
assert.doesNotMatch(css, /\.section,\.finalCta,\.brief,\.sources\{break-inside:avoid/, "multi-page print sections must remain paginable");
assert.match(css, /:focus-visible/, "visible keyboard focus is required");
assert.match(route, /Skip to the idea/, "the long-form experience needs a keyboard bypass");
assert.match(css, /\.skipLink:focus/, "the keyboard bypass must become visible on focus");
assert.match(css, /scroll-margin-top:88px/, "sticky navigation must not cover anchored section headings");
assert.match(css, /\.topbar nav a,\.print \{ display:inline-flex; align-items:center; min-height:44px/, "desktop navigation controls need robust pointer targets");
assert.match(css, /\.objections details>p\{display:block!important\}/, "print/PDF output must expose collapsed objection answers");
assert.match(route, /they are not Mark’s advice/, "sample post must distinguish RN Studio's example from Mark's advice");
assert.match(data, /mark-young\.jpg/, "private Mark portrait must be direct and local");
assert.doesNotMatch(socialImage, /mark-young\.jpg|https?:\/\/|<img|<Image\s/, "social card must use original abstract composition without third-party imagery");
assert.match(route, /href=["']\/for-mark\/corrections["']/, "recipient route needs an isolated correction pathway");
assert.doesNotMatch(corrections, /ProductNavigation|Samuel|Wolff|github\.com|issues\/new/i, "private correction pathway must not expose shared navigation, another subject, or a public issue form");
assert.match(corrections, /respond in the same private conversation/i, "corrections must return to a private reply channel");
assert.match(telemetry, /pathname\.startsWith\(["']\/for-mark["']\)\) return null/, "recipient routes must be excluded from site telemetry");

console.log("Mark private experience contract: PASS");
