import { readFile } from "node:fs/promises";

const baseUrl = process.env.BASE_URL?.replace(/\/$/, "");
const page = await readFile("app/for-mark/page.tsx", "utf8");
const corrections = await readFile("app/for-mark/corrections/page.tsx", "utf8");
const config = await readFile("next.config.ts", "utf8");
const robots = await readFile("app/robots.ts", "utf8");
const sitemap = await readFile("app/sitemap.ts", "utf8");

const failures = [];
const check = (condition, message) => {
  console.log(`${condition ? "PASS" : "FAIL"} ${message}`);
  if (!condition) failures.push(message);
};

check(!/Samuel|Sam Wolff|sam-wolff|profiles\.sam/i.test(page), "route source contains no other subject");
check(!/Samuel|Sam Wolff|sam-wolff|ProductNavigation|issues\/new/i.test(corrections), "isolated correction route contains no other subject, shared navigation, or public issue form");
check(!/from\s+["'][^"']*(?:\/data|\/evidence|ProductNavigation)/.test(page), "route does not import shared multi-profile data or navigation");
check(!/href=["']\/(?:profiles|studio|strategy-lab|opportunities|intelligence|provenance|workspace|engage)/.test(page), "route exposes no shared-product navigation");
check(/robots:\s*\{[^}]*index:\s*false[^}]*follow:\s*false/s.test(page), "page metadata declares noindex and nofollow");
check(/source:\s*["']\/for-mark["']/.test(config) && /X-Robots-Tag/.test(config) && /noindex, nofollow, noarchive, nosnippet, noimageindex/.test(config), "HTTP indexing boundary is configured");
check(/source:\s*["']\/for-mark\/:path\*["']/.test(config), "HTTP indexing boundary covers nested recipient routes");
check(/disallow:\s*\[["']\/for-mark["']\]/.test(robots), "robots excludes the recipient route");
check(!sitemap.includes("for-mark"), "recipient route is absent from sitemap");

if (baseUrl) {
  const response = await fetch(`${baseUrl}/for-mark`);
  const html = await response.text();
  const xRobots = response.headers.get("x-robots-tag") ?? "";
  const cacheControl = response.headers.get("cache-control") ?? "";
  check(response.status === 200, "live recipient route returns 200");
  check(!/Samuel|Sam Wolff|sam-wolff|profile=sam/i.test(html), "live HTML contains no other subject");
  check(/noindex/.test(xRobots) && /nofollow/.test(xRobots), "live response returns X-Robots-Tag");
  check(/private/.test(cacheControl) && /no-store/.test(cacheControl), "live response is private and no-store");
  check(/name=["']robots["'][^>]*noindex/i.test(html) || /content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html), "live HTML contains robots noindex metadata");
}

if (failures.length) {
  console.error(`Mark isolation failed: ${failures.length} check(s).`);
  process.exit(1);
}

console.log("Mark isolation contract passed.");
