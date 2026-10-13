import { CodePanel } from "@/app/_components/code-panel";
import { LivePreview } from "@/app/_components/live-preview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blackwall-tech.tsx",
  description:
    "E-commerce platform and workstation configurator built with Next.js, PostgreSQL, and Stripe.",
};

export default function BlackwallTech() {
  const projectData = {
    name: "Blackwall Tech",
    type: "E-commerce",
    imageUrl: "/Blackwall-tech.png",
    stack: [
      "Next.js",
      "React",
      "Tailwind",
      "Zustand",
      "PostgreSQL",
      "Prisma",
      "Stripe",
    ],
    description: "terminal-inspired UI for hardware buyers",
    descriptionExtended:
      "A full-stack Next.js application delivering a premium e-commerce platform and workstation configurator tailored for high-performance hardware enthusiasts. The platform features an interactive PC builder with real-time compatibility and pricing updates, a terminal-inspired UI, and automated transaction emails. It includes a slide-out cart overlay, secure payment processing via Stripe, robust session management leveraging NextAuth v5, and a dedicated admin command center for managing orders and inventory.",
    theme: "terminal-dark",
    status: "live",
    githubUrl: "https://github.com/Romedix1/Blackwall-tech-ecommerce",
    liveUrl: "https://blackwall-tech-ecommerce.vercel.app/",
  };

  const codePanelData = {
    name: projectData.name,
    type: projectData.type,
    stack: projectData.stack,
    description: projectData.description,
    theme: projectData.theme,
    status: projectData.status,
    githubUrl: projectData.githubUrl,
    liveUrl: projectData.liveUrl,
  };

  const livePreviewData = {
    name: projectData.name,
    type: projectData.type,
    imageUrl: projectData.imageUrl,
    descriptionExtended: projectData.descriptionExtended,
    stack: projectData.stack,
    liveUrl: projectData.liveUrl,
    githubUrl: projectData.githubUrl,
  };

  return (
    <div className="flex h-full flex-col sm:flex-row">
      <CodePanel type="project" data={codePanelData} />
      <LivePreview data={livePreviewData} />
    </div>
  );
}
