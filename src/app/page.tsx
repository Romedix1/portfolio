import { Code2 } from "lucide-react";

export default function Home() {
  const OPTIONS = [
    { text: "Search files", shortcuts: ["Ctrl", "P"] },
    { text: "Command palette", shortcuts: ["Ctrl", "Shift", "P"] },
    { text: "Toggle terminal", shortcuts: ["Ctrl", "`"] },
  ];

  return (
    <section className="flex flex-col items-center justify-center h-100 lg:h-[80%] select-none p-4">
      <Code2
        className="w-24 h-24 md:w-48 md:h-48 text-text-dimmed opacity-40 mb-8"
        strokeWidth={1}
      />

      <div className="flex flex-col items-center text-text-dimmed">
        <div className="flex flex-col gap-4 text-sm md:text-base">
          {OPTIONS.map((option, index) => (
            <div
              key={`editor-option-${index}`}
              className="flex items-center justify-between gap-12 md:gap-24"
            >
              <span>{option.text}</span>
              <div className="flex gap-1.5 text-xs text-text-primary">
                {option.shortcuts.map((shortcut, shortcutIndex) => (
                  <span
                    key={`${option.text}-${shortcutIndex}`}
                    className="px-2 py-1 bg-bg-sidebar border border-border-line rounded"
                  >
                    {shortcut}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
