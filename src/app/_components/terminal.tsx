"use client";

import { useTerminalHistory } from "@/app/hooks";
import { useCommandStore } from "@/store/useCommandStore";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type TerminalProps = {
  onClose?: () => void;
};

export const Terminal = ({ onClose }: TerminalProps) => {
  const { closeTerminal } = useCommandStore();
  const handleClose = onClose ?? closeTerminal;

  const {
    value,
    setValue,
    isFocused,
    setIsFocused,
    history,
    inputRef,
    endOfTerminalRef,
    updateCursor,
    handleKeyDown,
    focusInput,
    textBeforeCursor,
    charUnderCursor,
    textAfterCursor,
  } = useTerminalHistory();

  return (
    <div
      onClick={focusInput}
      className="fixed bottom-0 left-0 w-full h-64 overflow-y-auto pt-2 bg-bg-sidebar border-t border-border-line flex flex-col z-10"
    >
      <div className="flex items-center justify-between px-4 h-9">
        <span className="text-sm bg-bg-active-element px-3 py-2 rounded-md text-text-primary flex items-center">
          Terminal
        </span>

        <button
          onClick={handleClose}
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

            <div className="pointer-events-none whitespace-pre text-text-primary flex items-center">
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
