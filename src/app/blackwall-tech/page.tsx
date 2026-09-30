import { CodePanel } from "@/app/_components/code-panel";

export default function Contact() {
  const projectData = {
    name: "Blackwall Tech",
    type: "E-commerce",
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
    theme: "terminal-dark",
    status: "live",
    githubUrl: "https://github.com/Romedix1/Blackwall-tech-ecommerce",
    liveUrl: "https://blackwall-tech-ecommerce.vercel.app/",
  };

  return <CodePanel type="project" data={projectData} />;
}
