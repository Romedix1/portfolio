import { create } from "zustand";

type CommandStore = {
  isSearchOpen: boolean;
  searchValue: string;
  isTerminalOpen: boolean;
  openSearch: (initialValue?: string) => void;
  closeSearch: () => void;
  setSearchValue: (value: string) => void;
  toggleTerminal: () => void;
  closeTerminal: () => void;
};

export const useCommandStore = create<CommandStore>((set) => ({
  isSearchOpen: false,
  searchValue: "",
  isTerminalOpen: false,
  openSearch: (initialValue = "") =>
    set({ isSearchOpen: true, searchValue: initialValue }),
  closeSearch: () => set({ isSearchOpen: false }),
  setSearchValue: (value) => set({ searchValue: value }),
  toggleTerminal: () =>
    set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  closeTerminal: () => set({ isTerminalOpen: false }),
}));
