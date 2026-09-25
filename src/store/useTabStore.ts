import { create } from "zustand";

type Tab = {
  name: string;
  path: string;
};

interface TabStore {
  tabs: Tab[];
  addTab: (tab: Tab) => void;
  removeTab: (tabName: string) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  tabs: [],
  addTab: (newTab) =>
    set((state) => {
      if (state.tabs.some((tab) => tab.name === newTab.name)) {
        return state;
      }
      return { tabs: [...state.tabs, newTab] };
    }),
  removeTab: (tabNameToRemove) =>
    set((state) => ({
      tabs: state.tabs.filter((tab) => tab.name !== tabNameToRemove),
    })),
}));
