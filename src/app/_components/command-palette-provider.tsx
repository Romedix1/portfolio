"use client";

import { useEffect, useRef, useState } from "react";
import { SearchModal, Terminal } from "@/app/_components";

export const CommandPaletteProvider = () => {
  const [value, setValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const isModalOpenRef = useRef(false);

  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;

      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      const isKeyP = event.key?.toLowerCase() === "p" || event.code === "KeyP";

      if ((isCtrlOrCmd && event.shiftKey && isKeyP) || event.key === "F1") {
        event.preventDefault();
        event.stopPropagation();
        setValue(">");
        setIsModalOpen(true);
        return;
      }

      if (isCtrlOrCmd && !event.shiftKey && isKeyP) {
        event.preventDefault();
        event.stopPropagation();
        setValue("");
        setIsModalOpen(true);
        return;
      }

      if (isCtrlOrCmd && (event.key === "`" || event.code === "Backquote")) {
        event.preventDefault();
        event.stopPropagation();
        setIsTerminalOpen((prev) => !prev);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {isModalOpen && (
        <SearchModal
          value={value}
          setValue={setValue}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}
    </>
  );
};
