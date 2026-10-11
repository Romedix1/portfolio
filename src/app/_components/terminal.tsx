"use client";

import { getTerminalOutput } from "@/app/_components/terminal-commands";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useRef, useState, KeyboardEvent, ReactNode } from "react";

type TerminalProps = {
  onClose: () => void;
};

type HistoryItem = {
  command: string;
  output: string | ReactNode;
};

export const Terminal = ({ onClose }: TerminalProps) => {
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

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="absolute bottom-0 left-0 w-full h-64 overflow-y-auto pt-2 bg-bg-sidebar border-t border-border-line flex flex-col z-10"
    >
      <div className="flex items-center justify-between px-4 h-9">
        <span className="text-sm bg-bg-active-element px-3 py-2 rounded-md text-text-primary flex items-center">
          Terminal
        </span>

        <button
          onClick={onClose}
          className="text-text-dimmed hover:text-text-primary p-1 rounded-md hover:bg-bg-active-element cursor-pointer flex items-center justify-center outline-none focus:bg-bg-active-element"
        >
          <X className="text-text-primary" />
        </button>
      </div>

      <div className="flex-1 p-4 cursor-text overflow-y-auto text-sm ">
        <div className="flex flex-col">
          {history &&
            history.map((item, index) => {
              return (
                <div key={`history-item-${index}`} className="flex flex-col">
                  <span>[romedix@portfolio]$ {item.command}</span>
                  <span>{item.output}</span>
                </div>
              );
            })}
          <div className="relative flex">
            <span className="mr-2 whitespace-pre">[romedix@portfolio]$</span>

            <input
              ref={inputRef}
              type="text"
              value={value}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus
              onChange={(e) => {
                setValue(e.target.value);
                updateCursor();
              }}
              onSelect={updateCursor}
              spellCheck={false}
              autoComplete="off"
              className="absolute opacity-0 z-10 w-full bg-transparent outline-none"
              onKeyDown={handleKeyDown}
            />

            <div className="pointer-events-none whitespace-pre font-mono text-text-primary flex items-center">
              <span>{textBeforeCursor}</span>
              <span
                className={cn(
                  "inline-flex items-center justify-center w-2 h-[1.2em]",
                  isFocused
                    ? "bg-text-primary text-bg-sidebar"
                    : "border border-text-primary text-transparent",
                )}
              >
                {charUnderCursor}
              </span>
              <span>{textAfterCursor}</span>
            </div>
          </div>
        </div>

        <div ref={endOfTerminalRef} />
      </div>
    </div>
  );
};
