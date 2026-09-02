"use client";

import { track } from "@vercel/analytics";
import { useState } from "react";

export default function ProfileTools({
  name,
  slug,
  markdown,
}: {
  name: string;
  slug: string;
  markdown: string;
}) {
  const [message, setMessage] = useState("");

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      setMessage("Profile URL copied.");
      track("standalone_profile_shared", { profile: slug });
    } catch {
      setMessage("Copy is unavailable in this browser.");
    }
  };

  const downloadBrief = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slug}-professional-presence-brief.md`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage(`${name} brief downloaded.`);
    track("strategy_brief_downloaded", { profile: slug, format: "markdown" });
  };

  return (
    <div className="briefTools" aria-label="Profile tools">
      <button onClick={copyUrl}>Copy profile URL</button>
      <button onClick={downloadBrief}>Download strategy brief</button>
      <button
        onClick={() => {
          window.print();
          track("strategy_brief_printed", { profile: slug });
        }}
      >
        Print / save PDF
      </button>
      <p className="srOnly" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
