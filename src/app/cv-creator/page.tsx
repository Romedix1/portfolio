import { CodePanel } from "@/app/_components/code-panel";

export default function Contact() {
  const projectData = {
    name: "Cv Creator",
    type: "SaaS",
    stack: [
      "Next.js",
      "Tailwind",
      "Supabase",
      "PostgreSQL",
      "Puppeter",
    ],
    description: "Professional resume builder",
    theme: "light | dark",
    status: "live",
    githubUrl: "https://github.com/Romedix1/Cv-Creator",
    liveUrl: "https://cv-creator-kappa.vercel.app/",
  };

  return <CodePanel type="project" data={projectData} />;
}
