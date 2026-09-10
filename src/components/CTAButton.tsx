import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-7 py-4 text-[0.78rem] font-medium uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring active:translate-y-px";

const styles = {
  primary:
    "bg-primary text-primary-foreground hover:bg-ink hover:-translate-y-0.5 shadow-[0_1px_0_0_color-mix(in_oklab,var(--color-gold)_45%,transparent)]",
  ghost:
    "border border-border bg-transparent text-foreground hover:border-gold hover:text-ink hover:-translate-y-0.5",
  light:
    "bg-background text-foreground hover:bg-secondary hover:-translate-y-0.5",
} as const;

type Variant = keyof typeof styles;

export function CTALink({
  variant = "primary",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode }) {
  return (
    <Link className={cn(base, styles[variant], className)} {...props}>
      {children}
    </Link>
  );
}

export function CTAAnchor({
  variant = "primary",
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; children: ReactNode }) {
  return (
    <a className={cn(base, styles[variant], className)} {...props}>
      {children}
    </a>
  );
}
