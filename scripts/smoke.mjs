const baseUrl = (process.env.BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");

const checks = [
  ["/", 200, "Future professional profiles"],
  ["/profiles/mark", 200, "Mark H. Young"],
  ["/profiles/sam", 200, "Samuel Wolff"],
  ["/intelligence", 200, "Profile Intelligence Console"],
  ["/api/profiles", 200, "mark"],
  ["/api/profiles/mark", 200, "Mark H. Young"],
  ["/api/profiles/sam", 200, "Samuel Wolff"],
  ["/api/evidence", 200, "profiles"],
  ["/api/evidence/mark", 200, "Mark H. Young"],
  ["/api/evidence/sam", 200, "Samuel Wolff"],
  ["/manifest.webmanifest", 200, "RN Profiles"],
  ["/robots.txt", 200, "Sitemap"],
  ["/sitemap.xml", 200, "/profiles/mark"],
  ["/definitely-missing", 404, "This evidence record does not exist."],
];

let failures = 0;
for (const [path, expectedStatus, expectedText] of checks) {
  try {
    const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
    const body = await response.text();
    const ok = response.status === expectedStatus && body.includes(expectedText);
    console.log(`${ok ? "PASS" : "FAIL"} ${response.status} ${path}`);
    if (!ok) {
      failures += 1;
      console.error(`  expected status ${expectedStatus} and text ${JSON.stringify(expectedText)}`);
    }
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${path}: ${error instanceof Error ? error.message : error}`);
  }
}

for (const slug of ["mark", "sam"]) {
  const response = await fetch(`${baseUrl}/api/evidence/${slug}`);
  const payload = await response.json();
  const sourceCount = Array.isArray(payload.sources) ? payload.sources.length : 0;
  const ok = response.ok && sourceCount >= 8;
  console.log(`${ok ? "PASS" : "FAIL"} evidence depth ${slug}: ${sourceCount} sources`);
  if (!ok) failures += 1;
}

if (failures > 0) {
  console.error(`Smoke suite failed: ${failures} check(s).`);
  process.exit(1);
}

console.log(`Smoke suite passed against ${baseUrl}.`);
