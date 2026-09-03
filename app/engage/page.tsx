import type { Metadata } from "next";
import EngageClient from "./EngageClient";
import { safeProfile, safeQueryText } from "../input-safety";

export async function generateMetadata({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }): Promise<Metadata> {
  const params = await searchParams;
  const personalized = Boolean(safeQueryText(params.recipient, 80) || safeProfile(params.profile) || safeQueryText(params.goal) || safeQueryText(params.exp_engage_brief, 10));
  return { title: "Work with RN Studio", description: "Explore evidence-led strategy, editorial, and professional-profile engagements with RN Studio.", alternates: { canonical: "/engage" }, robots: personalized ? { index: false, follow: false } : undefined };
}

export default async function EngagePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  return <EngageClient initial={{ recipient: safeQueryText(params.recipient, 80), profile: safeProfile(params.profile), goal: safeQueryText(params.goal) }} />;
}
