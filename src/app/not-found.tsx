import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8 text-center select-none">
      <FileQuestion
        className="w-20 h-20 text-syntax-accent mb-6"
        strokeWidth={1.5}
      />
      <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
        404: File Not Found
      </h1>
      <p className="text-text-dimmed text-sm md:text-base mb-6">
        {"//"} The requested path does not exist in this workspace
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-bg-sidebar border border-border-line rounded-md outline-none hover:bg-bg-active-element hover:text-syntax-accent focus:bg-bg-active-element focus:text-syntax-accent text-text-primary"
      >
        Return to root
      </Link>
    </div>
  );
}
