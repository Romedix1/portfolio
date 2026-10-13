"use client";

import { toast } from "sonner";

type Project = {
  name: string;
  path: string;
  url: string;
};
type Command = {
  name: string;
  action: () => void;
};

export const PROJECTS: Project[] = [
  {
    name: "blackwall-tech.tsx",
    path: "portfolio/projects",
    url: "/blackwall-tech",
  },
  { name: "cv-creator.tsx", path: "portfolio/projects", url: "/cv-creator" },
  { name: "about.md", path: "portfolio", url: "/about" },
  { name: "contact.md", path: "portfolio", url: "/contact" },
];

export function getAvailableCommands(onClose: () => void): Command[] {
  return [
    {
      name: "Contact: Copy Email Address",
      action: async () => {
        try {
          await navigator.clipboard.writeText("doboszmichal4@gmail.com");
          toast.success("Email copied!");
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("[COPY EMAIL ERROR]: ", error);
          }
          toast.error("Error while copying email");
        }
      },
    },
    {
      name: "File: Download CV (.pdf)",
      action: async () => {
        try {
          const res = await fetch("/cv.pdf");
          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          const blob = await res.blob();
          const url = URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = "CV_Michał_Dobosz.pdf";
          link.click();

          URL.revokeObjectURL(url);
          toast.success("CV downloaded!");
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("[DOWNLOAD CV ERROR]: ", error);
          }
          toast.error("Error while downloading CV");
        }
      },
    },
    {
      name: "Social: Open GitHub Profile",
      action: async () => {
        window.open("https://github.com/Romedix1", "_blank");
        onClose();
      },
    },
    {
      name: "Social: Open LinkedIn",
      action: async () => {
        window.open(
          "https://www.linkedin.com/in/micha%C5%82-dobosz-553762275/",
          "_blank",
        );
        onClose();
      },
    },
    {
      name: "Developer: Reload Window",
      action: async () => {
        window.location.reload();
      },
    },
  ];
}
