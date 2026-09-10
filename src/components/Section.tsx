import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "sand" | "ink";
}) {
  return (
    <section
      id={id}
      className={cn(
        "px-5 py-20 sm:px-8 md:py-28 lg:py-36",
        tone === "sand" && "bg-sand",
        tone === "ink" && "bg-ink text-primary-foreground",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  invert = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <p className={cn("eyebrow", invert && "text-accent")}>{eyebrow}</p>
      <h2 className="mt-4 text-3xl leading-[1.1] sm:text-4xl md:text-5xl">{title}</h2>
      {intro ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            invert ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
