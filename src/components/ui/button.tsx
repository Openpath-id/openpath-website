import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-[8px] font-Inter font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B5B] disabled:pointer-events-none disabled:opacity-70 active:scale-[0.99] cursor-pointer shadow-sm",
          variant === "default" && "bg-[#176B5B] text-white hover:bg-[#125548]",
          variant === "outline" && "border border-[#176B5B] text-[#176B5B] hover:bg-[#DCEFE7]/40",
          variant === "ghost" && "hover:bg-neutral-100 text-[#17221F]",
          variant === "link" && "text-[#176B5B] underline-offset-4 hover:underline p-0 h-auto",
          size === "default" && "px-[20px] py-[10px] text-[14px] leading-[18px] tracking-[-0.14px]",
          size === "lg" && "px-[24px] py-[12px] text-[16px]",
          size === "sm" && "px-3 py-1.5 text-xs",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
