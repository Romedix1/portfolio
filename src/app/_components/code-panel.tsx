import { ProjectItem } from "@/app/_components/ui";
import { ProjectItemData } from "@/types";
import { ReactNode } from "react";

type MarkdownProps = {
  type: "markdown";
  children: ReactNode;
};

type FolderProps = {
  type: "project";
  data: ProjectItemData;
};

type CodePanelProps = MarkdownProps | FolderProps;

export const CodePanel = (props: CodePanelProps) => {
  const lineNumbers = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <section className="flex h-full overflow-y-auto p-6">
      <div className="flex flex-col text-right pr-6 select-none opacity-40 shrink-0 text-text-dimmed">
        {lineNumbers.map((num) => (
          <span key={num}>{num}</span>
        ))}
      </div>

      {props.type === "markdown" ? (
        <div>{props.children}</div>
      ) : (
        <ProjectItem data={props.data} />
      )}
    </section>
  );
};
