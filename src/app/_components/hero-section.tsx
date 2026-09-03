import { LinkButton } from "@/app/_components/ui";

export const HeroSection = () => {
  return (
    <section className="px-4 py-16 bg-accent-primary text-bg-base lg:px-15 lg:py-22.5">
      <div className="flex flex-col gap-6">
        <p className="font-bold text-xs opacity-80 lg:text-[14px]">
          Full-stack developer
        </p>
        <h1 className="font-black lg:w-200 text-[40px] tracking-[-3px] leading-[100%] lg:text-[96px]">
          Code that
          <span className="text-transparent [-webkit-text-stroke:2px_#F4F1EA]">
            {" "}
            ships{" "}
          </span>
          not just demos.
        </h1>

        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <p className="lg:w-6/12">
            Next.js and TypeScript end to end. I build production-ready tools -
            an e-commerce platform with real payment integration, a resume
            builder that takes users from blank page to downloaded PDF.
          </p>

          <div className="gap-4 flex flex-col lg:flex-row">
            <LinkButton href="/">View projects</LinkButton>
            <LinkButton href="https://github.com/Romedix1" variant="secondary">
              Github
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
};
