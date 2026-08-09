import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Geometric Intelligence Lab | Tel Aviv University",
  description: "Where geometry meets intelligence. Research in 3D generative AI, computer vision, geometric learning, and spatial reasoning.",
  icons: { icon: "/brand/gi-logo.png", shortcut: "/brand/gi-logo.png", apple: "/brand/gi-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
