"use client";

import styles from "./for-mark.module.css";

export default function PrintButton() {
  return <button className={styles.print} type="button" onClick={() => window.print()}>Save as PDF</button>;
}
