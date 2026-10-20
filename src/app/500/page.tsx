import type { Metadata } from "next";
import ErrorPageLayout from "@/components/ErrorPageLayout";

export const metadata: Metadata = {
  title: "500 - Terjadi Kendala Sistem | Openpath.id",
  description: "Maaf, terjadi kesalahan pada server kami. Tim kami sedang memperbaikinya.",
};

export default function Error500Page() {
  return (
    <ErrorPageLayout
      statusCode="500"
      title="Terjadi Kendala Sistem"
      description="Maaf, terjadi kesalahan pada server kami. Tim kami sedang memperbaikinya, silakan muat ulang halaman beberapa saat lagi"
      buttonText="Kembali ke Home"
      buttonHref="/"
    />
  );
}
