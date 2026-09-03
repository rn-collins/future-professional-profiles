import type { Metadata } from "next";
import WorkspaceClient from "./WorkspaceClient";

export const metadata: Metadata = { title: "Approval Workspace | RN Studio", description: "A browser-local editorial approval workspace with evidence gates, review notes, versions, and export.", alternates: { canonical: "/workspace" } };
export default function WorkspacePage() { return <WorkspaceClient />; }
