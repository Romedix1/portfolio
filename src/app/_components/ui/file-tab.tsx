"use client";

import { cn } from "@/lib/utils";
import { useTabStore } from "@/store/useTabStore";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type FileTabProsp = {
  text: string;
  path: string;
};

export const FileTab = ({ text, path }: FileTabProsp) => {
  const currentPath = usePathname();

  const { removeTab } = useTabStore();

  const tabStyles =
    currentPath === path
      ? "bg-bg-main shadow-[inset_0_1px_0_0_var(--color-syntax-accent)] text-text-primary"
      : "bg-bg-tab-inactive text-text-dimmed hover:bg-bg-main hover:text-text-primary ";

  return (
    <Link
      className={cn(
        "pl-4.5 pr-3 py-2.5 border-r  flex items-center gap-3 border-border-line",
        tabStyles,
      )}
      href={path}
    >
      {text}

      <X
        onClick={() => removeTab(text)}
        className="w-5 h-5 hover:bg-text-dimmed/30"
      />
    </Link>
  );
};
