"use client";

import { ProjectItem } from "@/app/_components/ui";
import { CodePanelProjectData } from "@/types";
import { ReactNode, useEffect, useRef, useState } from "react";

type MarkdownProps = {
  type: "markdown";
  children: ReactNode;
};

type FolderProps = {
  type: "project";
  data: CodePanelProjectData;
};

type CodePanelProps = MarkdownProps | FolderProps;

export const CodePanel = (props: CodePanelProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [linesCount, setLinesCount] = useState(1);

  const LINE_HEIGHT = 24;

  useEffect(() => {
    if (!contentRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        const calculatedLines = Math.max(1, Math.round(height / LINE_HEIGHT));
        setLinesCount(calculatedLines);
      }
    });

    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const lineNumbers = Array.from({ length: linesCount }, (_, i) => i + 1);

  return (
    <section className="flex h-full overflow-y-auto p-6 flex-1">
      <div className="flex flex-col text-right pr-6 select-none opacity-40 shrink-0 text-text-dimmed">
        {lineNumbers.map((num) => (
          <span key={`line-${num}`} style={{ height: `${LINE_HEIGHT}px` }}>
            {num}
          </span>
        ))}
      </div>

      <div className="flex-1">
        <div ref={contentRef} className="h-fit">
          {props.type === "markdown" ? (
            <div>{props.children}</div>
          ) : (
            <ProjectItem data={props.data} />
          )}
        </div>
      </div>
    </section>
  );
};
