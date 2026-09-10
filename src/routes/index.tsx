import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Clock,
  Phone,
  ShieldCheck,
  Timer,
  Wrench,
  Star,
  MapPin,
  Mail,
} from "lucide-react";
import { bedrijf, diensten, faq, partners, reviews } from "@/lib/loodgieter";
import hero from "@/assets/loodgieter-hero.jpg";
import werk from "@/assets/loodgieter-werk.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Loodgieter Silvolde — 24/7 spoedservice | ${bedrijf.telefoon}` },
      {
        name: "description",
        content:
          "Loodgieter Silvolde helpt bij lekkages, verstoppingen, CV-storingen en daklekkage. Al sinds 1989 actief, 24/7 bereikbaar en altijd een prijsopgave vooraf.",
      },
      { property: "og:title", content: "Loodgieter Silvolde — 24/7 spoedservice" },
      {
        property: "og:description",
        content:
          "Snelle en betrouwbare loodgieter in Silvolde en omgeving. Bel 0315 781 004 of vraag een gratis offerte aan.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Plumber",
          name: bedrijf.naam,
          telephone: bedrijf.telefoon,
          foundingDate: String(bedrijf.sinds),
          areaServed: bedrijf.regio,
          address: {
            "@type": "PostalAddress",
            addressLocality: bedrijf.plaats,
            addressCountry: "NL",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            bestRating: "5",
            reviewCount: String(reviews.length),
          },
          openingHours: "Mo-Su 00:00-23:59",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.vraag,
            acceptedAnswer: { "@type": "Answer", text: f.antwoord },
          })),
        }),
      },
    ],
  }),
  component: LoodgieterPage,
});

const troeven = [
  { icon: Clock, titel: "24/7 bereikbaar", tekst: "Ook 's nachts, in het weekend en op feestdagen." },
  { icon: BadgeCheck, titel: `Sinds ${bedrijf.sinds}`, tekst: "Ruim 35 jaar ervaring in de regio." },
  { icon: Wrench, titel: "Ervaren vakmensen", tekst: "Gecertificeerde monteurs met eigen materiaal." },
  { icon: ShieldCheck, titel: "Transparante tarieven", tekst: "Altijd een prijsopgave vooraf." },
  { icon: Timer, titel: "Snelle service", tekst: "Bij spoed vaak binnen een uur ter plaatse." },
];

