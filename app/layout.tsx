import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Geometric Intelligence Lab | Tel Aviv University",
  description: "Where geometry meets intelligence. Research in 3D generative AI, computer vision, geometric learning, and spatial reasoning.",
  icons: { icon: "/brand/gi-favicon-white.png", shortcut: "/brand/gi-favicon-white.png", apple: "/brand/gi-favicon-white.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
