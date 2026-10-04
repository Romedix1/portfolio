"use client";

import { TreeItem } from "@/app/_components/ui";
import { Dispatch, SetStateAction } from "react";

type ProjectsSectionProps = {
  isProjectOpen: boolean;
  setIsProjectOpen: Dispatch<SetStateAction<boolean>>;
};

export const ProjectsSection = ({
  isProjectOpen,
  setIsProjectOpen,
}: ProjectsSectionProps) => {
  return (
    <article>
      <TreeItem type="folder" text="projects" setIsOpen={setIsProjectOpen} />

      {isProjectOpen && (
        <div className="pl-7">
          <TreeItem type="file" href="/cv-creator" text="cv-creator.tsx" />
          <TreeItem
            type="file"
            href="/blackwall-tech"
            text="blackwall-tech.tsx"
          />
        </div>
      )}
    </article>
  );
};
