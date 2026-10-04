import { CodePanel } from "@/app/_components/code-panel";
import Link from "next/link";

export default function Contact() {
  const CONTACT_DATA = [
    {
      label: "Email",
      value: "doboszmichal4@gmail.com",
      href: "mailto:doboszmichal4@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/michał-dobosz-553762275",
      href: "https://www.linkedin.com/in/micha%C5%82-dobosz-553762275/",
    },
    {
      label: "GitHub",
      value: "github.com/Romedix1",
      href: "https://github.com/Romedix1",
    },
  ];

  return (
    <CodePanel type="markdown">
      <div className="mb-6 text-syntax-accent font-bold ">
        <span>#</span>
        <span className="ml-2">Contact</span>
      </div>

      <div className="text-text-primary flex flex-col gap-6 leading-loose max-w-3xl mb-6">
        <p className="leading-6">
          Looking for someone to join your team or collaborate on a new project?
          Or maybe you just want to chat about web development? Feel free to
          reach out through any of the channels below.
        </p>
        <p className="leading-6">
          I respond fastest to emails and LinkedIn messages. I am currently open
          to new opportunities and would love to hear about your project.
        </p>
      </div>

      <div className="mb-6 text-syntax-accent">
        <span>##</span>
        <span className="ml-2">Direct Links</span>
      </div>

      <div className=" text-text-primary">
        {CONTACT_DATA.map((data) => {
          return (
            <div key={`contact-data-${data.label}`} className="leading-6 ">
              <span className="text-syntax-accent mr-2">- </span>

              <span className="font-bold mr-2">{data.label}:</span>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={data.href}
                className="hover:text-syntax-accent hover:underline break-all"
              >
                {data.value}
              </Link>
            </div>
          );
        })}
      </div>
    </CodePanel>
  );
}
