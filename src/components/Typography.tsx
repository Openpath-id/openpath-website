import * as React from "react";

import { cn } from "@/lib/utils";

export enum TypographyVariant {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  t1,
  t2,
  bt,
  l1,
  l2,
}

enum FontVariant {
  Sora,
}

enum FontWeight {
  thin,
  extralight,
  light,
  regular,
  medium,
  semibold,
  bold,
  extrabold,
  black,
}

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  id?: string;
  className?: string;
  weight?: keyof typeof FontWeight;
  font?: keyof typeof FontVariant;
  variant?: keyof typeof TypographyVariant;
  children: React.ReactNode;
};

export default function Typography<T extends React.ElementType>({
  as,
  id,
  children,
  weight = "regular",
  className,
  font = "Sora",
  variant = "bt",
  ...props
}: TypographyProps<T> & Omit<React.ComponentProps<T>, keyof TypographyProps<T>>) {
  const Component = as || "p";
  return (
    <Component
      id={id}
      className={cn(
        // *=============== Font Type ==================
        "text-black",
        [font === "Sora" && "font-Sora"],
        [
          weight === "regular" && "font-normal",
          weight === "medium" && "font-medium",
          weight === "bold" && "font-bold",
          weight === "extrabold" && "font-extrabold",
        ],
        // *=============== Font Variants ==================
        [
          variant === "h1" && ["md:text-[72px]"],
          variant === "h2" && ["md:text-[60px]"],
          variant === "h3" && ["md:text-[48px]"],
          variant === "h4" && ["md:text-[36px]"],
          variant === "h5" && ["md:text-[30px]"],
          variant === "h6" && ["md:text-[24px]"],
          variant === "t1" && ["md:text-[20px]"],
          variant === "t2" && ["md:text-[18px]"],
          variant === "bt" && ["md:text-[16px]"],
          variant === "l1" && ["md:text-[14px]"],
          variant === "l2" && ["md:text-[12px]"],
        ],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
