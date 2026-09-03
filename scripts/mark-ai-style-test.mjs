import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const files = [
  "app/for-mark/page.tsx",
  "app/for-mark/corrections/page.tsx",
  "app/for-mark/mark-private-data.ts",
  "app/for-mark/opengraph-image.tsx",
  "research/mark-outreach-email.md",
];

const text = (await Promise.all(files.map((file) => readFile(file, "utf8")))).join("\n");

const aiVocabulary = /\b(?:crucial|pivotal|vital|significant|underscores?|highlights?|reflects?|symboliz\w*|contribut\w*|cultivat\w*|foster\w*|encompass\w*|enhanc\w*|valuable insights?|aligns?|resonates?|boasts?|vibrant|profound|showcas\w*|exemplif\w*|groundbreaking|renowned|tapestry|delve\w*|testament|enduring|evolving landscape|navigate\w*|leverage\w*|seamless|robust|holistic|multifaceted|transformative|elevat\w*|empower\w*)\b/i;

assert.doesNotMatch(text, aiVocabulary, "Mark copy should avoid Wikipedia's high-frequency AI vocabulary");
assert.doesNotMatch(text, /—|–/, "Mark copy should not rely on em or en dashes");
assert.doesNotMatch(text, /\bnot (?:just|only)\b|\bnot\s+[^.!?]{1,80}\s+but\b|\brather than\b/i, "Mark copy should avoid canned negative parallelism");
assert.doesNotMatch(text, /serves? as|stands? as|is a testament|marks? a shift|broader (?:trend|landscape|context)/i, "Mark copy should avoid inflated significance formulas");
assert.doesNotMatch(text, /(?:contentReference|oaicite|turn\d+(?:search|view)\d+|:::writing|\[cite:)/i, "Mark copy should contain no model or citation artifacts");

console.log("Mark site and outreach email AI-style audit: PASS");
