"use client";

import { cn } from "@/lib/utils";
import { useTabStore } from "@/store/useTabStore";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";

type FileTabProps = {
  text: string;
  path: string;
};

export const FileTab = ({ text, path }: FileTabProps) => {
  const router = useRouter();
  const currentPath = usePathname();

  const { removeTab } = useTabStore();

  const isCurrentPath = currentPath === path;

  const handleCloseTab = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    removeTab(text);

    if (isCurrentPath) {
      router.push("/");
    }
  };

  const tabStyles = isCurrentPath
    ? "bg-bg-main border-syntax-accent border-t-2 text-text-primary"
    : "bg-bg-tab-inactive border-r text-text-dimmed border-border-line hover:bg-bg-main hover:text-text-primary ";

  return (
    <Link
      className={cn(
        "pl-4.5 shrink-0 pr-3 py-2.5 flex items-center gap-3",
        tabStyles,
      )}
      href={path}
    >
      {text}

      <X
        onClick={handleCloseTab}
        className="w-5 h-5 hover:bg-text-dimmed/30 shrink-0 rounded"
        aria-label={`Close ${text} tab`}
      />
    </Link>
  );
};
