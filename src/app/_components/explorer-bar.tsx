"use client";

import { PortfolioSection } from "@/app/_components/explorer/portfolio-section";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";

export const ExplorerBar = () => {
  const [isExanded, setIsExpanded] = useState(true);

  const panelButtonstyles =
    "cursor-pointer hover:text-syntax-accent focus:text-syntax-accent rotate-90 lg:rotate-0";

  return (
    <aside
      className={cn("py-4 pl-4 bg-bg-sidebar lg:h-screen overflow-hidden")}
    >
      <div
        className={cn(
          "flex justify-between items-center mr-4 mb-2",
          !isExanded && "justify-end lg:justify-between",
        )}
      >
        {isExanded && (
          <h2 className="uppercase text text-text-dimmed">Explorer</h2>
        )}

        {isExanded ? (
          <PanelLeftClose
            onClick={() => setIsExpanded(false)}
            className={panelButtonstyles}
          />
        ) : (
          <PanelLeftOpen
            onClick={() => setIsExpanded(true)}
            className={panelButtonstyles}
          />
        )}
      </div>

      {isExanded && <PortfolioSection />}
    </aside>
  );
};
