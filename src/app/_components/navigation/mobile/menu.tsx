import { NAVIGATION_LINKS, MenuItem } from "@/app/_components/navigation";

export const Menu = () => {
  return (
    <div className="w-screen pt-12 absolute left-0 bg-bg-base mt-5 h-screen flex flex-col gap-6 px-4 md:hidden">
      {NAVIGATION_LINKS.map((link, index) => {
        return <MenuItem key={index} text={link} device="mobile" />;
      })}
    </div>
  );
};
