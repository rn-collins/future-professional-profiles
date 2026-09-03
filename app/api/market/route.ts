import { marketIntelligence } from "../../market-intelligence";

export function GET() {
  return Response.json(marketIntelligence, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
