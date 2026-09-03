import Link from "next/link";

export default function ConceptBoundary() {
  return (
    <aside className="conceptBoundary" aria-label="Prototype and authorship notice">
      <strong>Speculative professional-presence concept</strong>
      <p>
        RN Studio created this independent, evidence-led demonstration. First-person passages are proposed copy—not statements published or approved by either subject. Neither subject hired, commissioned, endorsed, or is affiliated with this project.
      </p>
      <Link href="/corrections">Request a correction or takedown →</Link>
    </aside>
  );
}
