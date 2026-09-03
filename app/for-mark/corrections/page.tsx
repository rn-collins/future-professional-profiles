import type { Metadata } from "next";
import Link from "next/link";
import styles from "../for-mark.module.css";

export const metadata: Metadata = {
  title: { absolute: "Corrections or removal | Mark H. Young draft | RN Studio" },
  description: "How to request a correction or removal from RN Studio’s private draft for Mark H. Young.",
  applicationName: "Mark H. Young | Private RN Studio draft",
  keywords: ["Mark H. Young", "RN Studio", "correction request", "removal request"],
  authors: [{ name: "RN Studio" }],
  creator: "RN Studio",
  publisher: "RN Studio",
  alternates: { canonical: "/for-mark/corrections" },
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
  openGraph: {
    title: "Corrections or removal | Mark H. Young draft",
    description: "Private reply instructions for RN Studio’s working draft.",
    url: "/for-mark/corrections",
    siteName: "RN Studio",
    images: [{ url: "/for-mark/opengraph-image", width: 1200, height: 630, alt: "RN Studio publishing plan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corrections or removal | Mark H. Young draft",
    description: "Private reply instructions for RN Studio’s working draft.",
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
        <p className={styles.eyebrow}>Corrections and removal</p>
        <h1 id="corrections-title">Reply to the message that brought you here.</h1>
        <p>
          Tell me if a fact is wrong, a source has changed, you object to the portrait, or you want any part of this draft removed. I will review the request and respond in the same private conversation.
        </p>
        <p>
          Please identify the passage, image, or source and tell me what you want changed. You may include a public source when correcting a fact. You do not need one to raise a privacy or copyright concern or to ask for removal.
        </p>
        <p><b>Please keep personal identification, addresses, family details, client information, and confidential records out of public comments.</b></p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/for-mark">Return to the presentation</Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <p><b>Prepared independently by RN Studio.</b> This private draft uses public professional sources. Mark may request a correction or removal.</p>
        <p>This page does not send a form or create a public issue. Use the email or direct message that contained the original link.</p>
      </footer>
    </main>
  );
}
