import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import SectionDots from "@/components/SectionDots";

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
      <head>
        <script dangerouslySetInnerHTML={{__html: `if ('scrollRestoration' in history) { history.scrollRestoration = 'auto'; }`}} />
      </head>
      <body>
        <Cursor />
        <Navbar />
        <SectionDots />
        {children}
      </body>
    </html>
  );
}
