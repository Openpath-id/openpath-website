import type { Metadata } from "next";

// page.tsx is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: "Jelajahi Beasiswa & Pendanaan Sertifikasi",
  description:
    "Daftar beasiswa dan pendanaan sertifikasi lengkap dengan syarat, deadline, dan tautan resmi. Cari dan filter peluang sesuai jenjang pendidikanmu.",
  alternates: { canonical: "/list" },
};

export default function ListLayout({ children }: { children: React.ReactNode }) {
  return children;
}
