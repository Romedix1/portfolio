import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

type HamburgerMenuProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const HamburgerMenu = ({ isOpen, setIsOpen }: HamburgerMenuProps) => {
  const lineStyles =
    "w-6 h-0.75 bg-text-primary transition-all duration-300 absolute left-1/2 -translate-x-1/2";

  return (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="shadow-3d-sm w-10 h-10 border-text-primary border-2 relative cursor-pointer"
    >
      <span
        className={cn(
          lineStyles,
          isOpen ? "rotate-45 top-1/2 -translate-y-1/2" : "top-3",
        )}
      ></span>
      <span
        className={cn(
          lineStyles,
          isOpen ? "-rotate-45 top-1/2 -translate-y-1/2" : "bottom-3",
        )}
      ></span>
    </button>
  );
};
