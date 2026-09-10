import { partners } from "@/lib/loodgieter";

const token = import.meta.env["VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY"] as string | undefined;

export function PartnerLogos() {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {partners.map((p) => (
        <li
          key={p.naam}
          className="flex h-24 items-center justify-center rounded-xl border border-border bg-card px-4 shadow-sm transition hover:-translate-y-1 hover:border-plumb hover:shadow-md"
        >
          {token ? (
            <img
              src={`https://img.logo.dev/${p.domein}?token=${token}&size=160&format=png&retina=true`}
              alt={`Logo ${p.naam}`}
              width={120}
              height={40}
              loading="lazy"
              className="max-h-10 w-auto max-w-[120px] object-contain"
            />
          ) : (
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {p.naam}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
