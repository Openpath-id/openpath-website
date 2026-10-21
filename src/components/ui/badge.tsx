import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-0.5 text-[12px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" && "border border-[#2F80ED] bg-[#EBF3FE] text-[#2F80ED]",
        variant === "secondary" && "border border-neutral-200 bg-neutral-100 text-neutral-900",
        variant === "destructive" && "border border-[#E28888] bg-[#FDEDED] text-[#C94A4A]",
        variant === "success" && "border border-[#2E856E] bg-[#EAF7F3] text-[#1E745E]",
        variant === "warning" && "border border-[#E2B93B] bg-[#FEF9EC] text-[#D49E1E]",
        variant === "outline" && "border border-neutral-300 text-neutral-800",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
