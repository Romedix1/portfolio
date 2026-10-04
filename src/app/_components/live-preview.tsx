import { BrowserDot } from "@/app/_components/ui";
import { LivePreviewData } from "@/types";
import Image from "next/image";
import Link from "next/link";

type LivePreviewProps = {
  data: LivePreviewData;
};

export const LivePreview = ({ data }: LivePreviewProps) => {
  const DOTS_COLOR = ["34C759", "FFCC00", "FF383C"];

  const {
    name,
    type,
    descriptionExtended,
    stack,
    imageUrl,
    liveUrl,
    githubUrl,
  } = data;

  return (
    <section className="flex p-5.5 gap-3 bg-bg-preview flex-1 flex-col">
      <h3 className="uppercase text-text-dimmed">Live preview</h3>

      <article className="flex flex-col gap-3">
        <div className="w-full flex border border-border-line rounded-md flex-col">
          <div className="flex gap-2.5 p-2.5 justify-end">
            {DOTS_COLOR.map((color, index) => {
              return <BrowserDot key={`dot-${index}`} color={color} />;
            })}
          </div>

          <Image
            src={imageUrl}
            alt={`${name} preview`}
            className="w-full h-auto rounded-b-md"
            width={1900}
            height={750}
            quality={100}
          />
        </div>

        <h4 className="font-semibold text-lg">
          {name} - <span className="whitespace-nowrap">{type}</span>
        </h4>
        <p className="text-text-dimmed ">{descriptionExtended}</p>

        <div className="flex gap-2  flex-wrap">
          {stack.map((tech, index) => {
            return (
              <div
                key={`live-preview-tech-${index}`}
                className="text-text-dimmed rounded-sm px-2.5 py-1 border border-border-line"
              >
                {tech}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3 mt-3">
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-text-primary text-bg-main px-4 py-2 rounded-md text-sm hover:opacity-70 focus:opacity-70 outline-none "
          >
            Visit Website
          </Link>

          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className=" border border-border-line text-text-primary px-4 py-2 rounded-md text-sm hover:bg-border-line/50 focus:bg-border-line/50 outline-none "
          >
            Source Code
          </Link>
        </div>
      </article>
    </section>
  );
};
