"use client";

import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type UseListNavigationOptions = {
  itemCount: number;
  onSelect: (index: number) => void;
  onClose: () => void;
  initialIndex?: number;
};

type UseListNavigationReturn = {
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  modalRef: RefObject<HTMLDivElement | null>;
};

export function useListNavigation({
  itemCount,
  onSelect,
  onClose,
  initialIndex = 0,
}: UseListNavigationOptions): UseListNavigationReturn {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev < itemCount - 1 ? prev + 1 : prev));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : Math.max(itemCount - 1, 0),
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (itemCount > 0) {
          const validIndex = selectedIndex < itemCount ? selectedIndex : 0;
          onSelect(validIndex);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [itemCount, onClose, onSelect, selectedIndex]);

  return {
    selectedIndex,
    setSelectedIndex,
    modalRef,
  };
}

