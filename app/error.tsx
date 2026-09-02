"use client";

import { useEffect } from "react";

export default function ErrorState({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(JSON.stringify({
      level: "error",
      message: "profile_interface_failed",
      error: error.message,
      digest: error.digest,
    }));
  }, [error]);

  return (
    <main className="systemState">
      <p className="sectionLabel">Interface recovery</p>
      <h1>The profile could not be rendered.</h1>
      <p>The evidence remains intact. Retry the interface without losing saved local preferences.</p>
      <button onClick={reset}>Try again</button>
    </main>
  );
}
