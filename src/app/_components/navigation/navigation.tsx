import { MenuItem, NAVIGATION_LINKS } from "@/app/_components/navigation";
import { MobileMenuWrapper } from "@/app/_components/navigation/mobile";

export const Navigation = () => {
  return (
    <nav className="bg-bg-base px-4 py-5 flex justify-between items-center md:px-15 md:py-7">
      <button className="font-bold text-xl tracking-[-0.5px]">Romedix1</button>

      <MobileMenuWrapper />
      <ul className="hidden md:flex gap-9">
        {NAVIGATION_LINKS.map((link, index) => {
          return <MenuItem key={index} text={link} device="desktop" />;
        })}
      </ul>
    </nav>
  );
};
