import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-[10px] border border-[#9B9FA7] bg-[#F7F7F2] px-4 font-Inter text-[14px] text-[#17221F] placeholder:text-[#9B9FA7] placeholder:font-normal focus-visible:outline-none focus-visible:border-[#176B5B] focus-visible:ring-1 focus-visible:ring-[#176B5B] disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
