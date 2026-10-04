import { cn } from "@/lib/utils";
import { CodePanelProjectData } from "@/types";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

type ProjectItemProps = {
  data: CodePanelProjectData;
};

export const ProjectItem = ({ data }: ProjectItemProps) => {
  const variableStyles = "text-syntax-accent";
  const stringStyles = "text-syntax-string";

  return (
    <div>
      <p>
        <span className="text-syntax-keyword">export</span>
        <span className="text-syntax-accent/60"> const</span>
        <span className="text-syntax-function"> project</span>
        <span> = </span>
        <span className="text-syntax-function/80">{"{"}</span>
      </p>

      <div className="pl-7">
        <p>
          <span className={cn(variableStyles)}>name</span>:{" "}
          <span className={cn(stringStyles)}>
            {'"'}
            {data.name}
            {'"'}
          </span>
        </p>

        <p>
          <span className={cn(variableStyles)}>type</span>:{" "}
          <span className={cn(stringStyles)}>
            {'"'}
            {data.type}
            {'"'}
          </span>
        </p>

        <p>
          <span className={cn(variableStyles)}>stack</span>:{" "}
          <span>
            <span className="text-syntax-keyword">{"["}</span>
            {data.stack.map((tech, index) => {
              return (
                <Fragment key={`tech-item-${index}`}>
                  <span className={cn(stringStyles)}>
                    {'"'}
                    {tech}
                    {'"'}
                  </span>
                  {index !== data.stack.length - 1 && ", "}
                </Fragment>
              );
            })}
            <span className="text-syntax-keyword">{"]"}</span>
          </span>
        </p>

        <p className="text-syntax-comment mt-6">{"//"} terminal-inspired UI</p>

        <p>
          <span className={cn(variableStyles)}>theme</span>:{" "}
          <span className={cn(stringStyles)}>
            {'"'}
            {data.theme}
            {'"'}
          </span>
        </p>

        <p>
          <span className={cn(variableStyles)}>status</span>:{" "}
          <span className={cn(stringStyles)}>
            {'"'}
            {data.status}
            {'"'}
          </span>
        </p>

        <p>
          <span className={cn(variableStyles)}>githubUrl</span>:{" "}
          <span className={cn(stringStyles)}>
            {'"'}
            <Link
              href={data.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {data.githubUrl}
            </Link>
            {'"'}
          </span>
        </p>

        <p>
          <span className={cn(variableStyles)}>liveUrl</span>:{" "}
          <span className={cn(stringStyles)}>
            {'"'}
            <Link
              href={data.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {data.liveUrl}
            </Link>
            {'"'}
          </span>
        </p>
      </div>

      <span className="text-syntax-function/80">{"}"}</span>
    </div>
  );
};
