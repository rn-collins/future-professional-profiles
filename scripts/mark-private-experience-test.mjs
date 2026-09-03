import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const routePath = new URL("../app/for-mark/page.tsx", import.meta.url);
const dataPath = new URL("../app/for-mark/mark-private-data.ts", import.meta.url);
const cssPath = new URL("../app/for-mark/for-mark.module.css", import.meta.url);
const socialImagePath = new URL("../app/for-mark/opengraph-image.tsx", import.meta.url);
const [route, data, css, socialImage] = await Promise.all([
  readFile(routePath, "utf8"),
  readFile(dataPath, "utf8"),
  readFile(cssPath, "utf8"),
  readFile(socialImagePath, "utf8"),
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
assert.match(route, /HBR-listed license number/, "license identifier must not be described as a salesperson number");
assert.match(route, /A locally rooted brokerage leader/, "public-signal framing must avoid unsupported success language");
assert.match(route, /did not request, approve, hire, or endorse/, "subject relationship boundary must be explicit");
assert.match(route, /Proposed post · Not written, published, or approved by Mark/, "sample copy must be visibly labeled");
assert.match(route, /Evidence basis/, "content demonstration must include an evidence basis");
assert.match(route, /What would this require from me\?/, "time and participation objection must be answered");
assert.match(route, /What this page already proves/, "the experience must make RN Studio's demonstrated value explicit");
assert.match(route, /rel=["']noreferrer["']/, "external evidence links need referrer protection");
assert.match(css, /@media\(max-width:520px\)/, "small mobile layout is required");
assert.match(css, /@media\(prefers-reduced-motion:reduce\)/, "reduced-motion handling is required");
assert.match(css, /@media print/, "print/PDF treatment is required");
assert.match(css, /\.proofStrip,\.sample,\.darkCard,\.finalCta,\.footer\{color:var\(--ink\);background:white!important/, "print must not leave light copy dependent on background graphics");
assert.doesNotMatch(css, /\.section,\.finalCta,\.brief,\.sources\{break-inside:avoid/, "multi-page print sections must remain paginable");
assert.match(css, /:focus-visible/, "visible keyboard focus is required");
assert.match(data, /mark-young\.jpg/, "private Mark portrait must be direct and local");
assert.doesNotMatch(socialImage, /mark-young\.jpg|https?:\/\/|<img|<Image\s/, "social card must use original abstract composition without third-party imagery");

console.log("Mark private experience contract: PASS");
