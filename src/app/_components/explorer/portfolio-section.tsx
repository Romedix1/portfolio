"use client";

import { ProjectsSection } from "@/app/_components/explorer/projects-section";
import { TreeItem } from "@/app/_components/ui/tree-item";
import { useState } from "react";

export const PortfolioSection = () => {
  const [isRootOpen, setIsRootOpen] = useState(true);
  const [isProjectOpen, setIsProjectOpen] = useState(true);

  return (
    <article>
      <TreeItem type="folder" text="portfolio" setIsOpen={setIsRootOpen} />

      {isRootOpen && (
        <>
          <div className="pl-7">
            <ProjectsSection
              isProjectOpen={isProjectOpen}
              setIsProjectOpen={setIsProjectOpen}
            />
          </div>

          <div className="pl-7">
            <TreeItem type="file" href="/about" text="about.md" />
            <TreeItem type="file" href="/contact" text="contact.md" />
          </div>
        </>
      )}
    </article>
  );
};
