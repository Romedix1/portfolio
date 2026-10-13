"use client";

import { getTerminalOutput } from "@/app/_components/terminal-commands";
import { KeyboardEvent, ReactNode, useRef, useState } from "react";

export type HistoryItem = {
  command: string;
  output: string | ReactNode;
};

export function useTerminalHistory() {
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(true);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [cursorPos, setCursorPos] = useState(0);

  const updateCursor = () => {
    if (inputRef.current) {
      setCursorPos(inputRef.current.selectionStart || 0);
    }
  };

  const scrollToBottom = () => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const command = value.trim();

      if (command === "clear") {
        setHistory([]);
        setValue("");
        return;
      }

      const output = getTerminalOutput(command);

      if ((command && command !== "clear") || command === "") {
        setHistory((prev) => {
          const newHistory = [...prev, { command, output }];
          setCurrentHistoryIndex(newHistory.length);
          return newHistory;
        });
      } else {
        setCurrentHistoryIndex(0);
      }

      setValue("");
      setTimeout(scrollToBottom, 0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();

      const newIndex = Math.max(currentHistoryIndex - 1, 0);

      if (history[newIndex]) {
        setCurrentHistoryIndex(newIndex);
        setValue(history[newIndex].command);
        setCursorPos(history[newIndex].command.length);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();

      const newIndex = Math.min(currentHistoryIndex + 1, history.length);

      setCurrentHistoryIndex(newIndex);

      if (newIndex === history.length) {
        setValue("");
        setCursorPos(0);
      } else if (history[newIndex]) {
        setValue(history[newIndex].command);
        setCursorPos(history[newIndex].command.length);
      }
    }
  };

  const textBeforeCursor = value.substring(0, cursorPos);
  const charUnderCursor = value.substring(cursorPos, cursorPos + 1) || " ";
  const textAfterCursor = value.substring(cursorPos + 1);

  return {
    value,
    setValue,
    isFocused,
    setIsFocused,
    history,
    inputRef,
    endOfTerminalRef,
    updateCursor,
    handleKeyDown,
    focusInput: () => inputRef.current?.focus(),
    textBeforeCursor,
    charUnderCursor,
    textAfterCursor,
  };
}

