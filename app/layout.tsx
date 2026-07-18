import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Geometric Intelligence Lab | Tel Aviv University",
  description: "Where geometry meets intelligence. Research in 3D generative AI, computer vision, geometric learning, and spatial reasoning.",
  icons: { icon: "/gi-favicon-v2.png", shortcut: "/gi-favicon-v2.png", apple: "/gi-favicon-v2.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
