"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      richColors
      toastOptions={{
        style: {
          fontFamily: "var(--font-Inter), Inter, sans-serif",
        },
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#F7F7F2] group-[.toaster]:text-[#17221F] group-[.toaster]:border group-[.toaster]:shadow-lg rounded-[12px] p-4",
          description: "group-[.toast]:text-neutral-600 font-normal text-[13px]",
          title: "font-semibold text-[14px]",
          actionButton: "group-[.toast]:bg-[#176B5B] group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-600",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