function BelKnop({ className = "" }: { className?: string }) {
  return (
    <a
      href={bedrijf.telefoonLink}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-4 text-base font-semibold text-accent-foreground transition hover:brightness-95 ${className}`}
    >
      <Phone className="h-5 w-5" aria-hidden="true" />
      Bel direct – {bedrijf.telefoon}
    </a>
  );
}

function LoodgieterPage() {
  const [verstuurd, setVerstuurd] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={hero}
          alt="Loodgieter van Loodgieter Silvolde aan het werk in een badkamer"
          width={1600}
          height={1200}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-plumb-dark/92 via-plumb-dark/80 to-plumb-dark/45" />
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-wider text-plumb-accent">
            Loodgieter in {bedrijf.regio}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl">
            Een telefoontje en we zijn onderweg!
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {bedrijf.naam} biedt snelle en betrouwbare oplossingen voor lekkages, verstoppingen,
            CV-problemen en andere loodgietersklussen. Onze vakbekwame monteurs staan 24/7 voor u
            klaar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BelKnop />
            <a
              href="#offerte"
              className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Offerte aanvragen
            </a>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {troeven.map((t) => (
              <li key={t.titel} className="flex items-center gap-2 text-sm text-white/90">
                <t.icon className="h-4 w-4 shrink-0 text-plumb-accent" aria-hidden="true" />
                {t.titel}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Troeven */}
      <section className="border-b border-border bg-secondary px-4 py-14 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {troeven.map((t) => (
            <div key={t.titel}>
              <t.icon className="h-6 w-6 text-plumb" aria-hidden="true" />
              <h2 className="mt-3 text-lg">{t.titel}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Diensten */}
      <section id="diensten" className="px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-plumb">Diensten</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Waarmee wij u helpen</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Van een druppelende kraan tot een gesprongen leiding: we lossen het vakkundig op en
            leggen vooraf uit wat het kost.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {diensten.map((d) => (
              <article
                key={d.naam}
                className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-plumb hover:shadow-lg"
              >
                <h3 className="text-xl">{d.naam}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{d.tekst}</p>
                <a
                  href="#offerte"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-plumb hover:underline"
                >
                  Offerte aanvragen
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Spoed */}
      <section id="spoed" className="bg-plumb-dark px-4 py-16 text-white sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl text-white sm:text-4xl">Met spoed een loodgieter nodig?</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85">
              Wateroverlast, een gesprongen leiding of een wc die overloopt? Wij zijn 24 uur per dag,
              7 dagen per week bereikbaar en komen zo snel mogelijk naar u toe.
            </p>
          </div>
          <BelKnop className="shrink-0" />
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-plumb">Reviews</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Wat klanten over ons zeggen</h2>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-plumb-dark">4,9</span>
              <div className="flex" aria-label="4,9 van 5 sterren">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-plumb-accent text-plumb-accent" aria-hidden="true" />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              95% van de klanten beveelt ons aan bij familie en vrienden.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.naam} className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
                <div className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-plumb-accent text-plumb-accent" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {r.tekst}
                </blockquote>
                <figcaption className="mt-5 text-sm font-semibold">
                  {r.naam} <span className="font-normal text-muted-foreground">— {r.plaats}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Over ons */}
      <section id="over-ons" className="bg-secondary px-4 py-20 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-lg">
            <img
              src={werk}
              alt="Monteur repareert koperen waterleidingen"
              width={1200}
              height={900}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-plumb">Over ons</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Al sinds {bedrijf.sinds} uw vaste loodgieter</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                {bedrijf.naam} is sinds {bedrijf.sinds} actief in {bedrijf.regio}. In die tijd hebben
                we duizenden klussen uitgevoerd: van kleine reparaties tot complete
                leidingvervangingen en spoedgevallen midden in de nacht.
              </p>
              <p>
                Onze monteurs zijn ervaren en gecertificeerd. Ze werken netjes, leggen uit wat ze
                doen en laten uw woning schoon achter. Betrouwbaarheid en duidelijke communicatie
                staan bij ons voorop.
              </p>
              <p>
                Omdat we uit de buurt komen, kennen we de regio en zijn we snel ter plaatse. Dat
                scheelt tijd — en bij waterschade telt elke minuut.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kosten */}
      <section id="kosten" className="px-4 py-20 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-plumb">Kosten</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Transparante tarieven, geen verrassingen</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Wat een klus kost, hangt af van het soort werk, de benodigde materialen en het tijdstip.
              Daarom geven we altijd vooraf een duidelijke prijsopgave. U weet dus waar u aan toe bent
              voordat we beginnen.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              "Gratis en vrijblijvende offerte",
              "Prijsopgave vooraf, ook bij spoed",
              "Geen verborgen kosten of onverwachte toeslagen",
              "Voorrijkosten en tarief worden vooraf besproken",
            ].map((punt) => (
              <li key={punt} className="flex gap-3 rounded-lg border border-border bg-card p-5">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-plumb" aria-hidden="true" />
                <span className="text-sm leading-relaxed">{punt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-secondary px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-plumb">
            Veelgestelde vragen
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Antwoord op uw vragen</h2>
          <div className="mt-10 space-y-3">
            {faq.map((f) => (
              <details key={f.vraag} className="group rounded-lg border border-border bg-card p-5">
                <summary className="cursor-pointer list-none text-base font-semibold marker:hidden">
                  {f.vraag}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.antwoord}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto w-full max-w-6xl text-center">
          <h2 className="text-2xl">Wij werken met merken die u kent</h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((p) => (
              <li
                key={p}
                className="rounded-lg border border-border bg-card px-4 py-5 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact + offerte */}
      <section id="contact" className="bg-secondary px-4 py-20 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-plumb">Contact</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Direct contact of een offerte</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Bel ons voor spoed of vul het formulier in voor een gratis en vrijblijvende offerte. We
              reageren zo snel mogelijk.
            </p>

            <dl className="mt-8 space-y-5">
              <div className="flex gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-plumb" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-muted-foreground">Telefoon (24/7)</dt>
                  <dd className="text-lg font-semibold">
                    <a href={bedrijf.telefoonLink} className="hover:text-plumb">
                      {bedrijf.telefoon}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-plumb" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-muted-foreground">Werkgebied</dt>
                  <dd className="text-lg">{bedrijf.plaats}, Nederland — en omgeving</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-plumb" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-muted-foreground">Offerte</dt>
                  <dd className="text-lg">Gratis en vrijblijvend</dd>
                </div>
              </div>
            </dl>
          </div>

          <form
            id="offerte"
            onSubmit={(e) => {
              e.preventDefault();
              setVerstuurd(true);
            }}
            className="rounded-lg border border-border bg-card p-6 sm:p-8"
          >
            <h3 className="text-2xl">Offerte aanvragen</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Vul uw gegevens in, dan nemen we contact met u op.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="naam" className="text-sm font-medium">
                  Naam
                </label>
                <input
                  id="naam"
                  name="naam"
                  required
                  autoComplete="name"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="telefoon" className="text-sm font-medium">
                    Telefoonnummer
                  </label>
                  <input
                    id="telefoon"
                    name="telefoon"
                    type="tel"
                    required
                    autoComplete="tel"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    E-mailadres
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="dienst" className="text-sm font-medium">
                  Waar gaat het om?
                </label>
                <select
                  id="dienst"
                  name="dienst"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {diensten.map((d) => (
                    <option key={d.naam}>{d.naam}</option>
                  ))}
                  <option>Anders</option>
                </select>
              </div>
              <div>
                <label htmlFor="bericht" className="text-sm font-medium">
                  Toelichting
                </label>
                <textarea
                  id="bericht"
                  name="bericht"
                  rows={4}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-accent px-6 py-4 text-base font-semibold text-accent-foreground transition hover:brightness-95"
            >
              Verstuur aanvraag
            </button>

            <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
              {verstuurd
                ? "Bedankt! Uw aanvraag is genoteerd. Voor spoed kunt u ons het beste direct bellen."
                : "Spoed? Bel dan direct " + bedrijf.telefoon + "."}
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
