import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ExplorerBar, FileBar } from "@/app/_components";
import { Toaster } from "sonner";
import { CommandPaletteProvider } from "@/app/_components/command-palette-provider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Michał Dobosz | Full-Stack Developer",
  description:
    "Full-stack developer portfolio building scalable, efficient web applications with modern tools.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className={`${jetbrainsMono.className} min-h-full flex flex-col`}>
        <div className="lg:flex">
          <Toaster theme="dark" position="top-right" duration={1500} />
          <CommandPaletteProvider />

          <ExplorerBar />

          <main className="flex-1 min-w-0 flex flex-col bg-bg-main">
            <FileBar />

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
