"use client";

export default function AdminHeader() {
  return (
    <div>
      <h1
        className="text-[32px] md:text-[36px] font-bold text-[#17221F] tracking-tight leading-tight"
        style={{ fontFamily: "var(--font-Sora), Sora, sans-serif" }}
      >
        Kelola Listing
      </h1>
      <p className="text-[14px] md:text-[15px] text-[#717A75] mt-2 font-normal leading-relaxed max-w-[650px]">
        Kelola data beasiswa dan sertifikasi, pantau status verifikasi, dan lakukan pembaruan data
        secara real-time.
      </p>
    </div>
  );
}
