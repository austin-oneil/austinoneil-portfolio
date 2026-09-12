import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-(--radius) font-semibold " +
  "transition-[background-color,border-color,color,transform] duration-150 ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // White on #1d4ed8 = 6.4:1 light / white on #2563eb = 5.2:1 dark. Both AA.
  solid:
    "bg-accent-solid text-accent-on-solid hover:bg-accent-hover dark:hover:bg-accent-solid/85",
  outline:
    "border border-border-strong bg-surface text-text hover:border-accent hover:text-accent",
  ghost: "text-text-muted hover:bg-surface-2 hover:text-text",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
};

export function buttonClass(variant: Variant = "solid", size: Size = "md") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function ButtonLink({
  variant = "solid",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${buttonClass(variant, size)} ${className}`} {...props}>
      {children}
    </Link>
  );
}
