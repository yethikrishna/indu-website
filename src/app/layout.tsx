import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "INDU | The Future of Systems Programming",
  description: "INDU Language & Foundation. High-performance, actor-model, WebGPU-native systems programming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} bg-black`}>
      <body className="antialiased bg-black text-gray-100 min-h-screen cursor-none">
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
