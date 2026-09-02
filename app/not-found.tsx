import Link from "next/link";

export default function NotFound() {
  return (
    <main className="systemState">
      <p className="sectionLabel">404 · Profile not found</p>
      <h1>This evidence record does not exist.</h1>
      <p>The requested profile is not part of the verified public-source collection.</p>
      <Link href="/">Return to the profile studio</Link>
    </main>
  );
}
