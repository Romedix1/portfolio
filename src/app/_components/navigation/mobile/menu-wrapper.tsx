"use client";

import { Menu, HamburgerMenu } from "@/app/_components/navigation/mobile";
import { useState } from "react";

export const MobileMenuWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden">
      <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />

      {isOpen && <Menu />}
    </div>
  );
};
