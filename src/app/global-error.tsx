"use client";

import ErrorPageLayout from "@/components/ErrorPageLayout";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body className="antialiased bg-[#F7F7F2]">
        <ErrorPageLayout
          statusCode="500"
          title="Terjadi Kendala Sistem"
          description="Maaf, terjadi kesalahan pada server kami. Tim kami sedang memperbaikinya, silakan muat ulang halaman beberapa saat lagi"
          buttonText="Coba Lagi"
          onReset={reset}
        />
      </body>
    </html>
  );
}
