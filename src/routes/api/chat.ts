import { createFileRoute } from "@tanstack/react-router";
import { bedrijf, diensten, faq } from "@/lib/loodgieter";

type Bericht = { role: "user" | "assistant"; content: string };

const systeemPrompt = `Je bent de digitale assistent van ${bedrijf.naam}, een loodgietersbedrijf in ${bedrijf.regio} (Gelderland, Nederland), actief sinds ${bedrijf.sinds}.

Regels:
- Antwoord altijd in het Nederlands, vriendelijk, kort en concreet (max ~120 woorden).
- Je bent 24/7 beschikbaar en helpt bezoekers met vragen over diensten, kosten, spoed en afspraken.
- Bij spoed of waterschade: adviseer direct bellen naar ${bedrijf.telefoon} en zeg dat de hoofdkraan dicht moet.
- Noem nooit exacte prijzen; leg uit dat er altijd een gratis prijsopgave vooraf wordt gegeven en verwijs naar het offerteformulier op de site.
- Verzin geen adressen, e-mailadressen of openingstijden. Werkgebied is ${bedrijf.plaats} en omgeving.

Diensten: ${diensten.map((d) => d.naam).join(", ")}.

Veelgestelde vragen:
${faq.map((f) => `- ${f.vraag} ${f.antwoord}`).join("\n")}`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: Bericht[] };
        const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
        if (messages.length === 0) {
          return new Response(JSON.stringify({ error: "Geen bericht ontvangen." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return new Response(JSON.stringify({ error: "Assistent is niet geconfigureerd." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": apiKey,
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: "google/gemini-3.8-flash",
            messages: [{ role: "system", content: systeemPrompt }, ...messages],
          }),
        });

        if (!res.ok) {
          const tekst = await res.text();
          console.error(`AI gateway fout [${res.status}]: ${tekst}`);
          const melding =
            res.status === 429
              ? "Het is even druk. Probeer het zo nog eens of bel ons direct."
              : "De assistent is nu niet bereikbaar. Bel ons gerust op " + bedrijf.telefoon + ".";
          return new Response(JSON.stringify({ error: melding }), {
            status: res.status,
            headers: { "Content-Type": "application/json" },
          });
        }

        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const antwoord =
          data.choices?.[0]?.message?.content?.trim() ||
          `Daar kan ik u het beste telefonisch mee helpen: ${bedrijf.telefoon}.`;

        return new Response(JSON.stringify({ antwoord }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
