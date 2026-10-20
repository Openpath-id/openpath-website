import type { Metadata } from "next";
import ErrorPageLayout from "@/components/ErrorPageLayout";

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemukan | Openpath.id",
  description: "Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.",
};

export default function NotFound() {
  return (
    <ErrorPageLayout
      statusCode="404"
      title="Halaman Tidak Ditemukan"
      description="Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Coba periksa kembali URL atau kembali ke beranda"
      buttonText="Kembali ke Home"
      buttonHref="/"
    />
  );
}
