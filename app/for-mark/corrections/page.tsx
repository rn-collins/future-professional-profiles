import type { Metadata } from "next";
import Link from "next/link";
import styles from "../for-mark.module.css";

export const metadata: Metadata = {
  title: "Corrections or removal — Mark H. Young presentation",
  description: "Private-response instructions for the independent RN Studio presentation prepared for Mark H. Young.",
  applicationName: "Mark H. Young — Private RN Studio Demonstration",
  keywords: ["Mark H. Young", "RN Studio", "correction request", "removal request"],
  authors: [{ name: "RN Studio" }],
  creator: "RN Studio",
  publisher: "RN Studio",
  alternates: { canonical: "/for-mark/corrections" },
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
  openGraph: {
    title: "Corrections or removal — Mark H. Young presentation",
    description: "Private-response instructions for an independent RN Studio demonstration.",
    url: "/for-mark/corrections",
    siteName: "RN Studio",
    images: [{ url: "/for-mark/opengraph-image", width: 1200, height: 630, alt: "RN Studio professional authority system" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corrections or removal — Mark H. Young presentation",
    description: "Private-response instructions for an independent RN Studio demonstration.",
    images: ["/for-mark/opengraph-image"],
  },
};

export default function MarkCorrectionsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link href="/for-mark" className={styles.brand} aria-label="Return to Mark H. Young presentation">
          <span aria-hidden="true">RN</span><b>RN Studio</b>
        </Link>
      </header>

      <section className={styles.brief} aria-labelledby="corrections-title">
        <p className={styles.eyebrow}>Corrections, rights, and removal</p>
        <h1 id="corrections-title">Your response stays in the private conversation.</h1>
        <p>
          If a fact is wrong, a source has changed, the portrait raises a rights concern, or you would like any part of this independent demonstration removed, reply to the email or direct message that delivered the link.
        </p>
        <p>
          Identify the passage, image, or source at issue and the correction or removal you want. A supporting public source is useful for factual corrections but is not required for a privacy, rights, or removal request.
        </p>
        <p><b>Do not place private identification, addresses, family details, client information, or confidential records in a public issue or comment.</b></p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/for-mark">Return to the presentation</Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <p><b>Independent work by RN Studio.</b> This private demonstration was assembled from public professional evidence and remains subject to correction or removal.</p>
        <p>This page does not submit a request or create a public issue. Replying privately to the message that delivered the presentation is the only correction pathway described here.</p>
      </footer>
    </main>
  );
}
