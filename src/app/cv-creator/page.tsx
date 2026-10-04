import { CodePanel } from "@/app/_components/code-panel";
import { LivePreview } from "@/app/_components/live-preview";

export default function CvCreator() {
  const projectData = {
    name: "Cv Creator",
    imageUrl: "/Cv-creator.png",
    type: "SaaS",
    stack: ["Next.js", "Tailwind", "Supabase", "PostgreSQL", "Puppeter"],
    description: "Professional resume builder",
    descriptionExtended:
      "A full-stack Next.js application that provides an interactive drag-and-drop resume builder with real-time previews and multiple templates. It features secure user authentication and data management via Supabase, alongside full internationalization for English and Polish. The backend utilizes Puppeteer for serverless, pixel-perfect PDF rendering, while the dashboard allows users to manage and duplicate up to 5 individual resumes.",
    theme: "light | dark",
    status: "live",
    githubUrl: "https://github.com/Romedix1/Cv-Creator",
    liveUrl: "https://cv-creator-kappa.vercel.app/",
  };

  const { imageUrl, descriptionExtended, ...codePanelData } = projectData;

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
