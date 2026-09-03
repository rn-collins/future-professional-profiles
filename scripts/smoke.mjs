const baseUrl = (process.env.BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");

const checks = [
  ["/", 200, "Future professional profiles"],
  ["/profiles/mark", 200, "Mark H. Young"],
  ["/profiles/sam", 200, "Samuel Wolff"],
  ["/intelligence", 200, "Profile Intelligence Console"],
  ["/studio", 200, "The strategy is now executable."],
  ["/strategy-lab", 200, "From public presence to a working authority system"],
  ["/opportunities", 200, "Opportunity Intelligence"],
  ["/provenance", 200, "What we know."],
  ["/workspace", 200, "Editorial approval workspace"],
  ["/engage", 200, "Turn the dossier into an operating system"],
  ["/api/profiles", 200, "mark"],
  ["/api/profiles/mark", 200, "Mark H. Young"],
  ["/api/profiles/sam", 200, "Samuel Wolff"],
  ["/api/evidence", 200, "profiles"],
  ["/api/evidence/mark", 200, "Mark H. Young"],
  ["/api/evidence/sam", 200, "Samuel Wolff"],
  ["/api/market", 200, "volumeBoundary"],
  ["/api/market/mark", 200, "Appraisal-trained pre-offer reasoning"],
  ["/api/market/sam", 200, "Public meeting, private consequence"],
  ["/api/health", 200, "healthy"],
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

const concierge = await fetch(`${baseUrl}/api/concierge`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ profile: "mark", question: "What supports Mark's appraisal positioning?" }),
});
const conciergePayload = await concierge.json();
const conciergeOk = concierge.ok && conciergePayload.citations?.length > 0 && conciergePayload.boundary;
console.log(`${conciergeOk ? "PASS" : "FAIL"} evidence concierge citations: ${conciergePayload.citations?.length ?? 0}`);
if (!conciergeOk) failures += 1;

const noEvidence = await fetch(`${baseUrl}/api/concierge`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ profile: "mark", question: "What is his favorite color?" }),
});
const noEvidencePayload = await noEvidence.json();
const noEvidenceOk = noEvidence.ok && noEvidencePayload.claims?.length === 0 && noEvidencePayload.citations?.length === 0 && noEvidencePayload.answer?.includes("does not contain evidence");
console.log(`${noEvidenceOk ? "PASS" : "FAIL"} concierge refuses unsupported answers`);
if (!noEvidenceOk) failures += 1;

const generation = await fetch(`${baseUrl}/api/generate`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ profile: "sam", audience: "community", format: "carousel", objective: "Explain a documented public-system tension." }),
});
const generationPayload = await generation.json();
const generationOk = generation.ok && generationPayload.draft?.includes("Slide 1") && generationPayload.evidence?.length > 0 && generationPayload.gates?.length > 0;
console.log(`${generationOk ? "PASS" : "FAIL"} governed generation with evidence and gates`);
if (!generationOk) failures += 1;

if (failures > 0) {
  console.error(`Smoke suite failed: ${failures} check(s).`);
  process.exit(1);
}

console.log(`Smoke suite passed against ${baseUrl}.`);
