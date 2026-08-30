import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
};

export const LinkButton = ({
  href,
  variant = "primary",
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "shadow-3d-md px-8 hover:shadow-none hover:translate-x-1 hover:translate-y-1 py-4 border-2 border-text-primary text-text-primary text-sm font-bold uppercase w-full flex justify-center items-center whitespace-nowrap";

  const variants = {
    primary: "bg-accent-secondary hover:brightness-130",
    secondary: "bg-bg-surface hover:brightness-75",
  };

  return (
    <Link
      href={href}
      className={cn(baseStyles, variants[variant], "")}
      {...props}
    >
      {children}
    </Link>
  );
};
