import { bedrijf, diensten, plumbNav } from "@/lib/loodgieter";

export function PlumbFooter() {
  return (
    <footer className="bg-plumb-dark px-4 py-14 text-white/85 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <p className="text-xl font-bold uppercase tracking-tight text-white">{bedrijf.naam}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Sinds {bedrijf.sinds} uw loodgieter in {bedrijf.regio}. 24/7 bereikbaar voor spoed,
            lekkages, verstoppingen en CV-storingen.
          </p>
          <p className="mt-4 text-lg font-semibold text-white">
            <a href={bedrijf.telefoonLink}>{bedrijf.telefoon}</a>
          </p>
        </div>

        <nav aria-label="Footernavigatie loodgieter">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Navigatie</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {plumbNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Diensten</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {diensten.slice(0, 6).map((d) => (
              <li key={d.naam}>{d.naam}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-6xl flex-col gap-2 border-t border-white/15 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {bedrijf.naam} · {bedrijf.plaats}, Nederland
        </p>
        <a href={bedrijf.telefoonLink} className="transition-colors hover:text-white">
          24/7 spoedservice — {bedrijf.telefoon}
        </a>
      </div>
    </footer>
  );
}
