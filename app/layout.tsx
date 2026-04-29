import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import SectionDots from "@/components/SectionDots";
import ScrollRestoration from "@/components/ScrollRestoration";
import GridIgnition from "@/components/GridIgnition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "lemonlight.",
  description: "lemonlight studio — creative agency",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ScrollRestoration />
        <GridIgnition />
        <Cursor />
        <Navbar />
        <SectionDots />
        {children}
      </body>
    </html>
  );
}
