import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { bedrijf, plumbNav } from "@/lib/loodgieter";

export function PlumbHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto]">
        <Link to="/" className="min-w-0">
          <span className="block truncate text-lg font-bold uppercase tracking-tight text-plumb-dark sm:text-xl">
            {bedrijf.naam}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            24/7 bereikbaar · sinds {bedrijf.sinds}
          </span>
        </Link>

        <nav aria-label="Hoofdnavigatie loodgieter" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-6">
            {plumbNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-plumb"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={bedrijf.telefoonLink}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:brightness-95"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{bedrijf.telefoon}</span>
            <span className="sm:hidden">Bel direct</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="plumb-menu"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="plumb-menu"
          aria-label="Mobiele navigatie loodgieter"
          className="border-t border-border bg-background lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {plumbNav.map((item) => (
              <li key={item.href} className="border-b border-border/60 last:border-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
