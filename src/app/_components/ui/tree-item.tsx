import { cn } from "@/lib/utils";
import { File, Folder } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type BaseProps = {
  text: string;
};

type FileProps = BaseProps & {
  type: "file";
  href: string;
  isActive?: boolean;
};

type FolderProps = BaseProps & {
  type: "folder";
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type TreeItemProps = FileProps | FolderProps;

export const TreeItem = (props: TreeItemProps) => {
  const styles =
    "flex items-center cursor-pointer gap-1.5 px-4 py-1.5 outline-none";

  if (props.type === "file") {
    return (
      <Link
        href={props.href}
        className={cn(
          styles,
          "hover:bg-bg-active-element hover:text-syntax-accent focus:bg-bg-active-element focus:text-syntax-accent",
        )}
      >
        <File className="w-5 h-5" />
        {props.text}
      </Link>
    );
  } else if (props.type === "folder") {
    return (
      <button
        className={cn(
          styles,
          "hover:bg-bg-active-element hover:text-text-primary focus:bg-bg-active-element focus:text-text-primary",
        )}
        onClick={() => props.setIsOpen((prev) => !prev)}
      >
        <Folder className="w-5 h-5" />
        {props.text}
      </button>
    );
  }
};
