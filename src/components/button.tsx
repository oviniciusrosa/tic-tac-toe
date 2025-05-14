import type React from "react";
import { cn } from "@/lib/utils";
import { Animation } from "./animations";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
  className?: string;
}

export const Button = ({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Animation.GrowEffect>
      <button
        type="button"
        className={cn(
          "w-full py-4 px-6 rounded-xl font-bold text-lg text-neutral border-b-6 uppercase tracking-wide relative cursor-pointer",
          variant === "primary" && "bg-primary border-primary-dark",
          variant === "secondary" && "bg-secondary border-secondary-dark",
          variant === "tertiary" &&
            "bg-neutral-silver-dark border-neutral-silver-border",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </Animation.GrowEffect>
  );
};
