import { cn } from "@/lib/utils";

type BrowserDotProps = {
  color: string;
};

export const BrowserDot = ({ color }: BrowserDotProps) => {
  return (
    <div
      className={cn("rounded-full w-2.5 h-2.5")}
      style={{ backgroundColor: `#${color}` }}
    ></div>
  );
};
