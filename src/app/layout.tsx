import type { Metadata } from "next";
import "./globals.css";
import { Inter, Sora } from "@/lib/font";
import { cn } from "@/lib/utils";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

export const metadata: Metadata = {
  title: "Openpath.id",
  description:
    "Platform yang membantu kamu menemukan beasiswa dan sertifikasi untuk melanjutkan pendidikan dan karir impianmu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(Sora.variable, Inter.variable)}>
      <body className={cn(Sora.variable, Inter.variable, "min-h-screen flex flex-col")}>
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
