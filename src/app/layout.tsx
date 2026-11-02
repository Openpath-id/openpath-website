import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Inter, Sora } from "@/lib/font";
import { cn } from "@/lib/utils";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Temukan Beasiswa & Pendanaan Sertifikasi`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={cn(Sora.variable, Inter.variable, "scroll-smooth")}
    >
      <body className={cn(Sora.variable, Inter.variable, "min-h-screen flex flex-col")}>
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
        <Toaster />

        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-F7Z8QD9B7R"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F7Z8QD9B7R');
          `}
        </Script>
      </body>
    </html>
  );
}
