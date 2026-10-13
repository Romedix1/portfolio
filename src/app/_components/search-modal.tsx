"use client";

import {
  getAvailableCommands,
  PROJECTS,
} from "@/app/_components/search-modal-commands";
import { useTabStore } from "@/store/useTabStore";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type SearchModalProps = {
  value: string;
  setValue: (value: string) => void;
  onClose: () => void;
};

export const SearchModal = ({ value, setValue, onClose }: SearchModalProps) => {
  const router = useRouter();

  const path = usePathname();
  const modalRef = useRef<HTMLDivElement>(null);

  const { addTab } = useTabStore();

  const availableCommands = useMemo(
    () => getAvailableCommands(onClose),
    [onClose],
  );

  const isCommandMode = value.startsWith(">");

  const initialIndex = PROJECTS.findIndex((project) =>
    !isCommandMode ? project.url === path : 0,
  );
  const [currentSelected, setCurrentSelected] = useState(
    initialIndex >= 0 ? initialIndex : 0,
  );

  const filteredProjects = PROJECTS.filter((project) =>
    project.name.toLowerCase().includes(value.toLowerCase()),
  );

  const filteredCommands = availableCommands.filter((command) =>
    command.name.toLowerCase().includes(value.slice(1).toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const activeListLength = isCommandMode
        ? filteredCommands.length
        : filteredProjects.length;

      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setCurrentSelected((prev) =>
          prev < activeListLength - 1 ? prev + 1 : prev,
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setCurrentSelected((prev) =>
          prev > 0 ? prev - 1 : activeListLength - 1,
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        const selectedIndex =
          currentSelected < activeListLength ? currentSelected : 0;

        if (isCommandMode && filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        } else if (!isCommandMode && filteredProjects[selectedIndex]) {
          addTab({
            name: filteredProjects[selectedIndex].name,
            path: filteredProjects[selectedIndex].url,
          });
          router.push(filteredProjects[selectedIndex].url);
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    addTab,
    currentSelected,
    filteredCommands,
    filteredProjects,
    isCommandMode,
    onClose,
    router,
  ]);

  return (
    <div
      ref={modalRef}
      className="lg:w-225 w-11/12 bg-bg-main border border-border-line rounded-md overflow-hidden fixed z-50 top-4 left-1/2 -translate-x-1/2"
    >
      <div className="flex items-center justify-between border-b border-border-line pr-3 pl-6 bg-bg-sidebar">
        <input
          onChange={(event) => {
            setValue(event.target.value);
            setCurrentSelected(0);
          }}
          type="text"
          autoFocus
          value={value}
          placeholder={
            isCommandMode
              ? "Type a command to run..."
              : "Search files by name..."
          }
          className="flex-1 bg-transparent text-text-primary placeholder:text-text-dimmed outline-none text-sm py-3"
        />

        <button
          type="button"
          onClick={onClose}
          className="sm:hidden text-text-dimmed hover:text-text-primary p-1.5 rounded hover:bg-bg-active-element flex items-center justify-center"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] text-text-dimmed border border-border-line rounded px-1.5 py-0.5 hidden sm:block">
          ESC
        </span>
      </div>

      {!isCommandMode ? (
        <div className="p-2 flex flex-col text-sm">
          <span className="p-1 flex flex-col">
            {filteredProjects.length > 0 ? (
              <div className="flex flex-col gap-1">
                {filteredProjects.map((project, index) => {
                  return (
                    <Link
                      key={`search-project-${index}`}
                      href={project.url}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-2 py-2 px-3 rounded-md ",
                        currentSelected === index
                          ? "bg-syntax-accent/70 text-text-primary"
                          : "hover:bg-bg-active-element outline-none focus:bg-bg-active-element group",
                      )}
                    >
                      <span className="whitespace-nowrap shrink-0 font-medium text-xs sm:text-sm">
                        {project.name}
                      </span>

                      <span
                        className={cn(
                          "text-text-dimmed group-focus:text-text-primary group-hover:text-text-primary truncate",
                          currentSelected === index && "text-text-primary",
                        )}
                      >
                        {project.path}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="px-3 py-4 text-center text-text-dimmed">
                No matching files found
              </div>
            )}
          </span>
        </div>
      ) : (
        <div className="p-2 flex flex-col text-sm">
          <span className="p-1 flex flex-col">
            {filteredCommands.length > 0 ? (
              <div className="flex flex-col gap-1">
                {filteredCommands.map((command, index) => {
                  return (
                    <button
                      key={`project-command-${index}`}
                      onClick={() => {
                        command.action();
                        onClose();
                      }}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 py-2 px-3 rounded-md text-text-dimmed ",
                        currentSelected === index
                          ? "bg-syntax-accent/70 text-text-primary"
                          : "hover:text-text-primary hover:bg-bg-active-element outline-none focus:text-text-primary focus:bg-bg-active-element",
                      )}
                    >
                      <span className="truncate">{command.name}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="px-3 py-4 text-center text-text-dimmed">
                No commands found
              </div>
            )}
          </span>
        </div>
      )}
    </div>
  );
};
