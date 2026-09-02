import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Professional Profiles — RN Studio",
  description: "A future-facing professional presence concept by RN Studio."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
