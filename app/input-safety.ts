export function safeQueryText(value: string | string[] | undefined, maxLength = 120): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
  return cleaned || undefined;
}

export function safeProfile(value: string | string[] | undefined): "mark" | "sam" | undefined {
  return value === "mark" || value === "sam" ? value : undefined;
}
