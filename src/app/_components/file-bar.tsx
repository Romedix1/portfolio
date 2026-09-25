"use client";

import { FileTab } from "@/app/_components/ui/file-tab";
import { useTabStore } from "@/store/useTabStore";

export const FileBar = () => {
  const { tabs } = useTabStore();

  return (
    <section className="flex items-center  border-border-line border-b bg-bg-sidebar w-full overflow-x-auto">
      {tabs.map((tab, index) => {
        return (
          <FileTab key={`file-tab-${index}`} text={tab.name} path={tab.path} />
        );
      })}
    </section>
  );
};
