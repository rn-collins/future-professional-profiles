import type { Metadata } from "next";
import StrategyLab from "./StrategyLab";

export async function generateMetadata({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }): Promise<Metadata> {
  const params = await searchParams;
  return { title: "Interactive Strategy Lab | RN Studio", description: "Explore evidence-grounded audience journeys, positioning transformations, and strategic scenarios for two future professional-profile concepts.", alternates: { canonical: "/strategy-lab" }, robots: params.exp_strategy_orientation ? { index: false, follow: false } : undefined };
}

export default function StrategyLabPage() { return <StrategyLab />; }
