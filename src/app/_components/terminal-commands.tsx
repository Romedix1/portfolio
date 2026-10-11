import Link from "next/link";
import { ReactNode } from "react";

export function getTerminalOutput(fullCommand: string): string | ReactNode {
  const [command, ...args] = fullCommand.split(" ");
  const argString = args.join(" ");

  switch (command) {
    case "help":
      return "help, whoami, skills, contact, projects, clear, date, echo, sudo";
    case "whoami":
      return "Michał - Full-stack developer. I build scalable web applications with clean, maintainable code.";
    case "skills":
      return (
        <div className="text-text-primary">
          <span className="text-syntax-accent font-bold">Tech Stack: </span>
          Next.js, React, TypeScript, Git, Vercel, Playwright, Supabase, NeonDB
        </div>
      );
    case "contact":
      return (
        <div className="flex flex-col text-text-primary">
          <div>
            <span className="font-bold text-syntax-accent">Email: </span>
            <Link
              href="mailto:doboszmichal4@gmail.com"
              className="hover:underline"
            >
              doboszmichal4@gmail.com
            </Link>
          </div>
          <div>
            <span className="font-bold text-syntax-accent">LinkedIn: </span>
            <Link
              href="https://www.linkedin.com/in/micha%C5%82-dobosz-553762275/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              linkedin.com/in/michał-dobosz-553762275
            </Link>
          </div>
          <div>
            <span className="font-bold text-syntax-accent">GitHub: </span>
            <Link
              href="https://github.com/Romedix1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              github.com/Romedix1
            </Link>
          </div>
        </div>
      );
    case "projects":
      return (
        <div className="flex flex-col gap-5 text-text-primary">
          <div>
            <span className="font-bold text-syntax-accent">Blackwall Tech</span>
            <p className="text-text-dimmed">
              E-commerce platform and workstation configurator built with Next.js, PostgreSQL, and Stripe.
            </p>
          </div>
          <div>
            <span className="font-bold text-syntax-accent">CV Creator</span>
            <p className="text-text-dimmed">
              Interactive resume builder SaaS with real-time preview and serverless PDF generation built with Next.js and Supabase.
            </p>
          </div>
        </div>
      );
    case "clear":
      return null;
    case "date": {
      const now = new Date();

      return now.toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    }
    case "echo":
      return argString;
    case "sudo":
      return "permission denied. This incident will be reported";
    case "":
      return;
  }
  return `${command}: command not found`;
}
