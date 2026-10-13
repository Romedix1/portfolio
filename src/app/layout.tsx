import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ExplorerBar, FileBar } from "@/app/_components";
import { Toaster } from "sonner";
import { CommandPaletteProvider } from "@/app/_components/command-palette-provider";
import type { ReactNode } from "react";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const viewport: Viewport = {
  themeColor: "#1e1e1e",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Michał Dobosz | Full-Stack Developer",
    template: "%s | Michał Dobosz",
  },
  description:
    "Full-stack developer portfolio building scalable, efficient web applications with modern tools.",
  keywords: [
    "Michał Dobosz",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Michał Dobosz" }],
  creator: "Michał Dobosz",
  openGraph: {
    title: "Michał Dobosz | Full-Stack Developer",
    description:
      "Full-stack developer portfolio building scalable, efficient web applications with modern tools.",
    type: "website",
    locale: "en_US",
    siteName: "Michał Dobosz Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michał Dobosz | Full-Stack Developer",
    description:
      "Full-stack developer portfolio building scalable, efficient web applications with modern tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className={`${jetbrainsMono.className} min-h-screen flex flex-col`}>
        <div className="lg:flex min-h-screen">
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
