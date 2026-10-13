"use client";

import { useEffect } from "react";
import { SearchModal, Terminal } from "@/app/_components";
import { useCommandStore } from "@/store/useCommandStore";

export const CommandPaletteProvider = () => {
  const { isSearchOpen, isTerminalOpen, openSearch, toggleTerminal } =
    useCommandStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;

      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      const isKeyP = event.key?.toLowerCase() === "p" || event.code === "KeyP";

      if ((isCtrlOrCmd && event.shiftKey && isKeyP) || event.key === "F1") {
        event.preventDefault();
        event.stopPropagation();
        openSearch(">");
        return;
      }

      if (isCtrlOrCmd && !event.shiftKey && isKeyP) {
        event.preventDefault();
        event.stopPropagation();
        openSearch("");
        return;
      }

      if (isCtrlOrCmd && (event.key === "`" || event.code === "Backquote")) {
        event.preventDefault();
        event.stopPropagation();
        toggleTerminal();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openSearch, toggleTerminal]);

  return (
    <>
      {isSearchOpen && <SearchModal />}
      {isTerminalOpen && <Terminal />}
    </>
  );
};
