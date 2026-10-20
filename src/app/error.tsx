"use client";

import { useEffect } from "react";
import ErrorPageLayout from "@/components/ErrorPageLayout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or monitoring service
    console.error(error);
  }, [error]);

  return (
    <ErrorPageLayout
      statusCode="500"
      title="Terjadi Kendala Sistem"
      description="Maaf, terjadi kesalahan pada server kami. Tim kami sedang memperbaikinya, silakan muat ulang halaman beberapa saat lagi"
      buttonText="Kembali ke Home"
      buttonHref="/"
      onReset={reset}
    />
  );
}
