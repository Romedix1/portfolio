import { CodePanel } from "@/app/_components/code-panel";

const stack: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Git",
  "Vercel",
  "Playwright",
  "Supabase",
  "NeonDB",
];

export default function About() {
  return (
    <CodePanel type="markdown">
      <div className="mb-6 text-syntax-accent">
        <span className="font-bold">#</span>
        <span className=" font-bold ml-2">About Me</span>
      </div>

      <div className="text-text-primary flex flex-col gap-6 leading-loose max-w-3xl mb-6">
        <p className="leading-6">
          I{"'"}m a front-end developer focused on building scalable, efficient
          web applications with modern tools. My priority is writing clean,
          maintainable code that holds up over time.
        </p>
        <p className="leading-6">
          I work mainly in the Next.js and TypeScript ecosystem, with a strong
          emphasis on solid project architecture - organized file structures,
          clean import patterns, and consistent naming conventions that keep the
          developer experience smooth.
        </p>
        <p className="leading-6">
          I stay current with modern patterns and best practices so that
          everything I ship is not just functional, but easy to extend and
          maintain going forward.
        </p>
      </div>

      <div className="text-syntax-accent">
        <span className="font-bold">##</span>
        <span className="font-bold ml-2">Tech Stack</span>
      </div>

      <div className="leading-6 text-text-primary">
        {stack.map((item) => (
          <div key={item}>
            <span className="text-syntax-accent">- </span>
            <span className="font-bold">{item}</span>
          </div>
        ))}
      </div>
    </CodePanel>
  );
}
