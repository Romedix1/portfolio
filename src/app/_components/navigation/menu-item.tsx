import { cn } from "@/lib/utils";

type MenuItemProps = {
  text: string;
  device: "desktop" | "mobile";
};

export const MenuItem = ({ text, device }: MenuItemProps) => {
  const linkStyles =
    device === "desktop"
      ? "font-semibold text-[15px]"
      : "border-b-2 font-black text-5xl tracking-[-0.5px] pb-3 w-fit";

  return <li className={cn(linkStyles)}>{text}</li>;
};
