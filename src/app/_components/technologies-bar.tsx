import { Fragment } from "react";

export const TechnologiesBar = () => {
  const TECHNOLOGIES = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL",
    "Prisma",
    "Neon",
    "Supabase",
    "Redis",
    "Stripe",
  ];

  const duplicatedTechnologies = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <div className="bg-text-primary overflow-hidden flex flex-nowrap py-3">
      z
      <div className="animate-marquee flex shrink-0 items-center">
        {duplicatedTechnologies.map((technology, index) => (
          <Fragment key={`track1-${index}`}>
            <span className="font-bold text-sm text-bg-base whitespace-nowrap">
              {technology}
            </span>
            <span className="text-accent-secondary inline-block mx-4">—</span>
          </Fragment>
        ))}
      </div>
      <div
        className="animate-marquee flex shrink-0 items-center"
        aria-hidden="true"
      >
        {duplicatedTechnologies.map((technology, index) => (
          <Fragment key={`track2-${index}`}>
            <span className="font-bold text-sm text-bg-base whitespace-nowrap">
              {technology}
            </span>
            <span className="text-accent-secondary inline-block mx-4">—</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
